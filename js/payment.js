// FUNCIÓN CHECKBOXES
const subtotalCartCurrency = localStorage.getItem('paymentSelectedCurrency');
const totalInUSD = parseFloat(localStorage.getItem('paymentSubtotalUSD'));
const totalInUYU = parseFloat(localStorage.getItem('paymentSubtotalUYU'));
if (subtotalCartCurrency === 'USD'){
  localStorage.setItem('finalTotal', totalInUSD);
} else if (subtotalCartCurrency === 'UYU'){
  localStorage.setItem('finalTotal', totalInUYU);
}

const subtotalCartValue = parseFloat(localStorage.getItem('finalTotal'));
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const premium = document.getElementById('premium');
    const express = document.getElementById('express');
    const standard = document.getElementById('standard');
    let shippingPercentage = 0.00;
    document.querySelectorAll('.material-icons').forEach(icon => {
      icon.textContent = 'check_box_outline_blank';
    });
    const selectedIcon = document.getElementById(radio.value + '-icon');
    selectedIcon.textContent = 'check_box';

    if (premium.checked) {
      shippingPercentage = 0.15;
    } else if (express.checked) {
      shippingPercentage = 0.07;
    } else if (standard.checked){
      shippingPercentage = 0.05;
    }
    const shippingPrice = subtotalCartValue * shippingPercentage;
    const totalWithShipping = subtotalCartValue + shippingPrice;
    document.getElementById('shipping-price').innerHTML = `Envío ${subtotalCartCurrency} ${shippingPrice.toFixed(2)}`;
    document.getElementById('total-to-pay').innerHTML = `Total ${subtotalCartCurrency} ${totalWithShipping.toFixed(2)} `
  });
});

