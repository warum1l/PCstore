let cartContainer = document.getElementById("cart-items");
let totalPriceElement = document.getElementById("total-price");
let clearCartBtn = document.getElementById("clear-cart");
let checkoutBtn = document.getElementById("checkout-btn");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function calculateTotal(cart) {
  return cart.reduce((total, item) => {
    let price = parseInt(item.price.replace(/\D/g, '')) || 0;
    return total + price * (item.quantity || 1);
  }, 0);
}

function renderCartItem(item, index) {
  return `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-content">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-desc">${item.desc}</p>
        <p class="cart-item-price">${item.price}</p>
        <p class="cart-item-quantity">Кількість: ${item.quantity || 1}</p>
        <button class="remove-btn" data-index="${index}">Видалити</button>
      </div>
    </div>
  `;
}

function updateCart() {
  let cart = getCart();
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart-message">Кошик порожній.</p>';
    totalPriceElement.textContent = "Загальна сума: 0 ₴";
    return;
  }

  cartContainer.innerHTML = cart.map(renderCartItem).join('');
  totalPriceElement.textContent = `Загальна сума: ${calculateTotal(cart).toLocaleString()} ₴`;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      let updatedCart = getCart();
      updatedCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCart();
    });
  });
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCart();
}

function checkout() {
  let cart = getCart();
  
  if (cart.length === 0) {
    alert('Кошик порожній! Додайте товари перед оформленням.');
    return;
  }
  
  let total = calculateTotal(cart);
  
  if (confirm(`Оформити замовлення на суму ${total} ₴?`)) {
    alert('Замовлення оформлено! Дякуємо!');
    clearCart();
  }
}


clearCartBtn?.addEventListener("click", clearCart);
checkoutBtn?.addEventListener("click", checkout);
document.addEventListener("DOMContentLoaded", updateCart);