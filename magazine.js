let pageFlip = null;

function $(id){ return document.getElementById(id); }

function calcSize(){
  // fixed base size (we scale with CSS instead of resizing the flip engine mid-flip)
  return { width: 460, height: 640 }; // single page width, full height
}

function initFlip(){
  const bookEl = $("book");
  if (!bookEl) return;

  const { width, height } = calcSize();

  pageFlip = new St.PageFlip(bookEl, {
    width,
    height,

    // IMPORTANT: keep geometry stable
    size: "fixed",
    autoSize: false,

    // IMPORTANT: prevents the "shift to single cover" behavior
    showCover: false,

    // smoother
    flippingTime: 1200,
    maxShadowOpacity: 0.18,

    // corner-only drag
    dragArea: 0.10,

    // avoid snap flips
    disableFlipByClick: true,

    useMouseEvents: true,
    mobileScrollSupport: false
  });

  pageFlip.loadFromHTML(document.querySelectorAll("#book .page"));

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
});
