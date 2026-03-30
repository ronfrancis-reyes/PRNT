// Login Page Specific Script
document.addEventListener('DOMContentLoaded', () => {
  // Load reusable components
  loadComponent('navbar-placeholder', '../../components/Navbar/index.html');
  loadComponent('footer-placeholder', '../../components/Footer/index.html');
});

function handleAuthLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();

  // Basic validation
  if (!email || !pass) return alert('Please fill in all fields.');

  // Check for admin
  if (email === 'admin@prnt.com' && pass === 'admin123') {
    localStorage.setItem('prnt_user', JSON.stringify({ name: 'Admin', email, role: 'admin' }));
    window.location.href = '/pages/admin/dashboard/';
    return;
  }

  // Simulate success
  const user = { name: 'Juan Dela Cruz', email, role: 'client' };
  localStorage.setItem('prnt_user', JSON.stringify(user));
  alert('Welcome back, ' + user.name + '!');
  window.location.href = '/';
}
