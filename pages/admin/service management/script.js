// SAMPLE DATA (FRONTEND TESTING ONLY)
// BACKEND INTEGRATION POINT
// Endpoint: /api/admin/services
// Method: GET
const SAMPLE_DATA = {
	services: [], // Note: Initial data is populated directly in HTML via PHP
};

let activeCard = null;

const API = "../../../api/admin/service-management.php";

// MODAL CONTROL
function prepareEdit(element) {
	activeCard = element.closest(".service-card");

	const serviceId = activeCard.dataset.id;
	const serviceName = activeCard.dataset.name;
	const serviceFormats = JSON.parse(activeCard.dataset.formats); // array of {size, price, size_id}
	const isAvailable = activeCard.dataset.available === "true";

	// Set service name
	document.getElementById("editName").value = serviceName;

	// Set availability
	document.getElementById("editAvailCheck").checked = isAvailable;

	// Populate formats
	const container = document.getElementById("editFormatContainer");
	container.innerHTML = ""; // clear previous rows

	serviceFormats.forEach((item) => {
		addEditFormatRow(item.size, item.price, item.size_id);
	});

	// Store service id on form
	document.getElementById("editServiceForm").dataset.id = serviceId;
}

let removedFormatIds = [];
function addEditFormatRow(size = "", price = "", sizeId = null) {
	const container = document.getElementById("editFormatContainer");

	const row = document.createElement("div");
	row.classList.add("d-flex", "gap-2", "mb-2");
	row.dataset.sizeId = sizeId;

	row.innerHTML = `
        <input type="text" class="form-control edit-format" placeholder="e.g. A4" value="${size}" required>
        <input type="text" class="form-control edit-price" placeholder="$0.00" value="${price}" required>
        <button type="button" class="btn btn-danger remove-format">X</button>
    `;

	// Remove row button
	row.querySelector(".remove-format").addEventListener("click", () => {
		const id = parseInt(row.dataset.sizeId);
		if (id) removedFormatIds.push(id); // track deleted formats
		row.remove();
	});

	container.appendChild(row);
}

// MODAL CONTROL
function prepareDelete(element) {
	activeCard = element.closest(".service-card");
}

$(document).ready(function () {
	getServices();
});

function getServices() {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=get",
		success: function (response) {
			let reply = JSON.parse(response);
			let services = reply.services;

			if (reply.status === "success") {
				renderServices(reply.services);
			} else {
				console.error(reply.message);
			}
		},
	});
}

function renderServices(services) {
	const container = document.getElementById("servicesContainer");

	// clear existing
	container.innerHTML = "";

	services.forEach((service) => {
		const name = service.service_name;
		const isChecked = service.available == "TRUE";

		let formatPriceHTML = "";

		service.formats.forEach((item) => {
			formatPriceHTML += `
            <div class="d-flex justify-content-between align-items-center small mb-1" data-id="${item.size_id}">
                <span class="text-muted">${item.size}:</span>
                <span class="fw-bold text-orange">₱ ${item.price}</span>
            </div>
        `;
		});

		const cardHTML = `
        <div class="col-md-6 col-lg-4">
            <div class="service-card shadow-sm h-100"
                data-id="${service.service_id}"
                data-name='${name}'
                data-formats='${JSON.stringify(service.formats)}'
                data-available='${isChecked}'>

                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5 class="fw-bold mb-0 service-name">${name}</h5>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input switch-green" type="checkbox" ${isChecked ? "checked" : ""}>
                    </div>
                </div>

                <div class="price-section my-4">
                    <p class="text-muted small mb-1">per unit</p>
                    ${formatPriceHTML}
                </div>

                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <span class="status-pill ${isChecked ? "available" : "unavailable"}">
                        ${isChecked ? "Available" : "Unavailable"}
                    </span>
                    <div class="actions">
                        <i class="fas fa-edit text-muted me-3 pointer"
                           data-bs-toggle="modal"
                           data-bs-target="#editServiceModal"
                           onclick="prepareEdit(this)"></i>
                        <i class="fas fa-trash text-danger pointer"
                           data-bs-toggle="modal"
                           data-bs-target="#deleteServiceModal"
                           onclick="prepareDelete(this)"></i>
                    </div>
                </div>
            </div>
        </div>
    `;

		container.insertAdjacentHTML("beforeend", cardHTML);
	});
}

function addFormat(size = "", price = "") {
	const container = document.getElementById("formatContainer");

	const row = document.createElement("div");
	row.classList.add("format-group", "mb-2");

	row.innerHTML = `
        <div class="d-flex justify-content-between align-items-center gap-2">
            <div class="flex-grow-1">
                <label class="small text-muted mb-1">Format</label>
                <input type="text" name="formats[]" class="form-control" placeholder="e.g. A4" value="${size}" required>
            </div>
            <div class="flex-grow-1">
                <label class="small text-muted mb-1">Price</label>
                <input type="text" name="prices[]" class="form-control" placeholder="₱0.00" value="${price}" required>
            </div>
            <button type="button" class="btn btn-danger remove-format align-self-end" style="height:38px;">
                <i class="fa-solid fa-x"></i>
            </button>
        </div>
    `;

	// Remove row when X is clicked
	row
		.querySelector(".remove-format")
		.addEventListener("click", () => row.remove());

	container.appendChild(row);
}

function cancel() {
	removedFormatIds = [];
}

