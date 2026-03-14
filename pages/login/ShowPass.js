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
