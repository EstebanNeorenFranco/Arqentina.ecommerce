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
                  var marker = L.marker([item.lat, item.lng]).addTo(map); // Agregar marcador en las coordenadas proporcionadas
                  marker.bindPopup('<img src="' + item.imageSrc + '" alt="' + item.imageName + '" style="width: 100px;"><br>' + item.title); // Agregar la imagen y el nombre como contenido del marcador
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
