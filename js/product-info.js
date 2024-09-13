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
                updateCommentsButton(comments.length);
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
        document.removeEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickOutside);
    });

    showCommentsButton.addEventListener('click', function() {
        productInfoContainer.style.display = 'none';
        productCommentsContainer.style.display = 'block';
        showCommentsButton.classList.add('active');
        showDescriptionButton.classList.remove('active');
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
