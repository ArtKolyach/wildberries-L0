
// ЛОГИКА КОРЗИНЫ

import { summary, changeCountsCosts, checkOrderSum, findSum, findGoodCounts, goodToStr } from './summary.js';

export function cart() {
  const favorites = document.querySelectorAll('.amount-info__favourite-button');

  const chooseAll = document.querySelector('#choose-all-checkbox');
  const chooseCheckbox = document.querySelectorAll('.available-item .real-checkbox');

  const buttonsExpand = document.querySelectorAll('.choose-all__fold-flag');
  const goodsWrappers = document.querySelectorAll('.item-wrapper');
  const chooseText = document.querySelector('.choose-all__text');
  const hiddenChooseText = document.querySelector('.hidden-choose-text');
  const labelCheckbox = document.querySelector('.choose-all_checkbox-block');
  const inputCheckbox = document.querySelector('#choose-all-checkbox');

  const countPlus = document.querySelectorAll('.counter__plus');
  const countMinus = document.querySelectorAll('.counter__minus');
  const countInputs = document.querySelectorAll('.counter__value');

  const unavailable = document.querySelector('.unavailable-goods__folding-header');

  favorites.forEach((favorite) => {
    favorite.addEventListener('click', (e) => {
      e.target.classList.toggle('favorite');

      e.target.classList.contains('favorite')
        ? e.target.closest('.amount-info__action-buttons').classList.add('added')
        : e.target.closest('.amount-info__action-buttons').classList.remove('added');
    });
  });

  function checkboxChange() {
    const chooseCheckbox = document.querySelectorAll('.available-item .real-checkbox');

    if (chooseAll.checked) {
      chooseCheckbox.forEach((checkbox) => {
        checkbox.checked = true;
        togglePicture(checkbox.checked, checkbox.dataset.number);
      });
    }

    if (!chooseAll.checked) {
      chooseCheckbox.forEach((checkbox) => {
        checkbox.checked = false;
        togglePicture(checkbox.checked, checkbox.dataset.number);
      });
    }

    showInfoDelivery([...chooseCheckbox]);
  }

  chooseAll.addEventListener('change', checkboxChange);
  chooseAll.addEventListener('change', checkOrderSum);
  chooseAll.addEventListener('change', findGoodCounts);

  chooseCheckbox.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      const inputArray = [...chooseCheckbox];

      showInfoDelivery(inputArray);

      chooseAll.checked = inputArray.every((item) => item.checked);
    });

    checkbox.addEventListener('change', summary);
    checkbox.addEventListener('change', () => togglePicture(checkbox.checked, index));
    checkbox.addEventListener('change', checkOrderSum);
  });

  // КНОПКИ РАЗВОРАЧИВАНИЯ БЛОКОВ КОРЗИНЫ
  buttonsExpand.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      const expandList = goodsWrappers[index];
      const totalCost = findSum();
      const totalCounts = findGoodCounts();

      const good = goodToStr('товар', totalCounts);

      expandList.classList.toggle('open');

      if (expandList.classList.contains('open')) {
        e.currentTarget.setAttribute('aria-expanded', true);
        e.currentTarget.style.transform = 'rotate(0deg)';

        if (expandList.closest('.unavailable-goods')) {
          unavailable.classList.remove('without-border');
        }

        expandList.setAttribute('aria-hidden', false);
        expandList.style.display = 'block';
      } else {
        e.currentTarget.setAttribute('aria-expanded', false);
        e.currentTarget.style.transform = 'rotate(-180deg)';

        if (expandList.closest('.unavailable-goods')) {
          unavailable.classList.add('without-border');
        }

        expandList.setAttribute('aria-hidden', true);
        expandList.style.display = 'none';
      }

      if (expandList.parentNode.classList.contains('available-goods') && !expandList.classList.contains('open')) {
        hiddenChooseText.textContent = `${totalCounts} ${good} · ${totalCost} сом`;

        labelCheckbox.style.display = 'none';
        chooseText.style.display = 'none';
      } else if (expandList.parentNode.classList.contains('available-goods') && expandList.classList.contains('open')) {
        hiddenChooseText.textContent = '';

        labelCheckbox.style.display = 'flex';
        chooseText.style.display = 'block';
      }
    });

    chooseText.addEventListener('click', (e) => {
      e.stopImmediatePropagation();

      inputCheckbox.checked = !inputCheckbox.checked;
      checkboxChange();
      summary();
      changeCountsCosts();
      checkOrderSum();
    });

    inputCheckbox.addEventListener('change', summary);
  });

  countPlus.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      const remainsNumber = button.closest('.available-item__amount-info').querySelector('.amount-info__items-left') ?? 999;
      let remainsNumberValue
      try {
        remainsNumberValue = remainsNumber.textContent.match(/\d/g).join('')
      }
      catch (err) {
        remainsNumberValue = null
      }

      if (!e.currentTarget.classList.contains('disabled')) {
        countInputs[index].value++;

        changePrice(countInputs[index]);
      }

      if (
        countInputs[index].value >= 999
          || (remainsNumberValue ?? remainsNumber) <= +countInputs[index].value && remainsNumber !== 999
      ) {
        button.classList.add('disabled');
      }

      if (countInputs[index].value <= 998) {
        countMinus[index].classList.remove('disabled');
      }

      const countItems = countInputs[index].value;

      changeDeliveryCounts(countItems, index);
      togglePicture(true, index);
      changeCountsCosts();
    });
  });

  countMinus.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      if (!e.currentTarget.classList.contains('disabled')) {
        countInputs[index].value--;

        changePrice(countInputs[index]);
      }

      if (countInputs[index].value <= 1) {
        button.classList.add('disabled');
        countPlus[index].classList.remove('disabled');
      }

      if (countInputs[index].value >= 2) {
        countMinus[index].classList.remove('disabled');
        countPlus[index].classList.remove('disabled');
      }

      const countItems = countInputs[index].value;

      changeDeliveryCounts(countItems, index);
      togglePicture(true, index);
      changeCountsCosts();
    });
  });

  function changePrice(input) {
    const goodCost = input.closest('.available-item').querySelector('.discounted-price__value');
    const prevGoodCost = input.closest('.available-item').querySelector('.original-price__value');
    const discountPercentage = input.closest('.available-item').querySelectorAll('.discont-percentage-tooltip');
    const discountPrice = input.closest('.available-item').querySelectorAll('.discont-price-tooltip');

    goodCost.textContent = +goodCost.dataset.price * +input.value;

    if (+goodCost.textContent > 999) {
      goodCost.closest('.discounted-price__value').classList.add('small-price');
    }

    if (+goodCost.textContent <= 999) {
      goodCost.closest('.discounted-price__value').classList.remove('small-price');
    }

    prevGoodCost.textContent = +prevGoodCost.dataset.price * +input.value;

   discountPercentage.forEach((discount, index) => {
      discount.textContent = ` ${(
        (((prevGoodCost.dataset.price - goodCost.dataset.price) / prevGoodCost.dataset.price) * 100) /
        2
      ).toFixed(1)}%`;

      discountPrice[index].textContent = (prevGoodCost.textContent - goodCost.textContent) / 2;
    });

    goodCost.textContent = `${goodCost.textContent
      .toString()
      .match(/\d{1,3}(?=(\d{3})*$)/g)
      .join(' ')} `;

    prevGoodCost.textContent = ` ${prevGoodCost.textContent
      .toString()
      .match(/\d{1,3}(?=(\d{3})*$)/g)
      .join(' ')} `;

    summary();
    checkOrderSum();
  }

  countInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      const remainsNumber = input.closest('.available-item__amount-info').querySelector('.amount-info__items-left') ?? 999;

      let remainsNumberValue
      try {
        remainsNumberValue = remainsNumber.textContent.match(/\d/g).join('')
      }
      catch (err) {
        remainsNumberValue = 999
      }

      if (input.value >= 999 || (remainsNumberValue <= +countInputs[index].value && remainsNumber !== 999)) {
        input.value = remainsNumberValue ?? remainsNumber;
        changePrice(input);

        countPlus[index].classList.add('disabled');
      } else {
        changePrice(input);

        countPlus[index].classList.remove('disabled');
      }

      if (input.value <= 1) {
        input.value = 1;
        changePrice(input);

        countMinus[index].classList.add('disabled');
      } else {
        changePrice(input);

        countMinus[index].classList.remove('disabled');
      }

      changeDeliveryCounts(countInputs[index].value, index);

      togglePicture(true, index);
    });

    changePrice(input);

    countInputs.forEach((item, index) => {
      changeDeliveryCounts(item.value, index);
      togglePicture(true, index);
    });
  });

  // ПОКАЗ ВЫБРАННЫХ ВЕЩЕЙ В БЛОКЕ ДОСТАВКИ
  function togglePicture(check, index) {
    const pictures = document.querySelectorAll(`[data-index='${index}']`);

    pictures.forEach((picture) => {
      const notification = picture.querySelector('.delivery-card__item-amount-indicator_value');

      if (!check) {
        picture.classList.add('hidden');

        if (!picture.closest('.delivery-card__delivery-interval').querySelector('.delivery-card__item:not(.hidden)')) {
          picture.closest('.delivery-card__delivery-interval').classList.add('hidden');
        }

        checkDeliveryDate();
      } else {
        picture.classList.remove('hidden');

        if (picture.closest('.delivery-card__delivery-interval').querySelector('.delivery-card__item')) {
          picture.closest('.delivery-card__delivery-interval').classList.remove('hidden');
        }

        if (+notification.textContent === 0) {
          picture.classList.add('hidden');

          if (!picture.closest('.delivery-card__delivery-interval').querySelector('.delivery-card__item:not(.hidden)')) {
            picture.closest('.delivery-card__delivery-interval').classList.add('hidden');
          }
        } else {
          picture.classList.remove('hidden');

          if (picture.closest('.delivery-card__delivery-interval').querySelector('.delivery-card__item')) {
            picture.closest('.delivery-card__delivery-interval').classList.remove('hidden');
          }
        }

        checkDeliveryDate();
      }
    });
  }

  // РАСЧЁТ ПРОМЕЖУТКА ДОСТАВКИ
  function checkDeliveryDate() {
    const deliveryDates = document.querySelectorAll('.delivery-card__delivery-interval:not(.hidden)');
    const asideDeliveryDate = document.querySelector('.delivery-info__date');
    let minDate = +Infinity;
    let maxDate = -Infinity;

    deliveryDates.forEach((deliveryDate) => {
      const deliveryCaption = deliveryDate.querySelector('.delivery-card__subtitle');

      if (+deliveryCaption.textContent[0] < minDate) {
        minDate = deliveryCaption.textContent[0];
      }

      if (+deliveryCaption.textContent[2] > maxDate) {
        maxDate = deliveryCaption.textContent[2];
      }

      const newDate = `${minDate}–${maxDate} фев`;

      asideDeliveryDate.textContent = newDate;
    });
  }

  // СМЕНА КОЛИЧЕСТВА ТОВАРОВ НА ИНДИКАТОРАХ БЛОКА ДОСТАВКИ
  function changeDeliveryCounts(countItems, index) {
    const pictures = document.querySelectorAll(`[data-index='${index}']`);

    let firstDateNotFull

    for (let i = 0; i < pictures.length; i++) {

      let notificationBlock = pictures[i].querySelector('.delivery-card__item-amount-indicator');
      let notificationValue = pictures[i].querySelector('.delivery-card__item-amount-indicator_value');
      let picturesWrapper = pictures[i].closest('.delivery-interval__items-container')
      let deliveryIntervalSection = picturesWrapper.closest('.delivery-card__delivery-interval')
      let picturesHidden = !Boolean(picturesWrapper.querySelectorAll('.delivery-interval__items-container > :not(.hidden)').length)

      if (firstDateNotFull) {
        countItems = 0
      }

      if (+notificationValue.dataset.max <= +countItems) {
        notificationValue.textContent = Math.min(countItems, notificationValue.dataset.max);

        (notificationValue.textContent < 2)
            ? notificationBlock.classList.add('hidden')
            : notificationBlock.classList.remove('hidden');
        picturesHidden
          ? notificationValue.closest('.delivery-card__delivery-interval').classList.add('hidden')
          : notificationValue.closest('.delivery-card__delivery-interval').classList.remove('hidden');

        countItems -= +notificationValue.dataset.max;
      } else {
        notificationValue.textContent = Math.min(countItems, notificationValue.dataset.max);

        notificationValue.textContent < 2
            ? notificationBlock.classList.add('hidden')
            : notificationBlock.classList.remove('hidden');
        picturesHidden
          ? notificationValue.closest('.delivery-card__delivery-interval').classList.add('hidden')
          : notificationValue.closest('.delivery-card__delivery-interval').classList.remove('hidden');

      }

      notificationValue.textContent < notificationValue.dataset.max
          ? firstDateNotFull = true
          : firstDateNotFull = false;

    }
  }
}
