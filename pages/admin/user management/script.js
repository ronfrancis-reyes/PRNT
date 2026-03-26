// printhub admin — user management script.js

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

// open view details modal
function viewDetails(btn) {
  event.stopPropagation();

  // close dropdown
  var dropdown = btn.closest('.dropdown');
  if (dropdown) dropdown.classList.remove('show');

  // get data from the row
  var tr = btn.closest('tr');
  if (!tr) return;
  var d = tr.dataset;

  // status badge class
  var statusClass = 'badge-' + (d.status || '').toLowerCase();

  // build modal content
  var html =
    row2(field('user id',    d.userId),
         field('status',     '<span class="badge ' + statusClass + '">' + (d.status || '—') + '</span>')) +
    row2(field('name',       d.name),
         field('last order', d.lastOrder)) +
    row2(field('email',      d.email),
         field('phone',      d.phone)) +
    // address full width — pulled from order management record
    '<div class="m-card m-full">' +
      '<div class="m-label">address</div>' +
      '<div class="m-val">' + (d.address || '—') + '</div>' +
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

// helpers: labeled card
function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="m-card"><div class="m-label">' + label + '</div><div class="m-val">' + val + '</div></div>';
}

// helpers: 2 or 3 column row
function row2(a, b)    { return '<div class="m-grid2">' + a + b + '</div>'; }
function row3(a, b, c) { return '<div class="m-grid3">' + a + b + c + '</div>'; }

// suspend or activate toggle
function toggleSuspend(btn) {
  event.stopPropagation();
  var row      = btn.closest('tr');
  var badge    = row.querySelector('.badge');
  var dropdown = row.querySelector('.dropdown');

  if (badge.classList.contains('badge-suspended')) {
    badge.textContent  = 'Active';
    badge.className    = 'badge badge-active';
    btn.innerHTML      = '<i class="bi bi-slash-circle"></i> Suspend User';
    row.dataset.status = 'Active';
  } else {
    badge.textContent  = 'Suspended';
    badge.className    = 'badge badge-suspended';
    btn.innerHTML      = '<i class="bi bi-person-check"></i> Activate User';
    row.dataset.status = 'Suspended';
  }
  if (dropdown) dropdown.classList.remove('show');
}

// delete single row
function deleteRow(btn) {
  event.stopPropagation();
  if (confirm('Delete this user?')) btn.closest('tr').remove();
}

// search + status filter
function filterTable() {
  var q = document.getElementById('searchInput').value.toLowerCase();
  var s = document.getElementById('statusFilter').value;
  document.querySelectorAll('#tableBody tr').forEach(function(row) {
    var matchQ = !q || row.innerText.toLowerCase().includes(q);
    var matchS = !s || row.dataset.status === s;
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

// export visible rows as csv
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
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}