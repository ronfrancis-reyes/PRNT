// ===============================
// SAMPLE DATA
// ===============================
// SAMPLE DATA
// BACKEND INTEGRATION POINT

// ===============================
// STATE MANAGEMENT
// ===============================
// STATE MANAGEMENT
let activeRow = null;
let rowToDelete = null;
let rowToSuspend = null;

// ===============================
// DOM REFERENCES
// ===============================
let searchInput;
let statusFilter;
let tableBody;
let actionPanel;
let modalOverlay;
let deleteOverlay;
let suspendOverlay;
let toast;
let toastMsg;

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
	console.log("PRNT User Management Module Loaded");

	searchInput = document.getElementById("searchInput");
	statusFilter = document.getElementById("statusFilter");
	tableBody = document.getElementById("tableBody");
	actionPanel = document.getElementById("actionPanel");
	modalOverlay = document.getElementById("modalOverlay");
	deleteOverlay = document.getElementById("deleteOverlay");
	suspendOverlay = document.getElementById("suspendOverlay");
	toast = document.getElementById("toast");
	toastMsg = document.getElementById("toastMsg");

	setupEventListeners();
	getUsers();
});

// ===============================
// EVENT LISTENERS
// ===============================
let users = [];

const API = "../../../api/admin/user-management.php";
function getUsers() {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=getUsers",
		success: function (response) {
			let reply = JSON.parse(response);
			users = reply.users;
			renderUsers(users);
		},
	});
}

