// Asegúrate de incluir sheety.min.js en tu proyecto

const galleryContainer = document.querySelector('.body');

// URL de Sheety con el enlace a tu hoja de cálculo en Google Sheets
const sheetyUrl = 'https://api.sheety.co/fdae24dbce17c375bc8d1f5f001e32e9/publicacionesWeb/publicaciones';

// Realiza una solicitud para cargar los datos desde Sheety
sheety
.get(sheetyUrl)
.then(response => response.publicaciones)
.then(publicaciones => {
    // Itera a través de los datos y crea elementos para cada galería
    data.publicaciones.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('box_shadow');

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