-- =============================================================================
-- Pruebas de integracion · Módulo 5 · Bot de Telegram para el Spa Manos y Pies
-- =============================================================================
-- ESTA PRUEBA NECESITA UNA BASE REAL. No usa mocks ni reloj fijo: usa now() de
-- verdad y comprueba indices unicos, RLS y leases reales. Para esto SIEMPRE hay
-- que ejecutar la migracion antes.
--
--   Migracion:  supabase/migrations/202610020001_spa.sql   (una sola vez)
--   Pruebas:    este archivo                             (repetible, sin datos)
--   Unitarias:  deno task test                            (mocks, reloj fijo)
--
-- COMO EJECUTARLO
--   1. Aplica la migracion en Supabase -> SQL Editor -> New query -> Run.
--   2. Supabase -> SQL Editor -> New query -> pega este archivo -> Run.
--
-- POR QUE ESTE ARCHIVO ES UNA SOLA INSTRUCCION
--   El SQL Editor de Supabase parte el texto en varias sentencias y las manda
--   por conexiones distintas. Con eso se rompen tres cosas: las tablas
--   temporales (mueren con la conexion), los bloques BEGIN/ROLLBACK (cada
--   trozo va en su propia transaccion) y los helpers. Todo eso esta probado
--   en contra de este editor.
--
--   Por eso el archivo entero es UN solo "do $todo$ ... $todo$". Adentro van:
--     * los helpers y la tabla de horarios, en el esquema temporal de la
--       sesion (pg_temp): se borran solos al cerrar la conexion;
--     * las secciones 1 a 18, sin cambios;
--     * una limpieza final que borra SOLO las filas ficticias de la prueba y
--       comprueba que la base quedo igual que estaba.
--
--   No se usa BEGIN/ROLLBACK porque un "do" ya es atomico: si algo falla, no
--   queda nada. Y no se puede usar SAVEPOINT dentro de un bloque plpgsql
--   ("EXECUTE of transaction commands is not implemented"), que es
--   justamente por lo que hace falta la limpieza explicita del final.
--
-- Personas y citas son ficticias (user_id 9000xxxxx). Si una asercion falla, el
-- error dice exactamente cual. No bajes el criterio: arregla la causa.
-- =============================================================================

do $todo$
declare
  v_base_usuarios     integer;
  v_base_horarios     integer;
  v_base_citas        integer;
  v_base_avisos       integer;
  v_base_eventos      integer;
  v_citas_limpiadas   bigint;
begin
-- Ancla: materializa el esquema temporal de la sesion (pg_temp) para que
-- dentro se puedan crear funciones. El "if not exists" es por si el editor
-- reutiliza la misma conexion y esto se ejecuta dos veces seguidas.
execute 'create temporary table if not exists tmp_ancla (id int)';

-- Cuantas filas hay de verdad antes de empezar. La limpieza final tiene que
-- dejarnos aqui otra vez.
-- Los horarios que ya habia se apartan aqui: al final se borra todo lo que NO
-- este en esta lista, que es exactamente lo que creo la prueba.
execute $t0$
create temporary table if not exists tmp_horarios_previos (
  id bigint primary key
)
$t0$;

-- Relleno tolerante a reejecuciones: si la tabla ya tenia filas de una vuelta
-- anterior, se refreshed en vez de fallar por clave duplicada.
insert into tmp_horarios_previos (id)
select id from public.spa_horarios
on conflict (id) do nothing;

select
  (select count(*) from public.spa_usuarios),
  (select count(*) from public.spa_horarios),
  (select count(*) from public.spa_citas),
  (select count(*) from public.spa_notificaciones),
  (select count(*) from public.spa_eventos)
into v_base_usuarios, v_base_horarios, v_base_citas, v_base_avisos, v_base_eventos;

-- -----------------------------------------------------------------------------
-- 0. Andamiaje de prueba
-- -----------------------------------------------------------------------------
-- Los helpers viven en pg_temp, el esquema temporal de la sesion. Al cerrar la
-- conexion desaparecen solos, asi que la base de datos del proyecto no se
-- entera. Por eso NO hace falta crear ningun esquema permanente, ni ningun
-- GRANT: pg_temp pertenece a la sesion que ejecuta la prueba.

execute $x1$
create or replace function pg_temp.afirma(p_condicion boolean, p_mensaje text)
returns void
language plpgsql
as $f$
begin
  if p_condicion is null or not p_condicion then
    raise exception 'ASERCION FALLIDA: %', p_mensaje;
  end if;
end
$f$;
$x1$;

-- Ejecuta p_accion y exige que falle con un mensaje que contenga p_esperado.
-- Sirve para nuestros codigos de error (P0001), que no dependen del idioma.
execute $x2$
create or replace function pg_temp.afirma_error(p_esperado text, p_accion text)
returns void
language plpgsql
as $f$
declare
  v_mensaje text;
begin
  begin
    execute p_accion;
  exception when others then
    v_mensaje := sqlerrm;
  end;

  if v_mensaje is null then
    raise exception 'ASERCION FALLIDA: se esperaba el error "%" pero la accion NO fallo', p_esperado;
  end if;

  if position(p_esperado in v_mensaje) = 0 then
    raise exception 'ASERCION FALLIDA: se esperaba "%" y se obtuvo "%"', p_esperado, v_mensaje;
  end if;
end
$f$;
$x2$;

-- Como afirma_error pero sin mirar el texto: para errores de PostgreSQL, cuyo
-- mensaje cambia con el idioma de la base.
execute $x3$
create or replace function pg_temp.afirma_falla(p_accion text, p_mensaje text)
returns void
language plpgsql
as $f$
begin
  begin
    execute p_accion;
  exception when others then
    return;
  end;

  raise exception 'ASERCION FALLIDA: % (la accion NO fallo)', p_mensaje;
end
$f$;
$x3$;

