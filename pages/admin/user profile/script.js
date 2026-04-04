// ==========================================================================
// 1. SAMPLE DATA
// ==========================================================================
const profileData = {
	name: "Yance Nathan",
	email: "yancenathanc@gmail.com",
	phone: "+63 (900) 123-4567",
	location: "Bulacan, Philippines",
};

// STATIC UI FALLBACK (NO BACKEND)
const activityData = [];

const statsData = {
	orders: "1,248",
	revenue: "₱ 124,580",
	days: "285",
	activity: "2m ago",
};

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
const state = {
	snapshot: {},
	pwOpen: false,
};

// ==========================================================================
// 3. DOM REFERENCES
// ==========================================================================
const dom = {
	editBtn: document.getElementById("editProfileBtn"),
	cancelEditBtn: document.getElementById("cancelEditBtn"),
	saveBtn: document.getElementById("saveBtn"),
	editInputs: document.querySelectorAll(".edit-input"),
	profileInitials: document.getElementById("profileInitials"),
	profileDisplayName: document.getElementById("profileDisplayName"),
	infoEmail: document.getElementById("infoEmail"),
	infoPhone: document.getElementById("infoPhone"),
	infoLocation: document.getElementById("infoLocation"),
	fieldName: document.getElementById("fieldName"),
	fieldEmail: document.getElementById("fieldEmail"),
	fieldPhone: document.getElementById("fieldPhone"),
	fieldLocation: document.getElementById("fieldLocation"),
	pwToggle: document.getElementById("pwToggle"),
	passwordPanel: document.getElementById("passwordPanel"),
	cancelPwBtn: document.getElementById("cancelPwBtn"),
	passwordForm: document.getElementById("passwordForm"),
	pwCurrent: document.getElementById("pwCurrent"),
	pwNew: document.getElementById("pwNew"),
	pwConfirm: document.getElementById("pwConfirm"),
	pwMatchError: document.getElementById("pwMatchError"),
	pwStrengthWrap: document.getElementById("pwStrengthWrap"),
	pwStrengthFill: document.getElementById("pwStrengthFill"),
	pwStrengthLabel: document.getElementById("pwStrengthLabel"),
	activityFeed: document.getElementById("activityFeed"),
	avatarContainer: document.getElementById("avatarContainer"),
	avatarInput: document.getElementById("avatarInput"),
	profileAvatar: document.getElementById("profileAvatar"),
};

// ==========================================================================
// 4. EVENT LISTENERS
// ==========================================================================
document.addEventListener("click", () => {
	if (window.parent && typeof window.parent.closeAllDropdowns === "function") {
		window.parent.closeAllDropdowns();
	}
});

if (dom.editBtn) dom.editBtn.addEventListener("click", enterEdit);
if (dom.cancelEditBtn)
	dom.cancelEditBtn.addEventListener("click", () => exitEdit(false));
if (dom.saveBtn) dom.saveBtn.addEventListener("click", saveProfile);

if (dom.pwToggle) {
	dom.pwToggle.addEventListener("click", () => togglePwPanel());
	dom.pwToggle.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			togglePwPanel();
		}
	});
}

if (dom.cancelPwBtn) {
	dom.cancelPwBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		togglePwPanel(false);
	});
}

document.querySelectorAll(".pw-eye-btn").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const input = document.getElementById(btn.getAttribute("data-target"));
		if (!input) return;
		const show = input.type === "password";
		input.type = show ? "text" : "password";
		btn.querySelector("i").className = show ? "fas fa-eye-slash" : "fas fa-eye";
	});
});

if (dom.pwNew) {
	dom.pwNew.addEventListener("input", () => {
		const v = dom.pwNew.value;
		if (!v) {
			if (dom.pwStrengthWrap) dom.pwStrengthWrap.style.display = "none";
			return;
		}
		const cfg = getStrengthConfig(calcStrength(v));
		if (dom.pwStrengthWrap) dom.pwStrengthWrap.style.display = "flex";
		if (dom.pwStrengthFill) {
			dom.pwStrengthFill.style.width = cfg.pct + "%";
			dom.pwStrengthFill.style.background = cfg.color;
		}
		if (dom.pwStrengthLabel) {
			dom.pwStrengthLabel.textContent = cfg.label;
			dom.pwStrengthLabel.style.color = cfg.color;
		}
	});
}

