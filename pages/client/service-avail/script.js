const API = "../../../api/service-avail.php";

let currentFiles = [];
let selectedFileId = null; // to keep track of which file is selected for configuration (not the actual file id in the database, just a random id for the frontend)
let selectedReceiving = "Pick-up";
let cart = [];
let pageCount = 0;

$(document).ready(function () {
	getServices();
	getColorType();
	getPaymentMethods();
	getLocations();
});

function handleFileUpload(e) {
	for (let file of e.target.files) {
		let pageCount = 1; // default for images or non-PDFs

		if (file.type === "application/pdf") {
			let reader = new FileReader();
			reader.readAsBinaryString(file);
			reader.onloadend = function () {
				pageCount =
					(reader.result.match(/\/Type[\s]*\/Page[^s]/g) || []).length || 1;
				const newFile = {
					id: "FILE-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
					name: file.name,
					size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
					pageCount: pageCount,
					rawFile: file,
				};
				currentFiles.push(newFile);
				selectFileForConfig(newFile.id);
				renderFiles();
			};
		} else {
			const newFile = {
				id: "FILE-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
				name: file.name,
				size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
				pageCount: pageCount,
				rawFile: file,
			};
			currentFiles.push(newFile);
			selectFileForConfig(newFile.id);
			renderFiles();
		}
	}
}

function renderFiles() {
	const list = document.getElementById("fileList");
	if (!list) return;
	if (currentFiles.length === 0) {
		list.innerHTML =
			'<p style="color:#94A3B8; font-size:0.9rem; text-align:center;">No files uploaded yet.</p>';
		return;
	}
	//.map instead of forEach para ma-return yung array of html strings
	// at ma-join sa isang string para ma-render sa innerHTML
	// pag for each ginamit, magd-display pero nauulit-uli yung mga files sa tuwing may idadagdag na file
	list.innerHTML = currentFiles
		.map(
			(file) => `
		<div class="card" style="margin-bottom:0.75rem; padding:0.9rem 1rem; display:flex; align-items:center; flex-direction: row; gap:1rem; cursor:pointer; border: 2px solid ${selectedFileId === file.id ? "var(--primary)" : "var(--border)"}; transition:border 0.2s;" onclick="selectFileForConfig('${file.id}')">
		<i class="fas fa-file-alt" style="color:var(--primary); font-size:1.4rem;"></i>
		<div style="flex:1; min-width:0;">
			<div style="font-weight:600; font-size:0.88rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${file.name}</div>
			<div style="font-size:0.75rem; color:var(--text-muted);">Pages: ${file.pageCount}</div>
			<div style="font-size:0.75rem; color:var(--text-muted);">Size : ${file.size}</div>
		</div>
		<button onclick="removeFile('${file.id}'); event.stopPropagation();" style="background:none; border:none; color:#EF4444; cursor:pointer; padding:0.25rem;"><i class="fas fa-trash"></i></button>
		</div>`,
		)
		.join("");
}

function removeFile(id) {
	currentFiles = currentFiles.filter((file) => file.id !== id);
	if (selectedFileId === id) {
		selectedFileId = null;
		const preview = document.getElementById("filePreview");
		if (preview) preview.style.display = "none";
	}
	renderFiles();
	pageCount = 0;
	calculateEstimatedPrice();
}

function selectFileForConfig(id) {
	selectedFileId = id;
	const file = currentFiles.find((file) => file.id === id);
	const preview = document.getElementById("filePreview");
	if (preview) {
		preview.style.display = "block";
		document.getElementById("previewFileName").textContent = file.name;
		document.getElementById("previewPageCount").textContent =
			"Pages: " + file.pageCount;
		document.getElementById("previewFileSize").textContent =
			"Size: " + file.size;
		pageCount = file.pageCount;
	}
	renderFiles(); // re-render to update highlight
	calculateEstimatedPrice();
	document
		.getElementById("configStep")
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleFormatChange() {
	const format = document.getElementById("serviceFormat").value;
	const paperSelect = document.getElementById("paperSize");
	paperSelect.innerHTML = "";
}

function showCustomSizeInput(select) {
	const selectedText = select.options[select.selectedIndex].text;
	if (selectedText.includes("Custom")) {
		$("#customSizeInput").show();
		$("#customSizeInput").html(`                                
			<input type="number" id="customLengthInput" onchange="calculateEstimatedPrice()" min="1" placeholder="Length in"
                style="flex:1; padding:0.85rem; border:1px solid var(--border); border-radius:var(--radius); background:white;">
            <span style="display:inline-block; vertical-align:middle;">x</span>
            <input type="number" id="customHeightInput" onchange="calculateEstimatedPrice()" min="1" placeholder="Height in"
				style="flex:1; padding:0.85rem; border:1px solid var(--border); border-radius:var(--radius); background:white;">
			`);
	} else {
		$("#customSizeInput").hide();
	}
}

//ajax requests
function getServices() {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=getServices",
		success: function (response) {
			let reply = JSON.parse(response);
			let services = reply.data;
			displayServiceOptions(services);
		},
	});
}

