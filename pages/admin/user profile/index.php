<?php
include "../../../api/config.php";
if(!isset($_SESSION['user'])) {
header("Location: /PRNT/pages/login/");
} else if ($_SESSION['user'] != 1) {
header("Location: /PRNT/pages/client/service-avail/");
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile | PRNT Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="d-flex">
            <!-- SIDEBAR: ALFRED-->
	<div class="sidebar-spacer d-none d-lg-block" style="width: 260px;"></div>
            <!-- SIDEBAR: ALFRED-->
        <div class="main-wrapper flex-grow-1">
            
              <!-- TOPBAR: ALFRED-->
            <nav class="top-navbar">
                </nav>
              <!-- TOPBAR: ALFRED-->
            <div class="p-4">
                <div class="mb-4">
                    <h2 class="fw-bold mb-1">User Profile</h2>
                    <p class="text-secondary small">Manage your account settings and preferences.</p>
                </div>

                <div class="row g-4">
                    <div class="col-lg-4">
                        <div class="card card-white p-4 text-center border-0 shadow-sm">
                            <div class="profile-avatar-circle mx-auto mb-3">
                                <span>YN</span>
                            </div>
                            <h4 class="fw-bold mb-1">Yance Nathan</h4>
                            <p class="text-secondary small mb-4">Administrator</p>
                            
                            <div class="text-start border-top pt-4">
                                <div class="d-flex align-items-center mb-3 small text-secondary">
                                    <i class="far fa-envelope me-3"></i>yancenathanc@gmail.com
                                </div>
                                <div class="d-flex align-items-center mb-3 small text-secondary">
                                    <i class="fas fa-phone me-3"></i>+63 (900) 123-4567
                                </div>
                                <div class="d-flex align-items-center mb-3 small text-secondary">
                                    <i class="fas fa-map-marker-alt me-3"></i>Bulacan, Philippines
                                </div>
                                <div class="d-flex align-items-center small text-secondary">
                                    <i class="far fa-calendar-alt me-3"></i>Joined March 20, 2026
                                </div>
                            </div>
                            <button id="editProfileBtn" class="btn btn-orange-main w-100 mt-4 fw-bold">
                                <i class="fas fa-edit me-2"></i>Edit Profile
                            </button>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        
                        <div class="card card-white p-4 mb-4 border-0 shadow-sm">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="fw-bold mb-0">Personal Information</h5>
                                <button id="saveBtn" class="btn btn-success fw-bold px-3 d-none">
                                    <i class="fas fa-check me-2"></i>Save Changes
                                </button>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label small fw-bold text-secondary">Full Name</label>
                                    <input type="text" class="form-control edit-input" value="Yance Nathan" disabled>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label small fw-bold text-secondary">Email</label>
                                    <input type="email" class="form-control edit-input" value="yancenathanc@gmail.com" disabled>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label small fw-bold text-secondary">Phone</label>
                                    <input type="text" class="form-control edit-input" value="+63 (900) 123-4567" disabled>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label small fw-bold text-secondary">Location</label>
                                    <input type="text" class="form-control edit-input" value="Bulacan, Philippines" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="card card-white p-3 mb-4 border-0 shadow-sm">
                            <div class="d-flex justify-content-between align-items-center" 
                                 role="button" 
                                 data-bs-toggle="collapse" 
                                 data-bs-target="#passwordCollapse">
                                
                                <h5 class="fw-bold mb-0">Change Password</h5>
                                <button class="btn btn-outline-light btn-sm fw-bold px-3">
                                    <i class="fas fa-lock me-2"></i>Change Password
                                </button>
                            </div>

                            <div class="collapse mt-4 border-top pt-4" id="passwordCollapse">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <h6 class="fw-bold mb-0">Update Your Password</h6>
                                    <button class="btn btn-sm btn-link text-secondary text-decoration-none" 
                                            data-bs-toggle="collapse" 
                                            data-bs-target="#passwordCollapse">
                                        <i class="fas fa-times me-1"></i> Cancel
                                    </button>
                                </div>

                                <form>
                                    <div class="mb-3">
                                        <label class="form-label small fw-bold text-secondary">Current Password</label>
                                        <input type="password" class="form-control edit-input" style="pointer-events: auto;" placeholder="Enter current password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label small fw-bold text-secondary">New Password</label>
                                        <input type="password" class="form-control edit-input" style="pointer-events: auto;" placeholder="Enter new password" required>
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label small fw-bold text-secondary">Confirm New Password</label>
                                        <input type="password" class="form-control edit-input" style="pointer-events: auto;" placeholder="Confirm new password" required>
                                    </div>
                                    <button type="submit" class="btn btn-orange-main w-100 py-2 fw-bold">
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div class="card card-white p-4 border-0 shadow-sm">
                            <h5 class="fw-bold mb-4">Activity Overview</h5>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6 col-xl-3">
                                    <div class="stat-card">
                                        <div class="icon-box bg-orange-soft text-orange-main">
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                        <div>
                                            <p class="text-secondary small mb-0">Total Orders</p>
                                            <h5 class="mb-0 fw-bold">1,248</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <div class="stat-card">
                                        <div class="icon-box bg-success-soft text-success">
                                            <i class="fas fa-dollar-sign"></i>
                                        </div>
                                        <div>
                                            <p class="text-secondary small mb-0">Revenue</p>
                                            <h5 class="mb-0 fw-bold">$124,580</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <div class="stat-card">
                                        <div class="icon-box bg-blue-soft text-primary">
                                            <i class="far fa-calendar-check"></i>
                                        </div>
                                        <div>
                                            <p class="text-secondary small mb-0">Active Days</p>
                                            <h5 class="mb-0 fw-bold">285</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <div class="stat-card">
                                        <div class="icon-box bg-purple-soft text-purple">
                                            <i class="fas fa-bolt"></i>
                                        </div>
                                        <div>
                                            <p class="text-secondary small mb-0">Activity</p>
                                            <h5 class="mb-0 fw-bold">2m ago</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h6 class="fw-bold mb-3">Recent Activity</h6>
                            <ul class="recent-activity-list">
                                <li class="recent-activity-item">
                                    <span class="dot"></span>
                                    <div>
                                        <p class="mb-0 small fw-medium">Processed order <span class="text-orange-main">ORD-1234</span></p>
                                        <p class="text-muted smallest">2 minutes ago</p>
                                    </div>
                                </li>
                                <li class="recent-activity-item">
                                    <span class="dot"></span>
                                    <div>
                                        <p class="mb-0 small fw-medium">Updated service pricing <span class="text-orange-main">Business Cards</span></p>
                                        <p class="text-muted smallest">1 hour ago</p>
                                    </div>
                                </li>
                            </ul>
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div> </div> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
        <script src="script.js"></script>
</body>
</html>