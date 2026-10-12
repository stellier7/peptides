/* ==========================================================================
   Catalog orientation quiz
   Interest-based matching to research lines — not medical advice or dosing.
   Aligned with Guía de Productos Oct 2026.
   ========================================================================== */

const PEPTIDES = {
  'ghk-cu': {
    name: 'GHK-Cu 50 mg',
    blurb: 'Péptido de cobre de la juventud: colágeno, elastina, piel más firme y cabello más denso.',
    ficha: 'informacion.html#ghk-cu',
    catalog: 'index.html#ghk-cu',
    sku: 'ghk-cu',
    price: 1000,
  },
  klow: {
    name: 'KLOW Blend',
    blurb: 'GHK-Cu, KPV, TB-500 y BPC-157: reparación total de tejidos, piel e inflamación en un vial.',
    ficha: 'informacion.html#klow',
    catalog: 'index.html#klow',
    sku: 'klow',
    price: 3690,
  },
  kpv: {
    name: 'KPV 10 mg',
    blurb: 'Antiinflamatorio natural de 3 aminoácidos: intestino calmado y piel menos reactiva.',
    ficha: 'informacion.html#kpv',
    catalog: 'index.html#kpv',
    sku: 'kpv',
    price: 1150,
  },
  'bpc-157': {
    name: 'BPC-157 10 mg',
    blurb: 'Estrella de la recuperación: tendones, ligamentos, músculo; también protege estómago e intestino.',
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
    blurb: '“Ejercicio en un vial”: glucosa, energía, resistencia y un metabolismo más joven.',
    ficha: 'informacion.html#mots-c',
    catalog: 'index.html#mots-c',
    sku: 'mots-c',
    price: 1400,
  },
  glutation: {
    name: 'Glutatión 1,500 mg',
    blurb: 'Antioxidante maestro: desintoxica, protege células y apoya el sistema inmune.',
    ficha: 'informacion.html#glutation',
    catalog: 'index.html#glutation',
    sku: 'glutacion-1-500-mg-1-vial',
    price: 1000,
  },
  'acetyl-selank': {
    name: 'Acetyl Selank',
    blurb: 'Ansiolítico y regulador del ánimo: menos ansiedad, más resiliencia y calma con enfoque.',
    ficha: 'informacion.html#acetyl-selank',
    catalog: 'index.html#acetyl-selank',
    sku: 'acetyl-selank',
    price: 1200,
  },
  'acetyl-semax': {
    name: 'Acetyl-Semax',
    blurb: 'Nootrópico: concentración, memoria, neuroprotección, aprendizaje y productividad.',
    ficha: 'informacion.html#acetyl-semax',
    catalog: 'index.html#acetyl-semax',
    sku: 'acetyl-semax',
    price: 1200,
  },
  dsip: {
    name: 'DSIP',
    blurb: 'Sueño profundo y reparador; también regula el ciclo de sueño y el estrés.',
    ficha: 'informacion.html#dsip',
    catalog: 'index.html',
    sku: 'dsip',
    price: 880,
  },
  epitalon: {
    name: 'Epitalon',
    blurb: 'Longevidad: telómeros, melatonina/sueño y un envejecimiento más saludable.',
    ficha: 'informacion.html#epitalon',
    catalog: 'index.html#epitalon',
    sku: 'epitalon',
    price: 7500,
  },
  ipamorelin: {
    name: 'Ipamorelin 10 mg',
    blurb: 'GH limpia y selectiva — ideal para empezar: sueño, recuperación y tono muscular.',
    ficha: 'informacion.html#ipamorelin',
    catalog: 'index.html#ipamorelin',
    sku: 'ipamorelin',
    price: 1300,
  },
  'cjc-ipamorelin': {
    name: 'CJC sin DAC + Ipamorelin 5/5 mg',
    blurb: 'Combo clásico de GH: pulsos más fuertes; composición, sueño y recuperación.',
    ficha: 'informacion.html#cjc-ipamorelin',
    catalog: 'index.html#cjc-ipamorelin',
    sku: 'cjc-ipamorelin',
    price: 1750,
  },
  tesamorelin: {
    name: 'Tesamorelin 10 mg',
    blurb: 'Estimula tu propia GH; el más documentado para grasa abdominal profunda.',
    ficha: 'informacion.html#tesamorelin',
    catalog: 'index.html#tesamorelin',
    sku: 'tesamorelin',
    price: 1650,
  },
  'tesa-ipa-blend': {
    name: 'Tesamorelin 10 mg + Ipamorelin 3 mg',
    blurb: 'Grasa abdominal + estímulo de GH: lo mejor de ambos en un vial.',
    ficha: 'informacion.html#tesa-ipa-blend',
    catalog: 'index.html#tesa-ipa-blend',
    sku: 'tesa-ipa-blend',
    price: 1950,
  },
  hgh: {
    name: 'hGH 26 IU',
    blurb: 'Hormona de crecimiento humana: composición, piel más firme, descanso y reparación.',
    ficha: 'informacion.html#hgh',
    catalog: 'index.html#hgh-26',
    sku: 'hgh-26',
    price: 2700,
  },
  'beauty-blend': {
    name: 'Beauty Blend',
    blurb: 'KPV 20 mg + GHK-Cu 50 mg: colágeno, firmeza y piel calmada — belleza desde adentro.',
    ficha: 'informacion.html#beauty-blend',
    catalog: 'index.html#beauty-blend',
    sku: 'beauty-blend',
    price: 1950,
  },
  'healthy-tummy': {
    name: 'Healthy Tummy Blend',
    blurb: 'KPV 10 mg + BPC-157 10 mg: intestino protegido y desinflamado; digestión sensible.',
    ficha: 'informacion.html#healthy-tummy',
    catalog: 'index.html#healthy-tummy',
    sku: 'healthy-tummy',
    price: 2100,
  },
  'youth-code': {
    name: 'Youth Code (Firmora)',
    blurb: 'Suero para rostro y cuello: suaviza líneas; más firmeza y colágeno, sin agujas.',
    ficha: 'informacion.html#youth-code',
    catalog: 'index.html#youth-code',
    sku: 'youth-code',
    price: 1350,
  },
  'root-code': {
    name: 'Root Code (Follicara)',
    blurb: 'Suero para cuero cabelludo: estimula el folículo; cabello más denso y fuerte.',
    ficha: 'informacion.html#root-code',
    catalog: 'index.html#root-code',
    sku: 'root-code',
    price: 1850,
  },
  'pt-141': {
    name: 'PT-141 10 mg',
    blurb: 'Despierta el deseo desde el cerebro: libido en mujeres y hombres; actúa en el deseo, no solo en lo físico.',
    ficha: 'informacion.html#pt-141',
    catalog: 'index.html#pt-141',
    sku: 'pt-141',
    price: 1500,
  },
  retatrutide: {
    name: 'Retatrutide',
    blurb: 'Triple agonista (GLP-1, GIP, glucagón): el más potente; apetito, antojos y hasta ~29% de pérdida de peso en estudios.',
    ficha: 'informacion.html#retatrutide',
    catalog: 'index.html#retatrutide-tirzepatide',
  },
  tirzepatide: {
    name: 'Tirzepatide',
    blurb: 'Doble acción GLP-1/GIP (Mounjaro / Zepbound): saciedad, glucosa y ~20% de pérdida de peso en estudios.',
    ficha: 'informacion.html#tirzepatide',
    catalog: 'index.html#retatrutide-tirzepatide',
  },
  cagrilintide: {
    name: 'Cagrilintide 5 mg',
    blurb: 'Amilina de la saciedad: te llena más y por más tiempo; potencia Reta o Tirze.',
    ficha: 'informacion.html#cagrilintide',
    catalog: 'index.html#cagrilintide-5',
    sku: 'cagrilintide-5',
    price: 1480,
  },
  eloralintide: {
    name: 'Eloralintide 5 mg',
    blurb: 'Nueva amilina (Eli Lilly): saciedad potente; sola o sumada a Reta / Tirze para romper estancamientos.',
    ficha: 'informacion.html#eloralintide',
    catalog: 'index.html#eloralintide-5',
    sku: 'eloralintide-5',
    price: 1480,
  },
};

