<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'login' || $action === 'register') {
        $_SESSION['user_logged_in'] = true;
        echo json_encode(["success" => true]);
        exit;
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" href="../../assets/img/PRNT_logo.png" type="image/png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>"> 
    <title>PRNT - Authentication</title>
</head>
<body>
    <div class="background-wrapper">
        
        <div class="auth-container" id="auth-container">
            <!-- Sign Up Panel -->
            <div class="form-container sign-up-container">
                <form id="signup-form">
                    <h2 class="fw-bold mb-1 title-orange mt-2">Create Account</h2>
                    <p class="subtitle text-muted mb-2 small">Start your journey with us</p>

                    <div class="names-row">
                        <div class="input-group-custom">
                            <i class="fas fa-user icon"></i>
                            <input type="text" id="reg-fname" placeholder=" " required />
                            <label for="reg-fname">First Name</label>
                        </div>
                        <div class="input-group-custom">
                            <i class="fas fa-user icon"></i>
                            <input type="text" id="reg-lname" placeholder=" " required />
                            <label for="reg-lname">Last Name</label>
                        </div>
                    </div>
                    <div class="input-group-custom">
                        <i class="fas fa-envelope icon"></i>
                        <input type="email" id="reg-email" placeholder=" " required />
                        <label for="reg-email">BulSU Email</label>
                    </div>
                    <div class="input-group-custom">
                        <i class="fas fa-phone icon"></i>
                        <input type="text" id="reg-contact" placeholder=" " required />
                        <label for="reg-contact">Contact Number</label>
                    </div>
                    <div class="input-group-custom position-relative">
                        <i class="fas fa-lock icon"></i>
                        <input type="password" id="reg-password" placeholder=" " required />
                        <label for="reg-password">Password</label>
                    </div>
                    <div class="input-group-custom position-relative mb-1">
                        <i class="fas fa-lock icon"></i>
                        <input type="password" id="reg-retype" placeholder=" " required />
                        <label for="reg-retype">Confirm Password</label>
                    </div>
                    
                    <div class="strength-meter mb-1" id="strength-meter">
                        <div class="bar" id="strength-bar"></div>
                        <span id="strength-text" class="small d-block text-muted text-start w-100 ps-1"></span>
                    </div>

                    <div class="terms-group mb-1 w-100 text-start ps-1 d-flex align-items-center">
                        <input type="checkbox" id="reg-terms">
                        <label for="reg-terms" class="small text-muted ms-2 cursor-pointer pt-1">I agree to the <a href="#" id="terms-link" class="auth-link">Terms & Conditions</a></label>
                    </div>

                    <div id="reg-error" class="error-msg"></div>

                    <button type="submit" id="signupbtn" class="btn-solid mt-1" disabled>Sign Up</button>
                    
                    <div class="mobile-toggle text-center mt-2 d-md-none">
                        <p class="small text-muted mb-0">Already have an account? <a href="#" id="mobile-signIn" class="mobile-link">Sign In</a></p>
                    </div>
                </form>
            </div>
            
            <!-- Sign In Panel -->
            <div class="form-container sign-in-container">
                <form id="signin-form">
                    <h2 class="fw-bold mb-1 title-orange">Sign In</h2>
                    <p class="subtitle text-muted mb-4 small">Welcome back to PRNT</p>
                    
                    <div class="input-group-custom">
                        <i class="fas fa-envelope icon"></i>
                        <input type="email" id="login-email" placeholder=" " required />
                        <label for="login-email">BulSU Email</label>
                    </div>
                    <div class="input-group-custom position-relative">
                        <i class="fas fa-lock icon"></i>
                        <input type="password" id="login-password" placeholder=" " required />
                        <label for="login-password">Password</label>
                        <i class="fas fa-eye toggle-pass" id="login-show-pass"></i>
                    </div>

                    <div class="d-flex justify-content-between w-100 mb-4 px-1 mt-2 align-items-center">
                        <div class="remember-me d-flex align-items-center">
                            <input type="checkbox" id="remember-me">
                            <label for="remember-me" class="small text-muted ms-2 cursor-pointer pt-1">Remember me</label>
                        </div>
                        <a href="#" class="small auth-link" id="forgot-link">Forgot Password?</a>
                    </div>

                    <div id="login-error" class="error-msg"></div>

                    <button type="submit" id="submitButton" class="btn-solid" disabled>Sign In</button>
                    
                    <div class="mobile-toggle text-center mt-4 d-md-none">
                        <p class="small text-muted mb-0">Don't have an account? <a href="#" id="mobile-signUp" class="mobile-link">Sign Up</a></p>
                    </div>
                </form>
            </div>
            
            <!-- Overlay Panel -->
            <div class="overlay-container d-none d-md-block">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1 class="fw-bold text-white mb-3">Hello, Friend!</h1>
                        <p class="text-white opacity-75 px-4 mb-4">Share your printing needs and get quality prints by creating an account.</p>
                        <button class="btn-ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1 class="fw-bold text-white mb-3">Welcome Back!</h1>
                        <p class="text-white opacity-75 px-4 mb-4">Ready to print more? Log in to seamlessly order new prints and view your history!</p>
                        <button class="btn-ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Interactive Modals -->
        <div id="terms-modal" class="custom-modal d-none">
            <div class="custom-modal-content px-4 py-4" style="max-height: 85vh; overflow-y: auto; position: relative;">
                <button id="close-terms-icon" class="btn-close-modal"><i class="fas fa-times"></i></button>
                <h3 class="fw-bold title-orange mb-3 text-center">Terms & Conditions</h3>
                <ol class="small text-muted text-start lh-base ps-3 pe-1" style="font-size: 0.8rem;">
                    <li><strong>Account Exclusivity:</strong> Account creation is strictly limited to individuals with a valid BulSU email account.</li>
                    <li><strong>Acceptable Use:</strong> The PRNT service is intended solely for educational requirements and commercial printing, any illegal use of the service is strictly prohibited.</li>
                    <li><strong>Prohibited Content:</strong> Users shall not submit explicit, illegal, or malicious documents for printing.</li>
                    <li><strong>Service Abuse:</strong> Any attempt to spam the queue or abuse the printing system will result in immediate account termination.</li>
                    <li><strong>Print Retention:</strong> Completed prints must be claimed at the front desk within three (3) calendar days.</li>
                    <li><strong>Abandoned Prints:</strong> Prints not claimed within the retention period will be securely discarded without notice.</li>
                    <li><strong>Limitation of Liability:</strong> While we strive for maximum reliability, unexpected system or printer malfunctions may occur. Users are encouraged to submit prints well ahead of academic deadlines.</li>
                    <li><strong>Intellectual Property:</strong> PRNT respects copyright laws; users are fully responsible for the legality of the documents they upload.</li>
                    <li><strong>Data Privacy:</strong> Document contents and personal data are kept confidential and are not shared with third parties.</li>
                    <li><strong>Termination Policy:</strong> PRNT reserves the right to suspend or terminate any account violating these terms at our sole discretion.</li>
                </ol>
                <div class="d-flex justify-content-center mt-3">
                    <button id="close-terms" class="btn-solid w-100">I Agree</button>
                </div>
            </div>
        </div>

        <div id="forgot-modal" class="custom-modal d-none">
            <div class="custom-modal-content px-4 py-4 text-center">
                <h3 class="fw-bold title-orange mb-2">Reset Password</h3>
                <p class="small text-muted mb-4">Enter your BulSU email and we'll send a secure reset link.</p>
                <div class="input-group-custom mt-2 text-start">
                    <i class="fas fa-paper-plane icon"></i>
                    <input type="email" id="reset-email" placeholder=" " required />
                    <label for="reset-email">BulSU Email</label>
                </div>
                <p id="forgot-msg" class="small mt-2 mb-3 fw-bold"></p>
                <div class="d-flex flex-row gap-2 w-100">
                    <button id="close-forgot" class="btn-ghost w-50" style="color:#555; border-color:#ccc; padding-left:0; padding-right:0;">Cancel</button>
                    <button id="send-reset" class="btn-solid w-50" style="padding-left:0; padding-right:0;">Send Link</button>
                </div>
            </div>
        </div>

    </div>
    <script src="script.js?v=<?php echo time(); ?>"></script>
</body>
</html>