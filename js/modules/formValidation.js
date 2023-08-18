
// ПРОВЕРКА ИНПУТОВ

export function formValidation() {
  const formInputs = document.querySelectorAll('.input-form-receiver');
  const orderButton = document.querySelector('#order-button');

  const nameInput = document.querySelector('#name-input-form');
  const surnameInput = document.querySelector('#surname-input-form');
  const emailInput = document.querySelector('#email-input-form');
  const telInput = document.querySelector('#phone-input-form');
  const innInput = document.querySelector('#inn-input-form');

  function focused(e) {
    e.currentTarget.classList.add('focused');

    if (!e.currentTarget.value) {
      e.currentTarget.classList.remove('focused');
    }
  }

  nameInput.addEventListener('change', (e) => {
    focused(e);

    const errorElem = e.currentTarget.closest('.input-form-container').querySelector('.input-form-error');
    e.currentTarget.parentNode.classList.remove('error-form-input');
    errorElem.classList.add('hidden');

    e.currentTarget.parentNode.classList.remove('error-form-input');
  });

  surnameInput.addEventListener('change', (e) => {
    focused(e);

    const errorElem = e.currentTarget.closest('.input-form-container').querySelector('.input-form-error');
    e.currentTarget.parentNode.classList.remove('error-form-input');
    errorElem.classList.add('hidden');

    e.currentTarget.parentNode.classList.remove('error-form-input');
  });

  emailInput.addEventListener('change', (e) => {
    focused(e);

    const errorElem = e.currentTarget.closest('.input-form-container').querySelector('.input-form-error');

    if (!e.currentTarget.value || e.currentTarget.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      e.currentTarget.parentNode.classList.remove('error-form-input');

      errorElem.classList.add('hidden');
    } else if (!e.currentTarget.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      errorElem.textContent = errorElem.dataset.error;
      errorElem.classList.remove('hidden');

      e.currentTarget.parentNode.classList.add('error-form-input');
    }
  });

  telInput.addEventListener('change', (e) => {
    focused(e);

    const errorElem = e.currentTarget.closest('.input-form-container').querySelector('.input-form-error');

    if (!e.currentTarget.value || e.currentTarget.value.match(/\+\d \d{3} \d{3}-\d{2}-\d{2}/)) {
      e.currentTarget.parentNode.classList.remove('error-form-input');

      errorElem.classList.add('hidden');
    } else if (!e.currentTarget.value.match(/\+\d \d{3} \d{3} \d{2} \d{2}/)) {
      errorElem.textContent = errorElem.dataset.error;
      errorElem.classList.remove('hidden');

      e.currentTarget.parentNode.classList.add('error-form-input');
    }
  });

  telInput.addEventListener('input', function () {
    if (this.value.length > 30) {
      this.value = this.value.slice(0, 30)
    }

    this.value = formatTel(this.value)
  });

  function formatTel (value) {
    if (!value) return value;

    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;
    let formattedNumber = '';

    if (phoneNumberLength > 0) formattedNumber += `+${phoneNumber.slice(0,1)}`;
    if (phoneNumberLength > 1) formattedNumber += ` ${phoneNumber.slice(1,4)}`;
    if (phoneNumberLength > 4) formattedNumber += ` ${phoneNumber.slice(4,7)}`;
    if (phoneNumberLength > 7) formattedNumber += `-${phoneNumber.slice(7,9)}`;
    if (phoneNumberLength > 9) formattedNumber += `-${phoneNumber.slice(9)}`;

    return formattedNumber;
  }

  innInput.addEventListener('change', (e) => {
    focused(e);

    const errorElem = e.currentTarget.closest('.input-form-container').querySelector('.input-form-error');
    const purposeElem = document.querySelector('#inn-input-tip');

    if (!e.currentTarget.value || e.currentTarget.value.length === 14) {
      e.currentTarget.parentNode.classList.remove('error-form-input');

      errorElem.classList.add('hidden');
      purposeElem.classList.remove('hidden')
    } else if (e.currentTarget.value.length !== 14) {
      errorElem.textContent = errorElem.dataset.error;
      purposeElem.classList.add('hidden');
      errorElem.classList.remove('hidden');

      e.currentTarget.parentNode.classList.add('error-form-input');
    }
  });

  innInput.addEventListener('input', function () {
    this.value = formatInn(this.value)
  });

  function formatInn (value) {
    let formattedInn = value.replace(/\D/g, '');

    if (!formattedInn) return ''

    if (formattedInn.length > 14) {
      formattedInn = formattedInn.slice(0, 14);
    }

    return formattedInn
  }

  orderButton.addEventListener('click', () => {
    formInputs.forEach((input) => {
      if (!input.value && input.closest('.input-form-container').querySelector('.hidden')) {
        const errorElem = input.closest('.input-form-container').querySelector('.hidden');

        errorElem.textContent = errorElem.dataset.empty;
        errorElem.classList.remove('hidden');

        const purposeElem = document.querySelector('#inn-input-tip');
        purposeElem.classList.add('hidden');

        input.closest('.input-form-block').classList.add('error-form-input');
      }
    });
  });
}
