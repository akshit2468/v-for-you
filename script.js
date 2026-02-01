const herName = "Your Girl"; // change

const days = [
  { key:"rose", label:"Rose", title:"Rose Day 🌹", lines:[
    "One rose for your smile.",
    "One for your warmth.",
    "And one for the way you calm my mind.",
    "Happy Rose Day, my love. 🌹"
  ]},
  { key:"propose", label:"Propose", title:"Propose Day 💍", lines:[
    "Can I be honest?",
    "I choose you.",
    "In the calm days…",
    "And in the chaotic ones too.",
    "Always you. 💍"
  ]},
  { key:"chocolate", label:"Choco", title:"Chocolate Day 🍫", lines:[
    "If love had a flavor…",
    "It would be sweet.",
    "A little addictive.",
    "And it- just like you. 🍫"
  ]},
  { key:"teddy", label:"Teddy", title:"Teddy Day 🧸", lines:[
    "If I could…",
    "I’d send you a hug that lasts all day.",
    "Until then—",
    "This page is your tiny teddy. 🧸"
  ]},
  { key:"promise", label:"Promise", title:"Promise Day 🤞", lines:[
    "I promise the small things.",
    "To listen.",
    "To try.",
    "To stay kind—even when life isn’t.",
    "And to love you better every day. 🤞"
  ]},
  { key:"hug", label:"Hug", title:"Hug Day 🤗", lines:[
    "Close your eyes for a second.",
    "Imagine me hugging you—tight.",
    "Like I never want to let go.",
    "Happy Hug Day, baby. 🤗"
  ]},
  { key:"kiss", label:"Kiss", title:"Kiss Day 😘", lines:[
    "One kiss on your forehead—",
    "For your peace.",
    "One on your cheek—",
    "For your smile.",
    "And one that says… I’m yours. 😘"
  ]},
  { key:"valentine", label:"Valentine", title:"Valentine’s Day ❤️", lines:[
    "Final page.",
    "You’re my favorite feeling.",
    "My comfort.",
    "My home.",
    `Happy Valentine’s Day, ${herName}. ❤️`,
    "I love you."
  ]},
];

const elTitle = document.getElementById("title");
const elName  = document.getElementById("name");
const elDay   = document.getElementById("dayname");
const elLine  = document.getElementById("line");
const elSub   = document.getElementById("sub");
const elProg  = document.getElementById("progress");
const tabs    = document.getElementById("tabs");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

elName.textContent = herName;

let dayIndex = 0;
let lineIndex = -1;

function setTheme() {
  // remove old theme classes
  document.body.className = document.body.className
    .split(" ")
    .filter(c => !c.startsWith("day-"))
    .join(" ");

  document.body.classList.add(`day-${days[dayIndex].key}`);
}

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
  setTheme();

  elTitle.innerHTML = `Hey <span id="name">${herName}</span> ❤️`;
  elDay.textContent = d.title;
  elProg.textContent = `Day ${dayIndex + 1} / ${days.length}`;

  [...tabs.children].forEach((b, i) => b.classList.toggle("active", i === dayIndex));

  prevBtn.disabled = (dayIndex === 0 && lineIndex <= 0);
  nextBtn.textContent = "Continue →";
}

function goToDay(i) {
  dayIndex = i;
  lineIndex = -1;
  setHeader();
  elLine.textContent = "Tap continue to start.";
  elSub.textContent = "(Tap anywhere / Space / Enter)";
}

function next() {
  const d = days[dayIndex];
  lineIndex++;

  if (lineIndex >= 0) elSub.textContent = " ";

  if (lineIndex < d.lines.length) {
    animateSwap(d.lines[lineIndex]);

    if (lineIndex === d.lines.length - 1) {
      nextBtn.textContent = (dayIndex === days.length - 1) ? "Finish ✨" : "Next day →";
    }
    prevBtn.disabled = false;
    return;
  }

  if (dayIndex < days.length - 1) {
    dayIndex++;
    lineIndex = -1;
    setHeader();
    elLine.textContent = "Tap continue to start.";
    elSub.textContent = "(Tap anywhere / Space / Enter)";
    tabs.children[dayIndex].scrollIntoView({ behavior:"smooth", inline:"center", block:"nearest" });
  } else {
    // end
    elTitle.textContent = `Forever with you, ${herName} ❤️`;
    elDay.textContent = "The end ✨";
    elLine.textContent = "Now come here… I want my hug in real life.";
    elProg.textContent = "❤️";
    nextBtn.disabled = true;
    prevBtn.disabled = false;
  }
}

function back() {
  if (lineIndex > 0) { lineIndex -= 2; next(); return; }

  if (dayIndex > 0) {
    dayIndex--;
    lineIndex = -1;
    setHeader();
    elLine.textContent = "Tap continue to start.";
    elSub.textContent = "(Tap anywhere / Space / Enter)";
    tabs.children[dayIndex].scrollIntoView({ behavior:"smooth", inline:"center", block:"nearest" });
  }
}

// tabs
days.forEach((d, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tab";
  b.textContent = d.label;
  b.addEventListener("click", () => goToDay(i));
  tabs.appendChild(b);
});

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", back);

document.querySelector(".panel").addEventListener("click", (e) => {
  if (e.target.closest("button")) return;
  next();
});

document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") next();
  if (e.key === "ArrowLeft") back();
  if (e.key === "ArrowRight") next();
});

// init
goToDay(0);

// hearts (still works; color now matches theme)
const heartsLayer = document.querySelector(".hearts");
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = `${Math.random() * 100}vw`;

  const size = 10 + Math.random() * 16;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;

  // theme-aware colors
  const styles = getComputedStyle(document.body);
  const c1 = styles.getPropertyValue("--accent").trim();
  const c2 = styles.getPropertyValue("--accent2").trim();
  const colors = [c1, c2, "#ffd1df", "#ffffff"];
  h.style.color = colors[Math.floor(Math.random() * colors.length)];

  const duration = 6 + Math.random() * 6;
  h.style.animationDuration = `${duration}s`;
  h.style.opacity = (0.22 + Math.random() * 0.55).toFixed(2);

  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}
setInterval(spawnHeart, 420);