const STEPS = {
  start: {
    step: 1,
    total: 3,
    title: '¿Te interesa más belleza o salud?',
    lead: 'Empezamos por ahí. A veces basta con dos preguntas; si hay varios péptidos en esa línea, hacemos una tercera.',
    options: [
      { id: 'beauty', label: 'Belleza', hint: 'Piel, cabello, verse mejor', next: 'beauty' },
      { id: 'health', label: 'Salud', hint: 'Energía, recuperación, peso, sueño, calma, libido', next: 'health' },
    ],
  },
  beauty: {
    step: 2,
    total: 2,
    title: 'En belleza, ¿qué te resuena más?',
    lead: 'Elige la que más se acerque.',
    options: [
      { id: 'hair', label: 'Cabello', hint: 'Quiero cabello más denso y fuerte', result: ['root-code', 'ghk-cu', 'klow'] },
      { id: 'skin', label: 'Piel y verse mejor', hint: 'Firmeza, glow, líneas de expresión', next: 'beauty_form' },
      { id: 'irritation', label: 'Piel irritada', hint: 'Inflamación, piel reactiva', result: ['kpv', 'beauty-blend', 'ghk-cu'] },
      { id: 'combo', label: 'Un poco de todo', hint: 'Belleza + que el tejido se recupere', result: ['klow', 'beauty-blend', 'ghk-cu'] },
    ],
  },
  beauty_form: {
    step: 3,
    total: 3,
    title: '¿Un péptido, un blend o un tópico?',
    lead: 'Los tres se miran para piel. Cambia el formato.',
    options: [
      { id: 'solo', label: 'Uno solo', hint: 'GHK-Cu: cobre, colágeno y elastina', result: ['ghk-cu', 'beauty-blend'] },
      { id: 'blend', label: 'Un blend', hint: 'Beauty Blend o KLOW: varios en un vial', result: ['beauty-blend', 'klow', 'ghk-cu'] },
      { id: 'topical', label: 'Un tópico', hint: 'Youth Code: suero para rostro y cuello, sin agujas', result: ['youth-code', 'ghk-cu'] },
    ],
  },
  health: {
    step: 2,
    total: 3,
    title: 'En salud, ¿qué se siente más cerca?',
    lead: 'No es un diagnóstico: es para orientarte en el catálogo.',
    options: [
      { id: 'tired', label: 'Cansancio y poca energía', hint: 'Me siento sin pila, me canso fácil', next: 'energy_kind' },
      { id: 'stress', label: 'Estrés o mente nublada', hint: 'Quiero calma, menos ansiedad', result: ['acetyl-selank', 'acetyl-semax'] },
      { id: 'focus', label: 'Enfoque y claridad', hint: 'Memoria, concentración, productividad', result: ['acetyl-semax', 'acetyl-selank'] },
      { id: 'repair', label: 'Reparar tejido o GH', hint: 'Tendones, músculo, composición, zona media', next: 'repair_kind' },
      { id: 'weight', label: 'Peso y apetito', hint: 'Metabolismo, saciedad, estancamientos', next: 'weight_kind' },
      { id: 'gut', label: 'Digestión e intestino', hint: 'Barriga sensible, inflamación intestinal', result: ['healthy-tummy', 'kpv', 'bpc-157'] },
      { id: 'sleep', label: 'Dormir mejor', hint: 'Sueño más profundo y reparador', next: 'sleep_kind' },
      { id: 'libido', label: 'Bienestar sexual', hint: 'Deseo y libido', result: ['pt-141'] },
    ],
  },
  energy_kind: {
    step: 3,
    total: 3,
    title: 'Esa energía, ¿cómo la imaginas?',
    lead: 'Misma conversación de “más pila”, distinto ángulo.',
    options: [
      { id: 'motor', label: 'Motor y metabolismo', hint: 'MOTS-C: “ejercicio en un vial”, glucosa y resistencia', result: ['mots-c', 'glutation', 'nad'] },
      { id: 'recharge', label: 'Defensa y limpieza celular', hint: 'Glutatión: antioxidante maestro; también NAD+', result: ['glutation', 'nad', 'mots-c'] },
      { id: 'longevity', label: 'Longevidad', hint: 'Epitalon: telómeros y envejecimiento saludable', result: ['epitalon', 'glutation', 'mots-c'] },
    ],
  },
  repair_kind: {
    step: 3,
    total: 3,
    title: '¿Reparación de tejido o hormona de crecimiento?',
    lead: 'BPC-157 es “lo dañado”. La otra línea es GH (recuperación, composición, zona media).',
    options: [
      { id: 'tissue', label: 'Tejido dañado', hint: 'Tendones, ligamentos, músculo — que suelde', result: ['bpc-157', 'klow', 'healthy-tummy'] },
      { id: 'gh_entry', label: 'GH de entrada', hint: 'Ipamorelin: limpia, sueño y tono', result: ['ipamorelin', 'cjc-ipamorelin'] },
      { id: 'gh_combo', label: 'GH en pulsos', hint: 'CJC sin DAC + Ipamorelin: combo clásico', result: ['cjc-ipamorelin', 'ipamorelin'] },
      { id: 'gh_mid', label: 'Grasa abdominal', hint: 'Tesamorelin: grasa profunda + IGF-1', result: ['tesamorelin', 'tesa-ipa-blend'] },
      { id: 'gh_max', label: 'Combo más fuerte', hint: 'Tesamorelin + Ipamorelin en un vial', result: ['tesa-ipa-blend', 'tesamorelin', 'hgh'] },
      { id: 'hgh_direct', label: 'hGH directa', hint: 'La hormona misma: juventud y reparación', result: ['hgh', 'tesamorelin', 'ipamorelin'] },
    ],
  },
  weight_kind: {
    step: 3,
    total: 3,
    title: 'En peso, ¿cuál te llama más?',
    lead: 'Misma conversación, distinto perfil.',
    options: [
      { id: 'potent', label: 'El más potente', hint: 'Retatrutide: triple agonista, hasta ~29%', result: ['retatrutide', 'tirzepatide', 'eloralintide'] },
      { id: 'known', label: 'El más conocido', hint: 'Tirzepatide: Mounjaro / Zepbound, ~20%', result: ['tirzepatide', 'retatrutide', 'cagrilintide'] },
      { id: 'full', label: 'Saciedad / estancamiento', hint: 'Cagrilintide o Eloralintide: amilina, sola o con Reta/Tirze', result: ['eloralintide', 'cagrilintide', 'retatrutide'] },
      { id: 'comp', label: 'Composición corporal', hint: 'MOTS-C: metabolismo, glucosa y “ejercicio en un vial”', result: ['mots-c', 'retatrutide', 'tesamorelin'] },
    ],
  },
  sleep_kind: {
    step: 3,
    total: 3,
    title: 'Del sueño, ¿qué buscas?',
    lead: 'No es un somnífero: son líneas distintas.',
    options: [
      { id: 'deep', label: 'Dormir más profundo', hint: 'DSIP: sueño reparador y ciclo de sueño/estrés', result: ['dsip', 'ipamorelin'] },
      { id: 'clock', label: 'Reloj interno / longevidad', hint: 'Epitalon: melatonina, telómeros', result: ['epitalon', 'dsip'] },
      { id: 'recover_sleep', label: 'Recuperarme al dormir', hint: 'Ipamorelin: GH, sueño y composición', result: ['ipamorelin', 'dsip', 'cjc-ipamorelin'] },
    ],
  },
};

