(() => {
  const audio = document.getElementById("bgm");
  if (!audio) return;

  const on = localStorage.getItem("bgm_on") === "1";
  const savedTime = parseFloat(localStorage.getItem("bgm_time") || "0");

  audio.volume = 0.6;

  if (!isNaN(savedTime) && savedTime > 0) {
    try { audio.currentTime = savedTime; } catch {}
  }

  // save progress so next page continues
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem("bgm_time", String(audio.currentTime || 0));
    }
  }, 800);

  if (on) {
    audio.play().catch(()=>{});
  }
})();
