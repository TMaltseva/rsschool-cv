
//Auto switch
const DOTS = document.querySelectorAll('.hover-area'),
    SLIDER_CONTROLS = document.querySelectorAll('.sliders-controls-button'),
    ABOUT_SLIDERS = document.querySelectorAll('.about-container'),
    ARROW_PREV = document.querySelector('.arrow-to-left'),
    ARROW_NEXT = document.querySelector('.arrow-to-right'),
    NAVIGATION_LINK = document.querySelector('.skills-link'),
    MAX_SLIDES = 3;

let sliderCount = 0;
let autoSlideInterval;


function nextSlide() {
    if (sliderCount < MAX_SLIDES) {
        sliderCount++;
    } else {
        sliderCount = 0;
    }
    thisSlide(sliderCount);
    updateArrows();
}

function prevSlide() {
    if (sliderCount > 0) {
        sliderCount--;
    } else {
        sliderCount = MAX_SLIDES;
    }
    thisSlide(sliderCount);
    updateArrows();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000); 
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function animationEndHandler() {
    startAutoSlide();
    ABOUT_SLIDERS.forEach(item => item.removeEventListener('animationend', animationEndHandler));
}

ABOUT_SLIDERS.forEach(item => item.addEventListener('animationend', animationEndHandler));

startAutoSlide();

ARROW_PREV.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    ABOUT_SLIDERS.forEach(item => item.addEventListener('animationend', animationEndHandler));
});

ARROW_NEXT.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    ABOUT_SLIDERS.forEach(item => item.addEventListener('animationend', animationEndHandler));
});

SLIDER_CONTROLS.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        sliderCount = index;
        thisSlide(sliderCount);
        ABOUT_SLIDERS.forEach(item => item.addEventListener('animationend', animationEndHandler));
    });
});

document.addEventListener('scroll', () => {
    stopAutoSlide();
    const middleOfPage = window.innerHeight / 2;
    const middleOfSlider = ABOUT_SLIDERS[sliderCount].getBoundingClientRect().top + ABOUT_SLIDERS[sliderCount].offsetHeight / 2;
    if (Math.abs(middleOfSlider) < middleOfPage) {
        startAutoSlide();
    }
});



function handleScroll() {
    stopAutoSlide();

    const middleOfPage = window.innerHeight / 2;

    const middleOfSlider = ABOUT_SLIDERS[sliderCount].getBoundingClientRect().top + ABOUT_SLIDERS[sliderCount].offsetHeight / 2;

    if (Math.abs(middleOfSlider) < middleOfPage) {
        startAutoSlide();
    }
}

document.addEventListener('scroll', handleScroll);


//Skills link

NAVIGATION_LINK.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSlide = 3; 

    if (!isNaN(targetSlide) && targetSlide >= 0 && targetSlide <= MAX_SLIDES) {
        stopAutoSlide();
        sliderCount = targetSlide;
        thisSlide(sliderCount);

        const targetSlideElement = ABOUT_SLIDERS[sliderCount];
        targetSlideElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

        ABOUT_SLIDERS.forEach(item => item.addEventListener('animationend', animationEndHandler));
    }
});

//Switch to tg

document.getElementById('contact-btn').addEventListener('click', function() {
    var telegramUsername = 'smeshelo';
    var telegramURL = 'https://t.me/' + telegramUsername;
    window.location.href = telegramURL;
});

document.getElementById('submit-btn').addEventListener('click', function() {
    var telegramUsername = 'smeshelo';
    var telegramURL = 'https://t.me/' + telegramUsername;
    window.location.href = telegramURL;
});

//Button Resume

document.getElementById('intro-btn').addEventListener('click', function() {
    window.location.href = 'https://tmaltseva.github.io/rsschool-cv/cv';
});

function thisSlide(index) {
    SLIDER_CONTROLS.forEach(item => item.classList.remove('active'));
    SLIDER_CONTROLS[index].classList.add('active');
    ABOUT_SLIDERS.forEach(item => item.classList.add('hidden'));
    ABOUT_SLIDERS[sliderCount].classList.remove('hidden');
}

// Slider_Projects

const PROJ_WRAP = document.querySelector('.proj-items-wrap'),
      PROJ_ARROW_TO_RIGHT = document.querySelector('.arrow-to-right-proj'),
      PROJ_ARROW_TO_LEFT = document.querySelector('.arrow-to-left-proj');


let sliderCountProj = 0;

function rollSlider() {
	PROJ_WRAP.style.transform = `translateX(${-sliderCountProj * 29}%)`;
};

function updateButtonState() {
   PROJ_ARROW_TO_LEFT.classList.toggle('disabled', sliderCountProj === 0);
    PROJ_ARROW_TO_RIGHT.classList.toggle('disabled', sliderCountProj === 2);
}

function nextSlideProj() {
	if (sliderCountProj === 2) return;
	sliderCountProj++;
	if (sliderCount >= 3) {
		PROJ_ARROW_TO_RIGHT.disabled = true;
		sliderCountProj = 0;
		return;
	};
	rollSlider();
    updateButtonState();
};
  
function prevSlideProj() {
	if (sliderCountProj === 0) return;
	sliderCountProj--;
	if (sliderCountProj < 0) {
		PROJ_ARROW_TO_LEFT.disabled = true;
		sliderCountProj = 2;
		return;
	};
	rollSlider();
    updateButtonState();
};

PROJ_ARROW_TO_LEFT.addEventListener('click', prevSlideProj);
PROJ_ARROW_TO_RIGHT.addEventListener('click', nextSlideProj);
updateButtonState();

// Email validation and text area settings

function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveData(form) {
    let nameInput = form.querySelector('#nameInput');
    let emailInput = form.querySelector('#emailInput');
    let textInput = form.querySelector('#textInput');

    let nameValue = nameInput.value;
    let emailValue = emailInput.value;
    let textValue = textInput.value;

    if (nameValue && isValidEmail(emailValue) && textValue.length >= 10) {
        
        let storedData = JSON.parse(localStorage.getItem('allUserData')) || [];

        storedData.push({
            name: nameValue,
            email: emailValue,
            text: textValue
        });

        localStorage.setItem('allUserData', JSON.stringify(storedData));

        alert('Data saved successfully!');

        nameInput.value = '';
        emailInput.value = '';
        textInput.value = '';

        return false; 
    } else {
        alert('Please fill out all fields correctly');
        return false; 
    }
}

// Alert about screen width and hide document
function handleResize() {
    if (window.innerWidth < 1024) {
        alert('Please try on the laptop. Page for small screens is in development now');
        document.body.style.display = 'none'; 
    } else {
        document.body.style.display = 'block'; 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    handleResize();
    window.addEventListener('resize', handleResize);
});


