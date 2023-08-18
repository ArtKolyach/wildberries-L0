
// ПОДСЧЁТ ОБЩЕЙ СТОИМОСТИ

export function summary() {
  const summaryCheck = document.querySelector('#check-to-pay__real-checkbox');

  changeCountsCosts();

  summaryCheck.addEventListener('change', checkOrderSum);
}

export function changeCountsCosts() {
  const asideCounts = document.querySelector('.total-amount-and-sum__amount-number');
  const totalPrice = document.querySelector('.title-sum__value');
  const asidePrice = document.querySelector('.total-amount-and-sum__sum-value');
  const asideDiscount = document.querySelector('.total-discount__sum-value');

  const totalCost = findSum();
  const totalPrevCost = findPrevSum();
  const totalCounts = findGoodCounts();
  const good = goodToStr('товар', totalCounts);

  const diffDiscount = totalPrevCost.replace(/\s/g, '') - totalCost.replace(/\s/g, '');
  const formatedDiffDiscount = diffDiscount
    .toString()
    .match(/\d{1,3}(?=(\d{3})*$)/g)
    .join(' ');

  totalPrice.textContent = `${totalCost}`;
  asideCounts.textContent = `${totalCounts} ${good}`;
  asidePrice.textContent = `${totalPrevCost}`;
  asideDiscount.textContent = `−${formatedDiffDiscount}`;
}

export function checkOrderSum() {
  const summaryCheck = document.querySelector('#check-to-pay__real-checkbox');
  const buttonOrder = document.querySelector('.custom-button');
  const asidePaymentInfo = document.querySelectorAll('.pay-now-block__description');

  const totalCost = findSum();

  changeCountsCosts();

  if (summaryCheck.checked) {
    buttonOrder.value = `Оплатить ${totalCost} сом`;

    asidePaymentInfo.forEach((paymentBlock) => {
      paymentBlock.classList.add('hidden');
    });
  } else {
    buttonOrder.value = 'Заказать';

    asidePaymentInfo.forEach((paymentBlock) => {
      paymentBlock.classList.remove('hidden');
    });
  }
}

export function findSum() {
  const goodsPrice = document.querySelectorAll('.discounted-price__value');
  const chooseCheckbox = document.querySelectorAll('.available-item .real-checkbox');

  let totalCost = 0;

  goodsPrice.forEach((item, index) => {
    const itemPrice = item.textContent.replace(/\s/g, '');

    if (chooseCheckbox[index].checked) {
      totalCost += +itemPrice;
    }
  });

  const formatedTotalCost = totalCost
    .toString()
    .match(/\d{1,3}(?=(\d{3})*$)/g)
    .join(' ');

  return formatedTotalCost;
}

function findPrevSum() {
  const goodsPrevPrice = document.querySelectorAll('.original-price__value');
  const chooseCheckbox = document.querySelectorAll('.available-item .real-checkbox');

  let prevTotalCost = 0;

  goodsPrevPrice.forEach((item, index) => {
    const itemCounts = item.textContent.replace(/\s/g, '');

    if (chooseCheckbox[index].checked) {
      prevTotalCost += +itemCounts;
    }
  });

  const formatedTotalCost = prevTotalCost
    .toString()
    .match(/\d{1,3}(?=(\d{3})*$)/g)
    .join(' ');

  return formatedTotalCost;
}

export function findGoodCounts() {
  const chooseCheckbox = document.querySelectorAll('.available-item .real-checkbox');
  const countInputs = document.querySelectorAll('.counter__value');

  let totalCounts = 0;

  countInputs.forEach((item, index) => {
    if (chooseCheckbox[index].checked) {
      totalCounts += +item.value;
    }
  });

  const formatedTotalCounts = totalCounts
    .toString()
    .match(/\d{1,3}(?=(\d{3})*$)/g)
    .join(' ');

  return formatedTotalCounts;
}

export function goodToStr(good, totalCounts) {
  let goodString = good;

  switch (totalCounts % 10) {
    case 2:
    case 3:
    case 4: {
      goodString = `${good}а`;
      break;
    }
    default: {
      goodString = `${good}ов`;
    }
  }

  return goodString;
}
