// SAMPLE DATA (FRONTEND TESTING ONLY)
// BACKEND INTEGRATION POINT
// Endpoint: /api/admin/users
// Method: GET
const SAMPLE_DATA = {
    users: [] // Note: Initial mock data is populated via HTML data attributes
};

// ==========================================================================
// SECTION: ACTION DROPDOWN TOGGLE (IFRAME LOCAL)
// ==========================================================================
document.addEventListener('click', function (e) {
  const dotBtn = e.target.closest('.btn-action-dots');
  if (dotBtn) {
    e.stopPropagation();
    const dropdown = dotBtn.nextElementSibling;
    
    // Close other dropdowns
    document.querySelectorAll('.action-dropdown.open').forEach(d => {
      if (d !== dropdown) d.classList.remove('open');
    });
    
    dotBtn.classList.toggle('active');
    dropdown.classList.toggle('open');
    return;
  }
  // Close on outside click
  document.querySelectorAll('.action-dropdown.open').forEach(d => d.classList.remove('open'));
});

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
    ? '<button onclick="panelActivate()"><i class="fas fa-user-check"></i> Activate User</button>'
    : '<button onclick="panelSuspend()"><i class="fas fa-user-slash"></i> Suspend User</button>';

  panel.innerHTML =
    '<div class="ap-header">Actions</div>' +
    '<button onclick="panelViewDetails()"><i class="fas fa-eye"></i> View Details</button>' +
    suspendBtn +
    '<div class="ap-divider"></div>' +
    '<button class="danger" onclick="panelDelete()"><i class="fas fa-trash"></i> Delete User</button>';

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
// MODAL CONTROL
async function viewUserDetails(target) {
  // 1. Capture the row context immediately
  const row = target.tagName === 'TR' ? target : target.closest('tr');
  if (!row) return;

  // 2. Extract data BEFORE closing any panels
  const user = getFullUserData(row);

  // 3. Clear transient UI elements
  closeActionPanel(); 
  
  const dropdown = target.closest && target.closest('.action-dropdown');
  if (dropdown) dropdown.classList.remove('open');
  
  const actionWrap = target.closest && target.closest('.action-wrap');
  if (actionWrap) {
    const dots = actionWrap.querySelector('.btn-action-dots');
    if (dots) dots.classList.remove('active');
  }

  // 4. Update placeholders using new class structure
  const set = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  };

  set('.m-user-id',      user.id);
  set('.m-name',         user.name);
  set('.m-total-orders', user.totalOrders);
  set('.m-email',        user.email);
  set('.m-contact',      user.contact);
  set('.m-last-order',   user.lastOrder);

  // 5. Specialized status badge update
  const statusEl = document.querySelector('.m-status');
  if (statusEl) {
    statusEl.textContent = user.status;
    statusEl.className   = `badge m-status badge-${user.status.toLowerCase()}`;
  }

  // 6. Final display
  openOverlay('modalOverlay');
}

// ACTION HANDLER
function panelViewDetails() {
  if (!activeRow) return;
  viewUserDetails(activeRow);
}

// ACTION HANDLER
function suspendUser(btn) {
  activeRow = btn.closest('tr');
  if (!activeRow) return;
  var d = activeRow.dataset;
  
  // Close dropdown
  btn.closest('.action-dropdown').classList.remove('open');
  btn.closest('.action-wrap').querySelector('.btn-action-dots').classList.remove('active');
  
  var name = activeRow.dataset.name || 'this user';
  rowToSuspend = activeRow;
  closeActionPanel();
  document.getElementById('suspendMsg').textContent = 'Are you sure you want to suspend ' + name + '? They will no longer be able to access the system.';
  openOverlay('suspendOverlay');
}

// ACTION HANDLER
function deleteUser(btn) {
  activeRow = btn.closest('tr');
  if (!activeRow) return;
  var d = activeRow.dataset;
  
  // Close dropdown
  btn.closest('.action-dropdown').classList.remove('open');
  btn.closest('.action-wrap').querySelector('.btn-action-dots').classList.remove('active');
  
  var name = activeRow.dataset.name || 'this user';
  rowToDelete = activeRow;
  closeActionPanel();
  document.getElementById('deleteMsg').textContent = 'Are you sure you want to delete ' + name + '? This action cannot be undone.';
  openOverlay('deleteOverlay');
}

