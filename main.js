// Scroll-triggered fade-in
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach((el) => observer.observe(el));

// Trigger elements already in viewport on load
window.addEventListener('load', () => {
  fadeEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

// Sticky mobile button — hide when final CTA section is visible
const stickyBtn = document.getElementById('stickyBtn');
const ctaSection = document.getElementById('cta');

if (stickyBtn && ctaSection) {
  const ctaObserver = new IntersectionObserver(
    ([entry]) => {
      if (window.innerWidth <= 600) {
        stickyBtn.style.display = entry.isIntersecting ? 'none' : 'block';
      }
    },
    { threshold: 0.2 }
  );
  ctaObserver.observe(ctaSection);
}

// Track all CTA clicks (optional console log for debugging)
document.querySelectorAll('a[href*="t.me"]').forEach((link) => {
  link.addEventListener('click', () => {
    console.log('CTA click → Telegram');
  });
});
