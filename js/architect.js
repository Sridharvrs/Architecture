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
   ARCHITECT DASHBOARD — interactions
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

  /* ---- Sidebar toggle ---- */
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
    notifBtn.addEventListener("click", function (e) { e.stopPropagation(); notifPanel.classList.toggle("open"); });
    document.addEventListener("click", function (e) { if (!notifPanel.contains(e.target) && e.target !== notifBtn) notifPanel.classList.remove("open"); });
  }

  /* ---- Today tasks toggle ---- */
  document.querySelectorAll(".tt-row input").forEach(function (cb) {
    cb.addEventListener("change", function () {
      var text = cb.nextElementSibling;
      if (text) text.classList.toggle("done", cb.checked);
    });
  });

  /* ---- Project filtering ---- */
  var projSearch = document.getElementById("projSearch");
  var projStage = document.getElementById("projStageFilter");
  var projRows = document.querySelectorAll(".prt-row");
  function filterProjects() {
    var q = (projSearch ? projSearch.value.toLowerCase() : "");
    var s = (projStage ? projStage.value : "all");
    projRows.forEach(function (row) {
      var name = row.getAttribute("data-name") || "";
      var stage = row.getAttribute("data-stage") || "";
      var matchQ = !q || name.indexOf(q) > -1;
      var matchS = s === "all" || stage === s;
      row.classList.toggle("hidden", !(matchQ && matchS));
    });
  }
  if (projSearch) projSearch.addEventListener("input", filterProjects);
  if (projStage) projStage.addEventListener("change", filterProjects);

  /* ---- Kanban drag and drop ---- */
  var cards = document.querySelectorAll(".kb-card");
  var cols = document.querySelectorAll(".kb-col");
  var dragged = null;
  cards.forEach(function (card) {
    card.addEventListener("dragstart", function (e) {
      dragged = card;
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    card.addEventListener("dragend", function () {
      card.classList.remove("dragging");
      cols.forEach(function (c) { c.classList.remove("drag-over"); });
      updateCounts();
      dragged = null;
    });
  });
  cols.forEach(function (col) {
    var drop = col.querySelector(".kb-cards");
    col.addEventListener("dragover", function (e) { e.preventDefault(); col.classList.add("drag-over"); });
    col.addEventListener("dragleave", function () { col.classList.remove("drag-over"); });
    col.addEventListener("drop", function (e) {
      e.preventDefault();
      col.classList.remove("drag-over");
      if (dragged && drop) drop.appendChild(dragged);
    });
  });
  function updateCounts() {
    cols.forEach(function (col) {
      var count = col.querySelectorAll(".kb-card").length;
      var i = col.querySelector(".kb-col-head i");
      if (i) i.textContent = count;
    });
  }

  /* ---- Logout confirm ---- */
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", function (e) { if (!confirm("Log out of the architect workspace?")) e.preventDefault(); });

  window.Atelier = window.Atelier || {};
})();