document.addEventListener("DOMContentLoaded", function () {
	const addRowBtn = document.getElementById("addEditFormatRow");
	if (addRowBtn) {
		addRowBtn.addEventListener("click", () => {
			addEditFormatRow(); // add empty row
		});
	}
	// ACTION HANDLER
	// ADD LOGIC
	document
		.getElementById("addServiceForm")
		.addEventListener("submit", function (e) {
			e.preventDefault();

			const form = this;

			const name = form.querySelector('[name="service_name"]').value.trim();
			const isChecked = document.getElementById("addAvailCheck").checked;

			const formats = form.querySelectorAll('[name="formats[]"]');
			const prices = form.querySelectorAll('[name="prices[]"]');

			let formatData = [];

			// ❌ Validation: must have at least 1 format
			if (formats.length === 0) {
				alert("Please add at least one format.");
				return;
			}

			for (let i = 0; i < formats.length; i++) {
				const format = formats[i].value.trim();
				const price = prices[i].value.trim();

				// ❌ empty format
				if (format === "") {
					alert("Format cannot be empty.");
					formats[i].focus();
					return;
				}

				// ❌ empty price
				if (price === "") {
					alert("Price cannot be empty.");
					prices[i].focus();
					return;
				}

				// ❌ not a number
				if (isNaN(price)) {
					alert("Price must be a valid number.");
					prices[i].focus();
					return;
				}

				// ❌ negative price
				if (parseFloat(price) < 0) {
					alert("Price cannot be negative.");
					prices[i].focus();
					return;
				}

				formatData.push({
					format,
					price: parseFloat(price),
				});
			}

			let payload = {
				service_name: name,
				available: isChecked ? "TRUE" : "FALSE",
				formats: formatData,
			};

			$.ajax({
				type: "POST",
				url: API,
				data: "action=store&payload=" + JSON.stringify(payload),
				success: function (response) {
					bootstrap.Modal.getInstance(
						document.getElementById("addServiceModal"),
					).hide();

					form.reset();
					getServices();
				},
				error: function (err) {
					console.error("ADD ERROR:", err);
				},
			});
		});
	// ACTION HANDLER
	// UPDATE LOGIC
	document
		.getElementById("editServiceForm")
		.addEventListener("submit", function (e) {
			e.preventDefault();
			if (!activeCard) return;

			// Get service info
			const serviceName = document.getElementById("editName").value;
			const isChecked = document.getElementById("editAvailCheck").checked;

			let available;
			if (isChecked) {
				available = "TRUE";
			} else {
				available = "FALSE";
			}

			// Collect all dynamic format rows
			const rows = document.querySelectorAll("#editFormatContainer .d-flex");
			const formats = [];
			let formatPriceHTML = "";

			rows.forEach((row) => {
				const size = row.querySelector(".edit-format").value.trim();
				const price = row.querySelector(".edit-price").value.trim();
				let sizeId = row.dataset.sizeId || 0;

				formats.push({
					size,
					price,
					sizeId: parseInt(sizeId),
				});

				// Build HTML for card
				formatPriceHTML += `
			<div class="d-flex justify-content-between small mb-1" data-id="${sizeId}">
			<span class="text-muted">${size}:</span>
			<span class="fw-bold text-orange">₱ ${price}</span>
			</div>
		`;
			});

			// Close modal
			bootstrap.Modal.getInstance(
				document.getElementById("editServiceModal"),
			).hide();

			// TODO: Send AJAX PUT request to backend
			// Include `formats` array — existing ones with sizeId, new ones with null sizeId
			let payload = {
				service_name: serviceName,
				available: available,
				formats: formats,
				removedFormatIds: removedFormatIds,
			};
			$.ajax({
				type: "POST",
				url: API,
				data:
					"action=update&id=" +
					activeCard.dataset.id +
					"&payload=" +
					JSON.stringify(payload),
				success: function (response) {
					getServices();
					removedFormatIds = [];
				},
			});
		});

	// ACTION HANDLER
	// DELETE LOGIC (Existing)
	document
		.getElementById("confirmDelete")
		.addEventListener("click", function () {
			if (activeCard) {
				$.ajax({
					type: "POST",
					url: API,
					data: "action=drop&id=" + parseInt(activeCard.dataset.id),
					success: function (response) {
						activeCard.style.transition = "all 0.4s ease";
						activeCard.style.opacity = "0";
						setTimeout(() => {
							activeCard.remove();
							activeCard = null;
						}, 400);
						bootstrap.Modal.getInstance(
							document.getElementById("deleteServiceModal"),
						).hide();
						getServices();
					},
				});

				// BACKEND INTEGRATION POINT
				// Endpoint: /api/admin/services
				// Method: DELETE
			}
		});
	$(document).on("click", ".remove-format", function () {
		$(this).closest(".format-group").remove();
	});
	// ACTION HANDLER
	// TOGGLE LOGIC (Existing)
	document.addEventListener("change", function (e) {
		if (e.target.classList.contains("switch-green")) {
			// BACKEND INTEGRATION POINT
			// Endpoint: /api/admin/services
			// Method: PATCH
			const card = e.target.closest("[data-id]");
			const serviceId = card.dataset.id;

			const isChecked = e.target.checked;
			const available = isChecked ? "TRUE" : "FALSE";

			const pill = card.querySelector(".status-pill");

			// update UI immediately
			pill.textContent = isChecked ? "Available" : "Unavailable";
			pill.className = isChecked
				? "status-pill available"
				: "status-pill unavailable";

			$.ajax({
				type: "POST",
				url: API,
				data: "action=updateStatus&id=" + serviceId + "&available=" + available,
				success: function (response) {
					console.log("TOGGLE RESPONSE:", response);
				},
			});
		}
	});
});
