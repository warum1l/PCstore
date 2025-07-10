document.addEventListener('DOMContentLoaded', () => {
  const backgrounds = document.querySelectorAll('.hero-bg');
  let current = 0;

  function showNextBg() {
    backgrounds[current].classList.remove('active');
    current = (current + 1) % backgrounds.length;
    backgrounds[current].classList.add('active');
  }

  backgrounds[0].classList.add('active'); 

  setInterval(showNextBg, 6000); 
});
