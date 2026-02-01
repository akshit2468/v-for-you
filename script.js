// ====== CUSTOMIZE ======
const herName = "Your Girl"; // change this

// 8 pages (Valentine week + Valentine Day)
const days = [
  {
    key: "rose",
    label: "Rose",
    title: "Rose Day 🌹",
    lines: [
      "One rose for your smile.",
      "One for your warmth.",
      "And one for the way you make my days softer.",
      "Happy Rose Day, my love. 🌹"
    ]
  },
  {
    key: "propose",
    label: "Propose",
    title: "Propose Day 💍",
    lines: [
      "Can I be honest?",
      "I choose you.",
      "In the calm days.",
      "And in the chaotic ones too.",
      "Always you. 💍"
    ]
  },
  {
    key: "chocolate",
    label: "Choco",
    title: "Chocolate Day 🍫",
    lines: [
      "If love had a flavor…",
      "It would be sweet.",
      "A little addictive.",
      "And it would taste like moments with you. 🍫"
    ]
  },
  {
    key: "teddy",
    label: "Teddy",
    title: "Teddy Day 🧸",
    lines: [
      "If I could…",
      "I’d send you a hug that lasts all day.",
      "Until then—",
      "Consider this your tiny teddy. 🧸"
    ]
  },
  {
    key: "promise",
    label: "Promise",
    title: "Promise Day 🤞",
    lines: [
      "I promise the small things.",
      "To listen.",
      "To try.",
      "To stay kind—even when life isn’t.",
      "And to love you, the best I can. 🤞"
    ]
  },
  {
    key: "hug",
    label: "Hug",
    title: "Hug Day 🤗",
    lines: [
      "Close your eyes for a second.",
      "Imagine me hugging you—tight.",
      "Like I never want to let go.",
      "Happy Hug Day, baby. 🤗"
    ]
  },
  {
    key: "kiss",
    label: "Kiss",
    title: "Kiss Day 😘",
    lines: [
      "One kiss on your forehead—",
      "For your peace.",
      "One on your cheek—",
      "For your smile.",
      "And one that says… I’m yours. 😘"
    ]
  },
  {
    key: "valentine",
    label: "Valentine",
    title: "Valentine’s Day ❤️",
    lines: [
      "Okay… final page.",
      "You’re my favorite feeling.",
      "My comfort.",
      "My home.",
      `Happy Valentine’s Day, ${herName}. ❤️`,
      "I love you."
    ]
  }
];
// =======================

const elName = document.getElementById("name");
const elTitle = document.getElementById("title");
const elDayName = document.getElementById("dayname");
const elLine = document.getElementById("line");
const elSub = document.getElementById("sub");
const elProgress = document.getElementById("progress");
const tabs = document.getElementById("tabs");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

elName.textContent = herName;

// current page + line
let dayIndex = 0;
let lineIndex = -1; // first click shows first line

function animateSwap(nextText) {
  elLine.classList.remove("fade-in");
  elLine.classList.add("fade-out");
  setTimeout(() => {
    elLine.textContent = nextText;
    elLine.classList.remove("fade-out");
    elLine.classList.add("fade-in");
  }, 160);
}

function setHeader() {
  const d = days[dayIndex];
  elDayName.textContent = d.title;

  // Big title only for the very first page start, otherwise keep romantic greeting
  elTitle.innerHTML = `Hey <span id="name">${herName}</span> ❤️`;
  // progress: Day X / 8
  elProgress.textContent = `Day ${dayIndex + 1} / ${days.length}`;

  // tabs active state
  [...tabs.children].forEach((btn, i) => {
    btn.classList.toggle("active", i === dayIndex);
  });

  // buttons
  prevBtn.disabled = (dayIndex === 0 && lineIndex <= 0);
  nextBtn.textContent = "Continue →";
}

function goToDay(i) {
  dayIndex = i;
  lineIndex = -1;
  setHeader();
  elSub.textContent = "(Tap anywhere / Space / Enter)";
  elLine.textContent = "Tap continue to start.";
}

function next() {
  const d = days[dayIndex];
  lineIndex++;

  // hide helper after first click
  if (lineIndex >= 0) elSub.textContent = " ";

  if (lineIndex < d.lines.length) {
    animateSwap(d.lines[lineIndex]);
    prevBtn.disabled = false;

    // if this is last line of the day, the button will say Next Day / Finish
    if (lineIndex === d.lines.length - 1) {
      nextBtn.textContent = (dayIndex === days.length - 1) ? "Finish ✨" : "Next day →";
    }
    return;
  }

  // after finishing lines, move to next day (if exists)
  if (dayIndex < days.length - 1) {
    dayIndex++;
    lineIndex = -1;
    setHeader();
    elSub.textContent = "(Tap anywhere / Space / Enter)";
    elLine.textContent = "Tap continue to start.";
    // scroll tabs so active is visible
    tabs.children[dayIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  } else {
    // end screen (after final day)
    elTitle.classList.add("fade-out");
    elLine.classList.add("fade-out");
    setTimeout(() => {
      elTitle.classList.remove("fade-out");
      elLine.classList.remove("fade-out");
      elTitle.textContent = `Forever with you, ${herName} ❤️`;
      elDayName.textContent = "The end ✨";
      elLine.textContent = "Now come here… I want my hug in real life.";
      elProgress.textContent = "❤️";
      nextBtn.disabled = true;
      prevBtn.disabled = false;
    }, 180);
  }
}

function back() {
  // If we’re mid-lines, just go back a line
  if (lineIndex > 0) {
    lineIndex -= 2; // because next() increments first
    next();
    return;
  }

  // If at start of day, go to previous day
  if (dayIndex > 0) {
    dayIndex--;
    lineIndex = -1;
    setHeader();
    elSub.textContent = "(Tap anywhere / Space / Enter)";
    elLine.textContent = "Tap continue to start.";
    tabs.children[dayIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

// Build tabs
days.forEach((d, i) => {
  const b = document.createElement("button");
  b.className = "tab";
  b.type = "button";
  b.textContent = d.label;
  b.addEventListener("click", () => goToDay(i));
  tabs.appendChild(b);
});

// Button actions
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", back);

// Tap anywhere on card to continue (except buttons/tabs)
document.querySelector(".card").addEventListener("click", (e) => {
  if (e.target.closest("button")) return;
  next();
});

// Keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") next();
  if (e.key === "ArrowLeft") back();
  if (e.key === "ArrowRight") next();
});

// init
goToDay(0);

// Hearts generator
const heartsLayer = document.querySelector(".hearts");
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";

  h.style.left = `${Math.random() * 100}vw`;
  const size = 10 + Math.random() * 16;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;

  const colors = ["#ff4d7d", "#ff7aa6", "#ff2f55", "#ffd1df"];
  h.style.color = colors[Math.floor(Math.random() * colors.length)];

  const duration = 6 + Math.random() * 6;
  h.style.animationDuration = `${duration}s`;
  h.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);

  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}
setInterval(spawnHeart, 420);
