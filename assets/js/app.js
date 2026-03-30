// ============================================
// PRNT — Main Application JavaScript (Multi-Page)
// ============================================

// ===== STATE MANAGEMENT =====
const APP = {
  isLoggedIn: localStorage.getItem('prnt_loggedIn') === 'true',
  currentUser: JSON.parse(localStorage.getItem('prnt_user')) || {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.delacruz@bulsu.edu.ph',
    phone: '0917-123-4567'
  },
  cart: JSON.parse(localStorage.getItem('prnt_cart')) || [],
  orders: JSON.parse(localStorage.getItem('prnt_orders')) || [],
  files: JSON.parse(localStorage.getItem('prnt_files')) || [],
  selectedFile: null,
  editingIndex: null,
  receivingOption: 'pickup',
  deliveryLocations: [
    'Activity Center', 'Alvarado Hall', 'Carpio Hall', 'College of Law',
    'E-Library', 'Federizo Hall', 'Flores Hall', 'Mendoza Hall',
    'Natividad Hall', 'Pimentel Hall', 'Student Lounge', 'Roxas Hall', 'Valencia Hall'
  ],
  paymentMethods: ['GCash', 'Cash on Pick-up/Delivery', 'Maya'],
};

// ===== SAVE STATE =====
function saveState() {
  localStorage.setItem('prnt_loggedIn', APP.isLoggedIn);
  localStorage.setItem('prnt_user', JSON.stringify(APP.currentUser));
  localStorage.setItem('prnt_cart', JSON.stringify(APP.cart));
  localStorage.setItem('prnt_files', JSON.stringify(APP.files));
  localStorage.setItem('prnt_orders', JSON.stringify(APP.orders));
  localStorage.setItem('prnt_delivery_locs', JSON.stringify(APP.deliveryLocations));
  localStorage.setItem('prnt_payments', JSON.stringify(APP.paymentMethods));
}

// ===== PRICING =====
const PRICING = {
  document: { bw: 3, color: 8 },
  photo: { bw: 10, color: 15 },
  tarpaulin: { bw: 80, color: 120 },
  id_card: { bw: 25, color: 35 },
  booklet: { bw: 50, color: 75 },
  sticker: { bw: 15, color: 25 },
};
const FORMAT_SIZES = {
  document: [
    { value: 'a4', label: 'A4 (Standard)' },
    { value: 'letter', label: 'Letter (Short)' },
    { value: 'legal', label: 'Legal (Long)' }
  ],
  tarpaulin: [
    { value: 'a3', label: 'A3 Size' },
    { value: 'a2', label: 'A2 Size' },
    { value: 'custom', label: 'Custom Size (Specify)' }
  ],
  photo: [
    { value: '4x6', label: '4×6' },
    { value: '5x7', label: '5x7' },
    { value: '8x10', label: '8x10' }
  ],
  id_card: [
    { value: 'cr80', label: 'CR80 (Standard ID)' },
    { value: 'business', label: 'Business Card' }
  ],
  booklet: [
    { value: 'a4', label: 'A4' },
    { value: 'letter', label: 'Letter' },
    { value: 'a5', label: 'A5' }
  ],
  sticker: [
    { value: 'a4', label: 'A4' },
    { value: 'custom', label: 'Custom Size' }
  ]
};

const SIZE_MULTIPLIER = {
  a4: 1, letter: 1, a3: 1.5, a2: 2.5, legal: 1.2, '4x6': 0.8, '5x7': 1, '8x10': 1.5, custom: 2, cr80: 1, business: 1, a5: 0.8
};

const FORMAT_LABELS = {
  document: 'Document Printing',
  photo: 'Photo Printing',
  tarpaulin: 'Tarpaulin Printing',
  id_card: 'ID / Card Printing',
  booklet: 'Booklet Binding',
  sticker: 'Sticker Printing',
};

const SIZE_LABELS = {
  a4: 'A4', letter: 'Letter', a3: 'A3', a2: 'A2', legal: 'Legal', '4x6': '4×6', '5x7': '5x7', '8x10': '8x10', custom: 'Custom', cr80: 'CR80', business: 'Business Card', a5: 'A5'
};

// ===== NAVIGATION (Multi-Page) =====
function navigateTo(page) {
  const pageMap = {
    home: 'index.html',
    about: 'about.html',
    work: 'work.html',
    services: 'services.html',
    contact: 'contact.html',
    order: 'order.html',
    tracking: 'tracking.html',
    profile: 'profile.html',
  };
  const target = pageMap[page];
  if (target) {
    window.location.href = target;
  }
}

// ===== DETECT CURRENT PAGE & SET ACTIVE NAV =====
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html': 'home',
    'about.html': 'about',
    'work.html': 'work',
    'services.html': 'services',
    'contact.html': 'contact',
  };
  const currentPage = pageMap[path] || '';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('data-page') === currentPage) {
      a.classList.add('active');
    }
  });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
  document.getElementById('mobileOverlay')?.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('mobileOverlay')?.classList.remove('open');
}

document.getElementById('mobileOverlay')?.addEventListener('click', closeMobileMenu);

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" style="color:var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'});font-size:1.2rem;"></i>
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

