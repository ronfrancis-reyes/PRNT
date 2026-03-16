const API = "/PRNT/api/registration.php";

const form = $("#signup-form");
const fullname = $("#name");
const email = $("#email");
const contact = $("#contact");
const password = $("#password");
const confirmPassword = $("#confirm-password");
const terms = $("#terms");

const submit_btn = $("#submit");

//validation of inputs
function validateForm() {
	const nameVal = fullname.val().trim();
	const emailVal = email.val().trim();
	const contactVal = contact.val().trim();
	const passwordVal = password.val();
	const confirmVal = confirmPassword.val();
	const termsChecked = terms.prop("checked");

	let isValid = true;

	//empty fields validation
	if (!nameVal || !emailVal || !contactVal || !passwordVal || !confirmVal) {
		isValid = false;
	}
	//name validation
	if (!/^[a-zA-Z ]{3,}$/.test(nameVal)) {
		isValid = false;
	}
	//email validation (ms.bulsu.edu.ph/bulsu.edu.ph)
	if (!/^.+@(ms\.bulsu\.edu\.ph|bulsu\.edu\.ph)$/.test(emailVal)) {
		isValid = false;
	}
	//contact validation number must start in 09 and 11 digits
	if (!/^09\d{9}$/.test(contactVal)) {
		isValid = false;
	}
	//password and confirm must be the same
	if (passwordVal !== confirmVal) {
		isValid = false;
	}
	//terms must be checked
	if (!termsChecked) {
		isValid = false;
	}

	submit_btn.prop("disabled", !isValid);
}

fullname.on("input", validateForm);
email.on("input", validateForm);
contact.on("input", validateForm);
password.on("input", validateForm);
confirmPassword.on("input", validateForm);
terms.on("change", validateForm);

//form submit
form.on("submit", function (e) {
	e.preventDefault();

	let payload = {
		fullname: $("#name").val(),
		email: $("#email").val(),
		contact: $("#contact").val(),
		password: $("#password").val(),
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
		url: API,
		data: "action=postOne&email=" + id,
	});
}

function store(payload) {
	$.ajax({
		type: "POST",
		url: API,
		data: "action=store&payload=" + JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response); //response ng api
			alert(reply.status + " " + reply.message);

			if (reply.status == "success") {
				window.location.href = "/PRNT/pages/login/";
			}
		},
		error: function (error) {
			alert(JSON.stringify(error));
		},
	});
}
