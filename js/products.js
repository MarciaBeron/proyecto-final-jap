document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            let htmlContent = '';

            products.forEach(product => {
                htmlContent += `
                    <div class="col-lg-3 col-md-6 col-sm-12">
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
        })
        .catch(error => console.error('Error al obtener los productos:', error));
});