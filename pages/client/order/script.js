/**
 * PRNT — ORDER MODULE SCRIPT
 * Flow: Upload → Configure → Checkout → Receipt
 */

'use strict';

// ── SAMPLE DATA (FRONTEND TESTING ONLY) ──────────────────────────────────────
// BACKEND INTEGRATION POINT — Replace with API: /api/pricing

const PRICING = {
  photo:        { bw: 20.0, color: 20.0 },
  id_photo:     { bw: 50.0, color: 50.0 },
  document:     { bw: 5.0,  color: 7.0  },
  large_format: { bw: 25.0, color: 25.0 },
  brochure:     { bw: 8.0,  color: 15.0 }
};

const FORMAT_SIZES = {
  photo: [
    { value: '2r', label: '2R (2.5" x 3.5")' },
    { value: '3r', label: '3R (3.5" x 5")'   },
    { value: '4r', label: '4R (4" x 6")'     },
    { value: '5r', label: '5R (5" x 7")'     },
    { value: 'a4', label: 'A4 (8" x 11")'    }
  ],
  id_photo: [
    { value: 'pkg_a', label: 'Package A: 1x1 (12 pcs)' },
    { value: 'pkg_b', label: 'Package B: 2x2 (6 pcs)'  },
    { value: 'pkg_c', label: 'Package C: 1x1 (8) + 2x2 (4)' },
    { value: 'pkg_d', label: 'Package D: Passport Size (6 pcs)' }
  ],
  document: [
    { value: 'short', label: 'Short (8.5×11)' },
    { value: 'long',  label: 'Long (8.5×13)'  },
    { value: 'a4',    label: 'A4'              }
  ],
  large_format: [
    { value: 'tarp',   label: 'Tarpaulin (Standard)'    },
    { value: 'poster', label: 'Matte / Glossy Posters'  },
    { value: 'vinyl',  label: 'Custom Vinyl Banners'    }
  ],
  brochure: [
    { value: 'a4_bifold',  label: 'A4 (Bi-fold)'  },
    { value: 'a4_trifold', label: 'A4 (Tri-fold)' }
  ]
};

const SIZE_MULTIPLIER = {
  '4x6': 1.0, '5x7': 1.5, '8x10': 2.5,
  short:  1.0, long: 1.2,  a4:     1.1,
  a4_sheet: 1.0, per_pc: 0.2
};

const DELIVERY_FEE = 50.0;

// ── STATE MANAGEMENT ──────────────────────────────────────────────────────────

let state = {
  files:            [],
  selectedFileId:   null,
  cart:             [],
  receivingOption:  null,
  deliveryLocation: '',
  paymentMethod:    'Cash on Pick-up/Delivery',
  additionalNotes:  '',
  subtotal:         0,
  deliveryFee:      0,
  total:            0
};

// ── DOM REFERENCES ────────────────────────────────────────────────────────────

const ELEMENTS = {
  uploadArea:         () => document.getElementById('uploadArea'),
  fileInput:          () => document.getElementById('fileInput'),
  fileList:           () => document.getElementById('fileList'),
  fileCountBadge:     () => document.getElementById('fileCountBadge'),
  cartBadge:          () => document.getElementById('cartBadge'),
  orderTableBody:     () => document.getElementById('orderTableBody'),
  priceDisplay:       () => document.getElementById('priceDisplay'),
  checkoutBtn:        () => document.getElementById('checkoutBtn'),
  checkoutValidation: () => document.getElementById('checkoutValidation'),
  addToOrderBtn:      () => document.getElementById('addToOrderBtn'),
  stepper:            () => document.getElementById('stepper')
};

// ── CORE FUNCTIONS / LOGIC ────────────────────────────────────────────────────

