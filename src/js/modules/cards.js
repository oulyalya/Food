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

export default cards;
