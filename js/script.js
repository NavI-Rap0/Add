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
const leftItems = document.querySelector('.left-area__items');
const introText = document.querySelector('.carousel__intro-texts');
const logo = document.querySelector('.left-area__logo');
const staticTextMini = document.querySelector('.carousel__static-text-mini');
const textTitle = document.querySelector('.text__title');

function updateSlide(index) {
    // Анімація зникнення зображення
    gsap.to(rightImage, { opacity: 0, duration: 0, onComplete: () => {
        // Після завершення зникнення змінюємо джерело зображення
        rightImage.src = images[index];
        // Анімація появи нового зображення
        gsap.to(rightImage, { opacity: 1, duration: 0.2 });
    }});

    // Оновлення лічильника слайдів і опису
    slideCounter.textContent = `${index + 1}/${images.length}`;
    textDescription.innerHTML = `${descriptions[index]} ${inlineLink}`;
    gsap.fromTo(textDescription, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
}


function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
        if (autoPlay) {
            rightArrow.classList.add('auto-play');
            setTimeout(() => {
                rightArrow.classList.remove('auto-play');
            }, 1000);
            currentIndex = (currentIndex + 1) % images.length;
            updateSlide(currentIndex);
        }
    }, 4000);
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
    gsap.set([introText, logo, textTitle], { opacity: 0 });
    gsap.set([introText, textTitle], { x: -50 });
    gsap.set([logo], { x: -50, y: 20 });
    gsap.set(whiteArea, { width: 0, x: -50 });
    gsap.set(rightImage, { width: '100%' });
    gsap.set([textDescription, leftItems], { opacity: 0 });

    const timeline = gsap.timeline({
        onComplete: () => {
            autoPlay = true;
            startAutoPlay();
        }
    });

    timeline
        .to([introText, logo], { opacity: 1, x: 0, duration: 1 })
        .to(logo, { y: 0, duration: 1 })
        .to(textTitle, { opacity: 1, x: 0, duration: 1 })
        .to(whiteArea, { width: '100%', x: 0, duration: 1, ease: "power2.inOut"})
        .to(staticTextMini, { color: '#000', duration: 0.5, stagger: 1 }, '-=0.5')
        .add(() => {
            rightImage.src = images[currentIndex];
            slideCounter.textContent = `${currentIndex + 1}/${images.length}`;
            textDescription.innerHTML = `${descriptions[currentIndex]} ${inlineLink}`;
        })
        .to([textDescription, leftItems], { opacity: 1, duration: 1.5  });
}

introAnimation();


