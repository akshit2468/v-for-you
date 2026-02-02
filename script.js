// script.js — floating hearts for the landing page

const layer = document.querySelector(".hearts");

function rand(min, max){
  return Math.random() * (max - min) + min;
}

function spawnHeart(){
  if (!layer) return;

  const h = document.createElement("div");
  h.className = "heart";

  const left = rand(0, 100);
  const size = rand(12, 26);
  const duration = rand(6, 12);
  const delay = rand(0, 1.2);
  const opacity = rand(0.16, 0.32);

  h.style.left = left + "vw";
  h.style.bottom = "-30px";
  h.style.width = size + "px";
  h.style.height = size + "px";
  h.style.opacity = opacity;
  h.style.animationDuration = duration + "s";
  h.style.animationDelay = delay + "s";

  layer.appendChild(h);

  // cleanup
  setTimeout(() => h.remove(), (duration + delay) * 1000 + 500);
}

function startHearts(){
  // light + cute, not too heavy
  spawnHeart();
  setInterval(() => {
    const n = Math.random() < 0.6 ? 1 : 2;
    for (let i = 0; i < n; i++) spawnHeart();
  }, 550);
}

startHearts();
