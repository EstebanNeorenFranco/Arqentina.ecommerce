const menuBtn = document.querySelector('.header_icons');
const closeBtn = document.querySelector('.close_menu');
let darkMode = localStorage.getItem('darkMode') === 'true';
const darkBtn = document.querySelector('.moon');


function enableDarkMode() {
  darkMode = true;
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'true');
}


function disableDarkMode() {
  darkMode = false;
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', 'false');
}


function toggleDarkMode() {
  if (darkMode) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

function checkDeviceTheme() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('closed');
    document.getElementById('sidebar').classList.add('active');
  });
} else {
  console.error("No se encontró el botón de menú");
}

if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebar').classList.add('closed');
  });
} else {
  console.error("No se encontró el botón de cerrar");
}

if (darkBtn) {
  darkBtn.addEventListener('click', toggleDarkMode);
} else {
  console.error("No se encontró el botón de modo oscuro");
}


if (darkMode) {
  enableDarkMode();
}

function checkDeviceTheme() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}