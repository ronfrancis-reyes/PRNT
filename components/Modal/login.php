<div class="modal-overlay" id="loginModal">
    <div class="modal position-absolute top-50 start-50 translate-middle">
        <div class="modal-header">
            <h3>Welcome Back</h3>
            <button class="modal-close" onclick="closeModal('loginModal')"><i class="fas fa-times"></i></button>
        </div>
        <form id="login-form">
            <div class="form-group">
                <label for="emailInput">Email</label>
                <input type="email" id="emailInput" placeholder="juan@ms.bulsu.edu.ph" required>
            </div>
            <div class="form-group">
                <label for="passInput">Password</label>
                <input type="password" id="passInput" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn btn-primary" id="submitButton" style="width:100%;justify-content:center;">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
        </form>
        <div class="auth-footer">
            Don't have an account? <a href="#" onclick="switchAuthModal('register')">Register</a>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>