function renderUsers(users) {
	let html = "";

	users.forEach((user) => {
		html += `<tr data-user-id="${user.account_id}" 
                    data-name="${user.name}" 
                    data-status="${user.status}" 
                    data-email="${user.email}" 
                    data-contact="${user.contact_number}" 
                    data-total-orders="${user.total_orders}" 
                    data-last-order="${user.last_order_date}" 
                    data-last-file="${user.latest_order}" 
                    
                    <!-- 1. Customer ID (Orange Styling) -->
                    <td class="user-id">USR-${user.account_id}</td>
                    
                    <!-- 2. Customer Name -->
                    <td>${user.name}</td>
                    
                    <!-- 3. Email (Subtle Gray Styling) -->
                    <td class="email">${user.email}</td>
                    
                    <!-- 4. Contact Number -->
                    <td>${user.contact_number}</td>
                    
                    <!-- 5. Order Count (Centered) -->
                    <td class="text-center">${user.total_orders}</td>
                    
                    <!-- 6. Status Badge (Pill Design) -->
                    <td><span class="badge badge-${user.status.toLowerCase()}">${user.status}</span></td>
                    
                    <!-- 7. Action Button (The Dots) -->
                    <td>
                        <div class="action-wrap">
                            <button class="btn-action-dots" onclick="toggleMenu(this)">
                                <i class="fas fa-ellipsis-vertical"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
	});

	$("#tableBody").html(html);
}

function setupEventListeners() {
	// Action Dropdown Toggle
	document.addEventListener("click", (e) => {
		document.addEventListener("click", (e) => {
			const dotBtn = e.target.closest(".btn-action-dots");

			if (dotBtn) {
				e.stopPropagation();
				toggleMenu(dotBtn);
				return;
			}
			closeActionPanel();
		});
	});

	// Action Panel Close
	document.addEventListener("click", (e) => {
		if (
			!e.target.closest(".btn-actions") &&
			!e.target.closest("#actionPanel")
		) {
			closeActionPanel();
		}
	});

	// ESC Key Support
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeModal();
			closeDeleteModal();
			closeSuspendModal();
			closeActionPanel();
		}
	});

	// Confirmation Buttons
	document
		.getElementById("btnConfirmDelete")
		.addEventListener("click", handleConfirmDelete);
	document
		.getElementById("btnConfirmSuspend")
		.addEventListener("click", handleConfirmSuspend);
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

function getFullUserData(row) {
	const d = row.dataset;
	return {
		id: d.userId || "—",
		name: d.name || "—",
		email: d.email || "—",
		contact: d.contact || "—",
		totalOrders: d.totalOrders || "0",
		lastOrder: d.lastOrder || "None",
		lastFile: d.lastFile || "None",
		status: d.status || "Active",
		address: d.address || "No address provided",
	};
}

function filterTable() {
	const q = searchInput.value.toLowerCase();
	const s = statusFilter.value;
	document.querySelectorAll("#tableBody tr").forEach((row) => {
		const matchQ = !q || row.innerText.toLowerCase().includes(q);
		const matchS = !s || row.dataset.status === s;
		row.style.display = matchQ && matchS ? "" : "none";
	});
}

function toggleMenu(btn) {
	const row = btn.closest("tr");

	if (activeRow === row && actionPanel.classList.contains("show")) {
		closeActionPanel();
		return;
	}

	activeRow = row;
	const status = row.dataset.status;

	const suspendBtn =
		status === "Suspended"
			? `<button onclick="panelActivate()"><i class="fas fa-user-check"></i> Activate Customer</button>`
			: `<button onclick="panelSuspend()"><i class="fas fa-user-slash"></i> Suspend Customer</button>`;

	actionPanel.innerHTML = `
        <div class="ap-header">Actions</div>
        <button onclick="panelViewDetails()"><i class="fas fa-eye"></i> View Details</button>
        ${suspendBtn}
        <div class="ap-divider"></div>
        <button class="danger" onclick="panelDelete()"><i class="fas fa-trash"></i> Delete Customer</button>
    `;

	const rect = btn.getBoundingClientRect();
	let left = rect.left - 208;
	if (left < 8) left = rect.right + 8;
	actionPanel.style.top = rect.top + "px";
	actionPanel.style.left = left + "px";
	actionPanel.classList.add("show");
}

function closeActionPanel() {
	actionPanel.classList.remove("show");
	activeRow = null;
}

function openOverlay(id) {
	const o = document.getElementById(id);
	if (!o) return;
	o.style.display = "flex";
	o.classList.add("show");
}

function closeOverlay(id) {
	const o = document.getElementById(id);
	if (!o) return;
	o.classList.remove("show");
	o.style.display = "none";
}

// ===============================
// ACTION HANDLERS
// ===============================

// ACTION HANDLER
function viewUserDetails(target) {
	const row = target.tagName === "TR" ? target : target.closest("tr");
	if (!row) return;

	const user = getFullUserData(row);
	closeActionPanel();

	const actionWrap = target.closest && target.closest(".action-wrap");
	if (actionWrap) {
		const dots = actionWrap.querySelector(".btn-action-dots");
		if (dots) dots.classList.remove("active");
	}

	const set = (sel, val) => {
		const el = document.querySelector(sel);
		if (el) el.textContent = val;
	};

	set(".m-user-id", "USR-" + user.id);
	set(".m-name", user.name);
	set(".m-total-orders", user.totalOrders);
	set(".m-email", user.email);
	set(".m-contact", user.contact);
	set(".m-last-order-date", user.lastOrder);
	set(".m-last-file", user.lastFile);

	const statusEl = document.querySelector(".m-status");
	if (statusEl) {
		statusEl.textContent = user.status;
		statusEl.className = `badge m-status badge-${user.status.toLowerCase()}`;
	}

	openOverlay("modalOverlay");
}

// ACTION HANDLER
function panelViewDetails() {
	if (!activeRow) return;
	viewUserDetails(activeRow);
}

// ACTION HANDLER
function suspendUser(btn) {
	activeRow = btn.closest("tr");
	if (!activeRow) return;

	btn
		.closest(".action-wrap")
		.querySelector(".btn-action-dots")
		.classList.remove("active");

	const name = activeRow.dataset.name || "this user";
	rowToSuspend = activeRow;
	closeActionPanel();
	document.getElementById("suspendMsg").textContent =
		`Are you sure you want to suspend ${name}? They will no longer be able to access the system.`;
	openOverlay("suspendOverlay");
}

// ACTION HANDLER
function deleteUser(btn) {
	activeRow = btn.closest("tr");
	if (!activeRow) return;

	btn.closest(".action-dropdown").classList.remove("open");
	btn
		.closest(".action-wrap")
		.querySelector(".btn-action-dots")
		.classList.remove("active");

	const name = activeRow.dataset.name || "this user";
	rowToDelete = activeRow;
	closeActionPanel();
	document.getElementById("deleteMsg").textContent =
		`Are you sure you want to delete ${name}? This action cannot be undone.`;
	openOverlay("deleteOverlay");
}

// ACTION HANDLER
function panelSuspend() {
	if (!activeRow) return;
	const name = activeRow.dataset.name || "this user";
	rowToSuspend = activeRow;
	closeActionPanel();
	document.getElementById("suspendMsg").textContent =
		`Are you sure you want to suspend ${name}? They will no longer be able to access the system.`;
	openOverlay("suspendOverlay");
}

// ACTION HANDLER
function panelActivate() {
	if (!activeRow) return;
	const row = activeRow;
	const name = row.dataset.name || "";
	closeActionPanel();

	// BACKEND INTEGRATION POINT
	$.ajax({
		type: "POST",
		url: API,
		data: "action=update&id=" + row.dataset.userId + "&status=" + "Active",
		success: function (response) {
			const badge = row.querySelector(".badge");
			badge.textContent = "Active";
			badge.className = "badge badge-active";
			row.dataset.status = "Active";
			showToast(`Customer ${name} has been activated`);
		},
	});
}

// ACTION HANDLER
function panelDelete() {
	if (!activeRow) return;
	const name = activeRow.dataset.name || "this user";
	rowToDelete = activeRow;
	closeActionPanel();
	document.getElementById("deleteMsg").textContent =
		`Are you sure you want to delete ${name}? This action cannot be undone.`;
	openOverlay("deleteOverlay");
}

// ACTION HANDLER
function handleConfirmDelete() {
	// BACKEND INTEGRATION POINT
	if (rowToDelete) {
		const name = rowToDelete.dataset.name || "Customer";
		rowToDelete.remove();
		$.ajax({
			type: "POST",
			url: API,
			data: "action=drop&id=" + rowToDelete.dataset.userId,
			success: function (response) {
				showToast(
					"Customer Deleted",
					`${name} has been removed from the system.`,
					"danger",
				);
			},
		});
	}
	closeDeleteModal();
}

// ACTION HANDLER
function handleConfirmSuspend() {
	// BACKEND INTEGRATION POINT
	if (rowToSuspend) {
		const name = rowToSuspend.dataset.name || "Customer";
		const badge = rowToSuspend.querySelector(".badge");
		badge.textContent = "Suspended";
		badge.className = "badge badge-suspended";
		rowToSuspend.dataset.status = "Suspended";

		$.ajax({
			type: "POST",
			url: API,
			data:
				"action=update&id=" +
				rowToSuspend.dataset.userId +
				"&status=" +
				"Suspended",
			success: function (response) {
				showToast(
					"Customer Suspended",
					`${name} can no longer access the system.`,
					"warning",
				);
			},
		});
	}
	closeSuspendModal();
}

// ACTION HANDLER
function exportCSV() {
	const rows = Array.from(document.querySelectorAll("#tableBody tr")).filter(
		(r) => r.style.display !== "none",
	);
	if (!rows.length) {
		showToast("No data to export", "Try adjusting your filters.", "info");
		return;
	}

	const exportData = rows.map((row) => getFullUserData(row));
	const headers = [
		"Customer ID",
		"Name",
		"Email",
		"Contact Number",
		"Total Orders",
		"Last Order Date",
		"Last Ordered File",
		"Status",
		"Address",
	];

	const data = exportData.map((user) => {
		return [
			user.id,
			user.name,
			user.email,
			user.contact,
			user.totalOrders,
			user.lastOrder,
			user.lastFile,
			user.status,
			user.address,
		]
			.map((val) => `"${String(val).replace(/"/g, '""')}"`)
			.join(",");
	});

	const blob = new Blob([[headers.join(",")].concat(data).join("\n")], {
		type: "text/csv",
	});
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = `PRNT_Customer_Management_${new Date().toISOString().split("T")[0]}.csv`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	showToast(
		"Export Successful",
		"Customer list has been downloaded.",
		"success",
	);
}

