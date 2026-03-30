function showAuthModal(type) {
	const modalOverlay =
		type === "login"
			? document.getElementById("loginModal")
			: document.getElementById("registerModal");

	if (!modalOverlay) return;

	// Activate overlay
	modalOverlay.classList.add("active");

	// Force inner modal to display (override Bootstrap)
	const innerModal = modalOverlay.querySelector(".modal");
	if (innerModal) {
		innerModal.style.display = "block"; // force visible
		innerModal.style.opacity = "1"; // optional, for transition
		innerModal.style.visibility = "visible"; // optional
		innerModal.style.transform = "translateY(0) scale(1)"; // animation
	}
}

function switchAuthModal(type) {
	closeModal("loginModal");
	closeModal("registerModal");
	setTimeout(() => showAuthModal(type), 200);
}

function closeModal(id) {
	const modalOverlay = document.getElementById(id);
	if (!modalOverlay) return;

	modalOverlay.classList.remove("active");

	// Revert inner modal display to default (so Bootstrap can control it)
	const innerModal = modalOverlay.querySelector(".modal");
	if (innerModal) {
		innerModal.style.display = ""; // remove inline style
	}
}

// Close modals on overlay click
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) {
			closeModal(overlay.id); // use the new closeModal function
		}
	});
});
