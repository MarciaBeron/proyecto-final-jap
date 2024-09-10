document.addEventListener('DOMContentLoaded', function() {
    const productId = localStorage.getItem('selectedProductID'); // Get the selected product ID from local storage

    if (!productId) {
        console.error('No product ID found in local storage.');
        return;
    }

    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProductInfo(data);
            loadProductComments(productId);
        })
        .catch(error => console.error('Error al obtener los detalles del producto:', error));

    function displayProductInfo(product) {
        const productInfoContainer = document.getElementById('product-info');
        const productTitle = document.getElementById('product-title');
        
        productTitle.textContent = product.name;

        let htmlContent = `
            <div class="product-detail">
                <img src="${product.images[0]}" class="product-img" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Precio: ${product.currency} ${product.cost}</p>
                <p>Vendidos: ${product.soldCount}</p>
            </div>
            <div class="related-products">
                <h3>Productos Relacionados</h3>
                <div class="related-products-container">
        `;

        product.relatedProducts.forEach(related => {
            htmlContent += `
                <div class="related-product-card">
                    <img src="${related.image}" class="related-product-img" alt="${related.name}">
                    <p>${related.name}</p>
                </div>
            `;
        });

        htmlContent += `</div></div>`;
        productInfoContainer.innerHTML = htmlContent;
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
});