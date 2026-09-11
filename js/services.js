/* Services — accordion + RIBA progress bar */
(function () {
  "use strict";

/* ---- FAQ Accordion ---- */

var items = document.querySelectorAll(".faq-item");

items.forEach(function (item) {

  var q = item.querySelector(".faq-q");
  var a = item.querySelector(".faq-a");

  /* Only the + / question area controls the answer */
  q.addEventListener("click", function () {

    var isOpen = item.classList.contains("open");

    /* Close all */
    items.forEach(function (it) {
      it.classList.remove("open");

      var answer = it.querySelector(".faq-a");
      answer.style.maxHeight = null;
    });

    /* Open clicked item */
    if (!isOpen) {
      item.classList.add("open");
      a.style.maxHeight = a.scrollHeight + "px";
    }

  });

});

  /* ---- RIBA progress bar fills on view ---- */
  var bar = document.getElementById("ribaBar");
  if (bar && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { bar.style.width = "100%"; io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    io.observe(bar);
  } else if (bar) {
    bar.style.width = "100%";
  }
})();
