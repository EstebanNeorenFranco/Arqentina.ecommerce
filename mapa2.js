document.addEventListener('DOMContentLoaded', function() {
    // Inicializa el mapa
    var map = L.map('map').setView([-32.9474, -60.63984], 5); // Coordenadas iniciales y nivel de zoom

    // Añade una capa de mapa (aquí se usa OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);

    // Define el icono personalizado
    var customIcon = L.icon({
        iconUrl: './assets/homepage_images/Icono location.png', // Ruta del nuevo ícono
        iconSize: [32, 32], // Tamaño del ícono (ajusta según sea necesario)
        iconAnchor: [16, 32], // Punto del ícono que corresponde a la posición del marcador
        popupAnchor: [0, -32] // Punto en el que se ancla el popup en relación con el ícono
    });

    // Función para añadir un marcador con el icono personalizado y un popup
    function addMarker(loc) {
        var marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);
        var popupContent = '<b>' + loc.title + '</b><br>';
        if (loc.imageSrc) {
            popupContent += '<img src="' + loc.imageSrc + '" alt="' + loc.title + '" style="width:100%;"><br>';
        }
        popupContent += '<a href="' + loc.url + '" target="_blank">Más info</a>';
        marker.bindPopup(popupContent);
    }

    // Carga los datos desde el archivo JSON
    fetch('locations.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(loc => addMarker(loc));
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));
});
