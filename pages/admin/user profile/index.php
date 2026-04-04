<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Profile | PRNT Admin</title>

    <!-- UI Core -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Global Variables & Sidebar -->
    <link rel="stylesheet" href="../../../global/admin/variables.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="page-content">
            <div class="profile-grid">

                <div class="profile-sidebar-col">
                    <div class="profile-card text-center">

                        <div class="avatar-container" id="avatarContainer">
                            <div class="profile-avatar" id="profileAvatar" data-user-initials>
                                <span id="profileInitials">YN</span>
                            </div>
                            <div class="avatar-overlay">
                                <i class="fas fa-camera"></i>
                                <span>Change Photo</span>
                            </div>
                            <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                        </div>

                        <h4 class="profile-name" id="profileDisplayName">Yance Nathan</h4>
                        <span class="profile-role-badge">Administrator</span>

                        <div class="profile-info-list">
                            <div class="profile-info-row">
                                <i class="far fa-envelope"></i>
                                <span id="infoEmail">yancenathanc@gmail.com</span>
                            </div>
                            <div class="profile-info-row">
                                <i class="fas fa-phone"></i>
                                <span id="infoPhone">+63 (900) 123-4567</span>
                            </div>
                            <div class="profile-info-row">
                                <i class="fas fa-map-marker-alt"></i>
                                <span id="infoLocation">Bulacan, Philippines</span>
                            </div>
                            <div class="profile-info-row">
                                <i class="far fa-calendar-alt"></i>
                                <span>Joined March 20, 2026</span>
                            </div>
                        </div>

                        <button id="editProfileBtn" class="profile-btn profile-btn-primary">
                            <i class="fas fa-edit"></i> Edit Profile
                        </button>
                        <button id="cancelEditBtn" class="profile-btn profile-btn-ghost" style="display:none;">
                            <i class="fas fa-times"></i> Cancel
                        </button>

                    </div>
                </div>

                <div class="profile-main-col">

                    <!-- Personal Information -->
                    <div class="profile-card profile-card-gap">
                        <div class="profile-card-hd">
                            <h5 class="profile-card-title">Personal Information</h5>
                            <button id="saveBtn" class="profile-btn profile-btn-success" style="display:none;">
                                <i class="fas fa-check"></i> Save Changes
                            </button>
                        </div>

                        <div class="profile-form-grid">
                            <div class="profile-form-group">
                                <label class="profile-label">Full Name</label>
                                <input type="text"  class="profile-input edit-input" id="fieldName"     value="Yance Nathan"           disabled>
                            </div>
                            <div class="profile-form-group">
                                <label class="profile-label">Email</label>
                                <input type="email" class="profile-input edit-input" id="fieldEmail"    value="yancenathanc@gmail.com" disabled>
                            </div>
                            <div class="profile-form-group">
                                <label class="profile-label">Phone</label>
                                <input type="text"  class="profile-input edit-input" id="fieldPhone"    value="+63 (900) 123-4567"     disabled>
                            </div>
                            <div class="profile-form-group">
                                <label class="profile-label">Location</label>
                                <input type="text"  class="profile-input edit-input" id="fieldLocation" value="Bulacan, Philippines"   disabled>
                            </div>
                        </div>
                    </div>

                    <!-- Change Password -->
                    <div class="profile-card profile-card-gap">

                        <div class="profile-card-hd pw-toggle-hd" id="pwToggle" role="button" aria-expanded="false" aria-controls="passwordPanel" tabindex="0">
                            <h5 class="profile-card-title">Change Password</h5>
                            <button class="profile-btn profile-btn-ghost profile-btn-sm" type="button" tabindex="-1">
                                <i class="fas fa-lock"></i> Change Password
                            </button>
                        </div>

                        <div class="pw-panel" id="passwordPanel" aria-hidden="true">

                            <div class="pw-inner-hd">
                                <h6 class="pw-inner-title">Update Your Password</h6>
                                <button class="profile-btn profile-btn-ghost profile-btn-sm" id="cancelPwBtn" type="button">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>

                            <form id="passwordForm" novalidate>
                                <div class="profile-form-group">
                                    <label class="profile-label">Current Password</label>
                                    <div class="input-eye-wrap">
                                        <input type="password" class="profile-input" id="pwCurrent" placeholder="Enter current password" required>
                                        <button type="button" class="pw-eye-btn" data-target="pwCurrent" tabindex="-1">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="profile-form-group">
                                    <label class="profile-label">New Password</label>
                                    <div class="input-eye-wrap">
                                        <input type="password" class="profile-input" id="pwNew" placeholder="Enter new password (min 8 chars)" required minlength="8">
                                        <button type="button" class="pw-eye-btn" data-target="pwNew" tabindex="-1">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                    <div class="pw-strength-row" id="pwStrengthWrap" style="display:none;">
                                        <div class="pw-strength-track">
                                            <div class="pw-strength-fill" id="pwStrengthFill"></div>
                                        </div>
                                        <span class="pw-strength-lbl" id="pwStrengthLabel"></span>
                                    </div>
                                </div>

                                <div class="profile-form-group">
                                    <label class="profile-label">Confirm New Password</label>
                                    <div class="input-eye-wrap">
                                        <input type="password" class="profile-input" id="pwConfirm" placeholder="Confirm new password" required>
                                        <button type="button" class="pw-eye-btn" data-target="pwConfirm" tabindex="-1">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                    <span class="pw-field-error" id="pwMatchError" style="display:none;">
                                        <i class="fas fa-circle-exclamation"></i> Passwords do not match
                                    </span>
                                </div>

                                <button type="submit" class="profile-btn profile-btn-primary profile-btn-block">
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Activity Overview -->
                    <div class="profile-card">
                        <div class="profile-card-hd">
                            <h5 class="profile-card-title">Activity Overview</h5>
                        </div>

                        <div class="activity-stats-grid">
                            <div class="activity-stat">
                                <div class="activity-stat-icon" style="background:rgba(255,107,0,0.1);color:var(--primary);">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <div>
                                    <p class="activity-stat-lbl">Total Orders</p>
                                    <p class="activity-stat-val" id="statOrders">0</p>
                                </div>
                            </div>
                            <div class="activity-stat">
                                <div class="activity-stat-icon" style="background:rgba(36,209,100,0.1);color:#24d164;">
                                    <i class="fas fa-peso-sign"></i>
                                </div>
                                <div>
                                    <p class="activity-stat-lbl">Revenue</p>
                                    <p class="activity-stat-val" id="statRevenue">₱ 0</p>
                                </div>
                            </div>
                            <div class="activity-stat">
                                <div class="activity-stat-icon" style="background:rgba(13,110,253,0.1);color:#3b82f6;">
                                    <i class="far fa-calendar-check"></i>
                                </div>
                                <div>
                                    <p class="activity-stat-lbl">Active Days</p>
                                    <p class="activity-stat-val" id="statDays">0</p>
                                </div>
                            </div>
                            <div class="activity-stat">
                                <div class="activity-stat-icon" style="background:rgba(111,66,193,0.1);color:#9d50bb;">
                                    <i class="fas fa-bolt"></i>
                                </div>
                                <div>
                                    <p class="activity-stat-lbl">Last Active</p>
                                    <p class="activity-stat-val" id="statActivity">—</p>
                                </div>
                            </div>
                        </div>

                        <div class="activity-feed-hd">
                            <span class="profile-card-title" style="font-size:0.78rem;">Recent Activity</span>
                        </div>
                        <ul class="activity-feed" id="activityFeed">
                            <!-- populated by script.js -->
                        </ul>
                    </div>

                </div>
            </div>
</div>
<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
<script src="script.js"></script>

</body>
</html>