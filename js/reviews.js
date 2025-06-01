document.addEventListener('DOMContentLoaded', function() {
    const ratingInput = document.getElementById('rating');

    loadReviewsFromStorage();

    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingInput.value = value;

            document.querySelectorAll('.star').forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('active');
                }
            });
        });
    });

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const rating = ratingInput.value;
            const text = document.getElementById('review-text').value;

            if (!name || !text || rating === '0') {
                alert('Будь ласка, заповніть всі поля та оберіть рейтинг');
                return;
            }

            const now = new Date();
            const dateStr = `${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`;

            const reviewData = { name, rating, text, date: dateStr };

            addReview(reviewData);
            saveReviewToStorage(reviewData);

            this.reset();
            document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
            ratingInput.value = '0';
        });
    }
});

function addReview({ name, rating, text, date }) {
    const reviewsList = document.querySelector('.reviews-list');

    const reviewHTML = `
        <div class="review">
            <div class="review-header">
                <div class="review-author">${name}</div>
                <div class="review-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                <div class="review-date">${date}</div>
            </div>
            <div class="review-text">
                <p>${text}</p>
            </div>
        </div>
    `;

    reviewsList.insertAdjacentHTML('afterbegin', reviewHTML);
}

function saveReviewToStorage(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.unshift(review); 
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviewsFromStorage() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(addReview);
}
