/* ==========================================================
   OUR STORY — digital scrapbook  (Joey ♡ Ronalyn)
   ----------------------------------------------------------
   ALL EDITABLE CONTENT LIVES IN THE `PAGES` LIST BELOW.
   - Photos:  assets/photos/<page-id>-1.jpg, -2.jpg, -3.jpg ...
   - Videos:  assets/videos/<page-id>.mp4 (optional thumbnail:
              assets/photos/<page-id>-video.jpg)
   - Anything in [BRACKETS] is a placeholder to replace.
   See README.md for the full guide.
   ========================================================== */

const MUSIC_FILE = "";                          // optional, e.g. "assets/song.mp3". Empty = no audio.
const LETTERS_URL = "[MONTHSARY LETTERS WEBSITE URL]"; // <- paste the monthsary letters website address here
const FINAL_LETTER = "[INSERT FINAL 5TH ANNIVERSARY LETTER HERE]"; // <- the letter text goes here

const PHOTO_EXTS = ["jpg", "jpeg", "png", "webp"];
const DATE_TBD = "[DATE: Add date]";
const CAP_TBD = "[CAPTION: Add caption]";

// ---- small scrapbook decorations (inline SVG, no image files) ----
const DECO = {
  turtle: `<svg class="deco turtle" viewBox="0 0 64 40" aria-hidden="true"><ellipse cx="30" cy="22" rx="20" ry="13" fill="#8fa58a"/><path d="M16 22h28M24 12l-3 20M36 12l3 20" stroke="#5f7a5b" stroke-width="1.5" fill="none"/><circle cx="54" cy="19" r="6" fill="#a5b89f"/><circle cx="56" cy="17.5" r="1.1" fill="#4a3b30"/><ellipse cx="18" cy="35" rx="5" ry="3" fill="#a5b89f"/><ellipse cx="40" cy="35" rx="5" ry="3" fill="#a5b89f"/></svg>`,
  tulip: `<svg class="deco tulip" viewBox="0 0 30 48" aria-hidden="true"><path d="M15 46V22" stroke="#6f8b6a" stroke-width="2.2"/><path d="M15 38c-6-2-9-5-10-9M15 34c5-2 8-4 9-8" stroke="#6f8b6a" stroke-width="2" fill="none"/><path d="M6 8c0 10 3 17 9 17s9-7 9-17l-5 5-4-7-4 7z" fill="#8e63a8"/></svg>`,
  map: `<svg class="deco route" viewBox="0 0 200 36" aria-hidden="true"><path d="M6 28C40 4 60 34 100 16S160 4 192 20" stroke="#8b6d4f" stroke-width="1.6" stroke-dasharray="4 5" fill="none"/><circle cx="6" cy="28" r="3.2" fill="#b5566b"/><path d="M186 14l12 12M198 14l-12 12" stroke="#b5566b" stroke-width="2.2"/></svg>`,
  star: `<span class="deco spark">✦</span>`,
  heart: `<span class="deco spark">♡</span>`,
};

// ---- helpers ------------------------------------------------
const STYLES = ["polaroid", "taped", "plain"];
const TILTS = ["tilt-l", "tilt-r", "tilt-l2"];
function photo(id, n, label, i, size) {
  return `<figure class="photo ${STYLES[(i + (size || 0)) % 3]} ${TILTS[i % 3]}" data-base="${id}-${n}">
    <div class="ph-box"><span class="ph-text">[PHOTO: ${label}]<small>assets/photos/${id}-${n}.jpg</small></span></div>
    <i class="tape"></i></figure>`;
}
function videoCard(id, label) {
  return `<div class="vcard" data-video="${id}" data-label="${label}">
    <div class="vthumb"><div class="ph-box"><span class="ph-text">[VIDEO: ${label}]<small>assets/videos/${id}.mp4</small></span></div>
    <button type="button" class="play" aria-label="Play video: ${label}">▶ Play</button><i class="tape"></i></div></div>`;
}
const lines = a => (a || []).map(t => `<p class="memory">${t}</p>`).join("");

