const layer = document.querySelector(".stickers");
if (layer){
  const emojis = (document.body.getAttribute("data-stickers") || "❤️,💌,✨,🌸").split(",");
  function spawn(){
    const s = document.createElement("div");
    s.className = "sticker";
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left = `${Math.random()*100}vw`;
    s.style.animationDuration = `${7 + Math.random()*7}s`;
    s.style.fontSize = `${18 + Math.random()*22}px`;
    s.style.opacity = (0.18 + Math.random()*0.22).toFixed(2);
    layer.appendChild(s);
    setTimeout(()=>s.remove(), 15000);
  }
  setInterval(spawn, 450);
  for(let i=0;i<8;i++) setTimeout(spawn, i*140);
}
