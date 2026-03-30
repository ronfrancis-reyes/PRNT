// User Management Script
document.addEventListener('DOMContentLoaded', () => {
  // Load Admin Components
  loadComponent('sidebar-placeholder', '../../../components/AdminSidebar/index.html');
  loadComponent('header-placeholder', '../../../components/AdminHeader/index.html');

  // Load Real Data
  renderUsersTable();
});

function renderUsersTable() {
  const users = JSON.parse(localStorage.getItem('prnt_all_users') || '[]');
  const body = document.getElementById('adminUsersBody');
  if (!body) return;

  const mockUsers = [
    { name: 'Maria Clara', email: 'maria@bulsu.edu.ph', phone: '09123456789', status: 'Active' },
    { name: 'Jose Rizal', email: 'jose@bulsu.edu.ph', phone: '09223456789', status: 'Active' },
    { name: 'Andres Bonifacio', email: 'andres@bulsu.edu.ph', phone: '09323456789', status: 'Suspended' }
  ];

  const allUsers = [...mockUsers, ...users];

  body.innerHTML = allUsers.map(u => `
    <tr>
      <td style="padding:1.25rem;">
        <div class="user-cell">
          <div class="avatar-sm">${u.name.split(' ').map(n=>n[0]).join('')}</div>
          <div style="font-weight:600; color:var(--text-dark);">${u.name}</div>
        </div>
      </td>
      <td style="padding:1.25rem;">${u.phone || 'N/A'}</td>
      <td style="padding:1.25rem;">${u.email}</td>
      <td style="padding:1.25rem;">
         <span class="status-badge ${u.status === 'Active' ? 'active-user' : 'suspended-user'}" style="padding:0.4rem 0.8rem; border-radius:50px; font-size:0.75rem;">${u.status ? u.status.toUpperCase() : 'ACTIVE'}</span>
      </td>
      <td style="padding:1.25rem;">
        <button class="btn-icon" style="color:var(--primary); margin-right:0.5rem;"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" style="color:var(--text-muted);"><i class="fas fa-ban"></i></button>
      </td>
    </tr>
  `).join('');
}

function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('active');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function toggleAdminProfileMenu() {
  document.getElementById('adminProfileDropdown').classList.toggle('active');
}
