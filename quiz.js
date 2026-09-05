/* ==========================================================================
   Catalog orientation quiz
   Interest-based matching to research lines — not medical advice or dosing.
   ========================================================================== */

const PEPTIDES = {
  'ghk-cu': {
    name: 'GHK-Cu 50 mg',
    blurb: 'Piel más firme, cabello y uñas más fuertes, y reparación de tejido. El de la belleza del catálogo.',
    ficha: 'informacion.html#ghk-cu',
    catalog: 'index.html#ghk-cu',
    sku: 'ghk-cu',
    price: 1000,
  },
  klow: {
    name: 'KLOW Blend',
    blurb: 'Un combo en un solo vial para piel, belleza y reparación de tejido.',
    ficha: 'informacion.html#klow',
    catalog: 'index.html#klow',
    sku: 'klow',
    price: 3690,
  },
  kpv: {
    name: 'KPV 10 mg',
    blurb: 'Se mira para calmar inflamación de piel e intestino.',
    ficha: 'informacion.html#kpv',
    catalog: 'index.html#kpv',
    sku: 'kpv',
    price: 1150,
  },
  'bpc-157': {
    name: 'BPC-157 10 mg',
    blurb: 'El más conocido para que el tejido se recupere: músculos, tendones, ligamentos.',
    ficha: 'informacion.html#bpc-157',
    catalog: 'index.html#bpc-157',
    sku: 'bpc-157',
    price: 950,
  },
  nad: {
    name: 'NAD+ 500 Buffered',
    blurb: 'Recarga celular: energía, recuperación y procesos ligados al envejecimiento.',
    ficha: 'informacion.html#nad',
    catalog: 'index.html#nad',
    sku: 'nad',
    price: 1400,
  },
  'mots-c': {
    name: 'MOTS-C 20 mg',
    blurb: 'Energía y metabolismo — las “baterías” de la célula.',
    ficha: 'informacion.html#mots-c',
    catalog: 'index.html#mots-c',
    sku: 'mots-c',
    price: 1400,
  },
  'acetyl-selank': {
    name: 'Acetyl Selank',
    blurb: 'Calmar el estrés sin “apagarte”: ánimo más estable, menos ruido mental.',
    ficha: 'informacion.html#acetyl-selank',
    catalog: 'index.html#acetyl-selank',
    sku: 'acetyl-selank',
    price: 1200,
  },
  'acetyl-semax': {
    name: 'Acetyl-Semax',
    blurb: 'Enfoque, memoria y claridad mental — estar más despierto de la cabeza.',
    ficha: 'informacion.html#acetyl-semax',
    catalog: 'index.html#acetyl-semax',
    sku: 'acetyl-semax',
    price: 1200,
  },
  dsip: {
    name: 'DSIP',
    blurb: 'Se mira para dormir más profundo, no solo quedarte dormido.',
    ficha: 'informacion.html#dsip',
    catalog: 'index.html',
    sku: 'dsip',
    price: 880,
  },
  epitalon: {
    name: 'Epitalon',
    blurb: 'Envejecimiento celular y un reloj interno más ordenado.',
    ficha: 'informacion.html#epitalon',
    catalog: 'index.html#epitalon',
    sku: 'epitalon',
    price: 7500,
  },
  ipamorelin: {
    name: 'Ipamorelin 10 mg',
    blurb: 'Le pide al cuerpo su propia hormona de crecimiento: recuperación, sueño, composición.',
    ficha: 'informacion.html#ipamorelin',
    catalog: 'index.html#ipamorelin',
    sku: 'ipamorelin',
    price: 1300,
  },
  retatrutide: {
    name: 'Retatrutide',
    blurb: 'El más potente de la línea de peso: tres vías a la vez (apetito, azúcar y energía).',
    ficha: 'informacion.html#retatrutide',
    catalog: 'index.html#retatrutide-tirzepatide',
  },
  tirzepatide: {
    name: 'Tirzepatide',
    blurb: 'Se mira para peso y azúcar. Dos vías; el más conocido de esta familia.',
    ficha: 'informacion.html#tirzepatide',
    catalog: 'index.html#retatrutide-tirzepatide',
  },
  cagrilintide: {
    name: 'Cagrilintide 5 mg',
    blurb: 'Saciedad: sentirte lleno y picar menos.',
    ficha: 'informacion.html#cagrilintide',
    catalog: 'index.html#cagrilintide-5',
    sku: 'cagrilintide-5',
    price: 1480,
  },
};

