# Envelope

A tiny, static "open the letter" surprise for World Teachers' Day. Only HTML, CSS and vanilla JavaScript: no installs, no build step, no local software.

## 1. Add your photo
Upload your picture into the `assets/` folder and name it **`assets/girlfriend.jpg`** (on GitHub: open `assets/` > *Add file* > *Upload files*). Until it exists, a "YOUR PHOTO HERE" placeholder is shown. To use a different filename, change `src="assets/girlfriend.jpg"` in `index.html`.

## 2. Write your message
Open **`index.html`** and find the `<div class="message">` block (marked with the comment `LETTER MESSAGE`). Replace the bracketed placeholder text inside the `<p>` tags with your own words.

## 3. Edit and preview on GitHub
Open a file on GitHub, click the pencil icon, edit, then *Commit changes*. To preview, enable GitHub Pages (below) and open your site URL after the deploy finishes (about a minute). Opening `index.html` directly in a browser also works.

## 4. Enable GitHub Pages
Repository **Settings > Pages > Build and deployment**: Source *Deploy from a branch*, Branch **main**, folder **/ (root)**, then *Save*. Your site appears at `https://<your-username>.github.io/Envelope/`.

## 5. No installation needed
Everything can be done in the browser on github.com.

## Background song
The linked YouTube song starts when the envelope is opened and stops when the letter is folded back up. To use a different song, replace `musicVideoId` in `script.js` with the ID from its YouTube link.
