<div class="modal-overlay" id="loginModal">
    <div class="modal position-absolute top-50 start-50 translate-middle">
        <div class="modal-header">
            <h3>Welcome Back</h3>
            <button class="modal-close" onclick="closeModal('loginModal')"><i class="fas fa-times"></i></button>
        </div>
        <form onsubmit="handleLogin(event)">
            <div class="form-group">
                <label for="loginEmail">Email</label>
                <input type="email" id="loginEmail" placeholder="juan@bulsu.edu.ph" required>
            </div>
            <div class="form-group">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
        </form>
        <div class="auth-footer">
            Don't have an account? <a href="#" onclick="switchAuthModal('register')">Register</a>
        </div>
    </div>
</div>
