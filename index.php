<?php
/**
 * PRNT Landing Page — Conversion Focused
 * Scoped to .landing-page for isolated styles
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRNT - High-Quality Printing Services</title>
    
    <!-- Design System Dependencies -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Core Styling -->
    <link rel="stylesheet" href="global/global.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="components/Navbar/Navbar.css">
    <link rel="stylesheet" href="components/Footer/Footer.css">
    <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>">
    <link rel="icon" href="assets/img/PRNT_logo.png" type="image/png" />
</head>

<body class="landing-page">

    <!-- NAVIGATION — FIXED POSITION -->
    <?php include __DIR__ . '/components/Navbar/Navbar.html'; ?>

    <main class="page-content">

        <!-- ───────────────────────────────────────────────────────────────────
             SECTION: HERO
             ─────────────────────────────────────────────────────────────────── -->
        <section class="hero-section section-padding">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-5 mb-lg-0 reveal">
                        <div class="hero-badge reveal mb-3">
                            <span class="badge-dot"></span>
                            <span class="badge-text">Premium Printing Solutions</span>
                        </div>
                        <h1 class="hero-title fw-800">
                            Your <span class="text-orange">Vision,</span><br>
                            Printed to Perfection.
                        </h1>
                        <p class="hero-description text-white">
                            PRNT delivers professional, high-fidelity printing services for students, academics, and creative businesses. Fast, reliable, and just a click away.
                        </p>
                        <div class="d-flex flex-wrap gap-3">
                            <a href="<?php echo $isLoggedIn ? 'pages/client/order/index.php' : 'pages/account/index.php'; ?>" class="btn-landing-primary">Start Your Order</a>
                            <a href="pages/works/" class="btn-landing-outline">View Our Work</a>
                        </div>
                    </div>
                    <div class="col-lg-6 hero-visual reveal">
                        <div class="hero-img-wrapper">
                            <img src="assets/img/img30.jpg" alt="PRNT Showcase" class="img-fluid hero-main-img shadow-lg">
                            <div class="floating-stat glass-card reveal">
                                <div class="stat-icon"><i class="fas fa-bolt text-orange"></i></div>
                                <div class="stat-details">
                                    <span class="stat-value text-dark">24h</span>
                                    <span class="stat-label">Fast turnaround</span>
                                </div>
                            </div>
                            <div class="floating-stat-bottom glass-card reveal">
                                <div class="stat-icon"><i class="fas fa-check-circle text-success"></i></div>
                                <div class="stat-details">
                                    <span class="stat-value text-dark">99%</span>
                                    <span class="stat-label">Quality checked</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ───────────────────────────────────────────────────────────────────
             SECTION: OUR MISSION
             ─────────────────────────────────────────────────────────────────── -->
        <section class="believe-section section-padding py-5">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Visual Side: Image + Overlapping Quote -->
                    <div class="col-lg-7 mb-4 mb-lg-0 reveal">
                        <div class="vision-wrapper">
                            <img src="assets/img/img31.jpg" alt="PRNT Mission" class="img-fluid vision-main-img shadow-lg">
                            <div class="vision-quote-box glass-card reveal">
                                <div class="quote-icon"><i class="fas fa-quote-left text-orange"></i></div>
                                <p class="quote-text text-dark">
                                    Our mission is to empower your productivity by delivering high-fidelity printing solutions with unmatched speed and precision.
                                </p>
                                <div class="quote-author">
                                    <strong class="text-dark">Production Team</strong>
                                    <span class="text-orange small fw-600">PRNT Commitment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content Side: Narrative + Features -->
                    <div class="col-lg-5 ps-lg-5 reveal">
                        <h2 class="h1 fw-800 mb-4 text-dark">
                            Dedicated to <span class="text-orange">Excellence</span> and Reliability.
                        </h2>
                        <p class="mb-4 text-muted">
                            We are committed to providing professional, accessible printing services that support the academic and creative goals of our community. 
                        </p>
                        
                        <ul class="feature-list-modern p-0">
                            <li class="feature-item-modern reveal">
                                <div class="feature-icon-sm bg-orange"><i class="fas fa-check-circle"></i></div>
                                <div class="feature-text-modern">
                                    <h5 class="fw-700 mb-0">High-Fidelity Accuracy</h5>
                                </div>
                            </li>

                            <li class="feature-item-modern reveal">
                                <div class="feature-icon-sm bg-orange"><i class="fas fa-leaf"></i></div>
                                <div class="feature-text-modern">
                                    <h5 class="fw-700 mb-0">Student-Friendly Solutions</h5>
                                </div>
                            </li>
                            <li class="feature-item-modern reveal">
                                <div class="feature-icon-sm bg-orange"><i class="fas fa-paint-brush"></i></div>
                                <div class="feature-text-modern">
                                    <h5 class="fw-700 mb-0">Custom Design Support</h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="services-section section-padding" id="services">
            <div class="container">
                <div class="row text-center mb-5 reveal">
                    <div class="col-12">
                        <h2 class="h1 fw-800 mb-3 text-white">What we <span class="text-orange">offer.</span></h2>
                        <p class="text-light">High-fidelity printing solutions tailored for every professional and creative need.</p>
                    </div>
                </div>
                
                <div class="row g-4 justify-content-center">
                    <!-- Service 1: Document Printing -->
                    <div class="col-lg-4 col-md-6 reveal">
                        <div class="glass-service-card glass-card" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('assets/img/img29.jpg');">
                            <div class="service-overlay">
                                <div class="service-content">
                                    <h3 class="fw-800" style="color: lightgray;">Document Printing</h3>
                                    <div class="service-details">
                                        <p class="text-white">Professional prints with crisp text and high-speed processing for all your important files.</p>
                                        <a href="<?php echo $isLoggedIn ? 'pages/client/order/index.php' : 'pages/account/index.php'; ?>" class="text-orange fw-700 text-decoration-none">Order Print <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Service 2: Poster & Large Format -->
                    <div class="col-lg-4 col-md-6 reveal">
                        <div class="glass-service-card glass-card" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('assets/img/img22.jpg');">
                            <div class="service-overlay">
                                <div class="service-content">
                                    <h3 class="fw-800" style="color: lightgray;">Posters & Banners</h3>
                                    <div class="service-details">
                                        <p class="text-white">Vibrant prints that capture attention. Perfect for events, activities, and creative projects.</p>
                                        <a href="<?php echo $isLoggedIn ? 'pages/client/order/index.php' : 'pages/account/index.php'; ?>" class="text-orange fw-700 text-decoration-none">Order Print <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Service 3: Photo Printing -->
                    <div class="col-lg-4 col-md-6 reveal">
                        <div class="glass-service-card glass-card" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('assets/img/img25.jpg');">
                            <div class="service-overlay">
                                <div class="service-content">
                                    <h3 class="fw-800" style="color: lightgray;">Photo Printing</h3>
                                    <div class="service-details">
                                        <p class="text-white">Preserve your memories with premium photographic paper and industry-leading color accuracy.</p>
                                        <a href="<?php echo $isLoggedIn ? 'pages/client/order/index.php' : 'pages/account/index.php'; ?>" class="text-orange fw-700 text-decoration-none">Order Print <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ───────────────────────────────────────────────────────────────────
             SECTION: HOW IT WORKS
             ─────────────────────────────────────────────────────────────────── -->
        <section class="how-it-works section-padding">
            <div class="container">
                <div class="row text-center mb-5 reveal">
                    <div class="col-12">
                        <h2 class="h1 fw-800 mb-3 text-dark"> Simple <span class="text-orange">Steps.</span></h2>
                        <p class="text-muted">A streamlined workflow designed to get your prints to you faster.</p>
                    </div>
                </div>

                <div class="row g-4">
                    <div class="col-lg-3 col-md-6 reveal">
                        <div class="step-item glass-card h-100">
                            <div class="step-number">1</div>
                            <h4 class="text-dark">Upload</h4>
                            <p class="text-muted small">Drop your files into our secure file library.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 reveal">
                        <div class="step-item glass-card h-100">
                            <div class="step-number">2</div>
                            <h4 class="text-dark">Configure</h4>
                            <p class="text-muted small">Select your service, format, and color settings.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 reveal">
                        <div class="step-item glass-card h-100">
                            <div class="step-number">3</div>
                            <h4 class="text-dark">Confirm</h4>
                            <p class="text-muted small">Review your order and confirm the transaction.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 reveal">
                        <div class="step-item glass-card h-100">
                            <div class="step-number">4</div>
                            <h4 class="text-dark">Track</h4>
                            <p class="text-muted small">Get real-time updates as your order is finalized.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ───────────────────────────────────────────────────────────────────
             SECTION: BENEFITS
             ─────────────────────────────────────────────────────────────────── -->
        <section class="benefits-section section-padding" id="benefits">
            <div class="container">
                <div class="row text-center mb-5 reveal">
                    <div class="col-12">
                        <h2 class="h1 fw-800 mb-3 text-white">Why Choose <span class="text-orange">PRNT?</span></h2>
                        <p class="text-light">Delivering reliable printing solutions designed for academic and professional excellence.</p>
                    </div>
                </div>

                <div class="row g-4">
                    <div class="col-lg-4 reveal">
                        <div class="benefit-card-modern glass-card bg-white h-100 p-4">
                            <div class="benefit-icon bg-orange mb-4"><i class="fas fa-bolt fa-lg"></i></div>
                            <h5 class="fw-700 text-dark mb-3">Same-Day Processing</h5>
                            <p class="text-muted small mb-0">We understand deadlines. Most standard orders are processed and ready within 24 hours.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 reveal">
                        <div class="benefit-card-modern glass-card bg-white h-100 p-4">
                            <div class="benefit-icon bg-orange mb-4"><i class="fas fa-award fa-lg"></i></div>
                            <h5 class="fw-700 text-dark mb-3">Unmatched Precision</h5>
                            <p class="text-muted small mb-0">Our industrial-grade hardware ensures every pixel and line is represented accurately.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 reveal">
                        <div class="benefit-card-modern glass-card bg-white h-100 p-4">
                            <div class="benefit-icon bg-orange mb-4"><i class="fas fa-shield-alt fa-lg"></i></div>
                            <h5 class="fw-700 text-dark mb-3">Secure & Private</h5>
                            <p class="text-muted small mb-0">Your documents are for our eyes only. We maintain strict privacy protocols for all uploaded files.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section section-padding">
            <div class="container">
                <div class="cta-banner text-center reveal glass-card border-0">
                    <h2 class="h1 fw-800 mb-4 text-white">Ready to Start Your Project?</h2>
                    <p class="mb-5 lead mx-auto text-light" style="max-width: 600px;">
                        Join thousands of students and companies who trust PRNT for their high-stakes documentation and branding.
                    </p>
                    <div class="d-flex justify-content-center gap-3">
                        <a href="pages/account/index.php" class="btn-landing-primary">Start Now</a>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- FOOTER — SYSTEM STANDARD -->
    <?php include __DIR__ . '/components/Footer/Footer.html'; ?>

    <!-- Dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js?v=<?php echo time(); ?>"></script>
    
    <script>
        // Intersection Observer for Reveal Animations
        const observerOptions = {
            threshold: 0.15
        };

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
