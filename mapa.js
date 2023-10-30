// Importa las bibliotecas de Leaflet
const L = window.L;

// Crea un mapa en el contenedor "map" con coordenadas iniciales y zoom
const map = L.map('map').setView([-34.6118, -58.4173], 13);

// Agrega una capa de mapa de OpenStreetMap (puedes cambiarlo por otras capas)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable para almacenar la ventana emergente personalizada
let customPopup = L.popup();

// Cargar el archivo JSON
fetch('ubicaciones.json')
  .then(response => response.json())
  .then(data => {
    // Iterar a través de las ubicaciones en el archivo JSON
    data.forEach(location => {
      const { lat, lng, popupImage, imageName, url } = location;

      // Crea un marcador con las coordenadas
      const marker = L.marker([lat, lng]).addTo(map);

      // Agrega una función para mostrar la imagen y el nombre de la imagen al hacer clic en el marcador
      marker.on('click', function() {
        // Contenido de la ventana emergente personalizada
        const imagePopup = `<a href="${url}" target="_blank"><img src="${popupImage}" width="150"></a><br>${imageName}`;

        // Abre la ventana emergente personalizada y asigna su contenido
        customPopup
          .setLatLng(marker.getLatLng())
          .setContent(imagePopup)
          .openOn(map);
      });
    });
  });
