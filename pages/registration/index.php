<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
			crossorigin="anonymous"
		/>
		<!--Tab Logo-->
		<link rel="icon" href="/assets/img/PRNT_logo.png" type="image/png" />
		<!--Logo Library -->
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
		/>

		<link rel="stylesheet" href="/styles/global.css" />
		<link rel="stylesheet" href="styles.css" />

		<title>PRNT</title>
	</head>
	<body>
		<div class="registration-wrapper d-flex align-items-center justify-content-center">
    <div class="glass-card row g-0">
       <div class="col-md-5 welcome-side">
    <div class="brand">
        <img src="../../assets/img/PRNT-white.png" alt="PRNT" height="40">
    </div>
    
    <div class="middle-group">
        <h1 class="fw-bold text-white">Hello, Friend!</h1>
        <p class="text-white opacity-90">Share your printing needs and get quality prints.</p>
        
        <div class="signin-section mt-4">
            <a href="../login/" class="btn-signin">Sign In</a>
            <p class="small text-white mt-3 opacity-75">Already have an account?</p>
        </div>
    </div>

    <div class="footer-link">
        <a href="../../" class="text-white text-decoration-none small opacity-50">Back to home</a>
    </div>
</div>

        <div class="col-md-7 form-side p-5 bg-white">
            <h2 class="text-center fw-bold mb-4">Create Account</h2>
            
            <form id="signup-form">
                <div class="custom-input mb-3">
                    <i class="fa fa-user"></i>
                    <input type="text" placeholder="Name" class="form-control">
                </div>
                
                <div class="custom-input mb-3">
                    <i class="fa fa-envelope"></i>
                    <input type="email" placeholder="BulSU Email" class="form-control">
                </div>

                <div class="custom-input mb-3">
                    <i class="fa fa-phone"></i>
                    <input type="text" placeholder="Contact Number" class="form-control">
                </div>

                <div class="custom-input mb-3">
                    <input type="password" placeholder="Password" class="form-control">
                </div>

                <div class="custom-input mb-3">
                    <input type="password" placeholder="Confirm Password" class="form-control">
                </div>

            

                <button type="submit" class="btn join-btn w-100 py-3 text-white fw-bold rounded-3">
                    Join us <i class="fa fa-arrow-right ms-2"></i>
                </button>
            </form>
        </div>
    </div>
</div>
		<script src="script.js"></script>
	</body>
</html>
