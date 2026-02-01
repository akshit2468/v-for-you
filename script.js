// ====== EDIT THIS ======
const herName = "Your Girl"; // change name here
// =======================

// Each page has its own lines set in HTML via data-lines=""
function getLines() {
  const raw = document.body.getAttribute("data-lines") || "";
  try {
    return JSON.parse(raw);
  } catch {
    return ["(Lines JSON is invalid in this page.)"];
  }
}

const lines = getLines();
let i = -1;

const nameEl = document.getElementById("name");
if (nameEl) nameEl.textContent = herName;

const lineEl = document.getElementById("line");
const hintEl = document.getElementById("hint");
const nextBtn = document.getElementById("nextBtn");

function setLine(text) {
  // simple fade for line
  lineEl.style.opacity = "0";
  lineEl.style.transform = "translateY(8px)";
  setTimeout(() => {
    lineEl.textContent = text;
    lineEl.style.transition = "opacity .28s ease, transform .28s ease";
    lineEl.style.opacity = "1";
    lineEl.style.transform = "translateY(0)";
  }, 120);
}

function go(url){
  document.body.classList.add("fade-out");
  setTimeout(() => { window.location.href = url; }, 260);
}

function next(){
  i++;

  if (hintEl && i >= 0) hintEl.textContent = " ";

  if (i < lines.length){
    setLine(lines[i]);

    // if this is last line, button becomes Next Day / Finish (based on data-next)
    const nextUrl = document.body.getAttribute("data-next");
    if (i === lines.length - 1 && nextUrl){
      nextBtn.textContent = "Next day →";
    }
    return;
  }

  const nextUrl = document.body.getAttribute("data-next");
  if (nextUrl) go(nextUrl);
}

// click on button / anywhere
if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); next(); });

document.addEventListener("click", (e) => {
  // ignore clicks on links if any
  if (e.target.closest("a")) return;
  next();
});

document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") next();
});

// page fade in
document.body.classList.add("fade-in");

// hearts (theme aware)
const heartsLayer = document.querySelector(".hearts");
function spawnHeart(){
  if (!heartsLayer) return;

  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = `${Math.random() * 100}vw`;

  const size = 10 + Math.random() * 16;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;

  const styles = getComputedStyle(document.body);
  const c1 = styles.getPropertyValue("--accent").trim() || "#ff4d7d";
  const c2 = styles.getPropertyValue("--accent2").trim() || "#ff7aa6";
  const colors = [c1, c2, "#ffd1df", "#ffffff"];
  h.style.color = colors[Math.floor(Math.random() * colors.length)];

  const duration = 6 + Math.random() * 6;
  h.style.animationDuration = `${duration}s`;
  h.style.opacity = (0.22 + Math.random() * 0.55).toFixed(2);

  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}
setInterval(spawnHeart, 420);
