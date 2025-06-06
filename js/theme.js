document.addEventListener('DOMContentLoaded', function() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const savedTheme = localStorage.getItem('theme');
    
    
    if (savedTheme === 'dark') {
        enableDarkTheme();
        themeCheckbox.checked = true;
    }
    
    
    themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            enableDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            disableDarkTheme();
            localStorage.setItem('theme', 'light');
        }
    });
    
    function enableDarkTheme() {
        document.body.classList.add('dark-theme');
        
        
        document.querySelectorAll('.product-card, .review, .add-review').forEach(el => {
            el.classList.add('dark-theme');
        });
    }
    
    function disableDarkTheme() {
        document.body.classList.remove('dark-theme');
        
        
        document.querySelectorAll('.product-card, .review, .add-review').forEach(el => {
            el.classList.remove('dark-theme');
        });
    }
});