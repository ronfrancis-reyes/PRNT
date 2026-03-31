<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!--Imported Font-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
		rel="stylesheet" />
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
		crossorigin="anonymous" />
	<!--Bootstrap-->
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
		crossorigin="anonymous" />
	<!--Tab Logo-->
	<link rel="icon" href="../../assets/img/PRNT_logo.png" type="image/png">
	<!--Logo Library -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<!--CSS-->
	<link rel="stylesheet" href="../../components/Navbar/Navbar.css" />
	<link rel="stylesheet" href="../../components/Footer/Footer.css" />
	<link rel="stylesheet" href="styles.css" />
	<link rel="stylesheet" href="../../global/global.css" />

	<title>PRNT</title>
</head>

<body>
	<!-- heading/navigation bar -->
	<?php include '../../components/Navbar/Navbar.php' ?>

	<section class="hero" style="padding: 4rem 0;">
		<div class="container animate-slide">
			<h1 style="font-size:2.5rem;margin-bottom:0.5rem;">What We Do</h1>
			<p style="margin-bottom:0;">Professional printing services tailored to your needs.</p>
		</div>
	</section>

	<!-- ===== SERVICES MAIN ===== -->
	<section class="services-section">
		<div class="container">
			<div class="services-grid">
				<div class="card service-card reveal" style="transform:translateY(0);opacity:1;">
					<div class="icon"><i class="fas fa-file-alt"></i></div>
					<h3>Document Printing</h3>
					<p>Thesis, reports, handouts — black & white or color, any paper size.</p>
				</div>
				<div class="card service-card reveal" style="transform:translateY(0);opacity:1;">
					<div class="icon"><i class="fas fa-image"></i></div>
					<h3>Photo Printing</h3>
					<p>High-quality photo prints in various sizes with glossy or matte finish.</p>
				</div>
				<div class="card service-card reveal" style="transform:translateY(0);opacity:1;">
					<div class="icon"><i class="fas fa-scroll"></i></div>
					<h3>Tarpaulin Printing</h3>
					<p>Custom tarpaulins for events, promotions, and announcements.</p>
				</div>
				<div class="card service-card reveal" style="transform:translateY(0);opacity:1;">
					<div class="icon"><i class="fas fa-id-card"></i></div>
					<h3>ID / Card Printing</h3>
					<p>PVC IDs, business cards, invitations on premium cardstock.</p>
				</div>
				<div class="card service-card reveal" style="transform:translateY(0);opacity:1;">
					<div class="icon"><i class="fas fa-book"></i></div>
					<h3>Booklet / Binding</h3>
					<p>Hardbound thesis, spiral binding, and saddle-stitched booklets.</p>
				</div>
				<div class="card service-card reveal" style="transform:translateY(0);opacity:1;">
					<div class="icon"><i class="fas fa-sticky-note"></i></div>
					<h3>Sticker Printing</h3>
					<p>Custom laptop stickers, labels, and product decals.</p>
				</div>
			</div>
		</div>
	</section>
	<?php include '../../components/Modal/login.php' ?>
	<?php include '../../components/Modal/register.php' ?>
	<!-- footer -->
	<?php include "../../components/Footer/Footer.php"; ?>

	<script type="module" src="script.js"></script>
	<script src="../../global/global.js"></script>
	<script src="../login/script.js"></script>
	<script src="../registration/script.js"></script>

	<script
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js"
		integrity="sha384-G/EV+4j2dNv+tEPo3++6LCgdCROaejBqfUeNjuKAiuXbjrxilcCdDz6ZAVfHWe1Y"
		crossorigin="anonymous"></script>
</body>

</html>