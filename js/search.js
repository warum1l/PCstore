document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const productCards = document.querySelectorAll(".product-card");
    
    searchInput.addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        
        productCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});