function getColorType(id) {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=getColors",
		success: function (response) {
			let reply = JSON.parse(response);
			let colors = reply.data;
			displayColorOptions(colors);
		},
	});
}

function getSizes(id) {
	if (id == "") {
		$("#paperSize").html('<option value="">Select service first</option>');
		return; //para bumalik sa default option kapag pumili tapos pinili ulit yung default option (empty value) sa service format
	}

	$.ajax({
		type: "GET",
		url: API,
		data: "action=getSizes&id=" + parseInt(id),
		success: function (response) {
			let reply = JSON.parse(response);
			let sizes = reply.data;
			displaySizeOptions(sizes);
		},
	});
}

function getPaymentMethods() {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=getPaymentMethods",
		success: function (response) {
			let reply = JSON.parse(response);
			let payments = reply.data;
			displayPaymentMethods(payments);
		},
	});
}

function getLocations() {
	$.ajax({
		type: "GET",
		url: API,
		data: "action=getLocations",
		success: function (response) {
			let reply = JSON.parse(response);
			let locations = reply.data;
			displayLocations(locations);
		},
	});
}

//display functions
function displayServiceOptions(services) {
	const container = $("#serviceFormat");
	services.forEach((service) => {
		container.append(`
            <option value="${service.service_id}">${service.service_name}</option>
		`);
	});
}

function displayColorOptions(colors) {
	const container = $("#colorType");
	colors.forEach((color) => {
		container.append(`
                <option value="${color.color_id}" data-markup="${color.markup}">${color.color_type}</option>
			`);
	});
}

function displaySizeOptions(sizes) {
	const container = $("#paperSize");
	let sizeHtml = `<option value="">Select a size</option>`; // para maiba ung select a service first kapag nagbago yung service format, imbes na magdagdag lang ng options sa existing options
	// need sizeHtml para maoverwrite yung options sa tuwing magbabago yung service format,
	// kasi pag nagselect ng ibang service format, nadadagdagan lang yung options
	// imbes na napapalitan
	sizes.forEach((size) => {
		sizeHtml += `
                <option value="${size.size_id}" data-price="${size.price}">${size.size}</option>
			`;
	});
	container.html(sizeHtml);
}

function displayPaymentMethods(payments) {
	const container = $("#paymentMethod");
	payments.forEach((payment) => {
		container.append(`
				<option value="${payment.payment_id}">${payment.payment_type}</option>
			`);
	});
}

function displayLocations(locations) {
	locations.forEach((location) => {
		$("#deliveryLocation").append(`
			<option value="${location.address_id}">${location.building}</option>
			`);
	});
}

//logics
function updatePrice(estimatedPrice) {
	$("#priceDisplay").text(
		estimatedPrice.toLocaleString("en-PH", {
			style: "currency",
			currency: "PHP",
		}),
	);
}

function calculateEstimatedPrice(id) {
	const selectedSize = $("#paperSize option:selected");
	const selectedText = selectedSize.text();

	let paperPrice = 0;
	if (selectedText.includes("Custom")) {
		let length = parseInt($("#customLengthInput").val());
		let height = parseInt($("#customHeightInput").val());
		paperPrice = selectedSize.data("price") * (length * height) || 0;
	} else {
		paperPrice = selectedSize.data("price") || 0;
	}

	const selectedColor = $("#colorType option:selected");
	let colorMarkup = selectedColor.data("markup") / 100 + 1;

	let copies = parseInt($("#copies").val());

	let estimatedPrice = colorMarkup * (paperPrice * pageCount * copies);

	updatePrice(estimatedPrice);
}

function addToCart() {
	if (!selectedFileId) {
		alert("Please select a file from your library first.");
		return;
	}

	const file = currentFiles.find((file) => file.id === selectedFileId);
	const formatEl = $("#serviceFormat");
	const sizeEl = $("#paperSize");
	const typeEl = $("#colorType");
	const copiesEl = $("#copies");
	const priceEl = $("#priceDisplay");

	if (!formatEl.val()) {
		alert("Please select a service type.");
		return;
	}
	if (!sizeEl.val()) {
		alert("Select paper size.");
		return;
	}

	const item = {
		id: "ITEM-" + Math.random().toString(36).substr(2, 6).toUpperCase(), //id only for cart

		fileName: file.name,
		fileSize: file.size,

		pageCount: file.pageCount,

		service: $("#serviceFormat option:selected").text(),
		service_id: formatEl.val(),

		color: $("#colorType option:selected").text(),
		color_id: typeEl.val(),

		size: $("#paperSize option:selected").text(),
		size_id: sizeEl.val(),

		copies: parseInt(copiesEl.val()),
		amount: parseFloat(priceEl.text().replace("₱", "")),

		file: file.rawFile,
	};

	cart.push(item);

	const cartSection = document.getElementById("cartSection");
	if (cartSection) {
		cartSection.style.display = "block";
		setTimeout(() => cartSection.scrollIntoView({ behavior: "smooth" }), 200);
	}
	removeFile(selectedFileId);
	selectedFileId = null;
	renderCart();
}