function updateStepper() {
  const hasFiles     = state.files.length > 0;
  const hasItems     = state.cart.length > 0;
  const hasReceiving = state.receivingOption !== null;

  const s1    = document.getElementById('step-indicator-1');
  const s2    = document.getElementById('step-indicator-2');
  const s3    = document.getElementById('step-indicator-3');
  const lines = document.querySelectorAll('.step-line');

  if (s1) {
    s1.classList.toggle('active',    !hasFiles);
    s1.classList.toggle('completed',  hasFiles);
  }
  if (s2) {
    s2.classList.toggle('active',    hasFiles && !hasItems);
    s2.classList.toggle('completed', hasItems);
  }
  if (s3) {
    s3.classList.toggle('active',    hasItems);
    s3.classList.toggle('completed', hasItems && hasReceiving);
  }

  if (lines[0]) lines[0].classList.toggle('filled', hasFiles);
  if (lines[1]) lines[1].classList.toggle('filled', hasItems);

  const stepper = ELEMENTS.stepper();
  if (stepper) stepper.setAttribute('aria-valuenow', hasItems ? 3 : hasFiles ? 2 : 1);
}

function updatePrice() {
  const service = document.getElementById('serviceSelect')?.value;
  const type    = document.getElementById('printType')?.value;
  const size    = document.getElementById('paperSize')?.value;
  const pages   = Math.max(1, parseInt(document.getElementById('pages')?.value) || 1);
  const copies  = Math.max(1, parseInt(document.getElementById('copies')?.value) || 1);
  const display = ELEMENTS.priceDisplay();

  if (!service || !size) {
    if (display) display.textContent = 'P0.00';
    return 0;
  }

  const basePrice  = PRICING[service]?.[type] || 0;
  const finalPrice = basePrice * pages * copies;

  if (display) animatePriceDisplay(display, finalPrice);
  return finalPrice;
}

function animatePriceDisplay(el, newValue) {
  el.style.transform = 'scale(1.12)';
  el.style.opacity   = '0.7';
  setTimeout(() => {
    el.textContent     = `P${newValue.toFixed(2)}`;
    el.style.transform = 'scale(1)';
    el.style.opacity   = '1';
  }, 120);
}

function updateTotals() {
  state.subtotal    = state.cart.reduce((sum, item) => sum + item.amount, 0);
  state.deliveryFee = state.receivingOption === 'delivery' ? DELIVERY_FEE : 0;
  state.total       = state.subtotal + state.deliveryFee;
  updateCheckoutUI();
}

function updateCheckoutUI() {
  const fmt   = (n) => `P${n.toFixed(2)}`;
  setText('subtotalVal',    fmt(state.subtotal));
  setText('deliveryFeeVal', fmt(state.deliveryFee));
  setText('totalVal',       fmt(state.total));

  const pickEl = document.getElementById('opt-pick');
  const delEl  = document.getElementById('opt-del');
  const locEl  = document.getElementById('locationField');

  if (pickEl) { pickEl.classList.toggle('active', state.receivingOption === 'pick-up'); pickEl.setAttribute('aria-pressed', state.receivingOption === 'pick-up'); }
  if (delEl)  { delEl.classList.toggle('active',  state.receivingOption === 'delivery'); delEl.setAttribute('aria-pressed', state.receivingOption === 'delivery'); }
  if (locEl)  { locEl.style.display = state.receivingOption === 'delivery' ? 'block' : 'none'; }

  validateCheckout();
}

function updateEditPrice() {
  const service = document.getElementById('editServiceSelect').value;
  const type    = document.getElementById('editPrintType').value;
  const size    = document.getElementById('editPaperSize').value;
  const pages   = Math.max(1, parseInt(document.getElementById('editPages').value) || 1);
  const copies  = Math.max(1, parseInt(document.getElementById('editCopies').value) || 1);
  const display = document.getElementById('editPriceDisplay');

  if (!service || !size) {
    if (display) display.textContent = 'P0.00';
    return 0;
  }

  const basePrice  = PRICING[service]?.[type] || 0;
  const finalPrice = basePrice * pages * copies;

  if (display) display.textContent = `P${finalPrice.toFixed(2)}`;
  return finalPrice;
}

// ── STEP VALIDATION ───────────────────────────────────────────────────────────