// =// ===== UI REFINEMENTS (Universal Components) =====
function injectFooter() {
  const footers = document.querySelectorAll('footer.footer, #mainFooter');
  const footerContent = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4 style="color:var(--primary);"><i class="fas fa-print" style="margin-right:0.5rem;"></i> PRNT</h4>
          <p>Your trusted online printing partner at BSU. Delivering high-quality documents, photos, and tarpaulins with student-friendly pricing.</p>
          <div class="social-links" style="margin-top:1.5rem; display:flex; gap:1rem;">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Our Services</a></li>
            <li><a href="work.html">Featured Work</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="order.html">Place an Order</a></li>
            <li><a href="tracking.html">Track Order</a></li>
            <li><a href="profile.html">My Account</a></li>
            <li><a href="contact.html">Help Center</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact & Support</h4>
          <ul class="contact-list">
            <li><i class="fas fa-envelope"></i> support@prnt.bulsu.edu.ph</li>
            <li><i class="fas fa-phone-alt"></i> +63 912 345 6789</li>
            <li><i class="fas fa-map-marker-alt"></i> BSU Malolos, Bulacan</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 PRNT Online Printing Service. All rights reserved.</p>
        <div style="display:flex; gap:2rem;">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  `;
  footers.forEach(f => f.innerHTML = footerContent);
}

document.addEventListener('DOMContentLoaded', () => {
  injectFooter();
  setActiveNavLink();
  initNavbarScroll();
  initScrollReveal(); // Re-added initScrollReveal
  initDragDrop(); // Re-added initDragDrop
  
  if (APP.isLoggedIn) updateUIForLogin();
  
  // Auto-init for specific elements
  if (document.getElementById('fileList')) renderFileLibrary();
  if (document.getElementById('cartBody')) renderCart();
  if (document.getElementById('trackingCards')) renderTrackingCards();
  if (document.getElementById('historyBody')) renderOrderHistory();
});

function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return; // Added back the check for nav existence
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

// ===== AUTH MODALS =====
function showAuthModal(type) {
  if (type === 'login') {
    document.getElementById('loginModal')?.classList.add('active');
  } else {
    document.getElementById('registerModal')?.classList.add('active');
  }
}

function switchAuthModal(type) {
  closeModal('loginModal');
  closeModal('registerModal');
  setTimeout(() => showAuthModal(type), 200);
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

// ===== AUTH HANDLERS =====
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (email && password) {
    APP.isLoggedIn = true;
    APP.currentUser = {
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      email: email,
      phone: '09123456789',
    };

    closeModal('loginModal');
    saveState();
    updateUIForLogin();
    showToast('Welcome back, Juan!');
    loadSampleHistory();
  }
}

function handleRegister(e) {
  e.preventDefault();
  const firstName = document.getElementById('regFirstName').value;
  const lastName = document.getElementById('regLastName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone')?.value || '';

  APP.isLoggedIn = true;
  APP.currentUser = { firstName, lastName, email, phone };

  closeModal('registerModal');
  saveState();
  updateUIForLogin();
  showToast(`Welcome, ${firstName}! Your account has been created.`);
}

function updateUIForLogin() {
  const loginBtn = document.getElementById('loginBtn');
  const userNav = document.getElementById('userNavProfile');
  if (loginBtn) loginBtn.style.display = 'none';
  if (userNav) userNav.style.display = 'flex';

  if (APP.currentUser) {
    const initials = APP.currentUser.firstName[0] + APP.currentUser.lastName[0];
    const navAvatar = document.getElementById('navAvatar');
    if (navAvatar) navAvatar.textContent = initials;

    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar) profileAvatar.textContent = initials;

    const profileName = document.getElementById('profileName');
    if (profileName) profileName.textContent = `${APP.currentUser.firstName} ${APP.currentUser.lastName}`;

    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.textContent = APP.currentUser.email;

    const profFirstName = document.getElementById('profFirstName');
    if (profFirstName) profFirstName.value = APP.currentUser.firstName;

    const profLastName = document.getElementById('profLastName');
    if (profLastName) profLastName.value = APP.currentUser.lastName;

    const profEmail = document.getElementById('profEmail');
    if (profEmail) profEmail.value = APP.currentUser.email;

    const profPhone = document.getElementById('profPhone');
    if (profPhone) profPhone.value = APP.currentUser.phone || '';
  }
}

// Populate Checkout select dropdowns if they exist
document.addEventListener('DOMContentLoaded', () => {
  const deliverySelect = document.getElementById('deliveryLocation');
  if (deliverySelect) {
    deliverySelect.innerHTML = APP.deliveryLocations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
  }
  const paymentSelect = document.getElementById('paymentMethod');
  if (paymentSelect) {
    paymentSelect.innerHTML = APP.paymentMethods.map(pm => `<option value="${pm}">${pm}</option>`).join('');
  }
});

function logoutUser() {
  APP.isLoggedIn = false;
  APP.currentUser = null;
  localStorage.removeItem('prnt_loggedIn');
  localStorage.removeItem('prnt_user');
  navigateTo('home');
}

// ===== PROFILE =====
function switchProfileTab(tab, btn) {
  document.querySelectorAll('[id^="profileTab-"]').forEach(t => t.style.display = 'none');
  document.getElementById(`profileTab-${tab}`).style.display = 'block';
  document.querySelectorAll('.profile-menu button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (tab === 'orders') {
    renderOrderHistory();
    renderActiveOrders();
  }
}

function toggleTransactionView(view) {
  const statusView = document.getElementById('activeStatusView');
  const historyView = document.getElementById('historyTableView');
  const btnStatus = document.getElementById('btnStatusView');
  const btnHistory = document.getElementById('btnHistoryView');

  if (view === 'status') {
    statusView.style.display = 'block';
    historyView.style.display = 'none';
    btnStatus.className = 'btn btn-primary';
    btnHistory.className = 'btn btn-outline';
    renderActiveOrders();
  } else {
    statusView.style.display = 'none';
    historyView.style.display = 'block';
    btnStatus.className = 'btn btn-outline';
    btnHistory.className = 'btn btn-primary';
    renderOrderHistory();
  }
}

function renderActiveOrders() {
  const container = document.getElementById('activeOrdersTracking');
  if (!container) return;

  const activeOrders = APP.orders.filter(o => o.progress < 4);
  if (activeOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;background:var(--background);border-radius:12px;border:1px dashed var(--border);">
        <i class="fas fa-box-open" style="font-size:2.5rem;color:var(--border);margin-bottom:1rem;display:block;"></i>
        <p style="color:var(--text-muted);">No active transactions.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = activeOrders.map(order => {
    const steps = ['Pending', 'Confirmed', 'Printing', 'Ready', 'Completed'];
    const progressIndex = order.progress;
    const fillWidth = progressIndex === 0 ? '0%' : `${(progressIndex / (steps.length - 1)) * 100}%`;

    return `
      <div class="card" style="margin-bottom:1.5rem; padding:1.5rem; border:1px solid var(--border);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <div>
            <div style="font-weight:800; font-size:1.1rem; color:var(--text-dark);">${order.id}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${order.date}</div>
          </div>
          <span class="status-badge" data-status="${steps[progressIndex].toLowerCase()}">${steps[progressIndex]}</span>
        </div>
        
        <div class="progress-tracker small" style="margin-bottom:0;">
          <div class="progress-fill" style="width:${fillWidth};"></div>
          ${steps.map((step, i) => `<div class="progress-step ${i < progressIndex ? 'completed' : ''} ${i === progressIndex ? 'active' : ''}"></div>`).join('')}
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.7rem; color:var(--text-muted);">
          <span>Pending</span>
          <span>In Progress</span>
          <span>Ready</span>
        </div>
        
        <div style="margin-top:1.25rem; display:flex; gap:0.5rem;">
          <button class="btn btn-outline" style="flex:1; padding:0.6rem; font-size:0.8rem;" onclick="viewHistoryReceipt('${order.id}')">Details</button>
          <button class="btn btn-primary" style="flex:1; padding:0.6rem; font-size:0.8rem;" onclick="navigateTo('tracking')">Track Real-time</button>
        </div>
      </div>
    `;
  }).join('');
}

function saveProfile(e) {
  e.preventDefault();
  APP.currentUser.firstName = document.getElementById('profFirstName').value;
  APP.currentUser.lastName = document.getElementById('profLastName').value;
  APP.currentUser.phone = document.getElementById('profPhone')?.value || '';
  saveState();
  updateUIForLogin();
  showToast('Profile updated successfully!');
}

function changePassword(e) {
  e.preventDefault();
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;
  if (newPass !== confirmPass) {
    showToast('Passwords do not match!', 'error');
    return;
  }
  showToast('Password changed successfully!');
  e.target.reset();
}

// ===== FILE HANDLING =====
function handleFileUpload(e) {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const fileObj = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      date: new Date().toLocaleDateString(),
      pages: detectPages(file), // Smart Page Detection
    };
    APP.files.push(fileObj);
    APP.selectedFile = fileObj;
  });

  saveState();
  renderFileLibrary();

  if (files.length === 1) {
    showFilePreview(APP.files[APP.files.length - 1]);
    showToast(`"${files[0].name}" uploaded successfully!`);
  } else {
    showToast(`${files.length} files uploaded successfully!`);
  }

  e.target.value = '';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function showFilePreview(file) {
  const preview = document.getElementById('filePreview');
  if (!preview) return;
  preview.style.display = 'block';
  document.getElementById('previewFileName').textContent = file.name;
  document.getElementById('previewFileSize').textContent = `${file.size} · ${file.pages} page(s)`;

  const icon = preview.querySelector('i');
  if (file.name.endsWith('.pdf')) { icon.className = 'fas fa-file-pdf'; icon.style.color = '#EF4444'; }
  else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) { icon.className = 'fas fa-file-word'; icon.style.color = '#3B82F6'; }
  else if (file.name.match(/\.(png|jpg|jpeg)$/i)) { icon.className = 'fas fa-file-image'; icon.style.color = '#2DC258'; }
  else { icon.className = 'fas fa-file'; icon.style.color = 'var(--primary)'; }
}

function renderFileLibrary() {
  const container = document.getElementById('fileList');
  if (!container) return;
  if (APP.files.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem;text-align:center;padding:1rem;">No files uploaded yet.</p>';
    return;
  }
  container.innerHTML = APP.files.map((f, i) => `
    <div class="file-item ${APP.selectedFile?.id === f.id ? 'selected' : ''}" onclick="selectFile(${i})">
      <div class="file-info">
        <i class="fas fa-${f.name.endsWith('.pdf') ? 'file-pdf' : f.name.match(/\.(png|jpg|jpeg)$/i) ? 'file-image' : 'file-alt'}"></i>
        <div>
          <div style="font-weight:500;font-size:0.9rem;">${f.name}</div>
          <div class="file-size">${f.size} · ${f.pages} pg(s) · ${f.date}</div>
        </div>
      </div>
      <button onclick="event.stopPropagation();removeFile(${i})" style="color:var(--danger);font-size:0.85rem;"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');
}

