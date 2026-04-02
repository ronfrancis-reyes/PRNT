const API = "../../../api/receipt.php";

$(document).ready(getOrderId());

function getOrderId() {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=getId",
		success: function (response) {
			let reply = JSON.parse(response);
			getDetails(reply);
		},
	});
}

function getDetails(orderId) {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=getOrder&id=" + orderId,
		success: function (response) {
			let reply = JSON.parse(response);
			let orderData = reply.orderDetails;
			let orderItems = reply.orderItems;

			showReceipt(orderData, orderItems);
		},
	});
}

function showReceipt(order, items) {
	$("#orderId").html(`
      Order Receipt: ORD-${order.order_id}
    `);
	$("#orderInfo").html(`
      <div class="info-item">
          <label>CUSTOMER</label>
          <span id="custName">${order.name}</span>
      </div>
      <div class="info-item">
          <label>PHONE NUMBER</label>
          <span id="custPhone">${order.contact_number}</span>
      </div>
      <div class="info-item">
          <label>RECEIVING METHOD</label>
          <span id="recvMethod">${order.delivery_option}</span>
      </div>
      <div class="info-item">
          <label>LOCATION</label>
          <span id="recvLoc">${order.building}</span>
      </div>
      <div class="info-item">
          <label>PAYMENT METHOD</label>
          <span id="payMethod">${order.payment_type}</span>
      </div>
      <div class="info-item">
          <label>ORDER DATE</label>
          <span id="orderDate2">${order.date_placed}</span>
      </div>
    `);
	items.forEach((item) => {
		$("#itemList").append(`
      <div class="item-row">
        <div class="item-main">
          <div class="item-name">${item.file_name}</div>
          <div class="item-meta">${item.service_name} &middot; ${item.color_type} &middot; ${item.copies}</div>
        </div>
        <div class="item-amount">P${item.price}</div>
      </div>
    `);
	});
}
