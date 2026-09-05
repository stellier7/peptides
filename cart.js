/* ==========================================================================
   Cart + WhatsApp checkout
   Persists in localStorage. Checkout opens a prefilled WhatsApp message.
   ========================================================================== */

const WA_NUMBER = '50496784674';
const SHIPPING_LEMPIRAS = 100;
const STORAGE_KEY = 'lotus-cart-v1';

const slug = (s) => String(s)
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const parsePrice = (text) => {
  if (!text || /gratis/i.test(text)) return 0;
  const n = String(text).replace(/[^\d]/g, '');
  return Number(n) || 0;
};

const formatPrice = (n) => `L.${Number(n).toLocaleString('en-US')}`;

const loadState = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!raw || !Array.isArray(raw.items)) return { items: [], delivery: 'envio' };
    return {
      items: raw.items.filter(i => i && i.sku && i.name && i.price > 0 && i.qty > 0),
      delivery: raw.delivery === 'pickup' ? 'pickup' : 'envio',
    };
  } catch {
    return { items: [], delivery: 'envio' };
  }
};

const saveState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

const countItems = (state) => state.items.reduce((n, i) => n + i.qty, 0);
const subtotal = (state) => state.items.reduce((n, i) => n + i.price * i.qty, 0);
const shipping = (state) => {
  if (!state.items.length) return 0;
  return state.delivery === 'pickup' ? 0 : SHIPPING_LEMPIRAS;
};

const addItem = (state, product) => {
  const existing = state.items.find(i => i.sku === product.sku);
  if (existing) existing.qty += 1;
  else state.items.push({ ...product, qty: 1 });
  return state;
};

const setQty = (state, sku, qty) => {
  if (qty < 1) state.items = state.items.filter(i => i.sku !== sku);
  else {
    const item = state.items.find(i => i.sku === sku);
    if (item) item.qty = qty;
  }
  return state;
};

const buildWhatsAppUrl = (state) => {
  const lines = [
    'Hola, quiero hacer un pedido:',
    '',
    ...state.items.map(i => `• ${i.qty}× ${i.name} — ${formatPrice(i.price * i.qty)}`),
    '',
    `Subtotal: ${formatPrice(subtotal(state))}`,
    state.delivery === 'pickup'
      ? 'Entrega: pick-up (Gratis) — Blvd. Morazán o Loarque'
      : `Entrega: envío — ${formatPrice(SHIPPING_LEMPIRAS)}`,
    `Total: ${formatPrice(subtotal(state) + shipping(state))}`,
    '',
    'Uso exclusivo de investigación.',
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
};

const addBtnHtml = (product, extraClass = '') => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `add-btn ${extraClass}`.trim();
  btn.dataset.addToCart = '';
  btn.dataset.sku = product.sku;
  btn.dataset.name = product.name;
  btn.dataset.price = String(product.price);
  btn.textContent = 'Agregar';
  return btn;
};

