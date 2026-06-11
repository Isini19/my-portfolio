
// ── NAVBAR SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
});

// ── HAMBURGER ──
const hbg = document.getElementById('hbg');
const navLinks = document.getElementById('navLinks');
let open = false;
hbg.addEventListener('click', () => {
  open = !open;
  if (open) {
    Object.assign(navLinks.style, {
      display: 'flex', flexDirection: 'column',
      position: 'absolute', top: '68px', right: '1.5rem',
      background: 'rgba(6,13,15,0.98)', backdropFilter: 'blur(20px)',
      padding: '1.5rem 2rem', gap: '1.2rem',
      border: '1px solid rgba(20,184,166,0.2)',
      borderRadius: '12px', zIndex: '998', minWidth: '200px'
    });
  } else {
    navLinks.style.display = 'none';
  }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { open = false; navLinks.style.display = 'none'; });
});

// ── TYPING EFFECT ──
const phrases = [
  'MIS Undergraduate · CA Candidate',
  'Business Analytics Professional',
  'Business Intelligence Enthusiast',
  'Aspiring Data Analyst', 
  'Data Storytelling & Dashboard Design',
  'IT + Finance — Bridging Both Worlds'
];
let pi = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');

function tick() {
  const cur = phrases[pi];
  typedEl.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
  if (!del && ci > cur.length) { del = true; setTimeout(tick, 2400); return; }
  if (del && ci < 0) { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(tick, del ? 40 : 85);
}
tick();

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 90);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
revealEls.forEach(el => revObs.observe(el));

// ── SKILL RATING DOTS ──
document.querySelectorAll('.sk-item').forEach(item => {
  const tag = item.querySelector('.ski-tag');
  const fill = item.querySelector('.ski-fill');
  const rating = fill ? Math.max(1, Math.min(5, Math.round(Number(fill.dataset.w) / 20))) : 0;
  const dots = document.createElement('span');
  dots.className = 'ski-dots';
  for (let i = 1; i <= 5; i += 1) {
    const dot = document.createElement('span');
    if (i <= rating) dot.classList.add('active');
    dots.appendChild(dot);
  }
  if (tag) {
    tag.insertAdjacentElement('afterend', dots);
    tag.classList.add('visually-hidden');
  } else {
    item.querySelector('.ski-top').appendChild(dots);
  }
});

// ── SKILL BARS ANIMATE ──
const fills = document.querySelectorAll('.ski-fill');
// orbit words subtle pulse handled by CSS
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(f => barObs.observe(f));

// ── ACTIVE NAV ──
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 220) cur = s.id; });
  links.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--teal)' : ''; });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});



// ── PROJECT CARDS TILT ON HOVER ──
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * 3;
    const rotY = ((x - cx) / cx) * -3;
    card.style.transform = `translateY(-5px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── CAREER CARDS ENTRANCE ──
document.querySelectorAll('.career-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(-15px)';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
        }, i * 150);
        obs.unobserve(card);
      }
    });
  }, { threshold: 0.2 });
  obs.observe(card);
});