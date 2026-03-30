<?php
include "../../../api/config.php";
if(!isset($_SESSION['user'])) {
header("Location: ../../../index.php");
} else if ($_SESSION['user'] == 1) {
header("Location: ../../admin/dashboard/");
}
?>
<!doctype html>

<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>My Orders — PRNT</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
	<link rel="stylesheet" href="../../../components/Navbar/Navbar.css" />
	<link rel="stylesheet" href="../../../components/Footer/Footer.css" />
	<link rel="stylesheet" href="../../../global/global.css" />
	<link rel="stylesheet" href="styles.css" />
</head>

<body style="background: var(--background)">
	<!--Navbar-->
	<!--Hindi pwede ung nasa components kasi ../../ lang yon, dapat ../../../ kaya need pa irevise tong design para di maulit-->
	<div class="mobile-menu-overlay" id="mobileOverlay"></div>
	<div class="mobile-menu" id="mobileMenu">
		<button class="close-menu" onclick="toggleMobileMenu()">
			<i class="fas fa-times"></i>
		</button>
		<a href="../../../index.php">Home</a>
		<a href="../../about/">About</a>
		<a href="../../works/">Work</a>
		<a href="../../service/">Services</a>
		<a href="../../contact/">Contact</a>
		<a href="../../client/service-avail/">Order Now</a>
		<a href="#" onclick="showAuthModal('login')">Login</a>
	</div>
	<div
		class="mobile-menu-overlay"
		id="mobileOverlay"
		onclick="toggleMobileMenu()"></div>
	<div class="mobile-menu" id="mobileMenu">
		<button class="close-menu" onclick="toggleMobileMenu()">
			<i class="fas fa-times"></i>
		</button>
		<a href="../../../index.php" data-nav="root">Home</a>
		<a href="../../about/" data-nav="about">About</a>
		<a href="../../works/" data-nav="works">Work</a>
		<a href="../../service/" data-nav="service">Services</a>
		<a href="../../contact/" data-nav="contact">Contact</a>
		<a href="../service-avail/" data-nav="order">Order Now</a>
		<a onclick="showAuthModal('login')">Login</a>
	</div>

	<nav class="navbar" id="navbar">
		<div class="container flex align-center justify-between" style="width: 100%">
			<a href="../../../index.php" class="logo"> <i class="fas fa-print"></i> PRNT </a>
			<ul class="nav-links" id="navLinks">
				<li><a href="../../../index.php">Home</a></li>
				<li><a href="../../about/">About</a></li>
				<li><a href="../../works/">Work</a></li>
				<li><a href="../../service/">Services</a></li>
				<li><a href="../contact/">Contact</a></li>
			</ul>
			<div class="flex align-center" style="gap: 1rem">
				<a
					href="../client/service-avail/"
					class="btn btn-primary"
					id="orderNowBtn">
					<i class="fas fa-shopping-cart"></i> Order Now
				</a>
				<a
					onclick="showAuthModal('login')"
					class="btn btn-outline"
					id="loginBtn">Login</a>
				<button class="mobile-menu-btn" onclick="toggleMobileMenu()">
					<i class="fas fa-bars"></i>
				</button>
			</div>
		</div>
	</nav>
	<!-- End of Navbar -->

	<section class="client-dashboard" style="padding: 4rem 0">
		<div class="container">
			<div
				style="
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 3rem;
					">
				<h2 style="font-size: 2rem; color: var(--text-dark)">
					Your Order History
				</h2>
				<a href="../service-avail/" class="btn btn-primary"><i class="fas fa-plus"></i> New Order</a>
			</div>

			<div id="orderList" class="animate-fade">
				<!-- JS Render -->
				<!--placeholder for orders-->
				<div style="text-align:center; padding:5rem; color:var(--text-muted);">
					<i class="fas fa-shopping-cart" style="font-size:4rem; margin-bottom:2rem; opacity:0.1;"></i>
					<h3 style="margin-bottom:1rem;">You haven't placed any orders yet.</h3>
					<p style="margin-bottom:2rem;">Start your first printing order today.</p>
					<a href="/pages/client/service-avail/" class="btn btn-primary">Place Your First Order</a>
				</div>
				<div class="order-card-client animate-fade">
					<div style="background:var(--secondary); width:64px; height:64px; border-radius:16px; display:flex; align-items:center; justify-content:center; color:var(--primary); font-size:1.5rem;">
						<i class="fas fa-receipt"></i>
					</div>
					<div>
						<div style="font-weight:800; color:var(--text-dark); font-size:1.25rem;">${o.id}</div>
						<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">Placed on ${new Date(o.timestamp).toLocaleDateString()}</div>
						<div style="display:flex; gap:1.5rem; font-weight:700; color:var(--text-dark);">
							<span><i class="fas fa-print" style="color:var(--primary);"></i> ${o.items[0].service}</span>
							<span><i class="fas fa-peso-sign" style="color:var(--primary);"></i> ${o.total}</span>
						</div>
					</div>
					<div style="display:flex; flex-direction:column; align-items:flex-end; gap:1rem;">
						<span class="order-status-pill ${o.status === 'completed' ? 'status-completed' : 'status-pending'}">${o.status}</span>
						<button class="btn btn-outline" style="padding:0.6rem 1.25rem; font-size:0.85rem;" onclick="viewReceipt('${o.id}')">View Details</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div id="footer-placeholder"></div>

	<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
	<script src="../../../global/global.js"></script>
	<script src="script.js"></script>
</body>

</html>