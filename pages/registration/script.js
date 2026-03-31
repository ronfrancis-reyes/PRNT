const regForm = $("#registration-form");
const regFirstName = $("#regFirstName");
const regLastName = $("#regLastName");
const regEmail = $("#regEmail");
const regPhone = $("#regPhone");
const regPassword = $("#regPassword");

const regSubmitBtn = $("#regSubmitBtn");

//validation of inputs
function validateForm() {
	const firstNameVal = regFirstName.val().trim();
	const lastNameVal = regLastName.val().trim();
	const emailVal = regEmail.val().trim();
	const phoneVal = regPhone.val().trim();
	const passwordVal = regPassword.val();

	let isValid = true;

	//empty fields validation
	if (!firstNameVal || !lastNameVal || !emailVal || !phoneVal || !passwordVal) {
		isValid = false;
	}
	//name validation
	if (!/^[a-zA-Z ]{3,}$/.test(firstNameVal)) {
		isValid = false;
	}
	if (!/^[a-zA-Z ]{3,}$/.test(lastNameVal)) {
		isValid = false;
	}
	//email validation (ms.bulsu.edu.ph/bulsu.edu.ph)
	if (!/^.+@(ms\.bulsu\.edu\.ph|bulsu\.edu\.ph)$/.test(emailVal)) {
		isValid = false;
	}
	//contact validation number must start in 09 and 11 digits
	if (!/^09\d{9}$/.test(phoneVal)) {
		isValid = false;
	}

	regSubmitBtn.prop("disabled", !isValid);
}

regFirstName.on("input", validateForm);
regLastName.on("input", validateForm);
regEmail.on("input", validateForm);
regPhone.on("input", validateForm);
regPassword.on("input", validateForm);

//form submit
regForm.on("submit", function (e) {
	e.preventDefault();

	let payload = {
		fullname: $("#regFirstName").val() + " " + $("#regLastName").val(),
		email: $("#regEmail").val(),
		contact: $("#regPhone").val(),
		password: $("#regPassword").val(),
	};

	postOne(payload.email).then((response) => {
		let reply = JSON.parse(response); //using promises
		if (reply.status == "success") {
			store(payload);
		} else {
			alert("Account already exist");
		}
	});
});

function postOne(id) {
	return $.ajax({
		type: "POST",
		url: "../../api/registration.php",
		data: "action=postOne&email=" + id,
	});
}

function store(payload) {
	$.ajax({
		type: "POST",
		url: "../../api/registration.php",
		data: "action=store&payload=" + JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response); //response ng api
			alert(reply.message);

			if (reply.status == "success") {
				window.location.href = "/PRNT/pages/login/";
			}
		},
		error: function (error) {
			alert(JSON.stringify(error));
		},
	});
}
