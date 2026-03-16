const email = document.getElementById("emailInput");
const password = document.getElementById("passInput");
const submitButt = document.getElementById("submitButton");

const API = "/PRNT/api/registration.php";

function checkFields() {
	if (email.value.trim() === "" || password.value.trim() === "") {
		submitButt.disabled = true;
	} else {
		submitButt.disabled = false;
	}
}

function postOne() {
	let payload= {
		email : $("#emailInput").val(),
		password : $("#passInput").val()
	}

	$.ajax({
		url : API,
		type : postOne,
		data : "action=postOne&payload=" + JSON.stringify(payload),
		success : function(response){
			let respo = JSON.parse(response);
			alert(respo.message);
			if(respo.status == "success"){
				window.location.href = "#";
			}
		},
		error : function(error){
			alert(error);
		}
	})
}

submitButt.addEventListener("click", postOne);
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
