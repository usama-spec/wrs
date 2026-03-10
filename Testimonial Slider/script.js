const slider = document.getElementById('testimonial-slider');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let autoplayInterval;

function updateSlider() {
    // Update slider position
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        stopAutoplay();
        startAutoplay();
    });
});

// Pause autoplay on hover
const testimonialWrapper = document.querySelector('.testimonial-wrapper');
testimonialWrapper.addEventListener('mouseenter', stopAutoplay);
testimonialWrapper.addEventListener('mouseleave', startAutoplay);

// Initialize slider
updateSlider();
startAutoplay();

// Mobile Swipe Support
let touchStartX = 0;
let touchEndX = 0;

testimonialWrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialWrapper.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    }
}
