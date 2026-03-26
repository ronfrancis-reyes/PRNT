// close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.action-wrap')) {
    document.querySelectorAll('.dropdown.show').forEach(function(d) {
      d.classList.remove('show');
    });
  }
});

// toggle the three-dot dropdown
function toggleMenu(btn) {
  var dd = btn.nextElementSibling;
  var isOpen = dd.classList.contains('show');
  document.querySelectorAll('.dropdown.show').forEach(function(d) {
    d.classList.remove('show');
  });
  if (!isOpen) dd.classList.add('show');
}

// open view details modal
function viewDetails(btn) {
  // close dropdown
  var dropdown = btn.closest('.dropdown');
  if (dropdown) dropdown.classList.remove('show');

  // get data from the row
  var tr = btn.closest('tr');
  if (!tr) return;
  var d = tr.dataset;

  // label depends on receiving method
  var addressLabel = (d.receiving === 'Pick-up') ? 'pick-up location' : 'address';

  // build modal content
  var html =
    row2(field('order id', d.orderId), field('date', d.date)) +
    row3(field('customer', d.customer), field('email', d.email), field('phone', d.phone)) +
    row2(field('service', d.service), field('file', d.file)) +
    row2(field('print type', d.printType), field('paper size', d.paperSize)) +
    row2(field('copies', d.copies), field('receiving', d.receiving)) +
    // address spans full width
    '<div class="m-card m-full">' +
      '<div class="m-label">' + addressLabel + '</div>' +
      '<div class="m-val">' + (d.address || '—') + '</div>' +
    '</div>' +
    '<div class="m-notes">' +
      '<div class="m-label">additional notes</div>' +
      '<div class="m-val italic">' + (d.notes || 'None') + '</div>' +
    '</div>' +
    '<div class="m-total">' +
      '<div>' +
        '<div class="m-label">total amount</div>' +
        '<div class="m-amount">' + (d.amount || '—') + '</div>' +
      '</div>' +
      '<span class="badge badge-' + (d.status || '').toLowerCase() + '">' + (d.status || '') + '</span>' +
    '</div>';

  document.getElementById('modalBody').innerHTML = html;

  // show modal
  var overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('show');
}

// close modal
function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('show');
  overlay.style.display = 'none';
}

// close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// helpers: build a labeled card
function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="m-card"><div class="m-label">' + label + '</div><div class="m-val">' + val + '</div></div>';
}

// helpers: wrap cards in 2 or 3 column grid
function row2(a, b)    { return '<div class="m-grid2">' + a + b + '</div>'; }
function row3(a, b, c) { return '<div class="m-grid3">' + a + b + c + '</div>'; }

// update order status badge
function setStatus(btn, status) {
  var tr = btn.closest('tr');
  var badge = tr.cells[7].querySelector('.badge');
  badge.textContent = status;
  badge.className = 'badge badge-' + status.toLowerCase();
  tr.dataset.status = status;
  btn.closest('.dropdown').classList.remove('show');
}

// delete a single order row
function deleteRow(btn) {
  if (confirm('Delete this order?')) btn.closest('tr').remove();
}

// delete all completed orders
function deleteCompleted() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.dataset.status === 'Completed'; });
  if (!rows.length) { alert('No completed orders.'); return; }
  if (confirm('Delete ' + rows.length + ' completed order(s)?')) {
    rows.forEach(function(r) { r.remove(); });
  }
}

// filter table by search input and status dropdown
function filterTable() {
  var q = document.getElementById('searchInput').value.toLowerCase();
  var s = document.getElementById('statusFilter').value;
  document.querySelectorAll('#tableBody tr').forEach(function(row) {
    var matchQ = !q || row.innerText.toLowerCase().includes(q);
    var matchS = !s || row.dataset.status === s;
    row.style.display = (matchQ && matchS) ? '' : 'none';
  });
}

// export visible rows as csv
function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.style.display !== 'none'; });
  if (!rows.length) return;
  var headers = ['Order ID', 'Customer', 'Time', 'Service', 'File', 'Amount', 'Option', 'Status'];
  var csv = [headers.join(',')].concat(
    rows.map(function(r) {
      return Array.from(r.cells).slice(0, 8)
        .map(function(td) { return '"' + td.innerText.trim() + '"'; })
        .join(',');
    })
  ).join('\n');
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'orders.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}