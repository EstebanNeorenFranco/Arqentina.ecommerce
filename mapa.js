document.addEventListener("DOMContentLoaded", function(event) {
    var map;
    var zoom = 3;
    var argenmap = new L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
        minZoom: 1, maxZoom: 20
    });
  
    // Inicializar el mapa
    map = L.map('map', {
        center: new L.LatLng(-40.08574, -60.83348),
        zoom: zoom,
        layers: [argenmap]
    });
  
    // Crear un ícono personalizado
    var customIcon = L.icon({
        iconUrl: './assets/homepage_images/Icono location.png', // Ruta del nuevo ícono
        iconSize: [32, 32], // Tamaño del ícono (ajusta según sea necesario)
        iconAnchor: [16, 32], // Punto del ícono que corresponde a la posición del marcador
        popupAnchor: [0, -32] // Punto en el que se ancla el popup en relación con el ícono
    });
  
    // Función para cargar y mostrar marcadores basados en la provincia seleccionada
    function showMarkersByProvince(province) {
        // Limpiar todos los marcadores existentes en el mapa
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
  
        // Cargar el archivo JSON gallery_data.json
        fetch('./gallery_data.json')
            .then(response => response.json())
            .then(data => {
                // Filtrar los datos según la provincia seleccionada
                var filteredData = data.filter(item => province === 'all' || item.provincia === province);
  
                // Iterar sobre los datos filtrados y agregar marcadores
                filteredData.forEach(item => {
                    // Crear un hipervínculo para la imagen
                    var imageLink = document.createElement('a');
                    imageLink.href = 'detalle.html?id=' + item.id; // La URL de detalle con el ID del marcador como parámetro
                    imageLink.target = '_blank'; // Abrir en una nueva pestaña
  
                    // Crear la imagen y agregarla al hipervínculo
                    var image = document.createElement('img');
                    image.src = item.imageSrc;
                    image.alt = item.imageName;
                    image.style.width = '100px'; // Establecer el tamaño de la imagen
                    imageLink.appendChild(image);
  
                    // Crear el contenido del marcador con la imagen y el nombre
                    var markerContent = document.createElement('div');
                    markerContent.appendChild(imageLink); // Agregar la imagen con el hipervínculo
                    markerContent.appendChild(document.createElement('br')); // Salto de línea
                    markerContent.appendChild(document.createTextNode(item.title)); // Agregar el nombre del lugar
  
                    // Crear el marcador con la posición proporcionada y el ícono personalizado
                    var marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);
  
                    // Agregar el contenido del marcador
                    marker.bindPopup(markerContent); // Agregar la imagen y el nombre como contenido del marcador
                });
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    }
  
    // Obtener el elemento <select> del HTML
    var selectElement = document.getElementById('provinciaSelector');
  
    // Agregar un evento de cambio al elemento <select>
    selectElement.addEventListener('change', function(event) {
        var selectedProvince = event.target.value; // Obtener el valor seleccionado
  
        // Mostrar los marcadores basados en la provincia seleccionada
        showMarkersByProvince(selectedProvince);
    });
  
    // Mostrar todos los marcadores al cargar la página por primera vez
    showMarkersByProvince('all');
  });
  