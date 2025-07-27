/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
export const showAlert = (type = 'success', msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  if (document.body) {
    document.body.insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  }
};
