/* ==========================================================================
   Shared interaction layer: scroll reveal, Apple-style 3D tilt on cards,
   ambient parallax blobs, and the peptide accordion cards.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- hamburger menu --------------------------------------------------*/
  const here = location.pathname.split('/').pop() || 'index.html';
  if (!document.querySelector('[data-menu-drawer]')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="menu-overlay" data-menu-overlay hidden></div>
      <aside class="menu-drawer" data-menu-drawer aria-hidden="true">
        <p class="menu-kicker mono">Menú</p>
        <nav>
          <ul class="menu-links">
            <li><a href="index.html">Catálogo</a></li>
            <li><a href="quiz.html">Ayúdame a elegir</a></li>
            <li><a href="informacion.html">Información</a></li>
            <li><a href="contacto.html">Pedidos</a></li>
          </ul>
        </nav>
        <a href="contacto.html" class="btn btn-primary menu-cta">Hacer pedido</a>
      </aside>
    `);
  }

  const menuBtn = document.querySelector('[data-open-menu]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  const menuDrawer = document.querySelector('[data-menu-drawer]');

  document.querySelectorAll('.menu-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  const openMenu = () => {
    if (!menuDrawer) return;
    document.dispatchEvent(new Event('lotus:close-cart'));
    menuOverlay.hidden = false;
    menuDrawer.setAttribute('aria-hidden', 'false');
    menuBtn?.classList.add('is-open');
    menuBtn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    requestAnimationFrame(() => {
      menuOverlay.classList.add('in');
      menuDrawer.classList.add('in');
    });
  };

  const closeMenu = () => {
    if (!menuDrawer) return;
    menuOverlay.classList.remove('in');
    menuDrawer.classList.remove('in');
    menuBtn?.classList.remove('is-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    menuDrawer.setAttribute('aria-hidden', 'true');
    setTimeout(() => { menuOverlay.hidden = true; }, 280);
  };

  menuBtn?.addEventListener('click', () => {
    menuDrawer.classList.contains('in') ? closeMenu() : openMenu();
  });
  menuOverlay?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuDrawer?.classList.contains('in')) closeMenu();
  });
  document.addEventListener('lotus:close-menu', closeMenu);

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

  /* ---- ambient scroll parallax (stars, page-header blobs) --------------*/
  const parallaxEls = document.querySelectorAll('[data-parallax]:not([data-hero-layer])');
  let ticking = false;

  const applyParallax = () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translateY(${scrollY * speed}px)`;
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

  /* ---- hero parallax: scroll + pointer/touch (mobile included) ---------*/
  const hero = document.querySelector('.hero');
  const heroLayers = document.querySelectorAll('[data-hero-layer]');
  if (hero && heroLayers.length) {
    let pointerX = 0;
    let pointerY = 0;
    let heroTick = false;

    const applyHeroLayers = () => {
      const scrollY = window.scrollY;
      heroLayers.forEach(el => {
        const depth = parseFloat(el.dataset.depth) || 0;
        const speed = parseFloat(el.dataset.parallax) || 0;
        const x = pointerX * depth;
        const y = pointerY * depth + scrollY * speed;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      heroTick = false;
    };

    const setPointer = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect();
      pointerX = (clientX - rect.left) / rect.width - 0.5;
      pointerY = (clientY - rect.top) / rect.height - 0.5;
      if (!heroTick) {
        heroTick = true;
        window.requestAnimationFrame(applyHeroLayers);
      }
    };

    hero.addEventListener('mousemove', (e) => setPointer(e.clientX, e.clientY));
    hero.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('scroll', () => {
      if (!heroTick) {
        heroTick = true;
        window.requestAnimationFrame(applyHeroLayers);
      }
    }, { passive: true });
    applyHeroLayers();
  }

  /* ---- expandable peptide cards (accordion) -----------------------------*/
  document.querySelectorAll('.pep-card').forEach(card => {
    const body = card.querySelector('.pep-card-body');
    if (!body) return;
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button, .pep-card-shop')) return;
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

});
