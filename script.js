// ====== Customize these ======
const herName = "Your Girl"; // <-- change this
const lines = [
  "Okay… I’ll keep it simple.",
  "You’ve been on my mind a lot lately.",
  "Not in a loud way…",
  "In a quiet, comforting way.",
  "Like a song that stays even after it ends.",
  "You make ordinary days feel softer.",
  "And my heart… feels safe with you.",
  "So yeah—",
  "Happy Valentine’s, my love. ❤️",
  "One last thing…",
  "I’m really grateful you’re mine."
];

const finalTitle = `I love you, ${herName} ❤️`;
// ============================

const elName = document.getElementById("name");
const elTitle = document.getElementById("title");
const elLine = document.getElementById("line");
const elSub = document.getElementById("sub");
const elProgress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

elName.textContent = herName;

let idx = -1; // first click shows line 0

function setProgress() {
  const shown = Math.min(idx + 1, lines.length);
  elProgress.textContent = `${shown} / ${lines.length}`;
}

function animateSwap(nextText) {
  // fade out current line, then swap, fade in
  elLine.classList.remove("fade-in");
  elLine.classList.add("fade-out");

  window.setTimeout(() => {
    elLine.textContent = nextText;
    elLine.classList.remove("fade-out");
    elLine.classList.add("fade-in");
  }, 160);
}

function next() {
  idx++;

  if (idx < lines.length) {
    setProgress();
    animateSwap(lines[idx]);

    // make the helper text disappear after first click
    if (idx >= 0) elSub.textContent = " ";

    // change button text near end
    if (idx === lines.length - 1) nextBtn.textContent = "Finish ✨";
  } else {
    // Final screen
    elTitle.classList.add("fade-out");
    elLine.classList.add("fade-out");
    nextBtn.disabled = true;

    setTimeout(() => {
      elTitle.classList.remove("fade-out");
      elLine.classList.remove("fade-out");
      elTitle.textContent = finalTitle;
      elLine.textContent = "Forever yours.";
      elSub.textContent = " ";
      elProgress.textContent = `❤️`;
      nextBtn.textContent = "Done";
    }, 180);
  }
}

nextBtn.addEventListener("click", next);

// Tap anywhere on card to continue
document.querySelector(".card").addEventListener("click", (e) => {
  // prevent double-trigger when clicking the button
  if (e.target.id === "nextBtn") return;
  next();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") next();
});

// Hearts generator
const heartsLayer = document.querySelector(".hearts");
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";

  // random left position
  const left = Math.random() * 100;
  h.style.left = `${left}vw`;

  // random size
  const size = 10 + Math.random() * 16;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;

  // random color (valentine palette)
  const colors = ["#ff4d7d", "#ff7aa6", "#ff2f55", "#ffd1df"];
  h.style.color = colors[Math.floor(Math.random() * colors.length)];

  // random duration
  const duration = 6 + Math.random() * 6;
  h.style.animationDuration = `${duration}s`;

  // random opacity
  h.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);

  heartsLayer.appendChild(h);

  // cleanup
  setTimeout(() => h.remove(), duration * 1000);
}

// spawn hearts at a gentle rate
setInterval(spawnHeart, 420);
