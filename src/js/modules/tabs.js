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

export default tabs;
