// Order Management Script
document.addEventListener('DOMContentLoaded', () => {
  // Load Admin Components
  loadComponent('sidebar-placeholder', '../../../components/AdminSidebar/index.html');
  loadComponent('header-placeholder', '../../../components/AdminHeader/index.html');

  // Load Real Data
  renderOrdersTable();
});

function renderOrdersTable() {
  const orders = JSON.parse(localStorage.getItem('prnt_orders') || '[]');
  const body = document.getElementById('adminOrdersBody');
  if (!body) return;

  if (orders.length === 0) {
    body.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:3rem; color:var(--text-muted);"><i class="fas fa-box-open" style="font-size:2rem; display:block; margin-bottom:1rem; opacity:0.3;"></i> No orders placed yet.</td></tr>';
    return;
  }

  body.innerHTML = orders.reverse().map(o => `
    <tr>
      <td style="padding:1.25rem; font-weight:700; color:var(--text-dark);">${o.id}</td>
      <td style="padding:1.25rem;">
        <div style="font-weight:600;">${o.receiving === 'delivery' ? o.location : 'Juan Dela Cruz'}</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">${new Date(o.timestamp).toLocaleString()}</div>
      </td>
      <td style="padding:1.25rem;">${o.items[0].service} (${o.items.length})</td>
      <td style="padding:1.25rem; font-weight:700; color:var(--primary);">${o.total}</td>
      <td style="padding:1.25rem;"><span class="status-badge" style="background:#E8F8EE; color:#2DC258;">${o.status.toUpperCase()}</span></td>
      <td style="padding:1.25rem;">
        <button class="btn-icon" style="color:var(--primary); margin-right:0.5rem;"><i class="fas fa-eye"></i></button>
        <button class="btn-icon" style="color:var(--text-muted);"><i class="fas fa-print"></i></button>
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
