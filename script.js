// Landing page principal del proyecto.
// Aquí se mantienen las rutas, catálogos y efectos compartidos.
const products = [
  {
    id: 1,
    name: 'Script Auto Farm',
    type: 'Script',
    price: '$19',
    description: 'Automatiza tareas repetitivas y mejora la velocidad de trabajo en tu proyecto.',
  },
  {
    id: 2,
    name: 'Free Pack 2026',
    type: 'Free',
    price: 'Gratis',
    description: 'Paquete gratis con scripts útiles, presets y recursos para empezar rápido.',
  },
];

const apps = [
  { name: 'Premiere Pro', logo: 'premiere-pro.png' },
  { name: 'After Effects', logo: 'After-Effects.png' },
  { name: 'Media Encoder', logo: 'media-encoder.png' },
  { name: 'Photoshop', logo: 'photoshop.png' },
  { name: 'Hydra Games', logo: 'hydra.png' },
  { name: 'Microsoft Office', logo: 'microsoft-office.png' },
];

const windowsServices = [
  { name: 'Windows 11 LTSC Enterprise 2026' },
  { name: 'Windows Professional 25H2' },
  { name: 'Windows 11 Pro' },
  { name: 'Windows 10 Pro' },
  { name: 'Activación de Windows gratis' },
];

const fiveMResources = [
  { name: 'QBCore Scripts' },
  { name: 'ESX Scripts' },
  { name: 'Vehicles' },
  { name: 'Motorcycles' },
  { name: 'MLOs' },
  { name: 'HUDs' },
  { name: 'Scripts Leaks' },
];

const communityRoster = {
  founders: [
    { name: 'NAPO', image: 'NAPO.png' },
    { name: 'EXPEERX', image: 'EXPPERX.png' },
  ],
  owners: [
    { name: 'CERO09', image: 'CERO09.png' },
    { name: 'YEZZY', image: 'YEZZY.png' },
    { name: 'BILLONES', image: 'BILLONES.png' },
    { name: 'JHONL', image: 'JHONL.png' },
  ],
};

const communityHighlights = [
  {
    title: 'Comunidad activa',
    description: 'Somos una comunidad unida, grande y en constante crecimiento.',
    icon: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M18 14a4.5 4.5 0 0 1 2.5 4"/>',
  },
  {
    title: '3.2K+ miembros',
    description: 'Una comunidad que sigue creciendo.',
    icon: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15 15a4.5 4.5 0 0 1 5 4"/>',
  },
  {
    title: 'Soporte 24/7',
    description: 'Atención por tickets en nuestro Discord.',
    icon: '<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3h-1"/>',
  },
  {
    title: 'Venta de mods',
    description: 'Mods y recursos para llevar tu servidor al siguiente nivel.',
    icon: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
  },
  {
    title: 'Programas y apps',
    description: 'Las aplicaciones que necesitas, en un solo lugar.',
    icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  },
  {
    title: 'Sistemas Windows',
    description: 'Instalación, soporte y servicios para tu PC.',
    icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  },
];

const homeView = document.getElementById('homeView');
const routeView = document.getElementById('routeView');
const introOverlay = document.getElementById('introOverlay');
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas.getContext('2d');
let currentRoute = '/';

function getTypeClass(type) {
  const normalized = type.toLowerCase();
  if (normalized.includes('script')) return 'script';
  if (normalized.includes('windows')) return 'windows';
  if (normalized.includes('app')) return 'app';
  return 'free';
}

function createProductCard(product) {
  return `
    <article class="product-card">
      <div class="card-top">
        <span class="badge ${getTypeClass(product.type)}">${product.type}</span>
        <span class="price">${product.price}</span>
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
        <button class="btn btn-secondary small" type="button" data-detail-product-id="${product.id}">Ver más</button>
    </article>
  `;
}

