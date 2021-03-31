function modal() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
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
  };

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

export default modal;
// export { escPressHandler };
// export { openModal };
// export { closeModal };
