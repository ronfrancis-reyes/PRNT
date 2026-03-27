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
  panel.innerHTML =
    '<div class="ap-header">Actions</div>' +
    '<button onclick="panelViewDetails()"><i class="bi bi-eye"></i> View Details</button>' +
    '<div class="ap-divider"></div>' +
    '<button onclick="panelSetStatus(\'Completed\')"><i class="bi bi-check-circle"></i> Mark as Completed</button>' +
    '<button onclick="panelSetStatus(\'Processing\')"><i class="bi bi-gear"></i> Mark as Processing</button>' +
    '<button onclick="panelSetStatus(\'Pending\')"><i class="bi bi-clock"></i> Mark as Pending</button>' +
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

function panelViewDetails() {
  if (!activeRow) return;
  var d = activeRow.dataset;
  closeActionPanel();

  var addressLabel = (d.receiving === 'Pick-up') ? 'pick-up location' : 'address';

  var html =
    '<div class="m-section-title"><i class="bi bi-person"></i> User Details</div>' +
    row3(field('customer', d.customer), field('email', d.email), field('phone', d.phone)) +
    '<div class="m-card m-full"><div class="m-label">' + addressLabel + '</div><div class="m-val">' + (d.address || '—') + '</div></div>' +
    '<div class="m-section-title"><i class="bi bi-receipt"></i> Order Details</div>' +
    row2(field('order id', d.orderId), field('date', d.date)) +
    row2(field('service', d.service), field('file', d.file)) +
    row2(field('print type', d.printType), field('paper size', d.paperSize)) +
    row2(field('copies', d.copies), field('receiving', d.receiving)) +
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

function panelSetStatus(status) {
  if (!activeRow) return;
  var tr    = activeRow;
  var badge = tr.cells[7].querySelector('.badge');
  badge.textContent = status;
  badge.className   = 'badge badge-' + status.toLowerCase();
  tr.dataset.status = status;
  var orderId = tr.dataset.orderId;
  closeActionPanel();
  if (status === 'Completed') showToast('Order ' + orderId + ' status updated to "Completed"');
}

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

function closeDeleteModal() {
  var o = document.getElementById('deleteOverlay');
  o.classList.remove('show');
  o.style.display = 'none';
  document.getElementById('btnConfirmDelete').style.display = '';
  rowToDelete = null;
}

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
  if (rowToDelete) {
    rowToDelete.remove();
  } else {
    Array.from(document.querySelectorAll('#tableBody tr'))
      .filter(function(r) { return r.dataset.status === 'Completed'; })
      .forEach(function(r) { r.remove(); });
  }
  closeDeleteModal();
});

//  toast 

function showToast(msg) {
  var toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3500);
}

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

function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.style.display !== 'none'; });
  if (!rows.length) return;
  var headers = ['Order ID', 'Customer', 'Time', 'Service', 'File', 'Amount', 'Option', 'Status'];
  var csv = [headers.join(',')].concat(
    rows.map(function(r) {
      return Array.from(r.cells).slice(0, 8)
        .map(function(td) { return '"' + td.innerText.trim() + '"'; }).join(',');
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