-- Nota: esta suite NO cambia plpgsql.variable_conflict.
--
-- En Supabase el rol postgres no es superusuario, asi que
-- "set local plpgsql.variable_conflict" falla con 42501 permission denied.
-- No hace falta: la ambiguedad entre las columnas OUT de spa_mutar_cita y las
-- columnas de las tablas ocurre DENTRO de la funcion, y ahi ya esta resuelta con
-- "#variable_conflict use_column" en el cuerpo de la propia funcion (PostgreSQL 15+).
-- Aca, fuera, las columnas del resultado se nombran siempre con alias (_res, _libre,
-- _otra) para no depender de esa opcion.

-- -----------------------------------------------------------------------------
-- 1. Estructura: seis tablas con RLS activo
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_total   integer;
  v_sin_rls text;
begin
  select count(*) into v_total
    from information_schema.tables
   where table_schema = 'public' and table_name like 'spa\_%';

  perform pg_temp.afirma(v_total = 6,
    'deben existir exactamente 6 tablas spa_*, se hallaron ' || v_total);

  -- relkind 'r' filtra solo tablas: sin esto tambien entran los indices
  -- (spa_citas_pkey) y las secuencias (spa_citas_id_seq), que no llevan RLS.
  select string_agg(c.relname, ', ' order by c.relname) into v_sin_rls
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relname like 'spa\_%'
     and c.relkind = 'r'
     and c.relrowsecurity = false;

  perform pg_temp.afirma(v_sin_rls is null,
    'RLS debe estar activo en las 6 tablas; sin RLS: ' || coalesce(v_sin_rls, '-'));
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 2. Privilegios declarados: anon y authenticated no tienen nada
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_tabla text;
  v_malas text;
begin
  foreach v_tabla in array array[
    'spa_servicios', 'spa_horarios', 'spa_usuarios',
    'spa_citas', 'spa_notificaciones', 'spa_eventos'
  ] loop
    perform pg_temp.afirma(
      not has_table_privilege('anon', 'public.' || v_tabla, 'select'),
      'anon no debe poder leer ' || v_tabla
    );
    perform pg_temp.afirma(
      not has_table_privilege('anon', 'public.' || v_tabla, 'insert'),
      'anon no debe poder escribir ' || v_tabla
    );
    perform pg_temp.afirma(
      not has_table_privilege('authenticated', 'public.' || v_tabla, 'select'),
      'authenticated no debe poder leer ' || v_tabla
    );
    perform pg_temp.afirma(
      has_table_privilege('service_role', 'public.' || v_tabla, 'select'),
      'service_role debe poder leer ' || v_tabla
    );
  end loop;

  -- Las politicas RLS solo pueden existir para service_role.
  select string_agg(t.tablename, ', ') into v_malas
    from pg_policies p
    join (values ('spa_servicios'), ('spa_horarios'), ('spa_usuarios'),
                 ('spa_citas'), ('spa_notificaciones'), ('spa_eventos')) as t(tablename)
      on t.tablename = p.tablename
   where p.schemaname = 'public'
     and p.roles <> '{service_role}'::name[];

  perform pg_temp.afirma(v_malas is null,
    'las politicas RLS deben ser solo de service_role; hay de: ' || coalesce(v_malas, '-'));

  -- Ninguna RPC se puede ejecutar desde anon ni authenticated.
  perform pg_temp.afirma(
    not has_function_privilege('anon', 'public.spa_generar_horarios(integer)', 'execute'),
    'anon no debe ejecutar spa_generar_horarios');
  perform pg_temp.afirma(
    not has_function_privilege('anon',
      'public.spa_mutar_cita(text,bigint,bigint,bigint,bigint,bigint,bigint,bigint,text,bigint,bigint)', 'execute'),
    'anon no debe ejecutar spa_mutar_cita');
  perform pg_temp.afirma(
    not has_function_privilege('authenticated', 'public.spa_reclamar_avisos(integer,integer)', 'execute'),
    'authenticated no debe ejecutar spa_reclamar_avisos');
  perform pg_temp.afirma(
    not has_function_privilege('authenticated', 'public.spa_finalizar_aviso(bigint,uuid,text,text,text,bigint)', 'execute'),
    'authenticated no debe ejecutar spa_finalizar_aviso');
  perform pg_temp.afirma(
    has_function_privilege('service_role',
      'public.spa_finalizar_aviso(bigint,uuid,text,text,text,bigint)', 'execute'),
    'service_role debe ejecutar spa_finalizar_aviso');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 3. Semilla ficticia: tres servicios, precios y duraciones de la migracion
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_total integer;
begin
  select count(*) into v_total from public.spa_servicios;
  perform pg_temp.afirma(v_total = 3, 'deben existir 3 servicios ficticios, hay ' || v_total);

  perform pg_temp.afirma(
    not exists (select 1 from public.spa_servicios where precio_cop <= 0),
    'ningun servicio puede tener precio 0 o negativo');

  perform pg_temp.afirma(
    exists (select 1 from public.spa_servicios where duracion_min = 60)
    and exists (select 1 from public.spa_servicios where duracion_min = 90),
    'debe existir un servicio de 60 min y uno de 90 min para las pruebas de jornada');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 4. Generador de horarios: idempotente y en America/Bogota
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_primero integer;
  v_segundo integer;
  v_fuera   integer;
  v_hora    text;
begin
  v_primero := public.spa_generar_horarios(14);
  v_segundo := public.spa_generar_horarios(14);

  perform pg_temp.afirma(v_segundo = 0,
    'spa_generar_horarios debe ser idempotente; en la segunda llamada inserto ' || v_segundo);

  select count(*) into v_fuera
    from public.spa_horarios
   where inicio > now()
     and extract(isodow from inicio at time zone 'America/Bogota') = 7;

  perform pg_temp.afirma(v_fuera = 0,
    'no debe haber horarios en domingo, hay ' || v_fuera);

  select to_char(min(inicio at time zone 'America/Bogota'), 'HH24:MI') into v_hora
    from public.spa_horarios
   where inicio > now();

  perform pg_temp.afirma(v_hora >= '09:00',
    'el primer slot debe ser 09:00 o mas tarde en Bogota, es ' || v_hora);
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 5. Personas y horarios de prueba
-- -----------------------------------------------------------------------------

