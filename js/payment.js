// FUNCIÓN PARA JSON DE LOCALIDADES
async function loadLocalities() {
    try {
      const response = await fetch('localities.json');
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

  var fullAddress = address + ' ' + number + ', ' + corner;
  
  updateMap(fullAddress);
});

function updateMap(address) {
  var geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;

  fetch(geocodeURL)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        var lat = data[0].lat;
        var lon = data[0].lon;

        map.setView([lat, lon], 13);

        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker([lat, lon]).addTo(map)
          .bindPopup('<b>Dirección:</b><br>' + address)
          .openPopup();
      } else {
        alert('No se pudo encontrar la dirección');
      }
    })
    .catch(error => {
      console.error('Error al obtener la geolocalización:', error);
    });
}

// FUNCIÓN PARA LOS MODALES
document.addEventListener('DOMContentLoaded', () => {
  // BOTENES PARA ABRIR LOS MODALES
  const btnTransfer = document.getElementById('btnTransfer');
  const btnCreditCard = document.getElementById('btnCreditCard');
  const btnMercadoPago = document.getElementById('btnMercadoPago');

  // SE OBTIENEN LOS MODALES
  const modalTransfer = document.getElementById('modalTransfer');
  const modalCreditCard = document.getElementById('modalCreditCare');
  const modalMercadoPago = document.getElementById('modalMercadoPago');

  // BOTONES DE CIERRE EN LOS MODALES
  const closeButtons = document.querySelectorAll('.close');

  // FUNCIÓN QUE ABRE EL MODAL
  function openModal(modal) {
      modal.style.display = 'block';
  }

  // FUNCIÓN QUE CIERRA EL MODAL
  function closeModal(modal) {
      modal.style.display = 'none';
  }

  // EVENTO QUE ABRE LOS MODALES
  btnTransfer.addEventListener('click', () => openModal(modalTransfer));
  btnCreditCard.addEventListener('click', () => openModal(modalCreditCard));
  // FALTA!: btnMercadoPago.addEventListener('click', () => openModal(modalMercadoPago));

  // EVENTOS QUE CIERRAN LOS MODALES
  closeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modalId = button.getAttribute('data-close');
          const modalToClose = document.getElementById(modalId);
          closeModal(modalToClose);
      });
  });

  // CERRE DEL MODAL AL HACER CLICK FUERA DEL MISMO
  window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
          closeModal(event.target);
      }
  });
});