// ====== SET YOUR WEEK DATES HERE ======
// Put YEAR-MONTH-DAY for each day.
// Example: 2026-02-07 etc
const WEEK = [
  { key:"rose",     label:"Rose Day 🌹",     date:"2026-02-07", file:"rose.html",     desc:"A rose + a sweet line." },
  { key:"propose",  label:"Propose Day 💍",  date:"2026-02-08", file:"propose.html",  desc:"The confession day 😌" },
  { key:"choco",    label:"Chocolate Day 🍫",date:"2026-02-09", file:"chocolate.html",desc:"Sugar, but make it romantic." },
  { key:"teddy",    label:"Teddy Day 🧸",    date:"2026-02-10", file:"teddy.html",    desc:"Emergency cuddle kit." },
  { key:"promise",  label:"Promise Day 🤞",  date:"2026-02-11", file:"promise.html",  desc:"Real promises, soft words." },
  { key:"hug",      label:"Hug Day 🤗",      date:"2026-02-12", file:"hug.html",      desc:"A warm hug in a link." },
  { key:"kiss",     label:"Kiss Day 😘",     date:"2026-02-13", file:"kiss.html",     desc:"Soft + cute + you." },
  { key:"valentine",label:"Valentine’s Day ❤️",date:"2026-02-14",file:"valentine.html",desc:"The final page + magazine." }
];
// =====================================

const grid = document.getElementById("grid");
const todayText = document.getElementById("todayText");
const statusText = document.getElementById("statusText");

const previewBtn = document.getElementById("previewBtn");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "vw_preview_mode";
let previewMode = localStorage.getItem(STORAGE_KEY) === "1";

// helper: parse YYYY-MM-DD in local timezone
function parseLocalDate(ymd){
  const [y,m,d] = ymd.split("-").map(Number);
  return new Date(y, m-1, d, 0, 0, 0, 0);
}
function fmtDate(d){
  return d.toLocaleDateString(undefined, { weekday:"short", year:"numeric", month:"short", day:"numeric" });
}
function isUnlocked(dayDate, now){
  // Unlock when now >= start of that date (local)
  return now.getTime() >= dayDate.getTime();
}

// base URL (for copy link)
function pageUrl(file){
  const base = window.location.href.split("#")[0].split("?")[0];
  // if week.html is in root, base ends with /week.html
  const root = base.replace(/\/[^\/]*$/, "/");
  return root + file;
}

function render(){
  grid.innerHTML = "";
  const now = new Date();

  todayText.textContent = "Today: " + fmtDate(now);
  previewBtn.textContent = "Preview: " + (previewMode ? "ON" : "OFF");

  const unlockedCount = WEEK.reduce((acc, item) => {
    const unlocked = previewMode ? true : isUnlocked(parseLocalDate(item.date), now);
    return acc + (unlocked ? 1 : 0);
  }, 0);

  statusText.textContent = previewMode
    ? "Preview mode (everything unlocked)"
    : `${unlockedCount}/${WEEK.length} unlocked`;

  WEEK.forEach(item => {
    const dayDate = parseLocalDate(item.date);
    const unlocked = previewMode ? true : isUnlocked(dayDate, now);

    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="row">
        <div>
          <div class="name">${item.label}</div>
          <div class="day">${item.date} • ${fmtDate(dayDate)}</div>
        </div>
        <div class="pill" style="pointer-events:none; opacity:.85;">${unlocked ? "Unlocked" : "Locked"}</div>
      </div>
      <div class="desc">${item.desc}</div>

      <div class="actions">
        <button class="btn" data-open="${item.file}">Open</button>
        <button class="btn secondary" data-copy="${item.file}">Copy link</button>
      </div>

      ${unlocked ? "" : `
        <div class="lock">
          <div class="icon">🔒</div>
          <div class="text">Unlocks on ${item.date}</div>
        </div>
      `}
    `;

    // Button handlers
    card.querySelector('[data-open]').addEventListener("click", () => {
      if (!unlocked){
        // little shake hint
        card.animate([{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}], {duration:260});
        return;
      }
      window.location.href = item.file;
    });

    card.querySelector('[data-copy]').addEventListener("click", async () => {
      const url = pageUrl(item.file);
      try{
        await navigator.clipboard.writeText(url);
        statusText.textContent = "Copied: " + item.label;
      }catch{
        prompt("Copy this link:", url);
      }
    });

    grid.appendChild(card);
  });
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
