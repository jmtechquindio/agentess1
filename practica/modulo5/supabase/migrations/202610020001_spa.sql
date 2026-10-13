-- =============================================================================
-- Migración inicial · Módulo 5 · Bot de Telegram para el Spa Manos y Pies
-- =============================================================================
-- Ejecutar UNA SOLA VEZ en un proyecto nuevo de Supabase:
--   SQL Editor -> New query -> pegar este archivo -> Run
--
-- Reglas que respeta este archivo:
--   * No hay DROP, ni TRUNCATE, ni DELETE. Nada destruye datos.
--   * No usa datos personales reales: servicios, usuarios y citas son ficticios.
--   * Todas las funciones son SECURITY DEFINER y solo el rol service_role puede
--     ejecutarlas. Con verify_jwt = false la clave anon puede llegar a
--     PostgREST, así que anon y authenticated se quedan sin privilegios.
--
-- Luego de aplicarla, ejecuta tests/integration.sql (termina con ROLLBACK).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Tablas
-- -----------------------------------------------------------------------------

-- 1.1 Catalogo de servicios ficticios. Los precios salen de aqui, nunca del bot.
create table if not exists public.spa_servicios (
  id           bigint generated always as identity primary key,
  nombre       text    not null unique,
  descripcion  text    not null,
  precio_cop   integer not null check (precio_cop > 0),
  duracion_min integer not null check (duracion_min between 15 and 240),
  activo       boolean not null default true,
  creado_en    timestamptz not null default now()
);

comment on table public.spa_servicios is 'Servicios ficticios del spa. Fuente unica de precios y duraciones.';

-- 1.2 Candidatos de horario en America/Bogota. Un horario existe aunque nadie
--     lo haya tomado; la duracion la aporta el servicio elegido.
create table if not exists public.spa_horarios (
  id        bigint generated always as identity primary key,
  inicio    timestamptz not null unique,
  activo    boolean     not null default true,
  creado_en timestamptz not null default now()
);

comment on table public.spa_horarios is 'Rejilla de slots futuros en America/Bogota. No son reservas.';

-- 1.3 Personas que interactuaron con el bot. NO autoriza nada: el permiso sale
--     de ADMIN_USER_ID en el entorno de la funcion.
create table if not exists public.spa_usuarios (
  user_id          bigint primary key,
  chat_id          bigint      not null,
  nombre           text        not null,
  username         text,
  primer_mensaje_en timestamptz not null default now(),
  visto_en         timestamptz not null default now(),
  activo           boolean     not null default true
);

comment on table public.spa_usuarios is 'Personas registradas por el bot. Sin datos personales reales.';

-- 1.4 Citas. Solicitar crea la cita en 'pendiente': no existe ningun camino que
--     la cree ya confirmada.
create table if not exists public.spa_citas (
  id                  bigint generated always as identity primary key,
  cliente_user_id     bigint      not null references public.spa_usuarios (user_id) on delete restrict,
  cliente_chat_id     bigint      not null,
  servicio_id         bigint      not null references public.spa_servicios (id) on delete restrict,
  horario_id          bigint      not null references public.spa_horarios (id) on delete restrict,
  estado              text        not null default 'pendiente'
                        check (estado in ('pendiente', 'confirmada', 'rechazada', 'cancelada', 'vencida')),
  nota                text,
  cierre_motivo       text,
  decision_por_user_id bigint,
  decision_en         timestamptz,
  solicitada_en       timestamptz not null default now(),
  actualizada_en      timestamptz not null default now(),
  expira_en           timestamptz not null
);

comment on table public.spa_citas is 'Citas del taller. Estados terminales: rechazada, cancelada, vencida.';

-- 1.5 Cola de avisos. La fila se crea en la MISMA transaccion que la cita; el
--     envio a Telegram ocurre despues y solo actualiza esta fila.
create table if not exists public.spa_notificaciones (
  id                 bigint generated always as identity primary key,
  cita_id            bigint      not null references public.spa_citas (id) on delete cascade,
  tipo               text        not null
                       check (tipo in ('solicitud_registrada', 'cita_confirmada',
                                       'cita_rechazada', 'cita_cancelada')),
  destino_chat_id    bigint      not null,
  destino_user_id    bigint      not null,
  cuerpo             text        not null,
  estado             text        not null default 'pendiente'
                       check (estado in ('pendiente', 'enviada', 'fallida', 'revision')),
  intentos           integer     not null default 0 check (intentos >= 0),
  max_intentos       integer     not null default 3 check (max_intentos > 0),
  proximo_intento_en timestamptz not null default now(),
  lease_token        uuid,
  lease_expira_en    timestamptz,
  error_codigo       text,
  error_detalle      text,
  telegram_message_id bigint,
  creada_en          timestamptz not null default now(),
  enviada_en         timestamptz,
  constraint spa_notificaciones_lease_coherente
    check ((lease_token is null) = (lease_expira_en is null))
);

