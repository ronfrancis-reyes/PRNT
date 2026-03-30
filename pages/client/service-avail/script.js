/**
 * SERVICE AVAILABILITY PAGE SCRIPT — PRNT
 * Single Source of Truth: Canonical ordering flow.
 * All links to /order.html redirect here.
 * Pricing and sizing synced with app.js PRICING/FORMAT_SIZES.
 */

// ===== PRICING (matches app.js) =====
const PRICING = {
  document: { bw: 3, color: 8 },
  photo:    { bw: 10, color: 15 },
  tarpaulin:{ bw: 80, color: 120 },
  id_card:  { bw: 25, color: 35 },
  booklet:  { bw: 50, color: 75 },
  sticker:  { bw: 15, color: 25 },
};

const FORMAT_SIZES = {
  document:  [ { value: 'a4', label: 'A4 (Standard)' }, { value: 'letter', label: 'Letter (Short)' }, { value: 'legal', label: 'Legal (Long)' } ],
  tarpaulin: [ { value: 'a3', label: 'A3 Size' }, { value: 'a2', label: 'A2 Size' }, { value: 'custom', label: 'Custom Size (Specify)' } ],
  photo:     [ { value: '4x6', label: '4×6' }, { value: '5x7', label: '5×7' }, { value: '8x10', label: '8×10' } ],
  id_card:   [ { value: 'cr80', label: 'CR80 (Standard ID)' }, { value: 'business', label: 'Business Card' } ],
  booklet:   [ { value: 'a4', label: 'A4' }, { value: 'letter', label: 'Letter' }, { value: 'a5', label: 'A5' } ],
  sticker:   [ { value: 'a4', label: 'A4 Sheet' }, { value: 'custom', label: 'Custom Size' } ],
};

const SIZE_MULTIPLIER = {
  a4: 1, letter: 1, a3: 1.5, a2: 2.5, legal: 1.2,
  '4x6': 0.8, '5x7': 1, '8x10': 1.5, custom: 2,
  cr80: 1, business: 1, a5: 0.8
};

// ===== STATE =====
let currentFiles = [];
let selectedFileId = null;
let selectedReceiving = 'pickup';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-placeholder', '../../../components/Navbar/index.html');
  loadComponent('footer-placeholder', '../../../components/Footer/index.html');
  populateDropdowns();
});

function populateDropdowns() {
  const locations = JSON.parse(localStorage.getItem('prnt_delivery_locs') || 'null') || [
    'Activity Center', 'Alvarado Hall', 'Carpio Hall', 'College of Law',
    'E-Library', 'Federizo Hall', 'Flores Hall', 'Mendoza Hall',
    'Natividad Hall', 'Pimentel Hall', 'Student Lounge', 'Roxas Hall', 'Valencia Hall'
  ];
  const payments = JSON.parse(localStorage.getItem('prnt_payments') || 'null') || [
    'GCash', 'PayMaya', 'Over the Counter', 'Cash on Delivery / Pick-up'
  ];

  const locSelect = document.getElementById('deliveryLocation');
  if (locSelect) {
    locSelect.innerHTML = locations.map(l => `<option value="${l}">${l}</option>`).join('');
  }

  const paySelect = document.getElementById('paymentMethod');
  if (paySelect) {
    paySelect.innerHTML = payments.map(p => `<option value="${p}">${p}</option>`).join('');
  }
}

// ===== FILE HANDLING =====
function handleFileUpload(e) {
  for (let file of e.target.files) {
    if (!currentFiles.find(f => f.name === file.name && f.size === file.size)) {
      currentFiles.push({
        id: 'FILE-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        rawFile: file
      });
    }
  }
  renderFiles();
}

