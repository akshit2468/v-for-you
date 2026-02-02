// magazine.js — Smooth, realistic page turning for StPageFlip
// Works with: <script src="https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.min.js"></script>

let pageFlip = null;

function $(id) {
  return document.getElementById(id);
}

// Keep magazine shape consistent across screen sizes
function calcSize() {
  const maxW = Math.min(920, window.innerWidth * 0.94);
  const maxH = Math.min(640, window.innerHeight * 0.74);

  // StPageFlip expects "page width" (single page) and total height.
  // The container shows a spread (2 pages), so spread width ≈ 2 * width.
  const width = Math.max(320, Math.floor(maxW / 2));
  const height = Math.max(460, Math.floor(maxH));

  return { width, height };
}

function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 6000);
}

function initFlip() {
  try {
    if (!window.St || !window.St.PageFlip) {
      showToast("PageFlip library didn’t load. Try reload or change network.");
      return;
    }

    const bookEl = $("book");
    if (!bookEl) {
      showToast("Missing #book element in magazine.html");
      return;
    }

    const { width, height } = calcSize();

    pageFlip = new St.PageFlip(bookEl, {
      // sizing
      width,
      height,
      size: "stretch",
      autoSize: true,

      // cover
      showCover: true,

      // ✅ smoother animation
      flippingTime: 950,          // 800–1200 feels good
      maxShadowOpacity: 0.22,     // softer shadow (more “paper”)
      animationDuration: 950,     // some builds use this too; safe

      // ✅ reduces “break away” effect: only allow small corner drag
      // lower value = drag only near the corners
      dragArea: 0.14,             // try 0.12 if still feels weird

      // ✅ avoids snap-flips when clicking on page
      disableFlipByClick: true,

      // interaction
      useMouseEvents: true,
      mobileScrollSupport: false
    });

    const pages = document.querySelectorAll("#book .page");
    if (!pages.length) {
      showToast("No .page elements found inside #book");
      return;
    }

    pageFlip.loadFromHTML(pages);

    // ✅ nicer swipe feel (prevents accidental mini-swipes)
    try {
      pageFlip.getFlipController().setSwipeDistance(40);
    } catch (e) {
      // ignore if method not available in this build
    }

  } catch (e) {
    console.error(e);
    showToast("Magazine init failed. Check console for errors.");
  }
}

function openMagazine() {
  const closed = $("closedCover");
  const scene = $("scene");

  if (closed) closed.style.display = "none";
  if (scene) scene.classList.add("open");

  if (!pageFlip) initFlip();
}

// ---------- Bind UI ----------
function bindUI() {
  const closed = $("closedCover");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");

  if (closed) closed.addEventListener("click", openMagazine);

  if (prevBtn) prevBtn.addEventListener("click", () => {
    if (pageFlip) pageFlip.flipPrev();
  });

  if (nextBtn) nextBtn.addEventListener("click", () => {
    if (pageFlip) pageFlip.flipNext();
  });

  // keyboard support (optional)
  window.addEventListener("keydown", (e) => {
    if (!pageFlip) return;
    if (e.key === "ArrowLeft") pageFlip.flipPrev();
    if (e.key === "ArrowRight") pageFlip.flipNext();
  });

  // resize cleanly
  window.addEventListener("resize", () => {
    if (!pageFlip) return;
    const { width, height } = calcSize();
    pageFlip.update({ width, height });
  });
}

// Make sure DOM exists before binding
document.addEventListener("DOMContentLoaded", bindUI);
