<?php
/**
 * PRNT — Customer Profile Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Client interface for managing personal information and account security.
 * ─────────────────────────────────────────────────────────────────────────────
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile — PRNT</title>
    <meta name="description" content="Manage your PRNT account settings, security, and view your printing activity.">

    <!-- EXTERNAL DEPENDENCIES -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- PAGE STYLES -->
    <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>

    <!-- ===== TOAST NOTIFICATION CONTAINER ===== -->
    <div class="toast-container" id="toastContainer"></div>

    <!-- ===== NAVBAR SPACER (Preserves Layout Layout) ===== -->
    <div class="navbar-spacer" aria-hidden="true"></div>

    <!-- ===== MAIN WRAPPER ===== -->
    <main class="main-wrapper" id="mainContent">
        <div class="page-content">
            

            <div class="profile-grid">
                
                <!-- ── LEFT COLUMN: IDENTITY CARD & NAV ── -->
                <aside class="profile-sidebar">
                    <div class="profile-card identity-card">
                        <div class="avatar-wrapper">
                            <div class="avatar-main" id="userAvatar">
                                <span id="avatarInitials">JD</span>
                                <button class="btn-avatar-edit" onclick="triggerAvatarUpload()" title="Change Photo">
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                            <input type="file" id="avatarInput" accept="image/*" style="display: none;" onchange="handleAvatarChange(event)">
                        </div>
                        
                        <div class="identity-info">
                            <h2 id="displayFullName">John Doe</h2>
                            <div class="user-id">ID: #PRNT-4829</div>
                        </div>

                        <nav class="profile-nav">
                            <button class="nav-item active" data-tab="personal" onclick="switchTab('personal')">
                                <i class="fas fa-address-card"></i> Personal Information
                            </button>
                            <button class="nav-item" data-tab="security" onclick="switchTab('security')">
                                <i class="fas fa-shield-alt"></i> Security & Password
                            </button>
                            <button class="nav-item" data-tab="activity" onclick="switchTab('activity')">
                                <i class="fas fa-box-open"></i> My Orders
                            </button>
                        </nav>
                        
                        <div class="sidebar-footer">
                            <button class="btn-logout" onclick="handleLogout()">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </div>
                </aside>

                <!-- ── RIGHT COLUMN: CONTENT PANELS ── -->
                <section class="profile-content">
                    
                    <!-- PANEL: PERSONAL INFORMATION -->
                    <div class="content-panel active" id="panel-personal">
                        <div class="panel-header">
                            <div class="header-icon"><i class="fas fa-user-edit"></i></div>
                            <div class="header-text">
                                <h2>Personal Information</h2>
                                <p>Update your basic details and how we contact you.</p>
                            </div>
                        </div>

                        <form class="profile-form" id="personalInfoForm" onsubmit="handleProfileUpdate(event)">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input type="text" id="firstName" value="John" placeholder="Enter first name" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input type="text" id="lastName" value="Doe" placeholder="Enter last name" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>BulSU Email Address</label>
                                <div class="input-with-icon">
                                    <i class="far fa-envelope"></i>
                                    <input type="email" id="email" value="john.doe@bulsu.edu.ph" placeholder="yourname@bulsu.edu.ph" required>
                                </div>
                            </div>

                            <div class="form-group full-width">
                                <label>Phone Number</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-phone-alt"></i>
                                    <input type="tel" id="phoneNumber" value="+63 912 345 6789" placeholder="09XX XXX XXXX">
                                </div>
                            </div>


                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Save Changes
                                </button>
                                <button type="reset" class="btn btn-outline">Discard</button>
                            </div>
                        </form>
                    </div>

                    <!-- PANEL: SECURITY -->
                    <div class="content-panel" id="panel-security">
                        <div class="panel-header">
                            <div class="header-icon"><i class="fas fa-lock"></i></div>
                            <div class="header-text">
                                <h2>Security & Password</h2>
                                <p>Ensure your account is using a long, random password to stay secure.</p>
                            </div>
                        </div>

                        <form class="profile-form" id="passwordForm" onsubmit="handlePasswordUpdate(event)">
                            <div class="form-group">
                                <label>Current Password</label>
                                <div class="password-field">
                                    <input type="password" id="currentPassword" placeholder="Enter current password" required>
                                    <button type="button" class="btn-toggle-pw" onclick="togglePassword('currentPassword')">
                                        <i class="far fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="divider"></div>

                            <div class="form-grid">
                                <div class="form-group">
                                    <label>New Password</label>
                                    <div class="password-field">
                                        <input type="password" id="newPassword" placeholder="Min. 8 characters" required minlength="8">
                                        <button type="button" class="btn-toggle-pw" onclick="togglePassword('newPassword')">
                                            <i class="far fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Confirm New Password</label>
                                    <div class="password-field">
                                        <input type="password" id="confirmPassword" placeholder="Repeat new password" required>
                                        <button type="button" class="btn-toggle-pw" onclick="togglePassword('confirmPassword')">
                                            <i class="far fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="password-requirements">
                                <p><i class="fas fa-info-circle"></i> Password must contain at least 8 characters, including numbers and symbols.</p>
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-key"></i> Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- PANEL: ACTIVITY -->
                    <div class="content-panel" id="panel-activity">
                        <div class="panel-header">
                            <div class="header-icon"><i class="fas fa-box-open"></i></div>
                            <div class="header-text">
                                <h2>My Orders</h2>
                                <p id="orderPanelSubtitle">Track your latest orders and review your printing transactions.</p>
                            </div>
                        </div>

                        <div class="order-filter-group">
                            <button class="filter-btn active" id="btnFilterActive" onclick="filterByStatus('active')">
                                <i class="fas fa-clock"></i> Active Orders
                            </button>
                            <button class="filter-btn" id="btnFilterHistory" onclick="filterByStatus('history')">
                                <i class="fas fa-receipt"></i> Transaction History
                            </button>
                        </div>

                        <div class="activity-table-wrapper">
                            <table class="activity-table">
                                <thead>
                                    <tr>
                                        <th>ORDER ID</th>
                                        <th>DATE & TIME</th>
                                        <th>STATUS</th>
                                        <th>AMOUNT</th>
                                        <th style="width: 100px;">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody id="activityTableBody">
                                    <!-- Populated by script.js -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>
            </div>

        </div>

    </main>
    
    <!-- ── VIEW DETAILS MODAL (Extracted for Printer Support) ── -->
    <div class="modal-overlay" id="orderModal" style="display: none;">
        <div class="modal-content transparent-modal" id="orderModalBody">
            <!-- Dynamic content from script.js (Receipt Engine) -->
        </div>
    </div>

    <!-- ── REORDER CONFIRMATION MODAL ── -->
    <div class="modal-overlay" id="reorderModal" style="display: none;">
        <div class="modal-content confirm-modal">
            <div class="confirm-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h2>Confirm Reorder?</h2>
            <p>Are you sure you want to re-add this order to your active queue? This will create a new order with the same items.</p>
            <div class="confirm-actions">
                <button class="btn btn-outline" onclick="closeReorderModal()">Cancel</button>
                <button class="btn btn-primary" id="confirmReorderBtn">Yes, Reorder</button>
            </div>
        </div>
    </div>

    <!-- ── LOGOUT CONFIRMATION MODAL ── -->
    <div class="modal-overlay" id="logoutModal" style="display: none;">
        <div class="modal-content confirm-modal">
            <div class="confirm-icon question-icon"><i class="fas fa-question-circle"></i></div>
            <h2>Confirm Logout?</h2>
            <p>Are you sure you want to log out? Your current session will be terminated.</p>
            <div class="confirm-actions">
                <button class="btn btn-outline" onclick="closeLogoutModal()">Cancel</button>
                <button class="btn btn-primary" onclick="executeLogout()">Confirm</button>
            </div>
        </div>
    </div>

    <!-- ===== FOOTER SPACER ===== -->
    <div class="footer-spacer" aria-hidden="true"></div>

    <!-- SCRIPTS -->
    <script src="script.js"></script>
</body>
</html>