// FUNCIÓN PARA JSON DE LOCALIDADES
async function loadLocalities() {
    try {
      const response = await fetch(LOCALITIES);
      const data = await response.json();
  
      populateDepartments(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  
  function populateDepartments(data) {
    const departmentSelect = document.getElementById('department');
  
    data.forEach(department => {
      const option = document.createElement('option');
      option.value = department.id;
      option.textContent = department.name;
      departmentSelect.appendChild(option);
    });
  
    departmentSelect.addEventListener('change', (event) => {
      populateLocalities(event.target.value, data);
    });
  }
  
  function populateLocalities(departmentId, data) {
    const localitySelect = document.getElementById('locality');
    localitySelect.innerHTML = '<option value="">Seleccione una localidad</option>';
    localitySelect.disabled = true;
  
    if (!departmentId) return;
  
    const selectedDepartment = data.find(dept => dept.id === parseInt(departmentId));
  
    if (selectedDepartment && selectedDepartment.towns) {
      selectedDepartment.towns.forEach(town => {
        const option = document.createElement('option');
        option.value = town.id;
        option.textContent = town.name;
        localitySelect.appendChild(option);
      });
  
      localitySelect.disabled = false;
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadLocalities);

// FUNCIÓN PARA EL MAPA
var map;
var marker;

function initMap() {
  // COORDENADA POR DEFECTO: MONTEVIDEO
  var lat = -34.9011;
  var lon = -56.1645;

  if (!map) {
    map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    marker = L.marker([lat, lon]).addTo(map)
      .bindPopup('<b>Ubicación Predeterminada:</b><br>Montevideo')
      .openPopup();
  } else {
    map.setView([lat, lon], 13);
  }
}

initMap();

document.getElementById('save-address').addEventListener('click', function() {
  var address = document.getElementById('user-address').value;
  var number = document.getElementById('number').value;
  var corner = document.getElementById('corner').value;

  var fullAddress = address + ' ' + number;

  console.log('Dirección completa a buscar:', fullAddress);

  updateMap(fullAddress).then((mainAddressData) => {
    if (mainAddressData) {
      map.setView([mainAddressData.lat, mainAddressData.lon], 13);

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([mainAddressData.lat, mainAddressData.lon]).addTo(map)
        .bindPopup('<b>Dirección:</b><br>' + fullAddress)
        .openPopup();
    } else {
      alert('No se pudo encontrar la dirección principal, por favor verifica el formato.');
    }

    if (corner) {
      var cornerAddress = corner;
      console.log('Buscando la esquina:', cornerAddress);
      updateMap(cornerAddress).then((cornerAddressData) => {
        if (!cornerAddressData) {
          alert('No se pudo encontrar la esquina.');
        }
      });
    }
  });
});

function updateMap(address) {
  var geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;

  return fetch(geocodeURL)
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta de la API:', data);

      if (data && data.length > 0) {
        return {
          lat: data[0].lat,
          lon: data[0].lon
        };
      } else {
        return null;
      }
    })
    .catch(error => {
      console.error('Error al obtener la geolocalización:', error);
      return null;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  //TRAER SUBTOTALES DESDE EL CART
  const subtotalCartToShow = document.getElementById('subtotal-to-pay');
  subtotalCartToShow.innerHTML = `Subtotal Carrito ${subtotalCartCurrency} ${subtotalCartValue}`;
  shippingCost();
})

// MODALES
document.addEventListener('DOMContentLoaded', () => {
  // BOTONES PARA ABRIR LOS MODALES
  const btnTransfer = document.getElementById('btnTransfer');
  const btnCreditCard = document.getElementById('btnCreditCard');
  const btnMercadoPago = document.getElementById('btnMercadoPago');
  const btnCompletePurchase = document.getElementById('btnCompletePurchase');

  // SE OBTIENEN LOS MODALES
  const modalTransfer = document.getElementById('modalTransfer');
  const modalCreditCard = document.getElementById('modalCreditCard');
  const modalMercadoPago = document.getElementById('modalMercadoPago');
  const modalCompletePurchase = document.getElementById('modalCompletePurchase');
  const modalConfirmationCreditCard = document.getElementById('modalConfirmationCreditCard');

  // BOTONES DE CIERRE EN LOS MODALES
  const closeButtons = document.querySelectorAll('.close');

  // FUNCIÓN QUE ABRE EL MODAL
  function openModal(modal) {
    modal.style.display = 'block';
    if (modal.id === 'modalCompletePurchase') {
      // CONFETTI AL FINALIZAR COMPRA
      confetti({ particleCount: 300, spread: 100, origin: { x: 0.5, y: 0.5 } });
      confetti({ particleCount: 300, spread: 120, origin: { x: 0.2, y: 0.6 } });
      confetti({ particleCount: 300, spread: 120, origin: { x: 0.8, y: 0.6 } });
    }
  }

  // FUNCIÓN QUE CIERRA EL MODAL
  function closeModal(modal) {
    modal.style.display = 'none';
  }

  // EVENTOS QUE ABREN LOS MODALES DE FORMA DE PAGO
  btnTransfer?.addEventListener('click', () => openModal(modalTransfer));
  btnCreditCard?.addEventListener('click', () => openModal(modalCreditCard));
  btnMercadoPago?.addEventListener('click', () => openModal(modalMercadoPago));

  // EVENTOS QUE CIERRAN LOS MODALES
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-close');
      const modalToClose = document.getElementById(modalId);
      closeModal(modalToClose);
    });
  });

  // CIERRE DEL MODAL AL HACER CLICK FUERA DEL MISMO
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  });

  // VALIDACIÓN DE TARJETA DE CRÉDITO
  const submitBtn = document.querySelector('#modalCreditCard button[type="submit"]');
  submitBtn?.addEventListener('click', (event) => {
    event.preventDefault();

    const cardNumber = document.getElementById('CardNumber').value;
    if (cardNumber.length !== 16) {
      alert('La tarjeta debe tener 16 dígitos.');
      return;
    }

    const expirationDate = new Date(document.getElementById('expiration-date').value);
    const today = new Date();
    if (expirationDate < today) {
      alert('La tarjeta está vencida. Ingrese otra.');
      return;
    }

    const cvvCode = document.getElementById('cvv-code').value;
    if (cvvCode.length !== 3) {
      alert('El CVV debe ser de 3 dígitos.');
      return;
    }

    openModal(modalConfirmationCreditCard);
    closeModal(modalCreditCard);
  });

  // SELECCIÓN DE BOTONES DE FORMA DE PAGO
  const paymentButtons = [btnTransfer, btnCreditCard, btnMercadoPago];
  paymentButtons.forEach(button => {
    button.addEventListener('click', function() {
      paymentButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  // VALIDACIÓN FINALIZAR COMPRA
  btnCompletePurchase?.addEventListener('click', function () {
    const address = document.getElementById('user-address').value.trim();
    const number = document.getElementById('number').value.trim();
    const corner = document.getElementById('corner').value.trim();
    const department = document.getElementById('department').value;
    const locality = document.getElementById('locality').value;

    if (!address || !number || !corner || !department || !locality) {
      alert('Debe completar todos los campos de la dirección.');
      return;
    }

    const shipmentSelected = document.querySelector('input[name="shipment"]:checked');
    if (!shipmentSelected) {
      alert('Debe seleccionar una forma de envío.');
      return;
    }

    if (subtotalCartValue <= 0) {
      alert('El carrito está vacío. Debe agregar productos para continuar.');
      return;
    }

    let paymentMethod = '';
    if (btnTransfer.classList.contains('selected')) {
      paymentMethod = 'Transferencia Bancaria';
    } else if (btnCreditCard.classList.contains('selected')) {
      paymentMethod = 'Tarjeta de Crédito';
    } else if (btnMercadoPago.classList.contains('selected')) {
      paymentMethod = 'MercadoPago';
    } else {
      alert('Debe seleccionar una forma de pago.');
      return;
    }

    if (paymentMethod === 'Tarjeta de Crédito') {
      const cardNumber = document.getElementById('CardNumber').value.trim();
      const cardName = document.getElementById('card-name').value.trim();
      const expirationDate = document.getElementById('expiration-date').value;
      const cvvCode = document.getElementById('cvv-code').value.trim();

      if (!cardNumber || !cardName || !expirationDate || !cvvCode) {
        alert('Debe completar todos los campos de la tarjeta de crédito.');
        return;
      }
    }
    
    openModal(modalCompletePurchase);
  });
});