const email = document.getElementById("emailInput");
const password = document.getElementById("passInput");
const submitButt = document.getElementById("submitButton");
const form = $("#login-form");

const API = "../../api/login.php";

//show pass

function checkFields() {
	if (email.value.trim() == "" || password.value.trim() == "") {
		submitButt.disabled = true;
	} else {
		submitButt.disabled = false;
	}
}

function postOne() {
	let payload = {
		email: $("#emailInput").val(),
		password: $("#passInput").val(),
	};

	$.ajax({
		url: API,
		type: "POST",
		data: "action=postOne&payload=" + JSON.stringify(payload),
		success: function (response) {
			let respo = JSON.parse(response);
			if (respo.status == "success") {
				checkAccountType($("#emailInput").val());
			} else {
				alert(respo.message);
			}
		},
		error: function (error) {
			alert(error);
		},
	});
}

form.on("submit", function (e) {
	e.preventDefault();
	postOne();
});
email.addEventListener("input", checkFields);
password.addEventListener("input", checkFields);

function showPass() {
	const passwordInput = document.getElementById("floatingPassword");
	const toggle = document.getElementById("showPasswordToggle");

	toggle.addEventListener("change", function () {
		if (this.checked) {
			passwordInput.type = "text";
		} else {
			passwordInput.type = "password";
		}
	});
}

function checkAccountType(email) {
	if (email == "admin1@admin.com") {
		window.location.href = "../../pages/admin/dashboard/";
	} else {
		window.location.href = "../../pages/client/service-avail/";
	}
}
