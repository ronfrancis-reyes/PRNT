// ==========================================================================
// 1. SAMPLE DATA
// ==========================================================================
const SAMPLE_DATA = {
  orders: [
    {
      orderId: "ORD-1234",
      customer: "John Smith",
      email: "john.smith@email.com",
      phone: "0917-123-4567",
      date: "2026-03-24T10:30:00",
      receiving: "Delivery",
      address: "Activity Center",
      notes: "Please use glossy finish.",
      status: "Completed",
      items: [
        { service: "Business Cards", file: "business_card.pdf", printType: "Colored", paperSize: "A4", copies: 50, pages: 1, price: 45.00 }
      ]
    },
    {
      orderId: "ORD-1235",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "0928-123-4567",
      date: "2026-03-24T11:15:00",
      receiving: "Pick-up",
      address: "E-Library",
      notes: "Double sided printing please.",
      status: "Processing",
      items: [
        { service: "Flyers (A4)", file: "flyer_design.pdf", printType: "Colored", paperSize: "A4", copies: 100, pages: 2, price: 60.00 },
        { service: "Document Print", file: "report_v1.pdf", printType: "B&W", paperSize: "Letter", copies: 1, pages: 20, price: 60.00 }
      ]
    },
    {
      orderId: "ORD-1236",
      customer: "Mike Brown",
      email: "mike.brown@email.com",
      phone: "0939-123-4567",
      date: "2026-03-24T12:45:00",
      receiving: "Delivery",
      address: "Pimentel Hall",
      notes: "None",
      status: "Pending",
      items: [
        { service: "Posters (A2)", file: "poster.pdf", printType: "Colored", paperSize: "A2", copies: 10, pages: 1, price: 85.00 }
      ]
    },
    {
      orderId: "ORD-1237",
      customer: "Emma Davis",
      email: "emma.d@email.com",
      phone: "0950-123-4567",
      date: "2026-03-24T01:20:00",
      receiving: "Pick-up",
      address: "CoED",
      notes: "Tri-fold layout.",
      status: "Completed",
      items: [
        { service: "Brochures", file: "brochure_v2.pdf", printType: "Colored", paperSize: "A4", copies: 200, pages: 2, price: 200.00 }
      ]
    },
    {
      orderId: "ORD-1238",
      customer: "James Wilson",
      email: "james.w@email.com",
      phone: "0961-123-4567",
      date: "2026-03-24T02:10:00",
      receiving: "Delivery",
      address: "Carpio Hall",
      notes: "Please use tarpaulin material.",
      status: "Processing",
      items: [
        { service: "Banners", file: "event_banner.pdf", printType: "Colored", paperSize: "A1", copies: 5, pages: 1, price: 350.00 }
      ]
    },
    {
      orderId: "ORD-1239",
      customer: "Maria Clara",
      email: "m.clara@email.com",
      phone: "0972-123-4567",
      date: "2026-03-25T09:00:00",
      receiving: "Pick-up",
      address: "BSU Hub",
      notes: "Fragile items.",
      status: "Pending",
      items: [
        { service: "Photo Print", file: "portrait.jpg", printType: "Colored", paperSize: "4x6", copies: 10, pages: 1, price: 100.00 },
        { service: "ID Print", file: "id_photo.png", printType: "Colored", paperSize: "2x2", copies: 4, pages: 1, price: 50.00 },
        { service: "Document Print", file: "application_form.pdf", printType: "B&W", paperSize: "Short", copies: 1, pages: 1, price: 5.00 }
      ]
    },
    {
      orderId: "ORD-1240",
      customer: "Juan Dela Cruz",
      email: "juan.dc@email.com",
      phone: "0912-345-6789",
      date: "2026-04-02T16:32:48",
      receiving: "Delivery",
      address: "Activity Center",
      notes: "Cash on delivery.",
      status: "Receiving",
      items: [
        { service: "Poster Print", file: "poster_design.pdf", printType: "Colored", paperSize: "A3", copies: 1, pages: 1, price: 110.00 },
        { service: "Photo Print", file: "family_photo.jpg", printType: "Colored", paperSize: "8x10", copies: 2, pages: 1, price: 150.00 }
      ]
    },
    {
      orderId: "ORD-1241",
      customer: "Pedro Penduko",
      email: "pedro.p@email.com",
      phone: "0983-123-4567",
      date: "2026-04-01T14:20:00",
      receiving: "Pick-up",
      address: "Gate 1",
      notes: "None",
      status: "Completed",
      items: [
        { service: "Sticker Print", file: "stickers.png", printType: "Colored", paperSize: "A4", copies: 5, pages: 1, price: 75.00 }
      ]
    },
    {
      orderId: "ORD-1242",
      customer: "Leonor Rivera",
      email: "leonor.r@email.com",
      phone: "0994-123-4567",
      date: "2026-03-31T11:00:00",
      receiving: "Delivery",
      address: "Gate 2",
      notes: "Please call upon arrival.",
      status: "Processing",
      items: [
        { service: "Document Print", file: "thesis_final.pdf", printType: "B&W", paperSize: "A4", copies: 3, pages: 150, price: 450.00 },
        { service: "Document Print", file: "thesis_abstract.pdf", printType: "B&W", paperSize: "A4", copies: 10, pages: 2, price: 20.00 },
        { service: "Photo Print", file: "group_photo.jpg", printType: "Colored", paperSize: "A4", copies: 1, pages: 1, price: 35.00 },
        { service: "Sticker Print", file: "logo.png", printType: "Colored", paperSize: "A4", copies: 2, pages: 1, price: 30.00 }
      ]
    },
    {
      orderId: "ORD-1243",
      customer: "Jose Rizal",
      email: "jose.rizal@email.com",
      phone: "0999-999-9999",
      date: "2026-04-02T10:00:00",
      receiving: "Pick-up",
      address: "BSU Hub",
      notes: "Noli Me Tangere print.",
      status: "Pending",
      items: [
        { service: "Document Print", file: "manuscript.pdf", printType: "Colored", paperSize: "A4", copies: 1, pages: 300, price: 600.00 }
      ]
    }
  ]
};

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
const state = {
  activeRow:    null,
  rowToDelete:  null
};