function renderFiles() {
  const list = document.getElementById('fileList');
  if (!list) return;
  if (currentFiles.length === 0) {
    list.innerHTML = '<p style="color:#94A3B8; font-size:0.9rem; text-align:center;">No files uploaded yet.</p>';
    return;
  }
  list.innerHTML = currentFiles.map(f => `
    <div class="card" style="margin-bottom:0.75rem; padding:0.9rem 1rem; display:flex; align-items:center; gap:1rem; cursor:pointer; border: 2px solid ${selectedFileId === f.id ? 'var(--primary)' : 'var(--border)'}; transition:border 0.2s;" onclick="selectFileForConfig('${f.id}')">
      <i class="fas fa-file-alt" style="color:var(--primary); font-size:1.4rem;"></i>
      <div style="flex:1; min-width:0;">
        <div style="font-weight:600; font-size:0.88rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${f.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${f.size}</div>
      </div>
      <button onclick="removeFile('${f.id}'); event.stopPropagation();" style="background:none; border:none; color:#EF4444; cursor:pointer; padding:0.25rem;"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');
}

function removeFile(id) {
  currentFiles = currentFiles.filter(f => f.id !== id);
  if (selectedFileId === id) {
    selectedFileId = null;
    const preview = document.getElementById('filePreview');
    if (preview) preview.style.display = 'none';
  }
  renderFiles();
}

function selectFileForConfig(id) {
  selectedFileId = id;
  const file = currentFiles.find(f => f.id === id);
  const preview = document.getElementById('filePreview');
  if (preview) {
    preview.style.display = 'block';
    document.getElementById('previewFileName').textContent = file.name;
    document.getElementById('previewFileSize').textContent = file.size;
  }
  renderFiles(); // re-render to update highlight
  document.getElementById('configStep')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== CONFIGURATION =====
function handleFormatChange() {
  const format = document.getElementById('serviceFormat').value;
  const paperSelect = document.getElementById('paperSize');
  paperSelect.innerHTML = '';

  const sizes = FORMAT_SIZES[format] || [];
  if (sizes.length === 0) {
    paperSelect.innerHTML = '<option value="">N/A for this service</option>';
  } else {
    sizes.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.value;
      opt.textContent = s.label;
      paperSelect.appendChild(opt);
    });
  }

  // Show/hide custom size input
  handleSizeChange();
  updatePrice();
}

function handleSizeChange() {
  const size = document.getElementById('paperSize').value;
  const customInput = document.getElementById('customSizeInput');
  if (customInput) customInput.style.display = size === 'custom' ? 'block' : 'none';
  updatePrice();
}

function updatePrice() {
  const format = document.getElementById('serviceFormat').value;
  const copies = parseInt(document.getElementById('copies').value) || 1;
  const printType = document.getElementById('printType').value;
  const size = document.getElementById('paperSize').value;

  if (!format || !PRICING[format]) {
    document.getElementById('priceDisplay').textContent = '₱0.00';
    return;
  }

  const basePrice = PRICING[format][printType] || PRICING[format].bw;
  const multiplier = SIZE_MULTIPLIER[size] || 1;
  const total = basePrice * multiplier * copies;
  document.getElementById('priceDisplay').textContent = `₱${total.toFixed(2)}`;
}

// ===== CART =====
function addToCart() {
  if (!selectedFileId) {
    alert('Please select a file from your library first.');
    return;
  }

  const file = currentFiles.find(f => f.id === selectedFileId);
  const formatEl = document.getElementById('serviceFormat');
  const sizeEl = document.getElementById('paperSize');
  const typeEl = document.getElementById('printType');
  const copiesEl = document.getElementById('copies');
  const priceEl = document.getElementById('priceDisplay');

  if (!formatEl.value) {
    alert('Please select a service type.');
    return;
  }

  const item = {
    id: 'ITEM-' + Date.now(),
    fileName: file.name,
    fileSize: file.size,
    service: formatEl.options[formatEl.selectedIndex].text,
    format: formatEl.value,
    size: sizeEl.value,
    details: sizeEl.options[sizeEl.selectedIndex]?.text || 'Standard',
    type: typeEl.value,
    copies: parseInt(copiesEl.value) || 1,
    amount: parseFloat(priceEl.textContent.replace('₱', '')) || 0
  };

  if (!APP_STATE.cart) APP_STATE.cart = [];
  APP_STATE.cart.push(item);
  saveGlobalState();
  renderCart();

  const cartSection = document.getElementById('cartSection');
  if (cartSection) {
    cartSection.style.display = 'block';
    setTimeout(() => cartSection.scrollIntoView({ behavior: 'smooth' }), 200);
  }
}

function removeFromCart(idx) {
  if (!APP_STATE.cart) return;
  APP_STATE.cart.splice(idx, 1);
  saveGlobalState();
  renderCart();
  if (APP_STATE.cart.length === 0) {
    document.getElementById('cartSection').style.display = 'none';
  }
}

function renderCart() {
  const body = document.getElementById('cartBody');
  if (!body) return;

  const cart = APP_STATE.cart || [];
  if (cart.length === 0) {
    body.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:3rem;color:#94A3B8;">No items in your order yet.</td></tr>';
    return;
  }

  body.innerHTML = cart.map((item, idx) => `
    <tr style="border-bottom: 1px solid var(--border); background: #FFFFFF;">
      <td style="padding:1.25rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:38px;height:38px;background:#FFF0ED;color:#EE4D2D;border-radius:8px;display:flex;align-items:center;justify-content:center; flex-shrink:0;">
            <i class="fas fa-file-alt"></i>
          </div>
          <div style="min-width:0;">
            <div style="font-weight:700; font-size:0.88rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:160px;">${item.fileName}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.fileSize}</div>
          </div>
        </div>
      </td>
      <td style="padding:1.25rem; font-weight:600; font-size:0.9rem;">${item.service}</td>
      <td style="padding:1.25rem;">
        <div style="font-size:0.88rem;">${item.details}</div>
        <div style="font-size:0.75rem; color:#94A3B8; font-weight:600; text-transform:uppercase;">${item.type === 'bw' ? 'B&W' : 'Color'}</div>
      </td>
      <td style="padding:1.25rem; font-weight:700;">×${item.copies}</td>
      <td style="padding:1.25rem; font-weight:800; color:#EE4D2D; font-size:1.1rem;">₱${item.amount.toFixed(2)}</td>
      <td style="padding:1.25rem; text-align:right;">
        <button onclick="removeFromCart(${idx})" style="width:34px;height:34px;border-radius:50%;border:none;background:#FFF0ED;color:#EE4D2D;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;" title="Remove">
          <i class="fas fa-trash-alt" style="font-size:0.85rem;"></i>
        </button>
      </td>
    </tr>
  `).join('');
  updateTotals();
}

// ===== RECEIVING & TOTALS =====
function selectReceiving(opt) {
  selectedReceiving = opt;
  document.querySelectorAll('.radio-option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`opt-${opt}`)?.classList.add('selected');
  const locBlock = document.getElementById('deliveryLocationBlock');
  const feeRow = document.getElementById('feeLabelRow');
  if (locBlock) locBlock.style.display = opt === 'delivery' ? 'block' : 'none';
  if (feeRow) feeRow.style.display = opt === 'delivery' ? 'flex' : 'none';
  updateTotals();
}

function updateTotals() {
  const cart = APP_STATE.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + (item.amount || 0), 0);
  const delivery = selectedReceiving === 'delivery' ? 50 : 0;
  const total = subtotal + delivery;

  const sub = document.getElementById('subtotal');
  const fee = document.getElementById('deliveryFee');
  const tot = document.getElementById('totalAmount');
  if (sub) sub.textContent = `₱${subtotal.toFixed(2)}`;
  if (fee) fee.textContent = `₱${delivery.toFixed(2)}`;
  if (tot) tot.textContent = `₱${total.toFixed(2)}`;
}

// ===== CHECKOUT =====
function redirectToReceipt() {
  const cart = APP_STATE.cart || [];
  if (cart.length === 0) { alert('Your cart is empty.'); return; }

  const locEl = document.getElementById('deliveryLocation');
  const payEl = document.getElementById('paymentMethod');
  const notesEl = document.getElementById('orderNotes');
  const totalEl = document.getElementById('totalAmount');

  const orderData = {
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString(),
    items: cart,
    receiving: selectedReceiving === 'delivery' ? 'Delivery' : 'Pickup',
    location: selectedReceiving === 'delivery' ? (locEl?.options[locEl.selectedIndex]?.text || 'N/A') : 'BSU Hub (Pick-up)',
    payment: payEl?.options[payEl.selectedIndex]?.text || 'N/A',
    notes: notesEl?.value || '',
    total: parseFloat(totalEl?.textContent.replace('₱', '')) || 0,
    status: 'Pending',
    currentUser: APP_STATE?.currentUser || null
  };

  sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
  APP_STATE.cart = [];
  saveGlobalState();
  window.location.href = '../../../receipt.html';
}
