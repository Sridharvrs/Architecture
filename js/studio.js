/* Studio page — timeline dot reveal on scroll */
(function () {
  "use strict";
  var items = document.querySelectorAll(".tl-item");
  if (!items.length || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.style.opacity = 1;
        en.target.style.transform = "translateX(0)";
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.3 });
  items.forEach(function (el, i) {
    el.style.opacity = 0;
    el.style.transform = "translateX(-24px)";
    el.style.transition = "opacity .7s cubic-bezier(0.22,1,0.36,1) " + (i * 0.08) + "s, transform .7s cubic-bezier(0.22,1,0.36,1) " + (i * 0.08) + "s";
    io.observe(el);
  });
})();
