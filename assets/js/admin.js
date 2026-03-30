// ============================================
// PRNT — Admin Dashboard JavaScript (Complete)
// ============================================

// ===== TOAST NOTIFICATIONS =====
function showAdminToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const iconMap = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle', warning: 'exclamation-triangle' };
  const colorMap = { success: 'var(--success)', error: 'var(--danger)', info: 'var(--primary)', warning: 'var(--warning)' };
  toast.innerHTML = `
    <i class="fas fa-${iconMap[type] || 'info-circle'}" style="color:${colorMap[type] || 'var(--primary)'};font-size:1.2rem;"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== ADMIN PAGE SWITCHING =====
function switchAdminPage(section, link) {
  document.querySelectorAll('.admin-page-section').forEach(s => s.classList.remove('active'));
  const targetSection = document.getElementById(`section-${section}`);
  if (targetSection) targetSection.classList.add('active');

  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  if (link) link.classList.add('active');

  const titleMap = {
    dashboard: 'Dashboard Overview',
    analytics: 'Analytics & Insights',
    orders: 'Order Management',
    services: 'Service Management',
    users: 'User Management',
    reports: 'System Reports'
  };
  document.getElementById('adminPageTitle').textContent = titleMap[section] || 'Dashboard';

  // Real-time Page Initializers
  const pageInitializers = {
    dashboard: () => {
      renderRecentOrders();
      updateDashboardStats();
      setTimeout(initDashboardCharts, 50);
    },
    analytics: () => {
      renderTopProducts();
      setTimeout(initAnalyticsCharts, 50);
    },
    orders: renderAdminOrders,
    services: renderServiceManagement,
    users: renderAdminUsers,
    reports: renderReports
  };

  if (pageInitializers[section]) {
    pageInitializers[section]();
  }

  // Reset scroll to top on every page switch
  const adminBody = document.querySelector('.admin-body');
  if (adminBody) adminBody.scrollTop = 0;

  if (window.innerWidth <= 768) {
    document.getElementById('adminSidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
  }
}

// ===== SIDEBAR TOGGLE (MOBILE) =====
function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

// ===== NOTIFICATION PANEL =====
// ===== MASTER ANALYTICS DATA SOURCE (Single Source of Truth) =====
const MASTER_ANALYTICS_DATA = {
  revenue: {
    daily: [1200, 1800, 1500, 2200, 2800, 2400, 3100],
    weekly: [12000, 15000, 13500, 18000, 22000, 19500, 24500],
    monthly: [45000, 52000, 48000, 55000, 62000, 58000, 68000, 72000, 65000, 78000, 85000, 92000],
    yearly: [450000, 580000, 720000, 890000],
    labels: {
      daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      weekly: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      yearly: ['2023', '2024', '2025', '2026']
    }
  },
  sales: {
    daily: [45, 52, 48, 60, 75, 55, 68],
    weekly: [280, 310, 290, 350],
    monthly: [1200, 1350, 1100, 1500, 1800, 1600],
    yearly: [14500, 18200, 22400, 28500],
    labels: {
      daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      weekly: ['W1', 'W2', 'W3', 'W4'],
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      yearly: ['2023', '2024', '2025', '2026']
    }
  },
  products: {
    monthly: [450, 320, 180, 120], // Document, Photo, Tarpaulin, Others
    labels: ['Document', 'Photo', 'Tarpaulin', 'Others']
  },
  userGrowth: {
    monthly: [80, 95, 120, 110, 145, 128, 160, 185, 140, 195, 230, 260],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

let currentGrowthQuarter = 0; // 0=Q1, 1=Q2, etc.

let notifOpen = false;
let profileMenuOpen = false;

const NOTIFICATIONS = [
  { icon: 'shopping-bag', iconBg: '#EFF6FF', iconColor: '#3B82F6', text: '<strong>New order</strong> ORD-2401 from Maria Clara', time: '2 minutes ago', unread: true },
  { icon: 'user-plus', iconBg: '#ECFDF5', iconColor: '#10B981', text: '<strong>New user</strong> registered: Teresa M.', time: '15 minutes ago', unread: true },
  { icon: 'check-circle', iconBg: '#D1FAE5', iconColor: '#065F46', text: 'Order <strong>ORD-2397</strong> marked as completed', time: '1 hour ago', unread: true },
  { icon: 'star', iconBg: '#FEF3C7', iconColor: '#F59E0B', text: '<strong>5-star review</strong> from Andres B.', time: '3 hours ago', unread: false },
  { icon: 'exclamation-triangle', iconBg: '#FEE2E2', iconColor: '#EF4444', text: 'Low stock alert for <strong>photo paper</strong>', time: '5 hours ago', unread: false },
];

function renderNotifications() {
  const list = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  badge.style.display = unreadCount > 0 ? 'block' : 'none';

  if (NOTIFICATIONS.length === 0) {
    list.innerHTML = '<div class="notif-empty"><i class="fas fa-bell-slash" style="font-size:2rem;margin-bottom:0.5rem;display:block;"></i>No notifications</div>';
    return;
  }

  list.innerHTML = NOTIFICATIONS.map((n, i) => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markNotifRead(${i})">
      <div class="notif-icon" style="background:${n.iconBg};color:${n.iconColor};">
        <i class="fas fa-${n.icon}"></i>
      </div>
      <div class="notif-text">
        <p>${n.text}</p>
        <small>${n.time}</small>
      </div>
    </div>
  `).join('');
}

function toggleNotifPanel() {
  notifOpen = !notifOpen;
  document.getElementById('notifDropdown').classList.toggle('active', notifOpen);
  // Close profile dropdown
  profileMenuOpen = false;
  document.getElementById('adminProfileDropdown').classList.remove('active');
}

function markNotifRead(index) {
  NOTIFICATIONS[index].unread = false;
  renderNotifications();
}

function clearNotifications() {
  NOTIFICATIONS.length = 0;
  renderNotifications();
  showAdminToast('Notifications cleared');
}

// ===== ADMIN PROFILE DROPDOWN =====
function toggleAdminProfileMenu() {
  profileMenuOpen = !profileMenuOpen;
  document.getElementById('adminProfileDropdown').classList.toggle('active', profileMenuOpen);
  // Close notif dropdown
  notifOpen = false;
  document.getElementById('notifDropdown').classList.remove('active');
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-icon-btn') && !e.target.closest('.notif-dropdown')) {
    notifOpen = false;
    document.getElementById('notifDropdown')?.classList.remove('active');
  }
  if (!e.target.closest('.admin-avatar') && !e.target.closest('.admin-profile-dropdown')) {
    profileMenuOpen = false;
    document.getElementById('adminProfileDropdown')?.classList.remove('active');
  }
});