function validateSteps() {
  const fileSelected = state.selectedFileId !== null;

  ['serviceSelect', 'printType', 'paperSize', 'pages', 'copies'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = !fileSelected;
  });

  if (fileSelected) {
    const svc = document.getElementById('serviceSelect');
    if (svc && !svc.value) {
      const ps = document.getElementById('paperSize');
      if (ps) ps.disabled = true;
    }
  }

  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.disabled = !fileSelected;
  });

  const hint = document.getElementById('configHint');
  if (hint) hint.classList.toggle('hidden', fileSelected);

  const service   = document.getElementById('serviceSelect');
  const paperSize = document.getElementById('paperSize');
  const addBtn    = ELEMENTS.addToOrderBtn();
  const hasConfig = service && paperSize && service.value !== '' && paperSize.value !== '';
  if (addBtn) addBtn.disabled = !hasConfig;

  updateStepper();
  validateCheckout();
}

function validateCheckout() {
  const checkoutBtn = ELEMENTS.checkoutBtn();
  const validEl     = ELEMENTS.checkoutValidation();

  const hasItems     = state.cart.length > 0;
  const hasReceiving = state.receivingOption !== null;
  const locationOk   = state.receivingOption === 'delivery'
    ? (document.getElementById('deliveryLocation')?.value || '') !== ''
    : true;

  let msg = '';
  if (!hasItems)          msg = '<i class="fas fa-exclamation-circle"></i> Add at least one item to your order.';
  else if (!hasReceiving) msg = '<i class="fas fa-exclamation-circle"></i> Select a receiving option.';
  else if (!locationOk)   msg = '<i class="fas fa-exclamation-circle"></i> Select a delivery location.';

  if (validEl)     validEl.innerHTML = msg;
  if (checkoutBtn) checkoutBtn.disabled = !(hasItems && hasReceiving && locationOk);
}

// ── ACTION HANDLERS ───────────────────────────────────────────────────────────

function handleFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  let added = 0;
  for (const file of files) {
    if (file.size > 50 * 1024 * 1024) {
      showToast(`"${file.name}" is too large (max 50MB)`, 'error');
      continue;
    }
    state.files.push({
      id:   'file-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type
    });
    added++;
  }

  if (added > 0) {
    renderFileList();
    validateSteps();
    saveDraft();
    showToast(`${added} file${added > 1 ? 's' : ''} uploaded successfully`);
  }
  event.target.value = '';
}

function selectFile(id) {
  state.selectedFileId = id;
  renderFileList();
  validateSteps();
  updatePrice();
}

function removeFile(id) {
  state.files = state.files.filter(f => f.id !== id);
  if (state.selectedFileId === id) {
    state.selectedFileId = null;
    const svc = document.getElementById('serviceSelect');
    const ps  = document.getElementById('paperSize');
    if (svc) svc.value = '';
    if (ps)  ps.innerHTML = '<option value="">Select size...</option>';
    const display = ELEMENTS.priceDisplay();
    if (display) display.textContent = 'P0.00';
  }
  renderFileList();
  validateSteps();
  saveDraft();
  showToast('File removed from library', 'info');
}

function handleServiceChange() {
  const service    = document.getElementById('serviceSelect').value;
  const sizeSelect = document.getElementById('paperSize');

  if (!service) {
    sizeSelect.innerHTML = '<option value="">Select size...</option>';
    sizeSelect.disabled  = true;
  } else {
    const sizes = FORMAT_SIZES[service] || [];
    sizeSelect.innerHTML = '<option value="">Select size...</option>' +
      sizes.map(s => `<option value="${s.value}">${s.label}</option>`).join('');
    sizeSelect.disabled = false;
  }

  updatePrice();
  validateSteps();
}

function adjustNumber(fieldId, delta) {
  const input = document.getElementById(fieldId);
  if (!input || input.disabled) return;
  const min     = parseInt(input.min) || 1;
  const current = parseInt(input.value);
  const newVal  = Math.max(min, (isNaN(current) ? 0 : current) + delta);
  input.value   = newVal;
  updatePrice();
}

