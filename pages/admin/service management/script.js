const API = "../../../api/service-management.php";
// Page-specific JavaScript can go here
let activeCard = null;

function prepareEdit(element) {
	activeCard = element.closest(".service-card");

	// Fill text inputs
	document.getElementById("editName").value =
		activeCard.querySelector(".service-name").textContent;
	document.getElementById("editPrice").value = parseFloat(
		activeCard
			.querySelector(".service-price")
			.textContent.replace(/[^0-9.]/g, ""),
	).toFixed(2);
}

function prepareDelete(element) {
	activeCard = element.closest(".col-md-6");
}

document.addEventListener("DOMContentLoaded", function () {
	// ADD LOGIC
	document
		.getElementById("addServiceForm")
		.addEventListener("submit", function (e) {
			e.preventDefault();

			const name = this.querySelector(
				'input[placeholder="Service Name"]',
			).value;
			const price = this.querySelector('input[placeholder="$0.00"]').value;

			const newCardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="service-card shadow-sm h-100">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h5 class="fw-bold mb-0 service-name">${name}</h5>
                        </div>
                        <div class="form-check form-switch">
                        </div>
                    </div>
                    <div class="price-section my-4">
                        <h3 class="fw-bold mb-0 text-orange service-price">${price}</h3>
                        <p class="text-muted small">per unit</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <div class="actions">
                            <i class="fas fa-edit text-muted me-3 pointer" data-bs-toggle="modal" data-bs-target="#editServiceModal" onclick="prepareEdit(this)"></i>
                            <i class="fas fa-trash text-danger pointer" data-bs-toggle="modal" data-bs-target="#deleteServiceModal" onclick="prepareDelete(this)"></i>
                        </div>
                    </div>
                </div>
            </div>`;

			document
				.getElementById("servicesContainer")
				.insertAdjacentHTML("beforeend", newCardHTML);
			bootstrap.Modal.getInstance(
				document.getElementById("addServiceModal"),
			).hide();
			this.reset();
		});

	// UPDATE LOGIC
	document
		.getElementById("editServiceForm")
		.addEventListener("submit", function (e) {
			e.preventDefault();
			if (activeCard) {
				let payload = {
					service_name: $("#editName").val(),
					price: parseFloat($("#editPrice").val()),
				};
				editService(activeCard.dataset.id, payload); //activeCard.dateset.id is pangkuha ng value ng data-id ng isang html element
			}
		});

	// DELETE LOGIC (Existing)
	document
		.getElementById("confirmDelete")
		.addEventListener("click", function () {
			if (activeCard) {
				activeCard.style.transition = "all 0.4s ease";
				activeCard.style.opacity = "0";
				setTimeout(() => {
					activeCard.remove();
					activeCard = null;
				}, 400);
				bootstrap.Modal.getInstance(
					document.getElementById("deleteServiceModal"),
				).hide();
			}
		});
});

$(document).ready(function () {
	showServices();
});

function showServices() {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=get",
		success: function (response) {
			let data = JSON.parse(response);
			let container = $("#servicesContainer");

			if (data.status != "error") {
				data.forEach((service) => {
					container.append(
						`<div class="col-md-6 col-lg-4" data-id="${service.service_id}">
                            <div class="service-card shadow-sm h-100" data-id="${service.service_id}">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 class="fw-bold mb-0 service-name text-white">${service.service_name}</h5>
                                    </div>
                                </div>
                                <div class="price-section my-4">
                                    <h3 class="fw-bold mb-0 text-orange service-price">₱${service.price}</h3>
                                    <p class="text-muted small">per unit</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <span class="status-pill available">Available</span>
                                <div class="actions">
                                    <i class="fas fa-edit text-muted me-3 pointer" data-bs-toggle="modal" data-bs-target="#editServiceModal" onclick="prepareEdit(this)"></i>
                                    <i class="fas fa-trash text-danger pointer" data-bs-toggle="modal" data-bs-target="#deleteServiceModal" onclick="prepareDelete(this)"></i>
                                </div>
                            </div>
                        </div>
                    </div>`,
					);
				});
			}
		},
	});
}

function editService(id, payload) {
	$.ajax({
		type: "POST",
		url: API,
		data:
			"action=update&id=" +
			encodeURIComponent(id) +
			"&payload=" +
			JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response);
			alert(reply.message);
		},
	});
}
