/* ==========================================================================
   login.js — Atelier Noir Client Portal
   Role selection, validation, session storage, login feedback & redirects
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================
     ELEMENTS
  ========================================= */

  const loginForm = document.getElementById("loginForm");
  const roleButtons = document.querySelectorAll(".role");
  const loginStatus = document.getElementById("lfStatus");

  if (!loginForm) return;

  const email = loginForm.querySelector('input[name="email"]');
  const password = loginForm.querySelector('input[name="password"]');

  const rememberDevice = loginForm.querySelector(
    'input[name="remember"]'
  );

  const passToggle = document.getElementById("pwToggle");
  const roleLabel = document.getElementById("roleLabel");

  const forgotLink = document.querySelector(".lf-link");


  /* =========================================
     PASSWORD SHOW / HIDE
  ========================================= */

  if (passToggle && password) {

    passToggle.addEventListener("click", () => {

      if (password.type === "password") {

        password.type = "text";

        passToggle.textContent = "HIDE";

        passToggle.setAttribute(
          "aria-label",
          "Hide password"
        );

      } else {

        password.type = "password";

        passToggle.textContent = "SHOW";

        passToggle.setAttribute(
          "aria-label",
          "Show password"
        );

      }

    });

  }


  /* =========================================
     EMAIL VALIDATION
  ========================================= */

  function validateEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  }


  /* =========================================
     PASSWORD VALIDATION

     Minimum:
     8 characters
     1 uppercase
     1 lowercase
     1 number
     1 special character
  ========================================= */

  function validatePassword(value) {

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=])[A-Za-z\d@$!%*?&^#()_+\-=]{8,}$/;

    return passwordRegex.test(value);

  }


  /* =========================================
     SHOW FIELD ERROR
  ========================================= */

  function showFieldError(field) {

    if (!field) return;

    const wrapper = field.closest(".lf-field");

    if (wrapper) {

      wrapper.classList.add("invalid");

    }

  }


  /* =========================================
     REMOVE FIELD ERROR
  ========================================= */

  function clearFieldError(field) {

    if (!field) return;

    const wrapper = field.closest(".lf-field");

    if (wrapper) {

      wrapper.classList.remove("invalid");

    }

  }


  /* =========================================
     CLEAR STATUS MESSAGE
  ========================================= */

  function clearStatus() {

    if (!loginStatus) return;

    loginStatus.textContent = "";

    loginStatus.removeAttribute("style");

  }


  /* =========================================
     CLEAR ERRORS WHEN USER TYPES
  ========================================= */

  if (email) {

    email.addEventListener("input", () => {

      clearFieldError(email);

      clearStatus();

    });

  }


  if (password) {

    password.addEventListener("input", () => {

      clearFieldError(password);

      clearStatus();

    });

  }


  /* =========================================
     ROLE SELECTOR
  ========================================= */

  let selectedRole = "client";


  roleButtons.forEach((button) => {

    button.addEventListener("click", () => {

      /* Remove active state */

      roleButtons.forEach((item) => {

        item.classList.remove("active");

        item.setAttribute(
          "aria-selected",
          "false"
        );

      });


      /* Add active state */

      button.classList.add("active");

      button.setAttribute(
        "aria-selected",
        "true"
      );


      /* Get selected role */

      selectedRole =
        button.dataset.role || "client";


      /* Update button text */

      if (roleLabel) {

        roleLabel.textContent =
          selectedRole === "client"
            ? "Client"
            : "Architect";

      }


      /* Clear previous status */

      clearStatus();

    });

  });


  /* =========================================
     FORGOT PASSWORD
  ========================================= */

  if (forgotLink) {

    forgotLink.addEventListener("click", (e) => {

      e.preventDefault();

      if (!loginStatus) return;

      loginStatus.style.color = "var(--accent)";

      loginStatus.textContent =
        "Password reset is available through the Atelier Noir portal.";

    });

  }


  /* =========================================
     LOGIN FORM SUBMIT
  ========================================= */

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();


    /* Clear previous errors */

    clearFieldError(email);

    clearFieldError(password);

    clearStatus();


    /* Get values */

    const emailValue = email
      ? email.value.trim()
      : "";

    const passwordValue = password
      ? password.value
      : "";


    let valid = true;


    /* =====================================
       EMAIL VALIDATION
    ===================================== */

    if (
      !emailValue ||
      !validateEmail(emailValue)
    ) {

      showFieldError(email);

      valid = false;

    }


    /* =====================================
       PASSWORD EMPTY
    ===================================== */

    if (passwordValue === "") {

      showFieldError(password);

      valid = false;

    }


    /* =====================================
       PASSWORD FORMAT
    ===================================== */

    else if (!validatePassword(passwordValue)) {

      showFieldError(password);

      valid = false;

    }


    /* =====================================
       STOP IF INVALID
    ===================================== */

    if (!valid) {

      if (loginStatus) {

        loginStatus.style.color = "#c94b43";

        loginStatus.textContent =
          "Please enter a valid email and password.";

      }

      return;

    }


    /* =====================================
       SUBMIT BUTTON
    ===================================== */

    const submitBtn =
      loginForm.querySelector(
        'button[type="submit"]'
      );


    if (!submitBtn) return;


    const originalHTML =
      submitBtn.innerHTML;


    /* Loading state */

    submitBtn.disabled = true;

    submitBtn.classList.add("loading");

    submitBtn.innerHTML = `
      <span>Signing in...</span>
      <strong class="login-spinner"></strong>
    `;


    /* =====================================
       LOGIN PROCESS
    ===================================== */

    setTimeout(() => {


      /* =====================================
         CREATE CURRENT USER
      ===================================== */

      const currentUser = {

        name: emailValue.split("@")[0],

        email: emailValue,

        role:
          selectedRole === "client"
            ? "Client"
            : "Architect"

      };


      /* =====================================
         REMEMBER DEVICE
         Demo only — stores a flag locally
      ===================================== */

      if (rememberDevice) {

        if (rememberDevice.checked) {

          localStorage.setItem(
            "atelierNoirRememberDevice",
            "true"
          );

        } else {

          localStorage.removeItem(
            "atelierNoirRememberDevice"
          );

        }

      }


      /* =====================================
         SAVE SESSION
      ===================================== */

      sessionStorage.setItem(
        "atelierNoirCurrentUser",
        JSON.stringify(currentUser)
      );


      /* =====================================
         SUCCESS MESSAGE
      ===================================== */

      if (loginStatus) {

        loginStatus.style.color =
          "var(--teal)";

        loginStatus.textContent =
          `Welcome back. Signed in as ${currentUser.role}.`;

      }


      /* =====================================
         RESET BUTTON
      ===================================== */

      submitBtn.classList.remove("loading");

      submitBtn.innerHTML = originalHTML;

      submitBtn.disabled = false;


      /* =====================================
         REDIRECT
      ===================================== */

      setTimeout(() => {

        if (selectedRole === "client") {

          window.location.href =
            "client-dashboard.html";

        } else {

          window.location.href =
            "architect-dashboard.html";

        }

      }, 1000);


    }, 1200);

  });


  /* =========================================
     RESET LOGIN PAGE ON BACK / FORWARD
  ========================================= */

  window.addEventListener("pageshow", () => {


    /* Reset form */

    loginForm.reset();


    /* Reset email */

    if (email) {

      email.value = "";

    }


    /* Reset password */

    if (password) {

      password.value = "";

      password.type = "password";

    }


    /* Reset password toggle */

    if (passToggle) {

      passToggle.textContent = "SHOW";

      passToggle.setAttribute(
        "aria-label",
        "Show password"
      );

    }


    /* Clear status */

    clearStatus();


    /* Reset role buttons */

    roleButtons.forEach((button, index) => {

      const isFirst = index === 0;

      button.classList.toggle(
        "active",
        isFirst
      );

      button.setAttribute(
        "aria-selected",
        isFirst ? "true" : "false"
      );

    });


    /* Default role */

    selectedRole = "client";


    /* Reset button label */

    if (roleLabel) {

      roleLabel.textContent = "Client";

    }

  });

});