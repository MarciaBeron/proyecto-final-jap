const productForm = document.getElementById('product-form');
let comments = [];
function displayForm() {
    let htmlContent = `
        <div class="product-form">
            <form id="comment-form">
                <label for="write-comment">Deja tu comentario</label><br>
                <textarea id="write-comment" required></textarea><br>
                <label for="select-score">Califica el producto</label><br>
                <select name="select-score" id="select-score">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit">Enviar</button>
            </form>
        </div>
    `;
    productForm.innerHTML = htmlContent;
    productForm.style.display = 'block';

    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function(event) {

        const commentText = document.getElementById('write-comment').value;
        const scoreValue = document.getElementById('select-score').value;
        const username = localStorage.getItem('user') || "Usuario Anónimo";
        // Create a comment object
        const newComment = {
            description: commentText,
            score: scoreValue,
            user: username, // You can replace this with actual user info if available
            dateTime: new Date().toLocaleString() // Format the date/time as needed
        };
        // Get the current product ID
        const productId = localStorage.getItem('selectedProductID');
        // Save comment to localStorage
        const storedComments = localStorage.getItem(`productComments_${productId}`);
        const localComments = storedComments ? JSON.parse(storedComments) : [];
        localComments.push(newComment);
        localStorage.setItem(`productComments_${productId}`, JSON.stringify(localComments));

        // Display the new comment immediately
        displayProductComments([...localComments, ...comments]);

        // Clear the form
        commentForm.reset();
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const productId = localStorage.getItem('selectedProductID');

    if (!productId) {
        console.error('No product ID found in local storage.');
        return;
    }

    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updatePageTitle(data.name);
            displayProductImages(data.images);
            displayProductInfo(data);
            displayRelatedProducts(data.relatedProducts);
            loadProductComments(productId);
        })
        .catch(error => console.error('Error al obtener los detalles del producto:', error));

    function updatePageTitle(productName) {
        const titleElement = document.getElementById('product-title');
        titleElement.textContent = productName;
    }

    function displayProductImages(images) {
        const mainImageContainer = document.getElementById('main-image-container');
        const thumbnailsContainer = document.getElementById('thumbnails-container');
        const mainImage = document.getElementById('main-image');
        const prevButton = document.getElementById('prev-image');
        const nextButton = document.getElementById('next-image');

        let currentImageIndex = 0;

        if (images.length > 0) {
            mainImage.src = images[0];
        }

        let thumbnailsHtml = '';
        images.forEach((image, index) => {
            thumbnailsHtml += `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-src="${image}">
                    <img src="${image}" alt="Miniatura ${index + 1}">
                </div>
            `;
        });
        thumbnailsContainer.innerHTML = thumbnailsHtml;

        function updateMainImage(index) {
            mainImage.src = images[index];
            document.querySelectorAll('.thumbnail').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
        }

        prevButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateMainImage(currentImageIndex);
        });

        nextButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateMainImage(currentImageIndex);
        });

        thumbnailsContainer.addEventListener('click', function(e) {
            const target = e.target.closest('.thumbnail');
            if (target) {
                currentImageIndex = images.indexOf(target.getAttribute('data-src'));
                updateMainImage(currentImageIndex);
            }
        });

        let zoomedIn = false;

        mainImage.addEventListener('click', function() {
            zoomedIn = !zoomedIn;
            mainImage.classList.toggle('zoomed', zoomedIn);
        });

        mainImageContainer.addEventListener('mousemove', function(e) {
            if (!zoomedIn) return;
            const rect = mainImageContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            mainImage.style.transformOrigin = `${x}% ${y}%`;
        });
    }

    function displayProductInfo(product) {
        const productInfoContainer = document.getElementById('product-info');
        const productForm = document.getElementById('product-form');
        let htmlContent = `
            <div class="product-detail">
                <h2>${product.name}</h2>
                <p>Categoría: ${product.category}</p>
                <p>${product.description}</p>
                <p>Precio: ${product.currency} ${product.cost}</p>
                <p>Vendidos: ${product.soldCount}</p>
            </div>
        `;
        productInfoContainer.innerHTML = htmlContent;
    }

    function displayRelatedProducts(relatedProducts) {
        const relatedProductsContainer = document.getElementById('related-products');
        let htmlContent = `<h3>Productos Relacionados</h3><div class="related-products-container">`;
    
        relatedProducts.forEach(related => {
            htmlContent += `
                <div class="related-product-card" data-product-id="${related.id}">
                    <img src="${related.image}" class="related-product-img" alt="${related.name}">
                    <p>${related.name}</p>
                </div>
            `;
        });
    
        htmlContent += `</div>`;
        relatedProductsContainer.innerHTML = htmlContent;
    
        document.querySelectorAll('.related-product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                localStorage.setItem('selectedProductID', productId);
                window.location.href = 'product-info.html';
            });
        });
    }

    function loadProductComments(productId) {
        const url = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
        fetch(url)
        .then(response => response.json())
        .then(apiComments => {
            // Load existing comments from localStorage
            const storedComments = localStorage.getItem(`productComments_${productId}`);
            const localComments = storedComments ? JSON.parse(storedComments) : [];

            // Combine API comments with local comments
            comments = [...apiComments, ...localComments];

            // Display all comments
            displayProductComments(comments);
            updateCommentsButton(comments.length);
        })
        .catch(error => console.error('Error al obtener los comentarios del producto:', error));
    }

    function displayProductComments(comments) {
        const commentsContainer = document.getElementById('product-comments');
        let htmlContent = '<h3>Comentarios</h3>';
    
        comments.forEach(comment => {
            const stars = showStars(comment.score);
    
            htmlContent += `
                <div class="comment">
                    <p><strong>${comment.user}</strong> (${comment.dateTime}):</p>
                    <p>Rating: ${stars}</p>
                    <p>${comment.description}</p> 
                </div>
            `;
        });
    
        commentsContainer.innerHTML = htmlContent;
    }

    function showStars(amount) {
        let stars = '';
        for (let i = 0; i < 5; i++) { 
            if (i < amount) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }
        return stars;
    }

    function updateCommentsButton(count) {
        const commentsButton = document.getElementById('show-comments');
        commentsButton.innerHTML = `Comentarios (${count})`;
    }

    const showDescriptionButton = document.getElementById('show-description');
    const showCommentsButton = document.getElementById('show-comments');
    const productInfoContainer = document.getElementById('product-info');
    const productCommentsContainer = document.getElementById('product-comments');

    productInfoContainer.style.display = 'none';
    productCommentsContainer.style.display = 'none';

    showDescriptionButton.addEventListener('click', function() {
        productInfoContainer.style.display = 'block';
        productCommentsContainer.style.display = 'none';
        showDescriptionButton.classList.add('active');
        showCommentsButton.classList.remove('active');
        productForm.style.display = 'none';
        document.removeEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickOutside);
    });

    showCommentsButton.addEventListener('click', function() {
        productInfoContainer.style.display = 'none';
        productCommentsContainer.style.display = 'block';
        showCommentsButton.classList.add('active');
        showDescriptionButton.classList.remove('active');
        productForm.style.display = 'none';
        document.removeEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickOutside);
    });

    function handleClickOutside(event) {
        if (!productInfoContainer.contains(event.target) && !showDescriptionButton.contains(event.target)) {
            productInfoContainer.style.display = 'none';
            showDescriptionButton.classList.remove('active');
        }
        if (!productCommentsContainer.contains(event.target) && !showCommentsButton.contains(event.target)) {
            productCommentsContainer.style.display = 'none';
            showCommentsButton.classList.remove('active');
        }
    }
});

