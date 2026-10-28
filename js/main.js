(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  let lang = localStorage.getItem('portfolio-lang') || 'es';
  const t = (k) => (lang === 'en' ? I18N_EN : I18N_ES_JS)[k] || k;
  const icons = () => window.lucide && lucide.createIcons({ attrs: { 'stroke-width': 2.75 } });
  const policyContent = {
    privacy: {
      es: `<h3>${I18N_ES_JS['privacy.title']}</h3><p><strong>Última actualización:</strong> 28 de octubre de 2026</p><p>Esta política explica qué información se trata cuando visitas el portafolio de Evelin Soledad Pinto.</p><h4>Información que se recopila</h4><p>Este sitio no tiene cuentas de usuario, base de datos propia, analítica ni publicidad. La preferencia de idioma se guarda únicamente en el almacenamiento local de tu navegador. Si eliges enviar un mensaje, se abre tu aplicación de correo mediante un enlace <em>mailto:</em>; el sitio no recibe ni almacena ese mensaje.</p><h4>Servicios externos</h4><p>El sitio carga recursos desde servicios externos como unpkg (Lucide y Three.js). Esos servicios pueden recibir datos técnicos básicos de la conexión, como la dirección IP, conforme a sus propias políticas.</p><h4>Contacto</h4><p>Para consultas sobre privacidad, escribe a <a href="mailto:solpinto492@gmail.com">solpinto492@gmail.com</a>.</p>`,
      en: `<h3>${I18N_EN['privacy.title']}</h3><p><strong>Last updated:</strong> October 28, 2026</p><p>This policy explains what information is processed when you visit Evelin Soledad Pinto's portfolio.</p><h4>Information collected</h4><p>This site has no user accounts, own database, analytics or advertising. Your language preference is stored only in your browser's local storage. If you choose to send a message, your email application opens through a <em>mailto:</em> link; the site does not receive or store that message.</p><h4>Third-party services</h4><p>The site loads resources from external services such as unpkg (Lucide and Three.js). Those services may receive basic technical connection data, such as your IP address, under their own policies.</p><h4>Contact</h4><p>For privacy questions, email <a href="mailto:solpinto492@gmail.com">solpinto492@gmail.com</a>.</p>`
    },
    cookies: {
      es: `<h3>${I18N_ES_JS['cookies.title']}</h3><p><strong>Última actualización:</strong> 28 de octubre de 2026</p><p>Este portafolio no utiliza cookies propias, cookies de publicidad ni herramientas de seguimiento.</p><h4>Almacenamiento local</h4><p>Para recordar el idioma elegido, el sitio guarda una preferencia en el almacenamiento local de tu navegador. No es una cookie y no se utiliza para identificarte ni rastrear tu actividad.</p><h4>Recursos de terceros</h4><p>Algunas bibliotecas visuales se cargan desde unpkg. El proveedor puede tratar datos técnicos de la conexión según sus propias condiciones. Si prefieres evitarlo, puedes bloquear recursos de terceros desde la configuración de tu navegador, aunque algunas animaciones o iconos podrían no mostrarse.</p><h4>Cómo borrar la preferencia</h4><p>Puedes borrar el almacenamiento local desde la configuración de privacidad de tu navegador. Al hacerlo, el sitio volverá al idioma predeterminado.</p>`,
      en: `<h3>${I18N_EN['cookies.title']}</h3><p><strong>Last updated:</strong> October 28, 2026</p><p>This portfolio does not use first-party cookies, advertising cookies or tracking tools.</p><h4>Local storage</h4><p>To remember your language choice, the site stores a preference in your browser's local storage. It is not a cookie and is not used to identify you or track your activity.</p><h4>Third-party resources</h4><p>Some visual libraries are loaded from unpkg. The provider may process technical connection data under its own terms. You can block third-party resources in your browser settings, although some animations or icons may not display.</p><h4>How to remove the preference</h4><p>You can clear local storage from your browser's privacy settings. The site will then return to its default language.</p>`
    }
  };

  /* ── Idioma ── */
  const esCache = new Map();
  $$('[data-i18n]').forEach((el) => esCache.set(el, el.innerHTML));
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === 'en' && I18N_EN[k] ? I18N_EN[k] : esCache.get(el);
    });
    $$('[data-i18n-aria-label]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)); });
    $$('[data-i18n-content]').forEach((el) => { el.setAttribute('content', t(el.dataset.i18nContent)); });
    $$('[data-i18n-alt]').forEach((el) => { el.setAttribute('alt', t(el.dataset.i18nAlt)); });
    document.title = t('meta.title');
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
    const evidence = p.evidence?.length
      ? `<section class="evidence-gallery" aria-label="${lang === 'en' ? 'Evidence gallery' : 'Galería de evidencias'}">
          <h4>${lang === 'en' ? 'Evidence' : 'Evidencias'}</h4>
          <div class="evidence-gallery-grid">
            ${p.evidence.map((item) => `<a class="evidence-item" href="${item.src}" target="_blank" rel="noopener">
              <img src="${item.src}" alt="${item[lang]}" loading="lazy">
              <span>${item[lang]}</span>
            </a>`).join('')}
          </div>
        </section>`
      : '';
    $('#dialogContent').innerHTML = `
      <span class="card-kicker">${c.kicker} · ${p.year}</span>
      <h3 class="dialog-title">${c.title}</h3>
      <dl class="dl">
        <div><dt>${t('_obj')}</dt><dd>${c.objetivo}</dd></div>
        <div><dt>${t('_part')}</dt><dd>${c.participacion}</dd></div>
        <div><dt>${t('_res')}</dt><dd>${c.resultado}</dd></div>
      </dl>
      <ul class="chips">${(lang === 'en' && p.stackEn ? p.stackEn : p.stack).map((s) => `<li class="tag tag-neutral">${s}</li>`).join('')}</ul>
      ${evidence}
      ${p.link ? `<a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener">${t('_ev')} <i data-lucide="external-link"></i></a>` : ''}`;
    icons();
    dlg.showModal();
  }
  $('#dialogClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  $$('[data-policy]').forEach((button) => button.addEventListener('click', () => {
    const type = button.dataset.policy;
    const policyDialog = $(`#${type}Dialog`);
    $(`[data-policy-content="${type}"]`, policyDialog).innerHTML = policyContent[type][lang];
    policyDialog.showModal();
  }));
  $$('[data-policy-close]').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('.policy-dialog').forEach((policyDialog) => policyDialog.addEventListener('click', (e) => {
    if (e.target === policyDialog) policyDialog.close();
  }));

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
