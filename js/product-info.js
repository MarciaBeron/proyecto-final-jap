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
            displayProductImages(data.images);  
            displayProductInfo(data);  
            displayRelatedProducts(data.relatedProducts);  
            loadProductComments(productId);  
        })
        .catch(error => console.error('Error al obtener los detalles del producto:', error));

    function displayProductImages(images) {
        const productImagesContainer = document.getElementById('product-images');
        let imagesHtml = '';
        images.forEach(image => {
            imagesHtml += `<img src="${image}" class="product-img" alt="Producto">`;
        });
        productImagesContainer.innerHTML = imagesHtml;
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
            .then(comments => displayProductComments(comments))
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

    const showDescriptionButton = document.getElementById('show-description');
    const showCommentsButton = document.getElementById('show-comments');
    const productInfoContainer = document.getElementById('product-info');
    const productCommentsContainer = document.getElementById('product-comments');

    const lastViewedSection = localStorage.getItem('lastViewedSection');
    if (lastViewedSection === 'description') {
        productInfoContainer.style.display = 'block';
        productCommentsContainer.style.display = 'none';
    } else if (lastViewedSection === 'comments') {
        productInfoContainer.style.display = 'none';
        productCommentsContainer.style.display = 'block';
    }

    showDescriptionButton.addEventListener('click', function() {
        if (productInfoContainer.style.display === 'block') {
            productInfoContainer.style.display = 'none';
            localStorage.removeItem('lastViewedSection');
        } else {
            productInfoContainer.style.display = 'block';
            productCommentsContainer.style.display = 'none';
            localStorage.setItem('lastViewedSection', 'description');
        }
    });

    showCommentsButton.addEventListener('click', function() {
        if (productCommentsContainer.style.display === 'block') {
            productCommentsContainer.style.display = 'none';
            localStorage.removeItem('lastViewedSection');
        } else {
            productCommentsContainer.style.display = 'block';
            productInfoContainer.style.display = 'none';
            localStorage.setItem('lastViewedSection', 'comments');
        }
    });
});
