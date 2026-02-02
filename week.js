// ====== SET YOUR REAL DATES HERE (YYYY-MM-DD) ======
const WEEK = [
  { label:"Rose Day 🌹",       date:"2026-02-07", file:"rose.html" },
  { label:"Propose Day 💍",    date:"2026-02-08", file:"propose.html" },
  { label:"Chocolate Day 🍫",  date:"2026-02-09", file:"chocolate.html" },
  { label:"Teddy Day 🧸",      date:"2026-02-10", file:"teddy.html" },
  { label:"Promise Day 🤞",    date:"2026-02-11", file:"promise.html" },
  { label:"Hug Day 🤗",        date:"2026-02-12", file:"hug.html" },
  { label:"Kiss Day 😘",       date:"2026-02-13", file:"kiss.html" },
  // Optional (only if you have valentine.html):
  { label:"Valentine’s Day ❤️",date:"2026-02-14", file:"valentine.html" },
];
// ===================================================

const grid = document.getElementById("grid");
const todayText = document.getElementById("todayText");
const statusText = document.getElementById("statusText");

const previewBtn = document.getElementById("previewBtn");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "vw_preview_mode";
let previewMode = localStorage.getItem(STORAGE_KEY) === "1";

// Parse YYYY-MM-DD as LOCAL midnight
function parseLocalDate(ymd){
  const [y,m,d] = ymd.split("-").map(Number);
  return new Date(y, m-1, d, 0, 0, 0, 0);
}

function fmtDate(d){
  return d.toLocaleDateString(undefined, { weekday:"short", year:"numeric", month:"short", day:"numeric" });
}

function isUnlocked(dayDate, now){
  return now.getTime() >= dayDate.getTime();
}

// Build absolute URL for QR content
function absoluteUrl(file){
  const here = window.location.href.split("#")[0].split("?")[0];
  const root = here.replace(/\/[^\/]*$/, "/");
  return root + file;
}

// QR image generator (works on static sites)
function qrImageUrl(dataUrl){
  const encoded = encodeURIComponent(dataUrl);
  // You can change size if you want
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encoded}`;
}

function render(){
  grid.innerHTML = "";
  const now = new Date();
  todayText.textContent = "Today: " + fmtDate(now);

  previewBtn.textContent = "Preview: " + (previewMode ? "ON" : "OFF");

  let unlockedCount = 0;

  WEEK.forEach(item => {
    const dayDate = parseLocalDate(item.date);
    const unlocked = previewMode ? true : isUnlocked(dayDate, now);
    if (unlocked) unlockedCount++;

    const targetUrl = absoluteUrl(item.file);
    const qrSrc = qrImageUrl(targetUrl);

    const card = document.createElement("article");
    card.className = "card" + (unlocked ? "" : " locked");

    card.innerHTML = `
      <div class="row">
        <div>
          <div class="name">${item.label}</div>
          <div class="day">${item.date} • ${fmtDate(dayDate)}</div>
        </div>
        <div class="pill" style="pointer-events:none; opacity:.85;">${unlocked ? "Unlocked" : "Locked"}</div>
      </div>

      <div class="qrWrap">
        <div class="qr">
          <img src="${qrSrc}" alt="QR for ${item.label}">
        </div>
        <div class="hint">${unlocked ? "Scan to open" : "Locked until date"}</div>
      </div>

      ${unlocked ? "" : `
        <div class="lock">
          <div class="icon">🔒</div>
          <div class="text">Unlocks on<br><b>${item.date}</b></div>
        </div>
      `}
    `;

    grid.appendChild(card);
  });

  statusText.textContent = previewMode
    ? "Preview mode: all QRs visible"
    : `${unlockedCount}/${WEEK.length} unlocked`;
}

previewBtn.addEventListener("click", () => {
  previewMode = !previewMode;
  localStorage.setItem(STORAGE_KEY, previewMode ? "1" : "0");
  render();
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  previewMode = false;
  render();
});

render();
