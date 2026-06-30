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

// Compact third-party cookie banner (injected by Metrika/tracking scripts)
function compactCookieBanner(el) {
  el.style.padding = '8px 16px';
  el.style.fontSize = '12px';
  el.style.lineHeight = '1.3';
  el.style.maxHeight = '64px';
  el.style.overflow = 'hidden';
  el.querySelectorAll('button, a').forEach((btn) => {
    btn.style.padding = '4px 12px';
    btn.style.fontSize = '12px';
  });
}

const bannerObserver = new MutationObserver(() => {
  document.querySelectorAll('body > div').forEach((div) => {
    const style = getComputedStyle(div);
    if (
      style.position === 'fixed' &&
      (style.bottom === '0px' || parseInt(style.bottom) < 10) &&
      /cookie/i.test(div.textContent)
    ) {
      compactCookieBanner(div);
    }
  });
});
bannerObserver.observe(document.body, { childList: true, subtree: true });

// Track all CTA clicks (optional console log for debugging)
document.querySelectorAll('a[href*="t.me"]').forEach((link) => {
  link.addEventListener('click', () => {
    console.log('CTA click → Telegram');
  });
});
