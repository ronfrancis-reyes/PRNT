const API = "../../../api/service-avail.php";

let currentFiles = [];
let selectedFileId = null;
let selectedReceiving = "pickup";

$(document).ready(function () {
	getServices();
	getColorType();
});

function handleFileUpload(e) {
	for (let file of e.target.files) {
		if (
			!currentFiles.find((f) => f.name === file.name && f.size === file.size) //para hindi mag duplicate yung file sa list
		) {
			let pageCount;
			let reader = new FileReader();
			reader.readAsBinaryString(file);
			reader.onloadend = function () {
				pageCount = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
				currentFiles.push({
					id: "FILE-" + Math.random().toString(36).substr(2, 6).toUpperCase(), //file id for the array (not the actual file id in the database)
					name: file.name,
					size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
					pageCount: pageCount,
					rawFile: file,
				});
				renderFiles(); //nagre-return ng array of html strings at ma-join sa isang string para ma-render sa innerHTML
			};
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
}

function selectFileForConfig(id) {
	selectedFileId = id;
	const file = currentFiles.find((file) => file.id === id);
	const preview = document.getElementById("filePreview");
	if (preview) {
		preview.style.display = "block";
		document.getElementById("previewFileName").textContent = file.name;
		document.getElementById("previewFileSize").textContent = file.size;
	}
	renderFiles(); // re-render to update highlight
	document
		.getElementById("configStep")
		?.scrollIntoView({ behavior: "smooth", block: "start" });
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
function getColorType() {
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
                <option value="${color.color_id}">${color.color_type}</option>
			`);
	});
}
