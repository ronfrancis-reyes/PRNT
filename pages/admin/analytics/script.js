// Admin Analytics Script
document.addEventListener('DOMContentLoaded', () => {
  // Load Admin Components
  loadComponent('sidebar-placeholder', '../../../components/AdminSidebar/index.html');
  loadComponent('header-placeholder', '../../../components/AdminHeader/index.html');

  // Initialize UI features
  initAnalyticsCharts();
});

function initAnalyticsCharts() {
  const ctxTrend = document.getElementById('revenueTrendChart').getContext('2d');
  const data = [12000, 19000, 15000, 25000, 22000, 30000, 35000, 42000];
  drawAnalyticsChart(ctxTrend, data, '#EE4D2D');

  const ctxAcq = document.getElementById('userAcqChart').getContext('2d');
  const dataAcq = [50, 120, 180, 250, 310, 380, 450, 520];
  drawAnalyticsChart(ctxAcq, dataAcq, '#2DC258');
}

function drawAnalyticsChart(ctx, data, color) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const padding = 40;
  const step = (width - padding * 2) / (data.length - 1);
  const max = Math.max(...data);

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';

  data.forEach((val, i) => {
    const x = padding + i * step;
    const y = height - padding - (val / max) * (height - padding * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    // Points
    ctx.fillStyle = color;
    ctx.arc(x, y, 2, 0, Math.PI * 2);
  });
  ctx.stroke();

  // Gradient below line
  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(padding, height - padding);
  ctx.closePath();
  const grd = ctx.createLinearGradient(0, 0, 0, height);
  grd.addColorStop(0, color + '33');
  grd.addColorStop(1, color + '00');
  ctx.fillStyle = grd;
  ctx.fill();
}

function exportAnalytics() {
  alert('Exporting analytics data to CSV...');
  // Logic to export logic could be here
}

function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('active');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function toggleAdminProfileMenu() {
  document.getElementById('adminProfileDropdown').classList.toggle('active');
}
