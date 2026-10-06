/* ==========================================================
   OUR STORY — digital scrapbook
   ----------------------------------------------------------
   ALL EDITABLE CONTENT LIVES IN THE `PAGES` LIST BELOW.
   - Photos: put files in assets/photos/ and set `file`.
   - Anything in [BRACKETS] is a placeholder to replace.
   ========================================================== */

const MUSIC_FILE = ""; // optional: e.g. "assets/song.mp3" (see README). Empty = no audio.

// ---- helpers that build scrapbook pieces -------------------
// photo(file, label, style) style: polaroid | taped | plain ; extra: class names (tilt etc.)
function photo(file, label, style, extra) {
  return `<figure class="photo ${style} ${extra || ""}" data-file="${file}">
    <div class="ph-box"><span class="ph-text">[PHOTO: ${label}]</span></div>
    ${style === "polaroid" ? `<figcaption class="hand">[CAPTION: Add caption here]</figcaption>` : ""}
    <i class="tape"></i>
  </figure>`;
}
const chapterPage = (num, title, tag) => `
  <div class="inner center">
    <p class="kicker">Chapter ${num}</p>
    <h2 class="big">${title}</h2>
    <div class="rule"><span>✿</span></div>
    <p class="hand">${tag}</p>
  </div>`;

const PAGES = [
  { chapter: "", html: `
    <div class="inner center">
      <p class="hand">for Ronalyn</p>
      <h2 class="big">Our Story</h2>
      <p class="kicker">Five Years of Us</p>
      <div class="rule"><span>✿</span></div>
      <p class="hand">2021 — 2026</p>
      <p class="note">Turn the page →</p>
    </div>` },

  // CHAPTER I
  { chapter: "Chapter I", html: chapterPage("I", "The Beginning", "[Add a line about where it all began]") },
  { chapter: "Chapter I", html: `
    <div class="inner">
      ${photo("photos/ch1-first.jpg", "Replace with first photo", "polaroid", "tilt-l big-photo")}
      <p class="date hand">[DATE: Add date]</p>
      <p class="memory">[MEMORY: Add our first memory here]</p>
    </div>` },

  // CHAPTER II
  { chapter: "Chapter II", html: chapterPage("II", "Growing Together", "[Add a line about growing together]") },
  { chapter: "Chapter II", html: `
    <div class="inner">
      <div class="collage">
        ${photo("photos/ch2-01.jpg", "Early adventure", "taped", "tilt-r")}
        ${photo("photos/ch2-02.jpg", "Everyday moment", "polaroid", "tilt-l")}
      </div>
      <p class="memory">[MEMORY: Add an everyday moment or funny memory here]</p>
      <p class="date hand">[DATE: Add date]</p>
    </div>` },

  // CHAPTER III
  { chapter: "Chapter III", html: chapterPage("III", "Our Adventures", "[Add favorite adventure here]") },
  { chapter: "Chapter III", html: `
    <div class="inner travel">
      <div class="ticket"><span>ADMIT TWO</span><b>[DESTINATION]</b><small>[DATE: Add date]</small></div>
      <div class="collage">
        ${photo("photos/ch3-01.jpg", "Adventure photo", "polaroid", "tilt-l")}
        ${photo("photos/ch3-02.jpg", "Postcard photo", "plain postcard", "tilt-r")}
      </div>
      <p class="memory">[MEMORY: Add favorite adventure here]</p>
      <p class="doodle">✈ - - - - - ✈</p>
    </div>` },

  // CHAPTER IV
  { chapter: "Chapter IV", html: chapterPage("IV", "Our Favorite Moments", "[Add a line about favorite moments]") },
  { chapter: "Chapter IV", html: `
    <div class="inner">
      <div class="moment">
        ${photo("photos/ch4-01.jpg", "Add photo", "polaroid", "tilt-l")}
        <h3 class="hand">Favorite Moment #1</h3>
        <p class="date hand">[DATE: Add date]</p>
        <p class="memory">[CAPTION: Add caption here]</p>
      </div>
      <div class="moment alt">
        ${photo("photos/ch4-02.jpg", "Add photo", "taped", "tilt-r")}
        <h3 class="hand">Favorite Moment #2</h3>
        <p class="date hand">[DATE: Add date]</p>
        <p class="memory">[CAPTION: Add caption here]</p>
      </div>
    </div>` },

  // CHAPTER V
  { chapter: "Chapter V", html: `
    <div class="inner center">
      <p class="kicker">Chapter V</p>
      <div class="five">5</div>
      <h2 class="big">Five Years</h2>
      <div class="rule"><span>✿</span></div>
    </div>` },
  { chapter: "Chapter V", html: `
    <div class="inner">
      <div class="collage three">
        ${photo("photos/ch5-01.jpg", "Favorite photo", "polaroid", "tilt-l")}
        ${photo("photos/ch5-02.jpg", "Favorite photo", "taped", "tilt-r")}
        ${photo("photos/ch5-03.jpg", "Favorite photo", "polaroid", "tilt-l2")}
      </div>
      <p class="milestone hand">5 years · 2021 — 2026</p>
      <p class="memory">[MEMORY: Add a short reflection on five years here]</p>
    </div>` },
  { chapter: "Chapter V", final: true, html: `
    <div class="inner letter">
      <p class="hand salute">Dear Ronalyn,</p>
      <!-- LETTER: replace the paragraph below with your anniversary letter -->
      <p class="body">[LETTER: Write our five-year anniversary letter here.]</p>
      <p class="hand big-hand">Happy 5th Anniversary, my love.</p>
      <p class="memory">Here's to whatever comes next.</p>
      <p class="hand sign">With all my love,<br><b>Joey</b></p>
      <span class="seal">♡</span>
    </div>` }
];

