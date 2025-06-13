const containerCard = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  
  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-message">Кошик порожній.</p>';
    document.getElementById("total-price").textContent = "Загальна сума: 0 ₴";
    return;
  }

  container.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const priceValue = parseInt(item.price.replace(/\D/g, '')) || 0;
    totalPrice += priceValue * (item.quantity || 1);

    const itemHTML = `
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
    container.insertAdjacentHTML("beforeend", itemHTML);
  });

  document.getElementById("total-price").textContent = `Загальна сума: ${totalPrice.toLocaleString()} ₴`;

  
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      updatedCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCart();
    });
  });
}


document.getElementById("clear-cart")?.addEventListener("click", () => {
  localStorage.removeItem("cart");
  updateCart();
});

document.getElementById('checkout-btn')?.addEventListener('click', function() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    alert('Кошик порожній! Додайте товари перед оформленням.');
    return;
  }
  
  let total = 0;
  cart.forEach(item => {
    const price = parseInt(item.price.replace(/\D/g,'')) || 0;
    total += price * (item.quantity || 1);
  });
  
  if (confirm(`Оформити замовлення на суму ${total} ₴?`)) {
    alert('Замовлення оформлено! Дякуємо!');
    
    localStorage.removeItem('cart');
    
    updateCart();
  }
});


document.addEventListener("DOMContentLoaded", updateCart);