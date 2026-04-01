const API = "../../../api/service-avail.php";

let currentFiles = [];
let selectedFileId = null; // to keep track of which file is selected for configuration (not the actual file id in the database, just a random id for the frontend)
let selectedReceiving = "pickup";
let cart = [];
let pageCount = 0;

$(document).ready(function () {
	getServices();
	getColorType();
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

				currentFiles.push({
					id: "FILE-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
					name: file.name,
					size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
					pageCount: pageCount,
					rawFile: file,
				});

				renderFiles();
			};
		} else {
			currentFiles.push({
				id: "FILE-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
				name: file.name,
				size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
				pageCount: pageCount,
				rawFile: file,
			});

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
	const selectedColor = $("#colorType option:selected");
	const markup = selectedColor.data("markup"); // jQuery reads data-* from the option

	const selectedSize = $("#paperSize option:selected");
	const sizePrice = selectedSize.data("price"); // Assuming price is stored as data-price in the option

	console.log("copies " + parseInt($("#copies").val()));
	console.log("markup " + markup);
	console.log("price " + sizePrice);
}