// ACTION HANDLER
function closeModal() {
	closeOverlay("modalOverlay");
}

// ACTION HANDLER
function closeDeleteModal() {
	closeOverlay("deleteOverlay");
	rowToDelete = null;
}

// ACTION HANDLER
function closeSuspendModal() {
	closeOverlay("suspendOverlay");
	rowToSuspend = null;
}

// ===============================
// NAVIGATION
// ===============================
// NAVIGATION

// ===============================
// BACKEND INTEGRATION POINTS
// ===============================
/*
BACKEND INTEGRATION POINT
- GET Users: /api/admin/users
- DELETE User: /api/admin/users/{id}
- PATCH User Status: /api/admin/users/{id}
*/

// GLOBAL EXPOSURE FOR INLINE HTML HANDLERS
window.toggleMenu = toggleMenu;
window.panelViewDetails = panelViewDetails;
window.panelSuspend = panelSuspend;
window.panelActivate = panelActivate;
window.panelDelete = panelDelete;
window.closeModal = closeModal;
window.closeDeleteModal = closeDeleteModal;
window.closeSuspendModal = closeSuspendModal;
window.filterTable = filterTable;
window.exportCSV = exportCSV;
window.suspendUser = suspendUser;
window.deleteUser = deleteUser;
window.viewUserDetails = viewUserDetails;
