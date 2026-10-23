(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  let lang = localStorage.getItem('portfolio-lang') || 'es';
  const t = (k) => (lang === 'en' ? I18N_EN : I18N_ES_JS)[k] || k;
  const icons = () => window.lucide && lucide.createIcons({ attrs: { 'stroke-width': 2.75 } });

  /* ── Idioma ── */
  const esCache = new Map();
  $$('[data-i18n]').forEach((el) => esCache.set(el, el.innerHTML));
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === 'en' && I18N_EN[k] ? I18N_EN[k] : esCache.get(el);
    });
    $('#langBtn').dataset.lang = lang;
    renderProjects();
    requestAnimationFrame(moveIndicator);
  }
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolio-lang', lang);
    applyLang();
  });

  /* ── Proyectos ── */
  function renderProjects() {
    $('#projects').innerHTML = PROJECTS.map((p, i) => {
      const c = p[lang];
      return `<button class="project card tilt reveal is-in ${p.tone}" data-id="${p.id}" style="--i:${i}">
        <span class="project-icon"><i data-lucide="${p.icon}"></i></span>
        <span class="card-kicker">${c.kicker}</span>
        <span class="project-title">${c.title}</span>
        <span class="project-summary">${c.summary}</span>
        <span class="project-more">${t('_more')} <i data-lucide="arrow-up-right"></i></span>
      </button>`;
    }).join('');
    icons();
    bindTilt($$('#projects .tilt'));
  }
  $('#projects').addEventListener('click', (e) => {
    const card = e.target.closest('.project');
    if (card) openProject(card.dataset.id);
  });
  const dlg = $('#projectDialog');
  function openProject(id) {
    const p = PROJECTS.find((x) => x.id === id), c = p[lang];
    $('#dialogContent').innerHTML = `
      <span class="card-kicker">${c.kicker} · ${p.year}</span>
      <h3 class="dialog-title">${c.title}</h3>
      <dl class="dl">
        <div><dt>${t('_obj')}</dt><dd>${c.objetivo}</dd></div>
        <div><dt>${t('_part')}</dt><dd>${c.participacion}</dd></div>
        <div><dt>${t('_res')}</dt><dd>${c.resultado}</dd></div>
      </dl>
      <ul class="chips">${p.stack.map((s) => `<li class="tag tag-neutral">${s}</li>`).join('')}</ul>
      ${p.link ? `<a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener">${t('_ev')} <i data-lucide="external-link"></i></a>` : ''}`;
    icons();
    dlg.showModal();
  }
  $('#dialogClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  /* ── Navegación: indicador, sección activa, menú móvil ── */
  const navLinks = $$('.pill-nav a');
  const indicator = $('#pillIndicator');
  let activeId = null;
  function moveIndicator() {
    const a = navLinks.find((l) => l.hash === '#' + activeId);
    if (!a) { indicator.style.opacity = 0; return; }
    indicator.style.opacity = 1;
    indicator.style.width = a.offsetWidth + 'px';
    indicator.style.transform = `translateX(${a.offsetLeft}px)`;
    navLinks.forEach((l) => l.classList.toggle('is-active', l === a));
  }
  const sections = $$('main > section[id]');
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        activeId = en.target.id === 'reflexion' ? 'evidencias' : en.target.id;
        moveIndicator();
        window.__activeSection = sections.indexOf(en.target);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => sectionObs.observe(s));
  window.addEventListener('resize', moveIndicator);

  const menuBtn = $('#menuBtn'), overlay = $('#overlay');
  function toggleMenu(open) {
    const o = open ?? !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', o);
    menuBtn.setAttribute('aria-expanded', o);
    overlay.setAttribute('aria-hidden', !o);
  }
  menuBtn.addEventListener('click', () => toggleMenu());
  $$('.overlay a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });

  /* ── Scroll: barra de progreso y topbar ── */
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    window.__scroll = p;
    $('#progressBar').style.transform = `scaleX(${p})`;
    document.body.classList.toggle('scrolled', scrollY > 40);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Aparición 3D al hacer scroll ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealObs.unobserve(en.target); } });
  }, { threshold: 0.15 });
  $$('.reveal').forEach((el, i) => { el.style.setProperty('--d', (i % 4) * 80 + 'ms'); revealObs.observe(el); });

  /* ── Tarjetas con inclinación 3D ── */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bindTilt(els) {
    if (reduce || matchMedia('(hover: none)').matches) return;
    els.forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', `${-y * 10}deg`);
        el.style.setProperty('--ry', `${x * 12}deg`);
        el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
        el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }
  bindTilt($$('.tilt'));

  /* ── Filtro de trayectoria ── */
  $$('.filter .seg-opt').forEach((b) => b.addEventListener('click', () => {
    $$('.filter .seg-opt').forEach((x) => x.classList.toggle('is-on', x === b));
    const f = b.dataset.filter;
    $$('.tl-item').forEach((li) => li.classList.toggle('is-hidden', f !== 'all' && li.dataset.type !== f));
  }));

  /* ── Contacto ── */
  const toast = (msg) => { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2200); };
  $('#copyMail').addEventListener('click', () => navigator.clipboard?.writeText('solpinto492@gmail.com').then(() => toast(t('_copied'))));
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#fName').value.trim(), msg = $('#fMsg').value.trim();
    const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`);
    location.href = `mailto:solpinto492@gmail.com?subject=${subject}&body=${encodeURIComponent(msg + '\n\n— ' + name)}`;
  });

  applyLang();
  icons();
})();