function addToOrder() {
  const service = document.getElementById('serviceSelect').value;
  const type    = document.getElementById('printType').value;
  const size    = document.getElementById('paperSize').value;
  const pages   = Math.max(1, parseInt(document.getElementById('pages').value) || 1);
  const copies  = Math.max(1, parseInt(document.getElementById('copies').value) || 1);
  const file    = state.files.find(f => f.id === state.selectedFileId);

  if (!file || !service || !size) return;

  const totalAmount = updatePrice();

  const serviceLabel = { photo: 'Photo Printing', id_photo: 'ID Photo Packages', document: 'Document Printing', large_format: 'Large Format', brochure: 'Brochures' }[service] || service;
  const sizeLabel    = FORMAT_SIZES[service]?.find(s => s.value === size)?.label || size;
  const typeLabel    = type === 'bw' ? 'B&W' : 'Color';

  state.cart.push({
    id:         Date.now(),
    fileName:   file.name,
    fileId:     file.id,
    serviceRaw: service,
    sizeRaw:    size,
    typeRaw:    type,
    pages:      pages,
    copies:     copies,
    service:    serviceLabel,
    format:     `${sizeLabel} · ${typeLabel}`,
    qty:        `${pages}p × ${copies}c`,
    amount:     totalAmount
  });

  const btn = ELEMENTS.addToOrderBtn();
  if (btn) {
    createRipple(btn);
    btn.classList.add('btn-added');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
      btn.classList.remove('btn-added');
      btn.innerHTML = orig;
    }, 600);
  }

  state.selectedFileId = null;
  document.getElementById('serviceSelect').value = '';
  document.getElementById('paperSize').innerHTML = '<option value="">Select size...</option>';
  document.getElementById('pages').value  = 1;
  document.getElementById('copies').value = 1;

  renderFileList();
  renderCart();
  validateSteps();
  saveDraft();
  showToast('Item added to order summary');
}

function confirmRemoveFromCart(index) {
  document.getElementById('deleteItemIndex').value = index;
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
}

function executeDelete() {
  const index = document.getElementById('deleteItemIndex').value;
  if (index !== '') {
    removeFromCart(parseInt(index));
  }
  closeDeleteModal();
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  renderCart();
  validateSteps();
  saveDraft();
  showToast('Item removed from order', 'error');
}

function setReceiving(type) {
  state.receivingOption = type;
  if (type === 'pick-up') {
    state.deliveryLocation = '';
    const locSel = document.getElementById('deliveryLocation');
    if (locSel) locSel.value = '';
  }
  updateTotals();
  saveDraft();
}

function openEditModal(index) {
  const item = state.cart[index];
  if (!item) return;

  document.getElementById('editItemIndex').value    = index;
  document.getElementById('editFileName').textContent = item.fileName;

  const svcSel   = document.getElementById('editServiceSelect');
  const typeSel  = document.getElementById('editPrintType');
  const pagesIn  = document.getElementById('editPages');
  const copiesIn = document.getElementById('editCopies');

  svcSel.value = item.serviceRaw || 'document';
  handleEditServiceChange();

  const sizeSel = document.getElementById('editPaperSize');
  sizeSel.value  = item.sizeRaw || 'short';
  typeSel.value  = item.typeRaw || 'bw';

  pagesIn.value  = item.pages  || (item.qty ? parseInt(item.qty.split('p')[0]) : 1);
  copiesIn.value = item.copies || (item.qty ? parseInt(item.qty.split('×')[1].trim().replace('c', '')) : 1);

  updateEditPrice();
  document.getElementById('editItemModal').style.display = 'flex';
}

function handleEditServiceChange() {
  const service    = document.getElementById('editServiceSelect').value;
  const sizeSelect = document.getElementById('editPaperSize');

  if (!service) {
    sizeSelect.innerHTML = '<option value="">Select size...</option>';
  } else {
    const sizes = FORMAT_SIZES[service] || [];
    sizeSelect.innerHTML = '<option value="">Select size...</option>' +
      sizes.map(s => `<option value="${s.value}">${s.label}</option>`).join('');
  }
  updateEditPrice();
}

