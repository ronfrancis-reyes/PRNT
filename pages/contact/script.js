// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Load Global Components
  loadComponent('navbar-placeholder', '/components/Navbar/index.html');
  loadComponent('footer-placeholder', '/components/Footer/index.html');
});

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const message = document.getElementById('cMessage').value.trim();

  // Mock message storage
  const messages = JSON.parse(localStorage.getItem('prnt_messages') || '[]');
  messages.push({
    id: 'MSG-' + Date.now().toString().slice(-4),
    name,
    email,
    subject,
    message,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('prnt_messages', JSON.stringify(messages));

  alert(`Thank you, ${name}! Your message has been sent successfully.`);
  e.target.reset();
}
