// Función para cargar los productos favoritos desde el localStorage
function loadFavorites() {
    // Obtener los IDs de productos favoritos desde localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Contenedor donde se mostrarán los productos favoritos
    const favoritesContainer = document.getElementById('favorites-container');

    // Verificar si hay productos favoritos
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No tienes productos favoritos aún.</p>";
        return;
    }

    // Recorrer cada ID de producto favorito y crear un elemento para mostrarlo
    favorites.forEach(productId => {
        // Crear un contenedor para cada producto
        let productElement = document.createElement('div');
        productElement.className = 'favorite-product';

        // Aquí puedes agregar contenido dinámico para cada producto favorito
        // Esto es solo un ejemplo simple. Puedes mejorarlo según el diseño de tu página.
        productElement.innerHTML = `
            <h3>Producto ID: ${productId}</h3>
            <p>Detalles del producto con ID: ${productId}</p>
            <button onclick="removeFavorite('${productId}')">Eliminar de Favoritos</button>
        `;

        // Agregar el producto al contenedor de favoritos
        favoritesContainer.appendChild(productElement);
    });
}

// Función para eliminar un producto de la lista de favoritos
function removeFavorite(productId) {
    // Obtener la lista actual de favoritos
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filtrar la lista para eliminar el producto seleccionado
    favorites = favorites.filter(id => id !== productId);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Recargar la lista de favoritos en la página
    loadFavorites();
}

// Cargar los favoritos cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadFavorites);