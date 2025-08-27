
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// IntersectionObserver for reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold: 0.12});
reveals.forEach(el => io.observe(el));

// Tilt effect
function applyTilt(el){
  const strength = 10; // degrees
  let rect;
  function onMove(e){
    if(!rect) rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const x = (e.clientX - cx) / (rect.width/2);
    const y = (e.clientY - cy) / (rect.height/2);
    el.style.transform = `rotateX(${-y*strength}deg) rotateY(${x*strength}deg)`;
  }
  function reset(){ el.style.transform = 'rotateX(0) rotateY(0)'; rect = null; }
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
}
document.querySelectorAll('.tilt').forEach(applyTilt);

// Smooth scroll (for legacy browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded','false');
      }
    }
  });
});

// Year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
