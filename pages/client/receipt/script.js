/**
 * PRNT — RECEIPT MODULE SCRIPT
 * Reads order data from storage, populates the receipt UI.
 * On confirm: moves data to confirmed storage and navigates to tracking.
 */

'use strict';

// ── SAMPLE DATA (FRONTEND TESTING ONLY) ──────────────────────────────────────
// BACKEND INTEGRATION POINT — Replace with: GET /api/user/profile

const SAMPLE_CUSTOMER_NAME  = 'Juan Dela Cruz';
const SAMPLE_CUSTOMER_PHONE = '0912-345-6789';

// ── STATE MANAGEMENT ──────────────────────────────────────────────────────────

let state = {
  order: null
};

// ── DOM REFERENCES ────────────────────────────────────────────────────────────

const ELEMENTS = {
  receiptCard:  () => document.getElementById('receiptCard'),
  itemList:     () => document.getElementById('itemList'),
  confirmBtn:   () => document.getElementById('confirmBtn'),
  backBtn:      () => document.getElementById('backBtn'),
  confirmModal: () => document.getElementById('confirmModal')
};

// ── UI UTILITIES ──────────────────────────────────────────────────────────────

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap    = { success: 'fa-check',      error: 'fa-exclamation', info: 'fa-info' };
  const colorMap   = { success: '#10B981',        error: '#EF4444',        info: '#3B82F6' };
  const toastColor = colorMap[type] || colorMap.success;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.style.setProperty('--toast-color', toastColor);

  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${iconMap[type] || iconMap.success}"></i></div>
    <span style="line-height:1.4;">${escHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── CORE FUNCTIONS / LOGIC ────────────────────────────────────────────────────

function populateReceipt(order, viewConfirmed) {
  if (viewConfirmed) {
    const confirmBtn = ELEMENTS.confirmBtn();
    const backBtn    = ELEMENTS.backBtn();
    if (confirmBtn) {
      confirmBtn.innerHTML    = 'Back to Tracking <i class="fas fa-route"></i>';
      confirmBtn.onclick      = () => { window.location.href = '../tracking/index.php'; };
      confirmBtn.style.gridColumn = '1 / -1';
    }
    if (backBtn) backBtn.style.display = 'none';
  }

  setText('orderId',    `Order Receipt: ${order.orderId || 'ORD-XXXXXX'}`);
  setText('orderStatus', order.status || 'Pending');
  if (order.orderDate) {
    setText('orderDate',  order.orderDate);
    setText('orderDate2', order.orderDate);
  }

  setText('custName',  order.customerName  || SAMPLE_CUSTOMER_NAME);
  setText('custPhone', order.customerPhone || SAMPLE_CUSTOMER_PHONE);
  setText('recvMethod', order.receivingOption === 'delivery' ? 'Delivery' : 'Pick-up');
  setText('recvLoc',   order.deliveryLocation || (order.receivingOption === 'delivery' ? 'Activity Center' : 'BSU Hub'));
  setText('payMethod', order.paymentMethod || '—');

  const itemList = ELEMENTS.itemList();
  if (itemList && order.cart && order.cart.length > 0) {
    itemList.innerHTML = order.cart.map(item => `
      <div class="item-row">
        <div class="item-main">
          <div class="item-name">${escHtml(item.fileName)}</div>
          <div class="item-meta">${escHtml(item.service)} &middot; ${escHtml(item.format)} &middot; ${escHtml(item.qty)}</div>
        </div>
        <div class="item-amount">P${item.amount.toFixed(2)}</div>
      </div>`).join('');
  }

  if (order.additionalNotes && order.additionalNotes.trim() !== '') {
    setText('orderNotes', order.additionalNotes);
  } else {
    setText('orderNotes', 'No additional notes.');
  }

  setText('subtotalVal', `P${(order.subtotal    || 0).toFixed(2)}`);
  setText('deliveryVal', `P${(order.deliveryFee || 0).toFixed(2)}`);
  setText('totalVal',    `P${(order.total       || 0).toFixed(2)}`);

  const card = ELEMENTS.receiptCard();
  if (card) {
    setTimeout(() => card.classList.add('receipt-visible'), 100);
  }
}

// ── ACTION HANDLERS ───────────────────────────────────────────────────────────

function confirmOrder() {
  const modal = ELEMENTS.confirmModal();
  if (modal) modal.style.display = 'flex';
}

function closeConfirmModal() {
  const modal = ELEMENTS.confirmModal();
  if (modal) modal.style.display = 'none';
}

// ── BACKEND INTEGRATION POINT ─────────────────────────────────────────────────
// Replace localStorage write with: POST /api/orders/confirm

function executeConfirmOrder() {
  closeConfirmModal();

  const saved = localStorage.getItem('prnt_order_draft');
  if (!saved) return;

  const order    = JSON.parse(saved);
  order.status   = 'Pending';
  order.progress = 0;

  localStorage.setItem('prnt_order_confirmed', JSON.stringify(order));
  localStorage.removeItem('prnt_order_draft');

  showToast('Order confirmed! Redirecting to tracking...', 'info');
  setTimeout(() => { window.location.href = '../tracking/index.php'; }, 1500);
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function goBack() {
  window.location.href = '../order/index.php';
}

// ── BACKEND INTEGRATION POINT ─────────────────────────────────────────────────
// Replace localStorage read with: GET /api/orders/draft or GET /api/orders/:id

function renderReceipt() {
  const urlParams     = new URLSearchParams(window.location.search);
  const viewConfirmed = urlParams.get('view') === 'confirmed';

  let saved = localStorage.getItem('prnt_order_draft');
  if (viewConfirmed || !saved) {
    saved = localStorage.getItem('prnt_order_confirmed');
  }

  if (!saved) {
    showToast('No order record found.', 'error');
    setTimeout(() => { window.location.href = '../order/index.php'; }, 2000);
    return;
  }

  const order = JSON.parse(saved);
  populateReceipt(order, viewConfirmed);
}

// ── INITIALIZATION ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderReceipt();
});
