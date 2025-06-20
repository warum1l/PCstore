function addToCart(event) {
  event.preventDefault();
  
  let product = event.target.closest(".product");
  if (!product) return;

  let productInfo = {
    id: Date.now(),
    title: product.querySelector("h1")?.innerText || "Без названия",
    img: product.querySelector(".product-gallery img")?.getAttribute("src") || "",
    desc: product.querySelector(".description")?.innerText || "",
    price: product.querySelector(".price")?.innerText || "0 ₴",
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
 
  let existingProductIndex = cart.findIndex(item => 
    item.title === productInfo.title && item.price === productInfo.price
  );
  
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push(productInfo);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}


function initCartButton() {
  let cartButton = document.querySelector("[data-cart]");
  if (cartButton) {
    
    cartButton.removeEventListener("click", addToCart);
    
    cartButton.addEventListener("click", addToCart);
  }
}


document.addEventListener("DOMContentLoaded", initCartButton);