function createRequestCard(item, index, requestKind) {
  const logo = item.logo
    ? `<img class="request-card-logo" src="${item.logo}" alt="" aria-hidden="true">`
    : '';
  const watermark = item.logo
    ? `<img class="request-card-watermark" src="${item.logo}" alt="" aria-hidden="true">`
    : '';
  const backgroundImage = requestKind === 'service'
    ? 'Windows.jpg'
    : requestKind === 'resource'
      ? 'fivem.jpg'
      : '';
  const background = backgroundImage
    ? `<img class="request-card-background" src="${backgroundImage}" alt="" aria-hidden="true"><span class="request-card-overlay" aria-hidden="true"></span>`
    : '';
  const backgroundCardClass = requestKind === 'service'
    ? ' request-card-windows'
    : requestKind === 'resource'
      ? ' request-card-fivem'
      : '';

  return `
    <article class="product-card request-card${backgroundCardClass}" data-request-name="${item.name}" data-request-logo="${item.logo || ''}" data-request-kind="${requestKind}" style="animation-delay: ${index * 100}ms">
      ${background}
      ${watermark}
      <div class="request-card-heading">
        ${logo}
        <h3>${item.name}</h3>
      </div>
      <button class="btn btn-primary" type="button">Obtener</button>
    </article>
  `;
}

function renderProducts(category = currentRoute) {
  const resourceGrid = routeView.querySelector('#resourceGrid');
  if (!resourceGrid) return;

  const requestCatalog = {
    '/apps': { items: apps, kind: 'app' },
    '/windows': { items: windowsServices, kind: 'service' },
    '/fivem': { items: fiveMResources, kind: 'resource' },
  }[category];

  if (requestCatalog) {
    resourceGrid.classList.add('request-grid');
    resourceGrid.innerHTML = requestCatalog.items
      .map((item, index) => createRequestCard(item, index, requestCatalog.kind))
      .join('');
    setupRequestImageFallbacks(resourceGrid);
    setupCardGlow();
    return;
  }

  resourceGrid.classList.remove('request-grid');

  const categoryTypes = {
    '/windows': ['Windows'],
    '/fivem': ['Script', 'Free'],
    '/apps': ['App'],
  };
  const allowedTypes = categoryTypes[category] || [];
  resourceGrid.innerHTML = products
    .filter((product) => allowedTypes.includes(product.type))
    .map(createProductCard)
    .join('');
  setupCardGlow();
}

function renderCommunityMembers() {
  const groups = [
    { id: 'communityFoundersGrid', members: communityRoster.founders, type: 'founder', offset: 0 },
    { id: 'communityOwnersGrid', members: communityRoster.owners, type: 'owner', offset: 2 },
  ];

  groups.forEach(({ id, members, type, offset }) => {
    const grid = routeView.querySelector(`#${id}`);
    if (!grid) return;

    grid.innerHTML = members
      .map((member, index) => `
        <article class="founder-card community-member community-member-${type}" style="animation-delay: ${(index + offset) * 110}ms">
          <div class="community-member-photo">
            <img src="/${member.image}" alt="" aria-hidden="true">
            <span class="community-member-fallback" aria-hidden="true" hidden>${member.name[0]}</span>
          </div>
          <h3>${member.name}</h3>
        </article>
      `)
      .join('');

    grid.querySelectorAll('.community-member-photo img').forEach((image) => {
      image.addEventListener('error', () => {
        image.hidden = true;
        image.nextElementSibling.hidden = false;
      });
    });
  });

  setupCardGlow();
}

function renderCommunityHighlights() {
  const grid = routeView.querySelector('#communityInfoGrid');
  if (!grid) return;

  grid.innerHTML = communityHighlights
    .map((item, index) => `
      <article class="product-card community-info-card" style="animation-delay: ${index * 100}ms">
        <svg class="community-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${item.icon}</svg>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `)
    .join('');

  setupCardGlow();
}

function categoryPage(path) {
  const pageInfo = {
    '/windows': ['WINDOWS', ''],
    '/fivem': ['FIVEM', ''],
    '/apps': ['APPS', ''],
  }[path];

  return `
    <section class="route-page category-page">
      <a href="/" data-route class="back-link">← VOLVER AL INICIO</a>
      <header class="route-heading">
        <span class="eyebrow">RECURSOS</span>
        <h1>${pageInfo[0]}</h1>
        ${pageInfo[1] ? `<p>${pageInfo[1]}</p>` : ''}
      </header>
      <div id="resourceGrid" class="product-grid resource-grid"></div>
    </section>
  `;
}

