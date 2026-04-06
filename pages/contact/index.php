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
	<link rel="icon" href="../../assets/img/PRNT_logo.png" type="image/png">
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
	<?php include '../../components/Navbar/Navbar.php' ?>
	<!-- start of body-->

	<!-- ===== HERO ===== -->
	<section class="hero" style="padding: 4rem 0;">
		<div class="container animate-slide">
			<h1 style="font-size:2.5rem;margin-bottom:0.5rem;">Get in Touch</h1>
			<p style="margin-bottom:0;">We'd love to hear from you. Send us a message.</p>
		</div>
	</section>

	<!-- ===== CONTACT MAIN ===== -->
	<section class="contact-section">
		<div class="container">
			<div class="contact-grid">
				<div class="contact-info reveal">
					<h2>Contact Information</h2>
					<p>Have questions about bulk orders or custom prints? Drop us a line.</p>
					<div class="contact-detail">
						<i class="fas fa-map-marker-alt"></i>
						<div>
							<div style="font-weight:600;color:var(--text-dark);">Address</div>
							<span>MacArthur Highway, Malolos, Bulacan (Near BulSU Gate 1)</span>
						</div>
					</div>
					<div class="contact-detail">
						<i class="fas fa-envelope"></i>
						<div>
							<div style="font-weight:600;color:var(--text-dark);">Email</div>
							<span>prnt@bulsu.edu.ph</span>
						</div>
					</div>
					<div class="contact-detail">
						<i class="fas fa-phone"></i>
						<div>
							<div style="font-weight:600;color:var(--text-dark);">Phone</div>
							<span>+63 912 345 6789</span>
						</div>
					</div>
				</div>
				<div class="contact-form card reveal">
					<form id="contact-form">
						<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
							<div class="form-group">
								<label for="cName">Your Name</label>
								<input type="text" id="cName" required>
							</div>
							<div class="form-group">
								<label for="cEmail">Your Email</label>
								<input type="email" id="cEmail" required>
							</div>
						</div>
						<div class="form-group">
							<label for="cSubject">Subject</label>
							<input type="text" id="cSubject" required>
						</div>
						<div class="form-group">
							<label for="cMessage">Message</label>
							<textarea id="cMessage" rows="5" required></textarea>
						</div>
						<button type="submit" class="btn btn-primary" style="font-size:1.05rem;"><i class="fas fa-paper-plane"></i> Send Message</button>
					</form>
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