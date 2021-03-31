function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  const hideTabsContent = function () {
    tabsContent.forEach(item => {
      item.classList.add('hidden');
      item.classList.remove('shown', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  };

  const showTabContent = function (i = 0) {
    tabsContent[i].classList.add('shown', 'fade');
    tabsContent[i].classList.remove('hidden');
    tabs[i].classList.add(activeClass);
  };

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
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