// ===== FORMAT/SIZE LABEL MAPS (mirrors app.js for cross-compatibility) =====
const FORMAT_LABELS = {
  document: 'Document Printing',
  photo: 'Photo Printing',
  tarpaulin: 'Tarpaulin Printing',
  id_card: 'ID / Card Printing',
  booklet: 'Booklet Binding',
  sticker: 'Sticker Printing',
};
const SIZE_LABELS = {
  a4: 'A4', letter: 'Letter', a3: 'A3', a2: 'A2', legal: 'Legal',
  '4x6': '4×6', '5x7': '5x7', '8x10': '8x10', custom: 'Custom',
  cr80: 'CR80', business: 'Business Card', a5: 'A5'
};

// ===== ADMIN STATE & DATA =====
let ADMIN_ORDERS = JSON.parse(localStorage.getItem('prnt_orders')) || [];
let ADMIN_USERS = JSON.parse(localStorage.getItem('prnt_users')) || [];

const SAMPLE_SERVICES = [
  { name: 'Document Printing (B&W)', price: '₱3.00/page', desc: 'Black and white document printing on standard paper.', icon: 'file-alt', active: true },
  { name: 'Document Printing (Color)', price: '₱8.00/page', desc: 'Full color document printing on standard paper.', icon: 'file-alt', active: true },
  { name: 'Photo Printing (4×6)', price: '₱12.00/pc', desc: 'Glossy photo prints in 4×6 size.', icon: 'image', active: true },
  { name: 'Photo Printing (A4)', price: '₱15.00/pc', desc: 'Large format photo prints on A4 paper.', icon: 'image', active: true },
  { name: 'Tarpaulin (per sqft)', price: '₱120.00/sqft', desc: 'High-resolution tarpaulin printing with grommets.', icon: 'scroll', active: true },
  { name: 'ID / Card Printing', price: '₱35.00/pc', desc: 'PVC ID cards, business cards, invitations.', icon: 'id-card', active: true },
  { name: 'Booklet Binding', price: '₱75.00/pc', desc: 'Perfect binding, spiral, or saddle-stitch.', icon: 'book', active: true },
  { name: 'Sticker Printing', price: '₱25.00/sheet', desc: 'Custom stickers with die-cut or kiss-cut.', icon: 'sticky-note', active: true },
];

let ADMIN_SERVICES = JSON.parse(localStorage.getItem('prnt_services')) || SAMPLE_SERVICES;

// Fallback to sample data if empty for demo purposes
const DEFAULT_SAMPLES = [
  { id: 'ORD-2401', customer: 'Maria Clara', email: 'maria@bulsu.edu.ph', phone: '09171234567', service: 'Document', file: 'thesis.pdf', amount: 45, receiving: 'Pick-up', status: 'Pending', time: '2:30 PM', date: 'Mar 24, 2026', copies: 15, printType: 'B&W', paperSize: 'A4', notes: 'Please bind them with a black spine.' },
  { id: 'ORD-2400', customer: 'Jose Rizal', email: 'jose@bulsu.edu.ph', phone: '09228881234', service: 'Tarpaulin', file: 'banner.png', amount: 240, receiving: 'Delivery', status: 'Processing', time: '1:15 PM', date: 'Mar 24, 2026', copies: 2, printType: 'Color', paperSize: 'Custom', notes: 'Needs eyelets on all corners.' },
];

if (ADMIN_ORDERS.length === 0) {
  ADMIN_ORDERS = [...DEFAULT_SAMPLES];
}

// Function to save admin changes
function saveAdminState() {
  localStorage.setItem('prnt_orders', JSON.stringify(ADMIN_ORDERS));
  localStorage.setItem('prnt_users', JSON.stringify(ADMIN_USERS));
  updateDashboardStats();
}

function updateDashboardStats() {
  const totalOrders = document.getElementById('dashTotalOrders');
  const totalSales = document.getElementById('dashTotalSales');
  const totalUsers = document.getElementById('dashTotalUsers');
  
  if (totalOrders) totalOrders.textContent = ADMIN_ORDERS.length.toLocaleString();
  if (totalUsers) totalUsers.textContent = SAMPLE_USERS.length.toLocaleString();
  if (totalSales) {
    const sum = ADMIN_ORDERS.reduce((s, o) => s + (parseFloat(o.amount) || parseFloat(o.total) || 0), 0);
    totalSales.textContent = `₱${sum.toLocaleString()}`;
  }
}

// Keeping original static samples for modal populating if needed, but logic uses ADMIN_ORDERS
const SAMPLE_ORDERS = ADMIN_ORDERS;
const SAMPLE_USERS = [
  { id: 'USR-001', name: 'Maria Clara', email: 'maria@bulsu.edu.ph', phone: '09171234567', status: 'Active', lastActive: 'Today', lastOrder: 'ORD-2401', totalOrders: 12, totalSpent: 3480, joined: 'Jan 15, 2026' },
  { id: 'USR-002', name: 'Jose Rizal', email: 'jose@bulsu.edu.ph', phone: '09228881234', status: 'Active', lastActive: 'Today', lastOrder: 'ORD-2400', totalOrders: 9, totalSpent: 2160, joined: 'Feb 02, 2026' },
  { id: 'USR-003', name: 'Andres Bonifacio', email: 'andres@bulsu.edu.ph', phone: '09334567890', status: 'Active', lastActive: 'Yesterday', lastOrder: 'ORD-2399', totalOrders: 7, totalSpent: 1750, joined: 'Feb 10, 2026' },
  { id: 'USR-004', name: 'Gabriela Silang', email: 'gabriela@bulsu.edu.ph', phone: '09556789123', status: 'Active', lastActive: 'Yesterday', lastOrder: 'ORD-2398', totalOrders: 6, totalSpent: 1350, joined: 'Feb 20, 2026' },
  { id: 'USR-005', name: 'Emilio Aguinaldo', email: 'emilio@bulsu.edu.ph', phone: '09664445555', status: 'Suspended', lastActive: '3 days ago', lastOrder: 'ORD-2397', totalOrders: 5, totalSpent: 890, joined: 'Mar 01, 2026' },
  { id: 'USR-006', name: 'Apolinario Mabini', email: 'apolinario@bulsu.edu.ph', phone: '09123456781', status: 'Active', lastActive: '3 days ago', lastOrder: 'ORD-2396', totalOrders: 4, totalSpent: 530, joined: 'Mar 05, 2026' },
  { id: 'USR-007', name: 'Melchora Aquino', email: 'melchora@bulsu.edu.ph', phone: '09998887777', status: 'Active', lastActive: '1 week ago', lastOrder: 'ORD-2395', totalOrders: 3, totalSpent: 280, joined: 'Mar 10, 2026' },
  { id: 'USR-008', name: 'Teresa Magbanua', email: 'teresa@bulsu.edu.ph', phone: '09087654321', status: 'Active', lastActive: '1 week ago', lastOrder: 'ORD-2394', totalOrders: 2, totalSpent: 720, joined: 'Mar 12, 2026' },
];