// Mock Page Detection Logic
function detectPages(file) {
  if (file.name.toLowerCase().endsWith('.pdf')) {
    return Math.floor(Math.random() * 15) + 1; // Simulated detection
  }
  if (file.name.match(/\.(png|jpg|jpeg)$/i)) {
    return 1;
  }
  return 1;
}

function selectFile(index) {
  APP.selectedFile = APP.files[index];
  showFilePreview(APP.selectedFile);
  renderFileLibrary();
  showToast(`Selected: ${APP.selectedFile.name}`);
}

function removeFile(index) {
  const removed = APP.files.splice(index, 1)[0];
  if (APP.selectedFile?.id === removed.id) {
    APP.selectedFile = APP.files.length > 0 ? APP.files[0] : null;
    if (!APP.selectedFile) {
      const preview = document.getElementById('filePreview');
      if (preview) preview.style.display = 'none';
    }
  }
  saveState();
  renderFileLibrary();
  showToast(`Removed "${removed.name}"`, 'error');
}

function handleFormatChange(isEdit = false) {
  const formatId = isEdit ? 'editFormat' : 'serviceFormat';
  const sizeId = isEdit ? 'editPaperSize' : 'paperSize';
  
  const format = document.getElementById(formatId)?.value;
  const sizeSelect = document.getElementById(sizeId);
  if (!sizeSelect) return;

  sizeSelect.innerHTML = '';
  
  if (!format || !FORMAT_SIZES[format]) {
    sizeSelect.innerHTML = '<option value="">Select a service first...</option>';
    handleSizeChange(isEdit);
    updatePrice(isEdit);
    return;
  }

  FORMAT_SIZES[format].forEach(s => {
    sizeSelect.innerHTML += `<option value="${s.value}">${s.label}</option>`;
  });

  handleSizeChange(isEdit);
  updatePrice(isEdit);
}

function handleSizeChange(isEdit = false) {
  const sizeId = isEdit ? 'editPaperSize' : 'paperSize';
  const customId = isEdit ? 'editCustomDimensions' : 'customDimensions';
  
  const size = document.getElementById(sizeId)?.value;
  const customDiv = document.getElementById(customId);
  
  if (customDiv) {
    if (size === 'custom') {
      customDiv.style.display = 'grid';
      customDiv.style.gridTemplateColumns = '1fr 1fr';
      customDiv.style.gap = '1rem';
    } else {
      customDiv.style.display = 'none';
      const inputs = customDiv.querySelectorAll('input');
      inputs.forEach(i => i.value = '');
    }
  }
  
  updatePrice(isEdit);
}

