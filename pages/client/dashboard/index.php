<?php
include "../../../api/config.php";
if (!isset($_SESSION['user'])) {
	header("Location: ../../../index.php");
} else if ($_SESSION['role'] == 'Admin') {
	header("Location: ../../admin/dashboard/");
}
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
	<link rel="icon" href="../../../assets/img/PRNT_logo.png" type="image/png" />
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
	<div class="mobile-menu" id="mobileMenu">
		<button class="close-menu" onclick="toggleMobileMenu()">
			<i class="fas fa-times"></i>
		</button>
		<a href="../../../index.php">Home</a>
		<a href="../../about/">About</a>
		<a href="../../works/">Work</a>
		<a href="../../service/">Services</a>
		<a href="../../contact/">Contact</a>
		<div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
			<a href="../../user-profile/"
				style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
				id="navAvatar"><?php
								$fullname = explode(' ', $_SESSION['username']);
								$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
								echo $initials;
								?></a>
		</div>
	</div>

	<nav class="navbar" id="navbar">
		<div class="container flex align-center justify-between" style="width: 100%">
			<a href="../../../index.php" class="logo"> <i class="fas fa-print"></i> PRNT </a>
			<ul class="nav-links" id="navLinks">
				<li><a href="../../../index.php">Home</a></li>
				<li><a href="../../about/">About</a></li>
				<li><a href="../../works/">Work</a></li>
				<li><a href="../../service/">Services</a></li>
				<li><a href="../../contact/">Contact</a></li>
			</ul>
			<div class="flex align-center" style="gap: 1rem">
				<a
                    class="btn btn-primary"
                    id="orderNowBtn"
                    style="opacity: 0; cursor:default;">
                    <i class="fas fa-shopping-cart"></i> Order Now
                </a>
				<a href="../../user-profile/" class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
					<div
						style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
						id="navAvatar"><?php
										$fullname = explode(' ', $_SESSION['username']);
										$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
										echo $initials;
										?></div>
				</a>
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
			</div>
		</div>
	</section>

<!-- footer -->
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
          <li><a href="../../../index.php">Home</a></li>
          <li><a href="../../about/">About</a></li>
          <li><a href="../../works/">Works</a></li>
          <li><a href="../../service/">Services</a></li>
          <li><a href="../../contact/">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="../../service/">Document Printing</a></li>
          <li><a href="../../service/">Photo Printing</a></li>
          <li><a href="../../service/">Tarpaulin Printing</a></li>
          <li><a href="../../service/">Booklet Binding</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="../../contact/"><i class="fas fa-envelope" style="width:16px;"></i> prnt@bulsu.edu.ph</a></li>
          <li><a href="../../contact/"><i class="fas fa-phone" style="width:16px;"></i> +63 912 345 6789</a></li>
          <li><a href="../../contact/"><i class="fas fa-map-marker-alt" style="width:16px;"></i> Malolos, Bulacan</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 PRNT — All rights reserved. Built with ❤️ for BulSU.</p>
    </div>
  </div>
</footer>

	<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
	<script src="script.js"></script>
</body>

</html>