if (dom.pwConfirm) {
	dom.pwConfirm.addEventListener("input", () => {
		if (dom.pwMatchError) {
			dom.pwMatchError.style.display =
				dom.pwConfirm.value &&
				dom.pwNew &&
				dom.pwConfirm.value !== dom.pwNew.value
					? "flex"
					: "none";
		}
	});
}

if (dom.passwordForm) {
	dom.passwordForm.addEventListener("submit", (e) => {
		e.preventDefault();
		handlePasswordSubmit();
	});
}

if (dom.avatarContainer && dom.avatarInput) {
	dom.avatarContainer.addEventListener("click", (e) => {
		e.stopPropagation();
		dom.avatarInput.click();
	});

	dom.avatarInput.addEventListener("change", (e) => {
		handleAvatarChange(e);
	});
}

// ==========================================================================
// 5. CORE FUNCTIONS
// ==========================================================================
function renderActivity() {
	if (!dom.activityFeed) return;
	dom.activityFeed.innerHTML = "";
	activityData.forEach((item) => {
		const li = document.createElement("li");
		li.className = "activity-feed-item";
		li.innerHTML = `
            <span class="activity-dot${item.type === "muted" ? " muted" : ""}"></span>
            <div>
                <p class="activity-text">${item.text} <span class="highlight">${item.highlight}</span></p>
                <p class="activity-time">${item.time}</p>
            </div>
        `;
		dom.activityFeed.appendChild(li);
	});
}

function syncSidebar(avatarUrl = null) {
	const name = dom.fieldName ? dom.fieldName.value.trim() : profileData.name;
	const email = dom.fieldEmail
		? dom.fieldEmail.value.trim()
		: profileData.email;
	const phone = dom.fieldPhone
		? dom.fieldPhone.value.trim()
		: profileData.phone;
	const location = dom.fieldLocation
		? dom.fieldLocation.value.trim()
		: profileData.location;

	const initials = name
		.split(" ")
		.slice(0, 2)
		.map((w) => (w[0] || "").toUpperCase())
		.join("");

	if (dom.profileInitials) dom.profileInitials.textContent = initials;
	if (dom.profileDisplayName) dom.profileDisplayName.textContent = name;
	if (dom.infoEmail) dom.infoEmail.textContent = email;
	if (dom.infoPhone) dom.infoPhone.textContent = phone;
	if (dom.infoLocation) dom.infoLocation.textContent = location;

	if (
		window.parent &&
		typeof window.parent.updateGlobalUserInfo === "function"
	) {
		window.parent.updateGlobalUserInfo({ name, email, avatar: avatarUrl });
	}
}

function showToast(title, message, type) {
	if (
		typeof window.showToast === "function" &&
		window.showToast !== showToast
	) {
		window.showToast(title, message, type);
		return;
	}
	if (
		window.parent &&
		window.parent !== window &&
		typeof window.parent.showToast === "function"
	) {
		window.parent.showToast(title, message, type);
		return;
	}
	_inlineToast(title, message, type);
}

function _inlineToast(title, message, type) {
	let container = document.getElementById("_profileToastContainer");
	if (!container) {
		container = document.createElement("div");
		container.id = "_profileToastContainer";
		Object.assign(container.style, {
			position: "fixed",
			top: "90px",
			right: "20px",
			zIndex: "99999",
			display: "flex",
			flexDirection: "column",
			gap: "8px",
			pointerEvents: "none",
		});
		document.body.appendChild(container);
	}

	const COLORS = {
		success: "#10b981",
		danger: "#ef4444",
		info: "#3b82f6",
		warning: "#f59e0b",
	};
	const ICONS = {
		success: "fa-circle-check",
		danger: "fa-circle-exclamation",
		info: "fa-circle-info",
		warning: "fa-triangle-exclamation",
	};
	const color = COLORS[type] || COLORS.info;
	const icon = ICONS[type] || ICONS.info;

	const t = document.createElement("div");
	t.style.cssText = `
        pointer-events:auto; display:flex; align-items:flex-start; gap:10px;
        min-width:260px; max-width:320px; background:#181c27;
        border:1px solid #2a2f42; border-left:4px solid ${color};
        border-radius:12px; padding:12px 14px;
        box-shadow:0 8px 28px rgba(0,0,0,.45);
        animation:_tIn .28s ease both; font-family:inherit;
    `;
	t.innerHTML = `
        <i class="fas ${icon}" style="color:${color};font-size:1rem;margin-top:1px;flex-shrink:0;"></i>
        <div style="flex:1;min-width:0;">
            <div style="font-size:.85rem;font-weight:700;color:#e8eaf0;">${title}</div>
            ${message ? `<div style="font-size:.78rem;color:#6b7280;margin-top:2px;">${message}</div>` : ""}
        </div>
    `;

	if (!document.getElementById("_profileToastKf")) {
		const s = document.createElement("style");
		s.id = "_profileToastKf";
		s.textContent =
			"@keyframes _tIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}";
		document.head.appendChild(s);
	}

	container.appendChild(t);
	setTimeout(() => {
		t.style.transition = "opacity .3s, transform .3s";
		t.style.opacity = "0";
		t.style.transform = "translateX(30px)";
		setTimeout(() => t.remove(), 320);
	}, 3800);
}

