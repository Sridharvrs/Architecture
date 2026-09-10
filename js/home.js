/* ============================================================
   HOME — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Count-up stats ---- */
  var stats = document.querySelectorAll(".stat strong[data-count]");
  function runCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var cur = 0;
    var dur = 1600;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window && stats.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    stats.forEach(function (el) { io.observe(el); });
  } else {
    stats.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* ---- Testimonial carousel ---- */
  var track = document.getElementById("quoteTrack");
  if (track) {
    var slides = Array.prototype.slice.call(track.querySelectorAll(".quote"));
    var dotsWrap = document.getElementById("qDots");
    var prev = document.querySelector(".q-prev");
    var next = document.querySelector(".q-next");
    var idx = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      if (i === 0) b.classList.add("active");
      b.setAttribute("aria-label", "Go to quote " + (i + 1));
      b.addEventListener("click", function () { go(i); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      track.classList.add("has-active");
      dots.forEach(function (d, i) { d.classList.toggle("active", i === idx); });
      track.style.transform = "translateX(" + (-idx * 100) + "%";
    }
    function nextSlide() { go(idx + 1); }
    function prevSlide() { go(idx - 1); }
    function reset() { clearInterval(timer); timer = setInterval(nextSlide, 6000); }

    next.addEventListener("click", function () { nextSlide(); reset(); });
    prev.addEventListener("click", function () { prevSlide(); reset(); });

    track.style.display = "flex";
    track.style.transition = "transform .6s cubic-bezier(0.22,1,0.36,1)";
    slides[0].classList.add("is-active");
    track.classList.add("has-active");
    reset();
  }
})();
