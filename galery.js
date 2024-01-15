document.addEventListener('DOMContentLoaded', function () {
  // Fetch the gallery data from the JSON file
  fetch('./gallery_data.json')
      .then(response => response.json())
      .then(data => {
          // Store the gallery data in a variable
          const galleryData = data;

          // Populate the gallery with all items initially
          populateGallery(galleryData);

          // Add event listener for province selector change
          const provinciaSelector = document.getElementById('provinciaSelector');
          provinciaSelector.addEventListener('change', function () {
              const selectedProvincia = provinciaSelector.value;

              // Filter gallery items based on selected province
              const filteredData = selectedProvincia === 'all'
                  ? galleryData
                  : galleryData.filter(item => item.provincia === selectedProvincia);

              // Clear existing gallery items
              clearGallery();

              // Populate the gallery with filtered items
              populateGallery(filteredData);
          });
      })
      .catch(error => console.error('Error fetching gallery data:', error));
});

function clearGallery() {
  const galleryContainer = document.querySelector('.body');
  galleryContainer.innerHTML = ''; // Remove all child elements
}

function populateGallery(data) {
  data.forEach(item => {
      createGalleryItem(item);
  });
}

function createGalleryItem(item) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('box_shadow');

  const imageLink = document.createElement('a');
  imageLink.href = window.location.origin + item.imageSrc;

  const image = document.createElement('img');
  image.src = item.imageSrc;
  image.alt = '';
  image.classList.add('galery_image');

  const description = document.createElement('div');
  description.classList.add('box_description');

  const provincia = document.createElement('p');
  provincia.classList.add('title');
  provincia.textContent = item.title;

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