const STEPS = {
  start: {
    step: 1,
    total: 2,
    title: '¿Te interesa más belleza o salud?',
    lead: 'Empezamos por ahí. Después afinamos con una sola pregunta más.',
    options: [
      { id: 'beauty', label: 'Belleza', hint: 'Piel, cabello, uñas, verse mejor', next: 'beauty' },
      { id: 'health', label: 'Salud', hint: 'Energía, recuperación, peso, sueño, calma', next: 'health' },
    ],
  },
  beauty: {
    step: 2,
    total: 2,
    title: 'En belleza, ¿qué te resuena más?',
    lead: 'Elige la que más se acerque. Puedes cambiar después.',
    options: [
      { id: 'hair', label: 'Cabello y uñas', hint: 'Se me cae el pelo o quiero uñas más fuertes', result: ['ghk-cu', 'klow'] },
      { id: 'skin', label: 'Piel y verse mejor', hint: 'Piel más firme, más pareja, glow', result: ['ghk-cu', 'klow', 'kpv'] },
      { id: 'irritation', label: 'Piel irritada', hint: 'Inflamación, piel que arde o se irrita', result: ['kpv', 'ghk-cu', 'klow'] },
      { id: 'combo', label: 'Un poco de todo', hint: 'Belleza + que el tejido se recupere', result: ['klow', 'ghk-cu', 'bpc-157'] },
    ],
  },
  health: {
    step: 2,
    total: 2,
    title: 'En salud, ¿qué se siente más cerca?',
    lead: 'No es un diagnóstico: es para orientarte en el catálogo.',
    options: [
      { id: 'tired', label: 'Cansancio y poca energía', hint: 'Me siento sin pila, me canso fácil', result: ['nad', 'mots-c'] },
      { id: 'stress', label: 'Estrés o mente nublada', hint: 'Quiero calma, menos ruido mental', result: ['acetyl-selank', 'acetyl-semax'] },
      { id: 'focus', label: 'Enfoque y claridad', hint: 'Memoria, concentración, estar más despierto', result: ['acetyl-semax', 'acetyl-selank'] },
      { id: 'repair', label: 'Reparar tejido', hint: 'Músculos, tendones, “lo dañado”', result: ['bpc-157', 'ipamorelin', 'klow'] },
      { id: 'weight', label: 'Peso y apetito', hint: 'Metabolismo, saciedad, composición', result: ['retatrutide', 'tirzepatide', 'cagrilintide'] },
      { id: 'sleep', label: 'Dormir mejor', hint: 'Sueño más profundo y reparador', result: ['dsip', 'epitalon', 'ipamorelin'] },
    ],
  },
};

const HEADLINES = {
  hair: 'Línea de cabello, uñas y piel',
  skin: 'Línea de piel y belleza',
  irritation: 'Línea de calma e inflamación',
  combo: 'Línea de belleza + reparación',
  tired: 'Línea de energía celular',
  stress: 'Línea de calma y estrés',
  focus: 'Línea de enfoque y claridad',
  repair: 'Línea de reparación de tejido',
  weight: 'Línea de peso y metabolismo',
  sleep: 'Línea de sueño y descanso',
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-quiz]');
  if (!root) return;

  const history = [];
  let current = 'start';

  const formatPrice = (n) => `L.${Number(n).toLocaleString('en-US')}`;

  const renderQuestion = (id) => {
    const step = STEPS[id];
    current = id;
    root.innerHTML = `
      <p class="quiz-progress mono">Paso ${step.step} de ${step.total}</p>
      <h2 class="quiz-title">${step.title}</h2>
      <p class="quiz-lead">${step.lead}</p>
      <div class="quiz-options">
        ${step.options.map(opt => `
          <button type="button" class="quiz-option card3d" data-opt="${opt.id}">
            <span class="quiz-option-label">${opt.label}</span>
            <span class="quiz-option-hint">${opt.hint}</span>
          </button>
        `).join('')}
      </div>
      ${history.length ? `<button type="button" class="quiz-back" data-quiz-back>← Atrás</button>` : ''}
    `;
  };

  const renderResults = (optionId, ids) => {
    const items = ids.map(k => PEPTIDES[k]).filter(Boolean);
    root.innerHTML = `
      <p class="quiz-progress mono">Tu orientación</p>
      <h2 class="quiz-title">${HEADLINES[optionId] || 'Péptidos de esta línea'}</h2>
      <p class="quiz-lead">Según lo que marcaste, estos son los del catálogo más cercanos a esa línea. No es consejo médico ni una receta de uso — son fichas para que compares y pidas por WhatsApp si te interesa.</p>
      <div class="quiz-results">
        ${items.map((p, i) => `
          <article class="card3d quiz-result">
            ${i === 0 ? '<span class="quiz-badge">El más cercano</span>' : ''}
            <h3>${p.name}</h3>
            <p>${p.blurb}</p>
            <div class="quiz-result-actions">
              <a href="${p.ficha}">Ver ficha completa →</a>
              <a href="${p.catalog}">Ver en catálogo</a>
              ${p.sku && p.price ? `<button type="button" class="add-btn" data-add-to-cart data-sku="${p.sku}" data-name="${p.name}" data-price="${p.price}">Agregar · ${formatPrice(p.price)}</button>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
      <div class="quiz-end">
        <button type="button" class="quiz-back" data-quiz-restart>Empezar de nuevo</button>
        <a class="btn btn-ghost" href="informacion.html">Ver todas las fichas</a>
      </div>
      <p class="quiz-disclaimer">Productos para uso exclusivo de investigación. Esta guía no sustituye literatura científica ni una consulta profesional.</p>
    `;
  };

  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-quiz-back]')) {
      current = history.pop() || 'start';
      renderQuestion(current);
      return;
    }
    if (e.target.closest('[data-quiz-restart]')) {
      history.length = 0;
      renderQuestion('start');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const btn = e.target.closest('[data-opt]');
    if (!btn) return;
    const step = STEPS[current];
    const opt = step.options.find(o => o.id === btn.dataset.opt);
    if (!opt) return;
    history.push(current);
    if (opt.next) {
      renderQuestion(opt.next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (opt.result) {
      renderResults(opt.id, opt.result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  renderQuestion('start');
});