// ACTION HANDLER
function panelSuspend() {
  if (!activeRow) return;
  var name = activeRow.dataset.name || 'this user';
  rowToSuspend = activeRow;
  closeActionPanel();
  document.getElementById('suspendMsg').textContent = 'Are you sure you want to suspend ' + name + '? They will no longer be able to access the system.';
  openOverlay('suspendOverlay');
}

// ACTION HANDLER
function panelActivate() {
  if (!activeRow) return;
  var row   = activeRow;
  var name  = row.dataset.name || '';
  closeActionPanel();
  
  // BACKEND INTEGRATION POINT
  // Endpoint: /api/admin/users
  // Method: PATCH
  var badge = row.querySelector('.badge');
  badge.textContent  = 'Active';
  badge.className    = 'badge badge-active';
  row.dataset.status = 'Active';
  showToast('User ' + name + ' has been activated');
}

// ACTION HANDLER
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
  // BACKEND INTEGRATION POINT
  // Endpoint: /api/admin/users
  // Method: DELETE
  if (rowToDelete) rowToDelete.remove();
  closeDeleteModal();
});

document.getElementById('btnConfirmSuspend').addEventListener('click', function() {
  // BACKEND INTEGRATION POINT
  // Endpoint: /api/admin/users
  // Method: PATCH
  if (rowToSuspend) {
    var badge = rowToSuspend.querySelector('.badge');
    badge.textContent        = 'Suspended';
    badge.className          = 'badge badge-suspended';
    rowToSuspend.dataset.status = 'Suspended';
  }
  closeSuspendModal();
});

//  modal overlays
// MODAL CONTROL
function closeModal() {
  closeOverlay('modalOverlay');
}

// MODAL CONTROL
function closeDeleteModal() {
  closeOverlay('deleteOverlay');
  rowToDelete = null;
}

// MODAL CONTROL
function closeSuspendModal() {
  closeOverlay('suspendOverlay');
  rowToSuspend = null;
}

// MODAL CONTROL
function openOverlay(id) {
  var o = document.getElementById(id);
  o.style.display = 'flex';
  o.classList.add('show');
}

// MODAL CONTROL
function closeOverlay(id) {
  var o = document.getElementById(id);
  o.classList.remove('show');
  o.style.display = 'none';
}

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
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

// BACKEND INTEGRATION POINT
function getFullUserData(row) {
  const d = row.dataset;
  return {
    id:          d.userId      || '—',
    name:        d.name        || '—',
    email:       d.email       || '—',
    contact:     d.contact     || '—',
    totalOrders: d.totalOrders || '0',
    lastOrder:   d.lastOrder   || 'None',
    status:      d.status      || 'Active',
    address:     d.address     || 'No address provided'
  };
}

// ACTION HANDLER
function exportCSV() {
  var rows = Array.from(document.querySelectorAll('#tableBody tr'))
    .filter(function(r) { return r.style.display !== 'none'; });
  if (!rows.length) { alert('No users to export.'); return; }

  // BACKEND INTEGRATION POINT
  // ACTION HANDLER
  const exportData = rows.map(row => getFullUserData(row));

  const headers = ['User ID', 'Name', 'Email', 'Contact Number', 'Total Orders', 'Last Order', 'Status', 'Address'];
  
  const data = exportData.map(user => {
    return [
      user.id,
      user.name,
      user.email,
      user.contact,
      user.totalOrders,
      user.lastOrder,
      user.status,
      user.address
    ].map(val => '"' + String(val).replace(/"/g, '""') + '"').join(',');
  });

  var blob = new Blob([[headers.join(',')].concat(data).join('\n')], { type: 'text/csv' });
  var a    = document.createElement('a');
  a.href   = URL.createObjectURL(blob);
  a.download = 'users_export_' + new Date().toISOString().split('T')[0] + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// helper logic (obsolete but kept for other uses if any, currently unused in modal)
function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="detail-card"><div class="detail-label">' + label + '</div><div class="detail-value">' + val + '</div></div>';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); closeSuspendModal(); closeActionPanel(); }
});