document.addEventListener('DOMContentLoaded', () => {
  let state = loadState();

  /* ---- inject add buttons from existing catalog markup ----------------*/
  document.querySelectorAll('.pep-card').forEach(card => {
    const name = card.querySelector('h4')?.textContent.trim();
    const price = parsePrice(card.querySelector('.pep-card-price')?.textContent);
    if (!name || !price) return;
    if (card.querySelector('[data-add-to-cart]')) return;
    const shop = document.createElement('div');
    shop.className = 'pep-card-shop';
    shop.append(addBtnHtml({ sku: card.id || slug(name), name, price }));
    const teaser = card.querySelector('.pep-card-teaser');
    (teaser || card.querySelector('.pep-card-top')).after(shop);
  });

  document.querySelectorAll('.plan-card').forEach(card => {
    const product = card.querySelector('h3')?.textContent.trim();
    if (!product) return;
    card.querySelectorAll('.plan-row').forEach(row => {
      if (row.querySelector('[data-add-to-cart]')) return;
      const label = row.querySelector('.label')?.textContent.trim();
      const price = parsePrice(row.querySelector('.price')?.textContent);
      if (!label || !price) return;
      const name = `${product} · ${label}`;
      row.append(addBtnHtml({ sku: slug(name), name, price }, 'add-btn-sm'));
    });
  });

  const dsipBanner = document.querySelector('.feature-banner');
  if (dsipBanner && !dsipBanner.querySelector('[data-add-to-cart]')) {
    const price = parsePrice(dsipBanner.querySelector('.feature-price .amt')?.textContent);
    if (price) {
      const name = 'DSIP · vial líquido';
      dsipBanner.querySelector('.feature-price')?.after(
        addBtnHtml({ sku: 'dsip', name, price }, 'add-btn-on-dark')
      );
    }
  }

  document.querySelectorAll('.info-card').forEach(card => {
    const heading = card.querySelector('h3')?.innerText.replace(/\s+/g, ' ').trim();
    if (!heading || /envíos|novedades/i.test(heading)) return;
    card.querySelectorAll('.kv-row').forEach(row => {
      if (row.querySelector('[data-add-to-cart]')) return;
      const label = row.querySelector('span:not(.price)')?.textContent.trim();
      const price = parsePrice(row.querySelector('.price')?.textContent);
      if (!label || !price) return;
      const name = `${heading} · ${label}`;
      row.append(addBtnHtml({ sku: slug(name), name, price }, 'add-btn-sm'));
    });
  });

  /* ---- drawer markup --------------------------------------------------*/
  if (!document.querySelector('[data-cart-drawer]')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="cart-overlay" data-cart-overlay hidden></div>
      <aside class="cart-drawer" data-cart-drawer aria-hidden="true" role="dialog" aria-labelledby="cart-title">
        <header class="cart-head">
          <div>
            <p class="cart-kicker mono">Pedido</p>
            <h2 id="cart-title">Tu carrito</h2>
          </div>
          <button type="button" class="cart-close" data-close-cart aria-label="Cerrar carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </header>
        <div class="cart-body" data-cart-items></div>
        <footer class="cart-foot">
          <fieldset class="cart-delivery">
            <legend>Entrega</legend>
            <label><input type="radio" name="cart-delivery" value="envio"> Envío · L.100</label>
            <label><input type="radio" name="cart-delivery" value="pickup"> Pick-up · Gratis</label>
          </fieldset>
          <div class="cart-totals">
            <div><span>Subtotal</span><span data-cart-subtotal>L.0</span></div>
            <div><span>Entrega</span><span data-cart-shipping>L.0</span></div>
            <div class="cart-total"><span>Total</span><span data-cart-total>L.0</span></div>
          </div>
          <a class="btn btn-wa" data-checkout-wa target="_blank" rel="noopener">Pedir por WhatsApp</a>
          <p class="cart-note">Confirmamos disponibilidad y pedimos pago previo. Uso exclusivo de investigación.</p>
        </footer>
      </aside>
      <div class="cart-toast" data-cart-toast hidden>Agregado al carrito</div>
    `);
  }

  const overlay = document.querySelector('[data-cart-overlay]');
  const drawer = document.querySelector('[data-cart-drawer]');
  const itemsEl = document.querySelector('[data-cart-items]');
  const toastEl = document.querySelector('[data-cart-toast]');
  const checkout = document.querySelector('[data-checkout-wa]');
  let toastTimer = null;

  const openCart = () => {
    overlay.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    requestAnimationFrame(() => {
      overlay.classList.add('in');
      drawer.classList.add('in');
    });
  };

  const closeCart = () => {
    overlay.classList.remove('in');
    drawer.classList.remove('in');
    document.body.classList.remove('cart-open');
    drawer.setAttribute('aria-hidden', 'true');
    setTimeout(() => { overlay.hidden = true; }, 280);
  };

  const showToast = () => {
    toastEl.hidden = false;
    toastEl.classList.add('in');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('in');
      setTimeout(() => { toastEl.hidden = true; }, 250);
    }, 1600);
  };

  const render = () => {
    saveState(state);
    const count = countItems(state);
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = String(count);
      el.hidden = count === 0;
    });

    if (!state.items.length) {
      itemsEl.innerHTML = `<p class="cart-empty">Tu carrito está vacío. Agrega viales desde el catálogo.</p>`;
    } else {
      itemsEl.innerHTML = state.items.map(item => `
        <article class="cart-line" data-sku="${item.sku}">
          <div class="cart-line-info">
            <h3>${item.name}</h3>
            <p class="mono">${formatPrice(item.price)} c/u</p>
          </div>
          <div class="cart-line-qty">
            <button type="button" data-qty="-1" aria-label="Quitar uno">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" aria-label="Agregar uno">+</button>
          </div>
          <div class="cart-line-sum mono">${formatPrice(item.price * item.qty)}</div>
          <button type="button" class="cart-remove" data-remove aria-label="Quitar del carrito">✕</button>
        </article>
      `).join('');
    }

    document.querySelectorAll('[name="cart-delivery"]').forEach(r => {
      r.checked = r.value === state.delivery;
    });

    const ship = shipping(state);
    document.querySelector('[data-cart-subtotal]').textContent = formatPrice(subtotal(state));
    document.querySelector('[data-cart-shipping]').textContent = ship ? formatPrice(ship) : (state.items.length ? 'Gratis' : 'L.0');
    document.querySelector('[data-cart-total]').textContent = formatPrice(subtotal(state) + ship);

    if (state.items.length) {
      checkout.textContent = 'Pedir por WhatsApp';
      checkout.href = buildWhatsAppUrl(state);
      checkout.target = '_blank';
      checkout.rel = 'noopener';
      checkout.classList.remove('is-disabled');
    } else {
      checkout.textContent = 'Ver catálogo';
      checkout.href = 'index.html';
      checkout.removeAttribute('target');
      checkout.classList.add('is-disabled');
    }
  };

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add-to-cart]');
    if (add) {
      e.preventDefault();
      e.stopPropagation();
      addItem(state, {
        sku: add.dataset.sku,
        name: add.dataset.name,
        price: Number(add.dataset.price),
      });
      render();
      showToast();
      add.classList.add('just-added');
      setTimeout(() => add.classList.remove('just-added'), 700);
      return;
    }

    if (e.target.closest('[data-open-cart]')) {
      e.preventDefault();
      openCart();
      return;
    }
    if (e.target.closest('[data-close-cart]') || e.target.closest('[data-cart-overlay]')) {
      closeCart();
      return;
    }

    const line = e.target.closest('.cart-line');
    if (line) {
      if (e.target.closest('[data-remove]')) {
        state.items = state.items.filter(i => i.sku !== line.dataset.sku);
        render();
        return;
      }
      const qtyBtn = e.target.closest('[data-qty]');
      if (qtyBtn) {
        const item = state.items.find(i => i.sku === line.dataset.sku);
        if (item) setQty(state, item.sku, item.qty + Number(qtyBtn.dataset.qty));
        render();
      }
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.name === 'cart-delivery') {
      state.delivery = e.target.value;
      render();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('in')) closeCart();
  });

  checkout.addEventListener('click', () => {
    if (!state.items.length) closeCart();
  });

  render();
});
