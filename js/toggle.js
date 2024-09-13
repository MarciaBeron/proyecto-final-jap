document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
  
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  });
  
  // MENU COLAPSABLE DE CATEGORIAS
  const categoriesDropdown = document.getElementById('categoriesDropdown');
  const categories = [
   { id: 101, name: "Autos" },
    { id: 102, name: "Juguetes" },
    { id: 103, name: "Muebles" },
    { id: 104, name: "Herramientas" },
    { id: 105, name: "Computadoras" },
    { id: 106, name: "Vestimenta" },
    { id: 107, name: "Electrodomésticos" },
    { id: 108, name: "Deporte" },
    { id: 109, name: "Celulares" },
  ];

  categories.forEach(category => {
    const categoryLink = document.createElement("a");
    categoryLink.href = "#";
    categoryLink.textContent = category.name;
    categoryLink.className = "dropdown-item";
    categoryLink.addEventListener("click", function() {
      localStorage.setItem("catID", category.id);
      window.location.href = "products.html";
    });
    categoriesDropdown.appendChild(categoryLink);
  });

  //MANEJO DE SESION Y MENU COLAPSABLE DE USUARIO
  const user = localStorage.getItem("user");
  if (user) {
    //nombre usuario
    const userLink = document.createElement('a');
    userLink.href = "#";
    userLink.textContent = `Hola, ${user}`;
    userLink.classList.add('header__text', 'user-link');
    //menu usuario
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.style.display = 'none';
    const menuItems = [
      { text: 'Mi perfil', href: 'my-profile.html' },
      { text: 'Mis favoritos', href: 'favorites.html' },
      { text: 'Vender', href: 'sell.html' },
      { text: 'Cerrar sesión', href: '#' }
    ];
    menuItems.forEach(item => {
      const menuItem = document.createElement('a');
      menuItem.href = item.href;
      menuItem.textContent = item.text;
      menuItem.classList.add('dropdown-item');
      dropdownMenu.appendChild(menuItem);

      if (item.text === 'Cerrar sesión') {
        menuItem.addEventListener('click', logout);
      }
    });
    const nav = document.querySelector('nav');
    const userMenuContainer = document.createElement('div');
    userMenuContainer.classList.add('user-menu-container');
    userMenuContainer.appendChild(userLink);
    userMenuContainer.appendChild(dropdownMenu);
    nav.appendChild(userMenuContainer);

    userLink.addEventListener('click', function(event) {
      event.preventDefault();
      dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function(event) {
      const isClickInsideMenu = userMenuContainer.contains(event.target);
      if (!isClickInsideMenu) {
        dropdownMenu.style.display = 'none';
      }
    });

    const logoutButton = document.getElementById("cerrar");
    logoutButton.style.display = "inline";
  } else if (!user) {
    window.location.href = "login.html";
    logoutButton.style.display = "none";
  }