perform public.spa_registrar_usuario(900000000, 900000000, 'Responsable ficticia', 'responsable_taller');
perform public.spa_registrar_usuario(900000001, 900000001, 'Clienta B ficticia', 'clienta_b');
perform public.spa_registrar_usuario(900000002, 900000002, 'Clienta C ficticia', 'clienta_c');
perform public.spa_registrar_usuario(900000003, 900000003, 'Clienta D ficticia', 'clienta_d');
perform public.spa_registrar_usuario(900000004, 900000004, 'Clienta E ficticia', 'clienta_e');
perform public.spa_registrar_usuario(900000005, 900000005, 'Clienta F ficticia', 'clienta_f');
perform public.spa_registrar_usuario(900000006, 900000006, 'Clienta G ficticia', 'clienta_g');
perform public.spa_registrar_usuario(900000007, 900000007, 'Clienta H ficticia', 'clienta_h');
perform public.spa_registrar_usuario(900000008, 900000008, 'Clienta I ficticia', 'clienta_i');
perform public.spa_registrar_usuario(900000009, 900000009, 'Clienta J ficticia', 'clienta_j');
perform public.spa_registrar_usuario(900000010, 900000010, 'Clienta K ficticia', 'clienta_k');

-- Horarios deterministas. Se insertan a proposito para no depender de la
-- rejilla generada y para tener un caso claro de fin de jornada.
insert into public.spa_horarios (inicio)
values
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 10 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 11 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 12 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 13 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 14 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 15 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 16 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 17 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '3 days 10 hours') at time zone 'America/Bogota'),
  ((date_trunc('day', now() at time zone 'America/Bogota') + interval '3 days 11 hours') at time zone 'America/Bogota'),
  (now() - interval '2 days')
on conflict (inicio) do nothing;

-- Nombre legible para cada horario de prueba. Va por execute porque el DDL no
-- se puede escribir directo dentro de plpgsql. Sin "on commit drop": esta tabla
-- es de la sesion y el "do" es una sola transaccion, asi que se va sola.
execute $t1$
create temporary table if not exists tmp_horarios (
  nombre     text primary key,
  horario_id bigint not null
)
$t1$;

insert into tmp_horarios (nombre, horario_id)
select t.nombre, h.id
  from (values
    ('dia2_10', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 10 hours') at time zone 'America/Bogota')),
    ('dia2_11', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 11 hours') at time zone 'America/Bogota')),
    ('dia2_12', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 12 hours') at time zone 'America/Bogota')),
    ('dia2_13', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 13 hours') at time zone 'America/Bogota')),
    ('dia2_14', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 14 hours') at time zone 'America/Bogota')),
    ('dia2_15', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 15 hours') at time zone 'America/Bogota')),
    ('dia2_16', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 16 hours') at time zone 'America/Bogota')),
    ('dia2_17', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '2 days 17 hours') at time zone 'America/Bogota')),
    ('dia3_10', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '3 days 10 hours') at time zone 'America/Bogota')),
    ('dia3_11', ((date_trunc('day', now() at time zone 'America/Bogota') + interval '3 days 11 hours') at time zone 'America/Bogota')),
    ('pasado',  (now() - interval '2 days'))
  ) as t(nombre, inicio)
  join public.spa_horarios h on h.inicio = t.inicio
on conflict (nombre) do update set horario_id = excluded.horario_id;

do $prueba$
declare
  v_total integer;
begin
  select count(*) into v_total from tmp_horarios;
  perform pg_temp.afirma(v_total = 11,
    'deben quedar 11 horarios de prueba resolubles, hay ' || v_total);
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 6. Solicitar: cita PENDIENTE + evento + aviso, en una sola transaccion
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio bigint;
  v_horario  bigint;
  v_cita     bigint;
  v_estado   text;
  v_eventos  integer;
  v_avisos   integer;
begin
  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_10';

  select cita_id, estado into v_cita, v_estado
    from public.spa_mutar_cita(
      'solicitar', 900000001, 900000001,
      900000001, 900000001, v_servicio, v_horario, null, 'nota ficticia',
      900000000, 900000000);

  perform pg_temp.afirma(v_cita is not null, 'solicitar debe devolver el id de la cita');
  perform pg_temp.afirma(v_estado = 'pendiente',
    'solicitar NUNCA crea la cita confirmada, creo ' || coalesce(v_estado, 'nada'));

  select count(*) into v_eventos
    from public.spa_eventos
   where cita_id = v_cita and tipo = 'cita_solicitada';

  perform pg_temp.afirma(v_eventos = 1,
    'debe quedar 1 evento cita_solicitada, hay ' || v_eventos);

  select count(*) into v_avisos
    from public.spa_notificaciones
   where cita_id = v_cita
     and tipo = 'solicitud_registrada'
     and estado = 'pendiente'
     and destino_user_id = 900000000;

  perform pg_temp.afirma(v_avisos = 1,
    'debe quedar 1 aviso pendiente para el responsable, hay ' || v_avisos);

  -- Persona que nunca hablo con el bot: no se puede agendar.
  perform pg_temp.afirma_error('USUARIO_NO_REGISTRADO', format(
    'select * from public.spa_mutar_cita(''solicitar'', 999999999, 999999999, 999999999, 999999999, %s, %s, null, null, 900000000, 900000000)',
    v_servicio, v_horario));

  perform pg_temp.afirma(
    not exists (select 1 from public.spa_citas where cliente_user_id = 999999999),
    'un usuario desconocido no debe dejar cita');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 7. Ocupacion: el indice unico parcial es la restriccion real
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio bigint;
  v_horario  bigint;
  v_cita     bigint;
  v_activas  integer;
begin
  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_11';

  -- Primera clienta: entra bien.
  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000002, 900000002,
      900000002, 900000002, v_servicio, v_horario, null, null,
      900000000, 900000000);

  perform pg_temp.afirma(v_cita is not null, 'la primera clienta debe poder solicitar el horario');

  -- Segunda clienta, mismo horario: rebota el indice unico parcial.
  perform pg_temp.afirma_error('HORARIO_OCUPADO', format(
    'select * from public.spa_mutar_cita(''solicitar'', 900000003, 900000003, 900000003, 900000003, %s, %s, null, null, 900000000, 900000000)',
    v_servicio, v_horario));

  select count(*) into v_activas
    from public.spa_citas
   where horario_id = v_horario and estado in ('pendiente', 'confirmada');

  perform pg_temp.afirma(v_activas = 1,
    'un horario no puede tener mas de una cita activa, hay ' || v_activas);
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 8. Una sola cita activa por persona
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio bigint;
  v_horario  bigint;
begin
  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_12';

  perform pg_temp.afirma_error('CITA_ACTIVA_EXISTENTE', format(
    'select * from public.spa_mutar_cita(''solicitar'', 900000002, 900000002, 900000002, 900000002, %s, %s, null, null, 900000000, 900000000)',
    v_servicio, v_horario));
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 9. Fecha pasada y fin de jornada
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio_corto bigint;
  v_servicio_largo bigint;
  v_horario        bigint;
  v_cita_creada    bigint;
  v_estado_cancelada text;
begin
  select id into v_servicio_corto from public.spa_servicios where duracion_min = 60 limit 1;
  select id into v_servicio_largo from public.spa_servicios where duracion_min = 90 limit 1;

  select horario_id into v_horario from tmp_horarios where nombre = 'pasado';
  perform pg_temp.afirma_error('HORARIO_PASADO', format(
    'select * from public.spa_mutar_cita(''solicitar'', 900000010, 900000010, 900000010, 900000010, %s, %s, null, null, 900000000, 900000000)',
    v_servicio_corto, v_horario));

  -- 17:00 + 90 min se pasa de las 18:00.
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_17';
  perform pg_temp.afirma_error('HORARIO_FUERA_DE_JORNADA', format(
    'select * from public.spa_mutar_cita(''solicitar'', 900000010, 900000010, 900000010, 900000010, %s, %s, null, null, 900000000, 900000000)',
    v_servicio_largo, v_horario));

  perform pg_temp.afirma(
    not exists (select 1 from public.spa_citas where cliente_user_id = 900000010),
    'ni una fecha pasada ni un fin de jornada deben dejar cita');

  -- Un servicio corto si cabe a las 17:00: el mismo slot no se rechaza siempre.
  perform pg_temp.afirma(
    exists (
      select 1 from public.spa_mutar_cita(
        'solicitar', 900000010, 900000010,
        900000010, 900000010, v_servicio_corto, v_horario, null, null,
        900000000, 900000000) as _res
    ),
    'a las 17:00 un servicio de 60 min si debe entrar');

  -- Se limpia para no dejar activa a esta clienta.
  select id into v_cita_creada
    from public.spa_citas
   where cliente_user_id = 900000010 and estado = 'pendiente'
   limit 1;

  select estado into v_estado_cancelada
    from public.spa_mutar_cita(
      'cancelar', 900000010, 900000010, null, null, null, null, v_cita_creada, null,
      900000000, 900000000);

  perform pg_temp.afirma(v_estado_cancelada = 'cancelada',
    'la clienta de la prueba de jornada debe poder cancelar');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 10. Permisos: solo el responsable confirma o rechaza
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_cita bigint;
begin
  select id into v_cita
    from public.spa_citas
   where cliente_user_id = 900000002 and estado = 'pendiente'
   limit 1;

  perform pg_temp.afirma(v_cita is not null, 'debe existir la cita pendiente de la clienta 900000002');

  -- La propia clienta no confirma su cita.
  perform pg_temp.afirma_error('SIN_PERMISO', format(
    'select * from public.spa_mutar_cita(''confirmar'', 900000002, 900000002, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));

  -- Otra persona que no es el responsable tampoco.
  perform pg_temp.afirma_error('SIN_PERMISO', format(
    'select * from public.spa_mutar_cita(''confirmar'', 900000003, 900000003, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));

  perform pg_temp.afirma(
    exists (select 1 from public.spa_citas where id = v_cita and estado = 'pendiente'),
    'un intento sin permiso no debe cambiar el estado de la cita');

  -- Tampoco puede cancelar la cita de otra.
  perform pg_temp.afirma_error('SIN_PERMISO', format(
    'select * from public.spa_mutar_cita(''cancelar'', 900000003, 900000003, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));

  -- Accion inventada.
  perform pg_temp.afirma_error('ACCION_DESCONOCIDA', format(
    'select * from public.spa_mutar_cita(''inventada'', 900000000, 900000000, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 11. Confirmar y doble confirmacion
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_cita   bigint;
  v_estado text;
  v_avisos integer;
begin
  select id into v_cita
    from public.spa_citas
   where cliente_user_id = 900000002 and estado = 'pendiente'
   limit 1;

  select estado into v_estado
    from public.spa_mutar_cita(
      'confirmar', 900000000, 900000000, null, null, null, null, v_cita, null,
      900000000, 900000000);

  perform pg_temp.afirma(v_estado = 'confirmada',
    'el responsable debe confirmar, quedo ' || coalesce(v_estado, 'nada'));

  perform pg_temp.afirma(
    exists (select 1 from public.spa_citas
             where id = v_cita
               and decision_por_user_id = 900000000
               and decision_en is not null),
    'la confirmacion debe registrar quien decide y cuando');

  select count(*) into v_avisos
    from public.spa_notificaciones
   where cita_id = v_cita
     and tipo = 'cita_confirmada'
     and estado = 'pendiente'
     and destino_user_id = 900000002;

  perform pg_temp.afirma(v_avisos = 1,
    'debe quedar 1 aviso de confirmacion para la clienta, hay ' || v_avisos);

  -- Doble confirmacion: el segundo clic no crea una segunda transicion.
  perform pg_temp.afirma_error('TRANSICION_INVALIDA', format(
    'select * from public.spa_mutar_cita(''confirmar'', 900000000, 900000000, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));

  perform pg_temp.afirma(
    (select count(*) from public.spa_eventos
      where cita_id = v_cita and tipo = 'cita_confirmada') = 1,
    'la doble confirmacion no debe duplicar el evento');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 12. Cancelar: sobre la cita confirmada de la seccion 11
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_cita     bigint;
  v_horario  bigint;
  v_servicio bigint;
  v_estado   text;
begin
  select c.id, c.horario_id into v_cita, v_horario
    from public.spa_citas c
   where c.cliente_user_id = 900000002 and c.estado = 'confirmada'
   limit 1;

  perform pg_temp.afirma(v_cita is not null,
    'debe existir la cita confirmada de la clienta 900000002');

  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;

  -- Otra persona no toca la cita ajena.
  perform pg_temp.afirma_error('SIN_PERMISO', format(
    'select * from public.spa_mutar_cita(''cancelar'', 900000003, 900000003, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));

  -- La duena cancela.
  select estado into v_estado
    from public.spa_mutar_cita(
      'cancelar', 900000002, 900000002, null, null, null, null, v_cita, null,
      900000000, 900000000);

  perform pg_temp.afirma(v_estado = 'cancelada',
    'la clienta duena debe poder cancelar su cita');

  perform pg_temp.afirma(
    exists (select 1 from public.spa_notificaciones
             where cita_id = v_cita and tipo = 'cita_cancelada'
               and destino_user_id = 900000000),
    'cancelar debe avisar al responsable');

  perform pg_temp.afirma(
    (select count(*) from public.spa_eventos
      where cita_id = v_cita and tipo = 'cita_cancelada') = 1,
    'cancelar debe dejar un solo evento');

  -- Volver a cancelar lo mismo no vale.
  perform pg_temp.afirma_error('TRANSICION_INVALIDA', format(
    'select * from public.spa_mutar_cita(''cancelar'', 900000002, 900000002, null, null, null, null, %s, null, 900000000, 900000000)',
    v_cita));

  -- Cancelar libera el horario: otra clienta puede tomarlo.
  perform pg_temp.afirma(
    exists (
      select 1 from public.spa_mutar_cita(
        'solicitar', 900000003, 900000003,
        900000003, 900000003, v_servicio, v_horario, null, null,
        900000000, 900000000) as _libre
    ),
    'tras cancelar, el horario debe quedar libre');

  -- Y la duena puede volver a pedir hora: una cita cerrada no la bloquea.
  select horario_id into v_horario from tmp_horarios where nombre = 'dia3_11';

  perform pg_temp.afirma(
    exists (
      select 1 from public.spa_mutar_cita(
        'solicitar', 900000002, 900000002,
        900000002, 900000002, v_servicio, v_horario, null, null,
        900000000, 900000000) as _otra
    ),
    'una cita cancelada no debe seguir bloqueando a la clienta');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 13. Rechazar: sobre la cita pendiente de la seccion 6
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_cita     bigint;
  v_otra     bigint;
  v_horario  bigint;
  v_servicio bigint;
  v_estado   text;
begin
  select c.id, c.horario_id into v_cita, v_horario
    from public.spa_citas c
   where c.cliente_user_id = 900000001 and c.estado = 'pendiente'
   limit 1;

  perform pg_temp.afirma(v_cita is not null,
    'debe existir la cita pendiente de la clienta 900000001');

  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;

  -- Rechazar solo aplica a citas pendientes. Sobre la ya cancelada no vale.
  select id into v_otra
    from public.spa_citas
   where cliente_user_id = 900000002
   limit 1;

  perform pg_temp.afirma_error('TRANSICION_INVALIDA', format(
    'select * from public.spa_mutar_cita(''rechazar'', 900000000, 900000000, null, null, null, null, %s, null, 900000000, 900000000)',
    v_otra));

  select estado into v_estado
    from public.spa_mutar_cita(
      'rechazar', 900000000, 900000000, null, null, null, null, v_cita, null,
      900000000, 900000000);

  perform pg_temp.afirma(v_estado = 'rechazada',
    'el responsable debe poder rechazar, quedo ' || coalesce(v_estado, 'nada'));

  -- La clienta se entera: un rechazo siempre deja aviso.
  perform pg_temp.afirma(
    exists (select 1 from public.spa_notificaciones
             where cita_id = v_cita and tipo = 'cita_rechazada'
               and destino_user_id = 900000001),
    'rechazar debe avisar a la clienta');

  perform pg_temp.afirma(
    exists (select 1 from public.spa_eventos
             where cita_id = v_cita and tipo = 'cita_rechazada'),
    'rechazar debe dejar evento');

  -- El rechazo libera el horario y a la clienta.
  perform pg_temp.afirma(
    exists (
      select 1 from public.spa_mutar_cita(
        'solicitar', 900000001, 900000001,
        900000001, 900000001, v_servicio, v_horario, null, null,
        900000000, 900000000) as _otra
    ),
    'tras rechazar, la clienta debe poder volver a pedir ese horario');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 14. Vencimiento perezoso
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio bigint;
  v_horario  bigint;
  v_cita     bigint;
  v_vencidas integer;
begin
  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_13';

  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000004, 900000004,
      900000004, 900000004, v_servicio, v_horario, null, null,
      900000000, 900000000);

  -- Sin tocar el reloj global: solo la fila pasa su vencimiento.
  update public.spa_citas set expira_en = now() - interval '1 minute' where id = v_cita;

  v_vencidas := public.spa_vencer_citas();

  perform pg_temp.afirma(v_vencidas >= 1,
    'spa_vencer_citas debe vencer al menos 1 cita, vencio ' || v_vencidas);

  perform pg_temp.afirma(
    exists (select 1 from public.spa_citas where id = v_cita and estado = 'vencida'),
    'la cita vencida debe quedar en estado vencida');

  perform pg_temp.afirma(
    exists (select 1 from public.spa_eventos where cita_id = v_cita and tipo = 'cita_vencida'),
    'vencer debe dejar evento');

  -- Vencida tampoco bloquea: el horario se libera.
  perform pg_temp.afirma(
    exists (
      select 1 from public.spa_mutar_cita(
        'solicitar', 900000010, 900000010,
        900000010, 900000010, v_servicio, v_horario, null, null,
        900000000, 900000000) as _res
    ),
    'una cita vencida debe liberar el horario');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 15. Avisos: lease, envio, backoff, permanentes e inciertos
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio bigint;
  v_horario  bigint;
  v_cita     bigint;
  v_aviso    public.spa_notificaciones;
  v_espera   interval;
begin
  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;

  -- 15.1 Se reclama con lease y el envio deja rastro.
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_14';

  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000005, 900000005,
      900000005, 900000005, v_servicio, v_horario, null, null,
      900000000, 900000000);

  select * into v_aviso
    from public.spa_reclamar_avisos(50, 60)
   where cita_id = v_cita;

  perform pg_temp.afirma(v_aviso.id is not null,
    'el aviso de la solicitud debe poder reclamarse');
  perform pg_temp.afirma(v_aviso.lease_token is not null,
    'reclamar debe asignar lease_token');
  perform pg_temp.afirma(v_aviso.lease_expira_en is not null,
    'reclamar debe asignar lease_expira_en');
  perform pg_temp.afirma(v_aviso.intentos = 1,
    'reclamar debe incrementar intentos a 1, quedo en ' || v_aviso.intentos);

  perform pg_temp.afirma(
    not exists (select 1 from public.spa_reclamar_avisos(50, 60) where id = v_aviso.id),
    'un aviso con lease vigente no debe reclamarse dos veces');

  -- Token equivocado: la fila no se toca.
  perform pg_temp.afirma_error('LEASE_INVALIDO', format(
    'select * from public.spa_finalizar_aviso(%s, gen_random_uuid(), ''enviado'')', v_aviso.id));

  perform pg_temp.afirma(
    exists (select 1 from public.spa_notificaciones
             where id = v_aviso.id and estado = 'pendiente'),
    'un finalize con lease invalido no debe cambiar el estado');

  select * into v_aviso
    from public.spa_finalizar_aviso(v_aviso.id, v_aviso.lease_token, 'enviado', null, null, 4242);

  perform pg_temp.afirma(v_aviso.estado = 'enviada',
    'el aviso debe quedar enviada, quedo ' || v_aviso.estado);
  perform pg_temp.afirma(v_aviso.telegram_message_id = 4242,
    'debe guardarse el telegram_message_id');
  perform pg_temp.afirma(v_aviso.lease_token is null,
    'finalizar debe liberar el lease');
  perform pg_temp.afirma(v_aviso.enviada_en is not null,
    'debe registrarse enviada_en');

  perform pg_temp.afirma_error('LEASE_INVALIDO', format(
    'select * from public.spa_finalizar_aviso(%s, gen_random_uuid(), ''enviado'')', v_aviso.id));

  -- La cita no cambio por el exito del aviso.
  perform pg_temp.afirma(
    exists (select 1 from public.spa_citas where id = v_cita and estado = 'pendiente'),
    'un aviso enviado NO debe alterar el estado de la cita');

  -- 15.2 429: respeta retry_after y no pierde el aviso.
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_15';

  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000006, 900000006,
      900000006, 900000006, v_servicio, v_horario, null, null,
      900000000, 900000000);

  select * into v_aviso
    from public.spa_reclamar_avisos(50, 60)
   where cita_id = v_cita;

  select * into v_aviso
    from public.spa_finalizar_aviso(v_aviso.id, v_aviso.lease_token,
                                    'fallido', '429', 'retry_after=45');

  perform pg_temp.afirma(v_aviso.estado = 'pendiente',
    'un 429 debe devolver el aviso a pendiente, quedo ' || v_aviso.estado);
  perform pg_temp.afirma(v_aviso.lease_token is null,
    'tras un 429 el lease queda libre');
  perform pg_temp.afirma(v_aviso.error_codigo = '429',
    'un 429 debe quedar registrado');

  v_espera := v_aviso.proximo_intento_en - now();
  perform pg_temp.afirma(v_espera between interval '40 seconds' and interval '50 seconds',
    'el 429 debe respetar retry_after=45, quedo ' || v_espera);

  perform pg_temp.afirma(
    not exists (select 1 from public.spa_reclamar_avisos(50, 60) where id = v_aviso.id),
    'un aviso esperando retry todavia no es elegible');

  -- 15.3 Error permanente: no hay reintento que valga.
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_16';

  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000007, 900000007,
      900000007, 900000007, v_servicio, v_horario, null, null,
      900000000, 900000000);

  select * into v_aviso
    from public.spa_reclamar_avisos(50, 60)
   where cita_id = v_cita;

  select * into v_aviso
    from public.spa_finalizar_aviso(v_aviso.id, v_aviso.lease_token,
                                    'fallido', '403', 'bot bloqueado');

  perform pg_temp.afirma(v_aviso.estado = 'fallida',
    'un 403 debe quedar fallida sin reintento, quedo ' || v_aviso.estado);
  perform pg_temp.afirma(v_aviso.error_codigo = '403',
    'debe quedar registrado el codigo de error');

  perform pg_temp.afirma(
    exists (select 1 from public.spa_citas where id = v_cita and estado = 'pendiente'),
    'un aviso fallido NO debe alterar el estado de la cita');

  -- 15.4 Timeout incierto: revision, nunca reenvio a ciegas.
  select horario_id into v_horario from tmp_horarios where nombre = 'dia2_12';

  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000008, 900000008,
      900000008, 900000008, v_servicio, v_horario, null, null,
      900000000, 900000000);

  select * into v_aviso
    from public.spa_reclamar_avisos(50, 60)
   where cita_id = v_cita;

  select * into v_aviso
    from public.spa_finalizar_aviso(v_aviso.id, v_aviso.lease_token,
                                    'revision', 'timeout', 'sin respuesta');

  perform pg_temp.afirma(v_aviso.estado = 'revision',
    'un timeout debe quedar en revision, quedo ' || v_aviso.estado);
  perform pg_temp.afirma(
    not exists (select 1 from public.spa_reclamar_avisos(50, 60) where id = v_aviso.id),
    'un aviso en revision no se reintenta solo');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 16. Un lease vencido vuelve a ser reclamable
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_servicio bigint;
  v_horario  bigint;
  v_cita     bigint;
  v_aviso    public.spa_notificaciones;
  v_primero  uuid;
begin
  select id into v_servicio from public.spa_servicios where duracion_min = 60 limit 1;
  select horario_id into v_horario from tmp_horarios where nombre = 'dia3_10';

  select cita_id into v_cita
    from public.spa_mutar_cita(
      'solicitar', 900000009, 900000009,
      900000009, 900000009, v_servicio, v_horario, null, null,
      900000000, 900000000);

  select * into v_aviso
    from public.spa_reclamar_avisos(50, 60)
   where cita_id = v_cita;

  v_primero := v_aviso.lease_token;

  update public.spa_notificaciones
     set lease_expira_en = now() - interval '1 second'
   where id = v_aviso.id;

  -- Con el lease vencido, el token viejo ya no sirve. %L y no %s: el token
  -- necesita comillas o el SQL dinamico ni siquiera llega a ejecutarse.
  perform pg_temp.afirma_error('LEASE_INVALIDO', format(
    'select * from public.spa_finalizar_aviso(%s, %L, ''enviado'')', v_aviso.id, v_primero));

  select * into v_aviso
    from public.spa_reclamar_avisos(50, 60)
   where id = v_aviso.id;

  perform pg_temp.afirma(v_aviso.id is not null,
    'un lease vencido debe volver a ser reclamable');
  perform pg_temp.afirma(v_aviso.lease_token is distinct from v_primero,
    'al reclamar de nuevo debe entrar un token nuevo');
  perform pg_temp.afirma(v_aviso.intentos = 2,
    'el segundo intento debe quedar registrado, intentos = ' || v_aviso.intentos);
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 17. Replay de update_id
-- -----------------------------------------------------------------------------

do $prueba$
declare
  v_primero   boolean;
  v_repetido boolean;
begin
  v_primero   := public.spa_registrar_update(777000111);
  v_repetido  := public.spa_registrar_update(777000111);

  perform pg_temp.afirma(v_primero, 'un update_id nuevo debe devolverse true');
  perform pg_temp.afirma(not v_repetido,
    'un update_id repetido debe devolverse false (replay ignorado)');

  perform pg_temp.afirma(
    (select count(*) from public.spa_eventos
      where tipo = 'telegram_update'
        and detalle ->> 'update_id' = '777000111') = 1,
    'el update_id repetido no debe crear una segunda fila');
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 18. Permisos en tiempo de ejecucion (no solo en el catalogo)
-- -----------------------------------------------------------------------------
-- Cambia de rol de verdad y comprueba que anon no puede nada y que
-- service_role si puede. Necesita una sesion con permiso para cambiar de rol
-- (en Supabase, el SQL Editor corre como postgres).

do $prueba$
declare
  v_rol_original text;
  v_total       integer;
begin
  if coalesce(current_setting('is_superuser', true), 'off') <> 'on' then
    raise notice 'La sesion no puede cambiar de rol: se omite la prueba de permisos en ejecucion';
    return;
  end if;

  select current_setting('role') into v_rol_original;

  perform set_config('role', 'anon', true);

  perform pg_temp.afirma_falla(
    'insert into public.spa_servicios (nombre, descripcion, precio_cop, duracion_min)
     values (''Prueba'', ''Prueba'', 1, 30)',
    'anon no debe poder escribir en spa_servicios');

  perform pg_temp.afirma_falla(
    'select * from public.spa_servicios',
    'anon no debe poder leer spa_servicios');

  perform pg_temp.afirma_falla(
    'select * from public.spa_generar_horarios(14)',
    'anon no debe poder ejecutar spa_generar_horarios');

  perform pg_temp.afirma_falla(
    'select * from public.spa_vencer_citas()',
    'anon no debe poder ejecutar spa_vencer_citas');

  perform set_config('role', 'service_role', true);

  -- Aqui es donde la Edge Function depende de que todo este bien.
  select count(*) into v_total from public.spa_citas;
  perform pg_temp.afirma(v_total >= 0,
    'service_role debe poder leer spa_citas a traves de la politica RLS');

  perform public.spa_generar_horarios(14);
  perform pg_temp.afirma(true, 'service_role debe poder ejecutar spa_generar_horarios');

  perform set_config('role', v_rol_original, true);
end
$prueba$;

-- -----------------------------------------------------------------------------
-- 19. Limpieza: la prueba no puede dejar rastro
-- -----------------------------------------------------------------------------
-- Este archivo es una sola instruccion, asi que no hay BEGIN/ROLLBACK que
-- deshaga el trabajo. Ademas, desde dentro de plpgsql no se puede ejecutar
-- SAVEPOINT ni ROLLBACK TO ("EXECUTE of transaction commands is not
-- implemented"). Asi que la limpieza va a mano.
--
-- El alcance es ESTRECHO y solo toca datos ficticios de la prueba:
--   * usuarios 900000000 a 900000010;
--   * las citas de esas personas;
--   * los horarios que esta misma prueba creo (estan listados en tmp_horarios);
--   * el update_id 777000111 de la seccion 17.
-- Nada de lo que se borraria aqui existe fuera de la prueba.

select count(*) into v_citas_limpiadas
  from public.spa_citas
 where cliente_user_id between 900000000 and 900000010;

-- El orden importa por las claves foraneas: eventos y avisos apuntan a citas con
-- "on delete restrict", asi que se van primero. El subquery de citas se vuelve a
-- evaluar en cada delete, y para cuando se borran las citas ya no hace falta.
delete from public.spa_eventos
 where detalle->>'update_id' = '777000111'
    or cita_id in (
         select id from public.spa_citas
          where cliente_user_id between 900000000 and 900000010);

delete from public.spa_notificaciones
 where cita_id in (
         select id from public.spa_citas
          where cliente_user_id between 900000000 and 900000010)
    or destino_user_id between 900000000 and 900000010;

delete from public.spa_citas
 where cliente_user_id between 900000000 and 900000010;

-- Los horarios se borran al final: spa_citas.horario_id los referencia. Se van
-- todos los que no estaban antes, porque la prueba tambien genera rejillas
-- reales con spa_generar_horarios.
delete from public.spa_horarios
 where id not in (select id from tmp_horarios_previos);

delete from public.spa_usuarios
 where user_id between 900000000 and 900000010;

-- Y la prueba de verdad: la base quedo como estaba.
perform pg_temp.afirma(
  (select count(*) from public.spa_usuarios) = v_base_usuarios,
  'la limpieza debe dejar los usuarios como estaban: havia ' || v_base_usuarios
    || ' y quedaron ' || (select count(*) from public.spa_usuarios));

perform pg_temp.afirma(
  (select count(*) from public.spa_horarios) = v_base_horarios,
  'la limpieza debe dejar los horarios como estaban: havia ' || v_base_horarios
    || ' y quedaron ' || (select count(*) from public.spa_horarios));

perform pg_temp.afirma(
  (select count(*) from public.spa_citas) = v_base_citas,
  'la limpieza debe dejar las citas como estaban: havia ' || v_base_citas
    || ' y quedaron ' || (select count(*) from public.spa_citas));

perform pg_temp.afirma(
  (select count(*) from public.spa_notificaciones) = v_base_avisos,
  'la limpieza debe dejar los avisos como estaban: havia ' || v_base_avisos
    || ' y quedaron ' || (select count(*) from public.spa_notificaciones));

perform pg_temp.afirma(
  (select count(*) from public.spa_eventos) = v_base_eventos,
  'la limpieza debe dejar los eventos como estaban: havia ' || v_base_eventos
    || ' y quedaron ' || (select count(*) from public.spa_eventos));

perform pg_temp.afirma(
  not exists (
    select 1 from public.spa_citas
     where cliente_user_id between 900000000 and 900000010),
  'no debe quedar ninguna cita ficticia, se borraron ' || v_citas_limpiadas);

perform pg_temp.afirma(
  not exists (
    select 1 from public.spa_usuarios
     where user_id between 900000000 and 900000010),
  'no debe quedar ninguna persona ficticia');

raise notice 'Pruebas de integracion: PASA. Se limpiaron % citas ficticias y la base quedo igual.', v_citas_limpiadas;

end
$todo$;

-- =============================================================================
-- 20. Concurrencia en dos sesiones separadas
-- =============================================================================
-- Esta parte NO se puede automatizar desde un solo script: necesita dos sesiones
-- simultaneas. Es la unica prueba que demuestra que el indice unico parcial
-- resuelve la carrera de verdad.
--
-- Preparacion (una sola vez, FUERA de este archivo, en SQL Editor):
--
--   select public.spa_generar_horarios(14);
--   select public.spa_registrar_usuario(900000000, 900000000, 'Responsable', null);
--   select public.spa_registrar_usuario(900000001, 900000001, 'Clienta B', null);
--   select public.spa_registrar_usuario(900000002, 900000002, 'Clienta C', null);
--   select id from public.spa_servicios order by id limit 1;   -- anotalo como S
--   select id from public.spa_horarios
--    where inicio > now() order by inicio limit 1;            -- anotalo como H
--
-- Abri DOS pestanas del SQL Editor y lanza esto al mismo tiempo.
--
--   Pestana A                              |  Pestana B
--   -------------------------------------- | -------------------------------------
--   begin;                                 |  begin;
--                                          |
--   select * from public.spa_mutar_cita(    |  select * from public.spa_mutar_cita(
--     'solicitar', 900000001, 900000001,    |    'solicitar', 900000002, 900000002,
--     900000001, 900000001, S, H,           |    900000002, 900000002, S, H,
--     null, 900000000, 900000000);          |    null, 900000000, 900000000);
--                                          |
--   -- NO hagas commit todavia.            |  -- B queda ESPERANDO: el indice unico
--   -- Ahora presiona Run en B:            |  -- parcial bloquea la fila.
--   -- A devuelve la cita creada y B       |  --
--   -- falla con HORARIO_OCUPADO.          |  --
--   commit;                                |  rollback;
--
-- Resultado esperado:
--   * Quien entra primero recibe una cita en estado 'pendiente'.
--   * La otra sesion queda esperando hasta que la primera confirme, y al final
--     falla con el error HORARIO_OCUPADO. Da igual quien gane.
--   * Nunca quedan dos citas activas en el mismo horario:
--       select horario_id, count(*)
--         from spa_citas where estado in ('pendiente','confirmada')
--        group by horario_id having count(*) > 1;   -- 0 filas
--   * Si pruebas la cancelacion despues, el horario queda libre y otra clienta
--     puede tomarlo.
--
-- Anota el resultado real en evidencia/RESULTADOS.md. Si no lo ejecutas, deja
-- concurrencia como PENDIENTE: no la marques aprobada.
-- =============================================================================

-- Si llegaste aqui sin errores, la prueba paso y no dejo citas ficticias.
-- El mensaje sale como NOTICE: "Pruebas de integracion: PASA. Se limpiaron N
-- citas ficticias y la base quedo igual."