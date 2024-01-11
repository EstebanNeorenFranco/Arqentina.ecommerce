document.addEventListener('DOMContentLoaded', function () {
  // Fetch the gallery data from the JSON file
  fetch('./gallery_data.json')
      .then(response => response.json())
      .then(data => {
          // Loop through the data and create gallery items
          data.forEach(item => {
              createGalleryItem(item);
          });
      })
      .catch(error => console.error('Error fetching gallery data:', error));
});

function createGalleryItem(item) {
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

  // Append the gallery item to the body or any other container you want
  document.querySelector('.body').appendChild(galleryItem);
}
