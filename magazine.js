let pageFlip = null;

function $(id){ return document.getElementById(id); }

function calcSize(){
  const maxW = Math.min(920, window.innerWidth * 0.94);
  const maxH = Math.min(640, window.innerHeight * 0.74);
  return {
    width: Math.max(320, Math.floor(maxW / 2)),
    height: Math.max(460, Math.floor(maxH))
  };
}

function initFlip(){
  const bookEl = $("book");
  if (!bookEl) return;

  const { width, height } = calcSize();

  pageFlip = new St.PageFlip(bookEl, {
    width,
    height,
    size: "fixed",
    autoSize: false,

    showCover: true,

    // smoother
    flippingTime: 1200,
    maxShadowOpacity: 0.18,

    // CORNER ONLY (this helps the “break away” feel a lot)
    dragArea: 0.10,

    // avoid snap flips
    disableFlipByClick: true,

    // input
    useMouseEvents: true,
    mobileScrollSupport: false
  });

  pageFlip.loadFromHTML(document.querySelectorAll("#book .page"));

  // more deliberate swipe, fewer accidental micro-drags
  try { pageFlip.getFlipController().setSwipeDistance(60); } catch(e) {}
}

function openMagazine(){
  const closed = $("closedCover");
  const scene = $("scene");
  if (closed) closed.style.display = "none";
  if (scene) scene.classList.add("open");
  if (!pageFlip) initFlip();
}

document.addEventListener("DOMContentLoaded", () => {
  const closed = $("closedCover");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");

  if (closed) closed.addEventListener("click", openMagazine);

  if (prevBtn) prevBtn.addEventListener("click", () => pageFlip && pageFlip.flipPrev());
  if (nextBtn) nextBtn.addEventListener("click", () => pageFlip && pageFlip.flipNext());

  window.addEventListener("keydown", (e) => {
    if (!pageFlip) return;
    if (e.key === "ArrowLeft") pageFlip.flipPrev();
    if (e.key === "ArrowRight") pageFlip.flipNext();
  });

  window.addEventListener("resize", () => {
    if (!pageFlip) return;
    const { width, height } = calcSize();
    pageFlip.update({ width, height });
  });
});
