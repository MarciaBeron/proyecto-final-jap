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

  //logica del carrito
  document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('chosen-products');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <h3>${item.name}</h3>
                <p class="price">Precio: ${item.currency} ${(item.price * item.count)}</p>
                <label for="quantity">Cantidad:</label>
                <input type="number" class="quantity" value="${item.count}" min="1">
            </div>
            <i class="bi bi-trash" style="cursor: pointer;"></i>
        `;
        
        cartContainer.appendChild(itemElement);
        
        const quantityInput = itemElement.querySelector('.quantity');
        const itemPrice = item.price; 
        const subtotalElement = itemElement.querySelector('.price'); 

        quantityInput.addEventListener('input', function() {
            const quantity = parseInt(quantityInput.value) || 0; 
            const subtotal = itemPrice * quantity; 
            subtotalElement.textContent = `Precio: ${item.currency} ${subtotal}`;
        });

        const deleteProduct = itemElement.querySelector('.bi');
        deleteProduct.addEventListener('click', function() {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartContainer.removeChild(itemElement);
            location.reload();
        });
    }); 
});
