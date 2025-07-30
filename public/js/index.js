/* eslint-disable */
import "core-js/stable";
import "regenerator-runtime/runtime";
import { login, logout, signup } from "./login.js";
import { updateSettings } from "./updateSettings.js";
import { bookTour } from "./stripe.js";
import { showAlert } from "./alerts.js";

// DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const bookBtn = document.getElementById('book-tour');


// Login form submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

// Signup form submission
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    const photoInput = document.getElementById("photo");
    if (photoInput && photoInput.files[0]) {
      form.append("photo", photoInput.files[0]);
    }
    updateSettings(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const saveBtn = document.querySelector(".btn--save-password");
    saveBtn.textContent = "Updating...";

    try {
      const passwordCurrent = document.getElementById("password-current").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById("password-confirm").value;

      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        "password"
      );

      saveBtn.textContent = "Save password";
      document.getElementById("password-current").value = "";
      document.getElementById("password").value = "";
      document.getElementById("password-confirm").value = "";
    } catch (err) {
      saveBtn.textContent = "Save password";
    }
  });

//Book tour button click event
if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector("body")?.dataset?.alert;
if (alertMessage) showAlert("success", alertMessage, 20);


const burgerMenu = document.querySelector('.burger-menu');
if (burgerMenu) {
  burgerMenu.addEventListener('click', () => {
    // Toggle .open class for animation
    burgerMenu.classList.toggle('open');
    // Toggle .nav--active for all navs
    document.querySelectorAll('.nav').forEach(nav => {
      nav.classList.toggle('nav--active');
    });
  });
}
