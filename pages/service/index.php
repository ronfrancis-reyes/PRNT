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
    <title>PRNT - Our Services</title>
</head>
	<body>
		<!-- navigation -->
		<?php include __DIR__ . '/../../components/Navbar/Navbar.html'; ?>

		<!-- ─── SECTION 1: HERO ─── -->
		<section class="service-hero">
			<div class="service-hero-overlay"></div>
			<div class="container position-relative z-1">
				<div class="row align-items-center min-vh-section">
					<div class="col-lg-7 reveal">
						<div class="hero-badge mb-4">
							<span class="badge-dot"></span>
							<span class="badge-text">Our Expertise</span>
						</div>
						<h1 class="display-3 fw-800 text-white mb-4">Printing solutions you've been <span class="text-orange">waiting for.</span></h1>
						<p class="lead mb-5 pe-lg-5" style="color: rgba(255,255,255,0.65);">Delivering reliable printing, custom designs, and finishing services that match your requirements every time.</p>

					</div>

				</div>

				<!-- Taglines row -->
				<div class="row g-4 pb-5 reveal">
					<div class="col-md-4 text-center">
						<p class="fw-700 text-orange h5 mb-0">Print Bold</p>
					</div>
					<div class="col-md-4 text-center">
						<p class="fw-700 text-orange h5 mb-0">Work Together</p>
					</div>
					<div class="col-md-4 text-center">
						<p class="fw-700 text-orange h5 mb-0">Deliver Excellence</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── SECTION 2: PRICING CARDS ─── -->
		<section class="pricing-section-bg text-dark section-padding" id="pricing">
			<div class="container">
				<div class="row text-center mb-5 reveal">
					<div class="col-12">
						<div class="hero-badge mb-4 mx-auto">
							<span class="badge-dot"></span>
							<span class="badge-text">Pricing</span>
						</div>
						<h2 class="h1 fw-800 text-dark mb-3">Our <span class="text-orange">Services & Pricing</span></h2>
						<p class="text-muted" style="font-size: 1.1rem;">Transparent pricing for every print need — no surprises.</p>
					</div>
				</div>
			<!-- START OF SERVICES SECTION -->
			<div class="row g-4 reveal align-items-stretch">
				<!-- [1] Photo Printing (Per Piece) -->
				<div class="col-lg-6">
					<div class="glass-service-card-modern p-5 h-100">
						<div class="d-flex justify-content-between align-items-start mb-4">
							<div>
								<div class="service-icon-wrapper">
									<i class="fa-solid fa-camera-retro"></i>
								</div>
								<h3 class="fw-800 text-dark mb-2">Photo Printing</h3>
								<p class="text-muted mb-0" style="font-size: 0.95rem; line-height: 1.6;">Standard per-piece photo printing.</p>
							</div>
							<span class="price-tag">₱20 – ₱80</span>
						</div>
						
						<div class="package-list-modern mt-3">
							<div class="package-item-modern"><span>2R (2.5" x 3.5")</span> <span>₱20 / pc</span></div>
							<div class="package-item-modern"><span>3R (3.5" x 5")</span> <span>₱30 / pc</span></div>
							<div class="package-item-modern"><span>4R (4" x 6")</span> <span>₱40 / pc</span></div>
							<div class="package-item-modern"><span>5R (5" x 7")</span> <span>₱50 / pc</span></div>
							<div class="package-item-modern"><span>A4 (8" x 11")</span> <span>₱80 / pc</span></div>
						</div>
						<a href="../client/order/index.php" class="card-cta-btn">Order Now <i class="fas fa-arrow-right ms-1"></i></a>
					</div>
				</div>

				<!-- [2] ID Photo Packages -->
				<div class="col-lg-6">
					<div class="glass-service-card-modern highlight-border p-5 h-100">
						<div class="popular-badge">Best Value</div>
						<div class="d-flex justify-content-between align-items-start mb-4">
							<div>
								<div class="service-icon-wrapper">
									<i class="fa-solid fa-id-badge"></i>
								</div>
								<h3 class="fw-800 text-dark mb-2">ID Photo Packages</h3>
								<p class="text-muted mb-0" style="font-size: 0.95rem; line-height: 1.6;">Includes layout formatting for ID photos.</p>
							</div>
							<span class="price-tag">₱50 / pkg</span>
						</div>
						
						<div class="package-list-modern mt-3">
							<div class="package-item-modern"><span>Package A: 1x1</span> <span>12 pcs</span></div>
							<div class="package-item-modern"><span>Package B: 2x2</span> <span>6 pcs</span></div>
							<div class="package-item-modern"><span>Package C: 1x1 (8) + 2x2 (4)</span> <span>12 pcs</span></div>
							<div class="package-item-modern"><span>Package D: Passport Size</span> <span>6 pcs</span></div>
						</div>
						<a href="../client/order/index.php" class="card-cta-btn">Order Now <i class="fas fa-arrow-right ms-1"></i></a>
					</div>
				</div>

				<!-- [3] Document Printing -->
				<div class="col-lg-4">
					<div class="glass-service-card-modern p-4 h-100">
						<div class="d-flex justify-content-between align-items-start mb-4">
							<div>
								<div class="service-icon-wrapper" style="width: 50px; height: 50px; font-size: 1.4rem; margin-bottom: 20px;">
									<i class="fa-solid fa-file-lines"></i>
								</div>
								<h3 class="fw-800 text-dark mb-2">Documents</h3>
								<p class="text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">Supports <strong class="text-orange">PDF, DOCX, & PPT</strong>.</p>
							</div>
							<span class="price-tag">Starts ₱5</span>
						</div>
						
						<div class="package-list-modern mt-2">
							<div class="package-item-modern"><span>Black & White</span> <span>from ₱5</span></div>
							<div class="package-item-modern"><span>Partially Colored</span> <span>from ₱6</span></div>
							<div class="package-item-modern"><span>Full Colored</span> <span>from ₱7</span></div>
							<div class="package-item-modern"><span>Picture Heavy</span> <span>from ₱10</span></div>
						</div>
					</div>
				</div>

				<!-- [4] Large Format -->
				<div class="col-lg-4">
					<div class="glass-service-card-modern p-4 h-100">
						<div class="d-flex justify-content-between align-items-start mb-4">
							<div>
								<div class="service-icon-wrapper" style="width: 50px; height: 50px; font-size: 1.4rem; margin-bottom: 20px;">
									<i class="fa-solid fa-panorama"></i>
								</div>
								<h3 class="fw-800 text-dark mb-2">Large Format</h3>
								<p class="text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">For posters, banners, and events.</p>
							</div>
							<span class="price-tag">₱25+/sqft</span>
						</div>
						
						<div class="package-list-modern mt-2">
							<div class="package-item-modern"><span>Tarpaulin (Standard)</span> <span>Custom</span></div>
							<div class="package-item-modern"><span>Matte & Glossy Posters</span> <span>Custom</span></div>
							<div class="package-item-modern"><span>Custom Vinyl Banners</span> <span>Custom</span></div>
						</div>
					</div>
				</div>

				<!-- [5] Brochures -->
				<div class="col-lg-4">
					<div class="glass-service-card-modern p-4 h-100">
						<div class="d-flex justify-content-between align-items-start mb-4">
							<div>
								<div class="service-icon-wrapper" style="width: 50px; height: 50px; font-size: 1.4rem; margin-bottom: 20px;">
									<i class="fa-solid fa-book-open"></i>
								</div>
								<h3 class="fw-800 text-dark mb-2">Brochures</h3>
								<p class="text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">For marketing and handouts.</p>
							</div>
							<span class="price-tag">₱8 – ₱30</span>
						</div>
						
						<div class="package-list-modern mt-2">
							<div class="package-item-modern"><span>A4 (Bi/Tri-fold)</span> <span>Ask Us</span></div>
							<div class="package-item-modern"><span>Bulk (50+)</span> <span>₱8–₱15</span></div>
							<div class="package-item-modern"><span>Small qty (<50)</span> <span>₱15–₱30</span></div>
						</div>
					</div>
				</div>

				<div class="col-12 reveal mt-5 text-center">
					<div class="glass-card p-4 border-0 d-inline-block rounded-4" style="background: rgba(255,255,255,0.9); box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
						<p class="mb-0 text-dark fw-600" style="font-size: 1.05rem;">For custom printing requirements, just go to our hub or send us a message through our <a href="../contact/" class="text-orange fw-800 text-decoration-none">Contact page <i class="fas fa-arrow-right ms-1"></i></a>.</p>
					</div>
				</div>
			</div>
			</div>
		</section>

		<!-- ─── SECTION 3: IMAGE SHOWCASE ─── -->
		<section class="bg-black text-white section-padding">
			<div class="container">
				<div class="row align-items-center g-5">
					<div class="col-lg-6 reveal">
						<div class="showcase-img-wrapper rounded-4 overflow-hidden">
							<img src="../../assets/img/img17.jpg" alt="Service Showcase" class="img-fluid w-100">
						</div>
					</div>
					<div class="col-lg-6 reveal">
						<div class="hero-badge mb-4">
							<span class="badge-dot"></span>
							<span class="badge-text">Quality First</span>
						</div>
						<h2 class="h1 fw-800 text-white mb-4">Built for <span class="text-orange">precision.</span> Designed for impact.</h2>
						<p class="mb-4" style="color: rgba(255,255,255,0.6); line-height: 1.8;">Every print job goes through a strict quality check before it reaches your hands. We use industrial-grade equipment to ensure color accuracy, sharp text, and premium finishes — every single time.</p>
						<div class="row g-3 mt-2">
							<div class="col-6">
								<div class="service-stat-box p-3 rounded-3">
									<div class="fw-800 text-orange mb-1" style="font-size:1.5rem;">100%</div>
									<div class="small" style="color: rgba(255,255,255,0.5);">Quality Guaranteed</div>
								</div>
							</div>
							<div class="col-6">
								<div class="service-stat-box p-3 rounded-3">
									<div class="fw-800 text-orange mb-1" style="font-size:1.5rem;">24h</div>
									<div class="small" style="color: rgba(255,255,255,0.5);">Standard Turnaround</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── SECTION 4: SECOND IMAGE SHOWCASE ─── -->
		<section class="bg-white text-dark section-padding">
			<div class="container">
				<div class="row align-items-center g-5">
					<div class="col-lg-6 order-lg-2 reveal">
						<div class="showcase-img-wrapper rounded-4 overflow-hidden">
							<img src="../../assets/img/img14.jpg" alt="Service Showcase" class="img-fluid w-100">
						</div>
					</div>
					<div class="col-lg-6 order-lg-1 reveal">
						<div class="hero-badge mb-4" style="background: rgba(255,68,0,0.08); border-color: rgba(255,68,0,0.2);">
							<span class="badge-dot"></span>
							<span class="badge-text">For Everyone</span>
						</div>
						<h2 class="h1 fw-800 text-dark mb-4">Professional prints for <span class="text-orange">students & businesses.</span></h2>
						<p class="text-muted mb-4" style="line-height: 1.8;">Whether it's a thesis, a marketing campaign, or an event banner — PRNT handles it all with the same dedication to excellence. Fast, affordable, and always on time.</p>
						<a href="../client/order/index.php" class="btn-landing-primary d-inline-block">Start Your Order</a>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── SECTION 5: FAQ ─── -->
		<section class="faq-section section-padding">
			<div class="container">
				<div class="row justify-content-center mb-5">
					<div class="col-lg-7 text-center reveal">
						<div class="hero-badge mb-4 mx-auto">
							<span class="badge-dot"></span>
							<span class="badge-text">FAQ</span>
						</div>
						<h2 class="display-5 fw-800 text-white mb-3">Frequently Asked <span class="text-orange">Questions.</span></h2>
						<p style="color: rgba(255,255,255,0.55); font-size:1rem;">Everything you need to know about PRNT's printing process, formats, and services.</p>
					</div>
				</div>

				<div class="row justify-content-center">
					<div class="col-lg-8">
						<div class="faq-list">

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'sfaqA1')">
									<span>How do I submit my files for printing?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="sfaqA1">
									<p>You can upload your files directly through our order portal or visit us in person with your USB drive or mobile device. We recommend submitting at least 24 hours before your deadline.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'sfaqA2')">
									<span>Do you offer delivery for prints?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="sfaqA2">
									<p>Yes! We offer standard and rush delivery options within the local campus and surrounding areas for a small fee.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'sfaqA3')">
									<span>How fast can I get my prints?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="sfaqA3">
									<p>Most standard document and photo prints are ready within 24 hours. Large format projects typically take 1–2 business days.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'sfaqA4')">
									<span>What payment methods do you accept?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="sfaqA4">
									<p>We only accept cash payments for delivery or pick-up.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'sfaqA5')">
									<span>What file formats do you accept?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="sfaqA5">
									<p>We accept standard formats including PDF (preferred), high-resolution JPEG, PNG, and DOCX.</p>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</section>

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

            // Custom FAQ Toggle
            function toggleFaq(btn, id) {
                const answer = document.getElementById(id);
                const icon = btn.querySelector('.faq-icon i');
                const item = btn.closest('.faq-item');
                const isOpen = item.classList.contains('open');

                document.querySelectorAll('.faq-item.open').forEach(el => {
                    el.classList.remove('open');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                    el.querySelector('.faq-icon i').className = 'fas fa-plus';
                });

                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.className = 'fas fa-minus';
                }
            }
        </script>
	</body>
</html>
