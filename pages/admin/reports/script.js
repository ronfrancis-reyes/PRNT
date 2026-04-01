/**
 * PrintHub – Customer Messages Module
 * script.js v2.0
 *
 * All objectives implemented:
 *  1. page-content wrapper
 *  2. Export PDF (html2pdf)
 *  3. Mark toggle (read/unread)
 *  4. Toast — standardised, top-right, high z-index
 *  5. Modal close: button, ESC, outside-click
 *  6. Table improvements
 *  7. Real-time search + status filter
 *  8. Action dropdown (click-based, flip-up safe)
 *  9. Responsive handled in CSS
 * 10. Highlight unread, transitions, empty state
 */

document.addEventListener('DOMContentLoaded', () => {

    // SAMPLE DATA (FRONTEND TESTING ONLY)
    // BACKEND INTEGRATION POINT
    // Endpoint: /api/admin/reports
    // Method: GET
    const SAMPLE_DATA = {
        messages: [
            { id: "1234", status: "unread", name: "John Smith", contact: "0917-123-4567", email: "john.smith@email.com", subject: "Issue with my recent print job (ORD-1234)", message: "Hello, I received my order ORD-1234 yesterday but the colors look washed out compared to the file I submitted. Could you please look into this? I need this resolved before Friday as it is for an event.", date: "Mar 24, 2026", time: "10:30 AM" },
            { id: "1235", status: "read", name: "Sarah Johnson", contact: "0921-555-8899", email: "sarah.j@email.com", subject: "Inquiry about bulk tarpaulin discount", message: "Hi, we are planning a company event and need around 50 tarpaulins printed (4x8 ft each). Do you offer bulk pricing or discounts for large orders? We would also like to know the lead time for this quantity.", date: "Mar 23, 2026", time: "11:15 AM" },
            { id: "1236", status: "read", name: "Mike Brown", contact: "0934-222-1111", email: "mike.b@email.com", subject: "Do you accept rush orders for tomorrow?", message: "Good afternoon! I need 100 copies of a 2-page document printed in colored, both sides. Can this be done by tomorrow morning? Please let me know ASAP so I can place the order today.", date: "Mar 21, 2026", time: "12:45 PM" },
            { id: "1237", status: "unread", name: "Lena Cruz", contact: "0915-777-6655", email: "lena.cruz@email.com", subject: "Request for wedding invitation samples", message: "Hi! I am getting married in June and would like to inquire about your wedding invitation packages. Do you have sample designs we can choose from? Also, what paper stock do you recommend for a premium feel?", date: "Mar 20, 2026", time: "01:20 PM" },
            { id: "1238", status: "read", name: "Carlos Dela Cruz", contact: "0908-444-3322", email: "carlos.dc@email.com", subject: "Lost receipt for order ORD-1190", message: "Good day! I misplaced the receipt for my order ORD-1190 placed last week. Could you send me a copy via email? My email on file is carlos.dc@email.com. Thank you very much.", date: "Mar 18, 2026", time: "02:10 PM" }
        ]
    };

    // =========================================================
    // SECTION: ELEMENT REFS
    // =========================================================
    const searchInput      = document.getElementById('searchInput');
    const statusFilter     = document.getElementById('statusFilter');
    const tableBody        = document.getElementById('tableBody');
    const emptyState       = document.getElementById('emptyState');
    const btnDeleteSelected = document.getElementById('btnDeleteSelected');
    const btnExportPDF     = document.getElementById('btnExportPDF');
    const modalOverlay     = document.getElementById('modalOverlay');
    const modalCard        = document.getElementById('modalCard');
    const toastContainer   = document.getElementById('toastContainer');

    // =========================================================
    // SECTION: TOAST — Redirects to Global Shell
    // =========================================================
    // GLOBAL FUNCTION (SHARED ACROSS MODULES)
    // IFRAME COMMUNICATION BRIDGE
    // Use window.parent.* for shared logic
    function showToast(title, message = '', type = 'success') {
        if (window.parent && window.parent !== window && typeof window.parent.showGlobalToast === 'function') {
            window.parent.showGlobalToast(title, message, type);
        } else {
            console.log(`[Toast Fallback] ${type.toUpperCase()}: ${title} - ${message}`);
        }
    }
    
    // GLOBAL FUNCTION (SHARED ACROSS MODULES)
    // IFRAME COMMUNICATION BRIDGE
    // Use window.parent.* for shared logic
    function pushGlobalNotification(nt) {
        if (window.parent && window.parent !== window && typeof window.parent.pushGlobalNotification === 'function') {
            window.parent.pushGlobalNotification(nt);
        }
    }

    // Expose alias globally just in case other scrips look for it inside the frame
    window.showGlobalToast = window.showToast = showToast;

    // =========================================================
    // SECTION: MODAL — OBJECTIVES 4 & 5
    // open/close with ESC + outside click + close button
    // Global surface: window.openGlobalModal(id, htmlContent)
    // =========================================================
    let _modalOpen = false;

    // MODAL CONTROL
    function openModal(htmlContent, className = '') {
        modalCard.innerHTML = htmlContent;
        modalCard.className = 'modal-card ' + className;
        modalOverlay.style.display = 'flex';

        // Bind close button(s) inside injected content
        modalCard.querySelectorAll('.modal-close-btn, [data-close-modal]').forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        requestAnimationFrame(() => {
            modalOverlay.classList.add('open');
            _modalOpen = true;
        });
    }

    // MODAL CONTROL
    function closeModal() {
        if (!_modalOpen) return;
        modalOverlay.classList.remove('open');
        _modalOpen = false;
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            modalCard.innerHTML = '';
            modalCard.className = 'modal-card'; // reset
        }, 300);
    }

    // OBJECTIVE 5 — ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && _modalOpen) closeModal();
    });

    // OBJECTIVE 5 — Click outside modal card
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Global surface
    window.openGlobalModal  = (id, html) => openModal(html);
    window.closeGlobalModal = closeModal;

    // =========================================================
    // SECTION: HELPERS
    // =========================================================
    function getAllRows() {
        return Array.from(tableBody.querySelectorAll('tr.msg-row'));
    }

    function updateEmptyState() {
        const visibleRows = getAllRows().filter(r => r.style.display !== 'none');
        emptyState.style.display = visibleRows.length === 0 ? 'block' : 'none';
    }

    // =========================================================
    // SECTION: OBJECTIVE 7 — REAL-TIME SEARCH + STATUS FILTER
    // Searches: name, subject (data attributes)
    // =========================================================
    function applyFilters() {
        const query  = (searchInput.value || '').toLowerCase().trim();
        const status = (statusFilter.value || '').toLowerCase();

        getAllRows().forEach(row => {
            const name    = (row.dataset.name    || '').toLowerCase();
            const subject = (row.dataset.subject || '').toLowerCase();
            const rowStatus = (row.dataset.status || '').toLowerCase();

            const matchesSearch = !query || name.includes(query) || subject.includes(query);
            const matchesStatus = !status || rowStatus === status;

            row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
        });

        updateEmptyState();
    }

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);

    // =========================================================
    // SECTION: OBJECTIVE 8 — ACTION DROPDOWN (click-based)
    // Opens on dot-button click, closes on outside click / ESC
    // Flip-up if near viewport bottom
    // =========================================================
    let _openDropdown = null;

    function openDropdown(wrap, dropdown, btn) {
        closeAllDropdowns();

        // OPTIONAL: PORTAL RENDERING (SAFE)
        // Append dropdown to document.body for full visibility
        document.body.appendChild(dropdown);
        
        // Make sure it displays to calculate dimensions
        dropdown.classList.add('open');

        const rect = btn.getBoundingClientRect();
        let top = rect.bottom + 6;
        let left = rect.right - dropdown.offsetWidth;
        
        // Flip-up if near viewport bottom
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < dropdown.offsetHeight + 10 && rect.top > 150) {
            top = rect.top - dropdown.offsetHeight - 6;
        }

        // Apply FIXED positioning relative to the viewport
        dropdown.style.position = 'fixed';
        dropdown.style.top      = top + 'px';
        dropdown.style.left     = left + 'px';
        dropdown.style.right    = 'auto'; // Prevent CSS 'right: 0' conflict
        dropdown.style.zIndex   = '9999';

        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        _openDropdown = { wrap, dropdown, btn };
    }

    function closeAllDropdowns() {
        if (_openDropdown) {
            _openDropdown.dropdown.classList.remove('open');
            // Remove overrides and return dom element to original wrap securely
            _openDropdown.dropdown.style.position = '';
            _openDropdown.dropdown.style.top      = '';
            _openDropdown.dropdown.style.left     = '';
            _openDropdown.dropdown.style.right    = '';
            _openDropdown.dropdown.style.zIndex   = '';
            _openDropdown.wrap.appendChild(_openDropdown.dropdown);
            
            _openDropdown.btn.classList.remove('open');
            _openDropdown.btn.setAttribute('aria-expanded', 'false');
            _openDropdown = null;
        }
    }

    // Delegate dot-button clicks
    document.addEventListener('click', (e) => {
        const dotBtn = e.target.closest('.btn-action-dots');
        if (dotBtn) {
            e.stopPropagation();
            const wrap    = dotBtn.closest('.action-wrap');
            const dropdown = wrap.querySelector('.action-dropdown');

            if (_openDropdown && _openDropdown.dropdown === dropdown) {
                closeAllDropdowns(); // toggle off
            } else {
                openDropdown(wrap, dropdown, dotBtn);
            }
            return;
        }

        // Click inside dropdown — don't close yet (handled by action handlers)
        if (e.target.closest('.action-dropdown')) return;

        // Otherwise close
        closeAllDropdowns();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllDropdowns();
    });

    // =========================================================
    // SECTION: VIEW MESSAGE MODAL
    // =========================================================
    function buildViewModal(row) {
        const name    = row.dataset.name    || '—';
        const contact = row.dataset.contact || '—';
        const email   = row.dataset.email   || '—';
        const message = row.dataset.message || '—';
        const date    = row.dataset.date    || '—';
        const id      = row.dataset.id      || '?';

        return `
            <div class="modal-header">
                <h3><i class="fas fa-envelope-open-text" style="color: var(--orange);"></i> Message Information</h3>
                <button class="modal-close-btn" data-close-modal aria-label="Close dialog" title="Close">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
            <div class="modal-body-inner">
                <div class="detail-section">
                    <h4 class="section-tag" style="color: var(--orange);">CUSTOMER DETAILS</h4>
                    <div class="detail-grid grid-2">
                        <div class="detail-item">
                            <span class="item-label">Name</span>
                            <div class="item-value">${name}</div>
                        </div>
                        <div class="detail-item">
                            <span class="item-label">Contact Number</span>
                            <div class="item-value">${contact}</div>
                        </div>
                    </div>
                    <div class="detail-item" style="margin-top: 10px;">
                        <span class="item-label">Bulsu Email</span>
                        <div class="item-value" style="word-break:break-all;">${email}</div>
                    </div>
                </div>
                <hr style="border: none; border-top: 1px dashed var(--border); margin: 0;">
                <div class="detail-section">
                    <h4 class="section-tag" style="color: var(--orange);">MESSAGE DETAILS</h4>
                    <div class="detail-grid grid-2">
                        <div class="detail-item">
                            <span class="item-label">Message ID</span>
                            <div class="item-value">#MSG-${id}</div>
                        </div>
                        <div class="detail-item">
                            <span class="item-label">Date/Time</span>
                            <div class="item-value">${date}</div>
                        </div>
                    </div>
                </div>
                <div class="accent-box">
                    <span class="accent-label">MESSAGE</span>
                    <p class="accent-content" style="margin-top: 8px;">${message}</p>
                </div>
            </div>
        `;
    }

    // =========================================================
    // SECTION: DELETE CONFIRM MODAL
    // =========================================================
    function buildDeleteModal(row) {
        return `
            <div class="modal-box-sm">
                <div class="delete-icon"><i class="fas fa-triangle-exclamation"></i></div>
                <h3 class="delete-title">Confirm Delete</h3>
                <p class="delete-msg">
                    Are you sure you want to delete this message? This action cannot be undone. 
                    The message from <strong>${row.dataset.name || 'this customer'}</strong> will be permanently removed.
                </p>
                <div class="delete-actions">
                    <button class="btn-cancel" data-close-modal>Cancel</button>
                    <button class="btn-confirm-delete" id="confirmDeleteBtn">
                        <i class="fas fa-trash-can"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    // =========================================================
    // SECTION: ACTION ITEM HANDLERS (delegated)
    // =========================================================
    document.addEventListener('click', (e) => {

        // ── VIEW MESSAGE ──
        const viewBtn = e.target.closest('.action-view');
        if (viewBtn) {
            const row = viewBtn.closest('tr.msg-row') || (_openDropdown ? _openDropdown.wrap.closest('tr.msg-row') : null);
            if (!row) return;
            closeAllDropdowns();

            // Auto-mark as read when viewed
            if (row.dataset.status === 'unread') {
                markRowAsRead(row);
            }

            openModal(buildViewModal(row));
            return;
        }

        // ── DELETE ──
        const deleteBtn = e.target.closest('.action-delete');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr.msg-row') || (_openDropdown ? _openDropdown.wrap.closest('tr.msg-row') : null);
            if (!row) return;
            closeAllDropdowns();
            openModal(buildDeleteModal(row), 'modal-box-sm');

            // Bind confirm button (injected into modal)
            setTimeout(() => {
                const confirmBtn = document.getElementById('confirmDeleteBtn');
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', () => {
                        closeModal();
                        deleteRow(row);
                    });
                }
            }, 50);
            return;
        }
    });

    // =========================================================
    // SECTION: OBJECTIVE 3 — MARK READ / UNREAD
    // =========================================================
    document.addEventListener('markRead', (e) => {
        const row = e.detail.closest('tr.msg-row') || (_openDropdown ? _openDropdown.wrap.closest('tr.msg-row') : null);
        if (!row) return;

        if (row.dataset.status !== 'read') {
            markRowAsRead(row);
            showToast('Marked as Read', '', 'success');
        }
        closeAllDropdowns();
    });

    document.addEventListener('markUnread', (e) => {
        const row = e.detail.closest('tr.msg-row') || (_openDropdown ? _openDropdown.wrap.closest('tr.msg-row') : null);
        if (!row) return;

        if (row.dataset.status !== 'unread') {
            markRowAsUnread(row);
            showToast('Marked as Unread', '', 'info');
        }
        closeAllDropdowns();
    });

    function markRowAsRead(row) {
        row.dataset.status = 'read';
        row.classList.remove('unread');

        const badge = row.querySelector('.badge');
        if (badge) {
            badge.className = 'badge badge-read';
            badge.textContent = 'Read';
        }

        const subject = row.querySelector('.col-subject');
        if (subject) subject.classList.remove('fw-600');
    }

    function markRowAsUnread(row) {
        row.dataset.status = 'unread';
        row.classList.add('unread');

        const badge = row.querySelector('.badge');
        if (badge) {
            badge.className = 'badge badge-unread';
            badge.textContent = 'Unread';
        }

        const subject = row.querySelector('.col-subject');
        if (subject) subject.classList.add('fw-600');
    }

    // =========================================================
    // SECTION: DELETE ROW (with slide-out animation)
    // =========================================================
    // ACTION HANDLER
    function deleteRow(row) {
        // BACKEND INTEGRATION POINT
        // Endpoint: /api/admin/reports
        // Method: DELETE
        row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        row.style.opacity    = '0';
        row.style.transform  = 'translateX(20px)';
        setTimeout(() => {
            row.remove();
            applyFilters(); // refresh empty state
        }, 320);
        showToast('Message Deleted', 'The message has been removed.', 'danger');
    }

    // =========================================================
    // SECTION: DELETE SELECTED (btn toolbar)
    // =========================================================
    // ACTION HANDLER
    btnDeleteSelected.addEventListener('click', () => {
        // Since there are no checkboxes, we treat "Delete Selected" as
        // "Delete all currently visible read messages" — a reasonable fallback.
        // Replace with checkbox logic if re-added in future.
        const readRows = getAllRows().filter(
            r => r.style.display !== 'none' && r.dataset.status === 'read'
        );

        if (readRows.length === 0) {
            showToast('Nothing to delete', 'No read messages are currently visible.', 'info');
            return;
        }

        const html = `
            <div class="modal-box-sm">
                <div class="delete-icon"><i class="fas fa-triangle-exclamation"></i></div>
                <div class="delete-title">Delete ${readRows.length} message${readRows.length > 1 ? 's' : ''}?</div>
                <p class="delete-msg">All visible <strong>read</strong> messages will be permanently removed. This action cannot be undone.</p>
                <div class="delete-actions">
                    <button class="btn-cancel" data-close-modal>Cancel</button>
                    <button class="btn-confirm-delete" id="confirmBulkDelete">
                        <i class="fas fa-trash-can"></i> Delete All
                    </button>
                </div>
            </div>
        `;
        openModal(html, 'modal-box-sm');

        setTimeout(() => {
            const confirmBtn = document.getElementById('confirmBulkDelete');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    closeModal();
                    readRows.forEach(r => deleteRow(r));
                });
            }
        }, 50);
    });

    // =========================================================
    // SECTION: OBJECTIVE 2 — EXPORT PDF
    // Exports the table (data only, no UI controls)
    // TODO: Replace with backend export if needed
    // =========================================================
    // ACTION HANDLER
    function exportToPDF() {
        // Build a clean print-only table (no action/mark columns)
        const rows = getAllRows().filter(r => r.style.display !== 'none');

        if (rows.length === 0) {
            showToast('Nothing to export', 'No messages visible.', 'warning');
            return;
        }

        const tableHTML = `
            <style>
                body { font-family: Inter, sans-serif; font-size: 12px; color: #111; }
                h2   { font-size: 16px; margin-bottom: 8px; }
                p    { font-size: 11px; color: #555; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; }
                th { background: #f3f4f6; text-align: left; padding: 8px 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.7px; border-bottom: 2px solid #e5e7eb; }
                td { padding: 8px 10px; border-bottom: 1px solid #f0f0f0; font-size: 11.5px; }
                tr:nth-child(even) td { background: #fafafa; }
                .badge { padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; }
                .u { background: #fef3c7; color: #92400e; }
                .r { background: #f3f4f6; color: #6b7280; }
            </style>
            <h2>Customer Messages — PrintHub</h2>
            <p>Exported on ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th style="width: 15%;">Date</th>
                        <th style="width: 15%;">Customer</th>
                        <th style="width: 20%;">Subject</th>
                        <th style="width: 40%;">Message</th>
                        <th style="width: 10%;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(r => `
                        <tr>
                            <td>${r.dataset.date    || ''}</td>
                            <td>${r.dataset.name    || ''}</td>
                            <td>${r.dataset.subject || ''}</td>
                            <td style="white-space: normal; line-height: 1.4;">${r.dataset.message || ''}</td>
                            <td><span class="badge ${r.dataset.status === 'unread' ? 'u' : 'r'}">${r.dataset.status === 'unread' ? 'Unread' : 'Read'}</span></td>
                        </tr>`).join('')}
                </tbody>
            </table>
        `;

        const container = document.createElement('div');
        container.innerHTML = tableHTML;
        document.body.appendChild(container);

        html2pdf()
            .set({
                margin:      [10, 10, 10, 10],
                filename:    `customer-messages-${Date.now()}.pdf`,
                image:       { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF:       { unit: 'mm', format: 'a4', orientation: 'landscape' },
            })
            .from(container)
            .save()
            .then(() => {
                document.body.removeChild(container);
                showToast('PDF Exported', 'Customer messages exported successfully.', 'success');
            })
            .catch(() => {
                document.body.removeChild(container);
                showToast('Export Failed', 'Could not generate PDF. Try again.', 'danger');
            });
    }

    btnExportPDF.addEventListener('click', exportToPDF);

    // =========================================================
    // SECTION: DATA RENDERING LAYER
    // =========================================================

    function renderTable(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';
        
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.className = `msg-row ${item.status === 'unread' ? 'unread' : ''}`;
            
            tr.dataset.id = item.id;
            tr.dataset.status = item.status;
            tr.dataset.name = item.name;
            tr.dataset.contact = item.contact || '—';
            tr.dataset.email = item.email;
            tr.dataset.subject = item.subject;
            tr.dataset.message = item.message;
            tr.dataset.date = item.date;

            const badgeClass = item.status === 'unread' ? 'badge-unread' : 'badge-read';
            const badgeText  = item.status === 'unread' ? 'Unread' : 'Read';
            const subjectClass = item.status === 'unread' ? 'fw-600' : '';

            tr.innerHTML = `
                <td class="col-msg-id msg-id">MSG-${item.id}</td>
                <td class="col-customer">${item.name}</td>
                <td class="col-date">${item.time}</td>
                <td class="col-subject message-subject ${subjectClass}">${item.subject}</td>
                <td class="col-status"><span class="badge ${badgeClass}">${badgeText}</span></td>
                <td class="col-actions">
                    <div class="action-wrap">
                        <button class="btn-actions btn-action-dots" aria-expanded="false"><i class="fas fa-ellipsis-vertical"></i></button>
                        <div class="action-dropdown" role="menu">
                            <div class="action-dropdown-label">ACTIONS</div>
                            <button class="action-item action-view" role="menuitem">View Details</button>
                            <div class="action-divider"></div>
                            <button class="action-item action-mark-read" role="menuitem" onclick="document.dispatchEvent(new CustomEvent('markRead', {detail: this}))">Mark read</button>
                            <button class="action-item action-mark-unread" role="menuitem" onclick="document.dispatchEvent(new CustomEvent('markUnread', {detail: this}))">Mark unread</button>
                            <div class="action-divider"></div>
                            <button class="action-item action-delete danger" role="menuitem">Delete</button>
                        </div>
                    </div>
                </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // =========================================================
    // SECTION: INITIAL STATE
    // =========================================================
    renderTable(SAMPLE_DATA.messages);
    applyFilters(); // run once to set empty-state correctly

});