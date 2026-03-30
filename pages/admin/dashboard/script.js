// Admin Dashboard Script
document.addEventListener('DOMContentLoaded', () => {
  // Load Admin Components
  loadComponent('sidebar-placeholder', '../../../components/AdminSidebar/index.html');
  loadComponent('header-placeholder', '../../../components/AdminHeader/index.html');

  // Initialize UI Features
  renderDashboardStats();
  initDashboardCharts();
  renderRecentOrders();
});

function renderDashboardStats() {
  const orders = JSON.parse(localStorage.getItem('prnt_orders') || '[]');
  const sales = orders.reduce((sum, o) => sum + parseFloat(o.total.replace('₱', '')), 0);
  const users = JSON.parse(localStorage.getItem('prnt_all_users') || '[]');

  document.getElementById('dashTotalOrders').textContent = orders.length;
  document.getElementById('dashTotalSales').textContent = `₱${sales.toLocaleString()}`;
  document.getElementById('dashTotalUsers').textContent = users.length + 3892; // Mock + Live
}

function initDashboardCharts() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const datasets = {
    daily: [1200, 1900, 1500, 2100, 1800, 2400, 2800],
    monthly: [12000, 19000, 15000, 21000, 18000, 24000, 28000, 32000, 30000, 35000, 38000, 42000]
  };
  
  // Minimal Canvas Bar Chart drawing logic
  drawDashboardBarChart(ctx, datasets.monthly);
}

function drawDashboardBarChart(ctx, data) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const barWidth = (width / data.length) * 0.7;
  const gap = (width / data.length) * 0.3;
  const max = Math.max(...data);

  ctx.clearRect(0, 0, width, height);
  data.forEach((val, i) => {
    const barHeight = (val / max) * (height - 40);
    ctx.fillStyle = i === data.length - 1 ? '#EE4D2D' : '#F87171';
    ctx.fillRect(i * (barWidth + gap) + gap/2, height - barHeight - 20, barWidth, barHeight);
  });
}

function renderRecentOrders() {
  const orders = JSON.parse(localStorage.getItem('prnt_orders') || '[]');
  const body = document.getElementById('recentOrdersBody');
  if (!body) return;
  
  if (orders.length === 0) {
    body.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No recent orders found.</td></tr>';
    return;
  }

  body.innerHTML = orders.slice(-5).reverse().map(o => `
    <tr>
      <td style="padding:1rem;">${o.id}</td>
      <td style="padding:1rem;">${o.receiving === 'delivery' ? o.location : 'Juan Dela Cruz'}</td>
      <td style="padding:1rem;">${o.items[0].service}</td>
      <td style="padding:1rem; font-weight:700;">${o.total}</td>
      <td style="padding:1rem;"><span class="status-badge" style="background:#FEF3C7; color:#F59E0B; padding:0.4rem 0.8rem; border-radius:50px; font-size:0.8rem;">${o.status.toUpperCase()}</span></td>
      <td style="padding:1rem;"><button style="color:var(--primary); font-weight:600;">View</button></td>
    </tr>
  `).join('');
}

// Sidebar/Header Utilities
function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('active');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function toggleAdminProfileMenu() {
  document.getElementById('adminProfileDropdown').classList.toggle('active');
}
