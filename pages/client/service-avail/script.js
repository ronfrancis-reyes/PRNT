let currentFiles = [];
let selectedFileId = null;
let selectedReceiving = "pickup";

function handleFileUpload(e) {
	for (let file of e.target.files) {
		if (
			!currentFiles.find((f) => f.name === file.name && f.size === file.size) //para hindi mag duplicate yung file sa list
		) {
			currentFiles.push({
				id: "FILE-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
				name: file.name,
				size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
				rawFile: file,
			});
		}
	}
	renderFiles();
}

function renderFiles() {
	const list = document.getElementById("fileList");
	if (!list) return;
	if (currentFiles.length === 0) {
		list.innerHTML =
			'<p style="color:#94A3B8; font-size:0.9rem; text-align:center;">No files uploaded yet.</p>';
		return;
	}
	list.innerHTML = currentFiles
		.map(
			(f) => `
    <div class="card" style="margin-bottom:0.75rem; padding:0.9rem 1rem; display:flex; align-items:center; gap:1rem; cursor:pointer; border: 2px solid ${selectedFileId === f.id ? "var(--primary)" : "var(--border)"}; transition:border 0.2s;" onclick="selectFileForConfig('${f.id}')">
      <i class="fas fa-file-alt" style="color:var(--primary); font-size:1.4rem;"></i>
      <div style="flex:1; min-width:0;">
        <div style="font-weight:600; font-size:0.88rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${f.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${f.size}</div>
      </div>
      <button onclick="removeFile('${f.id}'); event.stopPropagation();" style="background:none; border:none; color:#EF4444; cursor:pointer; padding:0.25rem;"><i class="fas fa-trash"></i></button>
    </div>
  `,
		)
		.join("");
}

function removeFile(id) {
	currentFiles = currentFiles.filter((f) => f.id !== id);
	if (selectedFileId === id) {
		selectedFileId = null;
		const preview = document.getElementById("filePreview");
		if (preview) preview.style.display = "none";
	}
	renderFiles();
}

function selectFileForConfig(id) {
	selectedFileId = id;
	const file = currentFiles.find((f) => f.id === id);
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