function adjustEditNumber(fieldId, delta) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  const min     = parseInt(input.min) || 1;
  const current = parseInt(input.value);
  const newVal  = Math.max(min, (isNaN(current) ? 0 : current) + delta);
  input.value   = newVal;
  updateEditPrice();
}

function closeEditModal() {
  document.getElementById('editItemModal').style.display = 'none';
}

function saveEditItem() {
  const index = document.getElementById('editItemIndex').value;
  if (index === '') return;
  const item = state.cart[index];
  if (!item) return;

  const service = document.getElementById('editServiceSelect').value;
  const type    = document.getElementById('editPrintType').value;
  const size    = document.getElementById('editPaperSize').value;
  const pages   = Math.max(1, parseInt(document.getElementById('editPages').value) || 1);
  const copies  = Math.max(1, parseInt(document.getElementById('editCopies').value) || 1);

  if (!service || !size) {
    showToast('Please select service and size.', 'error');
    return;
  }

  const totalAmount  = updateEditPrice();
  const serviceLabel = { photo: 'Photo Printing', id_photo: 'ID Photo Packages', document: 'Document Printing', large_format: 'Large Format', brochure: 'Brochures' }[service] || service;
  const sizeLabel    = FORMAT_SIZES[service]?.find(s => s.value === size)?.label || size;
  const typeLabel    = type === 'bw' ? 'B&W' : 'Color';

  item.serviceRaw = service;
  item.typeRaw    = type;
  item.sizeRaw    = size;
  item.pages      = pages;
  item.copies     = copies;
  item.service    = serviceLabel;
  item.format     = `${sizeLabel} · ${typeLabel}`;
  item.amount     = totalAmount;
  item.qty        = `${pages}p × ${copies}c`;

  renderCart();
  updateTotals();
  saveDraft();
  closeEditModal();
  showToast('Order item updated successfully', 'success');
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function proceedToReceipt() {
  document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').style.display = 'none';
}

// ── BACKEND INTEGRATION POINT ─────────────────────────────────────────────────
// Replace with: POST /api/orders/create

function executeCheckout() {
  state.paymentMethod    = document.getElementById('paymentMethod')?.value || '';
  state.additionalNotes  = document.getElementById('additionalNotes')?.value || '';
  state.deliveryLocation = document.getElementById('deliveryLocation')?.value || '';
  state.orderDate        = new Date().toLocaleString();
  state.orderId          = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  saveDraft();
  window.location.href = '../receipt/index.php';
}

// ── BACKEND INTEGRATION POINT ─────────────────────────────────────────────────
// Replace localStorage with: POST /api/orders/draft

function saveDraft() {
  try {
    localStorage.setItem('prnt_order_draft', JSON.stringify(state));
  } catch (e) {
    console.warn('Draft save failed:', e);
  }
}

function loadDraft() {
  try {
    const saved = localStorage.getItem('prnt_order_draft');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        state = { ...state, ...parsed };
        renderFileList();
        renderCart();
        updateCheckoutUI();
      }
    }
  } catch (e) {
    console.error('Error loading draft:', e);
  }
}

// ── UI UTILITIES ──────────────────────────────────────────────────────────────

