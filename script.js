const track = document.querySelector('.carousel-track');
let slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.right');
const prevButton = document.querySelector('.carousel-button.left');

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);

let currentIndex = 1; // Start at the real first slide

function updateSlidePosition(animate = true) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  if (!animate) {
    track.style.transition = 'none';
  } else {
    track.style.transition = 'transform 0.5s ease-in-out';
  }
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  updateSlidePosition();
});

prevButton.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateSlidePosition();
});

track.addEventListener('transitionend', () => {
  if (slides[currentIndex] === firstClone) {
    currentIndex = 1;
    updateSlidePosition(false);
  }
  if (slides[currentIndex] === lastClone) {
    currentIndex = slides.length - 2;
    updateSlidePosition(false);
  }
});

window.addEventListener('resize', () => updateSlidePosition(false));

let autoSlideInterval = setInterval(() => {
  nextButton.click();
}, 3000); // Change every 3 seconds

// Initial setup
updateSlidePosition(false);