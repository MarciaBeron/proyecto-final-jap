document.addEventListener('DOMContentLoaded', function() {
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
            let htmlContent = '';
            products.forEach(product => {
                htmlContent += `
                    <div class="product-card">
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

document.getElementById('apply-filters').addEventListener('click', applyFilters);
document.getElementById('sort-options').addEventListener('change', applySort);

function applyFilters() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    console.log('Filtro de precio - Min:', minPrice, 'Max:', maxPrice); // Verifica los valores de filtro

    const filteredProducts = products.filter(product => 
        product.cost >= minPrice &&
        product.cost <= maxPrice
    );

    console.log('Productos filtrados:', filteredProducts); // Verifica los productos filtrados

    renderProducts(filteredProducts);
}

function applySort() {
    const sortOption = document.getElementById('sort-options').value;
    let sortedProducts = [...products];
    if (sortOption === 'price-asc') {
        sortedProducts.sort((a, b) => a.cost - b.cost);
    } else if (sortOption === 'price-desc') {
        sortedProducts.sort((a, b) => b.cost - a.cost);
    } else if (sortOption === 'relevance-desc') {
        sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    }
    renderProducts(sortedProducts);
}

document.getElementById('filter-toggle').addEventListener('click', function() {
var menu = document.getElementById('filter-menu');
if (menu.style.display === 'block') {
  menu.style.display = 'none';
} else {
  menu.style.display = 'block';
}
});