function renderFileList() {
  const list       = ELEMENTS.fileList();
  const countBadge = ELEMENTS.fileCountBadge();
  if (!list) return;

  if (countBadge) countBadge.textContent = state.files.length;

  if (state.files.length === 0) {
    list.innerHTML = `
      <div class="empty-library" id="emptyLibrary">
        <i class="fas fa-folder-open"></i>
        <p>No files yet. Upload to begin.</p>
      </div>`;
    return;
  }

  list.innerHTML = state.files.map(file => {
    const isSelected = state.selectedFileId === file.id;
    const icon       = getFileIcon(file.name);
    const typeKey    = getFileTypeKey(file.name);
    return `
      <div class="file-item ${isSelected ? 'selected' : ''}"
           data-type="${typeKey}"
           onclick="selectFile('${file.id}')"
           role="option"
           aria-selected="${isSelected}"
           tabindex="0"
           onkeydown="if(event.key==='Enter')selectFile('${file.id}')">
        <div class="file-item-info">
          <i class="${icon} file-item-icon"></i>
          <div class="file-item-meta">
            <div class="file-item-name" title="${escHtml(file.name)}">${escHtml(file.name)}</div>
            <div class="file-item-size">${file.size}</div>
          </div>
        </div>
        <button class="btn-action"
                onclick="event.stopPropagation(); removeFile('${file.id}')"
                aria-label="Remove ${escHtml(file.name)}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>`;
  }).join('');
}

function renderCart() {
  const tbody = ELEMENTS.orderTableBody();
  const badge = ELEMENTS.cartBadge();
  if (!tbody) return;

  if (badge) badge.textContent = state.cart.length;

  if (state.cart.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>No items added yet — configure a file and click "Add to Order".</p>
        </td>
      </tr>`;
  } else {
    tbody.innerHTML = state.cart.map((item, i) => `
      <tr>
        <td style="font-weight:700; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escHtml(item.fileName)}">${escHtml(item.fileName)}</td>
        <td><span class="service-badge">${escHtml(item.service)}</span></td>
        <td style="color:var(--text-muted); font-size:0.83rem;">${escHtml(item.format)}</td>
        <td style="font-weight:600;">${item.pages || (item.qty ? item.qty.split('p')[0] : 1)}</td>
        <td style="font-weight:600;">${item.copies || (item.qty ? item.qty.split('×')[1].trim().replace('c', '') : 1)}</td>
        <td style="font-weight:900; color:var(--primary);">P${item.amount.toFixed(2)}</td>
        <td style="white-space:nowrap; text-align: center;">
          <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
            <button class="btn-action" onclick="openEditModal(${i})" aria-label="Edit item ${i + 1}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action" onclick="confirmRemoveFromCart(${i})" aria-label="Remove item ${i + 1}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      </tr>`).join('');
  }
  updateTotals();
}

function getFileTypeKey(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'img';
  if (['pdf'].includes(ext))                                return 'pdf';
  if (['doc', 'docx'].includes(ext))                       return 'doc';
  return 'other';
}

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'fas fa-file-image';
  if (['pdf'].includes(ext))                                return 'fas fa-file-pdf';
  if (['doc', 'docx'].includes(ext))                       return 'fas fa-file-word';
  return 'fas fa-file-alt';
}

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

function createRipple(btn) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(btn.offsetWidth, btn.offsetHeight);
  ripple.style.width  = ripple.style.height = size + 'px';
  ripple.style.left   = ((btn.offsetWidth  - size) / 2) + 'px';
  ripple.style.top    = ((btn.offsetHeight - size) / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const iconMap    = { success: 'fa-check', error: 'fa-exclamation', info: 'fa-info' };
  const colorMap   = { success: '#10B981',  error: '#EF4444',         info: '#3B82F6' };
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

// ── INITIALIZATION ────────────────────────────────────────────────────────────

// ── EVENT LISTENERS ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const area = ELEMENTS.uploadArea();
  if (area) {
    area.addEventListener('dragover',  (e) => { e.preventDefault(); area.classList.add('drag-over'); });
    area.addEventListener('dragleave', (e) => { if (!area.contains(e.relatedTarget)) area.classList.remove('drag-over'); });
    area.addEventListener('drop',      (e) => { e.preventDefault(); area.classList.remove('drag-over'); handleFileUpload({ target: { files: e.dataTransfer.files } }); });
    area.addEventListener('click',     () => ELEMENTS.fileInput()?.click());
    area.addEventListener('keydown',   (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ELEMENTS.fileInput()?.click(); } });
  }

  loadDraft();
  updateStepper();
  renderCart();
  validateCheckout();
});
