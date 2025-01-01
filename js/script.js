const images = [
    './assets/Image1.png',
    './assets/Image2.png',
    './assets/Image3.png',
    './assets/Image4.png',
    './assets/Image5.png',
];

const descriptions = [
    '“The first time I used the Samsung Bespoke Jet™, I cried. I’m not being sensational; I really did. Of course, this vacuum worked great. But that’s not all.” ',
    '“If you’re an over-cleaner, like myself, you’ll nerd out on all of the functions. If you avoid this chore at all costs, you’ll appreciate how simple Samsung makes it.”',
    '“Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)”',
    '“When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that’s when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It’s like a vacuum for your vacuum.” ',
    '“Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily”',
];

let currentIndex = 0;
let autoPlay = false;
let autoPlayTimer;

const inlineLink = '<a href="#" class="text__link">Read more...</a>';

const whiteArea = document.querySelector('.carousel__white-area');
const textContent = document.querySelector('.text');
const textDescription = document.querySelector('.text__description');
const rightImage = document.querySelector('.carousel__right-image');
const slideCounter = document.querySelector('.navigation__counter');
const leftArrow = document.querySelector('.navigation__arrow--left');
const rightArrow = document.querySelector('.navigation__arrow--right');
const leftItems = document.querySelector('.text__items');

function updateSlide(index) {
    rightImage.src = images[index];
    slideCounter.textContent = `${index + 1}/${images.length}`;
    textDescription.innerHTML = `${descriptions[index]} ${inlineLink}`;
    gsap.fromTo(textDescription, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
        if (autoPlay) {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlide(currentIndex);
        }
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide(currentIndex);
    startAutoPlay();
});

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(currentIndex);
    startAutoPlay();
});

function introAnimation() {
    gsap.set('.carousel__background-image', { visibility: 'visible', opacity: 0 });
    gsap.set('.text__items', { visibility: 'visible', opacity: 0 });
    gsap.set('.carousel__logo', { opacity: 0 });

    const timeline = gsap.timeline({
        onComplete: () => {
            autoPlay = true;
            startAutoPlay();
        }
    });

    timeline
        .to('.carousel__background-image', { opacity: 1, duration: 1 })
        .to('.carousel__intro-text--1', { opacity: 1, y: 0, duration: 1 }, "+=0.5")
        .to('.carousel__intro-text--2', { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .to('.carousel__white-area', { opacity: 1, x: 0, duration: 1 })
        .to(['.text__items', '.carousel__logo'], { opacity: 1, duration: 1 }, "+=1")
        .to(rightImage, { opacity: 1, y: 0, duration: 0 })
        .to('.carousel__logo', { x: 0, duration: 1 }, "-=1")
        .to('.carousel__logo', { y: 0, duration: 1 })
        .to([textContent, textDescription], { opacity: 1, x: 0, duration: 1 }, "+=0.5");
}

introAnimation();
updateSlide(currentIndex);

