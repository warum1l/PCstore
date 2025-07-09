document.addEventListener("DOMContentLoaded", () => {
  let categorySelect = document.querySelectorAll("select")[0];
  let productCards = document.querySelectorAll(".product-card");

  categorySelect.addEventListener("change", () => {
    let selected = categorySelect.value;

    productCards.forEach(card => {
      let title = card.querySelector("h3").innerText.toLowerCase();

      let isGPU = title.includes("rtx") || title.includes("rx");
      let isCPU = title.includes("ryzen");

      if (
        selected === "Всі категорії" ||
        (selected === "Відеокарти" && isGPU) ||
        (selected === "Процесори" && isCPU)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
