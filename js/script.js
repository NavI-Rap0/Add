const images = [
    './assets/Image1.png',
    './assets/Image2.png',
    './assets/Image3.png',
    './assets/Image4.png',
    './assets/Image5.png',
];

const descriptions = [
    'Відкрийте для себе інноваційний світ Bespoke Jet™.',
    'Рішення для сучасного дому.',
    'Неперевершений дизайн та функціональність.',
    'Технології для кожного дня.',
    'Відчуйте майбутнє вже сьогодні.',
];

let currentIndex = 0;
let autoPlay = true;

// Елементи DOM
const whiteArea = document.getElementById('white-area');
const textContent = document.querySelector('.text-content');
const rightImage = document.getElementById('right-image');
const slideCounter = document.getElementById('slide-counter');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const buyButton = document.getElementById('shop-now');

// Початкова анімація
function introAnimation() {
    gsap.fromTo(whiteArea, { x: '-100%' }, { x: 0, duration: 1, onComplete: () => {
        gsap.fromTo(textContent, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    }});
}

// Оновлення слайдів
function updateSlide(index) {
    rightImage.src = images[index];
    slideCounter.textContent = `${index + 1}/${images.length}`;
    const description = textContent.querySelector('#carousel-description');
    description.textContent = descriptions[index];
    gsap.fromTo(description, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
}

// Автоплей
setInterval(() => {
    if (autoPlay) {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide(currentIndex);
    }
}, 5000);

// Навігація
rightArrow.addEventListener('click', () => {
    autoPlay = false;
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide(currentIndex);
});

leftArrow.addEventListener('click', () => {
    autoPlay = false;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(currentIndex);
});

// Запуск
introAnimation();