comment on table public.spa_notificaciones is 'Avisos persistentes con lease. Una cita nunca se pierde si un aviso falla.';

-- 1.6 Bitacora append-only. La mutacion de cita escribe aqui su evento en la
--     misma transaccion. Tambien guarda los update_id ya atendidos (replay).
create table if not exists public.spa_eventos (
  id             bigint generated always as identity primary key,
  tipo           text        not null
                   check (tipo in ('cita_solicitada', 'cita_confirmada', 'cita_rechazada',
                                   'cita_cancelada', 'cita_vencida', 'aviso_reclamado',
                                   'aviso_finalizado', 'telegram_update')),
  cita_id        bigint      references public.spa_citas (id) on delete restrict,
  actor_user_id  bigint,
  detalle        jsonb       not null default '{}'::jsonb,
  creado_en      timestamptz not null default now()
);

comment on table public.spa_eventos is 'Bitacora de eventos y de update_id de Telegram ya procesados.';

-- -----------------------------------------------------------------------------
-- 2. Indices
-- -----------------------------------------------------------------------------
-- Los dos indices unicos parciales son la RESTRICCION REAL de ocupacion y de
-- cita activa. Gracias a ellos, dos solicitudes simultaneas al mismo horario se
-- resuelven solas: una gana y la otra recibe HORARIO_OCUPADO.
-- Consultar "si esta libre" y despues insertar NO cumple esta regla.

create unique index if not exists spa_citas_ocupacion_unica
  on public.spa_citas (horario_id)
  where estado in ('pendiente', 'confirmada');

create unique index if not exists spa_citas_activa_por_clienta_unica
  on public.spa_citas (cliente_user_id)
  where estado in ('pendiente', 'confirmada');

create index if not exists spa_citas_por_estado
  on public.spa_citas (estado, actualizada_en desc);

create index if not exists spa_citas_por_clienta
  on public.spa_citas (cliente_user_id, estado);

create index if not exists spa_notificaciones_cola
  on public.spa_notificaciones (estado, proximo_intento_en, id);

create unique index if not exists spa_notificaciones_unica_por_tipo
  on public.spa_notificaciones (cita_id, tipo);

create index if not exists spa_eventos_por_cita
  on public.spa_eventos (cita_id, creado_en);

create unique index if not exists spa_eventos_update_id_unico
  on public.spa_eventos ((detalle ->> 'update_id'))
  where tipo = 'telegram_update';

-- -----------------------------------------------------------------------------
-- 3. Row Level Security
-- -----------------------------------------------------------------------------
-- Habilitamos RLS en las seis tablas y creamos UNA politica por tabla, solo
-- para service_role. anon y authenticated se quedan sin politica: la clave
-- denied por defecto.

alter table public.spa_servicios     enable row level security;
alter table public.spa_horarios      enable row level security;
alter table public.spa_usuarios      enable row level security;
alter table public.spa_citas         enable row level security;
alter table public.spa_notificaciones enable row level security;
alter table public.spa_eventos       enable row level security;

do $do$
declare
  v_tabla text;
  v_politica text;
begin
  foreach v_tabla in array array[
    'spa_servicios', 'spa_horarios', 'spa_usuarios',
    'spa_citas', 'spa_notificaciones', 'spa_eventos'
  ] loop
    v_politica := v_tabla || '_service_role';
    if not exists (
      select 1 from pg_policies
       where schemaname = 'public' and tablename = v_tabla and policyname = v_politica
    ) then
      execute format(
        'create policy %I on public.%I for all to service_role using (true) with check (true)',
        v_politica, v_tabla
      );
    end if;
  end loop;
end
$do$;

-- -----------------------------------------------------------------------------
-- 4. Privilegios
-- -----------------------------------------------------------------------------

