const API = "../../../api/dashboard.php";
// Client Dashboard Script
$(document).ready(function () {
	getOrders();
});
function displayOrders(orders) {
	const container = $("#orderList");
	if (orders.length == 0) {
		container.html(`<div style="text-align:center; padding:5rem; color:var(--text-muted);">
        <i class="fas fa-shopping-cart" style="font-size:4rem; margin-bottom:2rem; opacity:0.1;"></i>
        <h3 style="margin-bottom:1rem;">You haven't placed any orders yet.</h3>
        <p style="margin-bottom:2rem;">Start your first printing order today.</p>
        <a href="../service-avail/" class="btn btn-primary">Place Your First Order</a>
	</div>`);
		return;
	} else {
		orders.forEach((order) => {
			container.append(`<div class="order-card-client animate-fade">
		<div style="background:var(--secondary); width:64px; height:64px; border-radius:16px; display:flex; align-items:center; justify-content:center; color:var(--primary); font-size:1.5rem;">
			<i class="fas fa-receipt"></i>
		</div>
		<div>
			<div style="font-weight:800; color:var(--text-dark); font-size:1.25rem;">ORD-${order.order_id}</div>
			<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">Placed on ${order.date_placed}</div>
			<div style="display:flex; gap:1.5rem; font-weight:700; color:var(--text-dark);">
			<span><i class="fas fa-peso-sign" style="color:var(--primary);"></i> ${order.total_price}</span>
			</div>
			<div id="itemsContainer${order.order_id}" style="display:flex; flex-direction:column; font-weight:700; color:var(--text-dark);">
			</div>
		</div>
		<div style="display:flex; flex-direction:column; align-items:flex-end; gap:1rem;">
			<span class="order-status-pill ${designStatus(order.status)}">${order.status}</span>
			<button class="btn btn-outline" style="padding:0.6rem 1.25rem; font-size:0.85rem;" onclick="viewReceipt('${order.id}')">View Details</button>
		</div>
    </div>`);
			getItems(order.order_id);
			//need muna irender ung orders bago idugtong ung
			// items kasi kailangan ng order_id para makuha
			// ung items para mawala ung undefined error sa items
			//kasi ung getItems is hindi nagrereturn ng value, instead
			// nagmamanipulate ng DOM directly, so kailangan munang
			// ma-render ung order card bago idugtong ung items sa loob ng order card na yun
		});
	}
}
function getOrders() {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=getOrders",
		success: function (response) {
			let reply = JSON.parse(response);
			let orders = reply.orders;
			displayOrders(orders);
		},
	});
}
function getItems(order_id) {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=getItems&order_id=" + order_id,
		success: function (response) {
			let reply = JSON.parse(response);
			let items = reply.items;
			displayItems(items, order_id);
		},
	});
}
function displayItems(items, order_id) {
	const container = $("#itemsContainer" + order_id); //para hindi sa isang card lang nakalagay lahat kaya need may id ung container
	items.forEach((item) => {
		container.append(
			`<a href="../../../${item.file_path}"><i class="fas fa-print" style="color:var(--primary);"></i> ${item.service_name}: ${item.file_name}</a>`,
		);
	});
}
function designStatus(status) {
	if (status == "Completed") {
		return "status-completed";
	} else if (status == "Printing") {
		return "status-printing";
	} else if (status == "Rejected") {
		return "status-rejected";
	} else if (status == "Reviewing") {
		return "status-reviewing";
	} else if (status == "For pickup" || status == "For delivery") {
		return "status-ready";
	}
}