function calcStrength(pw) {
	if (!pw || pw.length < 4) return 0;
	let s = 1;
	if (pw.length >= 8) s++;
	if (/[A-Z]/.test(pw)) s++;
	if (/[0-9]/.test(pw)) s++;
	if (/[^A-Za-z0-9]/.test(pw)) s++;
	return Math.min(s, 4);
}

function getStrengthConfig(strengthIndex) {
	const STRENGTH = [
		{ label: "Too short", color: "#ef4444", pct: 10 },
		{ label: "Weak", color: "#ef4444", pct: 25 },
		{ label: "Fair", color: "#f59e0b", pct: 55 },
		{ label: "Good", color: "#3b82f6", pct: 75 },
		{ label: "Strong", color: "#10b981", pct: 100 },
	];
	return STRENGTH[strengthIndex] || STRENGTH[0];
}

function togglePwPanel(open) {
	state.pwOpen = open !== undefined ? open : !state.pwOpen;
	if (dom.passwordPanel) {
		dom.passwordPanel.classList.toggle("open", state.pwOpen);
		dom.passwordPanel.setAttribute("aria-hidden", String(!state.pwOpen));
	}
	if (dom.pwToggle)
		dom.pwToggle.setAttribute("aria-expanded", String(state.pwOpen));
	if (!state.pwOpen) resetPwForm();
}

function resetPwForm() {
	if (dom.passwordForm) dom.passwordForm.reset();
	if (dom.pwMatchError) dom.pwMatchError.style.display = "none";
	if (dom.pwStrengthWrap) dom.pwStrengthWrap.style.display = "none";
}

// ==========================================================================
// 6. ACTION HANDLERS
// ==========================================================================
function enterEdit() {
	state.snapshot = {
		name: dom.fieldName ? dom.fieldName.value : "",
		email: dom.fieldEmail ? dom.fieldEmail.value : "",
		phone: dom.fieldPhone ? dom.fieldPhone.value : "",
		location: dom.fieldLocation ? dom.fieldLocation.value : "",
	};
	dom.editInputs.forEach((i) => {
		i.disabled = false;
		i.classList.add("editable");
	});
	if (dom.saveBtn) dom.saveBtn.style.display = "inline-flex";
	if (dom.editBtn) dom.editBtn.style.display = "none";
	if (dom.cancelEditBtn) dom.cancelEditBtn.style.display = "inline-flex";
}

function exitEdit(save) {
	if (!save) {
		if (dom.fieldName) dom.fieldName.value = state.snapshot.name || "";
		if (dom.fieldEmail) dom.fieldEmail.value = state.snapshot.email || "";
		if (dom.fieldPhone) dom.fieldPhone.value = state.snapshot.phone || "";
		if (dom.fieldLocation)
			dom.fieldLocation.value = state.snapshot.location || "";
	}
	dom.editInputs.forEach((i) => {
		i.disabled = true;
		i.classList.remove("editable");
	});
	if (dom.saveBtn) dom.saveBtn.style.display = "none";
	if (dom.editBtn) dom.editBtn.style.display = "inline-flex";
	if (dom.cancelEditBtn) dom.cancelEditBtn.style.display = "none";
}