revoke all on table public.spa_servicios     from anon, authenticated;
revoke all on table public.spa_horarios      from anon, authenticated;
revoke all on table public.spa_usuarios      from anon, authenticated;
revoke all on table public.spa_citas         from anon, authenticated;
revoke all on table public.spa_notificaciones from anon, authenticated;
revoke all on table public.spa_eventos       from anon, authenticated;

grant all on table public.spa_servicios     to service_role;
grant all on table public.spa_horarios      to service_role;
grant all on table public.spa_usuarios      to service_role;
grant all on table public.spa_citas         to service_role;
grant all on table public.spa_notificaciones to service_role;
grant all on table public.spa_eventos       to service_role;

revoke all on sequence public.spa_servicios_id_seq      from anon, authenticated;
revoke all on sequence public.spa_horarios_id_seq       from anon, authenticated;
revoke all on sequence public.spa_citas_id_seq          from anon, authenticated;
revoke all on sequence public.spa_notificaciones_id_seq from anon, authenticated;
revoke all on sequence public.spa_eventos_id_seq        from anon, authenticated;

grant all on sequence public.spa_servicios_id_seq      to service_role;
grant all on sequence public.spa_horarios_id_seq       to service_role;
grant all on sequence public.spa_citas_id_seq          to service_role;
grant all on sequence public.spa_notificaciones_id_seq to service_role;
grant all on sequence public.spa_eventos_id_seq        to service_role;

-- -----------------------------------------------------------------------------
-- 5. Datos ficticios
-- -----------------------------------------------------------------------------
-- Idempotente: si el proyecto ya tiene estos servicios, se dejan como estan.

insert into public.spa_servicios (nombre, descripcion, precio_cop, duracion_min)
values
  ('Manicure clásica', 'Limpieza de uñas, cutícula y esmaltado semipermanente.', 35000, 60),
  ('Pedicura spa',     'Exfoliación, soaking y máximo brillo con masaje corto.', 45000, 75),
  ('Uñas de gel',      'Relleno y gel curado con lámpara.',                     60000, 90)
on conflict (nombre) do update
  set descripcion  = excluded.descripcion,
      precio_cop   = excluded.precio_cop,
      duracion_min = excluded.duracion_min;

-- -----------------------------------------------------------------------------
-- 6. Generador de horarios (idempotente)
-- -----------------------------------------------------------------------------
-- Lunes a sabado, de 09:00 a 17:00 hora de Bogota, en pasos de 60 minutos.
-- Devuelve cuantos slots NUEVOS inserto. Llamarla dos veces no duplica nada.

create or replace function public.spa_generar_horarios(p_dias integer default 21)
returns integer
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_insertados integer := 0;
  v_dias       integer;
  v_primera    date;
  v_dia        date;
  v_hora       integer;
begin
  v_dias := least(greatest(coalesce(p_dias, 21), 1), 120);

  v_primera := (now() at time zone 'America/Bogota')::date;

  for i in 0 .. v_dias loop
    v_dia := v_primera + i;

    -- domingo (isodow 7) no se abre
    if extract(isodow from v_dia) <> 7 then
      for v_hora in 9 .. 17 loop
        insert into public.spa_horarios (inicio)
        values ((v_dia + (v_hora || ' hours')::interval) at time zone 'America/Bogota')
        on conflict (inicio) do nothing;

        if found then
          v_insertados := v_insertados + 1;
        end if;
      end loop;
    end if;
  end loop;

  return v_insertados;
end;
$fn$;

comment on function public.spa_generar_horarios(integer) is
  'Genera slots futuros en America/Bogota. Idempotente. Devuelve los slots nuevos.';

-- -----------------------------------------------------------------------------
-- 7. Registro de usuarios y de update_id
-- -----------------------------------------------------------------------------

