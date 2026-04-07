/**
 * PRNT Admin Panel — Dashboard Script
 *
 * Responsibilities:
 *   1. Section routing (dashboard built-in; others via iframe)
 *   2. Sidebar & topbar dropdown management
 *   3. Three-dot order action menu
 *   4. Dashboard charts: Today's Orders per Service
 *   5. Toast notification system
 *   6. Global modal system
 *   7. User info sync from localStorage
 */

"use strict";

// GLOBAL STATE MANAGER (SHARED ACROSS IFRAMES)
// Accessible via window.parent.AppState
// SAMPLE DATA (FRONTEND TESTING ONLY)
// BACKEND INTEGRATION POINT — Replace with: GET /api/admin/dashboard
// STATIC UI FALLBACK (NO BACKEND)
const API = "../../api/admin/dashboard.php";

const SAMPLE_DATA = {
	notifications: [],
	newNotifications: [],
	dashboard: {
		todayOrders: 0,
		pendingOrders: 0,
		todayRevenue: 0,
		services: [
			{ name: "Calling Cards", orders: 10 },
			{ name: "Banner Print", orders: 40 },
			{ name: "Booklets", orders: 10 },
			{ name: "Photo Print", orders: 10 },
			{ name: "Document", orders: 10 },
			{ name: "Tarp Print", orders: 10 },
			{ name: "ID Print", orders: 10 },
		],
	},
};

function getServicesAndCount(params) {}

// ── GLOBAL STATE ────────────────────────────────────────────────────────────
let currentSection = "dashboard";
let currentFolder = "dashboard";
let activeModal = null;

// Register Chart.js DataLabels plugin globally
if (window.ChartDataLabels) {
	Chart.register(ChartDataLabels);
}

// ── GLOBAL FUNCTIONS (ACCESSIBLE TO INLINE ONCLICKS) ─────────────────────────
window.toggleAdminSidebar = function () {
	const sidebar = document.getElementById("adminSidebar");
	const overlay = document.getElementById("sidebarOverlay");
	if (sidebar) sidebar.classList.toggle("open");
	if (overlay) overlay.classList.toggle("active");
};

