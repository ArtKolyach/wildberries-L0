
// ЛОГИКА ОКОН ДОСТАВКИ И ОПЛАТЫ

export function modal() {
  const modals = document.querySelectorAll('.modal');
  const btnCloseModal = document.querySelectorAll('[data-close]');
  const addressModalBtns = document.querySelectorAll('.address-button');
  const paycardModalBtns = document.querySelectorAll('.paycard-button');

  const deliveryCaption = document.querySelector('.delivery-card__subtitle');
  const asideSectionCaption = document.querySelector('.delivery-info__title');

  const chooseAddressBtn = document.querySelector('#choose-address');
  const chooseCardBtn = document.querySelector('#choose-card');

  const addressChooseBtns = document.querySelectorAll('.modal-button');

  addressChooseBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const modalAddresses = document.querySelectorAll('.modal-address');
      const modalIssues = document.querySelectorAll('.modal-issue');

      addressChooseBtns.forEach((button) => {
        button.classList.remove('chosen-button');
      });

      button.classList.add('chosen-button');

      if (button.classList.contains('choose-delivery-courier')) {
        modalAddresses.forEach((address) => {
          address.classList.remove('hidden');
        });
        modalIssues.forEach((issue) => {
          issue.classList.add('hidden');
        });
      } else {
        modalAddresses.forEach((address) => {
          address.classList.add('hidden');
        });
        modalIssues.forEach((issue) => {
          issue.classList.remove('hidden');
        });
      }
    });
  });

  addressModalBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const modalAddress = document.querySelector('.modal-delivery');

      modalAddress.classList.remove('hidden');
    });
  });

  paycardModalBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const modalAddress = document.querySelector('.modal-payment');

      modalAddress.classList.remove('hidden');
    });
  });

  btnCloseModal.forEach((button) => {
    button.addEventListener('click', () => {
      modals.forEach((modal) => {
        closeModal(modal);
      });
    });
  });

  function closeModal(modalSelector) {
    modalSelector.classList.add('hidden');
  }

  chooseAddressBtn.addEventListener('click', () => {
    const checkedInputAddresses = document.querySelectorAll('.modal-address input');
    const checkedInputIssues = document.querySelectorAll('.modal-issue input');

    const chosenDeliveryAddresses = document.querySelectorAll('.delivery-address');
    const chosenDeliveryStars = document.querySelectorAll('.delivery-star-text');
    const chosenDeliveryRates = document.querySelectorAll('.delivery-point__rating-number');

    checkedInputAddresses.forEach((button) => {
      if (!button.checked) return;

      const chooseDeliveryCourierBtn = document.querySelector('.choose-delivery-courier');

      if (chooseDeliveryCourierBtn.classList.contains('chosen-button')) {
        const deliveryAddress = button.closest('.modal-address').querySelector('.modal-card-courier');

        chosenDeliveryAddresses.forEach((chosenDeliveryAddress) => {
          chosenDeliveryAddress.textContent = deliveryAddress.textContent;
        });

        chosenDeliveryStars.forEach((chosenDeliveryStar) => {
          chosenDeliveryStar.textContent = '';
        });

        chosenDeliveryRates.forEach((chosenDeliveryRate) => {
          chosenDeliveryRate.textContent = '';
        });

        deliveryCaption.textContent = 'Курьером';
        asideSectionCaption.textContent = 'Доставка курьером';

        modals.forEach((modal) => {
          closeModal(modal);
        });
      }
    });

    checkedInputIssues.forEach((button) => {
      if (!button.checked) return;

      const chooseDeliveryIssueBtn = document.querySelector('.choose-delivery-issue');

      if (chooseDeliveryIssueBtn.classList.contains('chosen-button')) {
        const deliveryAddress = button.closest('.modal-issue').querySelector('.modal-text-address');
        const deliveryStar = button.closest('.modal-issue').querySelector('.delivery-star');
        const deliveryRate = button.closest('.modal-issue').querySelector('.delivery-rate');

        chosenDeliveryAddresses.forEach((chosenDeliveryAddress) => {
          chosenDeliveryAddress.textContent = deliveryAddress.textContent;
        });

        chosenDeliveryStars.forEach((chosenDeliveryStar) => {
          chosenDeliveryStar.textContent = deliveryStar.textContent;
        });

        chosenDeliveryRates.forEach((chosenDeliveryRate) => {
          chosenDeliveryRate.textContent = deliveryRate?.textContent ?? '';
        });

        deliveryCaption.textContent = 'Пункт выдачи';
        asideSectionCaption.textContent = 'Доставка в пункт выдачи';

        modals.forEach((modal) => {
          closeModal(modal);
        });
      }
    });
  });

  chooseCardBtn.addEventListener('click', () => {
    const checkedInput = document.querySelectorAll('.modal-card input');

    checkedInput.forEach((button) => {
      if (!button.checked) return;

      const chosenPaycardIcons = document.querySelectorAll('.chosen-paycard-icon');
      const chosenPaycardNumbers = document.querySelectorAll('.chosen-paycard-number');

      const paycardIcon = button.closest('.modal-card').querySelector('.modal-paycard-icon');
      const paycardNumber = button.closest('.modal-card').querySelector('.modal-paycard-number');

      chosenPaycardIcons.forEach((chosenPaycardIcon) => {
        chosenPaycardIcon.src = paycardIcon.src;
      });

      chosenPaycardNumbers.forEach((chosenPaycardNumber) => {
        chosenPaycardNumber.textContent = paycardNumber.textContent;
      });

      modals.forEach((modal) => {
        closeModal(modal);
      });
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', function (event) {
      const target = event.target;

      if (target && target === this) {
        closeModal(modal);
      }
    });
  });

}
