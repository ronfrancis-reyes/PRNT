
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // SECTION: NOTIFICATION PANEL TOGGLE
    // ==========================================
    const ntToggle = document.getElementById('ntToggle');
    const ntPanel = document.getElementById('ntPanel');

    if (ntToggle && ntPanel) {
        ntToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            ntPanel.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!ntPanel.contains(e.target) && e.target !== ntToggle) {
                ntPanel.classList.remove('active');
            }
        });
    }
});