function getProductCategory(product) {
  if (product.type === 'Windows') return ['/windows', 'WINDOWS'];
  if (product.type === 'App') return ['/apps', 'APPS'];
  return ['/fivem', 'FIVEM'];
}

function productDetailPage(product) {
  const [categoryPath, categoryName] = getProductCategory(product);

  return `
    <section class="route-page product-detail-page">
      <a href="${categoryPath}" data-route class="back-link">← VOLVER A ${categoryName}</a>
      <header class="route-heading">
        <span class="eyebrow">DETALLES DEL RECURSO</span>
        <h1>${product.name}</h1>
      </header>
      <article class="product-card product-detail-card">
        <div class="card-top">
          <span class="badge ${getTypeClass(product.type)}">${product.type}</span>
          <span class="price">${product.price}</span>
        </div>
        <p>${product.description}</p>
        <a href="https://discord.gg/nmadqXrRWz" class="btn btn-primary" target="_blank" rel="noopener noreferrer">ABRIR TICKET EN DISCORD</a>
      </article>
    </section>
  `;
}

function communityPage() {
  return `
    <section class="route-page community-page">
      <a href="/" data-route class="back-link">← VOLVER AL INICIO</a>
      <header class="route-heading community-heading">
        <h1>COMUNIDAD</h1>
      </header>
      <div id="communityInfoGrid" class="community-info-grid"></div>
      <section class="community-group">
        <h2>Fundadores</h2>
        <div id="communityFoundersGrid" class="community-members-grid community-founders-grid"></div>
      </section>
      <section class="community-group">
        <h2>Owners</h2>
        <div id="communityOwnersGrid" class="community-members-grid community-owners-grid"></div>
      </section>
    </section>
  `;
}

function setupTicker() {
  const track = document.getElementById('tickerTrack');
  const firstCopy = track?.firstElementChild;
  const itemTemplate = firstCopy?.firstElementChild?.cloneNode(true);
  if (!track || !firstCopy || !itemTemplate) return;

  let resizeFrame = 0;

  function updateDuration() {
    const probe = itemTemplate.cloneNode(true);
    Object.assign(probe.style, {
      position: 'absolute',
      visibility: 'hidden',
      minWidth: '0',
      padding: '0',
      textAlign: 'left',
      width: 'max-content',
    });
    track.append(probe);
    const previousPhraseWidth = Math.max(
      probe.getBoundingClientRect().width,
      window.innerWidth * (window.innerWidth <= 600 ? 0.7 : 0.5)
    );
    probe.remove();

    const previousCopyCount = firstCopy.children.length;
    const previousHalfWidth = previousPhraseWidth * previousCopyCount;
    const nextHalfWidth = firstCopy.getBoundingClientRect().width;
    track.style.animationDuration = `${30 * nextHalfWidth / previousHalfWidth}s`;
  }

  updateDuration();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(updateDuration);
  });
}

function setupIntro() {
  window.addEventListener('load', () => {
    setTimeout(() => introOverlay.classList.add('hidden'), 1200);
  });
}

function renderRoute(path) {
  currentRoute = path;
  document.body.classList.toggle('home-page', path === '/');
  homeView.hidden = path !== '/';
  routeView.replaceChildren();

  if (path === '/') return;
  if (['/windows', '/fivem', '/apps'].includes(path)) {
    routeView.innerHTML = categoryPage(path);
    renderProducts(path);
    return;
  }
  const productMatch = path.match(/^\/recurso\/(\d+)$/);
  if (productMatch) {
    const product = products.find((item) => item.id === Number(productMatch[1]));
    if (product) {
      routeView.innerHTML = productDetailPage(product);
      return;
    }
  }
  if (path === '/comunidad') {
    routeView.innerHTML = communityPage();
    renderCommunityHighlights();
    renderCommunityMembers();
    return;
  }
  routeView.innerHTML = `
    <section class="route-page not-found-page">
      <a href="/" data-route class="back-link">← VOLVER AL INICIO</a>
      <h1>PÁGINA NO ENCONTRADA</h1>
    </section>
  `;
}

