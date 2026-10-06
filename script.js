(function () {
  'use strict';

  var scene = document.getElementById('envelope-scene');
  var envelope = document.getElementById('envelope');
  var letterView = document.getElementById('letter-view');
  var again = document.getElementById('again');
  var photo = document.getElementById('photo');
  var photoBox = photo.parentNode;
  var musicPlayer = document.getElementById('music-player');
  var musicVideoId = 'hDU4GB1PTxc';
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
    var player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' + musicVideoId + '?autoplay=1&controls=0&playsinline=1';
    player.title = 'Background music';
    player.allow = 'autoplay; encrypted-media';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    musicPlayer.replaceChildren(player);
    musicPlayer.hidden = false;
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
    letterView.hidden = true;
    scene.hidden = false;
    scene.classList.remove('leaving');
    envelope.classList.remove('open');
    envelope.removeAttribute('aria-expanded');
    window.scrollTo(0, 0);
    envelope.focus({ preventScroll: true });
  }

  envelope.addEventListener('click', openEnvelope);
  again.addEventListener('click', reset);
})();