// ===== PRICING CALCULATOR =====
function updatePrice(isEdit = false) {
  const formatId = isEdit ? 'editFormat' : 'serviceFormat';
  const typeId = isEdit ? 'editPrintType' : 'printType';
  const sizeId = isEdit ? 'editPaperSize' : 'paperSize';
  const copiesId = isEdit ? 'editCopies' : 'copies';

  const formatEl = document.getElementById(formatId);
  const typeEl = document.getElementById(typeId);
  const sizeEl = document.getElementById(sizeId);
  const copiesEl = document.getElementById(copiesId);

  if (!formatEl || !typeEl || !sizeEl || !copiesEl) return 0;

  const format = formatEl.value;
  const type = typeEl.value;
  let size = sizeEl.value;
  const copies = parseInt(copiesEl.value) || 1;

  if (size?.startsWith('Custom')) size = 'custom';

  if (!format) {
    const display = document.getElementById('priceDisplay');
    if (display) display.textContent = '₱0.00';
    return 0;
  }

  const base = PRICING[format]?.[type] || 0;
  const multiplier = SIZE_MULTIPLIER[size] || 1;
  const pageCount = APP.selectedFile ? APP.selectedFile.pages : 1;
  
  const total = base * multiplier * pageCount * copies;

  if (!isEdit) {
    const display = document.getElementById('priceDisplay');
    if (display) {
      if (size === 'custom') {
        display.style.fontSize = '0.9rem';
        display.innerHTML = '<span style="color:var(--warning);">Pending Review</span>';
      } else {
        display.style.fontSize = '1.75rem';
        display.textContent = `₱${total.toFixed(2)}`;
      }
    }
  }
  return total;
}

// ===== CART SYSTEM =====
function addToCart() {
  if (!APP.selectedFile) {
    showToast('Please select or upload a file first!', 'error');
    return;
  }

  const format = document.getElementById('serviceFormat').value;
  if (!format) {
    showToast('Please select a printing format!', 'error');
    return;
  }

  const type = document.getElementById('printType').value;
  let size = document.getElementById('paperSize').value;
  const copies = parseInt(document.getElementById('copies').value) || 1;

  if (size === 'custom') {
    const w = document.getElementById('customWidth')?.value;
    const h = document.getElementById('customHeight')?.value;
    if (!w || !h) {
      showToast('Please specify both width and height for custom size!', 'error');
      return;
    }
    size = `Custom (${w}" × ${h}")`;
  }

  const sizeKey = size.startsWith('Custom') ? 'custom' : size;
  const pageCount = APP.selectedFile ? APP.selectedFile.pages : 1;
  const base = PRICING[format]?.[type] || 0;
  const multiplier = SIZE_MULTIPLIER[sizeKey] || 1;
  const price = base * multiplier * pageCount * copies;

  APP.cart.push({
    file: { ...APP.selectedFile },
    format,
    type,
    size,
    copies,
    price,
  });

  // Remove the file from the library after adding to order
  const fileIndex = APP.files.findIndex(f => f.id === APP.selectedFile.id);
  if (fileIndex > -1) {
    APP.files.splice(fileIndex, 1);
  }

  // Clear selection and preview
  APP.selectedFile = null;
  document.getElementById('filePreview').style.display = 'none';

  saveState();
  renderFileLibrary();
  renderCart();
  showToast('Item added to order!');

  // Reset service selection
  document.getElementById('serviceFormat').value = '';
  document.getElementById('copies').value = 1;
  updatePrice();
}

function setReceiving(option) {
  APP.receivingOption = option;
  const btnP = document.getElementById('btnPickup');
  const btnD = document.getElementById('btnDelivery');
  const locWrap = document.getElementById('deliveryLocWrapper');
  const feeLine = document.getElementById('deliveryFeeItem');
  const select = document.getElementById('deliveryLocationSelect');

  if (btnP && btnD) {
    btnP.classList.toggle('active', option === 'pickup');
    btnD.classList.toggle('active', option === 'delivery');
  }

  if (locWrap) locWrap.style.display = option === 'delivery' ? 'block' : 'none';
  if (feeLine) feeLine.style.display = option === 'delivery' ? 'flex' : 'none';

  if (option === 'delivery' && select) {
    select.innerHTML = APP.deliveryLocations.map(l => `<option value="${l}">${l}</option>`).join('');
  }

  updateCartTotal();
}