function renderCart() {
	const body = document.getElementById("cartBody");
	if (!body) return;

	if (cart.length === 0) {
		body.innerHTML =
			'<tr><td colspan="6" style="text-align:center;padding:3rem;color:#94A3B8;">No items in your order yet.</td></tr>';
		return;
	}

	body.innerHTML = cart
		.map(
			(item, idx) => `
				<tr style="border-bottom: 1px solid var(--border); background: #FFFFFF;">
				<td style="padding:1.25rem;">
					<div style="display:flex; align-items:center; gap:0.75rem;">
					<div style="width:38px;height:38px;background:#FFF0ED;color:#EE4D2D;border-radius:8px;display:flex;align-items:center;justify-content:center; flex-shrink:0;">
						<i class="fas fa-file-alt"></i>
					</div>
					<div style="min-width:0;">
						<div style="font-weight:700; font-size:0.88rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:160px;">${item.fileName}</div>
						<div style="font-size:0.75rem; color:var(--text-muted);">${item.fileSize}</div>
					</div>
					</div>
				</td>
				<td style="padding:1.25rem; font-weight:600; font-size:0.9rem;">${item.service}</td>
				<td style="padding:1.25rem;">
					<div style="font-size:0.88rem;">${item.size}</div>
					<div style="font-size:0.75rem; color:#94A3B8; font-weight:600; text-transform:uppercase;">${item.color}</div>
				</td>
				<td style="padding:1.25rem; font-weight:700;">×${item.copies}</td>
				<td style="padding:1.25rem; font-weight:800; color:#EE4D2D; font-size:1.1rem;">₱${item.amount.toFixed(2)}</td>
				<td style="padding:1.25rem; text-align:right;">
					<button onclick="removeFromCart(${idx})" style="width:34px;height:34px;border-radius:50%;border:none;background:#FFF0ED;color:#EE4D2D;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;" title="Remove">
					<i class="fas fa-trash-alt" style="font-size:0.85rem;"></i>
					</button>
				</td>
				</tr>
			`,
		)
		.join("");
	updateTotals();
}

function removeFromCart(cartIndex) {
	cart.splice(cartIndex, 1);
	if (cart.length === 0) {
		document.getElementById("cartSection").style.display = "none";
	} else {
		updateTotals();
		renderCart();
	}
}

function selectReceiving(receivingChoice) {
	selectedReceiving = receivingChoice;
	document
		.querySelectorAll(".opt-card")
		.forEach((el) => el.classList.remove("active"));
	document.getElementById(`opt-${receivingChoice}`)?.classList.add("active");
	const locBlock = document.getElementById("deliveryLocationBlock");
	const feeRow = document.getElementById("feeLabelRow");
	if (locBlock) {
		getLocations();
		locBlock.style.display = receivingChoice === "Delivery" ? "block" : "none";
	}
	if (feeRow)
		feeRow.style.display = receivingChoice === "Delivery" ? "flex" : "none";
	updateTotals();
}

function updateTotals() {
	const subtotal = cart.reduce((sum, item) => sum + (item.amount || 0), 0);
	const delivery = selectedReceiving === "Delivery" ? 10 : 0;
	const total = subtotal + delivery;

	$("#subtotal").text(`₱${subtotal.toFixed(2)}`);
	$("#deliveryFee").text(`₱${delivery.toFixed(2)}`);
	$("#totalAmount").text(`₱${total.toFixed(2)}`);
}

function placeOrder() {
	let formData = new FormData(); //for file uploading in the api
	let address =
		selectedReceiving == "Pick-up" ? null : $("#deliveryLocation").val();
	let payload = {
		address_id: address,
		delivery_option: selectedReceiving,
		total_price: parseFloat($("#totalAmount").text().replace("₱", "")),
		payment_id: $("#paymentMethod").val(),
		note: $("#orderNotes").val(),
		items: cart.map((item) => ({
			...item,
			file: null, //hindi kasi nas-stringify ung file sa JSON.stringify(payload) kay null muna then ibabalik nalang
		})),
	};

	formData.append("action", "store");
	formData.append("payload", JSON.stringify(payload));

	cart.forEach((item, index) => {
		formData.append(`file_${index}`, item.file); //file_index ung ilalagay sa php para pwedeng iloop
	});

	$.ajax({
		type: "POST",
		url: API,
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			let reply = JSON.parse(response);

			if (reply.status == "success") {
				alert(reply.message);
				window.location.reload();
				window.location.href = "../receipt/";
			}
		},
	});
}
