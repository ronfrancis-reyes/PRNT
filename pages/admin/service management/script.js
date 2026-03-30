// Service Management Script
document.addEventListener('DOMContentLoaded', () => {
  // Load Admin Components
  loadComponent('sidebar-placeholder', '../../../components/AdminSidebar/index.html');
  loadComponent('header-placeholder', '../../../components/AdminHeader/index.html');

  // Load Real Data
  renderServiceGrid();
});

function renderServiceGrid() {
  const services = [
    { title: 'Document Printing', price: '₱3.00/page', icon: 'file-alt' },
    { title: 'Photo Printing', price: '₱10.00/pc', icon: 'image' },
    { title: 'Tarpaulin Printing', price: '₱15.00/sq.ft', icon: 'scroll' },
    { title: 'ID / Card Printing', price: '₱150.00/set', icon: 'id-card' },
    { title: 'Booklet Binding', price: '₱50.00/pc', icon: 'book' },
    { title: 'Sticker Printing', price: '₱25.00/sheet', icon: 'sticky-note' }
  ];

  const grid = document.getElementById('serviceManageGrid');
  if (!grid) return;

  grid.innerHTML = services.map(s => `
    <div class="service-card-admin">
      <div class="svc-icon-box"><i class="fas fa-${s.icon}"></i></div>
      <div>
        <div style="font-weight:700; color:var(--text-dark);">${s.title}</div>
        <div style="font-size:0.9rem; color:var(--primary); font-weight:600;">${s.price}</div>
      </div>
      <div class="svc-actions">
        <button class="btn-icon" style="color:var(--primary);"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" style="color:var(--text-muted);"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function showAddServiceModal() {
  alert('Modal function triggered. Would show Add Service form here.');
}

function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('active');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function toggleAdminProfileMenu() {
  document.getElementById('adminProfileDropdown').classList.toggle('active');
}