create or replace function public.spa_registrar_usuario(
  p_user_id  bigint,
  p_chat_id  bigint,
  p_nombre   text,
  p_username text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
begin
  if p_user_id is null then
    raise exception using errcode = 'P0001', message = 'USUARIO_NO_REGISTRADO';
  end if;

  insert into public.spa_usuarios as u (user_id, chat_id, nombre, username, primer_mensaje_en, visto_en)
  values (
    p_user_id,
    coalesce(p_chat_id, p_user_id),
    coalesce(nullif(btrim(coalesce(p_nombre, '')), ''), 'Sin nombre'),
    nullif(btrim(coalesce(p_username, '')), ''),
    now(),
    now()
  )
  on conflict (user_id) do update
    set chat_id   = excluded.chat_id,
        nombre    = excluded.nombre,
        username  = excluded.username,
        visto_en  = now(),
        activo    = true;
end;
$fn$;

comment on function public.spa_registrar_usuario(bigint, bigint, text, text) is
  'Registra o actualiza una persona. Idempotente. No autoriza nada.';

create or replace function public.spa_registrar_update(p_update_id bigint)
returns boolean
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_nuevo boolean;
begin
  if p_update_id is null then
    return false;
  end if;

  -- El indice unico parcial spa_eventos_update_id_unico absorbe el replay.
  insert into public.spa_eventos (tipo, detalle)
  values ('telegram_update', jsonb_build_object('update_id', p_update_id))
  on conflict do nothing;

  v_nuevo := found;
  return v_nuevo;
end;
$fn$;

comment on function public.spa_registrar_update(bigint) is
  'Devuelve true si el update_id es nuevo y false si ya se habia procesado (replay).';

-- -----------------------------------------------------------------------------
-- 8. Vencimiento perezoso
-- -----------------------------------------------------------------------------
-- No hay cron en esta practica: las citas pendientes vencidas se marcan cuando
-- alguien consulta o agenda.

create or replace function public.spa_vencer_citas()
returns integer
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_total integer;
begin
  with vencidas as (
    update public.spa_citas c
       set estado          = 'vencida',
           actualizada_en   = now(),
           cierre_motivo    = coalesce(c.cierre_motivo, 'vencida por tiempo')
     where c.estado = 'pendiente'
       and c.expira_en < now()
     returning c.id
  ), registradas as (
    insert into public.spa_eventos (tipo, cita_id, detalle)
    select 'cita_vencida', v.id, '{}'::jsonb
      from vencidas v
     returning 1
  )
  select count(*) into v_total from registradas;

  return v_total;
end;
$fn$;

comment on function public.spa_vencer_citas() is
  'Marca como vencida las citas pendientes cuyo expira_en ya paso. Devuelve cuantas.';

-- -----------------------------------------------------------------------------
-- 9. Mutacion de cita: evento + cita + aviso en UNA sola transaccion
-- -----------------------------------------------------------------------------

create or replace function public.spa_mutar_cita(
  p_accion              text,
  p_actor_user_id       bigint,
  p_actor_chat_id       bigint,
  p_cliente_user_id     bigint default null,
  p_cliente_chat_id     bigint default null,
  p_servicio_id         bigint default null,
  p_horario_id          bigint default null,
  p_cita_id             bigint default null,
  p_nota                text    default null,
  p_responsable_user_id bigint default null,
  p_responsable_chat_id bigint default null
)
returns table (
  cita_id    bigint,
  estado     text,
  horario_id bigint,
  inicio     timestamptz
)
language plpgsql
security definer
set search_path = public
as $fn$
-- Las columnas OUT de arriba (cita_id, estado, horario_id, inicio) se convierten
-- en variables de plpgsql dentro de la funcion, y son nombres de columna en las
-- consultas de esta funcion. Sin esta opcion, Postgres responde
-- "column reference cita_id is ambiguous" en la PRIMERA llamada.
-- use_column dice: cuando un nombre es columna y variable, gana la columna.
#variable_conflict use_column
declare
  v_accion        text;
  v_cita          public.spa_citas%rowtype;
  v_servicio      public.spa_servicios%rowtype;
  v_horario       public.spa_horarios%rowtype;
  v_inicio        timestamptz;
  v_fin           timestamptz;
  v_nuevo_estado  text;
  v_texto         text;
  v_nombre_servicio text;
  v_quien_recibe  bigint;
  v_chat_recibe   bigint;
  v_es_responsable boolean;
  v_es_duena      boolean;
begin
  v_accion := lower(btrim(coalesce(p_accion, '')));

  if v_accion = 'solicitar' then
    -- 9.1 La clienta debe estar registrada (FK) y el responsable debe existir.
    if p_cliente_user_id is null or p_cliente_chat_id is null then
      raise exception using errcode = 'P0001', message = 'USUARIO_NO_REGISTRADO';
    end if;

    if not exists (
      select 1 from public.spa_usuarios u
       where u.user_id = p_cliente_user_id and u.activo
    ) then
      raise exception using errcode = 'P0001', message = 'USUARIO_NO_REGISTRADO';
    end if;

    if p_responsable_user_id is null or p_responsable_chat_id is null then
      raise exception using errcode = 'P0001', message = 'SIN_PERMISO';
    end if;

    -- 9.2 Servicio y horario validos.
    select s.* into v_servicio from public.spa_servicios s where s.id = p_servicio_id;
    if not found or not v_servicio.activo then
      raise exception using errcode = 'P0001', message = 'SERVICIO_INACTIVO';
    end if;

    select h.* into v_horario from public.spa_horarios h where h.id = p_horario_id;
    if not found or not v_horario.activo then
      raise exception using errcode = 'P0001', message = 'HORARIO_FUERA_DE_JORNADA';
    end if;

    -- 9.3 Revalidacion de disponibilidad en el momento de crear la solicitud.
    if v_horario.inicio <= now() then
      raise exception using errcode = 'P0001', message = 'HORARIO_PASADO';
    end if;

    v_inicio := v_horario.inicio;
    v_fin    := v_inicio + make_interval(mins => v_servicio.duracion_min);

    if (v_fin  at time zone 'America/Bogota')::date
       <> (v_inicio at time zone 'America/Bogota')::date
       or to_char(v_fin at time zone 'America/Bogota', 'HH24:MI') > '18:00'
    then
      raise exception using errcode = 'P0001', message = 'HORARIO_FUERA_DE_JORNADA';
    end if;

    -- 9.4 Alta de la cita. El indice parcial decide quien gana si hay carrera.
    begin
      insert into public.spa_citas (
        cliente_user_id, cliente_chat_id, servicio_id, horario_id, estado, nota,
        solicitada_en, actualizada_en, expira_en
      )
      values (
        p_cliente_user_id, p_cliente_chat_id, v_servicio.id, v_horario.id, 'pendiente',
        nullif(btrim(coalesce(p_nota, '')), ''),
        now(), now(),
        least(now() + interval '24 hours', v_horario.inicio)
      )
      returning * into v_cita;
    exception
      when unique_violation then
        if exists (
          select 1 from public.spa_citas c
           where c.horario_id = v_horario.id
             and c.estado in ('pendiente', 'confirmada')
        ) then
          raise exception using errcode = 'P0001', message = 'HORARIO_OCUPADO';
        end if;
        raise exception using errcode = 'P0001', message = 'CITA_ACTIVA_EXISTENTE';
    end;

    -- 9.5 Evento y aviso, en la MISMA transaccion que la cita.
    insert into public.spa_eventos (tipo, cita_id, actor_user_id, detalle)
    values (
      'cita_solicitada',
      v_cita.id,
      p_cliente_user_id,
      jsonb_build_object(
        'servicio_id', v_servicio.id,
        'horario_id', v_horario.id,
        'inicio_bogota', to_char(v_inicio at time zone 'America/Bogota', 'YYYY-MM-DD HH24:MI')
      )
    );

    v_texto := format(
      'Solicitud #%s. %s, %s COP, el %s (America/Bogota). Confirma o rechaza.',
      v_cita.id,
      v_servicio.nombre,
      to_char(v_servicio.precio_cop, 'FM999G999G999'),
      to_char(v_inicio at time zone 'America/Bogota', 'DD/MM/YYYY HH24:MI')
    );

    insert into public.spa_notificaciones (
      cita_id, tipo, destino_chat_id, destino_user_id, cuerpo
    )
    values (
      v_cita.id, 'solicitud_registrada', p_responsable_chat_id, p_responsable_user_id, v_texto
    )
    on conflict (cita_id, tipo) do nothing;

    return query select v_cita.id, v_cita.estado, v_cita.horario_id, v_inicio;
    return;

  elsif v_accion in ('confirmar', 'rechazar') then
    -- 9.6 Solo el responsable, y solo desde el entorno: p_responsable_user_id.
    if p_responsable_user_id is null
       or p_actor_user_id is distinct from p_responsable_user_id
    then
      raise exception using errcode = 'P0001', message = 'SIN_PERMISO';
    end if;

    select c.* into v_cita from public.spa_citas c where c.id = p_cita_id for update;
    if not found then
      raise exception using errcode = 'P0001', message = 'CITA_NO_ENCONTRADA';
    end if;

    if v_cita.estado <> 'pendiente' then
      raise exception using errcode = 'P0001', message = 'TRANSICION_INVALIDA';
    end if;

    v_nuevo_estado := case when v_accion = 'confirmar' then 'confirmada' else 'rechazada' end;

    update public.spa_citas c
       set estado               = v_nuevo_estado,
           cierre_motivo        = case when v_accion = 'confirmar' then null
                                       else 'rechazada por el responsable' end,
           decision_por_user_id = p_actor_user_id,
           decision_en           = now(),
           actualizada_en        = now()
     where c.id = v_cita.id;

    select s.nombre into v_nombre_servicio
      from public.spa_servicios s where s.id = v_cita.servicio_id;
    select h.inicio into v_inicio
      from public.spa_horarios h where h.id = v_cita.horario_id;

    insert into public.spa_eventos (tipo, cita_id, actor_user_id, detalle)
    values (
      case when v_accion = 'confirmar' then 'cita_confirmada' else 'cita_rechazada' end,
      v_cita.id,
      p_actor_user_id,
      jsonb_build_object('estado', v_nuevo_estado)
    );

    v_texto := case when v_accion = 'confirmar'
      then format('Tu cita #%s de %s quedo CONFIRMADA para el %s (America/Bogota).',
                  v_cita.id, v_nombre_servicio,
                  to_char(v_inicio at time zone 'America/Bogota', 'DD/MM/YYYY HH24:MI'))
      else format('Tu cita #%s de %s fue RECHAZADA. Puedes solicitar otro horario.',
                  v_cita.id, v_nombre_servicio)
    end;

    insert into public.spa_notificaciones (
      cita_id, tipo, destino_chat_id, destino_user_id, cuerpo
    )
    values (
      v_cita.id,
      case when v_accion = 'confirmar' then 'cita_confirmada' else 'cita_rechazada' end,
      v_cita.cliente_chat_id,
      v_cita.cliente_user_id,
      v_texto
    )
    on conflict (cita_id, tipo) do nothing;

    return query select v_cita.id, v_nuevo_estado, v_cita.horario_id, v_inicio;
    return;

  elsif v_accion = 'cancelar' then
    -- 9.7 Cancela la clienta duena o el responsable.
    select c.* into v_cita from public.spa_citas c where c.id = p_cita_id for update;
    if not found then
      raise exception using errcode = 'P0001', message = 'CITA_NO_ENCONTRADA';
    end if;

    v_es_responsable := p_responsable_user_id is not null
                        and p_actor_user_id is not distinct from p_responsable_user_id;
    v_es_duena := p_actor_user_id is not distinct from v_cita.cliente_user_id;

    if not (v_es_responsable or v_es_duena) then
      raise exception using errcode = 'P0001', message = 'SIN_PERMISO';
    end if;

    if v_cita.estado not in ('pendiente', 'confirmada') then
      raise exception using errcode = 'P0001', message = 'TRANSICION_INVALIDA';
    end if;

    update public.spa_citas c
       set estado               = 'cancelada',
           cierre_motivo        = coalesce(c.cierre_motivo, 'cancelada por ' ||
                                             case when v_es_duena then 'la clienta' else 'el responsable' end),
           decision_por_user_id = p_actor_user_id,
           decision_en           = now(),
           actualizada_en        = now()
     where c.id = v_cita.id;

    select s.nombre into v_nombre_servicio
      from public.spa_servicios s where s.id = v_cita.servicio_id;
    select h.inicio into v_inicio
      from public.spa_horarios h where h.id = v_cita.horario_id;

    insert into public.spa_eventos (tipo, cita_id, actor_user_id, detalle)
    values ('cita_cancelada', v_cita.id, p_actor_user_id, jsonb_build_object('estado', 'cancelada'));

    -- Avisa a la contraparte: la contraparte de la clienta es el responsable.
    if v_es_duena and not v_es_responsable then
      v_quien_recibe := p_responsable_user_id;
      v_chat_recibe  := p_responsable_chat_id;
    else
      v_quien_recibe := v_cita.cliente_user_id;
      v_chat_recibe  := v_cita.cliente_chat_id;
    end if;

    if v_quien_recibe is not null then
      v_texto := format('La cita #%s de %s (%s) fue cancelada.',
                        v_cita.id, v_nombre_servicio,
                        to_char(v_inicio at time zone 'America/Bogota', 'DD/MM/YYYY HH24:MI'));

      insert into public.spa_notificaciones (
        cita_id, tipo, destino_chat_id, destino_user_id, cuerpo
      )
      values (v_cita.id, 'cita_cancelada', v_chat_recibe, v_quien_recibe, v_texto)
      on conflict (cita_id, tipo) do nothing;
    end if;

    return query select v_cita.id, 'cancelada', v_cita.horario_id, v_inicio;
    return;

  end if;

  raise exception using errcode = 'P0001', message = 'ACCION_DESCONOCIDA';
end;
$fn$;

comment on function public.spa_mutar_cita(text, bigint, bigint, bigint, bigint, bigint, bigint, bigint, text, bigint, bigint) is
  'Acciones: solicitar, confirmar, rechazar, cancelar. Escribe evento, cita y aviso en una sola transaccion.';

-- -----------------------------------------------------------------------------
-- 10. Cola de avisos: reclamar con lease y finalizar
-- -----------------------------------------------------------------------------
-- Reclamar usa FOR UPDATE SKIP LOCKED y limita el lote: dos funciones que
-- procesen la cola a la vez nunca toman el mismo aviso.

create or replace function public.spa_reclamar_avisos(
  p_lote           integer default 10,
  p_lease_segundos integer default 60
)
returns setof public.spa_notificaciones
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_lote  integer;
  v_lease integer;
begin
  v_lote  := least(greatest(coalesce(p_lote, 10), 1), 50);
  v_lease := least(greatest(coalesce(p_lease_segundos, 60), 5), 600);

  return query
  with listos as (
    select n.id
      from public.spa_notificaciones n
     where n.estado = 'pendiente'
       and n.proximo_intento_en <= now()
       and (n.lease_expira_en is null or n.lease_expira_en < now())
     order by n.proximo_intento_en, n.id
     for update skip locked
     limit v_lote
  ), reclamados as (
    update public.spa_notificaciones n
       set lease_token     = gen_random_uuid(),
           lease_expira_en = now() + make_interval(secs => v_lease),
           intentos        = n.intentos + 1
      from listos
     where n.id = listos.id
    returning n.*
  ), registrados as (
    insert into public.spa_eventos (tipo, cita_id, detalle)
    select 'aviso_reclamado', r.cita_id, jsonb_build_object('aviso_id', r.id, 'intento', r.intentos)
      from reclamados r
     returning 1
  )
  select r.* from reclamados r;
end;
$fn$;

comment on function public.spa_reclamar_avisos(integer, integer) is
  'Reclama avisos pendientes con lease. Lote limitado a 50 y SKIP LOCKED. Un lease vencido vuelve a ser reclamable.';

-- Finalizar exige el token del lease: si no coincide o el lease ya vencio,
-- responde LEASE_INVALIDO y no toca la fila.

create or replace function public.spa_finalizar_aviso(
  p_id                   bigint,
  p_lease_token          uuid,
  p_resultado            text,
  p_error_codigo         text default null,
  p_error_detalle        text default null,
  p_telegram_message_id  bigint default null
)
returns public.spa_notificaciones
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_aviso     public.spa_notificaciones%rowtype;
  v_resultado text;
  v_permanente boolean;
  v_espera    interval;
  v_retry     integer;
begin
  select n.* into v_aviso from public.spa_notificaciones n where n.id = p_id for update;
  if not found then
    raise exception using errcode = 'P0001', message = 'AVISO_NO_ENCONTRADO';
  end if;

  if p_lease_token is null
     or v_aviso.lease_token is null
     or v_aviso.lease_expira_en is null
     or v_aviso.lease_expira_en < now()
     or v_aviso.lease_token <> p_lease_token
  then
    raise exception using errcode = 'P0001', message = 'LEASE_INVALIDO';
  end if;

  v_resultado := lower(btrim(coalesce(p_resultado, '')));
  if v_resultado not in ('enviado', 'fallido', 'revision') then
    raise exception using errcode = 'P0001', message = 'RESULTADO_DESCONOCIDO';
  end if;

  if v_resultado = 'enviado' then
    update public.spa_notificaciones n
       set estado               = 'enviada',
           telegram_message_id  = p_telegram_message_id,
           enviada_en           = now(),
           lease_token          = null,
           lease_expira_en      = null,
           error_codigo         = null,
           error_detalle        = null
     where n.id = p_id
    returning n.* into v_aviso;

  elsif v_resultado = 'revision' then
    -- Timeout incierto: no se reintenta solo. Requiere decision humana.
    update public.spa_notificaciones n
       set estado          = 'revision',
           error_codigo     = p_error_codigo,
           error_detalle    = p_error_detalle,
           lease_token      = null,
           lease_expira_en  = null
     where n.id = p_id
    returning n.* into v_aviso;

  else
    v_permanente := coalesce(p_error_codigo in ('400', '403', '404'), false);

    if not v_permanente and v_aviso.intentos < v_aviso.max_intentos then
      v_retry := substring(coalesce(p_error_detalle, '') from 'retry_after=(\d+)')::integer;

      v_espera := make_interval(secs => least(30 * power(2, v_aviso.intentos), 900));
      if v_retry is not null and v_retry > 0 then
        v_espera := make_interval(secs => v_retry);
      end if;

      update public.spa_notificaciones n
         set estado             = 'pendiente',
             proximo_intento_en = now() + v_espera,
             error_codigo       = p_error_codigo,
             error_detalle      = p_error_detalle,
             lease_token        = null,
             lease_expira_en    = null
       where n.id = p_id
      returning n.* into v_aviso;
    else
      update public.spa_notificaciones n
         set estado          = 'fallida',
             error_codigo    = p_error_codigo,
             error_detalle   = p_error_detalle,
             lease_token     = null,
             lease_expira_en = null
       where n.id = p_id
      returning n.* into v_aviso;
    end if;
  end if;

  insert into public.spa_eventos (tipo, cita_id, detalle)
  values (
    'aviso_finalizado',
    v_aviso.cita_id,
    jsonb_build_object(
      'aviso_id', v_aviso.id,
      'estado', v_aviso.estado,
      'intentos', v_aviso.intentos,
      'error_codigo', v_aviso.error_codigo
    )
  );

  return v_aviso;
end;
$fn$;

comment on function public.spa_finalizar_aviso(bigint, uuid, text, text, text, bigint) is
  'Cierra un aviso reclamado: enviado, fallido (con backoff) o revision (incierto). Exige el lease vigente.';

-- -----------------------------------------------------------------------------
-- 11. Privilegios de las funciones
-- -----------------------------------------------------------------------------
-- PUBLIC incluye a anon y authenticated. Se revoca y se concede solo a
-- service_role, que es el rol con el que corre la Edge Function.

revoke execute on function public.spa_generar_horarios(integer)
  from PUBLIC, anon, authenticated;
revoke execute on function public.spa_registrar_usuario(bigint, bigint, text, text)
  from PUBLIC, anon, authenticated;
revoke execute on function public.spa_registrar_update(bigint)
  from PUBLIC, anon, authenticated;
revoke execute on function public.spa_vencer_citas()
  from PUBLIC, anon, authenticated;
revoke execute on function public.spa_mutar_cita(text, bigint, bigint, bigint, bigint, bigint, bigint, bigint, text, bigint, bigint)
  from PUBLIC, anon, authenticated;
revoke execute on function public.spa_reclamar_avisos(integer, integer)
  from PUBLIC, anon, authenticated;
revoke execute on function public.spa_finalizar_aviso(bigint, uuid, text, text, text, bigint)
  from PUBLIC, anon, authenticated;

grant execute on function public.spa_generar_horarios(integer)
  to service_role;
grant execute on function public.spa_registrar_usuario(bigint, bigint, text, text)
  to service_role;
grant execute on function public.spa_registrar_update(bigint)
  to service_role;
grant execute on function public.spa_vencer_citas()
  to service_role;
grant execute on function public.spa_mutar_cita(text, bigint, bigint, bigint, bigint, bigint, bigint, bigint, text, bigint, bigint)
  to service_role;
grant execute on function public.spa_reclamar_avisos(integer, integer)
  to service_role;
grant execute on function public.spa_finalizar_aviso(bigint, uuid, text, text, text, bigint)
  to service_role;

-- =============================================================================
-- Fin de la migracion. Sigue con tests/integration.sql
-- =============================================================================
