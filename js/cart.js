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
            <label for="quantity">Cantidad:</label>
            <input type="number" class="quantity" value="${item.count}" min="1">
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
      
      updateTotals();
    });

    const deleteProduct = itemElement.querySelector('.bi');
    deleteProduct.addEventListener('click', function() {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      cartContainer.removeChild(itemElement);
      updateTotals(); 
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
  
  document.getElementById('keep-buying').addEventListener('click', function() {
    window.location.href = 'categories.html'
  })

});
