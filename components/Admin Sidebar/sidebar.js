// ==========================================================================
// SECTION: SIDEBAR TOGGLE (MOBILE)
// ==========================================================================
window.toggleAdminSidebar = function () {
	const sidebar = document.getElementById("adminSidebar");
	const overlay = document.getElementById("sidebarOverlay");

	if (!sidebar || !overlay) {
		console.warn("Sidebar or overlay element not found in DOM");
		return;
	}

	if (sidebar && overlay) {
		sidebar.classList.toggle("open");
		overlay.classList.toggle("active");
	}
};

// ==========================================================================
// SECTION: GLOBAL EVENT LISTENERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
	const menuToggle = document.getElementById("menuToggle");
	const overlay = document.getElementById("sidebarOverlay");

	if (overlay) {
		overlay.addEventListener("click", toggleAdminSidebar);
	}
});
