// ==========================================================================
// 1. SAMPLE DATA
// ==========================================================================
// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
const state = {
	activeRow: null,
	rowToDelete: null,
};

let orders = [];

// ==========================================================================
// 3. DOM REFERENCES
// ==========================================================================
const dom = {
	tableBody: document.getElementById("tableBody"),
	actionPanel: document.getElementById("actionPanel"),
	modalOverlay: document.getElementById("modalOverlay"),
	modalBody: document.getElementById("modalBody"),
	deleteOverlay: document.getElementById("deleteOverlay"),
	deleteMsg: document.getElementById("deleteMsg"),
	btnConfirmDelete: document.getElementById("btnConfirmDelete"),
	searchInput: document.getElementById("searchInput"),
	statusFilter: document.getElementById("statusFilter"),
};

// ==========================================================================
// 4. EVENT LISTENERS
// ==========================================================================
document.addEventListener("click", (e) => {
	if (!e.target.closest(".btn-actions") && !e.target.closest("#actionPanel")) {
		closeActionPanel();
	}
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		closeModal();
		closeDeleteModal();
		closeActionPanel();
	}
});

if (dom.btnConfirmDelete) {
	dom.btnConfirmDelete.addEventListener("click", () => {
		handleConfirmDelete();
	});
}

// ==========================================================================
// 5. CORE FUNCTIONS
// ==========================================================================
function getOrders() {
	$.ajax({
		type: "POST",
		url: "../../../api/dashboard.php",
		data: "action=getOrders",
		success: function (response) {
			let reply = JSON.parse(response);
			orders = reply.orders;
			renderTable(orders);
		},
	});
}

