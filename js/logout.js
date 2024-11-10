function logout() {
    localStorage.clear();
    window.location.href = "login.html";
  }
    
  // MANEJO DE SESION Y MENU COLAPSABLE DE USUARIO
const user = localStorage.getItem("user");
if (user) {
  // ENLACE EN NOMBRE DE USUARIO
  const userLink = document.createElement('a');
  userLink.href = "my-profile.html";
  userLink.textContent = `Hola, ${user}`;
  userLink.classList.add('header__text', 'user-link');

  // MENÚ COLAPSABLE EN SI
  const dropdownMenu = document.createElement('div');
  dropdownMenu.classList.add('dropdown-menu');
  
  // ITEMS DEL MENÚ
  const menuItems = [
    { text: 'Mi perfil', href: 'my-profile.html' },
    { text: 'Mis favoritos', href: 'favorites.html' },
    { text: 'Mi Carrito', href: 'cart.html'},
    { text: 'Vender', href: 'sell.html' },
    { text: 'Cerrar sesión', href: '#' }
  ];

  menuItems.forEach(item => {
    const menuItem = document.createElement('a');
    menuItem.href = item.href;
    menuItem.textContent = item.text;
    menuItem.classList.add('dropdown-item');
    dropdownMenu.appendChild(menuItem);

    // CERRAR SESIÓN
    if (item.text === 'Cerrar sesión') {
      menuItem.addEventListener('click', logout);
    }
  });

  // SE AÑADE EL MENÚ AL CONTENEDOR
  const nav = document.querySelector('nav');
  const userMenuContainer = document.createElement('div');
  userMenuContainer.classList.add('user-menu-container');
  userMenuContainer.appendChild(userLink);
  userMenuContainer.appendChild(dropdownMenu);
  nav.appendChild(userMenuContainer);

} else {
  window.location.href = "login.html";
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cart-badge');
  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);
  badge.textContent = totalItems > 0 ? totalItems : '';
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});