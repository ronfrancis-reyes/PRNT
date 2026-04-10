<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile — PRNT</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../components/Navbar/Navbar.css">
    <link rel="stylesheet" href="../../components/Footer/Footer.css">
    <link rel="stylesheet" href="../../global/global.css">
    <link rel="stylesheet" href="styles.css">
</head>

<body style="background:var(--background);">

    <!-- ===== TOAST CONTAINER ===== -->
    <div class="toast-container" id="toastContainer"></div>

    <!-- ===== MOBILE MENU OVERLAY ===== -->
    <?php include '../../components/Navbar/Navbar.php' ?>

    <!-- ===== PROFILE MAIN ===== -->
    <section class="profile-section">
        <div class="container">
            <div class="profile-grid">
                <!-- Sidebar -->
                <div class="profile-sidebar reveal">
                    <div class="profile-avatar" id="profileAvatar"><?php
					$fullname = explode(' ', $_SESSION['username']);
					$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
					echo $initials;
					?></div>
                    <h3 id="profileName"><?php echo $_SESSION['username']; ?></h3>
                    <p class="email" id="profileEmail"><?php echo $_SESSION['email'] ?></p>
                    <div class="profile-menu">
                        <button class="active" onclick="switchProfileTab('info', this)"><i class="fas fa-user"
                                style="width:20px;"></i> Personal Info</button>
                        <button onclick="switchProfileTab('security', this)"><i class="fas fa-shield-alt" style="width:20px;"></i>
                            Security</button>
                        <button onclick="logout()"
                            style="color:var(--danger);margin-top:1rem;border-top:1px solid var(--border);border-radius:0;padding-top:1rem;"><i
                                class="fas fa-sign-out-alt" style="width:20px;"></i> Logout</button>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="profile-content reveal">
                    <!-- Tab 1: Info -->
                    <div id="profileTab-info">
                        <h3>Personal Information</h3>
                        <form id="profile-form">
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap: 1.5rem;">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input type="text" id="profFirstName" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input type="text" id="profLastName" required>
                                </div>
                            </div>
                            <!-- Email Address Removed Per Requirement -->
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" id="profPhone" required>
                            </div>
                            <button type="submit" class="btn btn-primary" style="margin-top:1rem;"><i class="fas fa-save"></i> Save
                                Changes</button>
                        </form>
                    </div>
                    <!-- Tab 3: Security -->
                    <div id="profileTab-security" style="display:none;">
                        <h3>Security & Password</h3>
                        <form id="password-form">
                            <div class="form-group"><label>Current Password</label><input type="password" id="currentPass" required></div>
                            <div class="form-group"><label>New Password</label><input type="password" id="newPass" required></div>
                            <div class="form-group"><label>Confirm New Password</label><input type="password" id="confirmPass"
                                    required></div>
                            <button type="submit" class="btn btn-primary" style="margin-top:1rem;"><i class="fas fa-key"></i> Update
                                Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php include '../../components/Footer/Footer.php' ?>

    <!-- ===== RECEIPT MODAL ===== -->
    <div class="modal-overlay" id="receiptModal">
        <div class="modal" style="max-width:600px; padding:0; overflow:hidden;">
            <div class="modal-header" style="padding:1.5rem 2rem; border-bottom:1px solid #F0F0F0;">
                <h3 style="margin:0;"><i class="fas fa-file-invoice" style="color:var(--primary); margin-right:0.5rem;"></i>
                    Order Receipt</h3>
                <button class="modal-close" onclick="closeModal('receiptModal')"><i class="fas fa-times"></i></button>
            </div>
            <div id="receiptModalContent" style="max-height:50vh; overflow-y:auto; padding:2rem;">
            </div>
            <div
                style="padding:1.5rem 2rem; background:#FAFAFA; border-top:1px solid #F0F0F0; display:flex; justify-content:flex-end;">
                <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print Receipt</button>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-4.0.0.js"
        integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>

</html>