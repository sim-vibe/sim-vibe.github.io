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