function updateOrderBadge(pendingOrderCount) {
	$("#pendingOrdersBadge").text(`${pendingOrderCount}`);
}
// ── INITIALISE ON DOM READY ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
	// ── Set today's date label on the orders-by-service chart ────────────────
	const dateEl = document.getElementById("ordersChartDate");
	if (dateEl) {
		dateEl.textContent = new Date().toLocaleDateString("en-PH", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	// ============================================================
	// SECTION: SIDEBAR BADGES
	// ============================================================
	window.updateSidebarBadge = function (section, count) {
		let badgeEl;
		if (section === "orders") {
			badgeEl = document.getElementById("pendingOrdersBadge");
		} else if (section === "reports" || section === "messages") {
			badgeEl = document.getElementById("unreadMessagesBadge");
		}

		if (badgeEl) {
			badgeEl.textContent = count;
			badgeEl.style.display = count > 0 ? "inline-flex" : "none";
		}
	};

	// BACKEND INTEGRATION POINT — Replace with: GET /api/admin/metrics
	window.updateSidebarBadge("orders", 0);
	window.updateSidebarBadge("reports", 0);

	// ── Selectors used across multiple sections ───────────────────────────────
	const navLinks = document.querySelectorAll("[data-section]");
	const pageTitle = document.querySelector(".page-title");
	const dynamicSection = document.getElementById("sec-dynamic");
	const dynamicContent = document.getElementById("dynamic-content");
	const adminHeader = document.querySelector(".admin-header");
	const adminBody = document.querySelector(".admin-body");

	// Sections rendered natively (not via iframe)
	const builtInViews = ["dashboard"];

	// ============================================================
	// SECTION: CORE ROUTING
	// Navigates between built-in sections and iframe-based modules.
	// ============================================================
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			const targetSection = this.dataset.section;
			const targetFolder = this.dataset.folder;
			const targetTitle = this.dataset.title;

			// Skip if already on this view
			if (targetSection === currentSection && targetFolder === currentFolder)
				return;

			currentSection = targetSection;
			currentFolder = targetFolder;

			// Update active state on all nav links
			navLinks.forEach((n) => n.classList.remove("active", "profile-active"));
			if (targetFolder === "user profile") {
				document
					.querySelector('.sidebar-profile[data-folder="user profile"]')
					?.classList.add("profile-active");
			} else {
				this.classList.add("active");
			}

			// Hide all sections
			document.querySelectorAll(".admin-section").forEach((sec) => {
				sec.classList.remove("active");
				sec.style.display = "none";
			});

			// Update topbar page title
			if (pageTitle) {
				pageTitle.textContent =
					targetFolder === "user profile"
						? "Admin Profile"
						: targetTitle ||
							this.querySelector(".sb-label")?.textContent ||
							this.textContent.trim();
			}

			// Close sidebar on mobile and clear open dropdowns after navigation
			_closeMobileSidebar();
			if (typeof window.closeAllDropdowns === "function") {
				window.closeAllDropdowns();
			}

			if (builtInViews.includes(targetSection)) {
				// Built-in view (Dashboard)
				if (adminHeader) adminHeader.style.display = "flex";
				if (adminBody) adminBody.style.padding = "";
				const activeSec = document.getElementById("sec-" + targetSection);
				if (activeSec) {
					activeSec.style.display = "block";
					// Small delay so CSS transition fires correctly
					requestAnimationFrame(() => activeSec.classList.add("active"));
				}
			} else {
				// Dynamic iframe module
				if (adminHeader) adminHeader.style.display = "flex";
				if (adminBody) adminBody.style.padding = "0";
				dynamicSection.style.display = "block";

				// Build iframe — NOTE: targetFolder must be a safe, server-validated path
				dynamicContent.innerHTML = `
                    <div style="width:100%;height:calc(100vh - 80px);overflow:hidden;position:relative;background:var(--bg-main);">
                        <iframe
                            src="${encodeURI(targetFolder)}/index.php?v=1.7"
                            style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
                            title="${targetFolder} module"
                            onload="this.contentWindow.focus()">
                        </iframe>
                    </div>`;
				requestAnimationFrame(() => dynamicSection.classList.add("active"));
			}
		});
	});

	/**
	 * navigateTo(section) — programmatic navigation helper.
	 * IMPORTANT: The section string must match a data-section value on a nav link.
	 */
	// GLOBAL FUNCTION (SHARED ACROSS MODULES)
	// Called via window.parent.navigateTo()
	window.navigateTo = function (section) {
		const link = document.querySelector(`[data-section="${section}"]`);
		if (link) link.click();
		else
			console.warn(
				`[PRNT] navigateTo: no nav link found for section "${section}"`,
			);
	};

	function _closeMobileSidebar() {
		const sidebar = document.getElementById("adminSidebar");
		const overlay = document.getElementById("sidebarOverlay");
		if (window.innerWidth <= 992 && sidebar) {
			sidebar.classList.remove("open");
			overlay?.classList.remove("active");
		}
	}

	// Prevent icon child elements from blocking click propagation
	document.querySelectorAll(".sidebar-nav a i").forEach((i) => {
		i.style.pointerEvents = "none";
	});

	// ============================================================
	// SECTION: TOPBAR DROPDOWN (notifications + profile)
	// ============================================================
	window.toggleDropdown = function (id) {
		const dropdown = document.getElementById(id);
		if (!dropdown) return;
		document
			.querySelectorAll(".notification-dropdown, .profile-dropdown")
			.forEach((d) => {
				if (d.id !== id) d.classList.remove("is-visible");
			});
		dropdown.classList.toggle("is-visible");
	};

	window.closeAllDropdowns = function () {
		document.querySelectorAll(".is-visible, .open").forEach((el) => {
			el.classList.remove("is-visible", "open");
			// If there's a previous element that was marked active, clear it too
			el.previousElementSibling?.classList.remove("active", "open");
		});
	};

	document.addEventListener("click", (e) => {
		const isTrigger =
			e.target.closest("#ntToggle") || e.target.closest(".profile-trigger");
		const isInside =
			e.target.closest(".notification-dropdown") ||
			e.target.closest(".profile-dropdown");
		if (!isTrigger && !isInside) window.closeAllDropdowns();
	});

	// ============================================================
	// SECTION: THREE-DOT ORDER ACTION MENU
	// ============================================================

	/** Opens/closes the action dropdown attached to a ⋮ button */
	window.toggleActionMenu = function (btn, e) {
		e.stopPropagation();
		const dropdown = btn.nextElementSibling;
		if (!dropdown) return;
		const isOpen = dropdown.classList.contains("open");
		_closeAllActionMenus();
		if (!isOpen) {
			dropdown.classList.add("open");
			btn.classList.add("active");
			// Flip upward if the dropdown would overflow the viewport bottom
			const rect = dropdown.getBoundingClientRect();
			if (rect.bottom > window.innerHeight - 12) {
				dropdown.style.top = "auto";
				dropdown.style.bottom = "calc(100% + 6px)";
			} else {
				dropdown.style.top = "calc(100% + 6px)";
				dropdown.style.bottom = "auto";
			}
		}
	};

	function _closeAllActionMenus() {
		document.querySelectorAll(".action-dropdown.open").forEach((d) => {
			d.classList.remove("open");
			d.previousElementSibling?.classList.remove("active");
		});
	}

	// Close menus on outside click or Escape
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".action-wrapper")) _closeAllActionMenus();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			_closeAllActionMenus();
			window.closeModal?.();
		}
	});

	// ============================================================
	// SECTION: ORDER ACTION HANDLERS
	// Handles: view, complete, process, pending, delete
	// ============================================================
	// ACTION HANDLER
	const STATUS_MAP = {
		complete: {
			label: "Completed",
			cls: "status-completed",
			toast: "success",
			msg: "marked as Completed",
		},
		process: {
			label: "Processing",
			cls: "status-processing",
			toast: "info",
			msg: "marked as Processing",
		},
		pending: {
			label: "Pending",
			cls: "status-pending",
			toast: "warning",
			msg: "marked as Pending",
		},
	};

	window.handleOrderAction = function (action, orderId, itemEl) {
		_closeAllActionMenus();
		const row = itemEl.closest("tr");
		if (!row) return;

		if (action === "view") {
			_showOrderModal(row, orderId);
			return;
		}

		if (action === "delete") {
			if (!confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
			// BACKEND INTEGRATION POINT
			// Endpoint: /api/admin/orders
			// Method: DELETE
			row.style.transition = "opacity 0.3s ease, transform 0.3s ease";
			row.style.opacity = "0";
			row.style.transform = "translateX(20px)";
			setTimeout(() => row.remove(), 320);
			showToast("Deleted", `Order ${orderId} removed.`, "error");
			return;
		}

		const cfg = STATUS_MAP[action];
		if (!cfg) return;

		// BACKEND INTEGRATION POINT
		// Endpoint: /api/admin/orders
		// Method: PATCH
		const pill = row.querySelector(".status-pill");
		if (pill) {
			pill.className = `status-pill ${cfg.cls}`;
			pill.textContent = cfg.label;
			// Re-add dot pseudo-element via class change (CSS handles it)
		}
		showToast("Updated", `Order ${orderId} ${cfg.msg}.`, cfg.toast);
	};

	/** Render order detail modal */
	function _showOrderModal(row, orderId) {
		const cells = row.querySelectorAll("td");
		const customer = cells[1]?.querySelector("span")?.textContent.trim() || "—";
		const service = cells[2]?.textContent.trim() || "—";
		const amount = cells[3]?.textContent.trim() || "—";
		const status =
			cells[4]?.querySelector(".status-pill")?.textContent.trim() || "—";

		const html = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                <h2 style="margin:0;font-size:1.1rem;font-weight:800;color:var(--text-dark);">Order Details</h2>
                <button onclick="window.closeModal()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.15rem;padding:4px 6px;border-radius:6px;line-height:1;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='none'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;">
                ${[
									["Order ID", orderId],
									["Customer", customer],
									["Service", service],
									["Amount", amount],
									["Status", status],
								]
									.map(
										([k, v]) => `
                <div style="background:var(--surface-2);border-radius:10px;padding:0.9rem 1rem;">
                    <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);font-weight:700;margin-bottom:5px;">${k}</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-dark);">${v}</div>
                </div>`,
									)
									.join("")}
            </div>
            <div style="margin-top:1.4rem;display:flex;justify-content:flex-end;gap:0.65rem;">
                <button onclick="window.closeModal()" style="background:var(--surface-2);color:var(--text-muted);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:0.6rem 1.2rem;font-family:inherit;font-weight:600;font-size:0.85rem;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.color='var(--text-dark)'" onmouseout="this.style.color='var(--text-muted)'">Close</button>
                <button onclick="window.closeModal();showToast('Printing…','Receipt is being prepared.','info')" class="btn-primary"><i class="fas fa-print"></i> Print Receipt</button>
            </div>`;

		window.openModal("orderDetail", html);
	}

	// ============================================================
	// SECTION: REAL-TIME NOTIFICATION ENGINE
	// ============================================================
	// BACKEND INTEGRATION POINT
	// Endpoint: /api/admin/notifications
	// Method: GET

	// ── Notification data store ───────────────────────────────────
	const _notifications = [...SAMPLE_DATA.notifications];

	// ── Auto-expiry: read notifications are removed after 8 hours ────
	const _READ_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
	// BACKEND INTEGRATION POINT — Server-side cleanup preferred for production

	let _nextId = 100; // Counter for simulated new notifications

	// ── Icon / color config per type ─────────────────────────────
	const NT_TYPE = {
		order: { icon: "fa-shopping-bag", bg: "nt-bg-orange", label: "New Order" },
		message: { icon: "fa-envelope", bg: "nt-bg-blue", label: "Message" },
	};

	// ── Render helpers ────────────────────────────────────────────
	function _renderNotificationItem(nt) {
		const text = nt.customer
			? `<strong>${nt.customer}</strong> ${nt.service}`
			: nt.service;

		const el = document.createElement("div");
		el.className = `nt-item${nt.read ? "" : " unread"} type-${nt.type}`;
		el.dataset.id = nt.id;

		const typeCfg = NT_TYPE[nt.type] || NT_TYPE.order;
		el.innerHTML = `
            <div class="nt-icon-wrapper ${typeCfg.bg || ""}">
                <i class="fas ${typeCfg.icon}"></i>
            </div>
            <div class="nt-details">
                <p class="nt-text">${text}</p>
                <span class="nt-time">${nt.time}</span>
            </div>`;
		el.addEventListener("click", () => _markOneAsRead(nt.id, el));
		return el;
	}

	function _refreshList() {
		const list = document.getElementById("ntList");
		if (!list) return;

		// Show latest 10 notifications (most recent first)
		const visible = [..._notifications].reverse().slice(0, 10);

		if (visible.length === 0) {
			list.innerHTML = '<div class="nt-empty">No notifications yet</div>';
		} else {
			list.innerHTML = "";
			visible.forEach((nt) => list.appendChild(_renderNotificationItem(nt)));
		}
		_refreshBadge();
	}

	function _refreshBadge() {
		// TOPBAR NOTIFICATIONS
		const unread = _notifications.filter((n) => !n.read).length;
		const badge = document.getElementById("ntBadge");
		const label = document.getElementById("ntCountLabel");

		if (badge) {
			badge.style.display = unread > 0 ? "inline-block" : "none";
			badge.textContent = unread > 9 ? "9+" : unread;
		}
		if (label) {
			label.textContent = unread > 0 ? `(${unread} unread)` : "";
		}
	}

	// Updates the "Orders" badge in the sidebar
	window.syncSidebarOrdersBadge = function (count) {
		const orderBadge = document.getElementById("pendingOrdersBadge");
		if (orderBadge) {
			orderBadge.style.display = count > 0 ? "inline-block" : "none";
			orderBadge.textContent = count;
		}
		// Also update the dashboard KPI card if it exists
		const kpiOrders = document.getElementById("kpi-pending-orders");
		if (kpiOrders) kpiOrders.textContent = count;
	};

	// Updates the "Reports" badge in the sidebar
	window.syncSidebarReportsBadge = function (count) {
		const reportsBadge = document.getElementById("unreadMessagesBadge");
		if (reportsBadge) {
			reportsBadge.style.display = count > 0 ? "inline-block" : "none";
			reportsBadge.textContent = count;
		}
	};

	// Initial load: Badge counts will be reported by individual modules (Order Mgt / Reports)
	// when they load into the iframe.

	// ── Mark one as read (stamps readAt for 8-hr expiry) ────────
	function _markOneAsRead(id, el) {
		const nt = _notifications.find((n) => n.id === id);
		if (!nt || nt.read) return;
		nt.read = true;
		nt.readAt = Date.now(); // Timestamp used for 8-hour auto-expiry
		el?.classList.remove("unread");
		_refreshBadge();
		// BACKEND INTEGRATION POINT
		// Endpoint: /api/admin/notifications
		// Method: PATCH
	}

	// ── Auto-expiry cleanup ──────────────────────────────────────
	// Removes read notifications that are older than 8 hours.
	// Runs on page load and every 60 seconds thereafter.
	function _purgeExpiredNotifications() {
		const before = _notifications.length;
		const cutoff = Date.now() - _READ_EXPIRY_MS;

		// Remove from array in-place
		for (let i = _notifications.length - 1; i >= 0; i--) {
			const n = _notifications[i];
			if (n.read && n.readAt !== null && n.readAt <= cutoff) {
				_notifications.splice(i, 1);
			}
		}

		// Only re-render if something was actually removed
		if (_notifications.length !== before) {
			_refreshList();
		}
		// BACKEND INTEGRATION POINT
		// Endpoint: /api/admin/notifications
		// Method: DELETE
	}

	// Run once immediately (clears any pre-expired entries from mock data)
	_purgeExpiredNotifications();

	// Then check every 60 seconds
	setInterval(_purgeExpiredNotifications, 60 * 1000);

	// ── Public: mark all as read ─────────────────────────────────
	window.markNotificationAsRead = function (el) {
		// Legacy: still works for static HTML items
		const id = el?.dataset?.id;
		if (id) _markOneAsRead(id, el);
		else el?.classList.replace("unread", "read");
		_refreshBadge();
	};

	window.markAllNotificationsAsRead = function () {
		const now = Date.now();
		_notifications.forEach((n) => {
			if (!n.read) {
				n.read = true;
				n.readAt = now; // Stamp timestamp for 8-hr expiry
			}
		});
		_refreshList();
		showToast(
			"Done",
			"All notifications marked as read. They will be removed after 8 hours.",
			"info",
		);
		// BACKEND INTEGRATION POINT
		// Endpoint: /api/admin/notifications
		// Method: POST
	};

	// ── Public: clear all ────────────────────────────────────────
	window.clearAllNotifications = function () {
		_notifications.length = 0;
		_refreshList();
		// BACKEND INTEGRATION POINT
		// Endpoint: /api/admin/notifications
		// Method: DELETE
	};

	// ── Global: Push Notification & Smart Grouping ───────────────
	let orderBuffer = [];
	let orderBufferTimer = null;

	window.pushGlobalNotification = function (nt) {
		// Silently ignore alerts (stocks/maintenance) as per requirements
		if (nt.type === "alert") return;

		_notifications.unshift(nt);
		_refreshList();

		// Buffer 'order' notifications to avoid toast overlap/spam
		if (nt.type === "order") {
			orderBuffer.push(nt);
			clearTimeout(orderBufferTimer);

			orderBufferTimer = setTimeout(() => {
				const count = orderBuffer.length;
				if (count > 1) {
					window.showGlobalToast(
						"Orders Received",
						`You have ${count} new orders.`,
						"success",
					);
				} else {
					const single = orderBuffer[0];
					const msg = single.customer
						? `${single.customer} — ${single.service}`
						: single.service;
					window.showGlobalToast("New Order", msg, "success");
				}
				orderBuffer = [];
			}, 3000);
		} else {
			// Immediate toast for messages, systems
			const typeLabel = (NT_TYPE[nt.type] || { label: "Notification" }).label;
			const msg = nt.customer ? `${nt.customer} — ${nt.service}` : nt.service;
			const toastType = nt.type === "message" ? "info" : "success";
			window.showGlobalToast(typeLabel, msg, toastType);
		}
	};

	window._pushNotification = window.pushGlobalNotification; // alias for internal references

	// ── Sample Data for Notifications (Backend Ready) ────────────
	function fetchNotifications() {
		console.debug(
			"[PRNT] Action disabled (no backend) - Notification pull bypassed",
		);
	}

	// Poll every 10 seconds (simulation).
	setInterval(fetchNotifications, 10000);

	// ── Initial render ───────────────────────────────────────────
	_refreshList();

	// ============================================================
	// SECTION: GLOBAL USER INFO SYNC
	// Keeps sidebar avatar, topbar name, etc. in sync with profile edits.
	// ============================================================
	window.updateGlobalUserInfo = function (data) {
		if (data.name)
			document
				.querySelectorAll("[data-user-name]")
				.forEach((el) => (el.textContent = data.name));
		if (data.email)
			document
				.querySelectorAll("[data-user-email]")
				.forEach((el) => (el.textContent = data.email));

		// Sync avatar image/initials
		const initials = (data.name || "")
			.split(" ")
			.slice(0, 2)
			.map((w) => (w[0] || "").toUpperCase())
			.join("");

		document.querySelectorAll("[data-user-initials]").forEach((el) => {
			el.innerHTML = data.avatar
				? `<img src="${data.avatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`
				: initials;
		});

		// ACTION DISABLED — STORAGE REMOVED
		console.debug(
			"[PRNT] Action disabled (no storage) - Global user info persistence bypassed",
		);
	};

	// Initialize standard uniform avatar state across the DOM
	// Prioritize localStorage to ensure the change "stays still" after navigation/refresh
	// ACTION DISABLED — STORAGE REMOVED
	const savedUser = {
		name: window.UserInfo.username,
		email: window.UserInfo.email,
		contact_number: window.UserInfo.contact_number,
		date_created: window.UserInfo.date_created,
	};
	const user = {
		name: savedUser.name || "Admin User",
		email: savedUser.email || "admin@prnt.com",
		avatar: savedUser.avatar || "",
	};

	window.updateGlobalUserInfo(user);

	// ============================================================
	// SECTION: GLOBAL TOAST NOTIFICATION SYSTEM
	// ============================================================
	// GLOBAL FUNCTION (SHARED ACROSS MODULES)
	// Called via window.parent.showGlobalToast()
	const toastQueue = [];
	let isShowingToast = false;

	const TOAST_ICONS = {
		success: "fa-circle-check",
		error: "fa-circle-xmark",
		danger: "fa-circle-xmark",
		info: "fa-circle-info",
		warning: "fa-triangle-exclamation",
	};

	window.showGlobalToast = window.showToast = function (
		title,
		message = "",
		type = "success",
	) {
		const container = document.getElementById("toastContainer");
		if (!container) return;

		toastQueue.push({ title, message, type });
		_processToastQueue();
	};

	function _processToastQueue() {
		if (isShowingToast || toastQueue.length === 0) return;

		isShowingToast = true;
		const { title, message, type } = toastQueue.shift();

		const container = document.getElementById("toastContainer");
		const internalClass = type === "error" ? "danger" : type;

		const toast = document.createElement("div");
		toast.className = `global-toast toast-${internalClass}`;

		const displayTxt = message
			? `<strong>${title}</strong> — ${message}`
			: `<strong>${title}</strong>`;
		toast.innerHTML = `
            <i class="fas ${TOAST_ICONS[type] || TOAST_ICONS.info} toast-icon"></i>
            <span>${displayTxt}</span>
            <button class="toast-dismiss-btn" aria-label="Dismiss"><i class="fas fa-xmark"></i></button>
        `;

		container.appendChild(toast);

		// Trigger reflow for animation
		toast.offsetHeight;
		toast.classList.add("show");

		let hideTimeout;
		const startTimeout = () => {
			hideTimeout = setTimeout(() => hideToast(toast), 3500);
		};
		const stopTimeout = () => clearTimeout(hideTimeout);

		toast.addEventListener("mouseenter", stopTimeout);
		toast.addEventListener("mouseleave", startTimeout);
		toast.querySelector(".toast-dismiss-btn").addEventListener("click", () => {
			stopTimeout();
			hideToast(toast);
		});

		startTimeout();
	}

	function hideToast(toast) {
		toast.classList.remove("show");
		setTimeout(() => {
			toast.remove();
			isShowingToast = false;
			_processToastQueue();
		}, 320);
	}

	// ============================================================
	// SECTION: GLOBAL MODAL SYSTEM
	// ============================================================
	// GLOBAL FUNCTION (SHARED ACROSS MODULES)
	// Called via window.parent.openModal() or window.parent.closeModal()
	window.toggleModal = function (id, action = "open", html = null) {
		const overlay = document.getElementById("modalOverlay");
		const body = document.getElementById("modalBody");
		if (!overlay || !body) return;
		if (action === "open") {
			if (html) body.innerHTML = html;
			overlay.style.display = "flex";
			requestAnimationFrame(() => overlay.classList.add("show"));
			activeModal = id;
		} else {
			overlay.classList.remove("show");
			setTimeout(() => {
				overlay.style.display = "none";
				activeModal = null;
			}, 300);
		}
	};
	window.openModal = (id, html) => window.toggleModal(id, "open", html);
	window.closeModal = () => window.toggleModal(null, "close");

	// ============================================================
	// SECTION: REFRESH BUTTON (Today's Orders chart)
	// ============================================================
	document
		.getElementById("refreshOrdersChart")
		?.addEventListener("click", function () {
			this.classList.add("spinning");
			setTimeout(() => this.classList.remove("spinning"), 700);

			// BACKEND INTEGRATION POINT
			// Endpoint: /api/admin/orders
			// Method: GET
			simulateRealTimeUpdate();
			showToast("Refreshed", "Today's dashboard data updated.", "info");
		});

	// ============================================================
	// SECTION: DASHBOARD DATA ENGINE
	// ============================================================

	// BACKEND INTEGRATION POINT
	// Endpoint: /api/admin/dashboard
	// Method: GET

	const dashboardData = JSON.parse(JSON.stringify(SAMPLE_DATA.dashboard));

	/**
	 * simulateRealTimeUpdate — Periodically fluctuates dashboard metrics
	 * to demonstrate live system behavior.
	 */
	function simulateRealTimeUpdate() {
		console.debug(
			"[PRNT] Action disabled (no backend) - Realtime dashboard dashboard metrics bypassed",
		);
	}

	// Interval: 15–30 seconds logic (using 20s as standard)
	setInterval(simulateRealTimeUpdate, 20000);

	// Chart.js shared tooltip style
	const TOOLTIP_DEFAULTS = {
		backgroundColor: "#1e2333",
		borderColor: "#2a2f42",
		borderWidth: 1,
		titleColor: "#e8eaf0",
		bodyColor: "#6b7280",
		padding: 11,
		cornerRadius: 10,
	};

	// ── CHART 1: Today's Orders by Service (Neon Glow Horizontal Bar) ─────
	let ordersPerServiceChart = null;

	const NeonGlowPlugin = {
		id: "neonGlow",
		beforeDatasetsDraw(chart) {
			const {
				ctx,
				chartArea: { left, right },
			} = chart;
			ctx.save();
			chart.getDatasetMeta(0).data.forEach((bar) => {
				ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
				ctx.beginPath();
				ctx.roundRect(left, bar.y - 7, right - left, 14, 7);
				ctx.fill();
			});
			ctx.restore();
		},
		afterDatasetsDraw(chart) {
			const { ctx } = chart;
			ctx.save();
			chart.getDatasetMeta(0).data.forEach((bar) => {
				const { x, y, base } = bar;
				if (x <= base) return;

				// 1. Draw glowing tip dot
				ctx.shadowBlur = 15;
				ctx.shadowColor = "rgba(255, 107, 0, 0.9)";
				ctx.fillStyle = "#fff";
				ctx.beginPath();
				ctx.arc(x, y, 6, 0, Math.PI * 2);
				ctx.fill();

				// 2. Add extra glow to the very end
				ctx.shadowBlur = 10;
				ctx.lineWidth = 2;
				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.stroke();
			});
			ctx.restore();
		},
	};

	function initOrdersPerServiceChart() {
		const canvas = document.getElementById("ordersPerServiceChart");
		if (!canvas) return;
		const ctx = canvas.getContext("2d");

		ordersPerServiceChart = new Chart(canvas, {
			type: "bar",
			plugins: [NeonGlowPlugin],
			data: {
				labels: dashboardData.services.map((s) => s.name),
				datasets: [
					{
						label: "Orders",
						data: dashboardData.services.map((s) => s.orders),
						backgroundColor: (ctx) => {
							const { chartArea } = ctx.chart;
							if (!chartArea) return null;
							const g = ctx.chart.ctx.createLinearGradient(
								chartArea.left,
								0,
								chartArea.right,
								0,
							);
							g.addColorStop(0, "rgba(255, 107, 0, 0)");
							g.addColorStop(0.4, "rgba(255, 107, 0, 0.4)");
							g.addColorStop(1, "rgba(255, 107, 0, 1)");
							return g;
						},
						borderRadius: 12,
						borderSkipped: false,
						barThickness: 14,
					},
				],
			},
			options: {
				indexAxis: "y",
				responsive: true,
				maintainAspectRatio: false,
				animation: { duration: 800, easing: "easeOutQuart" },
				plugins: {
					legend: { display: false },
					datalabels: {
						color: "#9ca3af",
						anchor: "end",
						align: "right",
						offset: 16,
						font: { weight: "700", size: 11, family: "monospace" },
						formatter: (v) => (v > 0 ? v + " ord" : ""),
					},
					tooltip: {
						...TOOLTIP_DEFAULTS,
						callbacks: { label: (ctx) => `  ${ctx.parsed.x} orders today` },
					},
				},
				scales: {
					x: {
						display: true,
						beginAtZero: true,
						grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false },
						ticks: { color: "#6b7280", font: { size: 10 } },
					},
					y: {
						grid: { display: false },
						ticks: {
							color: "#e8eaf0",
							font: { size: 12, weight: "600" },
							padding: 12,
						},
						border: { display: false },
					},
				},
			},
		});
	}

	// ── INIT ALL CHARTS ─────────────────────────────────────────────────────
	initOrdersPerServiceChart();
	// ============================================================
	// SECTION: RESTORE PERSISTED USER STATE
	// ============================================================
	// ACTION DISABLED — STORAGE REMOVED
	console.debug(
		"[PRNT] Action disabled (no storage) - User state retrieval bypassed",
	);
}); // end DOMContentLoaded

