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
	<div class="mobile-menu-overlay" id="mobileOverlay"></div>
	<div class="mobile-menu" id="mobileMenu">
		<button class="close-menu" onclick="toggleMobileMenu()">
			<i class="fas fa-times"></i>
		</button>
		<a href="index.php">Home</a>
		<a href="./pages/about/">About</a>
		<a href="./pages/works/">Work</a>
		<a href="./pages/service/">Services</a>
		<a href="./pages/contact/">Contact</a>
		<a href="./pages/client/dashboard/">Order Now</a>
		<a href="#" onclick="showAuthModal('login')">Login</a>
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
					<i class="fas fa-shopping-cart"></i> Order Now
				</a>
				<a
					class="btn btn-outline"
					id="loginBtn"
					onclick="showAuthModal('login')">Login</a>
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
						<li><a href="./pages/services/">Services</a></li>
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

		const API = "./api/login.php";

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
			postOne();
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
	</script>

</body>

</html>