// ---- book logic -------------------------------------------
const $ = id => document.getElementById(id);
const book = $("book"), pagesEl = $("pages"), cover = $("cover");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const total = PAGES.length;
const pad = n => String(n).padStart(2, "0");
let current = 0, busy = false;
const leaves = PAGES.map((p, i) => {
  const el = document.createElement("article");
  el.className = "leaf" + (p.final ? " final" : "");
  el.innerHTML = `<div class="paper">${p.html}</div><span class="pn">${pad(i + 1)}</span>`;
  pagesEl.appendChild(el);
  return el;
});

// Load photos; keep nice placeholder if the file is missing
document.querySelectorAll(".photo").forEach(fig => {
  const img = new Image();
  img.alt = "";
  img.onload = () => {
    fig.querySelector(".ph-box").replaceWith(img); // natural aspect ratio preserved
    fig.classList.add("loaded");
  };
  img.src = "assets/" + fig.dataset.file;
});

function render() {
  leaves.forEach((el, i) => {
    el.classList.toggle("active", i === current);
    el.classList.remove("turning", "returning");
    el.style.zIndex = i === current ? 2 : 0;
  });
  const ch = PAGES[current].chapter;
  $("indicator").textContent = (ch ? ch + " · " : "") + pad(current + 1) + " / " + total;
  $("prevBtn").disabled = current === 0;
  $("nextBtn").disabled = current === total - 1;
}

function go(dir) {
  const target = current + dir;
  if (busy || target < 0 || target >= total) return;
  if (reduced) { current = target; render(); return; }
  busy = true;
  const from = leaves[current], to = leaves[target];
  if (dir > 0) {
    to.classList.add("active"); to.style.zIndex = 1;
    from.style.zIndex = 3; from.classList.add("turning");
  } else {
    from.style.zIndex = 1;
    to.classList.add("active", "returning"); to.style.zIndex = 3;
  }
  setTimeout(() => { current = target; busy = false; render(); }, 750);
}

function openBook() {
  if (!book.classList.contains("is-closed")) return;
  book.classList.remove("is-closed");
  book.classList.add("is-open");
  $("openBtn").classList.add("gone");
  $("controls").hidden = false;
  current = 0; render();
  startMusic();
}
function closeBook() {
  book.classList.remove("is-open");
  book.classList.add("is-closed");
  $("openBtn").classList.remove("gone");
  $("controls").hidden = true;
  stopMusic();
}

$("openBtn").addEventListener("click", openBook);
cover.addEventListener("click", openBook);
$("closeBtn").addEventListener("click", closeBook);
$("prevBtn").addEventListener("click", () => go(-1));
$("nextBtn").addEventListener("click", () => go(1));
$("tapLeft").addEventListener("click", () => !book._swiped && go(-1));
$("tapRight").addEventListener("click", () => !book._swiped && go(1));

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") book.classList.contains("is-closed") ? openBook() : go(1);
  else if (e.key === "ArrowLeft" && book.classList.contains("is-open")) go(-1);
});

// swipe
let sx = 0, sy = 0;
book.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
book.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (book.classList.contains("is-open") && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    go(dx < 0 ? 1 : -1);
    book._swiped = true; setTimeout(() => (book._swiped = false), 400); // avoid double-fire from tap zones
  }
}, { passive: true });

// ---- optional music (disabled unless MUSIC_FILE is set) ----
let audio = null;
function startMusic() {
  if (!MUSIC_FILE) return;
  audio = audio || new Audio(MUSIC_FILE);
  audio.loop = true;
  audio.play().catch(() => {});
}
function stopMusic() { if (audio) audio.pause(); }

render();