// Generic memory page: photos, optional text, quote, video, tags, deco
function mem(p) {
  const ph = p.photos || [];
  const n = ph.length;
  return `<div class="inner mem n${n} ${p.cls || ""}">
    ${p.date ? `<p class="date hand">${p.date}</p>` : ""}
    ${p.title ? `<h3 class="ttl">${p.title}</h3>` : ""}
    ${p.ticket ? `<div class="ticket"><span>ADMIT TWO</span><b>${p.ticket}</b></div>` : ""}
    ${n ? `<div class="shots">${ph.map((l, i) => photo(p.id, i + 1, l, i, p.shift)).join("")}</div>` : ""}
    ${p.video ? videoCard(p.id, p.video) : ""}
    ${lines(p.text)}
    ${p.quote ? `<p class="quote hand">${p.quote}</p>` : ""}
    ${p.tags ? `<p class="tags">${p.tags.map(t => `<span>#${t}</span>`).join("")}</p>` : ""}
    ${p.deco ? `<span class="decor">${p.deco.map(d => DECO[d]).join("")}</span>` : ""}
    ${p.travel ? DECO.map : ""}
  </div>`;
}
function chapter(num, title, range, sub, deco) {
  return { type: "chapter", html: `<div class="inner center chap">
    <p class="kicker">Chapter ${num}</p>
    <h2 class="big">${title}</h2>
    <div class="rule">${DECO.tulip}</div>
    <p class="hand">${range}</p>
    <p class="sub memory">${sub}</p>
    ${deco || ""}
    <p class="ph-text chapimg">[PHOTO: optional chapter photo]<small>assets/photos/chapter-${num}-1.jpg</small></p>
  </div>`, id: "chapter-" + num };
}
function timeline(items) {
  return `<div class="tl">${items.map(([d, t], i) => `<div class="tl-item ${i % 2 ? "r" : ""}"><b class="hand">${d}</b><span>${t}</span></div>`).join("")}</div>`;
}

