const API = "../../api/user-profile.php";

const profileForm = $("#profile-form");
const passwordForm = $("#password-form");

function switchProfileTab(tab, btn) {
	document
		.querySelectorAll('[id^="profileTab-"]')
		.forEach((t) => (t.style.display = "none"));
	document.getElementById(`profileTab-${tab}`).style.display = "block";
	document
		.querySelectorAll(".profile-menu button")
		.forEach((b) => b.classList.remove("active"));
	if (btn) btn.classList.add("active");

	if (tab === "orders") {
		renderOrderHistory();
		renderActiveOrders();
	}
}

profileForm.on("submit", function (e) {
	e.preventDefault();

	const firstName = $("#profFirstName").val().trim();
	const lastName = $("#profLastName").val().trim();
	const phone = $("#profPhone").val().trim();

	let isValid = true;

	// Phone validation
	const phoneRegex = /^09\d{9}$/;
	if (!phoneRegex.test(phone)) {
		alert("Use a valid phone number");
		isValid = false;
	}

	// ❌ Stop if invalid
	if (!isValid) {
		return;
	}
	let payload = {
		name: firstName + " " + lastName,
		contact_number: phone,
	};
	$.ajax({
		type: "POST",
		url: API,
		data: "action=updateUserInfo&payload=" + JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response);
			if (reply.status == "success") {
				alert(reply.message);
				window.location.reload();
			}
		},
	});
});

passwordForm.on("submit", function (e) {
	e.preventDefault();

	const currentPass = $("#currentPass").val().trim();
	const newPass = $("#newPass").val().trim();
	const confirmPass = $("#confirmPass").val().trim();

	let isValid = true;

	// password validation
	const phoneRegex = /^09\d{9}$/;
	if (newPass !== confirmPass) {
		alert("Password don't match");
		isValid = false;
	}

	// ❌ Stop if invalid
	if (!isValid) {
		return;
	}
	let payload = {
		currentPass: currentPass,
		newPass: newPass,
	};
	$.ajax({
		type: "POST",
		url: API,
		data: "action=updatePassword&payload=" + JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response);
			if (reply.status == "success") {
				alert(reply.message);
				window.location.reload();
			} else {
				alert(reply.message);
			}
		},
	});
});

function logout() {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=logout",
		success: function () {
			// redirect after session is destroyed
			window.location.href = "../../index.php";
		},
	});
}
