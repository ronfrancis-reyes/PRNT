// Root Page Script
document.addEventListener('DOMContentLoaded', () => {
  // Load reusable components
  loadComponent('navbar-placeholder', '/components/Navbar/index.html');
  loadComponent('footer-placeholder', '/components/Footer/index.html');

  // Any Home specific animations or logic here
});

function navigateTo(page) {
  const routes = {
    'home': '/',
    'about': '/pages/about/',
    'works': '/pages/works/',
    'service': '/pages/service/',
    'contact': '/pages/contact/',
    'order': '/pages/client/service-avail/',
    'login': '/pages/login/',
    'register': '/pages/registration/',
    'admin': '/pages/admin/dashboard/',
  };
  window.location.href = routes[page] || '/';
}
