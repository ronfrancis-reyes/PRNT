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
	<!--Tab Logo-->
	<link rel="icon" href="assets/img/PRNT_logo.png" type="image/png">
	<!--Logo Library -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!--CSS-->
	<link rel="stylesheet" href="../../components/Navbar/Navbar.css" />
	<link rel="stylesheet" href="../../components/Footer/Footer.css" />
	<link rel="stylesheet" href="../../global/global.css" />
	<link rel="stylesheet" href="styles.css" />

	<title>PRNT</title>
</head>

<body>
	<!-- heading/navigation bar -->
	<?php include '../../components/Navbar/Navbar.php' ?>

	<!-- start of body-->
	<!-- Works Section -->
	<section class="hero" style="padding: 4rem 0;">
		<div class="container animate-slide">
			<h1 style="font-size:2.5rem;margin-bottom:0.5rem;">Our Work</h1>
			<p style="margin-bottom:0;">Take a look at some of our recent print projects.</p>
		</div>
	</section>

	<!-- ===== WORK MAIN ===== -->
	<section class="work-section">
		<div class="container">
			<div class="work-grid">
				<div class="work-item reveal">
					<div class="overlay">
						<h4>Business Cards</h4>
						<p>Premium Matte Finish</p>
					</div>
				</div>
				<div class="work-item reveal">
					<div class="overlay">
						<h4>Event Tarpaulin</h4>
						<p>High-resolution 5x8ft</p>
					</div>
				</div>
				<div class="work-item reveal">
					<div class="overlay">
						<h4>Thesis Hardbound</h4>
						<p>Gold Stamped Lettering</p>
					</div>
				</div>
				<div class="work-item reveal">
					<div class="overlay">
						<h4>Custom Stickers</h4>
						<p>Die-cut Vinyl</p>
					</div>
				</div>
				<div class="work-item reveal">
					<div class="overlay">
						<h4>Corporate Booklet</h4>
						<p>Saddle-Stitched Annual Report</p>
					</div>
				</div>
				<div class="work-item reveal">
					<div class="overlay">
						<h4>Photo Prints</h4>
						<p>Glossy 8x10</p>
					</div>
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