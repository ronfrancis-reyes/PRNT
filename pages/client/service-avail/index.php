<?php
include '../../../api/config.php';
if (!isset($_SESSION['user'])) {
    header("Location: ../../../index.php");
} else if ($_SESSION['role'] == 'Admin') {
    header("Location: ../../admin/dashboard/");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
        crossorigin="anonymous" />

    <!--Tab Logo-->
    <link rel="icon" href="../../../assets/img/PRNT_logo.png" type="image/png" />
    <title>New Order — PRNT</title>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="../../../components/Navbar/Navbar.css" />
    <link rel="stylesheet" href="../../../components/Footer/Footer.css" />
    <link rel="stylesheet" href="../../../global/global.css" />
    <link rel="stylesheet" href="styles.css" />
</head>

<body style="background:var(--background);">
    <!--Navbar-->
    <!--Hindi pwede ung nasa components kasi ../../ lang yon, dapat ../../../ kaya need pa irevise tong design para di maulit-->
    <div class="mobile-menu-overlay" id="mobileOverlay"></div>
    <div class="mobile-menu" id="mobileMenu">
        <button class="close-menu" onclick="toggleMobileMenu()">
            <i class="fas fa-times"></i>
        </button>
        <a href="../../../index.php">Home</a>
        <a href="../../about/">About</a>
        <a href="../../works/">Work</a>
        <a href="../../service/">Services</a>
        <a href="../../contact/">Contact</a>
        <a href="../../client/service-avail/">Order Now</a>
        <div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
            <div
                style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
                id="navAvatar"><?php
                                $fullname = explode(' ', $_SESSION['username']);
                                $initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
                                echo $initials;
                                ?></div>
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
                <li><a href="../contact/">Contact</a></li>
            </ul>
            <div class="flex align-center" style="gap: 1rem">
                <div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
                    <div
                        style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
                        id="navAvatar"><?php
                                        $fullname = explode(' ', $_SESSION['username']);
                                        $initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
                                        echo $initials;
                                        ?></div>
                </div>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </nav>
    <!-- End of Navbar -->

    <section class="order-page" style="padding: 4rem 0;">
        <div class="container">
            <h2 style="font-size: 2.25rem; margin-bottom: 2rem; color: var(--text-dark);">
                <i class="fas fa-shopping-cart" style="color:var(--primary);margin-right:1rem;"></i> Place an Order
            </h2>

            <div class="grid-2-col">
                <!-- 1. Upload Section -->
                <div class="order-panel flow-step animate-fade">
                    <h3><span class="step-num">1</span> Upload Files</h3>
                    <input type="file" id="fileInput" multiple style="display:none;" onchange="handleFileUpload(event)" accept="application/pdf,image/*">
                    <div class="upload-area" id="uploadZone" onclick="document.getElementById('fileInput').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <h4>Click or drag files here</h4>
                        <p>PDF, JPG, PNG (Max 50MB)</p>
                    </div>

                    <div class="library-container" style="margin-top: 2rem;">
                        <div style="display:flex;justify-content:space-between;align-items:center; margin-bottom: 1rem;">
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
                            style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Service / Format</label>
                        <select id="serviceFormat" onchange="getSizes(this.value)"
                            style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;">
                            <option value="">Select a service...</option>
                        </select>
                        
                    </div>

                    <div class="form-grid">
                        <div class="form-group select-wrapper">
                            <label for="colorType" style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Color
                                Type</label>
                            <select id="colorType"
                                style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;"
                                onchange="calculateEstimatedPrice()">
                            </select>
                        </div>
                        <div class="form-group select-wrapper">
                            <label for="paperSize" style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Paper
                                Size</label>
                            <select id="paperSize" onchange="showCustomSizeInput(this); calculateEstimatedPrice()"
                                style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;">
                                <option value="">Select service first</option>
                            </select>
                            <div id="customSizeInput" style="display:none; margin-top:0.5rem; width:100%; display:flex; align-items:center; gap:0.5rem;">
                            </div>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom:1.5rem;">
                        <label for="copies"
                            style="display:block;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;">Copies</label>
                        <input class="number-input-wrapper" type="number" id="copies" min="1" value="1" onchange="calculateEstimatedPrice()"
                            style="width:100%;padding:0.85rem;border:1px solid var(--border);border-radius:var(--radius);outline:none;background:white;">
                    </div>

                    <div class="price-strip"
                        >
                        <div class="price-info"><strong>Estimated Price</strong><br><small
                                style="color:var(--text-muted);">per item</small></div>
                        <div style="font-size:1.5rem; font-weight:800; color:var(--primary);" id="priceDisplay">₱0.00</div>
                    </div>

                    <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:2rem; padding:1.25rem;"
                        onclick="addToCart()">
                        <i class="fas fa-plus"></i> Add to Order
                    </button>
                </div>
            </div>

            <!-- 3. Cart & Checkout Section -->
            <div class="card animate-fade" id="cartSection" style="display:none; margin-top:2rem; padding:3rem;">
                <div class="order-panel summary-panel">
                    <h3 style="margin-bottom:2rem; font-size:1.5rem; display:flex; align-items:center; gap:0.75rem;">
                        <i class="fas fa-list" style="color:var(--primary);"></i> Order Summary
                    </h3>
                    <table style="width:100%; border-collapse:collapse; margin-bottom:3rem;">
                        <thead style="background:var(--background); text-align:left;">
                            <tr>
                                <th style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">File
                                </th>
                                <th style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">Service
                                </th>
                                <th style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">Details
                                </th>
                                <th style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">Copies
                                </th>
                                <th style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">Amount
                                </th>
                                <th style="padding:1.25rem; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase;">Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody id="cartBody">
                            <!--container of cart items-->
                        </tbody>
                    </table>
                </div>


                <div
                    style="display:grid; grid-template-columns: 1.5fr 1fr; gap:4rem; border-top:1px solid var(--border); padding-top:3rem;">
                    <div>
                        <h4 style="margin-bottom:1.5rem;">Logistics & Payment</h4>
                        <div class="radio-group" style="display:flex; gap:1.5rem; margin-bottom:2rem;">
                            <div class="radio-option selected" id="opt-pickup" onclick="selectReceiving('Pick-up')"
                                style="flex:1; padding:1.5rem; border:2px solid var(--border); border-radius:var(--radius); cursor:pointer; text-align:center; transition:var(--transition);">
                                <i class="fas fa-store" style="font-size:2rem; margin-bottom:0.75rem; color:var(--primary);"></i>
                                <div style="font-weight:700;">Pick-up</div>
                                <div style="font-size:0.85rem; color:var(--text-muted);">Free</div>
                            </div>
                            <div class="radio-option" id="opt-delivery" onclick="selectReceiving('Delivery')"
                                style="flex:1; padding:1.5rem; border:2px solid var(--border); border-radius:var(--radius); cursor:pointer; text-align:center; transition:var(--transition);">
                                <i class="fas fa-truck" style="font-size:2rem; margin-bottom:0.75rem; color:var(--primary);"></i>
                                <div style="font-weight:700;">Delivery</div>
                                <div style="font-size:0.85rem; color:var(--text-muted);">+₱10.00</div>
                            </div>
                        </div>

                        <div id="deliveryLocationBlock" style="margin-bottom:2rem; display:none; overflow: visible;">
                            <label for="deliveryLocation" style="display:block; margin-bottom:0.75rem; font-weight:600;">Delivery
                                Destination</label>
                            <select id="deliveryLocation"
                                style="width:100%; padding:1rem; border:1px solid var(--border); border-radius:var(--radius); outline:none; background:white; font-size:1rem;    position: relative;
    z-index: 10;">
                            </select>
                        </div>

                        <div style="margin-bottom:2rem;">
                            <label for="paymentMethod" style="display:block; margin-bottom:0.75rem; font-weight:600;">Payment
                                Method</label>
                            <select id="paymentMethod"
                                style="width:100%; padding:1rem; border:1px solid var(--border); border-radius:var(--radius); outline:none; background:white; font-size:1rem;">
                                
                            </select>
                        </div>

                        <div>
                            <label for="orderNotes" style="display:block; margin-bottom:0.75rem; font-weight:600;">Additional Notes
                                (Optional)</label>
                            <textarea id="orderNotes" rows="4" placeholder="Special instructions for printing/delivery..."
                                style="width:100%; padding:1rem; border:1px solid var(--border); border-radius:var(--radius); outline:none; font-family:inherit; font-size:1rem; resize:vertical;"></textarea>
                        </div>
                    </div>

                    <div
                        style="background:var(--background); padding:2rem; border-radius:var(--radius); display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <h4 style="margin-bottom:1.5rem;">Total Summary</h4>
                            <div style="display:flex; justify-content:space-between; margin-bottom:1rem; color:var(--text-muted);">
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
                        </div>
                        <button class="btn btn-primary" onclick="placeOrder();"
                            style="width:100%; padding:1.25rem; font-size:1.25rem; margin-top:2rem;">Place Order<i
                                class="fas fa-arrow-right" style="margin-left:0.75rem;"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div id="footer-placeholder"></div>

    <script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>

</html>