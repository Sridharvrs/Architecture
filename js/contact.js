/* Contact — form validation + map pin float */
(function () {
  "use strict";
  var form = document.getElementById("enquiryForm");
  var status = document.getElementById("fStatus");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "f-status";
    status.textContent = "";

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var type = form.type.value;
    var msg = form.message.value.trim();
    var consent = form.consent.checked;

    if (!name || !email || !type || !msg || !consent) {
      status.className = "f-status err";
      status.textContent = "Please complete the required fields and confirm consent.";
      return;
    }
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      status.className = "f-status err";
      status.textContent = "That email address doesn't look right.";
      return;
    }
    status.className = "f-status ok";
    status.textContent = "Thank you, " + name + " — your enquiry is on its way. We reply within two working days.";
    form.reset();
  });
})();
