/**
 * PRNT — TRACKING MODULE SCRIPT
 * ─────────────────────────────────────────────────────────────────────────────
 * Timeline status: Pending -> Processing -> Delivering -> Completed
 * Includes animated progress bar logic and refresh simulation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

// ===============================
// SAMPLE DATA (FRONTEND TESTING ONLY)
// ===============================

// SAMPLE DATA
// BACKEND INTEGRATION POINT
const STATUS_STEPS = ['pending', 'processing', 'delivering', 'completed'];

// SAMPLE DATA
// BACKEND INTEGRATION POINT
const SAMPLE_TIMESTAMPS = {
  pending:    '10:33 AM',
  processing: '10:45 AM',
  delivering: '11:15 AM',
  completed:  '11:40 AM'
};

// ===============================
// STATE MANAGEMENT
// ===============================

// STATE MANAGEMENT
let state = {
  currentOrder: null
};

// ===============================
// DOM REFERENCES
// ===============================
const ELEMENTS = {
  statusBadge:   () => document.getElementById('statusBadge'),
  progressFill:  () => document.getElementById('progressFill'),
  progressPct:   () => document.getElementById('progressPct'),
  refreshIcon:   () => document.getElementById('refreshIcon'),
  timelineContainer: () => document.querySelector('.timeline-container')
};

// ===============================
// CORE FUNCTIONS / LOGIC
// ===============================

function populateTracking(order) {
  setText('orderId',      order.orderId || 'ORD-XXXXXX');
  setText('statusBadge',  order.status  || 'Pending');
  setText('itemCount',    `${order.cart ? order.cart.length : 0} Item(s)`);
  setText('totalAmount',  `P${(order.total || 0).toFixed(2)}`);

  const badgeEl = ELEMENTS.statusBadge();
  if (badgeEl) {
    const s = (order.status || 'Pending').toLowerCase();
    badgeEl.className = `status-badge status-${s}`;
  }

  updateTimeline((order.status || 'Pending').toLowerCase());
}

function updateTimeline(currentStatus) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);
  const totalSteps   = STATUS_STEPS.length;
  const safeIndex    = currentIndex === -1 ? 0 : currentIndex;

  STATUS_STEPS.forEach((step, index) => {
    const stepEl = document.getElementById(`step-${step}`);
    const timeEl = document.getElementById(`time-${step}`);
    if (!stepEl) return;

    stepEl.classList.remove('completed', 'current');

    if (index < safeIndex) {
      stepEl.classList.add('completed');
      if (timeEl) timeEl.textContent = SAMPLE_TIMESTAMPS[step] || 'Done';
    } else if (index === safeIndex) {
      stepEl.classList.add('current');
      if (timeEl) timeEl.textContent = 'In Progress...';
    } else {
      if (timeEl) timeEl.textContent = '—';
    }
  });

  updateProgressBar(safeIndex, totalSteps);
  updateTimelineFill(safeIndex, totalSteps);
}

function updateProgressBar(currentIndex, totalSteps) {
  let pct = 0;
  if (currentIndex === totalSteps - 1) {
    pct = 100;
  } else {
    pct = Math.round((currentIndex / (totalSteps - 1)) * 90) + 10;
  }

  const fillEl = ELEMENTS.progressFill();
  const txtEl  = ELEMENTS.progressPct();

  if (fillEl) fillEl.style.width = `${pct}%`;
  if (txtEl) {
    const currentPct = parseInt(txtEl.textContent) || 0;
    animateValue(txtEl, currentPct, pct, 600, '%');
  }
}

function updateTimelineFill(currentIndex, totalSteps) {
  const gaps = totalSteps - 1;
  const pct  = (currentIndex / gaps) * 100;
  const container = ELEMENTS.timelineContainer();
  if (container) {
    container.style.setProperty('--timeline-fill', `${pct}%`);
  }
}

function animateValue(obj, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ===============================
// ACTION HANDLER
// ===============================

// ACTION HANDLER
// BACKEND INTEGRATION POINT
function handleRefresh() {
  const icon = ELEMENTS.refreshIcon();
  if (icon) {
    icon.classList.remove('spinning');
    void icon.offsetWidth;
    icon.classList.add('spinning');
  }

  setTimeout(() => {
    renderTracking();
    showToast('Status up to date', 'info');
  }, 600);
}

// ===============================
// NAVIGATION
// ===============================

// NAVIGATION
function viewReceipt() {
  window.location.href = '../receipt/index.php?view=confirmed';
}

// ===============================
// BACKEND INTEGRATION POINTS
// ===============================

// STORAGE: localStorage
// BACKEND INTEGRATION POINT
function renderTracking() {
  const saved = localStorage.getItem('prnt_order_confirmed');
  if (!saved) {
    showToast('No active order found. Redirecting...', 'error');
    setTimeout(() => { window.location.href = '../order/index.php'; }, 2000);
    return;
  }
  const order = JSON.parse(saved);
  populateTracking(order);
}

// ===============================
// INITIALIZATION
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  renderTracking();
});

// ===============================
// UI UTILITIES
// ===============================

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap  = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const colorMap = { success: '#FF6B00', error: '#EF4444', info: '#3B82F6' };

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<i class="fas ${iconMap[type] || iconMap.success}" style="color:${colorMap[type]};"></i> ${escHtml(message)}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity    = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
