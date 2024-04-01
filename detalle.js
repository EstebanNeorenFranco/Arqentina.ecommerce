document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del elemento desde la URL
    var params = new URLSearchParams(window.location.search);
    var elementoId = params.get("id");
  
    // Obtener los contenedores de detalles
    var nombreContainer = document.getElementById("elemento-nombre");
    var imagenContainer = document.getElementById("elemento-imagen");
    var descripcionContainer = document.getElementById("elemento-descripcion");
    var provinciaContainer = document.getElementById("elemento-provincia");
    var ciudadContainer = document.getElementById("elemento-ciudad");
    var autorContainer = document.getElementById("elemento-autor");
    var usoContainer = document.getElementById("elemento-uso");
    var textoContainer = document.getElementById("elemento-texto");
    var urlInstaContainer = document.getElementById("elemento-url-insta");
  
    fetch('./gallery_data.json')
      .then(response => response.json())
      .then(data => {
        var elementoSeleccionado = data.find(function(item) {
          return item.id == elementoId;
        });
  
        if (elementoSeleccionado) {
          // Actualizar el contenido de la página de detalles con la información del elemento
          nombreContainer.textContent = elementoSeleccionado.title;
          imagenContainer.src = elementoSeleccionado.imageSrc;  // Agregar esta línea para mostrar la imagen
          descripcionContainer.textContent = elementoSeleccionado.description;

          provinciaContainer.textContent = `Provincia: ${elementoSeleccionado.provincia}`;
          ciudadContainer.textContent = `Ciudad: ${elementoSeleccionado.ciudad}`;
          autorContainer.textContent = `Autor: ${elementoSeleccionado.autor}`;
          usoContainer.textContent = `Uso: ${elementoSeleccionado.uso}`;
          textoContainer.textContent = elementoSeleccionado.texto;
  
          // Crear un enlace para el botón de Intagram
          var enlaceInsta = document.createElement("a");
          enlaceInsta.href = elementoSeleccionado.urlInsta;
          enlaceInsta.textContent = "Ver en Instagram";
          
  
          // Agregar el enlace al contenedor
          urlInstaContainer.innerHTML = '';
          urlInstaContainer.appendChild(enlaceInsta);
        } else {
          // Manejar el caso en que no se encuentre el elemento
          nombreContainer.textContent = "Elemento no encontrado";
          imagenContainer.src = "";  // Limpiar la imagen en caso de que no se encuentre el elemento
          descripcionContainer.textContent = "La descripción no está disponible";
          // Limpiar los demás contenedores
          provinciaContainer.textContent = '';
          ciudadContainer.textContent = '';
          autorContainer.textContent = '';
          usoContainer.textContent = '';
          textoContainer.textContent = '';
          urlInstaContainer.innerHTML = '';
        }
      })
      .catch(error => console.error('Error fetching gallery data:', error));
  });
  