function logout() {
	$.ajax({
		type: "POST",
		url: "../../api/user-profile.php",
		data: "action=logout",
		success: function (response) {
			window.location.href = "../../";
		},
	});
}
$(document).ready(function () {
	function updateDashboard() {
		$.ajax({
			type: "GET",
			url: API,
			data: "action=getOrdersCount",
			success: function (response) {
				let reply = JSON.parse(response);

				if (reply.status == "success") {
					SAMPLE_DATA.dashboard.todayOrders = reply.totalOrders;
					SAMPLE_DATA.dashboard.pendingOrders = reply.pendingOrders;
					SAMPLE_DATA.dashboard.todayRevenue = reply.totalRevenue;

					animateValue(
						"kpi-today-orders",
						0,
						SAMPLE_DATA.dashboard.todayOrders,
						100,
					);
					animateValue(
						"kpi-count-revenue",
						0,
						SAMPLE_DATA.dashboard.todayRevenue,
						300,
						"₱ ",
					);
					animateValue(
						"kpi-pending-orders",
						0,
						SAMPLE_DATA.dashboard.pendingOrders,
						300,
					);
				} else {
					console.log(reply.message);
				}
			},
			error: function (xhr, status, error) {
				console.log("AJAX error:", error);
			},
		});
	}

	// Initial load
	updateDashboard();

	// Refresh 10s
	setInterval(updateDashboard, 10000);
});

/**
 * animateValue — Increments/decrements a number element with a smooth "roll-up" effect.
 * @param {string} id - The element ID to update.
 * @param {number} start - Beginning value.
 * @param {number} end - Target value.
 * @param {number} duration - Animation duration in ms.
 * @param {string} prefix - Optional prefix (e.g., "₱ ").
 */
function animateValue(id, start, end, duration = 300, prefix = "") {
	const obj = document.getElementById(id);
	if (!obj) return;

	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		const value = Math.floor(progress * (end - start) + start);
		obj.textContent = prefix + value.toLocaleString();
		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
}
