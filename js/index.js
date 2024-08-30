// Inicio Menú Desplegable
document.addEventListener("DOMContentLoaded", function() {
    function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }

  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "login.html";
  }

  const nav = document.querySelector('nav');
  const userEmail = localStorage.getItem("user");

  if (userEmail) {
    const userLink = document.createElement('a');
    userLink.href = "#";
    userLink.textContent = `Hola, ${userEmail}`;
    userLink.classList.add('header__text', 'user-link');

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
  }
});
// Fin Menú Desplegable

// Inicio Categorías
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "login.html";
    }
    var logoutButton = document.getElementById("cerrar");
      if (!localStorage.getItem("user")) {
        logoutButton.style.display = "none";
      } else {
        logoutButton.style.display = "inline";
      }
});
// Fin Categorías

// Inicio Prompt Newsletter
document.addEventListener("DOMContentLoaded", function(){
  var newsletterPrompt = document.getElementById("newsletterPrompt");
  var yesButton = document.getElementById("yes");
  var noButton = document.getElementById("no");
  var popupForm = document.getElementById("popupForm");

  if (!sessionStorage.getItem("newsletterDecision")) {
      setTimeout(function(){
          newsletterPrompt.classList.remove("hidden");
          newsletterPrompt.classList.add("show");
      }, 100);
  }

  yesButton.addEventListener("click", function() {
      console.log("El usuario quiere recibir novedades.");
      sessionStorage.setItem("newsletterDecision", "yes");
      newsletterPrompt.classList.add("hidden");
      popupForm.classList.remove("hidden");
  });

  noButton.addEventListener("click", function() {
      console.log("El usuario no quiere recibir novedades.");
      sessionStorage.setItem("newsletterDecision", "no");
      newsletterPrompt.classList.add("hidden");
  });

  popupForm.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log("Formulario enviado");
      popupForm.classList.add("hidden");
  });
});
// Fin Prompt Newsletter