function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

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
} else if (!user) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function() {
    //RECIBIR NOTICIAS
    const newsletterPrompt = document.getElementById("newsletterPrompt");
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const popupForm = document.getElementById("popupForm");
  
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
  // MOSTRAR CATEGORIAS INICIO
  document.getElementById("autos").addEventListener("click", function() {
    localStorage.setItem("catID", 101);
    window.location.href = "products.html"
});
document.getElementById("juguetes").addEventListener("click", function() {
    localStorage.setItem("catID", 102);
    window.location.href = "products.html"
});
document.getElementById("muebles").addEventListener("click", function() {
    localStorage.setItem("catID", 103);
    window.location.href = "products.html"
});