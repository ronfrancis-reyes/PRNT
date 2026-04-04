<?php
include "./api/config.php"
?>
<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
		crossorigin="anonymous" />

	<!--Tab Logo-->
	<link rel="icon" href="assets/img/PRNT_logo.png" type="image/png" />
	<!--Logo Library -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

	<link rel="stylesheet" href="./components/Navbar/Navbar.css" />
	<link rel="stylesheet" href="./components/Footer/Footer.css" />
	<link rel="stylesheet" href="./styles.css" />
	<link rel="stylesheet" href="./global/global.css" />


	<title>PRNT</title>
</head>

<body>
	<!-- ===== TOAST CONTAINER ===== -->
	<div class="toast-container" id="toastContainer"></div>

	<!-- ===== MOBILE MENU OVERLAY ===== -->

	<!-- ===== NAVBAR ===== -->
	<div class="mobile-menu" id="mobileMenu">
		<button class="close-menu" onclick="toggleMobileMenu()">
			<i class="fas fa-times"></i>
		</button>
		<a href="index.php">Home</a>
		<a href="./pages/about/">About</a>
		<a href="./pages/works/">Work</a>
		<a href="./pages/service/">Services</a>
		<a href="./pages/contact/">Contact</a>
		<a href="./pages/client/dashboard/"><?php if (isset($_SESSION['user'])) {
												if ($_SESSION['role'] == "Admin") {
													echo "Dashboard";
												} else {
													echo '<i class="fas fa-shopping-cart"></i> Order Now';
												}
											} else {
												echo '<i class="fas fa-shopping-cart"></i> Order Now';
											} ?></a>
		<?php if (isset($_SESSION['user'])): ?>
			<div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
				<div
					style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
					id="navAvatar">
					<?php
					$fullname = explode(' ', $_SESSION['username']);
					$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
					echo $initials;
					?></div>
			</div>
		<?php else: ?>
			<a
				onclick="showAuthModal('login')"
				class="btn btn-outline"
				id="loginBtn">Login</a>
		<?php endif; ?>
	</div>

	<nav class="navbar" id="navbar">
		<div class="container flex align-center justify-between" style="width: 100%">
			<a href="index.php" class="logo"> <i class="fas fa-print"></i> PRNT </a>
			<ul class="nav-links" id="navLinks">
				<li><a href="index.php">Home</a></li>
				<li><a href="./pages/about/">About</a></li>
				<li><a href="./pages/works/">Work</a></li>
				<li><a href="./pages/service/">Services</a></li>
				<li><a href="./pages/contact/">Contact</a></li>
			</ul>
			<div class="flex align-center" style="gap: 1rem">
				<a
					href="./pages/client/dashboard/"
					class="btn btn-primary"
					id="orderNowBtn">
					<?php if (isset($_SESSION['user'])) {
						if ($_SESSION['role'] == "Admin") {
							echo "Dashboard";
						} else {
							echo '<i class="fas fa-shopping-cart"></i> Order Now';
						}
					} else {
						echo '<i class="fas fa-shopping-cart"></i> Order Now';
					}
					?>
				</a>
				<?php if (isset($_SESSION['user'])): ?>
					<?php if ($_SESSION['role'] == 'Customer'): ?>
						<a href="./pages/user-profile/" class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
							<div
								style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
								id="navAvatar"><?php
												$fullname = explode(' ', $_SESSION['username']);
												$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
												echo $initials;
												?></div>
						</a>
						<?php endif; ?>
					<?php else: ?>
						<a
							onclick="showAuthModal('login')"
							class="btn btn-outline"
							id="loginBtn">Login</a>
					<?php endif; ?>

					<button class="mobile-menu-btn" onclick="toggleMobileMenu()">
						<i class="fas fa-bars"></i>
					</button>
			</div>
		</div>
	</nav>


	<!-- ===== HERO ===== -->
	<section class="hero">
		<div class="container animate-slide">
			<h1>
				Your Prints, <span style="color: var(--accent)">Delivered.</span>
			</h1>
			<p>
				Upload, customize, and order high-quality prints online. Fast,
				affordable, and designed for BulSU students and local businesses.
			</p>
			<div
				style="
						display: flex;
						justify-content: center;
						gap: 1.5rem;
						flex-wrap: wrap;
					">
				<a
					onclick="showAuthModal()"
					class="btn btn-primary"
					style="padding: 1.25rem 2.5rem; font-size: 1.1rem">
					<i class="fas fa-shopping-cart"></i> Get Started
				</a>
				<a
					href="./pages/service"
					class="btn btn-outline"
					style="padding: 1.25rem 2.5rem; font-size: 1.1rem">
					Our Services
				</a>
			</div>
		</div>
	</section>

	<!-- ===== STATS ===== -->
	<div class="container">
		<div
			class="home-stats flex justify-between align-center animate-fade"
			style="
					background: white;
					padding: 2.5rem;
					border-radius: 12px;
					margin-top: -3rem;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
					text-align: center;
				">
			<div class="stat-item" style="flex: 1">
				<h2 style="font-size: 2.5rem; color: var(--primary)">12k+</h2>
				<p style="color: var(--text-muted); font-weight: 600">
					Orders Printed
				</p>
			</div>
			<div
				class="stat-item"
				style="
						flex: 1;
						border-left: 1px solid #eee;
						border-right: 1px solid #eee;
					">
				<h2 style="font-size: 2.5rem; color: var(--primary)">5k+</h2>
				<p style="color: var(--text-muted); font-weight: 600">Happy Users</p>
			</div>
			<div class="stat-item" style="flex: 1">
				<h2 style="font-size: 2.5rem; color: var(--primary)">15+</h2>
				<p style="color: var(--text-muted); font-weight: 600">
					Years Experience
				</p>
			</div>
		</div>
	</div>

	<!-- ===== FEATURES ===== -->
	<section style="padding: 8rem 0; text-align: center">
		<div class="container animate-fade">
			<h2
				style="
						font-size: 2.5rem;
						margin-bottom: 2rem;
						color: var(--text-dark);
					">
				Ready for Next-Gen Printing?
			</h2>
			<p
				style="
						color: var(--text-muted);
						max-width: 600px;
						margin: 0 auto 3rem;
					">
				Join thousands of students and businesses who trust PRNT for their
				most important documents and creative works.
			</p>
			<a href="./pages/client/dashboard/" class="btn btn-primary" style="padding: 1rem 2rem">Order Now
				<i class="fas fa-arrow-right" style="margin-left: 0.5rem"></i></a>
		</div>
	</section>

	<!-- ===== AUTH MODALS (HIDDEN BY DEFAULT) ===== -->
	<?php include './components/Modal/login.php' ?>
	<?php include './components/Modal/register.php' ?>

	<!-- ===== FOOTER (Placeholder for JS injection) ===== -->
	<footer class="footer" id="mainFooter">
		<div class="container">
			<div class="footer-grid">
				<div class="footer-col">
					<h4><i class="fas fa-print" style="margin-right:0.5rem;"></i> PRNT</h4>
					<p>Your trusted online printing partner. Quality prints delivered fast to BulSU students and the local community.</p>
				</div>
				<div class="footer-col">
					<h4>Quick Links</h4>
					<ul>
						<li><a href="./">Home</a></li>
						<li><a href="./pages/about/">About</a></li>
						<li><a href="./pages/works/">Works</a></li>
						<li><a href="./pages/service/">Services</a></li>
						<li><a href="./pages/contact/">Contact</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4>Services</h4>
					<ul>
						<li><a href="./pages/service/">Document Printing</a></li>
						<li><a href="./pages/service/">Photo Printing</a></li>
						<li><a href="./pages/service/">Tarpaulin Printing</a></li>
						<li><a href="./pages/service/">Booklet Binding</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4>Contact</h4>
					<ul>
						<li><a href="./pages/contact/"><i class="fas fa-envelope" style="width:16px;"></i> prnt@bulsu.edu.ph</a></li>
						<li><a href="./pages/contact/"><i class="fas fa-phone" style="width:16px;"></i> +63 912 345 6789</a></li>
						<li><a href="./pages/contact/"><i class="fas fa-map-marker-alt" style="width:16px;"></i> Malolos, Bulacan</a></li>
					</ul>
				</div>
			</div>
			<div class="footer-bottom">
				<p>© 2026 PRNT — All rights reserved. Built with ❤️ for BulSU.</p>
			</div>
		</div>
	</footer>
	<script src="./global/global.js"></script>
	<script>
		const email = document.getElementById("emailInput");
		const password = document.getElementById("passInput");
		const submitButt = document.getElementById("submitButton");
		const form = $("#login-form");
		//show pass

		function checkFields() {
			if (email.value.trim() == "" || password.value.trim() == "") {
				submitButt.disabled = true;
			} else {
				submitButt.disabled = false;
			}
		}

		function login() {
			let payload = {
				email: $("#emailInput").val(),
				password: $("#passInput").val(),
			};

			$.ajax({
				url: "./api/login.php",
				type: "POST",
				data: "action=postOne&payload=" + JSON.stringify(payload),
				success: function(response) {
					let respo = JSON.parse(response);
					if (respo.status == "success") {
						checkAccountType($("#emailInput").val());
					} else {
						alert(respo.message);
					}
				},
				error: function(error) {
					alert(error);
				},
			});
		}

		form.on("submit", function(e) {
			e.preventDefault();
			login();
		});
		email.addEventListener("input", checkFields);
		password.addEventListener("input", checkFields);

		function showPass() {
			const passwordInput = document.getElementById("floatingPassword");
			const toggle = document.getElementById("showPasswordToggle");
		}

		function checkAccountType(email) {
			if (email == "admin1@admin.com") {
				window.location.href = "./pages/admin/dashboard/";
			} else {
				window.location.href = "./pages/client/dashboard/";
			}
		}
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
		regForm.on("submit", function(e) {
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
				url: "./api/registration.php",
				data: "action=postOne&email=" + id,
			});
		}

		function store(payload) {
			$.ajax({
				type: "POST",
				url: "./api/registration.php",
				data: "action=store&payload=" + JSON.stringify(payload),
				success: function(response) {
					let reply = JSON.parse(response); //response ng api
					alert(reply.message);

					if (reply.status == "success") {
						switchAuthModal('login')
					}
				},
				error: function(error) {
					alert(JSON.stringify(error));
				},
			});
		}
	</script>

</body>

</html>