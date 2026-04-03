<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    
    <!-- Core Styling -->
    <link rel="stylesheet" href="../../global/global.css?v=<?php echo time(); ?>" />
    <link rel="stylesheet" href="../../components/Navbar/Navbar.css" />
    <link rel="stylesheet" href="../../components/Footer/Footer.css" />
    <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>" />
    <link rel="icon" href="../../assets/img/PRNT_logo.png" type="image/png" />
    <title>PRNT - Contact Us</title>
</head>
	<body>
		<!-- navigation -->
		<?php include __DIR__ . '/../../components/Navbar/Navbar.html'; ?>
		<!-- start of body-->

		<main class="contact-section-bg">
			<section class="page-header pb-4 pt-5">
				<div class="container reveal mt-5">
					<div class="hero-badge mb-3">
						<span class="badge-dot"></span>
						<span class="badge-text">Get in Touch</span>
					</div>

					<div class="row align-items-end mt-4">
						<div class="col-lg-7">
							<h1 class="display-3 fw-900 text-dark mb-0 tracking-tight">Ready to <span class="text-orange">print?</span></h1>
						</div>
						<div class="col-lg-5">
							<p class="text-muted lead mb-2 mt-4 mt-lg-0" style="font-size: 1.1rem; line-height: 1.6;">
								At the heart of our process is a commitment to actively listen and understand your unique creative needs. Let's make it happen.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section class="pb-5 mb-5 mt-4">
				<div class="container pb-5">
					<div class="row g-5">
						
						<!-- LEFT COL: Info Card -->
						<div class="col-lg-4 reveal">
							<div class="contact-info-card">
								<div>
									<h2 class="fw-800 display-6 text-white mb-4">Let's start your project.</h2>
									<p class="opacity-75" style="font-size: 1.05rem; line-height: 1.6;">
										Whether your project is fully defined or still taking shape, we're here to provide the precision you need.
									</p>
								</div>
								
								<div class="mt-5 mb-5">
									<div class="info-item">
										<div class="info-icon"><i class="fas fa-envelope"></i></div>
										<div>
											<div class="small opacity-75 text-uppercase fw-700 tracking-wide mb-1" style="font-size: 0.75rem;">Email Us</div>
											<div class="fw-600">hello@prnt.app</div>
										</div>
									</div>
									<div class="info-item">
										<div class="info-icon"><i class="fas fa-phone"></i></div>
										<div>
											<div class="small opacity-75 text-uppercase fw-700 tracking-wide mb-1" style="font-size: 0.75rem;">Call Us</div>
											<div class="fw-600">+63 912 345 6789</div>
										</div>
									</div>
									<div class="info-item">
										<div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
										<div>
											<div class="small opacity-75 text-uppercase fw-700 tracking-wide mb-1" style="font-size: 0.75rem;">Visit Hub</div>
											<div class="fw-600">Main Campus, PH</div>
										</div>
									</div>
								</div>
								
								<a href="../../" class="btn btn-outline-light rounded-pill px-4 py-3 fw-700 w-100 text-center" style="border-width: 2px;">
									BACK TO HOME <i class="fas fa-arrow-right ms-2"></i>
								</a>
							</div>
						</div>

						<!-- RIGHT COL: Form -->
						<div class="col-lg-8 reveal">
							<div class="contact-form-card">
								<h3 class="fw-800 text-dark mb-4 pb-2">Send us a message</h3>
								<form id="contact-form">
									<div class="row g-4">
										
										<div class="col-md-6">
											<label class="form-label-custom">FULL NAME</label>
											<div class="input-group-custom">
												<input type="text" class="form-control custom-input" placeholder="Juan Dela Cruz">
												<i class="fas fa-user input-icon"></i>
											</div>
										</div>

										<div class="col-md-6">
											<label class="form-label-custom">CONTACT NUMBER</label>
											<div class="input-group-custom">
												<input type="text" class="form-control custom-input" placeholder="(+63) 900 000 0000">
												<i class="fas fa-phone-alt input-icon"></i>
											</div>
										</div>

										<div class="col-12 mt-4">
											<label class="form-label-custom">MESSAGE</label>
											<div class="input-group-custom">
												<textarea class="form-control custom-input" rows="6" placeholder="Tell us more about your printing needs, specific requirements, or ask us any questions..."></textarea>
												<i class="fas fa-comment-dots input-icon"></i>
											</div>
										</div>

										<div class="col-12 mt-5">
											<button type="submit" class="btn-submit-custom">
												SEND MESSAGE <i class="fas fa-paper-plane"></i>
											</button>
										</div>
										
									</div>
								</form>
							</div>
						</div>

					</div>
				</div>
			</section>
		</main>

		<!-- footer -->
		<?php include __DIR__ . '/../../components/Footer/Footer.html'; ?>
		
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        
        <script>
            // Intersection Observer for Reveal Animations
            const observerOptions = { threshold: 0.15 };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        </script>
	</body>
</html>