function renderTable(data) {
	if (!dom.tableBody) return;
	let html = "";
	data.forEach((order) => {
		html += `<tr class="order-row" 
                    data-order-id="${order.order_id}" 
                    data-status="${order.status}"
                    data-customer="${order.name}"
                    data-email="${order.email}"
                    data-phone="${order.contact_number}"
                    data-date="${order.date_placed}"
                    data-time="${order.date_placed}"
                    data-receiving="${order.delivery_option}"
                    data-address="${order.address}"
                    data-notes="${order.notes || "None"}"
                    data-amount="₱${order.total_price}">
                    <td class="order-id">ORD-${order.order_id}</td>
                    <td>${order.name}</td>
                    <td>
                    <div style="display:flex; flex-direction:column; align-items:center; line-height:1.2;">
                        <span style="font-weight: 500;">${order.date_placed}</span>
                        <span style="font-size:0.75rem; color:var(--muted);">${order.date_placed}</span>
                    </div>
                    </td>
                    <td class="amount">₱${order.total_price}</td>
                    <td>${order.delivery_option}</td>
                    <td><span class="badge badge-${designStatus(order.status)}">${order.status}</span></td>
                        <td>
                        <div class="action-wrap">
                            <button class="btn-actions" onclick="toggleMenu(this)">
                            <i class="fas fa-ellipsis-vertical"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
	});

	dom.tableBody.innerHTML = html;
}

function designStatus(status) {
	if (status == "Completed") {
		return "completed";
	} else if (status == "Printing") {
		return "processing";
	} else if (status == "Rejected") {
		return "cancelled";
	} else if (status == "Reviewing") {
		return "pending";
	} else if (status == "For pickup" || status == "For delivery") {
		return "receiving";
	}
}

function closeActionPanel() {
	if (dom.actionPanel) dom.actionPanel.classList.remove("show");
	state.activeRow = null;
}

function showToast(title, message = "", type = "success") {
	if (
		window.parent &&
		window.parent !== window &&
		typeof window.parent.showGlobalToast === "function"
	) {
		window.parent.showGlobalToast(title, message, type);
	} else {
		console.log("[Toast Fallback]", title, message);
	}
}

function syncSidebarBadge() {
	const activeOrders = Array.from(
		document.querySelectorAll("tr.order-row"),
	).filter((row) => {
		const s = row.dataset.status;
		return s === "Reviewing" || s === "Printing" || s === "Receiving";
	}).length;

	if (window.parent && typeof window.parent.updateSidebarBadge === "function") {
		window.parent.updateSidebarBadge("orders", activeOrders);
	}
}

function filterTable() {
	const q = dom.searchInput.value.toLowerCase();
	const s = dom.statusFilter.value;
	document.querySelectorAll("#tableBody tr").forEach((row) => {
		const matchQ = !q || row.innerText.toLowerCase().includes(q);
		const matchS = !s || row.dataset.status === s;
		row.style.display = matchQ && matchS ? "" : "none";
	});
}

function startPolling() {
	console.debug("[PRNT] Action disabled (no backend) - Polling bypassed");
}

// ==========================================================================
// 6. ACTION HANDLERS
// ==========================================================================
function toggleMenu(btn) {
	const panel = dom.actionPanel;
	const row = btn.closest("tr");

	if (state.activeRow === row && panel.classList.contains("show")) {
		closeActionPanel();
		return;
	}

	state.activeRow = row;

	let statusButtons = "";

	if (row.dataset.status !== "Printing") {
		statusButtons += `<button onclick="panelSetStatus('Printing')"><i class="fas fa-gear"></i> Mark as Printing</button>`;
	}
	if (row.dataset.status !== "Out for delivery") {
		statusButtons += `<button onclick="panelSetStatus('For delivery')"><i class="fas fa-truck"></i> Out for delivery</button>`;
	}
	if (row.dataset.status !== "For pickup") {
		statusButtons += `<button onclick="panelSetStatus('For pickup')"><i class="fas fa-gear"></i> Ready for pickup</button>`;
	}
	if (row.dataset.status !== "Completed") {
		statusButtons += `<button onclick="panelSetStatus('Completed')"><i class="fas fa-check-circle"></i> Mark as Completed</button>`;
	}
	if (row.dataset.status !== "Rejected") {
		statusButtons += `<button onclick="panelSetStatus('Rejected')"><i class="fa-solid fa-ban"></i></i> Reject order</button>`;
	} //para ung status lang na di nakaset ung makikita

	panel.innerHTML = `
		<div class="ap-header">Actions</div>
		<button onclick="panelViewDetails('${row.dataset.orderId}')"><i class="fas fa-eye"></i> View Details</button>
		<button onclick="downloadOrderFiles('${row.dataset.orderId}')"><i class="fas fa-print"></i> Print File(s)</button>
		<div class="ap-divider"></div>
		${statusButtons}
		<div class="ap-divider"></div>
		<button class="danger" onclick="panelDelete('${row.dataset.orderId}')"><i class="fas fa-trash-can"></i> Delete this Order</button>
	`;

	const rect = btn.getBoundingClientRect();
	let left = rect.left - 208;
	if (left < 8) left = rect.right + 8;
	panel.style.top = rect.top + "px";
	panel.style.left = left + "px";
	panel.classList.add("show");
}

function getItems(id) {
	return $.ajax({
		type: "POST",
		url: "../../../api/dashboard.php",
		data: "action=getItems&order_id=" + id,
	});
}

function panelViewDetails(id) {
	if (!state.activeRow) return;
	const orderId = state.activeRow.dataset.orderId;
	const order = orders.find((order) => String(order.order_id) === orderId);
	if (!order) return;
	closeActionPanel();

	getItems(parseInt(id))
		.then((response) => {
			let reply = JSON.parse(response);
			order.items = reply.items;

			const itemsHtml = order.items
				.map(
					(item) => `
				<a href="../../..${item.file_path}" style="text-decoration: none;" class="item-row-dark">
					<div class="item-details-dark">
					<div class="item-file-dark">${item.file_name}</div>
					<span class="item-meta-dark">${item.service_name} • ${item.color_type} • ${item.size} • ${item.pages}p × ${item.copies}c</span>
					</div>
					<div class="item-row-right">
					<div class="item-price-dark">₱${item.price}</div>
					</div>
				</a>
				`,
				)
				.join("");

			let deliveryFee = order.delivery_option == "Delivery" ? 10 : 0;
			const html = `
		<div class="receipt-wrapper-dark">
		<div class="receipt-header-dark">
			<div class="receipt-actions">
			<button class="print-btn" onclick="printReceipt()" title="Export/Print Receipt"><i class="fas fa-print"></i></button>
			</div>
			<div class="success-icon"><i class="fas fa-check"></i></div>
			<h1>Order Receipt: ${order.order_id}</h1>
			<div class="header-meta">
			<span class="badge badge-${order.status.toLowerCase()}">${order.status}</span>
			</div>
			<div class="zigzag"></div>
		</div>

		<div class="receipt-body-dark">
			<div class="info-section-dark">
			<div class="section-label-dark"><i class="fas fa-info-circle"></i> Personal & Logistics</div>
			<div class="info-grid-dark">
				<div class="info-item-dark"><label>Customer</label><span>${order.name}</span></div>
				<div class="info-item-dark"><label>Phone Number</label><span>${order.contact_number || "N/A"}</span></div>
				<div class="info-item-dark"><label>Receiving Method</label><span>${order.delivery_option}</span></div>
				<div class="info-item-dark"><label>Location</label><span>${order.address || "---"}</span></div>
				<div class="info-item-dark"><label>Payment Method</label><span>Cash</span></div>
				<div class="info-item-dark"><label>Order Date</label><span>${order.date_placed}</span></div>
			</div>
			</div>

			<div class="info-section-dark">
			<div class="section-label-dark"><i class="fas fa-print"></i> Order Summary</div>
			<div class="item-list-dark">
				${itemsHtml}
			</div>
			</div>

			<div class="info-section-dark">
			<div class="section-label-dark"><i class="fas fa-sticky-note"></i> Additional Notes</div>
			<div class="card-box" style="font-size: 13px; color: var(--text);">${order.note || "No additional notes."}</div>
			</div>

			<div class="total-card-dark">
			<div class="total-row-dark"><span>Subtotal</span><span>₱${order.total_price}</span></div>
			<div class="total-row-dark"><span>Delivery Fee</span><span>₱${deliveryFee.toFixed(2)}</span></div>
			<div class="total-row-dark grand-total">
				<span>Total Amount</span>
				<span>₱${order.total_price}</span>
			</div>
			</div>
		</div>
		</div>
	`;

			dom.modalBody.innerHTML = html;
			dom.modalOverlay.style.display = "flex";
			dom.modalOverlay.classList.add("show");
		})
		.catch((err) => {
			console.log(err);
		});
}

function downloadOrderFiles(orderId) {
	if (!state.activeRow) return;
	const order = orders.find((order) => String(order.order_id) === orderId);
	if (!order) return;

	getItems(parseInt(orderId)).then((response) => {
		let reply = JSON.parse(response);
		order.items = reply.items;
		panelSetStatus("Printing");

		order.items.forEach((item, index) => {
			setTimeout(() => {
				const a = document.createElement("a");
				a.href = `../../..${item.file_path}`;
				a.download = item.file_name;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}, index * 1300); //pang redirect sa files automatically every 200 ms pag maraming file
		});
		showToast("Print command started for " + order.items.length + " file(s)");
	});
}

function printReceipt() {
	window.print();
}
const API = "../../../api/admin/order-management.php";
function panelSetStatus(status) {
	if (!state.activeRow) return;
	const orderId = state.activeRow.dataset.orderId;

	$.ajax({
		type: "POST",
		url: API,
		data: "action=update&id=" + orderId + "&status=" + status,
		success: function (response) {
			getOrders();
			closeActionPanel();
			showToast("Order " + orderId + ' status updated to "' + status + '"');
			syncSidebarBadge();
		},
	});
}

function panelDelete() {
	if (!state.activeRow) return;
	const tr = state.activeRow;
	const orderId = tr.dataset.orderId || "this order";
	state.rowToDelete = tr;
	closeActionPanel();
	dom.deleteMsg.textContent =
		"Are you sure you want to delete order " +
		orderId +
		"? This action cannot be undone.";
	dom.btnConfirmDelete.style.display = "";
	openDeleteModal();
}

function handleConfirmDelete() {
	const orderId = state.rowToDelete.dataset.orderId;

	$.ajax({
		type: "POST",
		url: API,
		data: "action=drop&id=" + orderId,
		success: function (response) {
			getOrders();
			syncSidebarBadge();
			showToast("Order deleted", "Order " + orderId + " was deleted", "danger");
			closeDeleteModal();
		},
	});
}

function closeModal() {
	dom.modalOverlay.classList.remove("show");
	dom.modalOverlay.style.display = "none";
}

function openDeleteModal() {
	dom.deleteOverlay.style.display = "flex";
	dom.deleteOverlay.classList.add("show");
}

function closeDeleteModal() {
	dom.deleteOverlay.classList.remove("show");
	dom.deleteOverlay.style.display = "none";
	dom.btnConfirmDelete.style.display = "";
	state.rowToDelete = null;
}

function confirmDeleteCompleted() {
	const rows = Array.from(document.querySelectorAll("#tableBody tr")).filter(
		(r) => r.dataset.status === "Completed",
	);

	if (!rows.length) {
		dom.deleteMsg.textContent = "There are no completed orders to delete.";
		dom.btnConfirmDelete.style.display = "none";
		openDeleteModal();
		return;
	}

	state.rowToDelete = null;
	dom.deleteMsg.textContent =
		"Are you sure you want to delete all " +
		rows.length +
		" completed order(s)? This action cannot be undone.";
	dom.btnConfirmDelete.style.display = "";
	openDeleteModal();
}

function exportCSV() {
	const data = SAMPLE_DATA.orders;
	if (!data.length) return;

	const headers = [
		"Order ID",
		"Customer Name",
		"Date",
		"Time",
		"Service/s",
		"File/s",
		"Receiving Option",
		"Amount",
		"Status",
	];

	const csvData = [headers.join(",")]
		.concat(
			data.map((order) => {
				const dateObj = new Date(order.date);
				const dateStr = dateObj.toLocaleDateString("en-US", {
					month: "short",
					day: "2-digit",
					year: "numeric",
				});
				const timeStr = dateObj.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				});
				const servicesStr = order.items.map((i) => i.service).join("; ");
				const filesStr = order.items.map((i) => i.file).join("; ");
				const totalAmount =
					order.items.reduce((sum, item) => sum + item.price, 0) +
					(order.receiving === "Delivery" ? 50 : 0);

				return [
					order.orderId,
					order.customer,
					dateStr,
					timeStr,
					servicesStr,
					filesStr,
					order.receiving,
					"₱" + totalAmount.toFixed(2),
					order.status,
				]
					.map((val) => '"' + String(val).replace(/"/g, '""') + '"')
					.join(",");
			}),
		)
		.join("\n");

	const a = document.createElement("a");
	const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
	a.href = URL.createObjectURL(blob);
	a.download = "PRNT_Orders_" + new Date().toISOString().split("T")[0] + ".csv";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

// ==========================================================================
// 7. NAVIGATION
// ==========================================================================
// Module-specific navigation logic goes here

// ==========================================================================
// 8. BACKEND INTEGRATION
// ==========================================================================
// BACKEND INTEGRATION DISABLED

// ==========================================================================
// 9. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
	getOrders();
	syncSidebarBadge();
	startPolling();
});

// GLOBAL EXPOSURE
window.showGlobalToast = window.showToast = showToast;
window.panelViewDetails = panelViewDetails;
window.downloadOrderFiles = downloadOrderFiles;
window.printReceipt = printReceipt;
window.panelSetStatus = panelSetStatus;
window.panelDelete = panelDelete;
window.confirmDeleteCompleted = confirmDeleteCompleted;
window.exportCSV = exportCSV;
window.filterTable = filterTable;
window.closeModal = closeModal;
window.closeDeleteModal = closeDeleteModal;
window.toggleMenu = toggleMenu;
