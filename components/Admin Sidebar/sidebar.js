
// ==========================================================================
// SECTION: SIDEBAR TOGGLE (MOBILE)
// ==========================================================================
function toggleAdminSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
}

// ==========================================================================
// SECTION: GLOBAL EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleAdminSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleAdminSidebar);
    }
});