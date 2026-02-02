const particleLayer = document.querySelector(".particles");
const hero = document.querySelector("[data-hero]");
const heroEmoji = document.querySelector(".heroEmoji");
const heroImg = document.querySelector(".heroImg");

const stickerList = (document.body.getAttribute("data-particles") || "❤️,✨")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

function spawnParticle() {
  if (!particleLayer) return;
  const p = document.createElement("div");
  p.className = "p";
  p.textContent = stickerList[Math.floor(Math.random() * stickerList.length)];
  p.style.left = (Math.random() * 100) + "vw";
  p.style.fontSize = (14 + Math.random() * 26) + "px";
  p.style.opacity = (0.18 + Math.random() * 0.45).toFixed(2);
  p.style.animationDuration = (7 + Math.random() * 8) + "s";
  particleLayer.appendChild(p);
  setTimeout(() => p.remove(), 17000);
}

for (let i = 0; i < 12; i++) setTimeout(spawnParticle, i * 160);
setInterval(spawnParticle, 520);

// hero re-pop on click
function repop(el) {
  if (!el) return;
  el.style.animation = "none";
  // force reflow
  void el.offsetHeight;
  el.style.animation = "";
}

if (hero) {
  hero.addEventListener("click", () => {
    repop(heroEmoji);
    repop(heroImg);
    // burst particles
    for (let i = 0; i < 10; i++) setTimeout(spawnParticle, i * 30);
    // tiny shake
    hero.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
      { duration: 220, easing: "ease-out" }
    );
  });
}
