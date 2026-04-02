/**
 * PRNT — CUSTOMER PROFILE SCRIPT
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Frontend logic for tab switching, form handling, and mock data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {
    ProfileApp.init();
});

const ProfileApp = {
    /* ── SAMPLE DATA (FRONTEND TESTING ONLY) ── */
    state: {
        user: {
            id: "#PRNT-4829",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@bulsu.edu.ph",
            phone: "+63 912 345 6789",
            avatar: null // Base64 or URL
        },
        orders: []
    },
    /* ───────────────────────────────────────── */

    // ─────────────────────────────────────────────────────────────────────────
    // 2. INITIALIZATION & MOCK DB GENERATOR
    // ─────────────────────────────────────────────────────────────────────────
    init() {
        console.log("Profile Module Initialized");
        this.generateMockOrders();
        this.populateActivityTable();
        this.setupEventListeners();
        this.updateIdentityDisplay();
    },

    generateMockOrders() {
        const services = ['Document Print', 'Photo Print', 'Sticker Print', 'ID Print', 'Poster Print'];
        const types = ['Black & White', 'Colored'];
        const sizes = ['A4', 'Letter', '4x6 Photo Paper', '8x10', 'A3'];
        const locations = ['BSU Hub', 'Activity Center', 'Gate 1', 'Gate 2'];
        const statusesActive = ['Pending', 'Processing', 'Receiving'];
        
        let db = []; // Safe container
        
        // Generate 10 Active Orders with Multiple Items
        for (let i = 1; i <= 10; i++) {
            let numItems = Math.floor(Math.random() * 3) + 2; 
            let items = [];
            let totalAmount = 0;
            for(let j=0; j<numItems; j++) {
                let amount = Math.floor(Math.random() * 150) + 20;
                totalAmount += amount;
                items.push({
                    service: services[Math.floor(Math.random() * services.length)],
                    file: `Project_Part${i}_v${j}.pdf`,
                    price: amount,
                    printType: types[Math.floor(Math.random() * types.length)],
                    paperSize: sizes[Math.floor(Math.random() * sizes.length)],
                    pages: Math.floor(Math.random() * 50) + 1,
                    copies: Math.floor(Math.random() * 5) + 1
                });
            }
            // Generate a random recent date
            const fakeDate = new Date();
            fakeDate.setDate(fakeDate.getDate() - Math.floor(Math.random() * 5));
            fakeDate.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60));

            db.push({
                id: `ORD-80${i.toString().padStart(2, '0')}`,
                date: fakeDate.toISOString(), 
                status: statusesActive[Math.floor(Math.random() * statusesActive.length)],
                amount: totalAmount,
                receiving: Math.random() > 0.5 ? 'Pick-up' : 'Delivery',
                location: locations[Math.floor(Math.random() * locations.length)],
                paymentMethod: i % 2 === 0 ? 'Digital Payment (GCash)' : 'Cash on Pick-up/Delivery',
                notes: Math.random() > 0.5 ? 'Please handle with care.' : '',
                items: items
            });
        }
        
        // Generate 10 History Orders with Multiple Items
        for (let i = 1; i <= 10; i++) {
            let numItems = Math.floor(Math.random() * 3) + 2;
            let items = [];
            let totalAmount = 0;
            for(let j=0; j<numItems; j++) {
                let amount = Math.floor(Math.random() * 100) + 15;
                totalAmount += amount;
                items.push({
                    service: services[Math.floor(Math.random() * services.length)],
                    file: `History_Print_${i}_${j}.png`,
                    price: amount,
                    printType: types[Math.floor(Math.random() * types.length)],
                    paperSize: sizes[Math.floor(Math.random() * sizes.length)],
                    pages: Math.floor(Math.random() * 10) + 1,
                    copies: Math.floor(Math.random() * 3) + 1
                });
            }
            
            const fakeDate = new Date();
            fakeDate.setDate(fakeDate.getDate() - (Math.floor(Math.random() * 30) + 10)); // 10 to 40 days ago
            fakeDate.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));

            db.push({
                id: `ORD-70${i.toString().padStart(2, '0')}`,
                date: fakeDate.toISOString(),
                status: 'Completed',
                amount: totalAmount,
                receiving: Math.random() > 0.5 ? 'Pick-up' : 'Delivery',
                location: locations[Math.floor(Math.random() * locations.length)],
                notes: '',
                items: items
            });
        }
        
        this.state.orders = db;
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. UI INTERACTIONS (TABS, DISPLAYS, AVATAR)
    // ─────────────────────────────────────────────────────────────────────────
    setupEventListeners() {
        // Tab switching is handled via inline onclick
        // Close modal on click outside
        window.onclick = (event) => {
            const modal = document.getElementById('orderModal');
            const reorderModal = document.getElementById('reorderModal');
            if (event.target == modal) {
                this.closeOrderModal();
            }
            if (event.target == reorderModal) {
                this.closeReorderModal();
            }
        };
    },

    switchTab(tabName) {
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-panel').forEach(panel => panel.classList.remove('active'));

        const navItem = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
        const panel = document.getElementById(`panel-${tabName}`);
        
        if (navItem) navItem.classList.add('active');
        if (panel) panel.classList.add('active');

        if (window.innerWidth <= 992) {
            window.scrollTo({ top: document.querySelector('.profile-content').offsetTop - 20, behavior: 'smooth' });
        }
    },

    triggerAvatarUpload() {
        document.getElementById('avatarInput').click();
    },

    handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarContainer = document.getElementById('userAvatar');
                avatarContainer.innerHTML = `<img src="${e.target.result}" alt="User Avatar">`;
                this.showToast("Profile picture updated locally!", "success");
                this.state.user.avatar = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },

    updateIdentityDisplay() {
        const { firstName, lastName } = this.state.user;
        document.getElementById('displayFullName').textContent = `${firstName} ${lastName}`;
        document.getElementById('avatarInitials').textContent = `${firstName[0]}${lastName[0]}`;
    },

    togglePassword(fieldId) {
        const input = document.getElementById(fieldId);
        const icon = input.nextElementSibling.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('far', 'fas');
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fas', 'far');
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. FORM HANDLING & "MOCK API" SIMULATION
    // ─────────────────────────────────────────────────────────────────────────
    handleProfileUpdate(event) {
        event.preventDefault();
        const updatedData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phoneNumber').value
        };
        this.state.user = { ...this.state.user, ...updatedData };
        this.updateIdentityDisplay();
        this.showToast("Changes saved successfully!", "success");
    },

    handlePasswordUpdate(event) {
        event.preventDefault();
        const newPw = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;
        if (newPw !== confirm) {
            this.showToast("New passwords do not match!", "error");
            return;
        }
        this.showToast("Password updated successfully!", "success");
        event.target.reset();
    },

    handleLogout() {
        document.getElementById('logoutModal').style.display = 'flex';
    },

    closeLogoutModal() {
        document.getElementById('logoutModal').style.display = 'none';
    },

    // BACKEND INTEGRATION POINT: DATABASE LOGOUT SESSION CLEARING
    executeLogout() {
        this.showToast("Logging out...", "info");
        setTimeout(() => {
            window.location.href = "../../login/index.php";
        }, 1000);
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 5. MY ORDERS (ACTIVITY) TABLE & MODAL LOGIC
    // ─────────────────────────────────────────────────────────────────────────
    
    filterByStatus(filterType) {
        this.currentFilterType = filterType; // Track the current filter state
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = filterType === 'active' ? 
            document.getElementById('btnFilterActive') : 
            document.getElementById('btnFilterHistory');
        if (activeBtn) activeBtn.classList.add('active');

        const subtitle = document.getElementById('orderPanelSubtitle');
        if (subtitle) {
            subtitle.textContent = filterType === 'active' ? 
                "Track your latest printing orders and their current status." : 
                "Review your past printing transactions and completed orders.";
        }

        const filteredData = this.state.orders.filter(order => {
            const status = order.status.toLowerCase();
            if (filterType === 'active') {
                return ['pending', 'processing', 'receiving'].includes(status);
            } else {
                return ['completed'].includes(status); // "Cancelled" excluded
            }
        });

        this.renderActivityTable(filteredData);
    },

    renderActivityTable(data) {
        const tableBody = document.getElementById('activityTableBody');
        if (!tableBody) return;

        if (data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                        <i class="fas fa-box-open" style="font-size: 2.5rem; display: block; margin-bottom: 1.25rem; opacity: 0.2; color: var(--primary);"></i>
                        <p style="font-weight: 600; font-size: 0.95rem;">No orders found in this category.</p>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = data.map(order => {
            const reorderBtnHTML = this.currentFilterType === 'history' ? 
                `<button class="btn-action" title="Reorder" onclick="reorderOrder('${order.id}')">
                    <i class="fas fa-redo-alt"></i>
                </button>` : '';

            return `
            <tr>
                <td><strong>#${order.id}</strong></td>
                <td>
                    <div style="display:flex; flex-direction:column; line-height:1.2;">
                        <span>${this.formatDate(order.date)}</span>
                        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">${this.formatTime(order.date)}</span>
                    </div>
                </td>
                <td><span class="badge badge-${order.status.toLowerCase()}">${order.status}</span></td>
                <td style="font-weight: 800; color: var(--primary);">₱${Number(order.amount).toFixed(2)}</td>
                <td>
                    <div class="actions-cell">
                        <button class="btn-action" title="View Details" onclick="viewOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${reorderBtnHTML}
                    </div>
                </td>
            </tr>
            `;
        }).join('');
    },

    populateActivityTable() {
        this.filterByStatus('active');
    },

    viewOrderDetails(orderId) {
        const order = this.state.orders.find(o => o.id === orderId);
        if (!order) return;

        const modalBody = document.getElementById('orderModalBody');

        // Detail formatting: 
        // 1. Service Name
        // 2. File Name (Bold, dark)
        // 3. Details: PrintType • PaperSize • Pagesp × Copiesc
        const itemsListHTML = order.items.map(item => `
            <div class="item-row">
                <div class="item-details">
                    <span class="item-service">${item.service}</span>
                    <span class="item-file">${item.file}</span>
                    <span class="item-meta">${item.printType} • ${item.paperSize} • ${item.pages}p × ${item.copies || 1}c</span>
                </div>
                <div class="item-amount">₱${Number(item.price * (item.copies || 1)).toFixed(2)}</div>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div class="receipt-wrapper">
                <button class="receipt-close-btn" onclick="closeOrderModal()"><i class="fas fa-times"></i></button>
                <div class="receipt-watermark" aria-hidden="true">PRNT</div>
                
                <div class="receipt-header">
                    <div class="success-icon"><i class="fas fa-check"></i></div>
                    <h1>Order Receipt: ${order.id}</h1>
                    <div class="header-meta">
                        <span class="badge-status">${order.status}</span>
                    </div>
                    <div class="zigzag"></div>
                </div>

                <div class="receipt-body">
                    <div class="info-section">
                        <div class="section-badge"><div class="badge-icon"><i class="fas fa-info"></i></div> PERSONAL & LOGISTICS</div>
                        <div class="info-grid card-box" style="position:relative; z-index:2;">
                            <div class="info-item"><label>CUSTOMER</label><span>${this.state.user.firstName} ${this.state.user.lastName}</span></div>
                            <div class="info-item"><label>PHONE NUMBER</label><span>${this.state.user.phone}</span></div>
                            <div class="info-item"><label>RECEIVING METHOD</label><span>${order.receiving}</span></div>
                            <div class="info-item"><label>LOCATION</label><span>${order.location}</span></div>
                            <div class="info-item"><label>PAYMENT METHOD</label><span>${order.paymentMethod || 'Cash on Pick-up/Delivery'}</span></div>
                            <div class="info-item"><label>ORDER DATE</label><span>${this.formatDate(order.date)}, ${this.formatTime(order.date)}</span></div>
                        </div>
                    </div>

                    <div class="info-section">
                        <div class="section-badge"><div class="badge-icon"><i class="fas fa-print"></i></div> ORDER SUMMARY</div>
                        <div class="item-list card-box" style="position:relative; z-index:2;">
                            ${itemsListHTML}
                        </div>
                    </div>

                    ${order.notes ? `
                    <div class="info-section">
                        <div class="section-badge"><div class="badge-icon"><i class="fas fa-sticky-note"></i></div> ADDITIONAL NOTES</div>
                        <p class="notes-text card-box" style="position:relative; z-index:2; margin: 0;">${order.notes}</p>
                    </div>
                    ` : `
                    <div class="info-section">
                        <div class="section-badge"><div class="badge-icon"><i class="fas fa-sticky-note"></i></div> ADDITIONAL NOTES</div>
                        <p class="notes-text card-box" style="position:relative; z-index:2; margin: 0; text-align: center; color: var(--text-light);">No additional notes.</p>
                    </div>
                    `}

                    <div class="total-card-premium" style="position:relative; z-index:2;">
                        <div class="total-row-premium"><span>Subtotal</span><span>₱${Number(order.amount).toFixed(2)}</span></div>
                        <div class="total-row-premium"><span>Delivery Fee</span><span>₱0.00</span></div>
                        <div class="divider-line-premium"></div>
                        <div class="grand-total-premium"><span>Total Amount</span><span>₱${Number(order.amount).toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
            <div class="export-receipt-footer" style="position:relative; z-index:10;">
                <button class="btn btn-primary" onclick="exportReceipt()" style="box-shadow: var(--shadow-md); border-radius:100px; padding: 0.75rem 2rem;"><i class="fas fa-download"></i> Export Receipt</button>
            </div>
        `;

        document.getElementById('orderModal').style.display = 'flex';

    },

    closeOrderModal() {
        document.getElementById('orderModal').style.display = 'none';
        document.body.classList.remove('print-mode');
    },

    exportReceipt() {
        // Triggers the browser's print dialog, optimized by @media print in CSS
        document.body.classList.add('print-mode');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('print-mode');
        }, 1000);
    },

    showReorderConfirm(orderId) {
        const confirmBtn = document.getElementById('confirmReorderBtn');
        confirmBtn.onclick = () => this.executeReorder(orderId);
        document.getElementById('reorderModal').style.display = 'flex';
    },

    closeReorderModal() {
        document.getElementById('reorderModal').style.display = 'none';
    },

    // BACKEND INTEGRATION POINT — Reorder Logic
    executeReorder(orderId) {
        const order = this.state.orders.find(o => o.id === orderId);
        if (!order) return;

        // 1. Construct fresh state for the Order Module
        const reorderState = {
            files: [],
            cart: [],
            receivingOption: order.receiving === 'Pick-up' ? 'pick-up' : 'delivery',
            deliveryLocation: order.location || '',
            paymentMethod: order.paymentMethod || 'Cash on Pick-up/Delivery',
            additionalNotes: order.notes || '',
            subtotal: Number(order.amount),
            deliveryFee: 0,
            total: Number(order.amount)
        };

        // 2. Map items and create placeholder file entries
        order.items.forEach((item, index) => {
            const fileId = `reorder-${Date.now()}-${index}`;
            
            reorderState.files.push({
                id: fileId,
                name: item.file,
                size: 'Reordered File',
                type: 'application/pdf'
            });

            reorderState.cart.push({
                id: Date.now() + Math.random(),
                fileId: fileId,
                fileName: item.file,
                service: item.service,
                format: `${item.printType} • ${item.paperSize}`,
                type: item.printType === 'Colored' ? 'color' : 'bw',
                size: item.paperSize,
                pages: item.pages,
                copies: item.copies,
                amount: item.price
            });
        });

        // 3. Persist and Redirect
        try {
            localStorage.setItem('prnt_order_draft', JSON.stringify(reorderState));
            this.closeReorderModal();
            window.location.href = '../order/index.php#summaryPanel';
        } catch (e) {
            console.error("Reorder failed:", e);
            this.showToast("Failed to initiate reorder.", "error");
        }
    },

    formatDate(dateStr) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    },

    formatTime(dateStr) {
        const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
        return new Date(dateStr).toLocaleTimeString('en-US', options);
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 6. UTILITIES (TOASTS)
    // ─────────────────────────────────────────────────────────────────────────
    showToast(message, type = "success") {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const iconMap  = { success: 'fa-check', error: 'fa-exclamation', info: 'fa-info' };
        const colorMap = { success: '#10B981', error: '#EF4444', info: '#3B82F6' };
        const toastColor = colorMap[type] || colorMap.success;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.setProperty('--toast-color', toastColor);
        
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas ${iconMap[type] || iconMap.success}"></i></div>
            <span>${message}</span>`;
            
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
};

// Global Exposure
window.switchTab = ProfileApp.switchTab.bind(ProfileApp);
window.triggerAvatarUpload = ProfileApp.triggerAvatarUpload.bind(ProfileApp);
window.handleAvatarChange = ProfileApp.handleAvatarChange.bind(ProfileApp);
window.togglePassword = ProfileApp.togglePassword.bind(ProfileApp);
window.handleProfileUpdate = ProfileApp.handleProfileUpdate.bind(ProfileApp);
window.handlePasswordUpdate = ProfileApp.handlePasswordUpdate.bind(ProfileApp);
window.handleLogout = ProfileApp.handleLogout.bind(ProfileApp);
window.closeLogoutModal = ProfileApp.closeLogoutModal.bind(ProfileApp);
window.executeLogout = ProfileApp.executeLogout.bind(ProfileApp);
window.filterByStatus = ProfileApp.filterByStatus.bind(ProfileApp);
window.viewOrderDetails = ProfileApp.viewOrderDetails.bind(ProfileApp);
window.closeOrderModal = ProfileApp.closeOrderModal.bind(ProfileApp);
window.reorderOrder = ProfileApp.showReorderConfirm.bind(ProfileApp);
window.closeReorderModal = ProfileApp.closeReorderModal.bind(ProfileApp);
window.exportReceipt = ProfileApp.exportReceipt.bind(ProfileApp);

