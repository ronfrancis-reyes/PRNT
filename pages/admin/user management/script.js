const API = "../../../api/user-management.php";
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

// view details modal
function viewDetails(btn) {
  event.stopPropagation();
  var dropdown = btn.closest('.dropdown');
  if (dropdown) dropdown.classList.remove('show');

  var tr = btn.closest('tr');
  if (!tr) return;
  var d = tr.dataset;
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

function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('show');
  overlay.style.display = 'none';
}

// delete confirm modal
var rowToDelete = null;

function confirmDelete(btn) {
  event.stopPropagation();
  btn.closest('.dropdown').classList.remove('show');
  rowToDelete = btn.closest('tr');
  var name = rowToDelete.dataset.name || 'this user';
  document.getElementById('deleteMsg').textContent = 'Are you sure you want to delete ' + name + '? This action cannot be undone.';
  openOverlay('deleteOverlay');
}

function closeDeleteModal() {
  closeOverlay('deleteOverlay');
  rowToDelete = null;
}

document.getElementById('btnConfirmDelete').addEventListener('click', function() {
  if (rowToDelete) rowToDelete.remove();
  closeDeleteModal();
});

// suspend confirm modal
var rowToSuspend = null;

function confirmSuspend(btn) {
  event.stopPropagation();
  btn.closest('.dropdown').classList.remove('show');
  rowToSuspend = btn;
  var tr = btn.closest('tr');
  var name = tr.dataset.name || 'this user';
  document.getElementById('suspendMsg').textContent = 'Are you sure you want to suspend ' + name + '? They will no longer be able to access the system.';
  openOverlay('suspendOverlay');
}

function closeSuspendModal() {
  closeOverlay('suspendOverlay');
  rowToSuspend = null;
}

document.getElementById('btnConfirmSuspend').addEventListener('click', function() {
  if (rowToSuspend) doSuspend(rowToSuspend);
  closeSuspendModal();
});

// perform the actual suspend action
function doSuspend(btn) {
  var row      = btn.closest('tr');
  var badge    = row.querySelector('.badge');
  var dropdown = row.querySelector('.dropdown');
  badge.textContent  = 'Suspended';
  badge.className    = 'badge badge-suspended';
  btn.innerHTML      = '<i class="bi bi-person-check"></i> Activate User';
  btn.setAttribute('onclick', 'activateUser(this)');
  row.dataset.status = 'Suspended';
  updateAccountStatus(row.dataset.userId, 'Suspended');
  if (dropdown) dropdown.classList.remove('show');
}

// activate user
function activateUser(btn) {
  event.stopPropagation();
  btn.closest('.dropdown').classList.remove('show');
  var row   = btn.closest('tr');
  var badge = row.querySelector('.badge');
  badge.textContent  = 'Active';
  badge.className    = 'badge badge-active';
  btn.innerHTML      = '<i class="bi bi-slash-circle"></i> Suspend User';
  btn.setAttribute('onclick', 'confirmSuspend(this)');
  row.dataset.status = 'Active';
  updateAccountStatus(row.dataset.userId, 'Active');
  showToast('User ' + (row.dataset.name || '') + ' has been activated');
}

// shared overlay helpers
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

// toast notification
function showToast(msg) {
  var toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3500);
}

// close modals on escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); closeSuspendModal(); }
});

// helpers
function field(label, val) {
  if (!val || val === 'undefined') val = '—';
  return '<div class="m-card"><div class="m-label">' + label + '</div><div class="m-val">' + val + '</div></div>';
}

function row2(a, b)    { return '<div class="m-grid2">' + a + b + '</div>'; }
function row3(a, b, c) { return '<div class="m-grid3">' + a + b + c + '</div>'; }

// search and status filter
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

$(document).ready(function () {
	showUsers();
});

function showUsers(){
  $.ajax({
    url: API,
    type: "POST",
    data: "action=get",
    success: function(response) {
      let data = JSON.parse(response);
      let table = $("#tableBody");

      if(data.status != "error"){
        data.forEach((accounts)=>{
          let isSuspended = (accounts.account_status || '').toLowerCase() === 'suspended';

          let action = isSuspended
            ? `<button onclick="activateUser(this)">
                <i class="bi bi-person-check"></i> Activate User
              </button>`
            : `<button onclick="confirmSuspend(this)">
                <i class="bi bi-slash-circle"></i> Suspend User
              </button>`;
          table.append(`<tr data-user-id="${accounts.account_id}" data-name="${accounts.name}" data-email="${accounts.email}" data-status="${accounts.account_status}" data-last-order="${accounts.order_id || '—'}">
            <td>${accounts.account_id}</td>
            <td>${accounts.name}</td>
            <td>${accounts.email}</td>
            <td><span class="badge badge-${(accounts.account_status || '').toLowerCase()}">${accounts.account_status || '—'}</span></td>
            <td>${accounts.order_id || '—'}</td>
            <td>
              <div class="action-wrap">
                <button class="action-btn" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                <div class="dropdown">
                  <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                  ${action}
                  <hr/>
                  <button class="danger" onclick="confirmDelete(this)"><i class="bi bi-trash3"></i> Delete User</button>
                </div>
              </div>
            </td>
            </tr>
          `)
        })
      }
    }
  });
}

function updateAccountStatus(id, status){
	$.ajax({
		type: "POST",
		url: API,
		data: "action=update&id=" + id + "&status=" + status,
		success: function (response) {
			let reply = JSON.parse(response);
			alert(reply.message);
			location.reload();
		},
		error: function () {
		}
	});
}