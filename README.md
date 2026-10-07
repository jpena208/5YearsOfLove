# Our Story — Five Years of Us

An interactive digital scrapbook for our 5th anniversary. Only HTML, CSS and vanilla JavaScript (`index.html`, `style.css`, `script.js`). **No installation, npm or build step.** It works directly from GitHub Pages.

The book has five chapters (The Beginning, Growing Together, Our Adventures, Our Favorite Moments, Five Years) and about 88 pages, one memory per page. Every photo, video, caption, date and the letter is a clearly labeled placeholder until replaced.

## 1. Where photographs go
Upload images to **`assets/photos/`** (on GitHub: open the folder > *Add file* > *Upload files*).
`assets/decorations/` is reserved for your own stickers/doodles.

## 2. Where videos go
Upload `.mp4` files to **`assets/videos/`**. Videos never autoplay; they open in a pop-up when "▶ Play" is tapped.

## 3. How to replace placeholders
Every placeholder tells you the exact filename it expects, e.g. `assets/photos/first-meeting-1.jpg`.
Name = **page id** + `-1`, `-2`, etc. (photo order on the page). For example, the first-meeting page has slots `first-meeting-1` through `first-meeting-4`. Simply upload a file with that name (`.jpg`, `.jpeg`, `.png` or `.webp`); the placeholder is replaced automatically. Photos keep their own aspect ratio (nothing is cropped).

- Video: upload `assets/videos/<page-id>.mp4`. Optional thumbnail: `assets/photos/<page-id>-video.jpg`. Video cards are on the virtual cheers page (`cheers`) and the little things page (`little-things`).
- To add a video to another page, add `video: "Label"` to that page in `script.js`.
- Chapter 5 "Five Years" uses `five-years-1` … `-5`, "Favorite moments" uses `favorites-1` … `-6`, final page uses `final-1`.

## 4. Captions and dates
Open **`script.js`**. Each page is one line/block in the `PAGES` list with an `id`, `date`, `title`, `photos` (labels), `text` (captions) and optional `quote`. Edit the text between the quotes. Search for `[` to find every placeholder (`[DATE: Add date]`, `[CAPTION: Add caption]`, etc.). Edit on GitHub with the pencil icon, then *Commit changes*.

## 5. The final letter
At the top of `script.js`, replace the text of **`FINAL_LETTER`** (`[INSERT FINAL 5TH ANNIVERSARY LETTER HERE]`).

## 6. Monthsary letters website URL
At the top of `script.js`, replace **`LETTERS_URL`** (`[MONTHSARY LETTERS WEBSITE URL]`) with the full address starting with `https://`. The final page's "Read all our letters" button then opens it.

## 7. Navigation
- Click/tap the right or left edge of the book, or use the ‹ › buttons.
- Keyboard: ArrowRight = next, ArrowLeft = previous.
- Phone: swipe left/right.
- "Chapters" jumps to a chapter; "Back to cover" closes the book.
- Reduced-motion settings disable the page-turn animation.

## 8. Enable GitHub Pages
Repository **Settings > Pages**: Source *Deploy from a branch*, Branch **main**, folder **/ (root)**, *Save*. The site appears at `https://<your-username>.github.io/<repository-name>/` about a minute after each commit.

## 9. Changing things directly on GitHub
Everything can be done in the browser on github.com: upload files in `assets/...`, edit `script.js` with the pencil icon, and commit. GitHub Pages republishes automatically.

## Optional music (off by default)
Upload an audio file and set `MUSIC_FILE` at the top of `script.js` (e.g. `"assets/song.mp3"`); it starts only after clicking "Open Our Story".
