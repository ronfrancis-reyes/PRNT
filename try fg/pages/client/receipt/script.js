// Receipt Page Specific Script
document.addEventListener('DOMContentLoaded', () => {
  // Load Global Components
  loadComponent('navbar-placeholder', '../../../components/Navbar/index.html');
  loadComponent('footer-placeholder', '../../../components/Footer/index.html');

  // Load Order Data
  const orderData = JSON.parse(sessionStorage.getItem('prnt_pending_order'));
  if (!orderData) {
    window.location.href = '/pages/client/service-avail/';
    return;
  }

  // Populate UI
  document.getElementById('receiptItems').innerHTML = orderData.items.map(item => `
    <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; border-bottom:1px solid #f8f8f8; padding-bottom:0.75rem;">
      <div>
        <div style="font-weight:700; color:var(--text-dark);">${item.fileName}</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">${item.service} · ${item.details} · ${item.copies}x</div>
      </div>
      <div style="font-weight:800; color:var(--text-dark);">₱${item.amount.toFixed(2)}</div>
    </div>
  `).join('');

  document.getElementById('receiptReceiving').textContent = orderData.receiving === 'delivery' ? 'Delivery' : 'Pick-up';
  document.getElementById('receiptLocation').textContent = orderData.location;
  document.getElementById('receiptPayment').textContent = orderData.payment;
  document.getElementById('receiptTotal').textContent = orderData.total;

  if (orderData.notes) {
    document.getElementById('remarksSection').style.display = 'block';
    document.getElementById('receiptNotes').textContent = orderData.notes;
  }
});

function submitFinalOrder() {
  const orderData = JSON.parse(sessionStorage.getItem('prnt_pending_order'));
  if (!orderData) return;

  // Final Order Logic
  const orderId = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  const finalOrder = {
    ...orderData,
    id: orderId,
    date: new Date().toLocaleDateString(),
    status: 'pending',
    timestamp: Date.now()
  };

  // Push to localStorage
  const existingOrders = JSON.parse(localStorage.getItem('prnt_orders') || '[]');
  existingOrders.push(finalOrder);
  localStorage.setItem('prnt_orders', JSON.stringify(existingOrders));

  // Show Success Alert (Modern Alert simulation)
  alert(`Thank you! Your order ${orderId} has been successfully placed.`);
  
  // Clear Session Data
  sessionStorage.removeItem('prnt_pending_order');

  // Redirect to Tracking or Root
  window.location.href = '/'; // Or tracking if and when implemented
}
