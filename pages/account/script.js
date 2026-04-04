document.addEventListener("DOMContentLoaded", () => {
    // === UI Elements ===
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const authContainer = document.getElementById('auth-container');
    const mobileSignUpBtn = document.getElementById('mobile-signUp');
    const mobileSignInBtn = document.getElementById('mobile-signIn');

    // === Slider Toggle Logic ===
    if (signUpButton && signInButton && authContainer) {
        // Handle URL parameters for automatic sign up opening
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('auth') === 'signup') {
            authContainer.classList.add("right-panel-active");
            authContainer.classList.add("mobile-signup-active");
        }

        signUpButton.addEventListener('click', () => {
            authContainer.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            authContainer.classList.remove("right-panel-active");
        });
    }

    if(mobileSignUpBtn && mobileSignInBtn) {
        mobileSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authContainer.classList.add("mobile-signup-active");
        });
        mobileSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authContainer.classList.remove("mobile-signup-active");
        });
    }

    // === Show Password Toggle (Login) ===
    const passToggle = document.getElementById("login-show-pass");
    const loginPassInput = document.getElementById("login-password");
    if(passToggle && loginPassInput) {
        passToggle.addEventListener("click", () => {
            if (loginPassInput.type === "password") {
                loginPassInput.type = "text";
                passToggle.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                loginPassInput.type = "password";
                passToggle.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }

    // === Remember Me Logic ===
    const loginEmail = document.getElementById("login-email");
    const rememberMe = document.getElementById("remember-me");
    if(loginEmail && rememberMe) {
        console.debug("[PRNT] Action disabled (no storage) - Remember Me bypassed");
    }

    // === Login Form Validation ===
    const loginBtn = document.getElementById("submitButton");
    const loginError = document.getElementById("login-error");

    const testEmail = "sample@ms.bulsu.edu.ph";
    const testPassword = "sample123!";

    function validateLoginState() {
        if (!loginEmail || !loginPassInput || !loginBtn) return;
        if (loginEmail.value.trim() !== "" && loginPassInput.value.trim() !== "") {
            loginBtn.disabled = false;
        } else {
            loginBtn.disabled = true;
            loginError.textContent = "";
        }
    }

    if(loginEmail && loginPassInput) {
        loginEmail.addEventListener("input", validateLoginState);
        loginPassInput.addEventListener("input", validateLoginState);
        // Fire initially in case localStorage pre-filled
        validateLoginState();
    }

    const signinForm = document.getElementById("signin-form");
    if(signinForm) {
        signinForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // ACTION DISABLED — STORAGE REMOVED
            console.debug("[PRNT] Action disabled (no storage) - Remember Me save bypassed");

            if (loginEmail.value.trim() === testEmail && loginPassInput.value.trim() === testPassword) {
                loginError.style.color = "#4caf50"; 
                loginError.textContent = "Welcome back to PRNT! Redirecting...";
                // ACTION DISABLED — BACKEND REMOVED
                console.debug("[PRNT] API disabled");
                Promise.resolve(null).then(() => {
                    setTimeout(() => {
                        window.location.href = "../../index.php";
                    }, 1500);
                });
            } else {
                loginError.style.color = "#ff4d4d";
                loginError.textContent = "Invalid email or password!";
            }
        });
    }

    // === Interactive Modals Validation ===
    const termsLink = document.getElementById("terms-link");
    const termsModal = document.getElementById("terms-modal");
    const closeTerms = document.getElementById("close-terms");
    const closeTermsIcon = document.getElementById("close-terms-icon");
    const regTerms = document.getElementById("reg-terms"); // checkbox

    if(termsLink && termsModal && closeTerms && closeTermsIcon) {
        termsLink.addEventListener("click", (e) => {
            e.preventDefault();
            termsModal.classList.remove("d-none");
        });
        closeTerms.addEventListener("click", () => {
            termsModal.classList.add("d-none");
            if(regTerms) { regTerms.checked = true; validateRegState(); } 
        });
        closeTermsIcon.addEventListener("click", () => {
            termsModal.classList.add("d-none");
        });
    }

    const forgotLink = document.getElementById("forgot-link");
    const forgotModal = document.getElementById("forgot-modal");
    const closeForgot = document.getElementById("close-forgot");
    const sendReset = document.getElementById("send-reset");
    const forgotMsg = document.getElementById("forgot-msg");
    const resetEmail = document.getElementById("reset-email");

    if(forgotLink && forgotModal && closeForgot && sendReset) {
        forgotLink.addEventListener("click", (e) => {
            e.preventDefault();
            forgotModal.classList.remove("d-none");
            forgotMsg.textContent = "";
            if(resetEmail) resetEmail.value = "";
        });
        closeForgot.addEventListener("click", () => {
            forgotModal.classList.add("d-none");
        });
        sendReset.addEventListener("click", () => {
            if(resetEmail && resetEmail.value.trim() !== "") {
                forgotMsg.style.color = "#4caf50";
                forgotMsg.textContent = "Password reset link safely sent to your email!";
            } else {
                forgotMsg.style.color = "#ff4d4d";
                forgotMsg.textContent = "Please enter your BulSU email.";
            }
        });
    }

    // === Registration Form Validation ===
    const regFname = document.getElementById("reg-fname");
    const regLname = document.getElementById("reg-lname");
    const regEmail = document.getElementById("reg-email");
    const regContact = document.getElementById("reg-contact");
    const regPass = document.getElementById("reg-password");
    const regRetype = document.getElementById("reg-retype");
    const regBtn = document.getElementById("signupbtn");
    const regError = document.getElementById("reg-error");
    
    // Strength meter elements
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");

    function checkPassStrength(pass) {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (pass.includes("@") || pass.includes(".") || pass.includes("_") || pass.includes("!") || pass.includes("#")) strength++;
        return strength;
    }

    function updateStrengthMeter(pass) {
        const val = checkPassStrength(pass);
        if(!strengthBar) return;
        
        strengthBar.className = "bar"; // reset
        if(pass.length === 0) {
            strengthText.textContent = "";
        } else if(val < 3) {
            strengthBar.classList.add("weak");
            strengthText.textContent = "Weak password";
            strengthText.style.color = "#ff4d4d";
        } else if(val === 3 || val === 4) {
            strengthBar.classList.add("medium");
            strengthText.textContent = "Medium password";
            strengthText.style.color = "#ffcc00";
        } else {
            strengthBar.classList.add("strong");
            strengthText.textContent = "Strong password";
            strengthText.style.color = "#4caf50";
        }
    }

    function validateRegState() {
        if (!regFname || !regLname || !regEmail || !regContact || !regPass || !regRetype || !regTerms || !regBtn) return;
        
        if (regPass) updateStrengthMeter(regPass.value);

        if (regFname.value.trim() !== "" && 
            regLname.value.trim() !== "" && 
            regEmail.value.trim() !== "" && 
            regContact.value.trim() !== "" && 
            regPass.value.trim() !== "" && 
            regRetype.value.trim() !== "" && 
            regTerms.checked) {
            regBtn.disabled = false;
        } else {
            regBtn.disabled = true;
            regError.textContent = "";
        }
    }

    const regInputs = [regFname, regLname, regEmail, regContact, regPass, regRetype, regTerms];
    regInputs.forEach(input => {
        if(input) {
            if(input.type === 'checkbox') input.addEventListener('change', validateRegState);
            else input.addEventListener('input', validateRegState);
        }
    });

    const signupForm = document.getElementById("signup-form");
    if(signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const em = regEmail.value.trim();
            const co = regContact.value.trim();
            const pw = regPass.value.trim();
            const rp = regRetype.value.trim();
            
            if (!/^[^\s@]+@ms\.bulsu\.edu\.ph$/.test(em)) {
                regError.textContent = "Please use a valid BulSU MS Account!";
                return;
            }
            if (!/^09[0-9]{9}$/.test(co)) {
                regError.textContent = "Please enter a valid 11-digit number starting with 09!";
                return;
            }
            
            const strength = checkPassStrength(pw);
            if(strength < 3) {
                regError.textContent = "Password is too weak. Please improve it.";
                return;
            }
            
            if(pw !== rp) {
                regError.textContent = "Passwords do not match!";
                return;
            }
            
            regError.style.color = "#4caf50";
            regError.textContent = "Account Created Successfully! Redirecting...";
            regBtn.disabled = true;
            // ACTION DISABLED — BACKEND REMOVED
            console.debug("[PRNT] API disabled");
            Promise.resolve(null).then(() => {
                setTimeout(() => {
                    window.location.href = "../../index.php";
                }, 1500);
            });
        });
    }
});
