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

    const showDescriptionButton = document.getElementById('show-description');
    const showCommentsButton = document.getElementById('show-comments');
    const productInfoContainer = document.getElementById('product-info');
    const productCommentsContainer = document.getElementById('product-comments');

    const lastViewedSection = localStorage.getItem('lastViewedSection');
    if (lastViewedSection === 'description') {
        productInfoContainer.style.display = 'block';
        productCommentsContainer.style.display = 'none';
        showDescriptionButton.classList.add('active');
        showCommentsButton.classList.remove('active');
    } else if (lastViewedSection === 'comments') {
        productInfoContainer.style.display = 'none';
        productCommentsContainer.style.display = 'block';
        showCommentsButton.classList.add('active');
        showDescriptionButton.classList.remove('active');
    }

    showDescriptionButton.addEventListener('click', function() {
        productInfoContainer.style.display = 'block';
        productCommentsContainer.style.display = 'none';
        localStorage.setItem('lastViewedSection', 'description');
        showDescriptionButton.classList.add('active');
        showCommentsButton.classList.remove('active');
    });

    showCommentsButton.addEventListener('click', function() {
        productInfoContainer.style.display = 'none';
        productCommentsContainer.style.display = 'block';
        localStorage.setItem('lastViewedSection', 'comments');
        showCommentsButton.classList.add('active');
        showDescriptionButton.classList.remove('active');
    });
});
