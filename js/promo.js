document.addEventListener("DOMContentLoaded", () => {
  let popup = document.getElementById("promo-popup");
  let closeBtn = document.getElementById("close-promo");

  
  setTimeout(() => {
    popup.classList.add("show");
  }, 5000);

  
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
  });
});
