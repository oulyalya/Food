/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function calculator() {
  const calcOutput = document.querySelector('.calculating__result span');
  let gender = localStorage.getItem('gender') ? localStorage.getItem('gender') :  true && localStorage.setItem('gender', 'female');
  let height;
  let weight;
  let age;
  let coef = localStorage.getItem('coef') ? localStorage.getItem('coef') :  true && localStorage.setItem('coef', 1.375);

  const initLocalSettins = function (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('gender')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-coef') === localStorage.getItem('coef')) {
        elem.classList.add(activeClass);
      }
    })
  };

  initLocalSettins('#gender .calculating__choose-item', 'calculating__choose-item_active');
  initLocalSettins('#activity .calculating__choose-item', 'calculating__choose-item_active');

  const calcTotal = function () {
    if (!gender || !height || !weight || !age || !coef) {
      calcOutput.textContent = '____ ';
      return;
    }

    if (gender == 'female') {
      calcOutput.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * coef);
    } else {
      calcOutput.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * coef);
    }
  }

  const getStaticInformation = function (selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} .calculating__choose-item`);


    elements.forEach(elem => {
      elem.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-coef')) {
          coef = +evt.target.getAttribute('data-coef');
          localStorage.setItem('coef', evt.target.getAttribute('data-coef'));
        } else {
          gender = evt.target.getAttribute('id');
          localStorage.setItem('gender', evt.target.getAttribute('id'))
        }

        elements.forEach(elem => elem.classList.remove(activeClass));
        evt.target.classList.add(activeClass);
        calcTotal();
      });
    })
  };

  const getDynamicInformation = function (selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.classList.add('input-error');
      } else {
        input.classList.remove('input-error');
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    })
  };

  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('#activity', 'calculating__choose-item_active');
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  calcTotal();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  const getResource = async (url, data) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  class Card {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.price = +price;
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length == 0) {
        this.className = 'menu__item';
        element.classList.add(this.className);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    `;
      this.parent.append(element);
    }
  };

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({ img, altimg, title, descr, price }) => {
        new Card(img, altimg, title, descr, price, '.menu .container').render();
      });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import { openModal, closeModal } from './modal';

function forms() {
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  const showThanksModal = function (message) {
    const prevModalContent = document.querySelector('.modal__dialog');
    prevModalContent.classList.add('hidden');
    showModalHandler();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class="modal__title">${message}</div>

    </div>
  `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalContent.classList.remove('hidden');
      hideModalHandler();
    }, 4000);
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });

    return await res.json();
  };

  const bindPostData = function (form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  forms.forEach(item => bindPostData(item));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
  const modalTriggers = document.querySelectorAll('[data-modal]')
  const modal = document.querySelector('.modal');


  const escPressHandler = function (evt) {
    if (evt.code === 'Escape') {
      closeModal();
    }
  };

  const openModal = function () {
    modal.classList.add('shown');
    modal.classList.remove('hidden');
    document.documentElement.classList.add('body-lock');
    document.addEventListener('keydown', escPressHandler);
    clearInterval(modalTimerId);
  };

  const closeModal = function () {
    modal.classList.remove('shown');
    modal.classList.add('hidden');
    document.documentElement.classList.remove('body-lock');
    document.removeEventListener('keydown', escPressHandler);
  };

  const showModalHandler = function () {
    openModal();
  };

  // const hideModalHandler = function () {
  //   closeModal();
  // };

  const overlayClickHandler = function (evt) {
    if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
      closeModal();
    }
  }

  const modalTimerId = setTimeout(showModalHandler, 50000);

  const showModalByScrollHandler = function () {
    if (window.pageYOffset + document.documentElement.clientHeight + 20 >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScrollHandler);
    }
  };

  window.addEventListener('scroll', showModalByScrollHandler);

  modal.addEventListener('click', overlayClickHandler);
  modalTriggers.forEach(btn => btn.addEventListener('click', showModalHandler));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
// export { escPressHandler };
// export { openModal };
// export { closeModal };


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  }

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
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);
      slidesFrame.style.transform = `translateX(-${offset}px)`;

      addZero();
      setActiveDot();
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabsContent = function () {
    tabsContent.forEach(item => {
      item.classList.add('hidden');
      item.classList.remove('shown', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showTabContent = function (i = 0) {
    tabsContent[i].classList.add('shown', 'fade');
    tabsContent[i].classList.remove('hidden');
    tabs[i].classList.add('tabheader__item_active');
  };

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabsContent();
  showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  const deadline = '2021-05-10';

  const getTimeRemaining = function (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    }
  };

  const getZero = function (num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num;
    }
  }

  const setTimer = function (selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('.timer__days');
    const hours = timer.querySelector('.timer__hours');
    const minutes = timer.querySelector('.timer__minutes');
    const seconds = timer.querySelector('.timer__seconds');
    const timeInterval = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
      const time = getTimeRemaining(endtime);
      days.textContent = getZero(time.days);
      hours.textContent = getZero(time.hours);
      minutes.textContent = getZero(time.minutes);
      seconds.textContent = getZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);

        days.textContent = 0;
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
      }
    }
  };

  setTimer('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
  // modal('[data-modal]', '.modal');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map