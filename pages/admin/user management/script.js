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
  event.stopPropagation();
}

// view user details 
function viewDetails(btn) {
  event.stopPropagation();
  var cells  = btn.closest('tr').querySelectorAll('td');
  var id     = cells[0].innerText.trim();
  var name   = cells[1].innerText.trim();
  var email  = cells[2].innerText.trim();
  var status = cells[3].innerText.trim();
  var order  = cells[4].innerText.trim();
  alert('User Details\n\nID: ' + id + '\nName: ' + name + '\nEmail: ' + email + '\nStatus: ' + status + '\nLast Order: ' + order);
  btn.closest('tr').querySelector('.dropdown').classList.remove('show');
}

// suspend or activate toggle
function toggleSuspend(btn) {
  event.stopPropagation();
  var row    = btn.closest('tr');
  var badge  = row.querySelector('.badge');
  var dropdown = row.querySelector('.dropdown');

  if (badge.classList.contains('badge-suspended')) {
    badge.textContent = 'Active';
    badge.className   = 'badge badge-active';
    btn.innerHTML     = '<i class="bi bi-slash-circle"></i> Suspend User';
  } else {
    badge.textContent = 'Suspended';
    badge.className   = 'badge badge-suspended';
    btn.innerHTML     = '<i class="bi bi-person-check"></i> Activate User';
  }
  if (dropdown) dropdown.classList.remove('show');
}

// delete single row
function deleteRow(btn) {
  event.stopPropagation();
  if (confirm('Delete this user?')) btn.closest('tr').remove();
}

// search filter
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

// Export visible rows
function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr')).filter(function(r) {
    return r.style.display !== 'none';
  });
  if (!rows.length) { alert('No users to export.'); return; }
  var headers = ['User ID', 'User Name', 'Email', 'Status', 'Last Order'];
  var data = rows.map(function(r) {
    return Array.from(r.querySelectorAll('td')).slice(0, 5)
      .map(function(td) { return '"' + td.innerText.trim().replace(/"/g, '""') + '"'; })
      .join(',');
  });
  var blob = new Blob([[headers.join(',')].concat(data).join('\n')], { type: 'text/csv' });
  var a    = document.createElement('a');
  a.href   = URL.createObjectURL(blob);
  a.download = 'users_' + Date.now() + '.csv';
  a.click();
}