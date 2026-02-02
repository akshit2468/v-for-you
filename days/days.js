// days.js — navigation across Valentine week pages (UPDATED with Teddy + Promise)

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
  const name = window.location.pathname.split("/").pop();
  return name || ORDER[0];
}

function goTo(file) {
  // keep navigation working on GitHub Pages in any repo path
  const base = window.location.pathname.replace(/[^/]+$/, "");
  window.location.href = base + file;
}

function setupNav() {
  const file = currentFile();
  const idx = ORDER.indexOf(file);

  // If page isn't in ORDER, do nothing
  if (idx === -1) return;

  // Buttons
  document.querySelectorAll('[data-nav="back"]').forEach((btn) => {
    btn.onclick = () => goTo(ORDER[Math.max(0, idx - 1)]);
  });

  document.querySelectorAll('[data-nav="next"]').forEach((btn) => {
    btn.onclick = () => goTo(ORDER[Math.min(ORDER.length - 1, idx + 1)]);
  });

  // Keyboard arrows
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(ORDER[Math.max(0, idx - 1)]);
    if (e.key === "ArrowRight") goTo(ORDER[Math.min(ORDER.length - 1, idx + 1)]);
  });
}

document.addEventListener("DOMContentLoaded", setupNav);
