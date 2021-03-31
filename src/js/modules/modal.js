const escPressHandler = function (evt, modalSelector) {
  if (evt.code === 'Escape') {
    closeModal(modalSelector);
  }
};

const openModal = function (modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('shown');
  modal.classList.remove('hidden');
  document.documentElement.classList.add('body-lock');
  document.addEventListener('keydown', (evt) => escPressHandler(evt, modalSelector));

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
};

const closeModal = function (modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('shown');
  modal.classList.add('hidden');
  document.documentElement.classList.remove('body-lock');
  document.removeEventListener('keydown', (evt) => escPressHandler(evt, modalSelector));
};

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTriggers = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  const showModalHandler = function () {
    openModal(modalSelector, modalTimerId);
  };

  const closeModalHandler = function (evt) {
    if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  };

  const showModalByScrollHandler = function () {
    if (window.pageYOffset + document.documentElement.clientHeight + 20 >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScrollHandler);
    }
  };

  window.addEventListener('scroll', showModalByScrollHandler);

  modal.addEventListener('click', closeModalHandler);
  modalTriggers.forEach(btn => btn.addEventListener('click', showModalHandler));
}

export default modal;
// export { escPressHandler };
export { openModal };
export { closeModal };