const HEADLINES = {
  hair: 'Línea de cabello y folículo',
  skin: 'Línea de piel y belleza',
  irritation: 'Línea de calma e inflamación',
  combo: 'Línea de belleza + reparación',
  solo: 'GHK-Cu — cobre, colágeno y elastina',
  blend: 'Beauty Blend / KLOW — blends de piel',
  topical: 'Youth Code — suero tópico sin agujas',
  tired: 'Línea de energía celular',
  stress: 'Línea de calma y estrés',
  focus: 'Línea de enfoque y claridad',
  recharge: 'Glutatión / NAD+ — defensa celular',
  motor: 'MOTS-C — motor y metabolismo',
  longevity: 'Epitalon — longevidad',
  tissue: 'BPC-157 — reparación de tejido',
  gh_entry: 'Ipamorelin — GH de entrada',
  gh_combo: 'CJC + Ipamorelin — pulsos de GH',
  gh_mid: 'Tesamorelin — grasa abdominal',
  gh_max: 'Tesamorelin + Ipamorelin',
  hgh_direct: 'hGH 26 IU — hormona directa',
  potent: 'Retatrutide — el más potente',
  known: 'Tirzepatide — el más conocido',
  full: 'Amilina — saciedad y estancamientos',
  comp: 'MOTS-C — composición y metabolismo',
  gut: 'Healthy Tummy — intestino y digestión',
  libido: 'PT-141 — bienestar sexual',
  deep: 'DSIP — sueño profundo',
  clock: 'Epitalon — reloj interno',
  recover_sleep: 'Ipamorelin — recuperación al dormir',
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-quiz]');
  if (!root) return;

  const history = [];
  let current = 'start';

  const formatPrice = (n) => `L.${Number(n).toLocaleString('en-US')}`;

  const paint = (fn) => {
    const y = window.scrollY;
    fn();
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
  };

  const renderQuestion = (id) => {
    const step = STEPS[id];
    current = id;
    root.innerHTML = `
      <p class="quiz-progress mono">Paso ${step.step}</p>
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
      paint(() => renderQuestion(current));
      return;
    }
    if (e.target.closest('[data-quiz-restart]')) {
      history.length = 0;
      paint(() => renderQuestion('start'));
      return;
    }
    const btn = e.target.closest('[data-opt]');
    if (!btn) return;
    const step = STEPS[current];
    const opt = step.options.find(o => o.id === btn.dataset.opt);
    if (!opt) return;
    history.push(current);
    if (opt.next) paint(() => renderQuestion(opt.next));
    else if (opt.result) paint(() => renderResults(opt.id, opt.result));
  });

  renderQuestion('start');
});
