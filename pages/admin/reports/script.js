// ===============================
// SAMPLE DATA
// ===============================
// SAMPLE DATA
// BACKEND INTEGRATION POINT
// STATIC UI FALLBACK (NO BACKEND)
let messages = [];
const API = "../../../api/admin/reports.php";

// ===============================
// STATE MANAGEMENT
// ===============================
// STATE MANAGEMENT
let _modalOpen = false;
let _openDropdown = null;

// ===============================
// DOM REFERENCES
// ===============================
let searchInput;
let statusFilter;
let tableBody;
let emptyState;
let btnDeleteSelected;
let btnExportPDF;
let modalOverlay;
let modalCard;
let toastContainer;

// ===============================
// EVENT LISTENERS
// ===============================
function setupEventListeners() {
	searchInput.addEventListener("input", applyFilters);
	statusFilter.addEventListener("change", applyFilters);

	// ESC key to close modal
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && _modalOpen) closeModal();
		if (e.key === "Escape") closeAllDropdowns();
	});

	// Click outside modal or dropdown
	modalOverlay.addEventListener("click", (e) => {
		if (e.target === modalOverlay) closeModal();
	});

	document.addEventListener("click", (e) => {
		const dotBtn = e.target.closest(".btn-action-dots");
		if (dotBtn) {
			e.stopPropagation();
			const wrap = dotBtn.closest(".action-wrap");
			const dropdown = wrap.querySelector(".action-dropdown");

			if (_openDropdown && _openDropdown.dropdown === dropdown) {
				closeAllDropdowns();
			} else {
				openDropdown(wrap, dropdown, dotBtn);
			}
			return;
		}

		if (e.target.closest(".action-dropdown")) return;
		closeAllDropdowns();
	});

	// Delegated Action Handlers
	document.addEventListener("click", handleActionClicks);

	// Global Event Triggers
	document.addEventListener("markRead", (e) => handleMarkRead(e.detail));
	document.addEventListener("markUnread", (e) => handleMarkUnread(e.detail));

	btnDeleteSelected.addEventListener("click", handleDeleteSelected);
	btnExportPDF.addEventListener("click", exportToPDF);
}

// ===============================
// CORE FUNCTIONS / LOGIC
// ===============================

function showToast(title, message = "", type = "success") {
	if (
		window.parent &&
		window.parent !== window &&
		typeof window.parent.showGlobalToast === "function"
	) {
		window.parent.showGlobalToast(title, message, type);
	} else {
		console.log(
			`[Toast Fallback] ${type.toUpperCase()}: ${title} - ${message}`,
		);
	}
}

function pushGlobalNotification(nt) {
	if (
		window.parent &&
		window.parent !== window &&
		typeof window.parent.pushGlobalNotification === "function"
	) {
		window.parent.pushGlobalNotification(nt);
	}
}

// MODAL CONTROL
function openModal(htmlContent, className = "") {
	modalCard.innerHTML = htmlContent;
	modalCard.className = "modal-card " + className;
	modalOverlay.style.display = "flex";

	modalCard
		.querySelectorAll(".modal-close-btn, [data-close-modal]")
		.forEach((btn) => {
			btn.addEventListener("click", closeModal);
		});

	requestAnimationFrame(() => {
		modalOverlay.classList.add("open");
		_modalOpen = true;
	});
}

// MODAL CONTROL
function closeModal() {
	if (!_modalOpen) return;
	modalOverlay.classList.remove("open");
	_modalOpen = false;
	setTimeout(() => {
		modalOverlay.style.display = "none";
		modalCard.innerHTML = "";
		modalCard.className = "modal-card";
	}, 300);
}

function getAllRows() {
	return Array.from(tableBody.querySelectorAll("tr.msg-row"));
}

function updateEmptyState() {
	const visibleRows = getAllRows().filter((r) => r.style.display !== "none");
	emptyState.style.display = visibleRows.length === 0 ? "block" : "none";
}

function applyFilters() {
	const query = (searchInput.value || "").toLowerCase().trim();
	const status = (statusFilter.value || "").toLowerCase();

	getAllRows().forEach((row) => {
		const name = (row.dataset.name || "").toLowerCase();
		const subject = (row.dataset.subject || "").toLowerCase();
		const rowStatus = (row.dataset.status || "").toLowerCase();

		const matchesSearch =
			!query || name.includes(query) || subject.includes(query);
		const matchesStatus = !status || rowStatus === status;

		row.style.display = matchesSearch && matchesStatus ? "" : "none";
	});

	updateEmptyState();
}

