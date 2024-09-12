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
            updatePageTitle(data.name);  // Actualiza el título de la página
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

        // Mostrar la primera imagen como imagen principal
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

        // Funcionalidad de Zoom
        let zoomedIn = false; // Estado para controlar si el zoom está activado o no

        mainImage.addEventListener('click', function() {
            zoomedIn = !zoomedIn; // Cambia el estado de zoom al hacer clic
            mainImage.classList.toggle('zoomed', zoomedIn); // Agrega o quita la clase 'zoomed'
        });

        mainImageContainer.addEventListener('mousemove', function(e) {
            if (!zoomedIn) return; // Si no está activado el zoom, no hace nada
            const rect = mainImageContainer.getBoundingClientRect(); // Obtiene la posición del contenedor
            const x = ((e.clientX - rect.left) / rect.width) * 100; // Calcula la posición x del cursor
            const y = ((e.clientY - rect.top) / rect.height) * 100; // Calcula la posición y del cursor
            mainImage.style.transformOrigin = `${x}% ${y}%`; // Establece el origen del zoom
        });
    }

    function displayProductInfo(product) {
        const productInfoContainer = document.getElementById('product-info');
        let htmlContent = `
            <div class="product-detail">
                <h2>${product.name}</h2>
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
                <div class="related-product-card">
                    <img src="${related.image}" class="related-product-img" alt="${related.name}">
                    <p>${related.name}</p>
                </div>
            `;
        });

        htmlContent += `</div>`;
        relatedProductsContainer.innerHTML = htmlContent;
    }

    function loadProductComments(productId) {
        const url = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
        fetch(url)
            .then(response => response.json())
            .then(comments => {
                displayProductComments(comments);
                updateCommentsButton(comments.length);  // Actualiza el texto del botón
            })
            .catch(error => console.error('Error al obtener los comentarios del producto:', error));
    }

    function displayProductComments(comments) {
        const commentsContainer = document.getElementById('product-comments');
        let htmlContent = '<h3>Comentarios</h3>';

        comments.forEach(comment => {
            htmlContent += `
                <div class="comment">
                    <p><strong>${comment.user}</strong> (${comment.dateTime}):</p>
                    <p>Rating: ${comment.score} estrellas</p>
                    <p>${comment.description}</p>
                </div>
            `;
        });

        commentsContainer.innerHTML = htmlContent;
    }

    function updateCommentsButton(count) {
        const commentsButton = document.getElementById('show-comments');
        commentsButton.innerHTML = `Comentarios (${count})`;  // Actualiza el texto del botón
    }

    // Variables para manejar la visibilidad de las secciones
    const showDescriptionButton = document.getElementById('show-description');
    const showCommentsButton = document.getElementById('show-comments');
    const productInfoContainer = document.getElementById('product-info');
    const productCommentsContainer = document.getElementById('product-comments');

    // Configuración inicial para que las secciones estén cerradas
    productInfoContainer.style.display = 'none';
    productCommentsContainer.style.display = 'none';

    // Manejo de clic en el botón de descripción
    showDescriptionButton.addEventListener('click', function() {
        // Mostrar descripción y ocultar comentarios
        productInfoContainer.style.display = 'block';
        productCommentsContainer.style.display = 'none';
        showDescriptionButton.classList.add('active');
        showCommentsButton.classList.remove('active');
        // Agregar listener para clic fuera
        document.removeEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickOutside);
    });

    // Manejo de clic en el botón de comentarios
    showCommentsButton.addEventListener('click', function() {
        // Mostrar comentarios y ocultar descripción
        productInfoContainer.style.display = 'none';
        productCommentsContainer.style.display = 'block';
        showCommentsButton.classList.add('active');
        showDescriptionButton.classList.remove('active');
        // Agregar listener para clic fuera
        document.removeEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickOutside);
    });

    // Función para manejar clic fuera de las secciones
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
    // Obtener los favoritos existentes de localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Verificar si el producto ya está en la lista de favoritos
    if (favorites.includes(productId)) {
        // Si ya está, removerlo de la lista
        favorites = favorites.filter(id => id !== productId);
    } else {
        // Si no está, agregarlo a la lista
        favorites.push(productId);
    }

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Cambiar el estilo del corazón al estado de favorito
    updateFavoriteIcon(productId);
}

// Actualiza el estado visual del icono de favorito
function updateFavoriteIcon(productId) {
    const favoriteIcon = document.getElementById('favorite-icon');

    // Obtener los favoritos actuales
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Cambiar la clase del ícono dependiendo de si es favorito o no
    if (favorites.includes(productId)) {
        favoriteIcon.classList.remove('bi-heart'); // Elimina el ícono de corazón vacío
        favoriteIcon.classList.add('bi-heart-fill'); // Agrega el ícono de corazón lleno
    } else {
        favoriteIcon.classList.remove('bi-heart-fill'); // Elimina el ícono de corazón lleno
        favoriteIcon.classList.add('bi-heart'); // Agrega el ícono de corazón vacío
    }
}

// Al cargar la página, actualizamos el icono de favoritos
document.addEventListener('DOMContentLoaded', () => {
    let productId = 'id-del-producto'; // Reemplaza con la forma en que obtienes el ID del producto actual
    updateFavoriteIcon(productId);
});
