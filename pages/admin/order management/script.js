// SAMPLE DATA (FRONTEND TESTING ONLY)
// TODO: Replace with backend (PHP + Database)
const SAMPLE_DATA = {
  orders: [] // Note: Currently mock data is rendered via HTML data attributes
};

var activeRow    = null;
var rowToDelete  = null;

//  action panel 

document.addEventListener('click', function(e) {
  if (!e.target.closest('.btn-actions') && !e.target.closest('#actionPanel')) {
    closeActionPanel();
  }
});

function toggleMenu(btn) {
  var panel = document.getElementById('actionPanel');
  var row   = btn.closest('tr');

  // clicking same row's button toggles off
  if (activeRow === row && panel.classList.contains('show')) {
    closeActionPanel();
    return;
  }

  // store the row BEFORE building the panel
  activeRow = row;

  // build panel buttons
  // REFACTORED: Removed "Mark as Pending" manual action per requirements. If the customer order, it will automatically be marked as "Pending". If Admin marked it as "Processing", it means the admin accept the order and now processing it.
  // REFACTORED: Changed "Delivering" to "Receiving".
  panel.innerHTML =
    '<div class="ap-header">Actions</div>' +
    '<button onclick="panelViewDetails()"><i class="bi bi-eye"></i> View Details</button>' +
    '<div class="ap-divider"></div>' +
    '<button onclick="panelSetStatus(\'Completed\')"><i class="bi bi-check-circle"></i> Mark as Completed</button>' +
    '<button onclick="panelSetStatus(\'Receiving\')"><i class="bi bi-truck"></i> Mark as Receiving</button>' +
    '<button onclick="panelSetStatus(\'Processing\')"><i class="bi bi-gear"></i> Mark as Processing</button>' +
    '<div class="ap-divider"></div>' +
    '<button class="danger" onclick="panelDelete()"><i class="bi bi-trash3"></i> Delete this Order</button>';

  // position beside the button using fixed viewport coords
  var rect = btn.getBoundingClientRect();
  var left = rect.left - 208; 
  if (left < 8) left = rect.right + 8; 
  panel.style.top  = rect.top + 'px';
  panel.style.left = left + 'px';
  panel.classList.add('show');
}

function closeActionPanel() {
  document.getElementById('actionPanel').classList.remove('show');
  activeRow = null;
}

//  panel button actions 

// MODAL CONTROL
function panelViewDetails() {
  if (!activeRow) return;
  var d = activeRow.dataset;
  closeActionPanel();

  // SAMPLE DATA
  const orderDetails = {
    pages: d.pages || 10, // BACKEND INTEGRATION POINT
    location: d.location || d.address || "Sample Address"
  };

  var html =
    '<div class="m-section-title"><i class="bi bi-person"></i> User Details</div>' +
    row3(field('customer', d.customer), field('email', d.email), field('phone', d.phone)) +
    '<div class="m-section-title"><i class="bi bi-receipt"></i> Order Details</div>' +
    row2(field('order id', d.orderId), field('date', d.date)) +
    row2(field('service', d.service), field('file', d.file)) +
    row2(field('print type', d.printType), field('paper size', d.paperSize)) +
    row2(field('number of pages', orderDetails.pages), field('copies', d.copies)) +
    row2(field('receiving', d.receiving), field('location', orderDetails.location)) +
    '<div class="m-notes"><div class="m-label">additional notes</div><div class="m-val italic">' + (d.notes || 'None') + '</div></div>' +
    '<div class="m-total">' +
      '<div><div class="m-label">total amount</div><div class="m-amount">' + (d.amount || '—') + '</div></div>' +
      '<span class="badge badge-' + (d.status || '').toLowerCase() + '">' + (d.status || '') + '</span>' +
    '</div>';

  document.getElementById('modalBody').innerHTML = html;
  var overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('show');
}

// ACTION HANDLER
function panelSetStatus(status) {
  if (!activeRow) return;
  var tr    = activeRow;
  var badge = tr.cells[7].querySelector('.badge');
  badge.textContent = status;
  badge.className   = 'badge badge-' + status.toLowerCase();
  tr.dataset.status = status;
  var orderId = tr.dataset.orderId;
  closeActionPanel();
  
  // REFACTORED: Notify parent if an order becomes completed (sync sidebar badge)
  if (status === 'Completed') {
      showToast('Order ' + orderId + ' status updated to "Completed"');
      syncSidebarBadge();
  }
}

// REFACTORED: Sync Orders count with Sidebar
function syncSidebarBadge() {
    const activeOrders = document.querySelectorAll('tr.order-row:not(.status-completed)').length;
    if (window.parent && typeof window.parent.syncSidebarOrdersBadge === 'function') {
        window.parent.syncSidebarOrdersBadge(activeOrders);
    }
}

// Sync on load
document.addEventListener('DOMContentLoaded', syncSidebarBadge);