function openDropdown(wrap, dropdown, btn) {
	closeAllDropdowns();
	document.body.appendChild(dropdown);
	dropdown.classList.add("open");

	const rect = btn.getBoundingClientRect();
	let top = rect.bottom + 6;
	let left = rect.right - dropdown.offsetWidth;

	const spaceBelow = window.innerHeight - rect.bottom;
	if (spaceBelow < dropdown.offsetHeight + 10 && rect.top > 150) {
		top = rect.top - dropdown.offsetHeight - 6;
	}

	dropdown.style.position = "fixed";
	dropdown.style.top = top + "px";
	dropdown.style.left = left + "px";
	dropdown.style.right = "auto";
	dropdown.style.zIndex = "9999";

	btn.classList.add("open");
	btn.setAttribute("aria-expanded", "true");
	_openDropdown = { wrap, dropdown, btn };
}

function closeAllDropdowns() {
	if (_openDropdown) {
		_openDropdown.dropdown.classList.remove("open");
		_openDropdown.dropdown.style.position = "";
		_openDropdown.dropdown.style.top = "";
		_openDropdown.dropdown.style.left = "";
		_openDropdown.dropdown.style.right = "";
		_openDropdown.dropdown.style.zIndex = "";
		_openDropdown.wrap.appendChild(_openDropdown.dropdown);
		_openDropdown.btn.classList.remove("open");
		_openDropdown.btn.setAttribute("aria-expanded", "false");
		_openDropdown = null;
	}
}

