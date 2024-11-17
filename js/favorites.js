document.addEventListener('DOMContentLoaded', function () {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No hay productos en favoritos.</p>';
        return;
    }

    favorites.forEach(product => {
        // Validar que el producto tenga datos válidos
        if (!product || !product.id) {
            console.warn('Producto inválido encontrado en favoritos.');
            return;
        }

        const productHtml = `
            <div class="favorite-item">
                <img src="${product.images ? product.images[0] : ''}" alt="${product.name || 'Producto'}" class="favorite-item-img">
                <div class="favorite-item-info">
                    <p>${product.name || 'Nombre no disponible'}</p>
                    <p>Precio: ${product.currency || ''} ${product.cost || 'N/A'}</p>
                </div>
                <button class="remove-favorite" data-id="${product.id}">Eliminar</button>
            </div>
        `;
        favoritesContainer.innerHTML += productHtml;
    });

    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites = favorites.filter(item => item.id !== productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            location.reload(); // Actualizar la página para reflejar los cambios
        });
    });
});