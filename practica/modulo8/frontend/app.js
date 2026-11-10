// Lógica cliente para Comercial La Esquina (Módulo 8)

let catalog = [];
let currentReceiptId = null;

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  loadCatalog();
  refreshAllData();

  document.getElementById("btn-process-upload").addEventListener("click", handleUpload);
  document.getElementById("btn-reset-db").addEventListener("click", handleResetDb);
  
  // Feedback visual de archivo seleccionado
  document.getElementById("receipt-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      document.querySelector(".file-label span").textContent = `Archivo: ${file.name}`;
    }
  });
});

function setupTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function appendChat(role, message) {
  const container = document.getElementById("chat-messages");
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role === "user" ? "user-bubble" : "agent-bubble"}`;
  bubble.innerHTML = `<strong>${role === "user" ? "Tú" : "Agente"}:</strong><p>${message}</p>`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

async function loadCatalog() {
  try {
    const res = await fetch("/api/catalog");
    catalog = await res.json();
  } catch (e) {
    console.error("Error cargando catálogo", e);
  }
}

async function handleUpload() {
  const fileInput = document.getElementById("receipt-file");
  const mockScenario = document.getElementById("mock-scenario-select").value;

  let file = fileInput.files[0];
  if (!file) {
    // Si no seleccionó archivo pero eligió un escenario mock, crear un archivo dummy
    const dummyBlob = new Blob(["dummy content"], { type: "image/png" });
    const filename = mockScenario ? `${mockScenario}_test.png` : "comprobante_148k.png";
    file = new File([dummyBlob], filename);
  }

  appendChat("user", `Adjunté el comprobante: ${file.name}`);

  const formData = new FormData();
  formData.append("file", file);
  if (mockScenario) {
    formData.append("mock_type", mockScenario);
    formData.append("force_mock", "true");
  }

  try {
    appendChat("agent", "Analizando comprobante con el extractor y verificando reglas de negocio...");
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    handleAgentResponse(data);
    refreshAllData();
  } catch (err) {
    appendChat("agent", `Error de comunicación: ${err.message}`);
  }
}

function handleAgentResponse(res) {
  if (res.error) {
    appendChat("agent", `Ocurrió un error: ${res.error}`);
    return;
  }

  currentReceiptId = res.receipt_id;

  // Mostrar mensaje del agente
  appendChat("agent", res.message);

  // Mostrar ficha extraída si existe
  if (res.extracted_data) {
    renderReceiptPreview(res.extracted_data, res.metadata, res.is_duplicate);
  }

  const dynamicArea = document.getElementById("dynamic-action-area");
  dynamicArea.innerHTML = "";
  dynamicArea.style.display = "none";

  // Manejo de estados según el caso de negocio
  if (res.step === "ambiguous_candidates") {
    dynamicArea.style.display = "block";
    dynamicArea.innerHTML = `
      <h3>Resolución de Ambigüedad</h3>
      <p>Hay dos o más ventas compatibles con igual monto. Selecciona la venta correspondiente tras verificar la referencia:</p>
      <div class="candidates-list">
        ${res.candidates.map(c => `
          <div class="candidate-item">
            <div>
              <strong>${c.sale_id} (${c.customer_name})</strong> - Fecha: ${c.sale_date} - Total: $${c.total_amount.toLocaleString()}
              <br><small>Productos: ${c.items.map(it => `${it.product_name} (x${it.quantity})`).join(", ")}</small>
            </div>
            <button class="btn btn-primary" onclick="selectCandidate('${c.sale_id}', ${c.total_amount})">Seleccionar esta venta</button>
          </div>
        `).join("")}
      </div>
    `;
  } else if (res.step === "proposal_ready") {
    dynamicArea.style.display = "block";
    dynamicArea.innerHTML = `
      <h3>Propuesta Lista para Revisión Humana</h3>
      <div class="proposal-box">
        <p><strong>Acción propuesta:</strong> ${res.proposal.details}</p>
        <p><strong>Versión de propuesta:</strong> ${res.proposal.proposal_version}</p>
        <button class="btn btn-confirm" onclick="confirmProposal()">Aprobar y Registrar Vínculo</button>
      </div>
    `;
  } else if (res.step === "sale_missing") {
    dynamicArea.style.display = "block";
    renderMissingSaleBuilder(res.extracted_data);
  }
}

function renderReceiptPreview(data, metadata, isDuplicate) {
  const box = document.getElementById("receipt-preview-box");
  const content = document.getElementById("receipt-details-content");
  const badge = document.getElementById("extraction-badge");

  box.style.display = "block";
  badge.textContent = metadata?.is_real_api ? `Real (${metadata.model})` : `Mock Fiel (${metadata?.model || 'Simulado'})`;
  badge.className = `badge ${isDuplicate ? 'warning' : ''}`;
  if (isDuplicate) badge.textContent += " · DUPLICADO";

  const refText = data.references?.map(r => `${r.type}: ${r.value}`).join(", ") || "null";
  const warningsHtml = data.warnings?.length 
    ? `<div style="grid-column: span 2; color: var(--danger); font-size: 0.8rem;"><b>Advertencias:</b> ${data.warnings.join(" | ")}</div>` 
    : "";

  content.innerHTML = `
    <div class="receipt-item-col"><b>Tipo Soporte:</b> ${data.support_type}</div>
    <div class="receipt-item-col"><b>Monto / Base:</b> ${data.amount ? `$${data.amount.toLocaleString()}` : 'null'} (${data.amount_basis})</div>
    <div class="receipt-item-col"><b>Fecha:</b> ${data.date || 'null'}</div>
    <div class="receipt-item-col"><b>Referencias:</b> ${refText}</div>
    <div class="receipt-item-col"><b>Emisor:</b> ${data.sender || 'null'}</div>
    <div class="receipt-item-col"><b>Beneficiario:</b> ${data.beneficiary || 'null'}</div>
    ${warningsHtml}
  `;
}

function renderMissingSaleBuilder(extractedData) {
  const dynamicArea = document.getElementById("dynamic-action-area");
  dynamicArea.innerHTML = `
    <h3>Construir Venta Faltante</h3>
    <p>Agrega los productos adquiridos. El total se calcula automáticamente mediante código:</p>
    <div class="missing-sale-form">
      <div>
        <label>Cliente:</label>
        <input type="text" id="draft-customer" value="Cliente Mostrador">
      </div>
      <div>
        <label>Fecha Venta:</label>
        <input type="date" id="draft-date" value="${extractedData.date || new Date().toISOString().substring(0,10)}">
      </div>
      <div id="items-container">
        <div class="item-row">
          <select class="prod-select" onchange="updateRowPrice(this)">
            ${catalog.map(p => `<option value="${p.code}" data-price="${p.price}">${p.name} ($${p.price.toLocaleString()})</option>`).join("")}
          </select>
          <input type="number" class="prod-qty" value="1" min="1" oninput="recalcDraftTotal()">
          <span class="row-subtotal">$0</span>
        </div>
      </div>
      <button class="btn btn-secondary" onclick="addDraftItemRow()">+ Agregar Producto</button>
      <div style="font-size: 1.1rem; font-weight: 800; margin-top: 10px;">
        Total Calculado: <span id="draft-total-display">$0</span>
      </div>
      <button class="btn btn-confirm" onclick="submitDraft()">Calcular y Presentar Borrador</button>
    </div>
  `;
  // Inicializar subtotal del primer item
  const firstSelect = dynamicArea.querySelector(".prod-select");
  if (firstSelect) updateRowPrice(firstSelect);
}

function updateRowPrice(selectEl) {
  const row = selectEl.closest(".item-row");
  const selectedOpt = selectEl.selectedOptions[0];
  const price = parseFloat(selectedOpt.dataset.price || 0);
  const qty = parseInt(row.querySelector(".prod-qty").value || 1);
  row.querySelector(".row-subtotal").textContent = `$${(price * qty).toLocaleString()}`;
  recalcDraftTotal();
}

function recalcDraftTotal() {
  const rows = document.querySelectorAll(".item-row");
  let total = 0;
  rows.forEach(r => {
    const sel = r.querySelector(".prod-select");
    const opt = sel.selectedOptions[0];
    const price = parseFloat(opt.dataset.price || 0);
    const qty = parseInt(r.querySelector(".prod-qty").value || 1);
    const subtotal = price * qty;
    r.querySelector(".row-subtotal").textContent = `$${subtotal.toLocaleString()}`;
    total += subtotal;
  });
  document.getElementById("draft-total-display").textContent = `$${total.toLocaleString()}`;
}

function addDraftItemRow() {
  const container = document.getElementById("items-container");
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = `
    <select class="prod-select" onchange="updateRowPrice(this)">
      ${catalog.map(p => `<option value="${p.code}" data-price="${p.price}">${p.name} ($${p.price.toLocaleString()})</option>`).join("")}
    </select>
    <input type="number" class="prod-qty" value="1" min="1" oninput="recalcDraftTotal()">
    <span class="row-subtotal">$0</span>
    <button class="btn btn-secondary" onclick="this.closest('.item-row').remove(); recalcDraftTotal();">X</button>
  `;
  container.appendChild(row);
  updateRowPrice(row.querySelector(".prod-select"));
}

async function submitDraft() {
  const customer = document.getElementById("draft-customer").value;
  const date = document.getElementById("draft-date").value;
  const rows = document.querySelectorAll(".item-row");
  const items = [];

  rows.forEach(r => {
    const sel = r.querySelector(".prod-select");
    const opt = sel.selectedOptions[0];
    const code = opt.value;
    const name = opt.textContent.split(" (")[0];
    const price = parseFloat(opt.dataset.price);
    const qty = parseInt(r.querySelector(".prod-qty").value);
    items.push({
      product_code: code,
      product_name: name,
      quantity: qty,
      unit_price: price
    });
  });

  const res = await fetch("/api/create-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer_name: customer,
      sale_date: date,
      items: items,
      receipt_id: currentReceiptId
    })
  });
  const data = await res.json();
  if (data.success) {
    appendChat("agent", `Borrador ${data.proposal.sale_id} calculado por $${data.proposal.total_amount.toLocaleString()}. ¿Deseas aprobar y guardar la venta en SQLite?`);
    const dynamicArea = document.getElementById("dynamic-action-area");
    dynamicArea.innerHTML = `
      <h3>Borrador de Venta Calculado (Versión ${data.proposal.proposal_version})</h3>
      <div class="proposal-box">
        <p><strong>Venta:</strong> ${data.proposal.sale_id} (${data.proposal.customer_name})</p>
        <p><strong>Total:</strong> $${data.proposal.total_amount.toLocaleString()}</p>
        <p><strong>Líneas:</strong> ${data.proposal.items.map(it => `${it.product_name} x${it.quantity} ($${it.subtotal.toLocaleString()})`).join(", ")}</p>
        <button class="btn btn-confirm" onclick="confirmProposal()">Aprobar y Confirmar Venta en Base</button>
      </div>
    `;
  }
}

async function selectCandidate(saleId, amount) {
  appendChat("user", `Confirmo que el comprobante corresponde a la venta ${saleId}.`);
  const res = await fetch("/api/select-candidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      receipt_id: currentReceiptId,
      sale_id: saleId,
      applied_amount: amount,
      approved_by: "Persona de la tienda"
    })
  });
  const data = await res.json();
  appendChat("agent", data.message);
  const dynamicArea = document.getElementById("dynamic-action-area");
  dynamicArea.innerHTML = `
    <div class="proposal-box">
      <p><strong>Propuesta:</strong> ${data.proposal.details}</p>
      <button class="btn btn-confirm" onclick="confirmProposal()">Aprobar y Guardar Vínculo</button>
    </div>
  `;
}

async function confirmProposal() {
  appendChat("user", "Apruebo la propuesta.");
  const res = await fetch("/api/confirm-proposal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approved_by: "Persona de la tienda" })
  });
  const data = await res.json();
  if (data.success) {
    appendChat("agent", data.message);
    document.getElementById("dynamic-action-area").style.display = "none";
    refreshAllData();
  } else {
    appendChat("agent", `Error al confirmar: ${data.error}`);
  }
}

async function refreshAllData() {
  try {
    // 1. Cargar Ventas
    const salesRes = await fetch("/api/sales");
    const sales = await salesRes.json();
    const salesTbody = document.querySelector("#table-sales tbody");
    salesTbody.innerHTML = sales.map(s => `
      <tr>
        <td><strong>${s.id}</strong></td>
        <td>${s.sale_date}</td>
        <td>${s.customer_name || 'N/A'}</td>
        <td>$${s.total_amount.toLocaleString()}</td>
        <td>${s.items.map(it => `${it.product_name} (${it.quantity})`).join(", ")}</td>
        <td>${s.payments.length ? s.payments.map(p => `$${p.applied_amount.toLocaleString()} (${p.payment_method})`).join("<br>") : '<span style="color:var(--muted)">Sin pago</span>'}</td>
      </tr>
    `).join("");

    // 2. Cargar Comprobantes
    const receiptsRes = await fetch("/api/receipts");
    const receipts = await receiptsRes.json();
    const receiptsTbody = document.querySelector("#table-receipts tbody");
    receiptsTbody.innerHTML = receipts.map(r => `
      <tr>
        <td><strong>#${r.id}</strong></td>
        <td><small style="font-family:monospace;">${r.file_hash.substring(0, 10)}...</small></td>
        <td>${r.support_type}</td>
        <td>${r.amount ? `$${r.amount.toLocaleString()}` : '<span style="color:var(--danger)">null</span>'}</td>
        <td>${r.amount_basis}</td>
        <td>${r.receipt_date || 'null'}</td>
        <td>${r.reference || 'null'}</td>
        <td><span class="badge ${r.status === 'matched' ? '' : (r.status === 'manual_check' ? 'warning' : 'danger')}">${r.status}</span></td>
      </tr>
    `).join("");

    // 3. Cargar Auditoría
    const auditRes = await fetch("/api/audit-events");
    const events = await auditRes.json();
    const auditTbody = document.querySelector("#table-audit tbody");
    auditTbody.innerHTML = events.map(e => `
      <tr>
        <td>#${e.id}</td>
        <td><strong>${e.event_type}</strong></td>
        <td>${e.approved_by}</td>
        <td><code>${e.tool_name}</code></td>
        <td>v${e.proposal_version}</td>
        <td><small>${e.details}</small></td>
        <td>${e.created_at.substring(0, 19).replace("T", " ")}</td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Error al refrescar tablas", err);
  }
}

async function handleResetDb() {
  if (!confirm("¿Deseas reiniciar la base de datos a su estado inicial de Comercial La Esquina?")) return;
  const res = await fetch("/api/reset-db", { method: "POST" });
  const data = await res.json();
  alert(data.message);
  refreshAllData();
  appendChat("agent", "Base de datos reiniciada con éxito.");
}
