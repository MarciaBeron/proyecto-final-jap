document.addEventListener('DOMContentLoaded', function () {
    const categoryTitle = document.getElementById('category-title');
    const categoryId = localStorage.getItem('catID');

    switch (categoryId) {
        case '101':
            categoryTitle.textContent = 'Autos';
            break;
        case '102':
            categoryTitle.textContent = 'Juguetes';
            break;
        case '103':
            categoryTitle.textContent = 'Muebles';
            break;
        case '104':
            categoryTitle.textContent = 'Herramientas';
            break;
        case '105':
            categoryTitle.textContent = 'Computadoras';
            break;
        case '106':
            categoryTitle.textContent = 'Vestimenta';
            break;
        case '107':
            categoryTitle.textContent = 'Electrodomésticos';
            break;
        case '108':
            categoryTitle.textContent = 'Deporte';
            break;
        case '109':
            categoryTitle.textContent = 'Celulares';
            break;
        default:
            categoryTitle.textContent = 'Categoría Seleccionada';
    }

    const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            window.products = products;
            renderProducts(products);
        })
        .catch(error => console.error('Error al obtener los productos:', error));

        document.getElementById('apply-filters').addEventListener('click', updateProducts);
        document.getElementById('sort-options').addEventListener('change', updateProducts);
        document.getElementById('productSearch').addEventListener('input', updateProducts);
        
        function updateProducts() {
            const searchText = document.getElementById('productSearch').value.toLowerCase();
            const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
            const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
            const sortOption = document.getElementById('sort-options').value;
        
            // filtramos basandonos en precio o texto
            let filteredProducts = window.products.filter(product =>
                (product.name.toLowerCase().includes(searchText) ||
                 product.description.toLowerCase().includes(searchText)) &&
                product.cost >= minPrice &&
                product.cost <= maxPrice
            );
        
            // ordenamos los productos filtrados
            if (sortOption === 'price-asc') {
                filteredProducts.sort((a, b) => a.cost - b.cost);
            } else if (sortOption === 'price-desc') {
                filteredProducts.sort((a, b) => b.cost - a.cost);
            } else if (sortOption === 'relevance-desc') {
                filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
            }
        
            // mostramos productos filtrados
            renderProducts(filteredProducts);
        }

    document.getElementById('filter-toggle').addEventListener('click', function () {
        var menu = document.getElementById('filter-menu');
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    function renderProducts(products) {
        let htmlContent = '';
        products.forEach(product => {
            htmlContent += `
                <div class="product-card" onclick="selectProduct(${product.id})">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-price">${product.currency} ${product.cost}</p>
                            <p class="card-text">Vendidos: ${product.soldCount}</p>
                            <p class="card-description">${product.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('products-container').innerHTML = htmlContent;
    }
});

function selectProduct(productId) {
    localStorage.setItem('selectedProductID', productId);
    window.location.href = 'product-info.html';
}

function logout() {
    localStorage.removeItem("user");
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