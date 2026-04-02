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
    <title>Order Receipt — PRNT</title>
    <meta name="description" content="Review your PRNT order receipt before confirming.">

    <!-- EXTERNAL DEPENDENCIES -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- PAGE STYLES -->
    <link rel="stylesheet" href="../../../components/Navbar/Navbar.css" />
    <link rel="stylesheet" href="../../../components/Footer/Footer.css" />
    <link rel="stylesheet" href="../../../global/global.css" />
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="styles.css">
</head>

<body>

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
            <div style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
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
                <li><a href="../../contact/">Contact</a></li>
            </ul>
            <div class="flex align-center" style="gap: 1rem">
                <a class="btn btn-primary" id="orderNowBtn" style="opacity: 0; cursor:default;">
                    <i class="fas fa-shopping-cart"></i> Order Now
                </a>
                <div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
                    <div style="width:38px;height:38px;border-radius:50%; background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
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


    <!-- ===== MAIN WRAPPER ===== -->
    <main class="main-wrapper">
        <div class="page-content">
            <div class="receipt-card animate-slide" id="receiptCard">

                <!-- WATERMARK -->
                <div class="receipt-watermark" aria-hidden="true">PRNT</div>

                <!-- HEADER: Solid Orange -->
                <div class="receipt-header">
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h1 id="orderId">Order Receipt: ORD-XXXXXX</h1>
                    <div class="header-meta">
                        <span id="orderStatus">Status: Pending</span>
                    </div>
                    <div class="zigzag"></div>
                </div>

                <!-- BODY -->
                <div class="receipt-body">

                    <!-- PERSONAL & LOGISTICS -->
                    <div class="info-section">
                        <div class="section-badge">
                            <div class="badge-icon"><i class="fas fa-info"></i></div>
                            PERSONAL &amp; LOGISTICS
                        </div>
                        <div class="info-grid card-box" id="orderInfo">
                            <!-- order details -->
                        </div>
                    </div>

                    <!-- ORDER SUMMARY -->
                    <div class="info-section">
                        <div class="section-badge">
                            <div class="badge-icon"><i class="fas fa-print"></i></div>
                            ORDER SUMMARY
                        </div>
                        <div id="itemList" class="item-list card-box">
                            <!-- Dynamically populated by script.js -->
                        </div>
                    </div>

                    <!-- ADDITIONAL NOTES -->
                    <div id="notesSection" class="info-section">
                        <div class="section-badge">
                            <div class="badge-icon"><i class="fas fa-sticky-note"></i></div>
                            ADDITIONAL NOTES
                        </div>
                        <p id="orderNotes" class="notes-text card-box">No additional notes.</p>
                    </div>

                    <!-- TOTALS: Dark Card -->
                    <div class="total-card">
                        <div class="total-row">
                            <span>Subtotal</span>
                            <span id="subtotalVal">P0.00</span>
                        </div>
                        <div class="total-row">
                            <span>Delivery Fee</span>
                            <span id="deliveryVal">P0.00</span>
                        </div>
                        <div class="divider-line"></div>
                        <div class="grand-total">
                            <span>Total Amount</span>
                            <span id="totalVal">P0.00</span>
                        </div>
                    </div>

                    <!-- BUTTONS -->
                    <div class="action-buttons">
                        <button class="btn btn-outline" onclick="window.print()">
                            <i class="fas fa-print"></i> Export Receipt
                        </button>
                        <a href="../dashboard/" class="btn btn-primary" style="text-decoration: none;">
                            Back to dashboard<i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div><!-- /.receipt-body -->
            </div><!-- /.receipt-card -->
        </div>
    </main>
    <div class="footer-spacer" aria-hidden="true"></div>

    <!-- ===== SCRIPTS ===== -->
    <script src="https://code.jquery.com/jquery-4.0.0.js"
        integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>