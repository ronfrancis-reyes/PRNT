// Registration Page Specific Script
document.addEventListener('DOMContentLoaded', () => {
  // Load reusable components
  loadComponent('navbar-placeholder', '../../components/Navbar/index.html');
  loadComponent('footer-placeholder', '../../components/Footer/index.html');
});

function handleAuthRegister(e) {
  e.preventDefault();
  const fName = document.getElementById('regFirstName').value.trim();
  const lName = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const pass = document.getElementById('regPassword').value.trim();

  // Basic validation
  if (!fName || !lName || !email || !phone || !pass) return alert('Please fill in all fields.');

  // Simulate success
  const user = { name: `${fName} ${lName}`, email, phone, role: 'client' };
  localStorage.setItem('prnt_user', JSON.stringify(user));
  
  // Save to all users for mockup
  const users = JSON.parse(localStorage.getItem('prnt_all_users') || '[]');
  users.push(user);
  localStorage.setItem('prnt_all_users', JSON.stringify(users));

  alert(`Account created successfully! Welcome to PRNT, ${fName}!`);
  window.location.href = '/';
}
