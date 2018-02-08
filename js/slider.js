let slider = document.querySelector('#slider');
let slides = document.querySelectorAll('#slider .slide');
let currentSlide = 0;
let interval = 100000;
let slideInterval = setInterval(nextSlide, interval);
let next = document.querySelector('#next');
let prev = document.querySelector('#prev');
let thumbnails = document.querySelectorAll('input[name=slider]');
let position1;
let position2;

for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].onchange = function () {
        clearInterval(slideInterval);
        goToSlide(event.target.value - 1);
        slideInterval = setInterval(nextSlide, interval);
    }
}

next.addEventListener('click', nextSlideNow)

prev.addEventListener('click', prevSlide)

slider.addEventListener('touchstart', function (e) {
    position1 = e.changedTouches[0].pageX;
});

slider.addEventListener('touchend', function (e) {
    position2 = e.changedTouches[0].pageX;
    if (position1 > position2) {
        nextSlide();
    }
    else if (position1 < position2) {
        previousSlide();
    }
});

function nextSlide() {
    goToSlide(currentSlide + 1);
    setThumbnail(currentSlide);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
    setThumbnail(currentSlide);
}

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide active-slide';
}

function setThumbnail(n) {
    thumbnails[n].checked = true;
}

function nextSlideNow() {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, interval);
}

function prevSlide() {
    clearInterval(slideInterval);
    previousSlide();
    slideInterval = setInterval(nextSlide, interval);
}