// script.js — floating hearts everywhere

function ensureHeartsLayer(){
  let layer = document.querySelector(".hearts");
  if (!layer){
    layer = document.createElement("div");
    layer.className = "hearts";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
  }
  return layer;
}

const layer = ensureHeartsLayer();

function rand(min, max){
  return Math.random() * (max - min) + min;
}

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";

  h.style.left = rand(0, 100) + "vw";
  h.style.bottom = "-30px";

  const size = rand(12, 26);
  h.style.width = size + "px";
  h.style.height = size + "px";

  const duration = rand(6, 12);
  const delay = rand(0, 1.2);
  h.style.animationDuration = duration + "s";
  h.style.animationDelay = delay + "s";
  h.style.opacity = rand(0.16, 0.32);

  layer.appendChild(h);
  setTimeout(() => h.remove(), (duration + delay) * 1000 + 800);
}

(function start(){
  spawnHeart();
  setInterval(() => {
    const n = Math.random() < 0.6 ? 1 : 2;
    for (let i = 0; i < n; i++) spawnHeart();
  }, 550);
})();
