// Selecciona el contenedor de galería en el DOM
const galleryContainer = document.querySelector('.body');

// Ruta al archivo JSON con los datos de la galería
const galleryDataUrl = 'gallery_data.json';

// Realiza una solicitud para cargar el archivo JSON
fetch(galleryDataUrl)
  .then(response => response.json())
  .then(data => {
    // Itera a través de los datos y crea elementos para cada galería
    data.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add( 'box_shadow');


      const imageLink = document.createElement('a');
      imageLink.href = item.imageSrc;

      const image = document.createElement('img');
      image.src = item.imageSrc;
      image.alt = '';
      image.classList.add('galery_image');

      const description = document.createElement('div');
      description.classList.add('box_description');

      const provincia = document.createElement('p');
      provincia.classList.add('provincia');
      provincia.textContent = item.provincia;

      const text = document.createElement('p');
      text.textContent = item.description;

      description.appendChild(provincia);
      description.appendChild(text);

      imageLink.appendChild(image);
      galleryItem.appendChild(imageLink);
      galleryItem.appendChild(description);

      galleryContainer.appendChild(galleryItem);
    });
  })
  .catch(error => console.error('Error loading gallery data:', error));