function saveProfile() {
	const name = dom.fieldName ? dom.fieldName.value.trim() : "";
	const email = dom.fieldEmail ? dom.fieldEmail.value.trim() : "";

	if (!name) {
		showToast("Validation Error", "Full name cannot be empty.", "danger");
		if (dom.fieldName) dom.fieldName.focus();
		return;
	}
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		showToast(
			"Validation Error",
			"Please enter a valid email address.",
			"danger",
		);
		if (dom.fieldEmail) dom.fieldEmail.focus();
		return;
	}

	if (dom.fieldName) profileData.name = name;
	if (dom.fieldEmail) profileData.email = email;
	if (dom.fieldPhone)
		profileData.phone = dom.fieldPhone
			? dom.fieldPhone.value.trim()
			: profileData.phone;
	if (dom.fieldLocation)
		profileData.location = dom.fieldLocation
			? dom.fieldLocation.value.trim()
			: profileData.location;

	exitEdit(true);
	syncSidebar();
	showToast("Profile Updated", "Your information has been saved.", "success");
}

function handlePasswordSubmit() {
	const cur = dom.pwCurrent ? dom.pwCurrent.value.trim() : "";
	const npw = dom.pwNew ? dom.pwNew.value : "";
	const conf = dom.pwConfirm ? dom.pwConfirm.value : "";

	if (!cur) {
		showToast("Required", "Enter your current password.", "warning");
		dom.pwCurrent && dom.pwCurrent.focus();
		return;
	}
	if (npw.length < 8) {
		showToast(
			"Too Short",
			"New password needs at least 8 characters.",
			"warning",
		);
		dom.pwNew && dom.pwNew.focus();
		return;
	}
	if (npw !== conf) {
		showToast("Mismatch", "Passwords do not match.", "danger");
		dom.pwConfirm && dom.pwConfirm.focus();
		return;
	}

	let payload = {
		currentPass: cur,
		newPass: npw,
	};

	$.ajax({
		type: "POST",
		url: "../../../api/user-profile.php",
		data: "action=updatePassword&payload=" + JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response);

			if (reply.status == "success") {
				resetPwForm();
				togglePwPanel(false);
				showToast("Password Updated", reply.message, "success");
			} else {
				showToast("Failed", reply.message, "danger");
			}
		},
	});
}

function handleAvatarChange(e) {
	const file = e.target.files[0];
	if (!file) return;

	if (!file.type.startsWith("image/")) {
		showToast("Invalid File", "Please select an image file.", "danger");
		return;
	}

	const reader = new FileReader();
	reader.onload = (event) => {
		const url = event.target.result;
		if (dom.profileAvatar) {
			dom.profileAvatar.innerHTML = `<img src="${url}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
		}
		syncSidebar(url);
		showToast(
			"Photo Updated",
			"Your profile picture has been changed.",
			"success",
		);
	};
	reader.readAsDataURL(file);
}

// ==========================================================================
// 7. NAVIGATION
// ==========================================================================
// Navigation logic goes here if required.

// ==========================================================================
// 8. BACKEND INTEGRATION
// ==========================================================================
// Integrations would use fetch() API to relay actions (such as saveProfile and handlePasswordSubmit) to the server.

// ==========================================================================
// 9. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
	// ACTION DISABLED — STORAGE REMOVED
	const savedUser = {};
	const name = savedUser.name || profileData.name;
	const email = savedUser.email || profileData.email;
	const avatar = savedUser.avatar || "";

	if (dom.fieldName) dom.fieldName.value = name;
	if (dom.fieldEmail) dom.fieldEmail.value = email;
	if (dom.fieldPhone) dom.fieldPhone.value = profileData.phone;
	if (dom.fieldLocation) dom.fieldLocation.value = profileData.location;

	if (dom.profileAvatar) {
		if (avatar) {
			dom.profileAvatar.innerHTML = `<img src="${avatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
		} else {
			const initials = name
				.split(" ")
				.slice(0, 2)
				.map((w) => (w[0] || "").toUpperCase())
				.join("");
			if (dom.profileInitials) dom.profileInitials.textContent = initials;
		}
	}

	syncSidebar(avatar || null);
	renderActivity();

	const statMap = {
		statOrders: statsData.orders,
		statRevenue: statsData.revenue,
		statDays: statsData.days,
		statActivity: statsData.activity,
	};
	Object.entries(statMap).forEach(([id, val]) => {
		const el = document.getElementById(id);
		if (el) el.textContent = val;
	});
});