function animateStatCount(element) {
  const target = Number(element.dataset.target || 0);
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function updateFrame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = target * eased;
    element.textContent = `${value.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateFrame);
      return;
    }

    element.textContent = `${target.toFixed(decimals)}${suffix}`;
  }

  requestAnimationFrame(updateFrame);
}

function setupStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach((counter) => animateStatCount(counter));
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal-item');
  revealItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 120}ms`;
  });
}

function setupCardGlow() {
  document.querySelectorAll('.feature-box, .product-card, .founder-card').forEach((card) => {
    if (card.dataset.glowReady) return;
    card.dataset.glowReady = 'true';
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

function setupRequestModal() {
  const modal = document.getElementById('requestModal');
  const modalTitle = document.getElementById('requestModalTitle');
  const modalMessage = document.getElementById('requestModalMessage');
  const modalLogo = document.getElementById('requestModalLogo');
  const closeButton = modal.querySelector('[data-close-request-modal]');
  let returnFocusTo = null;

  function openModal(requestCard) {
    returnFocusTo = requestCard;
    modalTitle.textContent = requestCard.dataset.requestName;
    modalMessage.textContent = {
      service: 'Únete al Discord y abre un ticket para solicitar este servicio.',
      resource: 'Únete al Discord y abre un ticket para solicitar este recurso.',
      app: 'Únete al Discord y abre un ticket para solicitar esta aplicación.',
    }[requestCard.dataset.requestKind];
    const logo = requestCard.dataset.requestLogo;
    modalLogo.hidden = !logo;
    if (logo) modalLogo.src = logo;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('request-modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    closeButton.focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('request-modal-open');
    window.setTimeout(() => {
      if (modal.classList.contains('is-open')) return;
      modal.hidden = true;
      returnFocusTo?.focus();
    }, 180);
  }

  document.addEventListener('click', (event) => {
    const requestCard = event.target.closest('.request-card');
    if (requestCard) {
      openModal(requestCard);
      return;
    }

    if (event.target.closest('[data-close-request-modal]') || event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      return;
    }

  });
}

function setupRequestImageFallbacks(container = document) {
  container.querySelectorAll('.request-card-logo, .request-card-watermark, .request-card-background, #requestModalLogo').forEach((image) => {
    if (image.dataset.fallbackReady) return;
    image.dataset.fallbackReady = 'true';
    image.addEventListener('error', () => {
      image.hidden = true;
    });
  });
}

function navigate(path, addHistory = true) {
  if (addHistory) history.pushState({}, '', path);
  const activeView = currentRoute === '/' ? homeView : routeView;
  activeView.classList.add('route-leaving');

  window.setTimeout(() => {
    renderRoute(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
    const nextView = path === '/' ? homeView : routeView;
    nextView.classList.remove('route-leaving');
    nextView.classList.add('route-entering');
    window.setTimeout(() => nextView.classList.remove('route-entering'), 280);
  }, 130);
}

function setupRouting() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-route]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = new URL(link.href, window.location.href);
    if (destination.origin === window.location.origin) navigate(destination.pathname);
  });

  window.addEventListener('popstate', () => navigate(window.location.pathname, false));
  const initialPath = window.location.pathname;
  const isProductRoute = /^\/recurso\/\d+$/.test(initialPath);
  renderRoute(['/', '/windows', '/fivem', '/apps', '/comunidad'].includes(initialPath) || isProductRoute
    ? initialPath
    : '/');
}

function setupProductLinks() {
  document.addEventListener('click', (event) => {
    const detailButton = event.target.closest('[data-detail-product-id]');
    if (!detailButton) return;

    const id = Number(detailButton.dataset.detailProductId);
    if (products.some((product) => product.id === id)) navigate(`/recurso/${id}`);
  });
}

function buildParticles() {
  const particleCount = 14;
  const particles = [];

  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  for (let i = 0; i < particleCount; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.4 + 1.2,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.35 + 0.08,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = 'rgba(255,255,255,0.7)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.14 - dist / 1000})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(drawParticles);
}

setupIntro();
setupTicker();
setupRouting();
setupProductLinks();
setupRequestModal();
setupRequestImageFallbacks();
setupRevealAnimations();
setupStatCounters();
setupCardGlow();
buildParticles();
