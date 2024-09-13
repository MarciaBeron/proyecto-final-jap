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