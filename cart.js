const cartBtn = document.querySelector('.cart_box_btn');
let cartNum = 0;
let cartItems = [];
document.getElementById("cart_box_num").textContent = cartNum.toString();
let cartTotal = 0;
const cartElement = document.getElementById('cart');
const cartTotalElement = document.getElementById('cart_total');

function addToCart(productName, price) {
  cartItems.push({ name: productName, price: price });
  updateCart();
  cartNum += 1;
  document.getElementById("cart_box_num").textContent = cartNum.toString();
  cartTotal += price;
  cartTotalElement.textContent = cartTotal.toString();
}

function updateCart() {
  cartElement.innerHTML = '';

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const itemText = document.createElement('span');
    itemText.textContent = `${item.name} - $${item.price}`;
    cartElement.appendChild(itemText);
    cartElement.appendChild(document.createElement('br'));
  }
}

if (cartBtn) {
  cartBtn.addEventListener('click', function () {
    const carrito = document.getElementById('carrito');
    if (carrito.classList.contains('active')) {
      carrito.classList.remove('active');
      carrito.classList.add('close');
    } else {
      carrito.classList.remove('close');
      carrito.classList.add('active');
    }
  });
} else {
  console.error("No se encontró el botón de carrito");
}
