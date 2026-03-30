/**
 * PRNT GLOBAL SCRIPT
 * Manages shared state, component loading, and global UI interactions
 * across all pages of the platform.
 */

// Centralized Application State — Persisted across sessions via localStorage
const APP_STATE = {
  currentUser: JSON.parse(localStorage.getItem('prnt_user') || 'null'),
  isLoggedIn: !!localStorage.getItem('prnt_user'),
  cart: JSON.parse(localStorage.getItem('prnt_cart') || '[]'),
  files: JSON.parse(localStorage.getItem('prnt_files') || '[]'),
  orders: JSON.parse(localStorage.getItem('prnt_orders') || '[]'),
  receivingOption: 'pickup', // System-wide preference for delivery vs pickup
};

/**
 * COMPONENT LOADER
 * Injects HTML fragments (Navbar, Footer, Sidebars) into specific placeholders.
 * Supports dynamic path resolution and navigation state handling.
 */
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Could not load component at ${componentPath}`);
    const html = await response.text();
    
    const container = document.getElementById(elementId);
    if (!container) return; // Prevent errors if placeholder is missing
    
    container.innerHTML = html;
    
    // Automatically apply 'active' class to the current page link in the header
    if (elementId === 'navbar-placeholder') {
      const currentPath = window.location.pathname;
      const fileName = currentPath.split('/').filter(Boolean).pop() || 'index.html';
      
      document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(fileName) || (fileName === 'index.html' && href === '/')) {
          link.classList.add('active');
        }
      });
    }
  } catch (err) {
    console.warn(`PRNT Framework: Failed to load UI component [${elementId}]`, err);
  }
}

/**
 * GLOBAL NAVIGATION HANDLERS
 * Toggles visibility for mobile menus and administrative sidebars.
 */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  if (menu && overlay) {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

/**
 * STATE PERSISTENCE UTILITY
 * Syncs the local memory state back to the browser's permanent storage.
 */
function saveGlobalState() {
  localStorage.setItem('prnt_user', JSON.stringify(APP_STATE.currentUser));
  localStorage.setItem('prnt_cart', JSON.stringify(APP_STATE.cart));
  localStorage.setItem('prnt_files', JSON.stringify(APP_STATE.files));
  localStorage.setItem('prnt_orders', JSON.stringify(APP_STATE.orders));
}

