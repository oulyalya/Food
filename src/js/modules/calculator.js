'use strict';

function calculator() {
  const calcOutput = document.querySelector('.calculating__result span');
  let gender = localStorage.getItem('gender') ? localStorage.getItem('gender') : 'female' && localStorage.setItem('gender', 'female');
  let height;
  let weight;
  let age;
  let coef = localStorage.getItem('coef') ? localStorage.getItem('coef') : 1.375 && localStorage.setItem('coef', 1.375);

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
    });
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
  };

  const getStaticInformation = function (selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} .calculating__choose-item`);


    elements.forEach(elem => {
      elem.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-coef')) {
          coef = +evt.target.getAttribute('data-coef');
          localStorage.setItem('coef', evt.target.getAttribute('data-coef'));
        } else {
          gender = evt.target.getAttribute('id');
          localStorage.setItem('gender', evt.target.getAttribute('id'));
        }

        elements.forEach(elem => elem.classList.remove(activeClass));
        evt.target.classList.add(activeClass);
        calcTotal();
      });
    });
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
    });
  };

  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('#activity', 'calculating__choose-item_active');
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  calcTotal();
}

export default calculator;
