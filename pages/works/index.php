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
    <title>PRNT - Our Works</title>
</head>
	<body>
		<!-- navigation -->
		<?php include __DIR__ . '/../../components/Navbar/Navbar.html'; ?>

		<!-- start of body-->
	<!-- Works Section -->
		<section class="page-header bg-black text-white section-padding pb-0">
			<div class="container">
				<div class="row mb-5 reveal">
					<div class="col-lg-8">
						<div class="hero-badge mb-3">
							<span class="badge-dot"></span>
							<span class="badge-text">Our Gallery</span>
						</div>
						<h1 class="display-3 fw-800 text-white mb-4">Featured <span class="text-orange">Work.</span></h1>
						<p class="lead text-light">Providing professional printing and custom solutions designed to meet your exact project needs.</p>
					</div>
				</div>
			</div>
		</section>
	
		<section class="page-gallery bg-white text-dark py-5 overflow-hidden">
			<!-- Track 1: Left Scroll -->
			<div class="marquee-wrapper mb-4">
				<div class="marquee-track track-left">
					<!-- Original Set -->
					<div class="marquee-item"><img src="../../assets/img/img1.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img5.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img11.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img6.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img23.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<!-- Duplicate Set for Seamless Loop -->
					<div class="marquee-item"><img src="../../assets/img/img1.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img5.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img11.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img6.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img23.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
				</div>
			</div>

			<!-- Track 2: Right Scroll -->
			<div class="marquee-wrapper mt-4">
				<div class="marquee-track track-right">
					<!-- Original Set -->
					<div class="marquee-item"><img src="../../assets/img/img24.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img26.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img27.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img32.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img30.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<!-- Duplicate Set for Seamless Loop -->
					<div class="marquee-item"><img src="../../assets/img/img24.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img26.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img27.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img32.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
					<div class="marquee-item"><img src="../../assets/img/img30.jpg" alt="Work Showcase" class="rounded-4 shadow-sm"></div>
				</div>
			</div>
		</section>


	<!-- FAQ Section -->
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
								<button class="faq-question" onclick="toggleFaq(this, 'faqA1')">
									<span>How do I submit my files for printing?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="faqA1">
									<p>You can upload your files directly through our order portal or visit us in person with your USB drive or mobile device. We recommend submitting at least 24 hours before your deadline.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'faqA2')">
									<span>Do you offer delivery for prints?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="faqA2">
									<p>Yes! We offer standard and rush delivery options within the local campus and surrounding areas. Contact us to arrange your preferred delivery schedule.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'faqA3')">
									<span>What payment methods do you accept?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="faqA3">
									<p>We only accept cash payments for delivery or pick-up.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'faqA4')">
									<span>What file formats do you accept for printing?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="faqA4">
									<p>We accept standard formats including PDF (preferred), high-resolution JPEG, PNG, and DOCX.</p>
								</div>
							</div>

							<div class="faq-item reveal">
								<button class="faq-question" onclick="toggleFaq(this, 'faqA5')">
									<span>Can I request a sample proof before a large order?</span>
									<span class="faq-icon"><i class="fas fa-plus"></i></span>
								</button>
								<div class="faq-answer" id="faqA5">
									<p>Absolutely. For high-volume projects, we highly recommend requesting a single physical proof to verify color accuracy and material quality before committing to a full production run. Just message us or go to our hub to request a sample proof.</p>
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

                // Close all
                document.querySelectorAll('.faq-item.open').forEach(el => {
                    el.classList.remove('open');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                    el.querySelector('.faq-icon i').className = 'fas fa-plus';
                });

                // Open clicked if it was closed
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.className = 'fas fa-minus';
                }
            }
        </script>
	</body>
</html>
