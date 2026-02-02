// days.js — navigation across Valentine week pages
// Put this file in the same folder as your day html files.

const ORDER = [
  "rose.html",
  "propose.html",
  "chocolate.html",
  "teddy.html",
  "promise.html",
  "hug.html",
  "kiss.html",
  "valentine.html"
];

function currentFile() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1) || "rose.html";
}

function goTo(file) {
  // Keep relative navigation working on GitHub Pages
  const base = window.location.pathname.replace(/[^/]+$/, "");
  window.location.href = base + file;
}

function setupNav() {
  const file = currentFile();
  const idx = ORDER.indexOf(file);

  document.querySelectorAll("[data-nav='back']").forEach(btn => {
    btn.addEventListener("click", () => {
      const prev = ORDER[Math.max(0, idx - 1)];
      goTo(prev);
    });
  });

  document.querySelectorAll("[data-nav='next']").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = ORDER[Math.min(ORDER.length - 1, idx + 1)];
      goTo(next);
    });
  });

  // Keyboard arrows
  window.addEventListener("keydown", (e) => {
    if (idx === -1) return;
    if (e.key === "ArrowLeft") goTo(ORDER[Math.max(0, idx - 1)]);
    if (e.key === "ArrowRight") goTo(ORDER[Math.min(ORDER.length - 1, idx + 1)]);
  });
}

document.addEventListener("DOMContentLoaded", setupNav);
