$("#contact-form").on("submit", function (e) {
	e.preventDefault(); // stop page reload

	let payload = {
		name: $("#cName").val().trim(),
		email: $("#cEmail").val().trim(),
		subject: $("#cSubject").val().trim(),
		message: $("#cMessage").val().trim(),
	};

	// simple validation
	if (!payload.name || !payload.email || !payload.subject || !payload.message) {
		alert("Please fill in all fields.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "../../api/contact.php", // change if needed
		data: "action=store&payload=" + JSON.stringify(payload),
		success: function (response) {
			let reply = JSON.parse(response);
			alert(reply.message);
			$("#contact-form")[0].reset();
		},
	});
});
