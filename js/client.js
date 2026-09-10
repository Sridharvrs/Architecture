document.addEventListener("DOMContentLoaded", () => {

    const currentUser = JSON.parse(
        sessionStorage.getItem("atelierNoirCurrentUser")
    );

    if (!currentUser) {
        return;
    }

    /* =========================================
       DYNAMIC PROFILE NAME
    ========================================= */

    document.querySelectorAll(".profileName").forEach(element => {
        element.textContent = currentUser.name;
    });


    /* =========================================
       DYNAMIC AVATAR LETTER
    ========================================= */

    const firstLetter = currentUser.name
        ? currentUser.name.trim().charAt(0).toUpperCase()
        : "?";

    document.querySelectorAll(".avatarLetter").forEach(element => {
        element.textContent = firstLetter;
    });

});

/* ============================================================
   CLIENT DASHBOARD — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Module switching ---- */
  var links = document.querySelectorAll(".sb-link");
  var modules = document.querySelectorAll(".module");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      var target = link.getAttribute("data-module");
      links.forEach(function (l) { l.classList.remove("active"); });
      link.classList.add("active");
      modules.forEach(function (m) { m.classList.remove("active"); });
      var el = document.getElementById("m-" + target);
      if (el) el.classList.add("active");
      closeSidebar();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ---- Sidebar toggle (mobile) ---- */
  var toggle = document.getElementById("sidebarToggle");
  var sidebar = document.getElementById("dashSidebar");
  var backdrop = document.getElementById("sidebarBackdrop");
  function openSidebar() { sidebar.classList.add("open"); backdrop.classList.add("open"); toggle.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeSidebar() { sidebar.classList.remove("open"); backdrop.classList.remove("open"); toggle.classList.remove("open"); document.body.style.overflow = ""; }
  if (toggle) toggle.addEventListener("click", function () { sidebar.classList.contains("open") ? closeSidebar() : openSidebar(); });
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  /* ---- Notifications ---- */
  var notifBtn = document.getElementById("notifBtn");
  var notifPanel = document.getElementById("notifPanel");
  if (notifBtn && notifPanel) {
    notifBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      notifPanel.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!notifPanel.contains(e.target) && e.target !== notifBtn) notifPanel.classList.remove("open");
    });
  }

  /* ---- Today's date ---- */
  var dateEl = document.getElementById("todayDate");
  if (dateEl) {
    var d = new Date();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    dateEl.textContent = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  /* ---- Drawings filter ---- */
  var dfBtns = document.querySelectorAll(".df-btn");
  var drawCards = document.querySelectorAll(".draw-card");
  dfBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      dfBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-dfilter");
      drawCards.forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-dtype") === f;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---- Approvals ---- */
  document.querySelectorAll(".appr-yes:not([disabled])").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.textContent = "Approved";
      btn.classList.add("appr-done");
      btn.disabled = true;
      var no = btn.nextElementSibling;
      if (no) { no.disabled = true; }
    });
  });

  /* ---- Message threads ---- */
  var threads = document.querySelectorAll(".msg-thread");
  var mcHead = document.querySelector(".mc-head");
  var mcBody = document.getElementById("mcBody");
  var threadData = {
    iris: { initials: "IC", name: "Iris Calloway", role: "Founding Partner · online", color: "#c8693a" },
    sana: { initials: "SO", name: "Sana Okafor", role: "Associate, Interiors · online", color: "#2f6f6a" },
    studio: { initials: "AN", name: "Studio admin", role: "Atelier Noir · away", color: "#8a8275" }
  };
  threads.forEach(function (t) {
    t.addEventListener("click", function () {
      threads.forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      var key = t.getAttribute("data-thread");
      var info = threadData[key];
      if (!info || !mcHead) return;
      var av = mcHead.querySelector(".mc-avatar");
      av.textContent = info.initials;
      av.style.background = info.color;
      mcHead.querySelector("b").textContent = info.name;
      mcHead.querySelector("i").textContent = info.role;
      if (mcBody) { mcBody.scrollTop = mcBody.scrollHeight; }
    });
  });

  /* ---- Send message ---- */
  var mcForm = document.getElementById("mcForm");
  var mcInput = document.getElementById("mcInput");
  if (mcForm && mcInput && mcBody) {
    mcForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var txt = mcInput.value.trim();
      if (!txt) return;
      var msg = document.createElement("div");
      msg.className = "mc-msg out";
      var time = new Date();
      var hh = String(time.getHours()).padStart(2, "0");
      var mm = String(time.getMinutes()).padStart(2, "0");
      msg.innerHTML = '<div class="mc-bubble">' + escapeHtml(txt) + '</div><span class="mc-time">' + hh + ":" + mm + "</span>";
      mcBody.appendChild(msg);
      mcInput.value = "";
      mcBody.scrollTop = mcBody.scrollHeight;
    });
  }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, function (c) { return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]; }); }

  /* ---- Logout confirmation ---- */
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      if (!confirm("Log out of your client portal?")) e.preventDefault();
    });
  }

  /* keep theme.js mobile menu from conflicting */
  window.Atelier = window.Atelier || {};
})();