// ACTION HANDLER
function panelDelete() {
  if (!activeRow) return;
  var tr      = activeRow;
  var orderId = tr.dataset.orderId || 'this order';
  rowToDelete = tr;
  closeActionPanel();
  document.getElementById('deleteMsg').textContent = 'Are you sure you want to delete order ' + orderId + '? This action cannot be undone.';
  document.getElementById('btnConfirmDelete').style.display = '';
  openDeleteModal();
}

//  view details modal

// MODAL CONTROL
function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('show');
  overlay.style.display = 'none';
}

//  delete modal 

function openDeleteModal() {
  var o = document.getElementById('deleteOverlay');
  o.style.display = 'flex';
  o.classList.add('show');
}

// MODAL CONTROL
function closeDeleteModal() {
  var o = document.getElementById('deleteOverlay');
  o.classList.remove('show');
  o.style.display = 'none';
  document.getElementById('btnConfirmDelete').style.display = '';
  rowToDelete = null;
}

// ACTION HANDLER
function confirmDeleteCompleted() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.dataset.status === 'Completed'; });
  if (!rows.length) {
    document.getElementById('deleteMsg').textContent = 'There are no completed orders to delete.';
    document.getElementById('btnConfirmDelete').style.display = 'none';
    openDeleteModal();
    return;
  }
  rowToDelete = null;
  document.getElementById('deleteMsg').textContent = 'Are you sure you want to delete all ' + rows.length + ' completed order(s)? This action cannot be undone.';
  document.getElementById('btnConfirmDelete').style.display = '';
  openDeleteModal();
}

document.getElementById('btnConfirmDelete').addEventListener('click', function() {
  // BACKEND INTEGRATION POINT
  // Endpoint: /api/admin/orders
  // Method: DELETE
  if (rowToDelete) {
    rowToDelete.remove();
  } else {
    var rows = Array.from(document.querySelectorAll('#tableBody tr'))
      .filter(function(r) { return r.dataset.status === 'Completed'; });
    rows.forEach(function(r) { r.remove(); });
  }
  closeDeleteModal();
});

//  toast 

// GLOBAL FUNCTION (SHARED ACROSS MODULES)
// IFRAME COMMUNICATION BRIDGE
// Use window.parent.* for shared logic
function showToast(title, message = '', type = 'success') {
  if (window.parent && window.parent !== window && typeof window.parent.showGlobalToast === 'function') {
      window.parent.showGlobalToast(title, message, type);
  } else {
      console.log('[Toast Fallback]', title, message);
  }
}
window.showGlobalToast = window.showToast = showToast;

//  filter and export 

function filterTable() {
  var q = document.getElementById('searchInput').value.toLowerCase();
  var s = document.getElementById('statusFilter').value;
  document.querySelectorAll('#tableBody tr').forEach(function(row) {
    var matchQ = !q || row.innerText.toLowerCase().includes(q);
    var matchS = !s || row.dataset.status === s;
    row.style.display = (matchQ && matchS) ? '' : 'none';
  });
}

// BACKEND INTEGRATION POINT
function getFullOrderData(orderId, orderElements) {
  var row = orderElements.find(r => r.dataset.orderId === orderId);
  var d = row ? row.dataset : {};
  return {
    orderId: d.orderId || orderId,
    customer: d.customer || '',
    service: d.service || '',
    printType: d.printType || '',
    paperSize: d.paperSize || '',
    pages: d.pages || 10,
    copies: d.copies || '',
    receiving: d.receiving || '',
    location: d.location || d.address || "Sample Location",
    notes: d.notes || "Sample note",
    amount: d.amount || '',
    date: d.date || '',
    file: d.file || '',
    status: d.status || ''
  };
}

// ACTION HANDLER
function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.style.display !== 'none'; });
  if (!rows.length) return;
  
  // ACTION HANDLER
  // BACKEND INTEGRATION POINT
  const exportData = rows.map(order => getFullOrderData(order.dataset.orderId, rows));

  var headers = ['Order ID', 'Customer', 'File', 'Service', 'Print Type', 'Paper Size', 'Number of Pages', 'Copies', 'Receiving Option', 'Location', 'Notes', 'Total', 'Date'];
  
  var csv = [headers.join(',')].concat(
    exportData.map(function(d) {
      return [
        d.orderId, d.customer, d.file, d.service, d.printType, d.paperSize, d.pages, d.copies, d.receiving, d.location, d.notes, d.amount, d.date
      ].map(function(val) { return '"' + String(val).replace(/"/g, '""') + '"'; }).join(',');
    })
  ).join('\n');
  
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'orders.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//  helpers 

function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="m-card"><div class="m-label">' + label + '</div><div class="m-val">' + val + '</div></div>';
}

function row2(a, b)    { return '<div class="m-grid2">' + a + b + '</div>'; }
function row3(a, b, c) { return '<div class="m-grid3">' + a + b + c + '</div>'; }

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); closeActionPanel(); }
});