function buildViewModal(row) {
	const name = row.dataset.name || "—";
	const contact = row.dataset.contact || "—";
	const email = row.dataset.email || "—";
	const message = row.dataset.message || "—";
	const date = row.dataset.date || "—";
	const id = row.dataset.id || "?";

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
                    <div class="detail-message">
                        <span class="message-label">Name</span>
                        <div class="message-value">${name}</div>
                    </div>
                    <div class="detail-message">
                        <span class="message-label">Email</span>
                        <div class="message-value" style="word-break:break-all;">${email}</div>
                    </div>
                </div>

            </div>
            <hr style="border: none; border-top: 1px dashed var(--border); margin: 0;">
            <div class="detail-section">
                <h4 class="section-tag" style="color: var(--orange);">MESSAGE DETAILS</h4>
                <div class="detail-grid grid-2">
                    <div class="detail-message">
                        <span class="message-label">Message ID</span>
                        <div class="message-value">#MSG-${id}</div>
                    </div>
                    <div class="detail-message">
                        <span class="message-label">Date & Time</span>
                        <div class="message-value">${date} — ${row.dataset.time || ""}</div>
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

function buildDeleteModal(row) {
	return `
        <div class="modal-box-sm">
            <div class="delete-icon"><i class="fas fa-triangle-exclamation"></i></div>
            <h3 class="delete-title">Confirm Delete</h3>
            <p class="delete-msg">
                Are you sure you want to delete this message? This action cannot be undone. 
                The message from <strong>${row.dataset.name || "this customer"}</strong> will be permanently removed.
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

function markRowAsRead(row) {
	row.dataset.status = "read";
	row.classList.remove("unread");
	const badge = row.querySelector(".badge");
	if (badge) {
		badge.className = "badge badge-read";
		badge.textContent = "Read";
	}
	const subject = row.querySelector(".col-subject");
	if (subject) subject.classList.remove("fw-600");
	syncSidebarBadge();
}

function markRowAsUnread(row) {
	row.dataset.status = "unread";
	row.classList.add("unread");
	const badge = row.querySelector(".badge");
	if (badge) {
		badge.className = "badge badge-unread";
		badge.textContent = "Unread";
	}
	const subject = row.querySelector(".col-subject");
	if (subject) subject.classList.add("fw-600");
	syncSidebarBadge();
}

function getMessages() {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=get",
		success: function (response) {
			let reply = JSON.parse(response);
			messages = reply.messages;
			console.log(reply.messages);
			renderTable(messages);
		},
	});
}

function renderTable(messages) {
	if (!tableBody) return;
	tableBody.innerHTML = "";

	messages.forEach((message) => {
		const tr = document.createElement("tr");
		tr.className = `msg-row ${message.status === "UNREAD" ? "unread" : ""}`;

		tr.dataset.id = message.message_id;
		tr.dataset.status = message.status;
		tr.dataset.name = message.name;
		tr.dataset.email = message.email;
		tr.dataset.subject = message.subject;
		tr.dataset.message = message.message;
		tr.dataset.date = message.date;
		tr.dataset.time = message.time;

		const badgeClass =
			message.status === "UNREAD" ? "badge-unread" : "badge-read";
		const badgeText = message.status === "UNREAD" ? "Unread" : "Read";
		const subjectClass = message.status === "UNREAD" ? "fw-600" : "";

		tr.innerHTML = `
            <td class="col-msg-id msg-id">MSG-${message.message_id}</td>
            <td class="col-customer">${message.name}</td>
            <td class="col-date">
                <div style="display:flex; flex-direction:column; align-items:center; line-height:1.2;">
                    <span style="font-weight: 500;">${message.date}</span>
                    <span style="font-size:0.75rem; color:var(--muted);">${message.time}</span>
                </div>
            </td>
            <td class="col-message message-snippet ${subjectClass}">${message.subject}</td>
            <td class="col-status"><span class="badge ${badgeClass}">${badgeText}</span></td>
            <td class="col-actions">
                <div class="action-wrap">
                    <button class="btn-actions btn-action-dots" aria-expanded="false"><i class="fas fa-ellipsis-vertical"></i></button>
                    <div class="action-dropdown" role="menu">
                        <div class="action-dropdown-label">ACTIONS</div>
                        <button class="action-message action-view  action-item" role="menuitem"><i class="fas fa-eye" style="margin-right: 0.5rem"></i>
                        View Details</button>
                        <div class="action-divider"></div>
                        <button class="action-message action-mark-read action-item" role="menuitem" onclick="document.dispatchEvent(new CustomEvent('markRead', {detail: this}))"><i class="fa-solid fa-envelope-open" style="margin-right: 0.5rem"></i>Mark read</button>
                        <button class="action-message action-mark-unread action-item" role="menuitem" onclick="document.dispatchEvent(new CustomEvent('markUnread', {detail: this}))"><i class="fa-solid fa-envelope" style="margin-right: 0.5rem"></i>Mark unread</button>
                        <div class="action-divider"></div>
                        <button class="action-message action-delete action-item danger" role="menuitem"><i class="fas fa-trash" style="margin-right: 0.5rem"></i>Delete</button>
                    </div>
                </div>
            </td>
        `;
		tableBody.appendChild(tr);
	});
}

function syncSidebarBadge() {
	const unreadCount = getAllRows().filter(
		(r) => r.dataset.status === "UNREAD",
	).length;
	if (window.parent && typeof window.parent.updateSidebarBadge === "function") {
		window.parent.updateSidebarBadge("reports", unreadCount);
	}
}

function startPolling() {
	console.debug("[PRNT] Action disabled (no backend) - Polling bypassed");
}

// ===============================
// ACTION HANDLERS
// ===============================

// ACTION HANDLER
function handleActionClicks(e) {
	const viewBtn = e.target.closest(".action-view");
	if (viewBtn) {
		const row =
			viewBtn.closest("tr.msg-row") ||
			(_openDropdown ? _openDropdown.wrap.closest("tr.msg-row") : null);
		if (!row) return;
		closeAllDropdowns();
		if (row.dataset.status === "unread") markRowAsRead(row);
		openModal(buildViewModal(row));
		return;
	}

	const deleteBtn = e.target.closest(".action-delete");
	if (deleteBtn) {
		const row =
			deleteBtn.closest("tr.msg-row") ||
			(_openDropdown ? _openDropdown.wrap.closest("tr.msg-row") : null);
		if (!row) return;
		closeAllDropdowns();
		openModal(buildDeleteModal(row), "modal-box-sm");
		setTimeout(() => {
			const confirmBtn = document.getElementById("confirmDeleteBtn");
			if (confirmBtn) {
				confirmBtn.addEventListener("click", () => {
					closeModal();
					deleteRow(row);
				});
			}
		}, 50);
		return;
	}
}

// ACTION HANDLER
function handleMarkRead(element) {
	const row =
		element.closest("tr.msg-row") ||
		(_openDropdown ? _openDropdown.wrap.closest("tr.msg-row") : null);
	if (!row) return;
	if (row.dataset.status !== "read") {
		markRowAsRead(row);
		showToast("Marked as Read", "", "success");
	}
	closeAllDropdowns();
}

// ACTION HANDLER
function handleMarkUnread(element) {
	const row =
		element.closest("tr.msg-row") ||
		(_openDropdown ? _openDropdown.wrap.closest("tr.msg-row") : null);
	if (!row) return;
	if (row.dataset.status !== "unread") {
		markRowAsUnread(row);
		showToast("Marked as Unread", "", "info");
	}
	closeAllDropdowns();
}

// ACTION HANDLER
function deleteRow(row) {
	// BACKEND INTEGRATION POINT
	row.style.transition = "opacity 0.3s ease, transform 0.3s ease";
	row.style.opacity = "0";
	row.style.transform = "translateX(20px)";
	setTimeout(() => {
		row.remove();
		applyFilters();
		syncSidebarBadge();
	}, 320);
	showToast("Message Deleted", "The message has been removed.", "danger");
}

// ACTION HANDLER
function handleDeleteSelected() {
	const readRows = getAllRows().filter(
		(r) => r.style.display !== "none" && r.dataset.status === "read",
	);

	if (readRows.length === 0) {
		showToast(
			"Nothing to delete",
			"No read messages are currently visible.",
			"info",
		);
		return;
	}

	const html = `
        <div class="modal-box-sm">
            <div class="delete-icon"><i class="fas fa-triangle-exclamation"></i></div>
            <div class="delete-title">Delete ${readRows.length} message${readRows.length > 1 ? "s" : ""}?</div>
            <p class="delete-msg">All visible <strong>read</strong> messages will be permanently removed. This action cannot be undone.</p>
            <div class="delete-actions">
                <button class="btn-cancel" data-close-modal>Cancel</button>
                <button class="btn-confirm-delete" id="confirmBulkDelete">
                    <i class="fas fa-trash-can"></i> Delete All
                </button>
            </div>
        </div>
    `;
	openModal(html, "modal-box-sm");

	setTimeout(() => {
		const confirmBtn = document.getElementById("confirmBulkDelete");
		if (confirmBtn) {
			confirmBtn.addEventListener("click", () => {
				closeModal();
				readRows.forEach((r) => deleteRow(r));
			});
		}
	}, 50);
}

// ACTION HANDLER
function exportToPDF() {
	const rows = getAllRows().filter((r) => r.style.display !== "none");
	if (rows.length === 0) {
		showToast("Nothing to export", "No messages visible.", "warning");
		return;
	}

	try {
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF("l", "mm", "a4");
		const dateStr = new Date().toISOString().split("T")[0];
		const timestamp = new Date().toLocaleString("en-US", {
			dateStyle: "medium",
			timeStyle: "short",
		});

		doc.setFontSize(18);
		doc.setTextColor(244, 120, 32);
		doc.text("PRNT — Customer Messages Report", 14, 15);
		doc.setFontSize(10);
		doc.setTextColor(100);
		doc.text(`Generated: ${timestamp}`, 14, 22);

		const tableData = rows.map((r) => [
			`#MSG-${r.dataset.id}`,
			r.dataset.name,
			`${r.dataset.date}\n${r.querySelector(".col-date span:last-child")?.textContent || ""}`,
			r.dataset.message,
			r.dataset.status.toUpperCase(),
		]);

		doc.autoTable({
			head: [["ID", "Customer", "Date & Time", "Message Content", "Status"]],
			body: tableData,
			startY: 28,
			theme: "grid",
			headStyles: {
				fillColor: [244, 120, 32],
				textColor: 255,
				halign: "center",
				fontStyle: "bold",
			},
			styles: {
				fontSize: 9,
				cellPadding: 5,
				valign: "middle",
				halign: "left",
				overflow: "linebreak",
			},
			columnStyles: {
				0: { cellWidth: 22, halign: "center" },
				1: { cellWidth: 35, fontStyle: "bold" },
				2: { cellWidth: 35, halign: "center" },
				3: { cellWidth: "auto" },
				4: { cellWidth: 20, halign: "center" },
			},
			alternateRowStyles: { fillColor: [250, 250, 250] },
			margin: { top: 30 },
			didDrawPage: (data) => {
				const str = "Page " + doc.internal.getNumberOfPages();
				doc.setFontSize(8);
				doc.setTextColor(150);
				doc.text(
					str,
					data.settings.margin.left,
					doc.internal.pageSize.getHeight() - 10,
				);
				doc.text(
					"Generated by PRNT Management System",
					doc.internal.pageSize.getWidth() - 65,
					doc.internal.pageSize.getHeight() - 10,
				);
			},
		});

		doc.save(`PRNT_Customer Message_${dateStr}.pdf`);
		showToast(
			"PDF Exported",
			"Customer messages exported successfully.",
			"success",
		);
	} catch (err) {
		console.error("PDF Export error:", err);
		showToast(
			"Export Failed",
			"Internal error during PDF generation.",
			"danger",
		);
	}
}

// ===============================
// NAVIGATION
// ===============================
// NAVIGATION
function goToDashboard() {
	if (window.parent && typeof window.parent.navigateTo === "function") {
		window.parent.navigateTo("dashboard");
	}
}

// ===============================
// BACKEND INTEGRATION POINTS
// ===============================
// BACKEND INTEGRATION POINT

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
	console.log("PRNT Reports Module Loaded — v2.5 (10 Samples Active)");

	searchInput = document.getElementById("searchInput");
	statusFilter = document.getElementById("statusFilter");
	tableBody = document.getElementById("tableBody");
	emptyState = document.getElementById("emptyState");
	btnDeleteSelected = document.getElementById("btnDeleteSelected");
	btnExportPDF = document.getElementById("btnExportPDF");
	modalOverlay = document.getElementById("modalOverlay");
	modalCard = document.getElementById("modalCard");
	toastContainer = document.getElementById("toastContainer");

	setupEventListeners();
	getMessages();
	applyFilters();
	syncSidebarBadge();
	startPolling();
});
