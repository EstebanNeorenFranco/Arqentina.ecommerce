// Importa las bibliotecas de Leaflet
const L = window.L;

// Crea un mapa en el contenedor "map" con coordenadas iniciales y zoom
const map = L.map('map').setView([-34.6118, -58.4173], 4);

// Crea un ícono personalizado con tu imagen
const customIcon = L.icon({
  iconUrl: './assets/homepage_images/Icono location.png',
  iconSize: [20, 20], // ajusta el tamaño según sea necesario
  iconAnchor: [15, 30], // punto de anclaje del ícono
  popupAnchor: [0, -30] // posición del popup en relación con el ícono
});

// Agrega una capa de mapa de OpenStreetMap (puedes cambiarlo por otras capas)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable para almacenar la ventana emergente personalizada
let customPopup = L.popup();

// Obtén el elemento select de provincia
const provinciaSelector = document.getElementById('provinciaSelector');

// Cargar el archivo JSON
fetch('gallery_data.json')
  .then(response => response.json())
  .then(data => {
    // Función para cargar los marcadores según la provincia seleccionada
    function cargarMarcadores() {
      // Elimina todos los marcadores del mapa
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Iterar a través de las ubicaciones en el archivo JSON
      data.forEach(location => {
        const { lat, lng, imageSrc, imageName, url, provincia, id, name_es } = location;

        // Crea un marcador solo si la provincia coincide con la seleccionada o es "Todas las provincias"
        if (provincia === provinciaSelector.value || provinciaSelector.value === 'all') {
          // Crea un contenedor personalizado para el contenido del marcador
          const markerContent = document.createElement('div');

          // Determina el nombre a mostrar, utilizando name:es si está disponible
          const nombre = name_es || imageName;

          // Agrega la imagen y el nombre al contenedor personalizado
          markerContent.innerHTML = `<img src="${imageSrc}" alt="${nombre}" width="150"><br>${nombre}`;

          // Crea un marcador con las coordenadas y el ícono personalizado
          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

          // Agrega una función para redireccionar a la página de detalles al hacer clic en el contenedor personalizado
          markerContent.addEventListener('click', function() {
            // Redirecciona a la página de detalles con el ID del elemento
            window.location.href = 'detalle.html?id=' + id;
          });

          // Asigna el contenido personalizado al marcador
          marker.bindPopup(markerContent);
        }
      });
    }

    // Cargar los marcadores inicialmente
    cargarMarcadores();

    // Agrega un evento de cambio al selector de provincia para volver a cargar los marcadores al cambiar la selección
    provinciaSelector.addEventListener('change', cargarMarcadores);
  });
