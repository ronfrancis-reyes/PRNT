// close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.action-wrap'))
    document.querySelectorAll('.dropdown.show').forEach(function(d) { d.classList.remove('show'); });
});

// toggle three-dot dropdown
function toggleMenu(btn) {
  var dd = btn.nextElementSibling;
  var isOpen = dd.classList.contains('show');
  document.querySelectorAll('.dropdown.show').forEach(function(d) { d.classList.remove('show'); });
  if (!isOpen) dd.classList.add('show');
}

// view details modal
function viewDetails(btn) {
  btn.closest('.dropdown').classList.remove('show');
  var tr = btn.closest('tr');
  if (!tr) return;
  var d = tr.dataset;
  var addressLabel = (d.receiving === 'Pick-up') ? 'pick-up location' : 'address';

  var html =
    // section: user details
    '<div class="m-section-title"><i class="bi bi-person"></i> User Details</div>' +
    row3(field('customer', d.customer), field('email', d.email), field('phone', d.phone)) +
    '<div class="m-card m-full"><div class="m-label">' + addressLabel + '</div><div class="m-val">' + (d.address || '—') + '</div></div>' +
    // section: order details
    '<div class="m-section-title"><i class="bi bi-receipt"></i> Order Details</div>' +
    row2(field('order id', d.orderId), field('date', d.date)) +
    row2(field('service', d.service), field('file', d.file)) +
    row2(field('print type', d.printType), field('paper size', d.paperSize)) +
    row2(field('copies', d.copies), field('receiving', d.receiving)) +
    '<div class="m-notes"><div class="m-label">additional notes</div><div class="m-val italic">' + (d.notes || 'None') + '</div></div>' +
    '<div class="m-total"><div><div class="m-label">total amount</div><div class="m-amount">' + (d.amount || '—') + '</div></div>' +
    '<span class="badge badge-' + (d.status || '').toLowerCase() + '">' + (d.status || '') + '</span></div>';

  document.getElementById('modalBody').innerHTML = html;
  var overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('show');
}

function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('show');
  overlay.style.display = 'none';
}

// delete single order modal
var rowToDelete = null;

function confirmDelete(btn) {
  btn.closest('.dropdown').classList.remove('show');
  rowToDelete = btn.closest('tr');
  var orderId = rowToDelete.dataset.orderId || 'this order';
  document.getElementById('deleteMsg').textContent = 'Are you sure you want to delete order ' + orderId + '? This action cannot be undone.';
  openDeleteModal();
}

// delete completed orders modal
function confirmDeleteCompleted() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.dataset.status === 'Completed'; });

  if (!rows.length) {
    // no completed orders — show modal as info instead
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

function openDeleteModal() {
  var overlay = document.getElementById('deleteOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('show');
}

function closeDeleteModal() {
  var overlay = document.getElementById('deleteOverlay');
  overlay.classList.remove('show');
  overlay.style.display = 'none';
  // reset button visibility in case it was hidden
  document.getElementById('btnConfirmDelete').style.display = '';
  rowToDelete = null;
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

// status update and toast notification
function setStatus(btn, status) {
  var tr = btn.closest('tr');
  var badge = tr.cells[7].querySelector('.badge');
  badge.textContent = status;
  badge.className = 'badge badge-' + status.toLowerCase();
  tr.dataset.status = status;
  btn.closest('.dropdown').classList.remove('show');
  if (status === 'Completed') {
    showToast('Order ' + tr.dataset.orderId + ' status updated to "Completed"');
  }
}

function showToast(msg) {
  var toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3500);
}

// filter table
function filterTable() {
  var q = document.getElementById('searchInput').value.toLowerCase();
  var s = document.getElementById('statusFilter').value;
  document.querySelectorAll('#tableBody tr').forEach(function(row) {
    var matchQ = !q || row.innerText.toLowerCase().includes(q);
    var matchS = !s || row.dataset.status === s;
    row.style.display = (matchQ && matchS) ? '' : 'none';
  });
}

// export csv
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

// helpers
function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="m-card"><div class="m-label">' + label + '</div><div class="m-val">' + val + '</div></div>';
}

function row2(a, b)    { return '<div class="m-grid2">' + a + b + '</div>'; }
function row3(a, b, c) { return '<div class="m-grid3">' + a + b + c + '</div>'; }

// close modals on escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); }
});