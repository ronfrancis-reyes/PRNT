var activeRow   = null;
var rowToDelete = null;
var rowToSuspend = null;

//  action panel 
document.addEventListener('click', function(e) {
  if (!e.target.closest('.btn-actions') && !e.target.closest('#actionPanel')) {
    closeActionPanel();
  }
});

function toggleMenu(btn) {
  var panel  = document.getElementById('actionPanel');
  var row    = btn.closest('tr');

  // clicking same button closes it
  if (activeRow === row && panel.classList.contains('show')) {
    closeActionPanel();
    return;
  }

  activeRow = row;
  var status = row.dataset.status;

  //  suspend or activate button 
  var suspendBtn = status === 'Suspended'
    ? '<button onclick="panelActivate()"><i class="bi bi-person-check"></i> Activate User</button>'
    : '<button onclick="panelSuspend()"><i class="bi bi-slash-circle"></i> Suspend User</button>';

  panel.innerHTML =
    '<div class="ap-header">Actions</div>' +
    '<button onclick="panelViewDetails()"><i class="bi bi-eye"></i> View Details</button>' +
    suspendBtn +
    '<div class="ap-divider"></div>' +
    '<button class="danger" onclick="panelDelete()"><i class="bi bi-trash3"></i> Delete User</button>';

  // position beside the button
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

//  panel actions 
function panelViewDetails() {
  if (!activeRow) return;
  var d = activeRow.dataset;
  closeActionPanel();

  var statusClass = 'badge-' + (d.status || '').toLowerCase();
  var html =
    '<div class="m-section-title"><i class="bi bi-person"></i> User Details</div>' +
    row2(field('user id', d.userId), field('status', '<span class="badge ' + statusClass + '">' + (d.status || '—') + '</span>')) +
    row2(field('name', d.name), field('last order', d.lastOrder)) +
    row2(field('email', d.email), field('phone', d.phone)) +
    '<div class="m-card m-full"><div class="m-label">address</div><div class="m-val">' + (d.address || '—') + '</div></div>';

  document.getElementById('modalBody').innerHTML = html;
  var overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('show');
}

function panelSuspend() {
  if (!activeRow) return;
  var name = activeRow.dataset.name || 'this user';
  rowToSuspend = activeRow;
  closeActionPanel();
  document.getElementById('suspendMsg').textContent = 'Are you sure you want to suspend ' + name + '? They will no longer be able to access the system.';
  openOverlay('suspendOverlay');
}

function panelActivate() {
  if (!activeRow) return;
  var row   = activeRow;
  var name  = row.dataset.name || '';
  closeActionPanel();
  var badge = row.querySelector('.badge');
  badge.textContent  = 'Active';
  badge.className    = 'badge badge-active';
  row.dataset.status = 'Active';
  showToast('User ' + name + ' has been activated');
}

function panelDelete() {
  if (!activeRow) return;
  var name = activeRow.dataset.name || 'this user';
  rowToDelete = activeRow;
  closeActionPanel();
  document.getElementById('deleteMsg').textContent = 'Are you sure you want to delete ' + name + '? This action cannot be undone.';
  openOverlay('deleteOverlay');
}

//  confirm buttons 
document.getElementById('btnConfirmDelete').addEventListener('click', function() {
  if (rowToDelete) rowToDelete.remove();
  closeDeleteModal();
});

document.getElementById('btnConfirmSuspend').addEventListener('click', function() {
  if (rowToSuspend) {
    var badge = rowToSuspend.querySelector('.badge');
    badge.textContent        = 'Suspended';
    badge.className          = 'badge badge-suspended';
    rowToSuspend.dataset.status = 'Suspended';
  }
  closeSuspendModal();
});

//  modal overlays
function closeModal() {
  closeOverlay('modalOverlay');
}

function closeDeleteModal() {
  closeOverlay('deleteOverlay');
  rowToDelete = null;
}

function closeSuspendModal() {
  closeOverlay('suspendOverlay');
  rowToSuspend = null;
}

function openOverlay(id) {
  var o = document.getElementById(id);
  o.style.display = 'flex';
  o.classList.add('show');
}

function closeOverlay(id) {
  var o = document.getElementById(id);
  o.classList.remove('show');
  o.style.display = 'none';
}

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
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.style.display !== 'none'; });
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

// helpers 
function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="m-card"><div class="m-label">' + label + '</div><div class="m-val">' + val + '</div></div>';
}

function row2(a, b)    { return '<div class="m-grid2">' + a + b + '</div>'; }
function row3(a, b, c) { return '<div class="m-grid3">' + a + b + c + '</div>'; }

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); closeSuspendModal(); closeActionPanel(); }
});