# Our Story — Five Years of Us

An interactive digital scrapbook for our 5th anniversary. Only HTML, CSS and vanilla JavaScript (`index.html`, `style.css`, `script.js`). **No local software, npm or build step is needed.**

## 1. Where to put photographs
Upload images to **`assets/photos/`** (on GitHub: open the folder > *Add file* > *Upload files*). `assets/decorations/` is reserved for your own stickers/doodles.

## 2. How to replace each photo
Every photo slot is listed in the `PAGES` list at the top of **`script.js`**, as `photo("photos/ch1-first.jpg", ...)`. Either upload your picture using that exact filename, or change the filename in the code. Until a file exists, a dashed "[PHOTO: ...]" placeholder shows (no broken images). Photos keep their own aspect ratio, so square and portrait pictures are not cropped.

Slots: `ch1-first`, `ch2-01/02`, `ch3-01/02`, `ch4-01/02`, `ch5-01/02/03` (all `.jpg`; if you use `.png`, edit the name in `script.js`).

## 3. Captions and dates
In `script.js`, replace the text in brackets: `[CAPTION: ...]`, `[DATE: ...]`, `[MEMORY: ...]`, `[DESTINATION]`, and the `Favorite Moment #1` titles. Search the file for `[` to find them all.

## 4. The anniversary letter
Last page of `PAGES` in `script.js`: replace `[LETTER: Write our five-year anniversary letter here.]`.

## 5. Navigation
- Click/tap the right or left side of the book, or use the ‹ › buttons.
- Keyboard: ArrowRight = next, ArrowLeft = previous.
- Phone: swipe left/right.
- "Back to cover" closes the book. Reduced-motion settings disable page-turn animation.

## 6. Preview with GitHub Pages
Repository **Settings > Pages**: Source *Deploy from a branch*, Branch **main**, folder **/ (root)**, *Save*. Your site appears at `https://<your-username>.github.io/Envelope/` about a minute after each commit.

## 7. No installation needed
Everything can be done in the browser on github.com.

## Optional music (off by default)
Nothing plays automatically. To enable, upload an audio file and set `MUSIC_FILE` at the top of `script.js` (e.g. `"assets/song.mp3"`); it starts only after clicking "Open Our Story".