// ==========================================================================
// 3. DOM REFERENCES
// ==========================================================================
const dom = {
  tableBody:     document.getElementById('tableBody'),
  actionPanel:   document.getElementById('actionPanel'),
  modalOverlay:  document.getElementById('modalOverlay'),
  modalBody:     document.getElementById('modalBody'),
  deleteOverlay: document.getElementById('deleteOverlay'),
  deleteMsg:     document.getElementById('deleteMsg'),
  btnConfirmDelete: document.getElementById('btnConfirmDelete'),
  searchInput:   document.getElementById('searchInput'),
  statusFilter:  document.getElementById('statusFilter')
};

// ==========================================================================
// 4. EVENT LISTENERS
// ==========================================================================
document.addEventListener('click', (e) => {
  if (!e.target.closest('.btn-actions') && !e.target.closest('#actionPanel')) {
    closeActionPanel();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { 
    closeModal(); 
    closeDeleteModal(); 
    closeActionPanel(); 
  }
});

if (dom.btnConfirmDelete) {
  dom.btnConfirmDelete.addEventListener('click', () => {
    handleConfirmDelete();
  });
}

// ==========================================================================
// 5. CORE FUNCTIONS
// ==========================================================================
function renderTable() {
  if (!dom.tableBody) return;
  const data = SAMPLE_DATA.orders;

  dom.tableBody.innerHTML = data.map(order => {
    const totalAmount = order.items.reduce((sum, item) => sum + item.price, 0);
    const dateObj = new Date(order.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `
      <tr class="order-row" 
          data-order-id="${order.orderId}" 
          data-status="${order.status}"
          data-customer="${order.customer}"
          data-email="${order.email}"
          data-phone="${order.phone}"
          data-date="${formattedDate}"
          data-time="${formattedTime}"
          data-receiving="${order.receiving}"
          data-address="${order.address}"
          data-notes="${order.notes || 'None'}"
          data-amount="₱${(totalAmount + (order.receiving === 'Delivery' ? 50 : 0)).toFixed(2)}">
        <td class="order-id">${order.orderId}</td>
        <td>${order.customer}</td>
        <td>
          <div style="display:flex; flex-direction:column; align-items:center; line-height:1.2;">
            <span style="font-weight: 500;">${formattedDate}</span>
            <span style="font-size:0.75rem; color:var(--muted);">${formattedTime}</span>
          </div>
        </td>
        <td class="amount">₱${(totalAmount + (order.receiving === 'Delivery' ? 50 : 0)).toFixed(2)}</td>
        <td>${order.receiving}</td>
        <td><span class="badge badge-${order.status.toLowerCase()}">${order.status}</span></td>
        <td>
          <div class="action-wrap">
            <button class="btn-actions" onclick="toggleMenu(this)">
              <i class="fas fa-ellipsis-vertical"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function closeActionPanel() {
  if (dom.actionPanel) dom.actionPanel.classList.remove('show');
  state.activeRow = null;
}

function showToast(title, message = '', type = 'success') {
  if (window.parent && window.parent !== window && typeof window.parent.showGlobalToast === 'function') {
    window.parent.showGlobalToast(title, message, type);
  } else {
    console.log('[Toast Fallback]', title, message);
  }
}

function syncSidebarBadge() {
  const activeOrders = Array.from(document.querySelectorAll('tr.order-row')).filter(row => {
    const s = row.dataset.status;
    return s === 'Pending' || s === 'Processing' || s === 'Receiving';
  }).length;
  
  if (window.parent && typeof window.parent.updateSidebarBadge === 'function') {
    window.parent.updateSidebarBadge('orders', activeOrders);
  }
}

function filterTable() {
  const q = dom.searchInput.value.toLowerCase();
  const s = dom.statusFilter.value;
  document.querySelectorAll('#tableBody tr').forEach(row => {
    const matchQ = !q || row.innerText.toLowerCase().includes(q);
    const matchS = !s || row.dataset.status === s;
    row.style.display = (matchQ && matchS) ? '' : 'none';
  });
}

function startPolling() {
  setInterval(() => {
    console.log("Polling for new orders...");
  }, 30000);
}

// ==========================================================================
// 6. ACTION HANDLERS
// ==========================================================================
function toggleMenu(btn) {
  const panel = dom.actionPanel;
  const row   = btn.closest('tr');

  if (state.activeRow === row && panel.classList.contains('show')) {
    closeActionPanel();
    return;
  }

  state.activeRow = row;

  panel.innerHTML =
    '<div class="ap-header">Actions</div>' +
    '<button onclick="panelViewDetails()"><i class="fas fa-eye"></i> View Details</button>' +
    '<button onclick="downloadOrderFiles(\'' + row.dataset.orderId + '\')"><i class="fas fa-print"></i> Print File(s)</button>' +
    '<div class="ap-divider"></div>' +
    '<button onclick="panelSetStatus(\'Completed\')"><i class="fas fa-check-circle"></i> Mark as Completed</button>' +
    '<button onclick="panelSetStatus(\'Receiving\')"><i class="fas fa-truck"></i> Mark as Receiving</button>' +
    '<button onclick="panelSetStatus(\'Processing\')"><i class="fas fa-gear"></i> Mark as Processing</button>' +
    '<div class="ap-divider"></div>' +
    '<button class="danger" onclick="panelDelete()"><i class="fas fa-trash-can"></i> Delete this Order</button>';

  const rect = btn.getBoundingClientRect();
  let left = rect.left - 208; 
  if (left < 8) left = rect.right + 8; 
  panel.style.top  = rect.top + 'px';
  panel.style.left = left + 'px';
  panel.classList.add('show');
}

function panelViewDetails() {
  if (!state.activeRow) return;
  const orderId = state.activeRow.dataset.orderId;
  const order = SAMPLE_DATA.orders.find(o => o.orderId === orderId);
  if (!order) return;
  
  closeActionPanel();

  const itemsHtml = order.items.map(item => `
    <div class="item-row-dark">
      <div class="item-details-dark">
        <span class="item-file-dark">${item.file}</span>
        <span class="item-meta-dark">${item.service} • ${item.printType} • ${item.paperSize} • ${item.pages}p × ${item.copies}c</span>
      </div>
      <div class="item-row-right">
        <div class="item-price-dark">₱${item.price.toFixed(2)}</div>
      </div>
    </div>
  `).join('');

  const subtotal = order.items.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = order.receiving === 'Delivery' ? 50.00 : 0.00;
  const totalAmount = subtotal + deliveryFee;

  const dateObj = new Date(order.date);
  const fullDateTime = dateObj.toLocaleDateString('en-US') + ', ' + dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const html = `
    <div class="receipt-wrapper-dark">
      <div class="receipt-header-dark">
        <div class="receipt-actions">
           <button class="print-btn" onclick="printReceipt()" title="Export/Print Receipt"><i class="fas fa-print"></i></button>
        </div>
        <div class="success-icon"><i class="fas fa-check"></i></div>
        <h1>Order Receipt: ${order.orderId}</h1>
        <div class="header-meta">
          <span class="badge badge-${order.status.toLowerCase()}">${order.status}</span>
        </div>
        <div class="zigzag"></div>
      </div>

      <div class="receipt-body-dark">
        <div class="info-section-dark">
          <div class="section-label-dark"><i class="fas fa-info-circle"></i> Personal & Logistics</div>
          <div class="info-grid-dark">
            <div class="info-item-dark"><label>Customer</label><span>${order.customer}</span></div>
            <div class="info-item-dark"><label>Phone Number</label><span>${order.phone || 'N/A'}</span></div>
            <div class="info-item-dark"><label>Receiving Method</label><span>${order.receiving}</span></div>
            <div class="info-item-dark"><label>Location</label><span>${order.address}</span></div>
            <div class="info-item-dark"><label>Payment Method</label><span>Cash on Pick-up/Delivery</span></div>
            <div class="info-item-dark"><label>Order Date</label><span>${fullDateTime}</span></div>
          </div>
        </div>

        <div class="info-section-dark">
          <div class="section-label-dark"><i class="fas fa-print"></i> Order Summary</div>
          <div class="item-list-dark">
            ${itemsHtml}
          </div>
        </div>

        <div class="info-section-dark">
          <div class="section-label-dark"><i class="fas fa-sticky-note"></i> Additional Notes</div>
          <div class="card-box" style="font-size: 13px; color: var(--text);">${order.notes || 'No additional notes.'}</div>
        </div>

        <div class="total-card-dark">
          <div class="total-row-dark"><span>Subtotal</span><span>₱${subtotal.toFixed(2)}</span></div>
          <div class="total-row-dark"><span>Delivery Fee</span><span>₱${deliveryFee.toFixed(2)}</span></div>
          <div class="total-row-dark grand-total">
            <span>Total Amount</span>
            <span>₱${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  dom.modalBody.innerHTML = html;
  dom.modalOverlay.style.display = 'flex';
  dom.modalOverlay.classList.add('show');
}

function downloadOrderFiles(orderId) {
  const order = SAMPLE_DATA.orders.find(o => o.orderId === orderId);
  if (!order || !order.items) return;
  
  closeActionPanel();
  
  order.items.forEach((item, index) => {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = `../../uploads/${item.file}`;
      a.download = item.file;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, index * 200);
  });
  
  showToast('Print command started for ' + order.items.length + ' file(s)');
}

function printReceipt() {
  window.print();
}

function panelSetStatus(status) {
  if (!state.activeRow) return;
  const orderId = state.activeRow.dataset.orderId;
  const order = SAMPLE_DATA.orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = status;
    renderTable();
  }
  closeActionPanel();
  
  showToast('Order ' + orderId + ' status updated to "' + status + '"');
  syncSidebarBadge();
}

function panelDelete() {
  if (!state.activeRow) return;
  const tr      = state.activeRow;
  const orderId = tr.dataset.orderId || 'this order';
  state.rowToDelete = tr;
  closeActionPanel();
  dom.deleteMsg.textContent = 'Are you sure you want to delete order ' + orderId + '? This action cannot be undone.';
  dom.btnConfirmDelete.style.display = '';
  openDeleteModal();
}

function handleConfirmDelete() {
  if (state.rowToDelete) {
    const orderId = state.rowToDelete.dataset.orderId;
    SAMPLE_DATA.orders = SAMPLE_DATA.orders.filter(o => o.orderId !== orderId);
  } else {
    SAMPLE_DATA.orders = SAMPLE_DATA.orders.filter(o => o.status !== 'Completed');
  }
  renderTable();
  syncSidebarBadge();
  closeDeleteModal();
}

function closeModal() {
  dom.modalOverlay.classList.remove('show');
  dom.modalOverlay.style.display = 'none';
}

function openDeleteModal() {
  dom.deleteOverlay.style.display = 'flex';
  dom.deleteOverlay.classList.add('show');
}

function closeDeleteModal() {
  dom.deleteOverlay.classList.remove('show');
  dom.deleteOverlay.style.display = 'none';
  dom.btnConfirmDelete.style.display = '';
  state.rowToDelete = null;
}

function confirmDeleteCompleted() {
  const rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(r => r.dataset.status === 'Completed');
  
  if (!rows.length) {
    dom.deleteMsg.textContent = 'There are no completed orders to delete.';
    dom.btnConfirmDelete.style.display = 'none';
    openDeleteModal();
    return;
  }
  
  state.rowToDelete = null;
  dom.deleteMsg.textContent = 'Are you sure you want to delete all ' + rows.length + ' completed order(s)? This action cannot be undone.';
  dom.btnConfirmDelete.style.display = '';
  openDeleteModal();
}

function exportCSV() {
  const data = SAMPLE_DATA.orders;
  if (!data.length) return;
  
  const headers = ['Order ID', 'Customer Name', 'Date', 'Time', 'Service/s', 'File/s', 'Receiving Option', 'Amount', 'Status'];
  
  const csvData = [headers.join(',')].concat(
    data.map(order => {
      const dateObj = new Date(order.date);
      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const servicesStr = order.items.map(i => i.service).join('; ');
      const filesStr = order.items.map(i => i.file).join('; ');
      const totalAmount = order.items.reduce((sum, item) => sum + item.price, 0) + (order.receiving === 'Delivery' ? 50 : 0);
      
      return [
        order.orderId, 
        order.customer, 
        dateStr, 
        timeStr, 
        servicesStr, 
        filesStr, 
        order.receiving, 
        '₱' + totalAmount.toFixed(2), 
        order.status
      ].map(val => '"' + String(val).replace(/"/g, '""') + '"').join(',');
    })
  ).join('\n');
  
  const a = document.createElement('a');
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  a.href = URL.createObjectURL(blob);
  a.download = 'PRNT_Orders_' + new Date().toISOString().split('T')[0] + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ==========================================================================
// 7. NAVIGATION
// ==========================================================================
// Module-specific navigation logic goes here

// ==========================================================================
// 8. BACKEND INTEGRATION
// ==========================================================================
// BACKEND INTEGRATION POINT
// For real integration, replace SAMPLE_DATA references with Fetch API calls.
function getFullOrderData(orderId) {
  const order = SAMPLE_DATA.orders.find(o => o.orderId === orderId);
  return order || {};
}

// ==========================================================================
// 9. INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  syncSidebarBadge();
  startPolling();
});

// GLOBAL EXPOSURE
window.showGlobalToast = window.showToast = showToast;
window.panelViewDetails = panelViewDetails;
window.downloadOrderFiles = downloadOrderFiles;
window.printReceipt = printReceipt;
window.panelSetStatus = panelSetStatus;
window.panelDelete = panelDelete;
window.confirmDeleteCompleted = confirmDeleteCompleted;
window.exportCSV = exportCSV;
window.filterTable = filterTable;
window.closeModal = closeModal;
window.closeDeleteModal = closeDeleteModal;
window.toggleMenu = toggleMenu;