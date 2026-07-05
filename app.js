// Demo video: starts muted (browsers block autoplay with sound). The button
// toggles sound on/off so it never traps the user with noise.
var demoVid = document.getElementById('demoVid');
var demoSound = document.getElementById('demoSound');
if (demoVid && demoSound) {
  demoSound.addEventListener('click', function () {
    demoVid.muted = !demoVid.muted;
    if (!demoVid.muted) demoVid.play();
    demoSound.classList.toggle('on', !demoVid.muted);
    demoSound.setAttribute('aria-pressed', String(!demoVid.muted));
  });
}

// Skins gallery: tap a thumbnail to view it large in a lightbox
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
if (lightbox && lightboxImg) {
  var openLightbox = function (img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  var closeLightbox = function () {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.skins-row .shot').forEach(function (img) {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', function () { openLightbox(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); }
    });
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

// Nav scroll tint (landing only)
var nav = document.getElementById('nav');
if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 10); }, { passive: true });

// Reveal on scroll
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

// Tap phone to toggle LED mode (landing only)
var phone = document.getElementById('phone');
var tapHint = document.getElementById('tapHint');
if (phone) {
  var toggleLed = function () { phone.classList.toggle('led'); if (tapHint) tapHint.classList.add('hide'); };
  phone.addEventListener('click', toggleLed);
  phone.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLed(); }
  });
}

// Nav download dropdown
var dlWrap = document.querySelector('.nav-dl-wrap');
if (dlWrap) {
  var dlBtn = dlWrap.querySelector('.nav-dl');
  dlBtn.addEventListener('click', function () {
    var open = dlWrap.classList.toggle('open');
    dlBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (!dlWrap.contains(e.target)) {
      dlWrap.classList.remove('open');
      dlBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Footer language dropdown
var langSelect = document.querySelector('.lang-select');
if (langSelect) {
  var langBtn = langSelect.querySelector('.lang-btn');
  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = langSelect.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function () {
    langSelect.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
  langSelect.querySelectorAll('[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('keyz_lang', this.getAttribute('data-lang')); } catch (e) {}
    });
  });
}
