import { cart } from './modules/cart.js';
import { formValidation } from './modules/formValidation.js';
import { modal } from './modules/modal.js';
import { summary } from './modules/summary.js';

window.addEventListener('DOMContentLoaded', () => {
  cart();
  summary();
  formValidation();
  modal();
});
