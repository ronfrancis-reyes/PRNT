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
    <title>PRNT - About Us</title>
</head>
	<body>
		<!-- navigation -->
		<?php include __DIR__ . '/../../components/Navbar/Navbar.html'; ?>

		<!-- start of body-->
		<main>
			<section class="page page-about section-padding">
				<div class="container">
					<div class="row align-items-center">
						<div class="col-lg-7 reveal">
							<div class="hero-badge mb-3">
								<span class="badge-dot"></span>
								<span class="badge-text">About Us</span>
							</div>
							<h1 class="display-3 fw-800 text-dark mb-4">Bring your ideas to life with <span class="text-orange">PRNT.</span></h1>
							<p class="lead text-muted mb-5">We bridge the gap between digital vision and physical reality, delivering premium printing solutions with artistic precision.</p>
							<a href="../client/order/index.php" class="btn-prnt-primary">PRINT NOW <i class="fas fa-arrow-right ms-2"></i></a>
						</div>
						<div class="col-lg-5 mt-5 mt-lg-0 reveal">
							<div class="image-box border-0 rounded-4 ms-auto shadow-lg overflow-hidden position-relative" style="box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important; max-width: 480px; margin-top: 80px;">
								<img
									src="../../assets/img/img19.jpg"
									class="img-fluid w-100"
									alt="Printer"
								/>
								<div class="p-4 position-absolute bottom-0 w-100" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-top: 1px solid rgba(255,255,255,0.15);">
									<p class="text-white small mb-0 fw-500" style="color: rgba(255,255,255,0.95) !important; line-height: 1.6; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
										Quality is our signature. We use industrial-grade equipment to ensure every print reflects your high standards.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="page page-works section-padding bg-black">
				<div class="container">
					<div class="row align-items-center">
						<div class="col-lg-6 reveal">
							<div class="hero-badge mb-4">
								<span class="badge-dot dot-white"></span>
								<span class="badge-text text-white">Our Core Value</span>
							</div>
							<div class="glass-card p-2 mb-4">
								<img
									src="../../assets/img/img20.jpg"
									class="img-fluid rounded-4"
									alt="Process"
								/>
							</div>
							<p class="text-orange fw-700 h5 mb-0">
								Precision in every pixel. Quality in every sheet.
							</p>
						</div>
						<div class="col-lg-6 ps-lg-5 reveal">
							<h2 class="works-text text-white fw-800 mb-4">
								High-quality prints for <span class="text-orange">Students & Professionals.</span>
							</h2>
							<p class="lead text-light mb-4">
								PRNT delivers high-quality printing tailored for academic excellence and local business impact. 
							</p>
							<div class="row g-4 mt-2">
								<div class="col-6">
									<div class="stat-box mt-3">
										<h3 class="text-orange fw-800 mb-0">100%</h3>
										<p class="small text-light mb-0">Precision</p>
									</div>
								</div>
								<div class="col-6">
									<div class="stat-box mt-3">
										<h3 class="text-orange fw-800 mb-0">100%</h3>
										<p class="small text-light mb-0">Satisfaction</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="page page-vision section-padding">
				<div class="container py-5">
					<div class="row align-items-center justify-content-center text-center">
						<div class="col-12 reveal">
							<div class="hero-badge mb-4 mx-auto">
								<span class="badge-dot"></span>
								<span class="badge-text">Our Vision</span>
							</div>
							<h2 class="vision-title mx-auto text-dark fw-800 mb-5">
								The most <span class="text-orange">trusted</span> print partner, designed to make professional quality accessible to everyone.
							</h2>
							<div class="row g-4 mt-2">
								<div class="col-md-4 reveal">
									<div class="glass-card p-2 overflow-hidden hover-zoom">
										<img src="../../assets/img/img8.jpg" class="vision-img rounded-4" alt="Vision 1" />
									</div>
								</div>
								<div class="col-md-4 reveal">
									<div class="glass-card p-2 overflow-hidden hover-zoom">
										<img src="../../assets/img/img10.jpg" class="vision-img rounded-4" alt="Vision 2" />
									</div>
								</div>
								<div class="col-md-4 reveal">
									<div class="glass-card p-2 overflow-hidden hover-zoom">
										<img src="../../assets/img/img3.jpg" class="vision-img rounded-4" alt="Vision 3" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="page page-mission-wrapper section-padding">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-11 reveal">
							<div class="mission-card glass-card bg-black bg-opacity-50 border-0 p-5 p-lg-10 shadow-glow">
								<div class="hero-badge mb-5 mx-auto">
									<span class="badge-dot"></span>
									<span class="badge-text">Our Mission</span>
								</div>
								<h2 class="mission-text mx-auto text-white fw-800 mb-5" style="text-shadow: 0 4px 20px rgba(0,0,0,0.5);">
									We harness the power of quality printing and creative design to help <span class="text-orange">students and local businesses succeed.</span>
								</h2>
								<p class="lead text-light mx-auto mb-0" style="max-width: 800px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
									Through our reliable and affordable print solutions, we inspire, engage, and deliver results, ensuring every project stands out and meets your needs.
								</p>
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
