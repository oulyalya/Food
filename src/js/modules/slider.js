function slider() {
  const slider = document.querySelector('.offer__slider');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const slidesFrame = document.querySelector('.offer__slider-inner');
  const slides = document.querySelectorAll('.offer__slide');
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const slideCurrent = document.querySelector('#current');
  const slideTotal = document.querySelector('#total');
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    slideTotal.textContent = `0${slides.length}`;
  } else {
    slideTotal.textContent = slides.length;
  }

  slidesFrame.style.width = 100 * slides.length + '%';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  const addZero = function () {
    if (slideIndex < 10) {
      slideCurrent.textContent = `0${slideIndex}`;
    } else {
      slideCurrent.textContent = slideIndex;
    }
  };

  next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, '');
    }

    slidesFrame.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZero();
    setActiveDot();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
      offset -= +width.replace(/\D/g, '');
    }

    slidesFrame.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    addZero();
    setActiveDot();
  });

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  const setActiveDot = function () {
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);
      slidesFrame.style.transform = `translateX(-${offset}px)`;

      addZero();
      setActiveDot();
    });
  });
}

export default slider;
