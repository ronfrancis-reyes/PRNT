<div class="modal-overlay" id="registerModal">
    <div class="modal position-absolute top-50 start-50 translate-middle">
        <div class="modal-header">
            <h3>Create Account</h3>
            <button class="modal-close" onclick="closeModal('registerModal')"><i class="fas fa-times"></i></button>
        </div>
        <form onsubmit="handleRegister(event)">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="form-group">
                    <label for="regFirstName">First Name</label>
                    <input type="text" id="regFirstName" placeholder="Juan" required>
                </div>
                <div class="form-group">
                    <label for="regLastName">Last Name</label>
                    <input type="text" id="regLastName" placeholder="Dela Cruz" required>
                </div>
            </div>
            <div class="form-group">
                <label for="regEmail">BulSU Email</label>
                <input type="email" id="regEmail" placeholder="juan@bulsu.edu.ph" required>
            </div>
            <div class="form-group">
                <label for="regPhone">Phone Number</label>
                <input type="tel" id="regPhone" placeholder="09XX XXX XXXX" required>
            </div>
            <div class="form-group">
                <label for="regPassword">Password</label>
                <input type="password" id="regPassword" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">
                <i class="fas fa-user-plus"></i> Create Account
            </button>
        </form>
        <div class="auth-footer">
            Already have an account? <a href="#" onclick="switchAuthModal('login')">Login</a>
        </div>
    </div>
</div>