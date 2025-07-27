import axios from 'axios';
import { showAlert } from "./alerts.js";

export async function login(email, password) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response?.data?.message || "An error occurred.");
  }
}

export async function logout() {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") window.location.assign("/");
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
}

export async function signup(name, email, password, passwordConfirm) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Signed up successfully!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response?.data?.message || "An error occurred during signup.");
  }
}
