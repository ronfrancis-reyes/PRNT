<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
	<!--Tab Logo-->
	<link rel="icon" href="assets/img/PRNT_logo.png" type="image/png" />
	<!--Logo Library -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link rel="stylesheet" href="../../components/Navbar/Navbar.css" />
	<link rel="stylesheet" href="../../components/Footer/Footer.css" />
	<link rel="stylesheet" href="styles.css" />
	<link rel="stylesheet" href="../../global/global.css" />
	<title>PRNT</title>
</head>

<body>
	<!-- heading/navigation bar -->
	<?php include "../../components/Navbar/Navbar.php"; ?>

	<!-- start of body-->
	<section class="hero" style="padding: 4rem 0;">
		<div class="container animate-slide">
			<h1 style="font-size:2.5rem;margin-bottom:0.5rem;">Who We Are</h1>
			<p style="margin-bottom:0;">Discover the story behind PRNT.</p>
		</div>
	</section>

	<!-- ===== ABOUT MAIN ===== -->
	<section class="about-section">
		<div class="container">
			<div class="about-grid">
				<div class="about-image reveal">
					<i class="fas fa-print"></i>
				</div>
				<div class="about-content reveal">
					<h2>We Make Printing Easy.</h2>
					<p>PRNT was born out of a simple need: to provide BulSU students and local residents with a hassle-free,
						reliable, and high-quality printing solution.</p>
					<p>No more waiting in long lines or dealing with broken machines. Just upload your files, select your
						preferences, and pick up your prints—or have them delivered right to your doorstep.</p>
					<div class="stats-row">
						<div class="stat-item">
							<div class="stat-number">2023</div>
							<div class="stat-label">Year Founded</div>
						</div>
						<div class="stat-item">
							<div class="stat-number">10+</div>
							<div class="stat-label">Team Members</div>
						</div>
						<div class="stat-item">
							<div class="stat-number">15K+</div>
							<div class="stat-label">Orders Fulfilled</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<?php include '../../components/Modal/login.php' ?>
	<?php include '../../components/Modal/register.php' ?>
	<!--footer-->
	<?php include "../../components/Footer/Footer.php"; ?>


	<script type="module" src="script.js"></script>
	<script src="../../global/global.js"></script>
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