/* ==========================================================================
   Shared interaction layer: scroll reveal, Apple-style 3D tilt on cards,
   ambient parallax blobs, and the peptide accordion cards.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- active nav link -------------------------------------------------*/
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  /* ---- scroll reveal (IntersectionObserver) -----------------------------*/
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---- Apple-style 3D tilt on hover (pointer-based) --------------------*/
  const tiltCards = document.querySelectorAll('.card3d');
  const MAX_TILT = 6; // degrees, subtle — not a gimmick

  tiltCards.forEach(card => {
    let raf = null;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const rotateY = (px - 0.5) * (MAX_TILT * 2);
      const rotateX = (0.5 - py) * (MAX_TILT * 2);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
      });
    };

    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    };

    // Disable on touch devices — tilt is a mouse/trackpad affordance.
    if (window.matchMedia('(pointer: fine)').matches) {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', reset);
    }
  });

  /* ---- ambient scroll parallax (blobs, helix, hero vial, stars) --------*/
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  const applyParallax = () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });
  applyParallax();

  /* ---- hero mouse parallax (vial + blobs drift toward cursor) ----------*/
  const heroLayer = document.querySelector('[data-hero-parallax]');
  if (heroLayer && window.matchMedia('(pointer: fine)').matches) {
    document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      heroLayer.querySelectorAll('[data-depth]').forEach(el => {
        const depth = parseFloat(el.dataset.depth) || 10;
        el.style.transform = `translate(${px * depth}px, ${py * depth}px)`;
      });
    });
  }

  /* ---- expandable peptide cards (accordion) -----------------------------*/
  document.querySelectorAll('.pep-card').forEach(card => {
    const body = card.querySelector('.pep-card-body');
    if (!body) return;
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const isOpen = card.classList.contains('open');
      // close others in the same group for a tidy single-open accordion
      const group = card.closest('.pep-grid');
      if (group) {
        group.querySelectorAll('.pep-card.open').forEach(other => {
          if (other !== card) {
            other.classList.remove('open');
            other.querySelector('.pep-card-body').style.maxHeight = null;
          }
        });
      }
      if (isOpen) {
        card.classList.remove('open');
        body.style.maxHeight = null;
      } else {
        card.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---- mobile nav ---------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('mobile-open'));
  }
});