// ===== RENDER FUNCTIONS =====
function getStatusClass(status) {
  if (!status) return 'pending';
  const s = status.toLowerCase();
  if (s === 'completed' || s === 'active' || s === 'ready') return 'completed';
  if (s === 'processing' || s === 'printing' || s === 'confirmed') return 'processing';
  return 'pending';
}

function getCustomerName(order) {
  if (order.customer) return order.customer;
  if (order.currentUser) return `${order.currentUser.firstName || ''} ${order.currentUser.lastName || ''}`.trim();
  if (order.firstName) return `${order.firstName} ${order.lastName || ''}`.trim();
  return 'Guest User';
}

function getOrderAmount(order) {
  return parseFloat(order.amount) || parseFloat(order.total) || 0;
}

function renderRecentOrders() {
  const tbody = document.getElementById('recentOrdersBody');
  if (!tbody) return;
  const recent = [...ADMIN_ORDERS].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  tbody.innerHTML = recent.map(order => {
    const statusClass = getStatusClass(order.status);
    const isCartOrder = Array.isArray(order.items) && order.items.length > 0;
    const serviceName = order.service || (isCartOrder ? (FORMAT_LABELS[order.items[0].format] || order.items[0].format) : 'Printing');
    return `
      <tr>
        <td style="font-weight:600;">${order.id}</td>
        <td>${getCustomerName(order)}</td>
        <td>${serviceName}</td>
        <td style="font-weight:700; color:var(--primary);">₱${getOrderAmount(order).toFixed(2)}</td>
        <td><span class="status-badge ${statusClass}">${order.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="action-view" onclick="viewOrderDetail('${order.id}')"><i class="fas fa-eye"></i></button>
            <button class="action-edit" onclick="openStatusModal('${order.id}')"><i class="fas fa-edit"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminOrders() {
  const tbody = document.getElementById('adminOrdersBody');
  if (!tbody) return;
  const searchQuery = document.getElementById('orderSearch')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('orderStatusFilter')?.value || '';

  const filtered = ADMIN_ORDERS.filter(order => {
    const customer = getCustomerName(order).toLowerCase();
    const matchSearch = !searchQuery ||
      order.id.toLowerCase().includes(searchQuery) ||
      customer.includes(searchQuery) ||
      (order.service && order.service.toLowerCase().includes(searchQuery)) ||
      (order.file && order.file.toLowerCase().includes(searchQuery));
    const statusVal = (order.status || '').toLowerCase();
    const filterVal = statusFilter.toLowerCase();
    const matchStatus = !statusFilter || statusVal === filterVal;
    return matchSearch && matchStatus;
  });

  // Updated columns as per requirement
  tbody.innerHTML = filtered.map(order => {
    const statusClass = getStatusClass(order.status);
    
    // Support both single-item and multi-item structures
    const isCartOrder = Array.isArray(order.items) && order.items.length > 0;
    const firstItem = isCartOrder ? order.items[0] : null;
    
    const customerName = order.customer || (order.currentUser ? `${order.currentUser.firstName} ${order.currentUser.lastName}` : (order.firstName ? `${order.firstName} ${order.lastName}` : 'Guest User'));
    const serviceName = order.service || (isCartOrder ? (FORMAT_LABELS[firstItem.format] || firstItem.format) : 'Printing');
    const fileName = order.file || (isCartOrder ? (firstItem.file ? firstItem.file.name : (firstItem.fileName || 'Untitled')) : 'N/A');
    const displayFile = isCartOrder && order.items.length > 1 ? `${fileName} (+${order.items.length - 1})` : fileName;
    return `
      <tr>
        <td style="font-weight:700; color:var(--primary); white-space:nowrap;">${order.id}</td>
        <td style="font-weight:600;">${customerName}</td>
        <td style="color:var(--text-muted); font-size:0.85rem; white-space:nowrap;">${order.date || order.time || 'N/A'}</td>
        <td style="font-weight:700; color:#1E293B;">&#8369;${getOrderAmount(order).toFixed(2)}</td>
        <td><span class="status-badge ${statusClass}">${order.status}</span></td>
        <td style="text-align:right;">
          <div class="table-actions" style="justify-content:flex-end;">
            <button class="action-view" title="View Details" onclick="viewOrderDetail('${order.id}')"><i class="fas fa-eye"></i></button>
            <button class="action-edit" title="Edit Status" onclick="openStatusModal('${order.id}')"><i class="fas fa-edit"></i></button>
            <button class="action-delete" title="Delete" onclick="confirmDeleteOrder('${order.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminUsers() {
  const tbody = document.getElementById('adminUsersBody');
  if (!tbody) return;
  const searchQuery = document.getElementById('userSearch')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('userStatusFilter')?.value || '';

  const filtered = SAMPLE_USERS.filter(user => {
    const matchSearch = !searchQuery || 
      user.id.toLowerCase().includes(searchQuery) || 
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery);
    const matchStatus = !statusFilter || user.status === statusFilter;
    return matchSearch && matchStatus;
  });

  tbody.innerHTML = filtered.map(user => {
    const statusClass = getStatusClass(user.status);
    return `
      <tr>
        <td style="font-weight:700; color:var(--primary);">${user.id}</td>
        <td style="font-weight:600;">${user.name}</td>
        <td style="color:#475569;">${user.email}</td>
        <td>${user.phone || '0917-XXX-XXXX'}</td>
        <td><span class="status-badge ${statusClass}">${user.status}</span></td>
        <td style="color:var(--text-muted); font-size:0.85rem;">${user.lastActive}</td>
        <td style="text-align:right;">
          <div class="table-actions" style="justify-content:flex-end;">
            <button class="action-view" title="View Profile" onclick="viewUserDetail('${user.id}')"><i class="fas fa-eye"></i></button>
            <button class="action-edit" title="Toggle Status" onclick="toggleUserStatus('${user.id}')"><i class="fas fa-user-shield"></i></button>
            <button class="action-delete" title="Delete User" onclick="confirmDeleteUser('${user.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderServiceManagement() {
  const grid = document.getElementById('serviceManageGrid');
  if (!grid) return;
  grid.innerHTML = ADMIN_SERVICES.map((service, index) => `
    <div class="service-manage-card">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--secondary);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
          <i class="fas fa-${service.icon}"></i>
        </div>
        <h4>${service.name}</h4>
      </div>
      <div class="price-tag">${service.price}</div>
      <div class="service-details">${service.desc}</div>
      <div class="card-actions">
        <button class="btn-edit" style="padding:0.5rem 1rem;border-radius:8px;font-size:0.8rem;" onclick="editService(${index})"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn-delete" style="padding:0.5rem 1rem;border-radius:8px;font-size:0.8rem;" onclick="confirmDeleteService(${index})"><i class="fas fa-trash"></i> Delete</button>
      </div>
    </div>
  `).join('');
}

// ===== VIEW ORDER DETAIL =====
function viewOrderDetail(orderId) {
  const order = ADMIN_ORDERS.find(o => o.id === orderId);
  if (!order) return;

  const customerName = order.customer || (order.currentUser ? `${order.currentUser.firstName} ${order.currentUser.lastName}` : (order.firstName ? `${order.firstName} ${order.lastName}` : 'Guest User'));
  const email = order.email || (order.currentUser ? order.currentUser.email : 'N/A');
  const phone = order.phone || order.customerPhone || (order.currentUser ? order.currentUser.phone : 'N/A');
  const receiving = order.receiving || 'N/A';
  const receivingIcon = receiving.toLowerCase().includes('pickup') || receiving.toLowerCase().includes('pick') ? 'store' : 'truck';
  const totalAmt = (parseFloat(order.amount) || parseFloat(order.total) || 0).toFixed(2);
  const isCartOrder = Array.isArray(order.items) && order.items.length > 0;

  const content = document.getElementById('orderDetailContent');
  content.innerHTML = `
    <!-- Header Row: ID + Date -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.75rem;">
      <div class="order-detail-item">
        <div class="detail-label">Order ID</div>
        <div class="detail-value" style="color:var(--primary);">${order.id}</div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Date</div>
        <div class="detail-value">${order.date || 'N/A'}</div>
      </div>
    </div>

    <!-- Customer Info Row -->
    <div class="order-detail-item" style="margin-bottom:0.75rem;">
      <div style="display:flex; gap:2rem; flex-wrap:wrap;">
        <div style="flex:1; min-width:120px;">
          <div class="detail-label">Customer</div>
          <div class="detail-value">${customerName}</div>
        </div>
        <div style="flex:1; min-width:120px;">
          <div class="detail-label">Email</div>
          <div class="detail-value" style="word-break:break-all;">${email}</div>
        </div>
        <div style="flex:1; min-width:100px;">
          <div class="detail-label">Phone</div>
          <div class="detail-value">${phone}</div>
        </div>
      </div>
    </div>

    <!-- Items Section -->
    <div style="margin-bottom:0.75rem;">
      <div class="detail-label" style="padding:0.5rem 0; font-weight:700; color:#475569; border-bottom:1px solid #E2E8F0; margin-bottom:0.5rem;">
        <i class="fas fa-box" style="margin-right:0.4rem; color:var(--primary);"></i>
        ${isCartOrder ? `Ordered Items (${order.items.length})` : 'Order Details'}
      </div>
      ${isCartOrder ? order.items.map(item => `
        <div style="display:flex; align-items:center; gap:0.75rem; padding:0.75rem; background:#F8FAFC; border-radius:8px; border:1px solid #E2E8F0; margin-bottom:0.5rem;">
          <div style="width:36px; height:36px; border-radius:8px; background:var(--secondary); color:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <i class="fas fa-file-alt"></i>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="font-weight:700; font-size:0.9rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.file ? item.file.name : (item.fileName || 'Untitled')}</div>
            <div style="font-size:0.78rem; color:#64748B; margin-top:0.1rem;">${FORMAT_LABELS[item.format] || item.format || 'N/A'} &nbsp;&middot;&nbsp; ${SIZE_LABELS[item.size] || item.size || 'N/A'} &nbsp;&middot;&nbsp; ${item.type === 'bw' ? 'B&W' : 'Color'} &nbsp;&middot;&nbsp; ${item.copies} cop${item.copies > 1 ? 'ies' : 'y'}</div>
          </div>
          <div style="font-weight:700; color:var(--primary); font-size:0.9rem; flex-shrink:0;">&#8369;${((item.price || 0) * (item.copies || 1)).toFixed(2)}</div>
        </div>
      `).join('') : `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
          <div class="order-detail-item">
            <div class="detail-label">Service</div>
            <div class="detail-value">${order.service || 'N/A'}</div>
          </div>
          <div class="order-detail-item">
            <div class="detail-label">File</div>
            <div class="detail-value"><i class="fas fa-file" style="color:var(--primary);margin-right:0.3rem;"></i>${order.file || 'N/A'}</div>
          </div>
          <div class="order-detail-item">
            <div class="detail-label">Print Type</div>
            <div class="detail-value">${order.printType || 'N/A'}</div>
          </div>
          <div class="order-detail-item">
            <div class="detail-label">Paper Size &amp; Copies</div>
            <div class="detail-value">${order.paperSize || 'N/A'} &middot; ${order.copies || 'N/A'} cop${order.copies > 1 ? 'ies' : 'y'}</div>
          </div>
        </div>
      `}
    </div>

    <!-- Receiving + Payment Row -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.75rem;">
      <div class="order-detail-item">
        <div class="detail-label">Receiving Method</div>
        <div class="detail-value">
          <i class="fas fa-${receivingIcon}" style="color:var(--primary); margin-right:0.4rem;"></i>
          <span style="text-transform:capitalize;">${receiving}</span>
        </div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Payment</div>
        <div class="detail-value">${order.payment || 'N/A'}</div>
      </div>
    </div>

    ${order.notes ? `
    <div style="background:#FFF7ED; border:1px dashed var(--primary); border-radius:10px; padding:0.85rem 1rem; margin-bottom:0.75rem;">
      <div class="detail-label" style="color:var(--primary); margin-bottom:0.25rem;"><i class="fas fa-sticky-note" style="margin-right:0.3rem;"></i>Notes</div>
      <div style="font-size:0.9rem; color:#4B3325; font-style:italic;">${order.notes}</div>
    </div>` : ''}

    <!-- Total Footer -->
    <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem 1.25rem; background:linear-gradient(135deg,#1E293B,#334155); border-radius:12px; margin-top:0.25rem;">
      <div>
        <div style="font-size:0.72rem; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.2rem;">Total Amount</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--primary); letter-spacing:-0.5px;">&#8369;${totalAmt}</div>
      </div>
      <span class="status-badge ${getStatusClass(order.status)}" style="font-size:0.85rem; padding:0.45rem 1.1rem;">${order.status}</span>
    </div>
  `;
  openAdminModal('orderDetailModal');
}

// ===== ORDER STATUS UPDATE =====
function openStatusModal(orderId) {
  const order = ADMIN_ORDERS.find(o => o.id === orderId);
  if (!order) return;
  document.getElementById('statusOrderId').value = orderId;
  document.getElementById('statusSelect').value = order.status;
  openAdminModal('updateStatusModal');
}

function confirmStatusUpdate() {
  const orderId = document.getElementById('statusOrderId').value;
  const newStatus = document.getElementById('statusSelect').value;
  const order = ADMIN_ORDERS.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    // Map status to progress for tracking
    const progressMap = { 'Pending': 0, 'Confirmed': 1, 'Processing': 2, 'Ready': 3, 'Completed': 4 };
    if (progressMap[newStatus] !== undefined) order.progress = progressMap[newStatus];
    
    saveAdminState();
    renderRecentOrders();
    renderAdminOrders();
    updatePendingBadge();
    closeAdminModal('updateStatusModal');
    showAdminToast(`Order ${orderId} status updated to "${newStatus}"`);
  }
}

function updatePendingBadge() {
  const pending = ADMIN_ORDERS.filter(o => o.status === 'Pending').length;
  const badge = document.getElementById('pendingOrdersBadge');
  if (badge) {
    badge.textContent = pending;
    badge.style.display = pending > 0 ? 'inline' : 'none';
  }
}

// ===== VIEW USER DETAIL =====
function viewUserDetail(userId) {
  const user = SAMPLE_USERS.find(u => u.id === userId);
  if (!user) return;

  const content = document.getElementById('viewUserContent');
  content.innerHTML = `
    <div style="text-align:center;margin-bottom:1.5rem;">
      <div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,var(--primary),#6366f1);color:white;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;margin:0 auto 1rem;">
        ${user.name.split(' ').map(n=>n[0]).join('')}
      </div>
      <h3 style="margin-bottom:0.25rem;">${user.name}</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;">${user.email}</p>
      <span class="status-badge ${getStatusClass(user.status)}" style="margin-top:0.5rem;">${user.status}</span>
    </div>
    <div class="order-detail-grid">
      <div class="order-detail-item">
        <div class="detail-label">User ID</div>
        <div class="detail-value">${user.id}</div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Phone No.</div>
        <div class="detail-value">${user.phone || 'N/A'}</div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Joined</div>
        <div class="detail-value">${user.joined}</div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Total Orders</div>
        <div class="detail-value">${user.totalOrders}</div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Total Spent</div>
        <div class="detail-value" style="color:var(--primary);">₱${user.totalSpent.toLocaleString()}</div>
      </div>
      <div class="order-detail-item">
        <div class="detail-label">Last Active</div>
        <div class="detail-value">${user.lastActive}</div>
      </div>
    </div>

    <!-- Transaction History (Partial Display) -->
    <div style="margin-top:1.5rem;">
      <div class="detail-label" style="padding-bottom:0.5rem; border-bottom:1px solid var(--border); margin-bottom:0.75rem; color:var(--text-dark); font-weight:700;">
        <i class="fas fa-history" style="margin-right:0.4rem; color:var(--primary);"></i> Transaction History
      </div>
      <div style="background:var(--secondary-light); border-radius:10px; padding:0.75rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem;">
          <span style="font-weight:600;">${user.lastOrder}</span>
          <span style="color:var(--text-muted);">${user.lastActive}</span>
          <span style="font-weight:700; color:var(--primary);">₱${user.totalSpent.toLocaleString()} spent total</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted);">Total lifecycle orders: ${user.totalOrders}</div>
      </div>
    </div>

    <!-- Activity Log -->
    <div style="margin-top:1.5rem;">
      <div class="detail-label" style="padding-bottom:0.5rem; border-bottom:1px solid var(--border); margin-bottom:0.75rem; color:var(--text-dark); font-weight:700;">
        <i class="fas fa-list-ul" style="margin-right:0.4rem; color:var(--primary);"></i> Activity Logs
      </div>
      <ul style="list-style:none; padding:0; font-size:0.8rem; color:var(--text-muted);">
        <li style="margin-bottom:0.5rem; display:flex; gap:0.5rem;">
          <span style="color:var(--success);"><i class="fas fa-circle" style="font-size:0.5rem;"></i></span>
          <span>Logged in from Chrome (Windows) &middot; ${user.lastActive}</span>
        </li>
        <li style="margin-bottom:0.5rem; display:flex; gap:0.5rem;">
          <span style="color:var(--primary);"><i class="fas fa-circle" style="font-size:0.5rem;"></i></span>
          <span>Viewed Order History &middot; Yesterday</span>
        </li>
        <li style="display:flex; gap:0.5rem;">
          <span style="color:var(--text-muted);"><i class="fas fa-circle" style="font-size:0.5rem;"></i></span>
          <span>Account created &middot; ${user.joined}</span>
        </li>
      </ul>
    </div>
  `;
  openAdminModal('viewUserModal');
}

// ===== TOGGLE USER STATUS =====
function toggleUserStatus(userId) {
  const user = SAMPLE_USERS.find(u => u.id === userId);
  if (!user) return;
  user.status = user.status === 'Active' ? 'Suspended' : 'Active';
  renderAdminUsers();
  showAdminToast(`${user.name} is now ${user.status}`);
}

// ===== DELETE SYSTEM =====
let deleteTarget = { type: '', id: '' };

function confirmDeleteOrder(orderId) {
  deleteTarget = { type: 'order', id: orderId };
  document.getElementById('deleteMessage').textContent = `Are you sure you want to delete order ${orderId}? This action cannot be undone.`;
  openAdminModal('deleteModal');
}

function confirmDeleteUser(userId) {
  const user = SAMPLE_USERS.find(u => u.id === userId);
  deleteTarget = { type: 'user', id: userId };
  document.getElementById('deleteMessage').textContent = `Are you sure you want to delete user "${user?.name || userId}"? This action cannot be undone.`;
  openAdminModal('deleteModal');
}

function confirmDeleteService(index) {
  deleteTarget = { type: 'service', id: index };
  document.getElementById('deleteMessage').textContent = `Are you sure you want to delete "${SAMPLE_SERVICES[index]?.name}"? This action cannot be undone.`;
  openAdminModal('deleteModal');
}

function confirmDelete() {
  const { type, id } = deleteTarget;

  if (type === 'order') {
    const idx = ADMIN_ORDERS.findIndex(o => o.id === id);
    if (idx > -1) {
      ADMIN_ORDERS.splice(idx, 1);
      localStorage.setItem('prnt_orders', JSON.stringify(ADMIN_ORDERS));
      renderRecentOrders();
      renderAdminOrders();
      updateDashboardStats();
      updatePendingBadge();
      showAdminToast(`Order ${id} deleted`, 'error');
    }
  } else if (type === 'user') {
    const idx = SAMPLE_USERS.findIndex(u => u.id === id);
    if (idx > -1) {
      const name = SAMPLE_USERS[idx].name;
      SAMPLE_USERS.splice(idx, 1);
      renderAdminUsers();
      updateDashboardStats();
      showAdminToast(`User "${name}" deleted`, 'error');
    }
  } else if (type === 'service') {
    const name = ADMIN_SERVICES[id]?.name;
    ADMIN_SERVICES.splice(id, 1);
    localStorage.setItem('prnt_services', JSON.stringify(ADMIN_SERVICES));
    renderServiceManagement();
    showAdminToast(`Service "${name}" deleted`, 'error');
  }

  closeAdminModal('deleteModal');
}

// ===== SERVICE MANAGEMENT (ADD/EDIT) =====
function showAddServiceModal() {
  document.getElementById('serviceModalTitle').textContent = 'Add New Service';
  document.getElementById('svcName').value = '';
  document.getElementById('svcPrice').value = '';
  document.getElementById('svcDesc').value = '';
  document.getElementById('svcIcon').value = 'file-alt';
  document.getElementById('svcEditIndex').value = '-1';
  openAdminModal('serviceModal');
}

function editService(index) {
  const service = ADMIN_SERVICES[index];
  if (!service) return;
  document.getElementById('serviceModalTitle').textContent = 'Edit Service';
  document.getElementById('svcName').value = service.name;
  document.getElementById('svcPrice').value = service.price;
  document.getElementById('svcDesc').value = service.desc;
  document.getElementById('svcIcon').value = service.icon;
  document.getElementById('svcEditIndex').value = index;
  openAdminModal('serviceModal');
}

function handleServiceSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('svcName').value;
  const price = document.getElementById('svcPrice').value;
  const desc = document.getElementById('svcDesc').value;
  const icon = document.getElementById('svcIcon').value;
  const editIndex = parseInt(document.getElementById('svcEditIndex').value);

  if (editIndex >= 0) {
    ADMIN_SERVICES[editIndex] = { ...ADMIN_SERVICES[editIndex], name, price, desc, icon };
    showAdminToast(`Service "${name}" updated!`);
  } else {
    ADMIN_SERVICES.unshift({ name, price, desc, icon, active: true });
    showAdminToast(`Service "${name}" added!`);
  }

  localStorage.setItem('prnt_services', JSON.stringify(ADMIN_SERVICES));
  renderServiceManagement();
  closeAdminModal('serviceModal');
}

function renderReports() {
  const tbody = document.getElementById('adminMessagesBody');
  if (!tbody) return;
  renderAdminMessages();
}

// ===== SEARCH / FILTER =====
function filterAdminOrders() {
  renderAdminOrders();
}

function filterAdminUsers() {
  renderAdminUsers();
}

// ===== ANALYTICS LOGIC =====
function renderTopProducts() {
  const period = document.getElementById('topProductsFilter')?.value || 'monthly';
  const tbody = document.getElementById('topProductsBody');
  if (!tbody) return;

  const productData = {
    daily: [
      { name: 'Document Printing', format: 'A4 B&W', units: 12, revenue: 180 },
      { name: 'Photo Printing', format: '4x6 Glossy', units: 8, revenue: 120 },
      { name: 'Tarpaulin', format: '2x3 ft', units: 3, revenue: 720 },
    ],
    weekly: [
      { name: 'Document Printing', format: 'A4, Letter', units: 98, revenue: 2940 },
      { name: 'Tarpaulin', format: 'Custom Size', units: 22, revenue: 6200 },
      { name: 'Photo Printing', format: '4x6, 5x7', units: 74, revenue: 1920 },
      { name: 'Booklet Binding', format: 'A4 Hardbound', units: 11, revenue: 1650 },
    ],
    monthly: [
      { name: 'Document Printing', format: 'A4, Letter', units: 450, revenue: 12500 },
      { name: 'Tarpaulin', format: 'Custom Size', units: 85, revenue: 24500 },
      { name: 'Photo Printing', format: '4x6, 5x7', units: 320, revenue: 8400 },
      { name: 'Booklet Binding', format: 'A4 Hardbound', units: 45, revenue: 6750 },
      { name: 'ID Card Printing', format: 'PVC Standard', units: 120, revenue: 4200 },
    ],
    yearly: [
      { name: 'Document Printing', format: 'Multiple', units: 5400, revenue: 145000 },
      { name: 'Tarpaulin', format: 'Various', units: 1100, revenue: 280000 },
      { name: 'Photo Printing', format: 'All Sizes', units: 3800, revenue: 95000 },
    ]
  };

  const data = productData[period] || productData.monthly;
  tbody.innerHTML = data.map(p => `
    <tr>
      <td style="font-weight:600; color:var(--primary);">${p.name}</td>
      <td><span class="badge-outline">${p.format}</span></td>
      <td>${p.units.toLocaleString()}</td>
      <td style="font-weight:700;">₱${p.revenue.toLocaleString()}</td>
    </tr>
  `).join('');
}

// ===== ADMIN MESSAGES LOGIC =====
const SAMPLE_MESSAGES = [
  { user: 'Juan Dela Cruz', email: 'juan@gmail.com', subject: 'Bulk Order Inquiry', message: 'Hello, I would like to ask if you offer discounts for printing 50+ thesis booklets?', date: 'Mar 24, 2026' },
  { user: 'Maria Clara', email: 'maria@bulsu.edu.ph', subject: 'Feedback', message: 'The quality of the tarpaulin is excellent. Thank you!', date: 'Mar 23, 2026' },
  { user: 'Jose Rizal', email: 'jose@bulsu.edu.ph', subject: 'Delivery Concern', message: 'Can I change my delivery location to Alvarado Hall instead?', date: 'Mar 22, 2026' },
];

function renderAdminMessages() {
  const tbody = document.getElementById('adminMessagesBody');
  if (!tbody) return;

  tbody.innerHTML = SAMPLE_MESSAGES.map((m, i) => `
    <tr>
      <td>${m.user}</td>
      <td>${m.email}</td>
      <td>${m.subject}</td>
      <td style="max-width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${m.message}">${m.message}</td>
      <td>${m.date}</td>
      <td>
        <button class="action-view" title="View Message" onclick="showAdminToast('Message: ${m.message.replace(/'/g, "\\'")}','info')"><i class="fas fa-eye"></i></button>
      </td>
    </tr>
  `).join('');
}

// ===== EXPORT (CSV) =====
function exportData(type) {
  let csv = '';
  let filename = '';

  if (type === 'orders') {
    csv = 'Order ID,Customer,Service,File,Total,Receiving,Status,Date\n';
    ADMIN_ORDERS.forEach(o => {
      const customer = getCustomerName(o);
      const service = o.service || (Array.isArray(o.items) && o.items[0] ? (FORMAT_LABELS[o.items[0].format] || o.items[0].format) : 'N/A');
      const file = o.file || (Array.isArray(o.items) && o.items[0] && o.items[0].file ? o.items[0].file.name : 'N/A');
      const amount = getOrderAmount(o).toFixed(2);
      csv += `"${o.id}","${customer}","${service}","${file}","${amount}","${o.receiving || ''}","${o.status || ''}","${o.date || ''}"\n`;
    });
    filename = 'prnt_orders_export.csv';
  } else if (type === 'users') {
    csv = 'User ID,Name,Contact,Email,Status,Last Active,Last Order,Total Orders,Total Spent\n';
    SAMPLE_USERS.forEach(u => {
      csv += `${u.id},${u.name},${u.phone || ''},${u.email},${u.status},${u.lastActive},${u.lastOrder},${u.totalOrders},${u.totalSpent}\n`;
    });
    filename = 'prnt_users_export.csv';
  } else if (type === 'messages') {
    csv = 'User,Email,Subject,Message,Date\n';
    SAMPLE_MESSAGES.forEach(m => {
      csv += `"${m.user}","${m.email}","${m.subject}","${m.message}","${m.date}"\n`;
    });
    filename = 'prnt_messages_export.csv';
  } else if (type === 'products') {
    csv = 'Service Name,Format,Units Sold,Revenue\n';
    csv += 'Document Printing,"A4, Letter",450,12500\n';
    csv += 'Tarpaulin,"Custom Size",85,24500\n';
    csv += 'Photo Printing,"4x6, 5x7",320,8400\n';
    filename = 'prnt_products_export.csv';
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showAdminToast(`${type.charAt(0).toUpperCase() + type.slice(1)} data exported!`);
}

// ===== REVENUE CHART FILTER =====
function updateRevenueChart() {
  const el = document.getElementById('revenueFilter');
  if (!el) return;
  const filter = el.value;
  const data = MASTER_ANALYTICS_DATA.revenue[filter] || MASTER_ANALYTICS_DATA.revenue.monthly;
  const labels = MASTER_ANALYTICS_DATA.revenue.labels[filter] || MASTER_ANALYTICS_DATA.revenue.labels.monthly;
  drawLineChart('revenueChart', data, 'Revenue', labels);
}

function updateSalesTrendChart() {
  const el = document.getElementById('salesTrendFilter');
  if (!el) return;
  const filter = el.value;
  const data = MASTER_ANALYTICS_DATA.sales[filter] || MASTER_ANALYTICS_DATA.sales.monthly;
  const labels = MASTER_ANALYTICS_DATA.sales.labels[filter] || MASTER_ANALYTICS_DATA.sales.labels.monthly;
  drawLineChart('salesTrendChart', data, 'Sales', labels);
}

// ===== CHART INSTANCES (for Chart.js) =====
let CHART_INSTANCES = {};

function createOrUpdateChart(canvasId, config) {
  if (CHART_INSTANCES[canvasId]) {
    CHART_INSTANCES[canvasId].destroy();
  }
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  CHART_INSTANCES[canvasId] = new Chart(canvas, config);
}

function drawLineChart(canvasId, data, label, labels = []) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(238, 77, 45, 0.2)');
  gradient.addColorStop(1, 'rgba(238, 77, 45, 0)');

  createOrUpdateChart(canvasId, {
    type: 'line',
    data: {
      labels: labels.length > 0 ? labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: label,
        data: data,
        borderColor: '#EE4D2D',
        borderWidth: 3,
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#EE4D2D',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E293B',
          padding: 12,
          displayColors: false,
          callbacks: {
            label: (context) => ` ₱${context.parsed.y.toLocaleString()}`
          }
        },
        datalabels: { display: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F1F5F9' }, border: { display: false } },
        x: { grid: { display: false }, border: { display: false } }
      }
    }
  });
}

function drawBarChart(canvasId, data, label, labels = []) {
  createOrUpdateChart(canvasId, {
    type: 'bar',
    data: {
      labels: labels.length > 0 ? labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        label: label,
        data: data,
        backgroundColor: '#EE4D2D',
        borderRadius: 6,
        barThickness: 20
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E293B',
          padding: 10,
          displayColors: false
        },
        datalabels: { display: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F1F5F9' }, border: { display: false } },
        x: { grid: { display: false }, border: { display: false } }
      }
    }
  });
}

// Register DataLabels globally
Chart.register(ChartDataLabels);

function drawDonutChart(canvasId, data) {
  const labels = ['Document', 'Photo', 'Tarpaulin', 'Others'];
  const colors = ['#EE4D2D', '#FF7043', '#FF8A65', '#FFCCBC'];
  const total = data.reduce((a, b) => a + b, 0);

  createOrUpdateChart(canvasId, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: '#ffffff',
        hoverOffset: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E293B',
          padding: 12,
          callbacks: {
            label: (context) => ` ${context.label}: ${context.parsed} orders`
          }
        },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12, family: 'Outfit' },
          formatter: (value) => {
            const pct = ((value / total) * 100).toFixed(0);
            return pct > 5 ? pct + '%' : '';
          }
        }
      }
    }
  });

  // Sync Custom Legend
  const legendContainer = document.getElementById('pieLegend');
  if (legendContainer) {
    legendContainer.innerHTML = labels.map((label, i) => `
      <div class="legend-item" style="display:flex; align-items:center; cursor:pointer;" onclick="toggleChartSlice('${canvasId}', ${i}, this)">
        <span class="legend-dot" style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${colors[i]}; margin-right:10px;"></span>
        <span style="font-size:0.9rem; color:#475569;">${label}</span>
      </div>
    `).join('');
  }
}

function toggleChartSlice(canvasId, index, el) {
  const chart = CHART_INSTANCES[canvasId];
  if (!chart) return;
  const isVisible = chart.getDataVisibility(index);
  chart.toggleDataVisibility(index);
  chart.update();
  el.style.opacity = isVisible ? '0.5' : '1';
  el.style.textDecoration = isVisible ? 'line-through' : 'none';
}

function drawFeedbackChart(canvasId) {
  createOrUpdateChart(canvasId, {
    type: 'bar',
    indexAxis: 'y',
    data: {
      labels: ['5 ★', '4 ★', '3 ★', '2 ★', '1 ★'],
      datasets: [{
        data: [520, 310, 85, 20, 13],
        backgroundColor: ['#10B981', '#34D399', '#FBBF24', '#F97316', '#EF4444'],
        borderRadius: 6,
        barThickness: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#1E293B', padding: 8 },
        datalabels: { display: false }
      },
      scales: {
        x: { grid: { display: false }, ticks: { display: false }, border: { display: false } },
        y: { grid: { display: false }, border: { display: false } }
      }
    }
  });
}
// ===== RESIZE HANDLER (Redraw charts) =====
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const dashActive = document.getElementById('section-dashboard')?.classList.contains('active');
    const analyticsActive = document.getElementById('section-analytics')?.classList.contains('active');
    const reportsActive = document.getElementById('section-reports')?.classList.contains('active');

    if (dashActive) {
      updateRevenueChart();
      drawDonutChart('donutChart', [42, 25, 18, 15]);
    }
    if (analyticsActive) {
      updateSalesTrendChart();
      renderUsersGrowthChart();
    }
    if (reportsActive) {
      drawFeedbackChart('feedbackChart');
    }
  }, 250);
});

function updateDashboardStats() {
  const totalOrders = MASTER_ANALYTICS_DATA.sales.monthly.reduce((a, b) => a + b, 0);
  const netProfit = MASTER_ANALYTICS_DATA.revenue.monthly.reduce((a, b) => a + b, 0);
  const pendingOrders = ADMIN_ORDERS.filter(o => o.status === 'Pending').length;
  const currentMonthSales = MASTER_ANALYTICS_DATA.sales.monthly[MASTER_ANALYTICS_DATA.sales.monthly.length - 1];

  if (document.getElementById('statTotalOrders')) document.getElementById('statTotalOrders').textContent = totalOrders.toLocaleString();
  if (document.getElementById('statNetProfit')) document.getElementById('statNetProfit').textContent = `₱${netProfit.toLocaleString()}`;
  if (document.getElementById('statPendingOrders')) document.getElementById('statPendingOrders').textContent = pendingOrders;
  if (document.getElementById('statMonthlySales')) document.getElementById('statMonthlySales').textContent = currentMonthSales.toLocaleString();
}

function initDashboardCharts() {
  updateRevenueChart();
  drawDonutChart('donutChart', MASTER_ANALYTICS_DATA.products.monthly);
}

function initAnalyticsCharts() {
  updateSalesTrendChart();
  renderUsersGrowthChart();
}

function renderUsersGrowthChart() {
  const start = currentGrowthQuarter * 3;
  const end = start + 3;
  const data = MASTER_ANALYTICS_DATA.userGrowth.monthly.slice(start, end);
  const labels = MASTER_ANALYTICS_DATA.userGrowth.labels.slice(start, end);
  const qTitle = `Q${currentGrowthQuarter + 1}`;
  
  const titleEl = document.getElementById('userGrowthTitle');
  if (titleEl) titleEl.textContent = `Users Growth (${qTitle})`;
  
  drawBarChart('usersGrowthChart', data, 'Users', labels);
}

function changeUserGrowthQuarter(delta) {
  currentGrowthQuarter += delta;
  if (currentGrowthQuarter < 0) currentGrowthQuarter = 3;
  if (currentGrowthQuarter > 3) currentGrowthQuarter = 0;
  renderUsersGrowthChart();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderRecentOrders();
  renderAdminOrders();
  renderAdminUsers();
  renderAdminMessages();
  renderTopProducts();
  renderServiceManagement();
  renderNotifications();
  updatePendingBadge();
  updateDashboardStats();

  // Initial draw
  setTimeout(() => {
    initDashboardCharts();
  }, 200);
});

// ===== SETTINGS MANAGEMENT =====
function renderAdminSettings() {
  const locs = JSON.parse(localStorage.getItem('prnt_delivery_locs') || 'null') || ["Activity Center", "Alvarado Hall", "Carpio Hall", "College of Law", "E-Library", "Federizo Hall", "Flores Hall", "Mendoza Hall", "Natividad Hall", "Pimentel Hall", "Student Lounge", "Roxas Hall", "Valencia Hall"];
  const pays = JSON.parse(localStorage.getItem('prnt_payments') || 'null') || ["GCash", "PayMaya", "Over the Counter", "Cash on Delivery / Pick-up"];
  
  const locBody = document.getElementById('deliveryLocationsBody');
  if (locBody) {
    locBody.innerHTML = locs.map((loc, i) => `
      <tr>
        <td>${loc}</td>
        <td><button class="action-delete" title="Delete" onclick="deleteDeliveryLocation(${i})"><i class="fas fa-trash"></i></button></td>
      </tr>
    `).join('');
  }

  const payBody = document.getElementById('paymentMethodsBody');
  if (payBody) {
    payBody.innerHTML = pays.map((pm, i) => `
      <tr>
        <td>${pm}</td>
        <td><button class="action-delete" title="Delete" onclick="deletePaymentMethod(${i})"><i class="fas fa-trash"></i></button></td>
      </tr>
    `).join('');
  }
}

function deleteDeliveryLocation(index) {
  const locs = JSON.parse(localStorage.getItem('prnt_delivery_locs') || 'null') || ["Activity Center", "Alvarado Hall", "Carpio Hall", "College of Law", "E-Library", "Federizo Hall", "Flores Hall", "Mendoza Hall", "Natividad Hall", "Pimentel Hall", "Student Lounge", "Roxas Hall", "Valencia Hall"];
  if (confirm(`Remove "${locs[index]}"?`)) {
    locs.splice(index, 1);
    localStorage.setItem('prnt_delivery_locs', JSON.stringify(locs));
    renderAdminSettings();
    showAdminToast('Location removed! Please reload customer site if open.', 'error');
  }
}

function deletePaymentMethod(index) {
  const pays = JSON.parse(localStorage.getItem('prnt_payments') || 'null') || ["GCash", "PayMaya", "Over the Counter", "Cash on Delivery / Pick-up"];
  if (confirm(`Remove "${pays[index]}"?`)) {
    pays.splice(index, 1);
    localStorage.setItem('prnt_payments', JSON.stringify(pays));
    renderAdminSettings();
    showAdminToast('Payment removed! Please reload customer site if open.', 'error');
  }
}

function handleAddLocation(e) {
  e.preventDefault();
  const locs = JSON.parse(localStorage.getItem('prnt_delivery_locs') || 'null') || ["Activity Center", "Alvarado Hall", "Carpio Hall", "College of Law", "E-Library", "Federizo Hall", "Flores Hall", "Mendoza Hall", "Natividad Hall", "Pimentel Hall", "Student Lounge", "Roxas Hall", "Valencia Hall"];
  const val = document.getElementById('newLocationName').value.trim();
  if (val) {
    locs.push(val);
    localStorage.setItem('prnt_delivery_locs', JSON.stringify(locs));
    renderAdminSettings();
    closeAdminModal('addLocationModal');
    document.getElementById('newLocationName').value = '';
    showAdminToast(`Location "${val}" added!`);
  }
}

function handleAddPayment(e) {
  e.preventDefault();
  const pays = JSON.parse(localStorage.getItem('prnt_payments') || 'null') || ["GCash", "PayMaya", "Over the Counter", "Cash on Delivery / Pick-up"];
  const val = document.getElementById('newPaymentName').value.trim();
  if (val) {
    pays.push(val);
    localStorage.setItem('prnt_payments', JSON.stringify(pays));
    renderAdminSettings();
    closeAdminModal('addPaymentModal');
    document.getElementById('newPaymentName').value = '';
    showAdminToast(`Payment Method "${val}" added!`);
  }
}

// ===== MODAL HELPERS =====
function openAdminModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeAdminModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}
