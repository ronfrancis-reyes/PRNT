// ==========================================================================
// SECTION: GLOBAL MODAL BRIDGE (Iframe-to-Parent)
// ==========================================================================
window.toggleGlobalModal = function(id, action = 'open', htmlContent = null) {
    if (window.parent && window.parent.toggleModal) {
        window.parent.toggleModal(id, action, htmlContent);
    } else if (window.toggleModal) {
        window.toggleModal(id, action, htmlContent);
    } else {
        console.warn("Global Modal System not found.");
    }
};

window.openGlobalModal = (id, html) => window.toggleGlobalModal(id, 'open', html);
window.closeGlobalModal = () => window.toggleGlobalModal(null, 'close');

// ==========================================================================
// SECTION: IFRAME CONTEXT DETECTION
// ==========================================================================
(function() {
    // If the page is loaded inside an iframe, add a helper class for sub-module styling resets
    if (window.self !== window.top) {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('is-iframe');
        });
    }
})();
