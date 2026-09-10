/* Services — accordion + RIBA progress bar */
(function () {
  "use strict";

  /* ---- Accordion ---- */
  var items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      items.forEach(function (it) {
        it.classList.remove("open");
        it.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
  // open first by default
  if (items.length) {
    items[0].classList.add("open");
    var firstA = items[0].querySelector(".faq-a");
    firstA.style.maxHeight = firstA.scrollHeight + "px";
  }

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
