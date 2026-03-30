const API = "../../../api/dashboard.php";
// Client Dashboard Script
$(document).ready(function () {
	getOrders();
});
function renderClientOrders() {
	const orders = JSON.parse(localStorage.getItem("prnt_orders") || "[]");
	const list = document.getElementById("orderList");
	if (!list) return;

	if (orders.length === 0) {
		list.innerHTML = `
      <div style="text-align:center; padding:5rem; color:var(--text-muted);">
        <i class="fas fa-shopping-cart" style="font-size:4rem; margin-bottom:2rem; opacity:0.1;"></i>
        <h3 style="margin-bottom:1rem;">You haven't placed any orders yet.</h3>
        <p style="margin-bottom:2rem;">Start your first printing order today.</p>
        <a href="/pages/client/service-avail/" class="btn btn-primary">Place Your First Order</a>
      </div>
    `;
		return;
	}

	list.innerHTML = orders
		.reverse()
		.map(
			(o) => `
    <div class="order-card-client animate-fade">
      <div style="background:var(--secondary); width:64px; height:64px; border-radius:16px; display:flex; align-items:center; justify-content:center; color:var(--primary); font-size:1.5rem;">
        <i class="fas fa-receipt"></i>
      </div>
      <div>
        <div style="font-weight:800; color:var(--text-dark); font-size:1.25rem;">${o.id}</div>
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">Placed on ${new Date(o.timestamp).toLocaleDateString()}</div>
        <div style="display:flex; gap:1.5rem; font-weight:700; color:var(--text-dark);">
          <span><i class="fas fa-print" style="color:var(--primary);"></i> ${o.items[0].service}</span>
          <span><i class="fas fa-peso-sign" style="color:var(--primary);"></i> ${o.total}</span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:1rem;">
        <span class="order-status-pill ${o.status === "completed" ? "status-completed" : "status-pending"}">${o.status}</span>
        <button class="btn btn-outline" style="padding:0.6rem 1.25rem; font-size:0.85rem;" onclick="viewReceipt('${o.id}')">View Details</button>
      </div>
    </div>
  `,
		)
		.join("");
}
function viewReceipt(id) {
	// Mock finding and setting up for receipt view
	const orders = JSON.parse(localStorage.getItem("prnt_orders") || "[]");
	const order = orders.find((o) => o.id === id);
	if (order) {
		sessionStorage.setItem("prnt_pending_order", JSON.stringify(order));
		window.location.href = "/pages/client/receipt/";
	}
}
function getOrders() {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=get",
		success: function (response) {
			let reply = JSON.parse(response);
		},
	});
}
