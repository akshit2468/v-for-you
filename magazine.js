:root{
  --bg1:#06040a;
  --bg2:#1a0612;
  --paper:#fbf5ea;
  --ink:#1a1a1a;
  --muted:#555;
  --accent:#ff3d6e;
  --shadow: 0 30px 110px rgba(0,0,0,.55);
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  background:
    radial-gradient(900px 520px at 20% 10%, rgba(255,61,110,.18), transparent 60%),
    radial-gradient(700px 520px at 85% 40%, rgba(255,209,223,.12), transparent 60%),
    linear-gradient(180deg,var(--bg1),var(--bg2));
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
  overflow:hidden;
}

/* CLOSED COVER */
.closed{
  position:fixed; inset:0;
  display:grid; place-items:center;
  z-index:50;
}
.closed-book{
  width:min(440px, 88vw);
  height:min(620px, 76vh);
  position:relative;
  perspective: 1200px;
  cursor:pointer;
}
.closed-front{
  position:absolute; inset:0;
  border-radius: 26px;
  background: linear-gradient(135deg, rgba(255,61,110,.95), rgba(255,209,223,.75));
  box-shadow: var(--shadow);
  transform: rotateY(-12deg);
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding: 22px;
  color:#12050c;
}
.closed-spine{
  position:absolute;
  left:-16px; top:10px; bottom:10px;
  width: 26px;
  border-radius: 18px;
  background: rgba(0,0,0,.25);
  filter: blur(.2px);
  transform: rotateY(22deg);
}
.masthead{
  font-weight:950;
  letter-spacing:.22em;
  text-transform:uppercase;
  font-size:12px;
}
.big{
  font-weight:1000;
  letter-spacing:-.06em;
  font-size: clamp(64px, 12vw, 112px);
  line-height:1;
}
.tagline{
  font-size:14px;
  opacity:.9;
}
.badge{
  width:fit-content;
  padding:10px 12px;
  border-radius:999px;
  background: rgba(255,255,255,.35);
  border:1px solid rgba(0,0,0,.12);
  font-weight:900;
  letter-spacing:.14em;
  text-transform:uppercase;
  font-size:12px;
}

.scene{
  position:fixed; inset:0;
  display:grid;
  grid-template-rows: auto 1fr auto;
  z-index:1;
  opacity:0;
  pointer-events:none;
  transition: opacity .35s ease;
}
.scene.open{
  opacity:1;
  pointer-events:auto;
}

.toolbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 14px 16px;
  gap:12px;
  backdrop-filter: blur(12px);
  background: rgba(0,0,0,.18);
  border-bottom: 1px solid rgba(255,255,255,.10);
  color:#fff;
}
.tbtn{
  width:46px;height:46px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.08);
  color:#fff;
  font-size:22px;
  cursor:pointer;
}
.tcenter{ text-align:center; flex:1 }
.tTitle{ font-weight:950; letter-spacing:-.02em }
.tSub{ font-size:12px; opacity:.8; letter-spacing:.12em; text-transform:uppercase }

.book-wrap{
  display:grid;
  place-items:center;
  padding: 16px;
}

.flip-book{
  width: min(920px, 94vw);
  height: min(640px, 74vh);
}

.page{
  background: var(--paper);
  color: var(--ink);
  border-radius: 10px;
  overflow:hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,.18);
}

/* paper texture */
.page-content{
  height:100%;
  padding: 26px 26px 18px;
  background:
    radial-gradient(1100px 600px at 30% 10%, rgba(0,0,0,.03), transparent 60%),
    repeating-linear-gradient(0deg, rgba(0,0,0,.015) 0px, rgba(0,0,0,.015) 1px, transparent 10px, transparent 16px),
    var(--paper);
  position:relative;
}

.page-cover .page-content{
  background: linear-gradient(135deg, rgba(255,61,110,.92), rgba(255,209,223,.72));
  color:#12050c;
}
.cover-top{
  font-weight:950;
  letter-spacing:.22em;
  text-transform:uppercase;
  font-size:12px;
}
.cover-title{
  margin-top: 22px;
  font-weight:1000;
  letter-spacing:-.06em;
  font-size: 56px;
  line-height:1;
}
.cover-sub{
  margin-top: 10px;
  font-size:14px;
  opacity:.9;
}
.cover-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-top: 22px;
}
.cover-card{
  background: rgba(255,255,255,.28);
  border:1px solid rgba(0,0,0,.10);
  border-radius: 16px;
  padding: 14px;
}
.kicker{
  font-size:12px;
  letter-spacing:.14em;
  text-transform:uppercase;
  opacity:.9;
  font-weight:900;
}
.headline{
  margin-top:8px;
  font-weight:1000;
  letter-spacing:-.02em;
  font-size:18px;
}
.small{ margin-top:6px; font-size:13px; opacity:.9 }
.cover-foot{
  position:absolute;
  bottom: 16px; left: 26px;
  font-size:12px;
  letter-spacing:.14em;
  text-transform:uppercase;
  opacity:.9;
}

.page-kicker{
  font-size:12px;
  letter-spacing:.18em;
  text-transform:uppercase;
  font-weight:950;
  color: var(--muted);
}
.page-h1{
  margin-top:10px;
  font-size:40px;
  letter-spacing:-.04em;
  font-weight:1000;
}

.contents{ margin-top: 18px; display:grid; gap:12px }
.contents .row{
  display:grid;
  grid-template-columns: 28px 1fr;
  gap:12px;
  align-items:baseline;
  padding: 12px 14px;
  border-radius: 14px;
  border:1px solid rgba(0,0,0,.08);
  background: rgba(0,0,0,.03);
}
.contents span{ font-weight:1000; color:#111 }
.contents b{ display:block; font-weight:1000 }
.contents i{ display:block; color:#666; font-style:normal; font-size:13px; margin-top:2px }

.two-col{
  margin-top:18px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:16px;
  color:#2a2a2a;
  line-height:1.65;
}
.two-col p{ margin:0; font-size:16px }
.quote{
  margin-top: 18px;
  padding: 16px 18px;
  border-left: 4px solid var(--accent);
  background: rgba(0,0,0,.03);
  border-radius: 12px;
  font-weight:900;
  color:#222;
}

.bullets{
  margin-top:16px;
  padding-left: 18px;
  color:#2a2a2a;
  line-height:1.7;
  font-size:16px;
}

.photo-grid{
  margin-top:16px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:12px;
}
.ph{
  border-radius: 16px;
  border:1px dashed rgba(0,0,0,.18);
  background: rgba(0,0,0,.03);
  display:grid;
  place-items:center;
  min-height: 180px;
  color:#666;
  font-weight:900;
}

.letter{
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  border:1px solid rgba(0,0,0,.08);
  background: rgba(0,0,0,.02);
  color:#2a2a2a;
  line-height:1.7;
  font-size:16px;
}
.letter p{ margin: 0 0 10px }
.sig{ font-weight:1000; margin-top: 14px }

.page-footer{
  position:absolute;
  bottom: 12px;
  right: 18px;
  font-weight:1000;
  color:#444;
  opacity:.9;
}

.backcover{
  display:grid;
  place-items:center;
  text-align:center;
}
.end{
  font-weight:1000;
  letter-spacing:-.06em;
  font-size: 60px;
}
.endSub{
  margin-top: 10px;
  font-size: 14px;
  letter-spacing:.14em;
  text-transform:uppercase;
  opacity:.9;
}

.hintbar{
  padding: 10px 14px 16px;
  text-align:center;
  color: rgba(255,255,255,.78);
  font-size:12px;
  letter-spacing:.14em;
  text-transform:uppercase;
}
