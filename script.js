(function () {
  'use strict';

  var scene = document.getElementById('envelope-scene');
  var envelope = document.getElementById('envelope');
  var letterView = document.getElementById('letter-view');
  var again = document.getElementById('again');
  var photo = document.getElementById('photo');
  var photoBox = photo.parentNode;
  var musicForm = document.getElementById('music-form');
  var youtubeLink = document.getElementById('youtube-link');
  var musicError = document.getElementById('music-error');
  var musicPlayer = document.getElementById('music-player');
  var floaters = document.getElementById('floaters');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers = [];

  // Floating hearts and tulips
  var symbols = ['\u2665', '\u{1F337}', '\u{1F337}', '\u2665'];
  for (var i = 0; i < 14; i++) {
    var s = document.createElement('span');
    s.textContent = symbols[i % symbols.length];
    s.style.left = (Math.random() * 96) + '%';
    s.style.fontSize = (0.9 + Math.random() * 1.1) + 'rem';
    s.style.animationDuration = (14 + Math.random() * 14) + 's';
    s.style.animationDelay = (-Math.random() * 20) + 's';
    floaters.appendChild(s);
  }

  // Show the placeholder if the photo is missing
  function checkPhoto() {
    photoBox.classList.toggle('no-image', photo.complete && photo.naturalWidth === 0);
  }
  photo.addEventListener('error', function () { photoBox.classList.add('no-image'); });
  photo.addEventListener('load', function () { photoBox.classList.remove('no-image'); });
  checkPhoto();

  function later(fn, ms) { timers.push(setTimeout(fn, reduce ? 0 : ms)); }

  function openEnvelope() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    envelope.setAttribute('aria-expanded', 'true');
    later(function () { scene.classList.add('leaving'); }, 1700);
    later(function () {
      scene.hidden = true;
      letterView.hidden = false;
      window.scrollTo(0, 0);
      again.focus({ preventScroll: true });
    }, 2300);
  }

  function reset() {
    timers.forEach(clearTimeout);
    timers = [];
    musicPlayer.replaceChildren();
    musicPlayer.hidden = true;
    musicError.hidden = true;
    letterView.hidden = true;
    scene.hidden = false;
    scene.classList.remove('leaving');
    envelope.classList.remove('open');
    envelope.removeAttribute('aria-expanded');
    window.scrollTo(0, 0);
    envelope.focus({ preventScroll: true });
  }

  function getYouTubeVideoId(value) {
    var url;
    try {
      url = new URL(value);
    } catch (error) {
      return null;
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    var host = url.hostname.toLowerCase();
    if (host === 'youtu.be') return url.pathname.slice(1).split('/')[0];
    if (host !== 'youtube.com' && host !== 'www.youtube.com' &&
        host !== 'm.youtube.com' && host !== 'youtube-nocookie.com' &&
        host !== 'www.youtube-nocookie.com') return null;

    if (url.pathname === '/watch') return url.searchParams.get('v');
    var match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
    return match ? match[1] : null;
  }

  function playYouTube(event) {
    event.preventDefault();
    var videoId = getYouTubeVideoId(youtubeLink.value.trim());
    if (!videoId || !/^[\w-]{11}$/.test(videoId)) {
      musicError.hidden = false;
      musicPlayer.replaceChildren();
      musicPlayer.hidden = true;
      return;
    }

    musicError.hidden = true;
    var player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1';
    player.title = 'YouTube music player';
    player.allow = 'autoplay; encrypted-media; picture-in-picture; web-share';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;
    musicPlayer.replaceChildren(player);
    musicPlayer.hidden = false;
  }

  envelope.addEventListener('click', openEnvelope);
  again.addEventListener('click', reset);
  musicForm.addEventListener('submit', playYouTube);
})();
