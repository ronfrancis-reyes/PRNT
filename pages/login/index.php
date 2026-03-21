<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>"> 
    <title>PRNT - Sign In</title>
</head>
<body>
    <div class="dark-overlay"></div> 
    
    <div class="main-container">

        <div class="login-wrapper">
            <div class="row g-0 h-100">
                <div class="col-lg-6 col-md-6 col-12 login-side">
                    <div class="login-content">
                        <div class="logo-box mb-4">
                            <img src="../../assets/img/WHITELOGO.jpg" alt="Logo" class="main-logo">
                        </div>
                        
                        <h1 class="title text-center">Sign In</h1>
                        
                        <form class="mt-4" id="login-form">
                            <div class="mb-4">
                                <label class="custom-label">BulSU Email</label>
                                <input type="email" class="form-control custom-input" placeholder="example@bulsu.edu.ph" id="emailInput">
                            </div>
                            <div class="mb-3">
                                <label class="custom-label">Password</label>
                                <input type="password" class="form-control custom-input" id="passInput">
                            </div>
                            
                            <div class="d-flex justify-content-between align-items-center mb-5">
                                <div class="show-pass">
                                    <input type="checkbox" onclick="showPass()" id="check"> 
                                    <label for="check" class="form-link ms-1" style="cursor:pointer">Show Password</label>
                                </div>
                            </div>
                            
                            <button type="submit" class="btn btn-signin w-100" id="submitButton" disabled>Sign In</button>
                        </form>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 d-none d-md-flex welcome-side">
                    <div class="welcome-content text-center">
                        <h1 class="welcome-title">Welcome Back!</h1>
                        <p class="welcome-text px-4">Share your printing needs and get quality prints.</p>
                        
                        <div class="action-group mt-5 pt-3">
                            <a href="../registration/index.php" class="btn btn-signup">Sign Up</a>
                            <p class="mt-3"><a href="../registration/index.php" class="create-acc">Create an account</a></p>
                        </div>
                    </div>
                    <div class="footer-link">
                    <a href="../../" class="text-white text-decoration-none small opacity-50">Back to home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
    
</html>