function renderCart() {
  const tbody = document.getElementById('cartBody');
  const section = document.getElementById('cartSection');
  const floating = document.getElementById('floatingCart');
  const count = document.getElementById('floatingCartCount');

  if (!tbody) return;

  // ENSURE DATA SANITY
  if (!Array.isArray(APP.cart)) {
    console.error("APP.cart is not an array, resetting.");
    APP.cart = [];
    saveState();
  }

  if (APP.cart.length === 0) {
    if (section) section.style.display = 'none';
    if (floating) floating.style.display = 'none';
    tbody.innerHTML = '';
    return;
  }

  if (section) section.style.display = 'block';
  if (floating) {
    floating.style.display = 'flex';
    if (count) count.textContent = APP.cart.length;
  }

  tbody.innerHTML = APP.cart.map((item, index) => {
    if (!item || !item.file) return '';
    const formatLabel = FORMAT_LABELS[item.format] || item.format || 'Standard';
    const sizeLabel = SIZE_LABELS[item.size] || (item.size && item.size.startsWith('Custom') ? item.size : 'A4');
    const price = typeof item.price === 'number' ? item.price : 0;
    
    return `
      <tr class="reveal" style="animation-delay: ${index * 0.1}s;">
        <td style="padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:1.25rem;">
            <div style="width:40px;height:40px;background:var(--border-light);color:var(--primary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;border:1px solid var(--border);">
              <i class="fas fa-${item.file.name && item.file.name.endsWith('.pdf') ? 'file-pdf' : 'file-alt'}"></i>
            </div>
            <div>
              <div style="font-weight:700;color:var(--text-dark);font-size:0.9rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.file.name || 'Untitled'}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">${item.file.size || '0 KB'} · ${item.file.pages || 1} pg(s)</div>
            </div>
          </div>
        </td>
        <td style="padding:1.25rem;">
          <div style="font-weight:600;color:var(--text-dark);font-size:0.9rem;">${formatLabel}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${item.type === 'bw' ? 'B&W' : 'Color'}</div>
        </td>
        <td style="padding:1.25rem;">
          <div style="font-weight:600;color:var(--text-dark);font-size:0.9rem;">${sizeLabel}</div>
        </td>
        <td style="padding:1.25rem; font-weight:700; font-size:0.9rem;">x${item.copies || 1}</td>
        <td style="padding:1.25rem; font-weight:800; color:var(--primary); font-size:1.05rem;">₱${price.toFixed(2)}</td>
        <td style="padding:1.25rem; text-align:right;">
          <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
            <button class="btn-edit" onclick="editCartItem(${index})" style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--background);color:var(--text-muted);border:1px solid var(--border);cursor:pointer;" title="Edit">
              <i class="fas fa-pen" style="font-size:0.75rem;"></i>
            </button>
            <button class="btn btn-outline" style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border-color:var(--border);color:var(--danger);padding:0;" onclick="removeFromCart(${index})" title="Remove">
              <i class="fas fa-trash-alt" style="font-size:0.75rem;"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  updateCheckoutTotals();
}

function removeFromCart(index) {
  const removed = APP.cart.splice(index, 1)[0];
  saveState();
  renderCart();
  showToast(`Removed "${removed.file.name}" from order.`, 'error');
}

function editCartItem(index) {
  APP.editingIndex = index;
  const item = APP.cart[index];
  document.getElementById('editFormat').value = item.format;
  handleFormatChange(true);
  
  document.getElementById('editPrintType').value = item.type;
  
  const isCustom = item.size.startsWith('Custom');
  document.getElementById('editPaperSize').value = isCustom ? 'custom' : item.size;
  handleSizeChange(true);

  if (isCustom) {
    const customMatch = item.size.match(/\(([^)]+)\)/);
    if (customMatch && customMatch[1]) {
      document.getElementById('editCustomSizeInput').value = customMatch[1];
    }
  }

  document.getElementById('editCopies').value = item.copies;
  document.getElementById('editModal').classList.add('active');
}

function saveEditItem() {
  const i = APP.editingIndex;
  const format = document.getElementById('editFormat').value;
  const type = document.getElementById('editPrintType').value;
  let size = document.getElementById('editPaperSize').value;
  const copies = parseInt(document.getElementById('editCopies').value) || 1;

  if (size === 'custom') {
    const customVal = document.getElementById('editCustomSizeInput')?.value.trim();
    if (!customVal) {
      showToast('Please specify the custom size!', 'error');
      return;
    }
    size = `Custom (${customVal})`;
  }

  APP.cart[i].format = format;
  APP.cart[i].type = type;
  APP.cart[i].size = size;
  APP.cart[i].copies = copies;
  APP.cart[i].price = updatePrice(true);

  closeModal('editModal');
  saveState();
  renderCart();
  showToast('Item updated!');
}

function updateCheckoutTotals() {
  const subtotal = APP.cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = (APP.receivingOption === 'delivery') ? 50 : 0;
  // Service fee removed per requirement
  const total = subtotal + deliveryFee;

  const sub = document.getElementById('subtotal');
  const tot = document.getElementById('totalAmount');
  const feeRow = document.getElementById('feeLabelRow');
  const dFee = document.getElementById('deliveryFee');
  
  if (sub) sub.textContent = `₱${subtotal.toFixed(2)}`;
  if (tot) tot.textContent = `₱${total.toFixed(2)}`;
  
  if (feeRow) {
    if (APP.receivingOption === 'delivery') {
      feeRow.style.display = 'flex';
      if (dFee) dFee.textContent = `₱${deliveryFee.toFixed(2)}`;
    } else {
      feeRow.style.display = 'none';
    }
  }
}

// ===== RECEIVING OPTION =====
function selectReceiving(option) {
  APP.receivingOption = option;
  document.querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
  document.getElementById(`opt-${option}`)?.classList.add('selected');
  
  const deliveryBlock = document.getElementById('deliveryLocationBlock');
  if (deliveryBlock) {
    deliveryBlock.style.display = option === 'delivery' ? 'block' : 'none';
  }

  updateCheckoutTotals();
}

// ===== REDIRECT TO RECEIPT =====
function redirectToReceipt() {
  if (!APP.isLoggedIn) {
    showToast('Please log in first before proceeding to receipt', 'error');
    showAuthModal('login');
    return;
  }

  if (APP.cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  // Create real order
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleString(),
    items: [...APP.cart],
    total: APP.cart.reduce((sum, item) => sum + (item.price * item.copies), 0) + (APP.receivingOption === 'delivery' ? 50 : 0),
    status: 'Pending',
    receiving: APP.receivingOption
  };

  APP.orders.unshift(newOrder);
  APP.cart = [];
  saveState();
  
  showToast('Order placed successfully! Redirecting...');
  setTimeout(() => {
    window.location.href = `receipt.html?id=${orderId}`;
  }, 1500);
}

// ===== REORDER FUNCTIONALITY =====
function reorder(orderId) {
  const order = APP.orders.find(o => o.id === orderId);
  if (!order) return;

  // Auto-load previous order into cart
  APP.cart = order.items.map(item => ({ ...item }));
  
  // Auto-load files back into library (if not already there)
  order.items.forEach(item => {
    if (!APP.files.find(f => f.name === item.file.name)) {
      APP.files.push({ ...item.file });
    }
  });

  saveState();
  navigateTo('order');
}

function renderOrderHistory() {
  const tbody = document.getElementById('historyBody');
  if (!tbody) return;

  if (APP.orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted);">No transactions yet.</td></tr>';
    return;
  }

  tbody.innerHTML = APP.orders.map(o => `
    <tr>
      <td style="font-weight:700;color:var(--primary);">${o.id}</td>
      <td style="font-size:0.85rem;">${o.date}</td>
      <td>${o.items.length} item(s)</td>
      <td style="font-weight:700;">₱${o.total.toFixed(2)}</td>
      <td>
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn-primary" onclick="viewOrder('${o.id}')" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i class="fas fa-eye"></i> View
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function viewOrder(id) {
  window.location.href = `receipt.html?id=${id}`;
}

// Function to actually place the order (called from receipt.html or internally)
function finalPlaceOrder(orderData) {
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const order = {
    ...orderData,
    id: orderId,
    status: 'Pending',
    progress: 0,
    date: new Date().toLocaleString()
  };

  APP.orders.unshift(order);
  APP.cart = [];
  saveState();
  return orderId;
}

// ===== ORDER TRACKING =====
function renderTrackingCards() {
  const container = document.getElementById('trackingCards');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const trackId = urlParams.get('id');

  let activeOrders = APP.orders.filter(o => o.progress < 4 && o.status !== 'completed');
  if (trackId) {
    activeOrders = APP.orders.filter(o => o.id === trackId);
  }

  if (activeOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:4rem 0;">
        <i class="fas fa-box-open" style="font-size:4rem;color:var(--border);margin-bottom:1rem;"></i>
        <h3 style="color:var(--text-muted);">No active orders</h3>
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">You don't have any ongoing print jobs to track right now.</p>
        <button class="btn btn-primary" onclick="navigateTo('order')"><i class="fas fa-plus"></i> Place a New Order</button>
      </div>
    `;
    return;
  }

  container.innerHTML = activeOrders.map(order => {
    const steps = ['Pending', 'Confirmed', 'Printing', 'Ready', 'Completed'];
    const progressIndex = order.progress || 0;
    const progressPercent = (progressIndex / (steps.length - 1)) * 100;

    const itemsHtml = order.items.map(item => {
      const fileName = item.file ? item.file.name : (item.fileName || 'Untitled File');
      const serviceLabel = FORMAT_LABELS[item.format] || item.service || item.format;
      const sizeLabel = SIZE_LABELS[item.size] || item.details || item.size;
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem 0; border-bottom:1px dashed #EEE;">
          <div style="flex:1;">
            <div style="font-weight:700; color:#222; font-size:0.95rem;">${fileName}</div>
            <div style="font-size:0.8rem; color:#757575; margin-top:0.25rem;">${serviceLabel} · ${sizeLabel}</div>
          </div>
          <div style="text-align:right; min-width:80px;">
            <div style="font-weight:600; font-size:0.9rem;">x${item.copies}</div>
            <div style="font-weight:700; color:var(--primary); font-size:1rem; margin-top:0.25rem;">₱${(item.price || (item.amount/item.copies) || 0).toFixed(2)}</div>
          </div>
        </div>
      `;
    }).join('');

    const statusColors = {
      pending: { bg: '#FFF7E6', text: '#F59E0B' },
      confirmed: { bg: '#E0F2FE', text: '#0EA5E9' },
      printing: { bg: '#F3E8FF', text: '#8B5CF6' },
      ready: { bg: '#E8F8EE', text: '#2DC258' },
      completed: { bg: '#E8F8EE', text: '#2DC258' }
    };
    const s = steps[progressIndex].toLowerCase();
    const sColors = statusColors[s] || { bg: '#F5F5F5', text: '#757575' };

    return `
      <div class="tracker-card reveal" style="margin-bottom:2.5rem; background:#FFF; border:1px solid #EEE; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.05); overflow:hidden;">
        <!-- Header -->
        <div style="padding:2rem; display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #F5F5F5;">
          <div>
            <div style="font-size:0.75rem; color:#999; text-transform:uppercase; letter-spacing:1px; font-weight:800; margin-bottom:0.5rem;">Tracking ID</div>
            <h3 style="margin:0; font-size:1.4rem; font-weight:800; color:#222;">${order.id}</h3>
            <div style="font-size:0.85rem; color:#777; margin-top:0.4rem;"><i class="far fa-calendar-alt"></i> ${order.date}</div>
          </div>
          <div style="background:${sColors.bg}; color:${sColors.text}; padding:0.6rem 1.25rem; border-radius:100px; font-weight:700; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.5px; border:1px solid ${sColors.text}20;">
            ${steps[progressIndex]}
          </div>
        </div>

        <!-- Progress Flow -->
        <div style="padding:3rem 2rem 1rem;">
          <div style="position:relative; display:flex; justify-content:space-between; align-items:center; margin-bottom:2.5rem;">
            <!-- Line background -->
            <div style="position:absolute; top:20px; left:10%; right:10%; height:4px; background:#F0F0F0; z-index:1; border-radius:2px;"></div>
            <!-- Progress Line -->
            <div style="position:absolute; top:20px; left:10%; width:${progressPercent * 0.8}%; height:4px; background:var(--primary); z-index:2; border-radius:2px; transition:width 1s ease;"></div>
            
            ${steps.map((step, i) => {
              const isActive = i === progressIndex;
              const isDone = i < progressIndex;
              return `
                <div style="z-index:3; position:relative; display:flex; flex-direction:column; align-items:center; width:20%;">
                   <div style="width:40px; height:40px; border-radius:50%; background:${isDone || isActive ? 'var(--primary)' : '#FFF'}; border:3px solid ${isDone || isActive ? 'var(--primary)' : '#F0F0F0'}; color:${isDone || isActive ? '#FFF' : '#CCC'}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; box-shadow:${isActive ? '0 0 15px rgba(238, 77, 45, 0.4)' : 'none'}; transition:all 0.4s;">
                     ${isDone ? '<i class="fas fa-check"></i>' : i + 1}
                   </div>
                   <div style="margin-top:1rem; font-size:0.75rem; font-weight:${isActive ? '800' : '600'}; color:${isActive ? 'var(--primary)' : '#999'}; text-align:center; text-transform:uppercase; letter-spacing:0.5px;">${step}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Receipt Section -->
        <div style="padding:0 2rem 2rem;">
          <div style="background:#FAFAFA; border:1px solid #F0F0F0; border-radius:16px; padding:1.5rem;">
            <div style="font-weight:800; font-size:0.75rem; text-transform:uppercase; color:#999; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">
              <i class="fas fa-print"></i> Order Summary
            </div>
            ${itemsHtml}
            
            <div style="margin-top:1.5rem; display:flex; justify-content:space-between; align-items:flex-end;">
              <div>
                <div style="font-size:0.8rem; color:#888;">Payments: <span style="color:#444; font-weight:700;">${order.payment || 'GCash'}</span></div>
                <div style="font-size:0.8rem; color:#888; margin-top:0.25rem;">Type: <span style="color:#444; font-weight:700;">${order.receiving === 'delivery' ? 'Delivery' : 'Pick-up'}</span></div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.85rem; font-weight:700; color:#AAA; text-transform:uppercase; letter-spacing:1px;">Total Amount</div>
                <div style="font-size:2rem; font-weight:900; color:var(--primary); line-height:1; letter-spacing:-1px;">₱${order.total.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div style="margin-top:2rem; display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <button class="btn btn-outline" style="justify-content:center; padding:1.25rem; font-size:0.9rem;" onclick="viewHistoryReceipt('${order.id}')">
              <i class="fas fa-file-invoice"></i> View Full Receipt
            </button>
            <button class="btn btn-primary" style="justify-content:center; padding:1.25rem; font-size:0.9rem;" onclick="reorder('${order.id}')">
              <i class="fas fa-redo"></i> Reorder Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
// Helper for pluralization
function pluralize(count, singular, plural = singular + 's') {
  return `${count} ${count === 1 ? singular : plural}`;
}

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function viewHistoryReceipt(orderId) {
  const order = APP.orders.find(o => o.id === orderId);
  if (!order) return;

  const content = document.getElementById('receiptModalContent');
  if (!content) return;

  const itemsHtml = order.items.map(item => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:1.25rem 0; border-bottom:1px solid #F0F0F0;">
      <div style="flex:1;">
        <div style="font-weight:700; color:#222; margin-bottom:0.25rem;">${item.file ? item.file.name : (item.fileName || 'Untitled File')}</div>
        <div style="font-size:0.8rem; color:#888; text-transform:capitalize;">${FORMAT_LABELS[item.format] || item.format} · ${SIZE_LABELS[item.size] || item.size} · ${pluralize(item.copies, 'copy', 'copies')}</div>
      </div>
      <div style="text-align:right; font-weight:700; color:var(--primary); font-size:1.1rem;">₱${(item.price * item.copies).toFixed(2)}</div>
    </div>
  `).join('');

  const subtotal = order.total - (order.deliveryFee || 0);

  content.innerHTML = `
    <!-- Header Badge with ZigZag bottom -->
    <div style="position:relative; text-align:center; margin-bottom:2rem; background:var(--primary); padding:2rem 2rem 3rem; color:white; margin:-2rem -2rem 2rem;">
       <div style="width:50px; height:50px; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; font-size:1.5rem;">
         <i class="fas fa-check"></i>
       </div>
       <h2 style="margin:0; font-size:1.8rem; font-weight:800; letter-spacing:-0.5px;">Order Receipt: ${order.id}</h2>
       <div style="font-size:0.9rem; font-weight:500; opacity:0.9; margin-top:0.5rem;">Status: ${order.status}</div>
       <!-- ZigZag Effect -->
       <div style="position:absolute; bottom:-10px; left:0; width:100%; height:20px; background:radial-gradient(circle, transparent 10px, white 10px) 0 -10px; background-size:20px 20px;"></div>
    </div>

    <!-- Personal & Logistics -->
    <div style="margin-bottom:2.5rem;">
      <div style="font-weight:800; font-size:0.8rem; text-transform:uppercase; color:#999; letter-spacing:1px; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">
        <i class="fas fa-info-circle" style="color:#F59E0B;"></i> Personal & Logistics
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; background:white; border:1px solid #EEE; padding:1.5rem; border-radius:16px;">
        <div>
          <label style="display:block; font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#BBB; margin-bottom:0.25rem;">Customer</label>
          <div style="font-weight:700; color:#333;">${order.currentUser ? `${order.currentUser.firstName} ${order.currentUser.lastName}` : (order.firstName ? `${order.firstName} ${order.lastName}` : 'Juan Dela Cruz')}</div>
        </div>
        <div>
          <label style="display:block; font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#BBB; margin-bottom:0.25rem;">Phone Number</label>
          <div style="font-weight:700; color:#333;">${order.phone || '0912-345-6789'}</div>
        </div>
        <div>
          <label style="display:block; font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#BBB; margin-bottom:0.25rem;">Receiving Method</label>
          <div style="font-weight:700; color:#333; text-transform:capitalize;">${order.receiving}</div>
        </div>
        <div>
          <label style="display:block; font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#BBB; margin-bottom:0.25rem;">Location/Spot</label>
          <div style="font-weight:700; color:#333;">${order.location || 'BulSU Main'}</div>
        </div>
        <div>
          <label style="display:block; font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#BBB; margin-bottom:0.25rem;">Payment Method</label>
          <div style="font-weight:700; color:#333;">${order.payment || 'Cash on Delivery'}</div>
        </div>
        <div>
          <label style="display:block; font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#BBB; margin-bottom:0.25rem;">Order Date</label>
          <div style="font-weight:700; color:#333;">${order.date}</div>
        </div>
      </div>
    </div>

    <!-- Order Summary Items -->
    <div style="margin-bottom:2.5rem;">
      <div style="font-weight:800; font-size:0.8rem; text-transform:uppercase; color:#999; letter-spacing:1px; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">
        <i class="fas fa-print" style="color:var(--primary);"></i> Order Summary
      </div>
      <div style="background:white; border:1px solid #EEE; padding:0 1.5rem; border-radius:16px;">
        ${itemsHtml}
      </div>
    </div>

    <!-- Detailed Financials -->
    <div style="background:#222; color:white; border-radius:16px; padding:1.5rem; overflow:hidden; position:relative;">
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <span style="color:#999; font-size:0.9rem;">Subtotal</span>
        <span style="font-weight:600;">₱${subtotal.toFixed(2)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem;">
        <span style="color:#999; font-size:0.9rem;">Delivery Fee</span>
        <span style="font-weight:600;">₱${(order.deliveryFee || 0).toFixed(2)}</span>
      </div>
      <div style="height:1px; background:rgba(255,255,255,0.1); margin-bottom:1.5rem;"></div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:1.2rem; font-weight:800; letter-spacing:1px; text-transform:uppercase;">Total</span>
        <span style="font-size:1.8rem; font-weight:900; color:var(--primary);">₱${order.total.toFixed(2)}</span>
      </div>
    </div>
  `;

  openModal('receiptModal');
}

function advanceOrder(orderId) {
  const order = APP.orders.find(o => o.id === orderId);
  if (order && order.progress < 4) {
    order.progress++;
    saveState();
    renderTrackingCards();
    const steps = ['Pending', 'Confirmed', 'Printing', 'Ready', 'Completed'];
    showToast(`Order ${orderId}: ${steps[order.progress]}`);
  } else {
    showToast('Order is already completed!');
  }
}

// ===== ORDER HISTORY =====
function loadSampleHistory() {
  if (APP.orders.length === 0) {
    APP.orders = [
      {
        id: 'ORD-001234',
        items: [{ file: { id: 101, name: 'thesis_draft.pdf', size: '2.4 MB' }, format: 'document', type: 'bw', size: 'a4', copies: 5, price: 15 }],
        total: 15,
        receiving: 'pickup',
        payment: 'GCash',
        status: 'completed',
        date: 'Mar 15, 2026',
        progress: 4,
      },
      {
        id: 'ORD-001198',
        items: [
          { file: { id: 102, name: 'poster.png', size: '5.1 MB' }, format: 'tarpaulin', type: 'color', size: 'custom', copies: 2, price: 480 },
          { file: { id: 103, name: 'business_card.pdf', size: '1.2 MB' }, format: 'id_card', type: 'color', size: 'cr80', copies: 50, price: 1750 },
        ],
        total: 2230,
        receiving: 'delivery',
        payment: 'Cash on Delivery / Pick-up',
        status: 'ready',
        date: 'Mar 10, 2026',
        progress: 3,
      },
      {
        id: 'ORD-001150',
        items: [{ file: { id: 104, name: 'photos.jpg', size: '8.4 MB' }, format: 'photo', type: 'color', size: '4x6', copies: 20, price: 240 }],
        total: 240,
        receiving: 'pickup',
        payment: 'GCash',
        status: 'completed',
        date: 'Mar 03, 2026',
        progress: 4,
      },
    ];
    saveState();
  }
}

// Helper to format date as dd/mm/yy, time
function formatHistoryDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${dd}/${mm}/${yy}, ${h}:${m} ${ampm}`;
}

function renderOrderHistory() {
  const tbody = document.getElementById('historyBody');
  if (!tbody) return;
  
  // Filter for completed orders only
  const completedOrders = APP.orders.filter(o => o.progress >= 4 || o.status === 'completed');
  
  if (completedOrders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:2rem;">No completed orders yet.</td></tr>';
    return;
  }

  tbody.innerHTML = completedOrders.map(order => {
    let fileDisplay = 'Untitled';
    if (order.items && order.items.length > 0) {
      const firstFileName = order.items[0].file ? order.items[0].file.name : (order.items[0].fileName || 'Untitled');
      fileDisplay = order.items.length > 1 ? `${firstFileName} (+${order.items.length - 1})` : firstFileName;
    }

    return `
      <tr>
        <td style="font-weight:600;">${order.id}</td>
        <td title="${fileDisplay}">${fileDisplay.length > 20 ? fileDisplay.substring(0,20)+'...' : fileDisplay}</td>
        <td>${formatHistoryDate(order.date)}</td>
        <td style="font-weight:600;color:var(--primary);">₱${order.total.toFixed(2)}</td>
        <td style="text-align:right;">
          <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
            <button class="btn btn-outline" style="padding:0.4rem 0.75rem; font-size:0.8rem;" onclick="viewHistoryReceipt('${order.id}')">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="btn btn-primary" style="padding:0.4rem 0.75rem; font-size:0.8rem;" onclick="reorder('${order.id}')">
              <i class="fas fa-redo"></i> Reorder
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ===== REORDER =====
function reorder(orderId) {
  const order = APP.orders.find(o => o.id === orderId);
  if (!order) return;

  // Clear cart and populate with selected order's items
  APP.cart = [];
  order.items.forEach(item => {
    // Ensure file reference exists
    let fileInLib = APP.files.find(f => f.name === item.file.name);
    if (!fileInLib) {
      fileInLib = { ...item.file, id: Date.now() + Math.random(), date: new Date().toLocaleDateString() };
      APP.files.push(fileInLib);
    }
    
    APP.cart.push({
      ...item,
      file: { ...fileInLib }
    });
  });

  saveState();
  showToast(`Reordered ${pluralize(order.items.length, 'item')} to your cart.`);
  navigateTo('order');
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('Message sent successfully! We\'ll get back to you soon.');
  e.target.reset();
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== UPLOAD ZONE DRAG & DROP =====
function initDragDrop() {
  const zone = document.getElementById('uploadZone');
  if (!zone) return;

  ['dragenter', 'dragover'].forEach(e => {
    zone.addEventListener(e, (ev) => {
      ev.preventDefault();
      zone.style.borderColor = 'var(--primary)';
      zone.style.background = 'var(--secondary)';
    });
  });

  ['dragleave', 'drop'].forEach(e => {
    zone.addEventListener(e, (ev) => {
      ev.preventDefault();
      zone.style.borderColor = '';
      zone.style.background = '';
    });
  });

  zone.addEventListener('drop', (ev) => {
    const files = ev.dataTransfer.files;
    if (files.length) {
      const fakeEvent = { target: { files, value: '' } };
      handleFileUpload(fakeEvent);
    }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  initScrollReveal();
  initDragDrop();
  initNavbarScroll();

  // Restore login state
  if (APP.isLoggedIn && APP.currentUser) {
    updateUIForLogin();
  }

  // Page-specific init
  if (document.getElementById('fileList')) renderFileLibrary();
  if (document.getElementById('cartBody')) renderCart();
  if (document.getElementById('trackingCards')) renderTrackingCards();
  if (document.getElementById('historyBody')) renderOrderHistory();
});