// ---- THE BOOK ------------------------------------------------
// ch = chapter label shown in the page counter. `id` = photo file prefix.
const PAGES = [
  { ch: "", html: `<div class="inner center">
      <p class="hand">for you, Bee</p><h2 class="big">Our Story</h2>
      <p class="kicker">And My Favorite Memories</p><div class="rule">${DECO.tulip}</div>
      <p class="hand">2021 — 2026</p><p class="note">Turn the page →</p></div>` },

  // ===== CHAPTER I =====
  { ch: "Chapter I", ...chapter("I", "The Beginning", "", "Before we knew what this would become.", DECO.star) },
  { ch: "Chapter I", html: mem({ id: "jul14", date: "July 14, 2021", title: "Our Luckiest Day", photos: ["Earliest photo / screenshot"],
      text: ["Our luckiest day, we met and started chatting unknowingly to how important we'd become for each other ❤️"] }) },
  { ch: "Chapter I", html: mem({ id: "early-days", date: "The early days", title: "Snap spam, poems &amp; singing", photos: ["Early Snaps", "Early conversation", "StoryTime", "Singing Night"],
      text: ["Sending spams to each other, my funny fake stories, slowly learning about each other.", "The first ways we bonded sa snapchat, silly and building things forever ours.", CAP_TBD],
      cls: "scrap", tags: ["Unfiltered", "Pineapple", "Saturn", "ForTheBun", "Froggies", "Sharkfin", "Mobee"], deco: ["star"] }) },
  { ch: "Chapter I", html: mem({ id: "oct7-2021", date: "October 7 / 8, 2021", title: "Going steady", photos: ["Our first day as a couple"],
      text: ["We finally accepted what our hearts were telling us, you became my girlfie ❤️"], cls: "special", deco: ["heart"] }) },
  { ch: "Chapter I", html: mem({ id: "octopus", date: "Early November 2021", title: "Start of your crochets", photos: ["Purple octopus"],
      text: ["I've always loved your crochets, and will always adore your first creations."], cls: "soft" }) },
  { ch: "Chapter I", html: mem({ id: "bino", date: "November 16, 2021", title: "Bino", photos: ["Bino"],
      text: ["Even on your birthday, you encouraged me to get a new dog. Bino was dang tough, but you were gentle and supportive ❤️ Sending poems and songs to comfort your bee."],
      quote: "You helped me say yes.", cls: "emotional" }) },
  { ch: "Chapter I", html: mem({ id: "turtles", date: "January 7, 2022", title: "Our first date", photos: ["Park / nature center"],
      text: ["You told me to put our love out in the universe, I went to the nature center and was so happy you woke up for a tour. Our favorite moment: two turtles swimming toward each other, greeting face-to-face."], deco: ["turtle"] }) },
  { ch: "Chapter I", html: mem({ id: "smile", date: "2021 — 2022", title: "You gave me my smile ❤️", photos: ["Earlier photo", "Later photo", "Full-smile photo"],
      quote: "Thank you for giving me my smile",
      text: ["You told me to smile more, to smile big. Before you, I never smiled for pics", "You helped me find my smile, and love it ❤️"], cls: "dense" }) },
  { ch: "Chapter I", html: mem({ id: "valentine-2022", date: "Valentine’s Day 2022", title: "First Valentine’s", photos: ["Edited Valentine’s photo", "Edited Valentine’s photo"],
      text: ["You made these photos for me that I'll always remember. I cried, because what we had was becoming more real"], deco: ["heart"] }) },
  { ch: "Chapter I", html: mem({ id: "supporting", date: "Spring 2022", title: "Supporting each other through ups and downs", photos: ["Portfolio / work screenshot", "Cooking photo"],
      text: ["I loved how we supported each other always. You, with my websites, job hunting, and cooking. Me, with your student teaching, grad soon, resume building."] }) },
  { ch: "Chapter I", html: `<div class="inner"><h3 class="ttl">Two lives becoming one</h3>${timeline([
      ["June 12, 2022", "First TikTok accounts with our matching profile pictures"],
      ["June 18, 2022", "I first told my mom about you"],
      ["June 28, 2022", "I first told my Rene too"],
      ["July 8, 2022", "You worked on your cool first resume"]])}${DECO.star}</div>` },
  { ch: "Chapter I", html: mem({ id: "anniv-1", date: "October 2022", title: "Our first anniversary", photos: ["Bee &amp; Bee Comics", "Three crocheted tulips"],
      text: ["I made “Bee &amp; Bee Comics.” You crocheted three pretty tulips for me with meaningful letter."], cls: "gift", deco: ["tulip"] }) },
  { ch: "Chapter I", html: mem({ id: "grad", date: "September 29, 2022", title: "Your graduation", photos: ["Ronalyn’s graduation"],
      text: ["I was so proud of you, despite your doubts and worries, you forged on like always and graduated ❤️"], cls: "special" }) },
  { ch: "Chapter I", html: mem({ id: "work-hard", date: "September 11, 2022", title: "When work was hard for me...", photos: ["Her message screenshot"],
      text: ["You supported me. You gave me the courage to keep going with words I'll never forget"], quote: "“Be an amateur and be willing to learn.”", cls: "quotepage" }) },
  { ch: "Chapter I", html: mem({ id: "xmas-2022", date: "December 2022", title: "One fun Christmas ❤️", photos: ["Grinch picture", "December 12 concert gift", "December 22: meeting her first two friends"],
      text: ["December 12: when you couldn't make the concert, I brought the concert to you ❤️ December 22: your first time qwento with Ae and Brin about us."], cls: "dense" }) },

  // ===== CHAPTER II =====
  { ch: "Chapter II", ...chapter("II", "Growing Together", "", "Two years of knowing each other. Now we were finally going to meet.", DECO.tulip) },
  { ch: "Chapter II", html: mem({ id: "first-meeting", date: "July 2023", title: "Finally.", photos: ["The first meeting", "Our first hello", "First day together", "A favorite moment"],
      text: ["After two years of screens, calls, photos, and counting the days, I finally got to meet you."], cls: "special hero" }) },
  { ch: "Chapter II", html: mem({ id: "first-night", date: "July 2023 · Tagaytay", title: "Our cozy nights", photos: ["Cozy night in Tagaytay"],
      text: ["Watching The Good Bad Mother, enjoying the rain, first time shopping together ❤️"] }) },
  { ch: "Chapter II", html: mem({ id: "first-beach", date: "July 2023", title: "Strolls on our first beach", photos: ["First beach together"],
      text: ["and I lost  my bracelet lol Thanks for finding it ❤️"], deco: ["star"] }) },
  { ch: "Chapter II", html: mem({ id: "team", date: "July 2023", title: "I learned we make a great team", photos: ["Leaving the beach"],
      text: ["Leaving the beach was hectic and we had to figure things out on the fly. Despite the chaos, we worked together so well. That will always stick with me"], quote: "We figured it out together." }) },
  { ch: "Chapter II", html: mem({ id: "cook-together-1", date: "July 2023", title: "Cooking together for the first time", photos: ["Cooking near Tagaytay", "Flour tortillas in Makati"],
      text: ["Our first cooking together in rustic cabin. Later, flour tortillas breakfast in Makati. Always fun cooking with you ❤️"] }) },
  { ch: "Chapter II", html: mem({ id: "first-trip", date: "July 2023", title: "Our fun excursions", photos: ["Museum", "Mall / exploring", "Final date night"], travel: true,
      text: ["Museums, malls, exploring, and our final date night."], cls: "dense" }) },
  { ch: "Chapter II", html: mem({ id: "cod", date: "August 28, 2023", title: "First time natin maglaro ng COD Mobile", photos: ["COD Mobile screenshot"],
      text: ["This was my first time playing with you and Jane, it was so fun ❤️ Cool getting closer to your fam, and you growing comfortable"], cls: "playful" }) },
  { ch: "Chapter II", html: mem({ id: "let", date: "September 24, 2023", title: "LET", photos: ["LET day / package arriving"],
      text: ["Remember how after you took the LET exam, and a package of gifts I sent arrived na perfectly timed ❤️ You appreciated how magical it was"] }) },
  { ch: "Chapter II", html: mem({ id: "passed", date: "December 2023", title: "then you passed!", photos: ["LET result / my letter"],
      text: ["You passed and I was so proud all your hard work paid off!"], cls: "special" }) },
  { ch: "Chapter II", html: mem({ id: "little-things", date: "February 2024", title: "The little things continue", photos: ["Fake tulips for her dorm", "Little moments together"], video: "Our little moments together",
      text: ["Valentines, Game of Thrones, and good times rolling ❤️"], deco: ["tulip"], cls: "soft" }) },

  // ===== CHAPTER III =====
  { ch: "Chapter III", ...chapter("III", "Our Adventures", "", "Double the trips, double the fun!", DECO.map) },
  { ch: "Chapter III", html: mem({ id: "second-meeting", date: "April 2024", title: "Our second meeting", photos: ["Meeting again", "Together again", "A favorite moment"], travel: true,
      text: ["The wait to finally see you again was too long."], cls: "special" }) },
  { ch: "Chapter III", html: mem({ id: "welcome", date: "April 2024", title: "Our little stay", photos: ["Handmade fake tulip bouquet", "Sushi bake"],
      text: ["Loved the gifts and sushi bake we shared."], deco: ["tulip"] }) },
  { ch: "Chapter III", html: mem({ id: "tagaytay2", date: "April 2024", title: "An amazing view to share", photos: ["Sushi bake", "Escala balcony", "Sky Ranch"], travel: true,
      text: ["Our stay in Escala, excursion to Starbucks, exploring skyranch, all so cool ❤️"] }) },
  { ch: "Chapter III", html: mem({ id: "pico-nights", date: "April 2024", title: "Pico de Loro", photos: ["Sky Ranch / park night", "Beach or ducks"], travel: true,
      text: ["Pico de loro was a nice beach, and it was awesome to spend with you. I love our moment with the ducks, your narration lol. And our outdoor fancy dinner time, but getting back to the room was better hehe"] }) },
  { ch: "Chapter III", html: mem({ id: "favs-2024", date: "April 2024", title: "Favorite photos", photos: ["Favorite photo", "Favorite photo", "Favorite photo", "Favorite photo"], cls: "quiet" }) },
  { ch: "Chapter III", html: mem({ id: "cheers", date: "July 14, 2024", title: "All our virtual cheers", video: "Virtual cheers / 3-year video",
      text: ["I loved every time we ate together and had virtual cheers. Made a video for our three years since luckiest day ❤️"] }) },
  { ch: "Chapter III", html: mem({ id: "gifts", date: "September 15, 2024", title: "Little gifts we loved ❤️", photos: ["Crocheted beanie for Europe", "Heart charcuterie"],
      text: ["Loved you crocheting a beanie for me, and I sent you a heart charcuterie, good times ❤️"], cls: "gift" }) },
  { ch: "Chapter III", html: mem({ id: "oct7-2024", date: "October 7, 2024", title: "Anniversary gifts", photos: ["Gifts / silent video call"],
      text: ["Ronalyn received her gifts and we video-called, silently."], cls: "quiet" }) },
  { ch: "Chapter IV", html: mem({ id: "ring-plan", date: "November 12, 2024", title: "The promise ring plan", photos: ["Planning screenshot", "Planning screenshot"],
      text: ["Behind the scenes: I began planning the promise ring with Ronalyn’s friend."], cls: "playful" }) },
  { ch: "Chapter IV", html: mem({ id: "ring", date: "December 2, 2024", title: "The ring", photos: ["The ring"],
      text: ["I finally received the ring."], cls: "special" }) },
  { ch: "Chapter IV", html: mem({ id: "baguio", date: "December 15, 2024 onward", title: "Baguio", photos: ["Baguio"], travel: true,
      text: [CAP_TBD], deco: ["star"] }) },
  { ch: "Chapter IV", html: mem({ id: "baguio-night", date: "December 15, 2024", title: "First night in Baguio", photos: ["Night walk with crochet frogs"],
      text: ["Walking at night with our crochet frogs."] }) },
  { ch: "Chapter IV", html: mem({ id: "burnham", date: "December 16, 2024", title: "Burnham + Mines View", photos: ["Burnham Park", "Mines View"], travel: true,
      text: [CAP_TBD] }) },
  { ch: "Chapter IV", html: mem({ id: "botanical", date: "December 20, 2024", title: "Botanical Garden", photos: ["Baguio Botanical Garden"], travel: true,
      text: [CAP_TBD] }) },
  { ch: "Chapter IV", html: mem({ id: "strawberry", date: "December 21, 2024", title: "Strawberry picking", photos: ["Strawberry picking", "Top of the Eco Park"], travel: true,
      text: ["Strawberry picking, and later, a moment at the top of the Eco Park."] }) },
  { ch: "Chapter IV", html: mem({ id: "promise", date: DATE_TBD, title: "The Promise", photos: ["The night of the promise ring"],
      text: ["The night I gave Ronalyn the promise ring.", CAP_TBD], cls: "special dramatic" }) },
  { ch: "Chapter IV", html: mem({ id: "her-family", date: "Christmas &amp; New Year’s", title: "Christmas with her family", photos: ["Meeting her family", "Christmas / New Year’s"],
      text: ["Meeting her family. Christmas together. New Year’s together."], cls: "warm" }) },
  { ch: "Chapter IV", html: mem({ id: "missed-flight", date: DATE_TBD, title: "The missed flight", photos: ["Airport / extra day"],
      text: ["I missed my flight and was stressed. Ronalyn helped calm me down, and I got to stay an extra day."], quote: "You stayed with me when things went wrong." }) },
  { ch: "Chapter IV", html: mem({ id: "europe-1", date: DATE_TBD, title: "Europe", photos: ["Europe photo", "Europe photo"], travel: true, text: [CAP_TBD] }) },
  { ch: "Chapter IV", html: mem({ id: "europe-2", date: DATE_TBD, title: "Europe", photos: ["Europe photo", "Europe photo", "Europe photo"], travel: true, text: [CAP_TBD], cls: "dense" }) },
  { ch: "Chapter IV", html: mem({ id: "eiffel", date: "Valentine’s Day", title: "Eiffel", photos: ["Pullman Eiffel Hotel / Eiffel Tower call"],
      text: ["At the Pullman Eiffel Hotel, then the Eiffel Tower Valentine’s call. The card said:"],
      quote: "“Eiffel (I fall) for you every day, will you be my valentine?”", cls: "special dramatic", deco: ["heart"] }) },
  { ch: "Chapter IV", html: mem({ id: "valentine-2025", date: "Valentine’s Day", title: "Valentine’s Day", photos: ["Flowers for her family", "Mini-Joey crochet"],
      text: ["Ronalyn’s family received flowers. Ronalyn crocheted a mini-Joey."], deco: ["heart"] }) },
  { ch: "Chapter IV", html: mem({ id: "lasalle", date: DATE_TBD, title: "La Salle", photos: ["Start of her Master’s"],
      text: ["Ronalyn began her Master’s at La Salle."], cls: "special" }) },

  // ===== CHAPTER V =====
  { ch: "Chapter V", ...chapter("V", "Five Years", "July 2025 – October 2026", "And somehow, we’re still writing it.", DECO.star) },
  { ch: "Chapter V", html: mem({ id: "anniv-4", date: "October 2025", title: "The fourth anniversary", photos: ["Real tulip bouquet and decorations"],
      text: ["A real tulip bouquet and decorations were waiting when she arrived. She loved it."], deco: ["tulip"] }) },
  { ch: "Chapter V", html: mem({ id: "cook-together-2", date: DATE_TBD, title: "Cooking together", photos: ["Steak", "Redeemed pasta"],
      text: ["Steak, redeemed pasta, and cooking together."] }) },
  { ch: "Chapter V", html: mem({ id: "karaoke", date: DATE_TBD, title: "Karaoke", photos: ["Karaoke night", "Karaoke with friends"],
      text: ["Karaoke with each other and with friends. I loved watching her sing, and seeing her nails."], cls: "playful" }) },
  { ch: "Chapter V", html: mem({ id: "tlos", date: DATE_TBD, title: "TLOS", photos: ["TLOS together"],
      text: ["Enjoying TLOS together in our own way."], cls: "playful", tags: ["TLOS"] }) },
  { ch: "Chapter V", html: mem({ id: "little-things-2", date: DATE_TBD, title: "Little things", photos: ["Date dinner", "Clay masks", "Favorite pizza"],
      text: ["Date dinners, clay masks, our favorite pizza, a giant guyabano, and shopping."], cls: "dense" }) },
  { ch: "Chapter V", html: mem({ id: "nov-2025", date: "November 16, 2025", title: "Her birthday", photos: ["Tulip bouquet"],
      text: ["A tulip bouquet for her birthday."], deco: ["tulip"] }) },
  { ch: "Chapter V", html: mem({ id: "instax", date: "December 18, 2025", title: "The Instax", photos: ["Photo she took with the Instax", "Photo she took with the Instax"],
      text: ["I got her the Instax Mini she wanted. She used it in Baguio with her mom and sister and made good memories from that trip."] }) },
  { ch: "Chapter V", html: mem({ id: "latte", date: "January 23 / Valentine’s period", title: "Latte art", photos: ["Heart latte art", "Valentine’s card"],
      text: ["I tried learning latte art for her. I couldn’t get the traditional kind right, but eventually made a heart using tools."] }) },
  { ch: "Chapter V", html: mem({ id: "ig-story", date: "February 3", title: "Her Instagram story", photos: ["Instagram story screenshot"],
      text: ["Ronalyn’s Instagram story about the Valentine’s gesture."] }) },
  { ch: "Chapter V", html: mem({ id: "purple", date: "February 18", title: "Purple streak", photos: ["Purple TikTok streak"],
      text: ["Our purple TikTok streak."], cls: "playful" }) },
  { ch: "Chapter V", html: mem({ id: "spurs", date: DATE_TBD, title: "The Spurs", photos: ["Watching a game", "Watching a game"],
      text: ["Ronalyn became more and more interested in the Spurs."], cls: "playful" }) },
  { ch: "Chapter V", html: mem({ id: "may-2026", date: "May 2026", title: "With Mom", photos: ["Trip with my mom"], travel: true,
      text: ["A major trip, with my mom."], cls: "special" }) },
  { ch: "Chapter V", html: mem({ id: "cozy", date: "May 2026", title: "Cozy mornings", photos: ["Cozy morning", "Sneaky moment"],
      text: ["Time together with my mom. Cozy mornings and sneaky moments."], cls: "warm" }) },
  { ch: "Chapter V", html: mem({ id: "intramuros", date: "May 2026", title: "Intramuros", photos: ["Intramuros"], travel: true, text: [CAP_TBD] }) },
  { ch: "Chapter V", html: mem({ id: "food", date: "May 2026", title: "Food", photos: ["Chicken tinola", "MOA walk", "Clark Marriott"],
      text: ["Ronalyn’s chicken tinola. MOA walks. Clark Marriott food and conversations."], cls: "dense" }) },
  { ch: "Chapter V", html: mem({ id: "tutulari", date: "May 2026", title: "Tutulari", photos: ["Tutulari"], travel: true, text: [CAP_TBD] }) },
  { ch: "Chapter V", html: mem({ id: "pool", date: "May 2026", title: "Surprise pool", photos: ["Surprise pool"], text: [CAP_TBD] }) },
  { ch: "Chapter V", html: mem({ id: "nacpan", date: "May 2026", title: "Nacpan", photos: ["Nacpan sunset", "Beach dogs"], travel: true,
      text: ["Nacpan beach walks. Drinks. Dogs. Sunsets."] }) },
  { ch: "Chapter V", html: mem({ id: "el-nido-1", date: "May 2026", title: "El Nido", photos: ["Island hopping", "Snorkeling"], travel: true,
      text: ["Island hopping and snorkeling. Taking my mom island hopping."] }) },
  { ch: "Chapter V", html: mem({ id: "el-nido-2", date: "May 2026", title: "El Nido", photos: ["Shell collecting", "Kayaking"], travel: true,
      text: ["Shell collecting. Kayaking."] }) },
  { ch: "Chapter V", html: mem({ id: "coloring", date: DATE_TBD, title: "Coloring night", photos: ["Coloring together"],
      text: ["Drinking and coloring together."], cls: "quiet" }) },
  { ch: "Chapter V", html: mem({ id: "bday-dinner", date: DATE_TBD, title: "Birthday dinner", photos: ["Birthday dinner"], text: [CAP_TBD] }) },
  { ch: "Chapter V", html: mem({ id: "finals", date: DATE_TBD, title: "The Spurs Finals", photos: ["Watching the Finals"],
      quote: "We didn’t win the Finals.", text: ["But I still loved every game."], cls: "playful" }) },
  { ch: "Chapter V", html: mem({ id: "games", date: DATE_TBD, title: "Our movies + games", photos: ["Movie night", "Gaming night"],
      text: ["Movie nights. Gaming nights. Playing together, and with her sister."] }) },
  { ch: "Chapter V", html: mem({ id: "growing", date: "August", title: "Watching her grow", photos: ["Her first weeks at Jollibee"],
      text: ["Applying for jobs in August. Interviews. Not discouraged. Then finally a job at Jollibee, and excelling in the first weeks."],
      quote: "I’ve always loved watching you become more and more yourself.", cls: "special" }) },
  { ch: "Chapter V", html: `<div class="inner center five-page">
      <div class="five">5</div><h2 class="big">Five years.</h2>
      <div class="mini">${["I", "II", "III", "IV", "V"].map((c, i) => photo("five-years", i + 1, "Chapter " + c, i)).join("")}</div>
      <p class="memory">Five chapters. Thousands of little moments.</p></div>` },
  { ch: "Chapter V", html: `<div class="inner center favs"><h3 class="ttl">Favorite moments</h3>
      <div class="collage">${[1, 2, 3, 4, 5, 6].map(i => photo("favorites", i, "Favorite #" + i, i)).join("")}</div>
      <p class="memory">My favorite part wasn’t any single day.</p><p class="memory">It was getting to have all of them with you.</p></div>` },
  { ch: "Chapter V", html: `<div class="inner letter-page"><p class="hand salute">Dear Ronalyn,</p>
      <p class="body" id="letterBody"></p><p class="hand sign">— Joey</p></div>`, letter: true },
  { ch: "Chapter V", final: true, html: `<div class="inner mem n1 final-page special">
      <div class="shots">${photo("final", 1, "Large favorite photo", 0)}</div>
      <p class="memory">Five years down.</p><p class="memory">Forever to go.</p>
      <p class="hand big-hand">Happy 5th Anniversary, my love.</p><p class="hand sign">— Joey</p>
      <a class="letters-btn" id="lettersBtn" target="_blank" rel="noopener">Read all our letters</a></div>` }
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

// Load photos (tries jpg/jpeg/png/webp); keep the placeholder if no file exists
function loadPhoto(fig, k = 0) {
  if (k >= PHOTO_EXTS.length) return;
  const img = new Image();
  img.alt = "";
  img.onload = () => {
    fig.querySelector(".ph-box").replaceWith(img); // natural aspect ratio preserved
    fig.classList.add("loaded");
  };
  img.onerror = () => loadPhoto(fig, k + 1);
  img.src = "assets/photos/" + fig.dataset.base + "." + PHOTO_EXTS[k];
}
document.querySelectorAll(".photo").forEach(fig => loadPhoto(fig));

// Video thumbnails (optional)
document.querySelectorAll(".vcard").forEach(card => {
  const box = card.querySelector(".ph-box");
  const img = new Image(); img.alt = "";
  let k = 0;
  img.onload = () => { box.replaceWith(img); };
  img.onerror = () => { if (++k < PHOTO_EXTS.length) img.src = `assets/photos/${card.dataset.video}-video.${PHOTO_EXTS[k]}`; };
  img.src = `assets/photos/${card.dataset.video}-video.${PHOTO_EXTS[0]}`;
  card.querySelector(".play").addEventListener("click", () => openVideo(card.dataset.video, card.dataset.label));
});

// Video modal: never autoplays; opens only after tapping Play
const vmodal = $("videoModal"), vbox = $("videoBox");
function openVideo(id, label) {
  vbox.innerHTML = "";
  const v = document.createElement("video");
  v.controls = true; v.playsInline = true; v.preload = "metadata";
  v.src = `assets/videos/${id}.mp4`;
  v.onerror = () => { vbox.innerHTML = `<p class="vmissing">[VIDEO: ${label}]<br><small>Add assets/videos/${id}.mp4</small></p>`; };
  vbox.appendChild(v);
  vmodal.hidden = false;
  $("videoClose").focus();
}
function closeVideo() {
  const v = vbox.querySelector("video"); if (v) v.pause();
  vbox.innerHTML = ""; vmodal.hidden = true;
}
$("videoClose").addEventListener("click", closeVideo);
vmodal.addEventListener("click", e => { if (e.target === vmodal) closeVideo(); });

// Letter + final link
const letterEl = document.getElementById("letterBody");
if (letterEl) letterEl.textContent = FINAL_LETTER;
const lb = document.getElementById("lettersBtn");
if (lb) {
  if (/^https?:\/\//.test(LETTERS_URL)) lb.href = LETTERS_URL;
  else { lb.removeAttribute("target"); lb.classList.add("pending"); lb.title = LETTERS_URL; lb.textContent += " " + LETTERS_URL; lb.addEventListener("click", e => e.preventDefault()); }
}

// Chapter navigation
const chapterStarts = [];
PAGES.forEach((p, i) => { if (p.type === "chapter") chapterStarts.push(i); });
const menu = $("chapterMenu");
function toPage(i) { menu.hidden = true; current = i; busy = false; render(); }
menu.innerHTML = `<button type="button" data-i="0">Opening page</button>` +
  chapterStarts.map((s, i) => `<button type="button" data-i="${s}">Chapter ${["I","II","III","IV","V"][i]}</button>`).join("");
menu.addEventListener("click", e => { const b = e.target.closest("button"); if (b) toPage(+b.dataset.i); });
$("chaptersBtn").addEventListener("click", () => { menu.hidden = !menu.hidden; });

function render() {
  leaves.forEach((el, i) => {
    el.classList.toggle("active", i === current);
    el.classList.remove("turning", "returning");
    el.style.zIndex = i === current ? 2 : 0;
  });
  const ch = PAGES[current].ch;
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
$("closeBtn").addEventListener("click", () => { menu.hidden = true; closeBook(); });
$("prevBtn").addEventListener("click", () => go(-1));
$("nextBtn").addEventListener("click", () => go(1));
$("tapLeft").addEventListener("click", () => !book._swiped && go(-1));
$("tapRight").addEventListener("click", () => !book._swiped && go(1));

document.addEventListener("keydown", e => {
  if (!vmodal.hidden) { if (e.key === "Escape") closeVideo(); return; }
  if (e.key === "Escape") menu.hidden = true;
  if (e.key === "ArrowRight") book.classList.contains("is-closed") ? openBook() : go(1);
  else if (e.key === "ArrowLeft" && book.classList.contains("is-open")) go(-1);
});

// swipe
let sx = 0, sy = 0;
book.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
book.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (vmodal.hidden && book.classList.contains("is-open") && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
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
