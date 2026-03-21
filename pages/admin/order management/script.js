// close dropdown on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.action-wrap'))
    document.querySelectorAll('.dropdown.show').forEach(function(d) { d.classList.remove('show'); });
});

// toggle per row dropdown
function toggleMenu(btn) {
  var dd = btn.nextElementSibling;
  var isOpen = dd.classList.contains('show');
  document.querySelectorAll('.dropdown.show').forEach(function(d) { d.classList.remove('show'); });
  if (!isOpen) dd.classList.add('show');
}

// update status badge 
function setStatus(btn, status) {
  var tr    = btn.closest('.action-wrap').closest('tr');
  var badge = tr.cells[7].querySelector('.badge');
  badge.textContent = status;
  badge.className   = 'badge badge-' + status.toLowerCase();
  btn.closest('.dropdown').classList.remove('show');
}

// delete single row
function deleteRow(btn) {
  if (confirm('Delete this order?'))
    btn.closest('.action-wrap').closest('tr').remove();
}

// delete all completed rows
function deleteCompleted() {
  var completed = document.querySelectorAll('#tableBody tr');
  var toDelete  = [];
  completed.forEach(function(row) {
    var badge = row.querySelector('.badge');
    if (badge && badge.classList.contains('badge-completed')) toDelete.push(row);
  });
  if (!toDelete.length) { alert('No completed orders to delete.'); return; }
  if (confirm('Delete ' + toDelete.length + ' completed order(s)?'))
    toDelete.forEach(function(r) { r.remove(); });
}

// search and filter
function filterTable() {
  var q = document.getElementById('searchInput').value.toLowerCase();
  var s = document.getElementById('statusFilter').value;
  document.querySelectorAll('#tableBody tr').forEach(function(row) {
    var matchQ = !q || row.innerText.toLowerCase().includes(q);
    var badge  = row.querySelector('.badge');
    var matchS = !s || (badge && badge.innerText.trim() === s);
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

// export visible rows
function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr')).filter(function(r) {
    return r.style.display !== 'none';
  });
  if (!rows.length) { alert('No orders to export.'); return; }
  var headers = ['Order ID','Customer Name','Time','Service','File Uploaded','Amount','Receiving Option','Status'];
  var data = rows.map(function(r) {
    return Array.from(r.querySelectorAll('td')).slice(0, 8)
      .map(function(td) { return '"' + td.innerText.trim().replace(/"/g, '""') + '"'; })
      .join(',');
  });
  var blob = new Blob([[headers.join(',')].concat(data).join('\n')], { type: 'text/csv' });
  var a    = document.createElement('a');
  a.href   = URL.createObjectURL(blob);
  a.download = 'orders_' + Date.now() + '.csv';
  a.click();
}