<?php
include '../../../api/config.php';
if (!isset($_SESSION['user'])) {
    header("Location: ../../../index.php");
} else if ($_SESSION['role'] == 'Admin') {
    header("Location: ../../admin/");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous" />

    <!--Tab Logo-->
    <link rel="icon" href="../../../assets/img/PRNT_logo.png" type="image/png" />
    <title>New Order — PRNT</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="../../../components/Navbar/Navbar.css" />
    <link rel="stylesheet" href="../../../components/Footer/Footer.css" />
    <link rel="stylesheet" href="../../../global/global.css" />
    <link rel="stylesheet" href="styles.css" />
</head>

<body style="background:var(--background);">
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
    <main class="main-wrapper">
        <div class="page-content">
            <div class="order-container">
                <header class="section-title" style="text-align: center; margin-bottom: 2rem;">
                    <h1 style="justify-content: center;"><i class="fas fa-print"></i> Print Your Ideas</h1>
                    <p class="subtitle">Easily upload your files, choose your preferred print format, and get your prints right away.</p>
                </header>

                <div class="grid-2-col">
                    <!-- 1. Upload Section -->
                    <div class="order-panel flow-step animate-fade">
                        <h3><span class="step-num">1</span> Upload Files</h3>
                        <input type="file" id="fileInput" multiple style="display:none;" onchange="handleFileUpload(event)"
                            accept="application/pdf,image/*">
                        <div class="upload-area" id="uploadZone" onclick="document.getElementById('fileInput').click()">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <h4>Click or drag files here</h4>
                            <p>PDF, JPG, PNG (Max 50MB)</p>
                        </div>
                        <div class="library-container" style="margin-top: 2rem;">
                            <div
                                style="display:flex;justify-content:space-between;align-items:center; margin-bottom: 1rem;">
                                <h4 style="font-size: 1rem;">Your Library</h4>
                                <span style="font-size:0.8rem;color:var(--primary);cursor:pointer;font-weight:600;"
                                    onclick="document.getElementById('fileInput').click()">+ Add More</span>
                            </div>
                            <div id="fileList">
                                <!--file container-->
                            </div>
                        </div>
                    </div>
                    <!-- 2. Configuration Section -->
                    <div class="order-panel flow-step animate-slide" id="configStep">
                        <h3><span class="step-num">2</span> Configure Service</h3>
                        <div id="filePreview"
                            style="display:none;margin-bottom:1.5rem;padding:1.25rem;background:var(--secondary);border-radius:var(--radius);border:1px solid var(--primary-light);">
                            <div class="select-wrapper" style="display:flex;align-items:center;gap:1rem;">
                                <i class="fas fa-file-pdf" style="font-size:2rem;color:var(--primary);"></i>
                                <div>
                                    <!-- container for file info -->
                                    <div style="font-weight:700; color:var(--primary-dark);" id="previewFileName"></div>
                                    <div style="font-size:0.85rem;color:var(--text-muted);" id="previewPageCount"></div>
                                    <div style="font-size:0.85rem;color:var(--text-muted);" id="previewFileSize"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group select-wrapper" style="margin-bottom:1.25rem;">
                            <label for="serviceFormat"
                                style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Service /
                                Format</label>
                            <select id="serviceFormat" onchange="getSizes(this.value)"
                                style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;">
                                <option value="">Select a service...</option>
                            </select>

                        </div>

                        <div class="form-grid">
                            <div class="form-group select-wrapper">
                                <label for="colorType"
                                    style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Color
                                    Type</label>
                                <select id="colorType"
                                    style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;"
                                    onchange="calculateEstimatedPrice()">
                                </select>
                            </div>
                            <div class="form-group select-wrapper">
                                <label for="paperSize"
                                    style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Paper
                                    Size</label>
                                <select id="paperSize" onchange="showCustomSizeInput(this); calculateEstimatedPrice()"
                                    style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;">
                                    <option value="">Select service first</option>
                                </select>
                                <div id="customSizeWrapper" style="display: none;">
                                    <div id="customSizeInput"
                                        style="margin-top:0.5rem; width:100%; display:flex; align-items:center; gap:0.5rem;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom:1.5rem;">
                            <label for="copies"
                                style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Copies</label>
                            <input class="number-input-wrapper" type="number" id="copies" min="1" value="1"
                                onchange="calculateEstimatedPrice()"
                                style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;">
                        </div>
                        <div class="price-strip">
                            <div class="price-info"><strong>Estimated Price</strong><br><small
                                    style="color:var(--text-muted);">per item</small></div>
                            <div style="font-size:1.5rem; font-weight:800; color:var(--primary);" id="priceDisplay">₱0.00
                            </div>
                        </div>
                        <button class="btn btn-primary"
                            style="width:100%;justify-content:center;margin-top:2rem; padding:1.25rem;"
                            onclick="addToCart()">
                            <i class="fas fa-plus"></i> Add to Order
                        </button>
                    </div>
                </div>

                <!-- 3. Cart & Checkout Section -->
                <div class="card animate-fade" id="cartSection" style="display:none;">
                    <div class="order-panel summary-panel" style="margin-bottom: 1.5rem;">
                        <h3 style="margin-bottom:2rem; font-size:1.5rem; display:flex; align-items:center; gap:0.75rem;">
                            <i class="fas fa-list" style="color:var(--primary);"></i> Order Summary
                        </h3>
                        <table style="width:100%; border-collapse:collapse; margin-bottom:3rem;">
                            <thead style="background:var(--background); text-align:left;">
                                <tr>
                                    <th
                                        style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">
                                        File
                                    </th>
                                    <th
                                        style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">
                                        Service
                                    </th>
                                    <th
                                        style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">
                                        Details
                                    </th>
                                    <th
                                        style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">
                                        Copies
                                    </th>
                                    <th
                                        style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">
                                        Amount
                                    </th>
                                    <th
                                        style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="cartBody">
                                <!--container of cart items-->
                            </tbody>
                        </table>
                    </div>

                    <div class="grid-2-col bottom-grid">
                        <div class="options-container">
                            <div class="order-panel">
                                <div class="panel-header">
                                    <i class="fas fa-truck" aria-hidden="true"></i>
                                    <h2>Logistics & Payment</h2>
                                </div>
                                <div class="recieving-options" style="display:flex; gap:1.5rem; margin-bottom:2rem;">
                                    <div class="opt-card active" id="opt-Pick-up" onclick="selectReceiving('Pick-up')">
                                        <div class="opt-icon"><i class="fas fa-store"></i></div>
                                        <div class="opt-info">
                                            <strong>Pick-up</strong>
                                            <span>From PRNT Hub</span>
                                        </div>
                                    </div>
                                    <div class="opt-card" id="opt-Delivery" onclick="selectReceiving('Delivery')">
                                        <div class="opt-icon"><i class="fas fa-truck-moving"></i></div>
                                        <div class="opt-info">
                                            <strong>Delivery</strong>
                                            <span>Within Campus/Nearby</span>
                                        </div>
                                        <i class="fas fa-check opt-check"></i>
                                    </div>
                                </div>
                                <div class="form-group delivery-location" id="deliveryLocationBlock"
                                    style="display:none;">
                                    <div class="select-wrapper">
                                        <label for="deliveryLocation">Delivery Destination</label>
                                        <select id="deliveryLocation">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="order-panel">
                                <div class="panel-header">
                                    <i class="fas fa-wallet" aria-hidden="true"></i>
                                    <h2>Payment Method</h2>
                                </div>
                                <div class="form-group">
                                    <div class="select-wrapper">
                                        <label for="paymentMethod">Select Method</label>
                                        <select id="paymentMethod">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="order-panel">
                                <div class="panel-header">
                                    <i class="fas fa-comment-alt" aria-hidden="true"></i>
                                    <h2>Additional Notes</h2>
                                </div>
                                <div class="form-group">
                                    <textarea id="orderNotes" rows="4"
                                        placeholder="Special instructions for printing/delivery..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="checkout-sidebar" style="height: 100%;">
                            <div class="order-panel" style="display:flex; flex-direction: column; background-color: black;">
                                <div class="checkout-header">
                                    <h3>Checkout</h3>
                                </div>
                                <div
                                    style="display:flex; justify-content:space-between; margin-bottom:1rem; color:var(--text-muted);">
                                    <span>Subtotal</span><span id="subtotal">₱0.00</span>
                                </div>
                                <div id="feeLabelRow"
                                    style="display:none; justify-content:space-between; margin-bottom:1rem; color:var(--text-muted);">
                                    <span>Delivery Fee</span><span id="deliveryFee">₱0.00</span>
                                </div>
                                <div
                                    style="display:flex; justify-content:space-between; padding-top:1.5rem; border-top:1px solid var(--border); font-size:1.5rem; font-weight:800; color:var(--primary);">
                                    <span>Total</span><span id="totalAmount">₱0.00</span>
                                </div>
                                <button class="btn btn-primary btn-full btn-large" style="margin-top:1rem" onclick="placeOrder();">Place Order<i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>


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

    <script src="https://code.jquery.com/jquery-4.0.0.js"
        integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
	<script src="../../../global/global.js"></script>

</body>

</html>