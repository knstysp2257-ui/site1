// Language toggle (KO / EN), remembered per visitor
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('langBtn');
  let lang = 'ko';
  try { lang = localStorage.getItem('cl-lang') || 'ko'; } catch (e) {}
  const apply = () => {
    root.dataset.lang = lang;
    root.lang = lang;
    btn.textContent = lang === 'ko' ? 'EN' : '한국어';
  };
  apply();
  btn.addEventListener('click', () => {
    lang = lang === 'ko' ? 'en' : 'ko';
    try { localStorage.setItem('cl-lang', lang); } catch (e) {}
    apply();
  });
})();

// Restaurant filters
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === chip));
    const f = chip.dataset.f;
    document.querySelectorAll('.card').forEach(card => {
      card.classList.toggle('hide', f !== 'all' && card.dataset.c !== f);
    });
  });
});

// Lightbox
const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
document.querySelectorAll('[data-zoom]').forEach(img => {
  img.addEventListener('click', () => { lbImg.src = img.src; lbImg.alt = img.alt; lb.hidden = false; });
});
lb.addEventListener('click', () => { lb.hidden = true; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

// Reveal on scroll
const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.section .wrap > *, .card, .steps li').forEach(el => {
  if (!io) return;
  el.classList.add('reveal');
  io.observe(el);
});
