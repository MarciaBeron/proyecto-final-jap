//logica del carrito
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('chosen-products');
  const totalPriceElement = document.getElementById('final-total');
  const subtotalUYUElement = document.getElementById('subtotal-uyu');
  const subtotalUSDElement = document.getElementById('subtotal-usd');
  const totalProducts = document.getElementById('total-products');

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
    totalPriceElement.textContent = 'Total: 0';
    subtotalUYUElement.textContent = 'Subtotal UYU: 0';
    subtotalUSDElement.textContent = 'Subtotal USD: 0';
    totalProducts.textContent = 'Cantidad de productos: 0';
    return;
  }

  let total = 0;
  let subtotalUYU = 0;
  let subtotalUSD = 0;
  let productsQuantity = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div>
            <h3>${item.name}</h3>
            <p class="price">Precio: ${item.currency} ${(item.price * item.count)}</p>
          <div>  
            <input type="number" class="quantity" value="${item.count}" min="1">
        </div>
        </div>
        <i class="bi bi-trash" style="cursor: pointer;"></i>
    `;
    
    cartContainer.appendChild(itemElement);

    const quantityInput = itemElement.querySelector('.quantity');
    const subtotalElement = itemElement.querySelector('.price');

    const itemTotal = item.price * item.count;
    total += itemTotal;

    if (item.currency === 'UYU') {
      subtotalUYU += itemTotal;
    } else if (item.currency === 'USD') {
      subtotalUSD += itemTotal;
    }

    productsQuantity += item.count;

    quantityInput.addEventListener('input', function() {
      const quantity = parseInt(quantityInput.value) || 0; 
      const newSubtotal = item.price * quantity; 
      subtotalElement.textContent = `Precio: ${item.currency} ${newSubtotal}`;
      item.count = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartBadge();
      updateTotals();
      console.log('cantidad', productsQuantity)
;    });

    const deleteProduct = itemElement.querySelector('.bi');
    deleteProduct.addEventListener('click', function() {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      cartContainer.removeChild(itemElement);
      updateTotals();
      updateCartBadge(); 
    });
  });

  const changeAPI = 'https://api.cambio-uruguay.com';

  async function fetchExchangeRates() {
      try {
          const response = await fetch(changeAPI);
          const data = await response.json();
          const usdRates = data.find(key => key.origin === 'brou' && key.type === '' && key.code === 'USD');

          return {
              uyudollar: usdRates.sell, 
              dollaruuy: usdRates.sell 
          };
      } catch (error) {
          console.error('Error fetching data:', error);
          return null;
      }
  }
  
  async function updateTotals() {
      const exchangeData = await fetchExchangeRates();
      if (!exchangeData) return;
  
      const exchangeRateUYUtoUSD = exchangeData.uyudollar;
      const exchangeRateUSDtoUYU = exchangeData.dollaruuy;
  
      let total = 0;
      let subtotalUYU = 0;
      let subtotalUSD = 0;
      let productsQuantity = 0;
  
      cart.forEach((item, i) => {
          const quantity = parseInt(document.querySelectorAll('.quantity')[i].value) || 0;
          const price = item.price;
  
          const itemTotal = price * quantity;
          total += itemTotal;
  
          if (item.currency === 'UYU') {
              subtotalUYU += itemTotal;
          } else if (item.currency === 'USD') {
              subtotalUSD += itemTotal;
          }
  
          productsQuantity += quantity; 
      });
  
      const totalInUSD = subtotalUYU / exchangeRateUYUtoUSD + subtotalUSD;
      const totalInUYU = subtotalUSD * exchangeRateUSDtoUYU + subtotalUYU;
  
      totalPriceElement.innerHTML = `Total: 
      <select id="currencySelector">
          <option value"currency">Moneda</option>
          <option value="UYU">UYU</option>
          <option value="USD">USD</option>
      </select>`;
  
      subtotalUYUElement.textContent = `Subtotal UYU: ${subtotalUYU.toFixed(2)}`;
      subtotalUSDElement.textContent = `Subtotal USD: ${subtotalUSD.toFixed(2)}`;
      totalProducts.textContent = `Cantidad de productos: ${productsQuantity}`;
  
      function updateTotalDisplay(selectedCurrency) {
        if (selectedCurrency === 'USD') {
            totalPriceElement.innerHTML = `Total: 
            <select id="currencySelector">
                <option value"currency">Moneda</option>
                <option value="UYU">UYU</option>
                <option value="USD" selected>USD</option>
            </select> ${totalInUSD.toFixed(2)}`;
        } else if(selectedCurrency === 'UYU') {
            totalPriceElement.innerHTML = `Total: 
            <select id="currencySelector">
                <option value"currency">Moneda</option>
                <option value="UYU" selected>UYU</option>
                <option value="USD">USD</option>
            </select> ${totalInUYU.toFixed(2)}`;
        } else {
          totalPriceElement.innerHTML = `Total: 
          <select id="currencySelector">
              <option value"currency">Moneda</option>
              <option value="UYU">UYU</option>
              <option value="USD">USD</option>
          </select>`;
        }
    
        document.getElementById('currencySelector').addEventListener('change', function() {
            updateTotalDisplay(this.value);
        });
    }
    
    document.getElementById('currencySelector').addEventListener('change', function() {
        updateTotalDisplay(this.value);
    });
  }

  updateTotals();
  // Redirige a catalogo al clickear "seguir comprando"
  document.getElementById('keep-buying').addEventListener('click', function() {
    window.location.href = 'categories.html'
  })

 // Redirección para el botón "PAGAR"
 document.getElementById('to-pay').addEventListener('click', function() {
  const selectedCurrency = document.getElementById('currencySelector').value;
  
  // Obtener los subtotales originales
  const subtotalUYU = parseFloat(document.getElementById('subtotal-uyu').textContent.replace('Subtotal UYU: ', ''));
  const subtotalUSD = parseFloat(document.getElementById('subtotal-usd').textContent.replace('Subtotal USD: ', ''));
  
  // Obtener el total que se muestra en la página (que ya incluye la conversión)
  const totalElement = document.getElementById('final-total');
  const totalText = totalElement.textContent;
  const totalValue = parseFloat(totalText.split(' ').pop());
  
  if (selectedCurrency === 'UYU') {
    localStorage.setItem('paymentSubtotalUYU', totalValue || 0.00);
    localStorage.setItem('paymentSubtotalUSD', subtotalUSD || 0.00);
  } else {
    localStorage.setItem('paymentSubtotalUYU', subtotalUYU || 0.00);
    localStorage.setItem('paymentSubtotalUSD', totalValue || 0.00);
  }
  
  localStorage.setItem('paymentSelectedCurrency', selectedCurrency);

  // Redirigir a payment
  window.location.href = 'payment.html';
});

});

//logica para guardar el subtotal en el localstorage para redirigir a pagar

async function fetchExchangeRates() {
  try {
    const response = await fetch('https://api.cambio-uruguay.com');
    const data = await response.json();
    const usdRates = data.find(key => key.origin === 'brou' && key.code === 'USD');
    return usdRates ? { usdToUyu: usdRates.sell, uyuToUsd: 1 / usdRates.sell } : null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function updateTotals() {
  const exchangeRates = await fetchExchangeRates();
  if (!exchangeRates) return;

  let totalUSD = subtotalUSD + subtotalUYU * exchangeRates.uyuToUsd;
  let totalUYU = subtotalUYU + subtotalUSD * exchangeRates.usdToUyu;

  // Actualiza los elementos en la UI con los subtotales
  subtotalUYUElement.textContent = `Subtotal UYU: ${subtotalUYU.toFixed(2)}`;
  subtotalUSDElement.textContent = `Subtotal USD: ${subtotalUSD.toFixed(2)}`;
  totalProducts.textContent = `Cantidad de productos: ${productsQuantity}`;

  // Guarda los subtotales en localStorage para usarlos más tarde en payment.html
  localStorage.setItem('subtotalUYU', subtotalUYU.toFixed(2));
  localStorage.setItem('subtotalUSD', subtotalUSD.toFixed(2));

  function displayTotal(currency) {
    totalPriceElement.innerHTML = `Total: 
    <select id="currencySelector">
      <option value="UYU"${currency === 'UYU' ? ' selected' : ''}>UYU</option>
      <option value="USD"${currency === 'USD' ? ' selected' : ''}>USD</option>
    </select> ${currency === 'UYU' ? totalUYU.toFixed(2) : totalUSD.toFixed(2)}`;
    document.getElementById('currencySelector').addEventListener('change', e => displayTotal(e.target.value));
  }

  displayTotal('UYU'); // Muestra el total inicial en UYU
}

cart.forEach((item, index) => {
  // Lógica para manejar los productos en el carrito...

  quantityInput.addEventListener('input', function () {
    item.count = parseInt(quantityInput.value) || 0;
    itemElement.querySelector('.price').textContent = `Precio: ${item.currency} ${item.price * item.count}`;
    localStorage.setItem('cart', JSON.stringify(cart));  // Guardar el carrito después de la actualización
    updateTotals();  // Actualizar totales al cambiar la cantidad
  });

  const deleteProduct = itemElement.querySelector('.bi');
  deleteProduct.addEventListener('click', function () {
    cart.splice(index, 1);  // Eliminar producto
    localStorage.setItem('cart', JSON.stringify(cart));  // Guardar el carrito actualizado
    cartContainer.removeChild(itemElement);  // Eliminar el producto del carrito visualmente
    updateTotals();  // Actualizar totales después de eliminar el producto
  });
});