function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoriteIcon(productId);
}

function updateFavoriteIcon(productId) {
    const favoriteIcon = document.getElementById('favorite-icon');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(productId)) {
        favoriteIcon.classList.remove('bi-heart');
        favoriteIcon.classList.add('bi-heart-fill');
    } else {
        favoriteIcon.classList.remove('bi-heart-fill');
        favoriteIcon.classList.add('bi-heart');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let productId = 'id-del-producto';
    updateFavoriteIcon(productId);
});

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


  // Función para agregar al carrito sin redirección
async function addToCart(event) {
    event.preventDefault(); // Previene cualquier comportamiento por defecto

    try {
        // Obtener el ID del producto de la URL
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        
        // Obtener el producto actual del localStorage o de donde esté almacenado
        const currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
        
        if (!currentProduct) {
            throw new Error('Producto no encontrado');
        }

        // Obtener el carrito actual del localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === currentProduct.id);
        
        if (existingProductIndex >= 0) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            cart[existingProductIndex].count = (cart[existingProductIndex].count || 1) + 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con count = 1
            cart.push({
                ...currentProduct,
                count: 1
            });
        }
        
        // Guardar el carrito actualizado
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Mostrar mensaje de éxito
        showSuccessMessage('Producto agregado al carrito');
        
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        showErrorMessage('Error al agregar al carrito');
    }
}

// Función para comprar ahora (redirección al carrito)
function buyNow() {
    // Primero agregamos al carrito
    addToCart(new Event('click')).then(() => {
        // Luego redirigimos a la página del carrito
        window.location.href = 'cart.html';
    });
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(message) {
    // Crear el elemento del mensaje
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--Matcha);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
    `;

    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    // Agregar el mensaje al DOM
    document.body.appendChild(messageDiv);

    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        messageDiv.remove();
        style.remove();
    }, 3000);
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    // Similar a showSuccessMessage pero con estilo diferente
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff4444;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
    `;

    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}