/* ============================================================
   PROJECTS — filter behaviour
   ============================================================ */
(function () {
  "use strict";
  var tabs = document.querySelectorAll(".ftab");
  var cards = document.querySelectorAll(".m-card");
  var countEl = document.getElementById("fCount");
  if (!tabs.length || !cards.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      var f = tab.getAttribute("data-filter");
      var shown = 0;
      cards.forEach(function (card) {
        var match = f === "all" || card.getAttribute("data-cat") === f;
        if (match) {
          card.classList.remove("hidden");
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "fadeUp .5s var(--ease) forwards";
          shown++;
        } else {
          card.classList.add("hidden");
        }
      });
      if (countEl) countEl.textContent = shown;
    });
  });
})();
