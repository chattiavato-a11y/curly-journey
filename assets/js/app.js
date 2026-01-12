/* ==========================================================================
   Gabriel Professional Services — App Bootstrap (no build)
   - Theme toggle (system/light/dark)
   - Language toggle (EN/ES)
   - Mobile nav + dropdown
   - Consent banner
   - 3D: Hero background + Rocket logo (Three.js via CDN)
   ========================================================================== */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* -------------------------
   Utilities
------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------
   Theme (system / light / dark)
------------------------- */
function applyTheme(theme) {
  const safe = theme === "light" || theme === "dark" || theme === "system" ? theme : "system";
  document.documentElement.setAttribute("data-theme", safe);

  const btn = $("#themeToggle");
  if (btn) {
    // aria-pressed: "true" means "not system" (explicit user selection)
    btn.setAttribute("aria-pressed", safe === "system" ? "false" : "true");
    btn.title = `Theme: ${safe}`;
  }
}

function initTheme() {
  const saved = storage.get("gps_theme", "system");
  applyTheme(saved);

  const btn = $("#themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "system";
    const next = current === "system" ? "light" : current === "light" ? "dark" : "system";
    storage.set("gps_theme", next);
    applyTheme(next);
  });
}

/* -------------------------
   Language (EN / ES)
------------------------- */
const I18N = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.submenu.logistics": "Logistics Management",
    "nav.submenu.itsupport": "IT Support Level I & II",
    "nav.submenu.admin": "C-Level Admin Support",
    "nav.submenu.relations": "Customer Relations",
    "nav.about": "About Us",
    "nav.careers": "Careers",
    "nav.contact": "Contact",
    "nav.signin": "Client Portal",
    "nav.getstarted": "Start Scaling",

    "consent.banner": "By using this site and chatbot, you agree to our Privacy & Consent terms.",
    "consent.review": "Review",
    "consent.accept": "Accept",

    "home.badge": "Operational Excellence • Fractional Teams • Real Outcomes",
    "home.title": "High-performance fractional operations for modern SMBs.",
    "home.subtitle":
      "Scale faster with a battle-tested operating system: logistics, IT support, customer relations, and executive admin — delivered as a service.",
    "home.ctaPrimary": "Start Scaling",
    "home.ctaSecondary": "Explore Services",
    "home.trust1": "Coverage",
    "home.trust2": "Response",
    "home.trust3": "Aligned",
    "home.panelTitle": "What you get",
    "home.panelItem1": "Fast onboarding and clear KPIs",
    "home.panelItem2": "Secure-by-default workflows",
    "home.panelItem3": "Bilingual support (EN/ES)",
    "home.panelItem4": "Continuous optimization",
    "home.panelLink": "See how it works",

    "home.servicesTitle": "Core Services",
    "home.servicesSubtitle": "Modular support stacks that plug into your business without the overhead.",

    "services.logistics.title": "Logistics Management",
    "services.logistics.short": "Dispatch, tracking, SLAs, and continuous improvements.",
    "services.itsupport.title": "IT Support Level I & II",
    "services.itsupport.short": "Helpdesk, device triage, access control, and incident handling.",
    "services.relations.title": "Customer Relations",
    "services.relations.short": "Multi-channel support with measurable satisfaction gains.",
    "services.admin.title": "C-Level Admin Support",
    "services.admin.short": "Executive calendars, inboxes, reporting, and coordination.",

    "home.ctaStripTitle": "Ready to scale without chaos?",
    "home.ctaStripSubtitle": "Start a pilot and get operational clarity in days — not months.",
    "home.ctaContact": "Contact",

    "footer.note": "Secure-by-design operational support for modern teams.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.gdpr": "GDPR",
    "footer.consent": "Privacy & Consent",

    "portal.title": "Client Portal",
    "portal.subtitle": "Secure access",
    "portal.headline": "Sign in to manage work",
    "portal.description": "Track requests, view updates, and collaborate with your dedicated support team.",
    "portal.trust1": "Least-privilege access",
    "portal.trust2": "Security-first workflow",
    "portal.trust3": "Clear audit trails",
    "portal.needAccess": "Need access?",
    "portal.useRequest": "Use “Request Access”",
    "portal.welcome": "Welcome back",
    "portal.tab.signin": "Sign In",
    "portal.tab.request": "Request Access",
    "portal.field.email": "Email",
    "portal.field.emailHelp": "Use the email associated with your account.",
    "portal.field.password": "Password",
    "portal.field.passwordHelp": "Demo mode: this page does not authenticate yet.",
    "portal.action.contactSupport": "Contact Support",
    "portal.action.signin": "Sign In",
    "portal.field.name": "Full Name",
    "portal.field.workEmail": "Work Email",
    "portal.field.company": "Company",
    "portal.field.message": "Message",
    "portal.field.messagePlaceholder": "Tell us what you need access to…",
    "portal.field.messageHelp": "We’ll verify and follow up with next steps.",
    "portal.action.backHome": "Back to Home",
    "portal.action.submitRequest": "Submit Request",
    "portal.tip": "Tip: Use Contact for urgent requests.",
    "portal.modal.title": "Done",
    "portal.modal.message": "Your request was received.",
    "portal.modal.close": "Close",
    "portal.modal.gotoContact": "Go to Contact",
    "portal.modal.signinDemo": "Demo mode: sign-in is not wired yet. Use Contact to continue.",
    "portal.modal.requestReceived": "Request received. We’ll verify and follow up with next steps.",

    "terms.title": "Terms & Conditions",
    "terms.lastUpdated": "Last updated:",
    "terms.summaryLabel": "Summary:",
    "terms.summary":
      "Use of this website and chat is subject to fair use, security rules, and “as-is” disclaimers.",
    "terms.section1.title": "1) Acceptance",
    "terms.section1.body":
      "By accessing this site or using our chat/forms, you agree to these Terms. If you do not agree, do not use the site.",
    "terms.section2.title": "2) Fair Use",
    "terms.section2.body": "You agree not to misuse the site or services.",
    "terms.section2.item1": "No abuse, harassment, or illegal content.",
    "terms.section2.item2": "No attempts to exploit, bypass security, probe endpoints, or spam.",
    "terms.section2.item3": "No automated scraping or excessive requests that degrade availability.",
    "terms.section2.item4": "You are responsible for the content you submit.",
    "terms.section3.title": "3) Chat & content",
    "terms.section3.body":
      "Chat responses may be incorrect or incomplete. Do not rely on chat for legal, medical, or financial decisions.",
    "terms.section3.item1":
      "Avoid sharing sensitive personal information in chat (IDs, bank details, passwords).",
    "terms.section3.item2": "We may use anti-abuse protections (rate limiting, filtering, monitoring).",
    "terms.action.privacy": "Privacy",
    "terms.action.consent": "Privacy & Consent",
    "terms.section4.title": "4) Availability & warranties",
    "terms.section4.body":
      "The site and services are provided “as-is” without warranties. We do not guarantee uninterrupted availability or accuracy.",
    "terms.section5.title": "5) Limitation of liability",
    "terms.section5.body":
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the site.",
    "terms.section6.title": "6) Changes",
    "terms.section6.body":
      "We may update these Terms from time to time. The “Last updated” date indicates when changes were made.",
    "terms.section7.title": "7) Contact",
    "terms.section7.body": "If you have questions about these Terms, contact us.",
    "terms.action.contact": "Contact",
  },

  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.submenu.logistics": "Gestión de Logística",
    "nav.submenu.itsupport": "Soporte TI Nivel I & II",
    "nav.submenu.admin": "Soporte Administrativo C-Level",
    "nav.submenu.relations": "Relación con Clientes",
    "nav.about": "Nosotros",
    "nav.careers": "Carreras",
    "nav.contact": "Contacto",
    "nav.signin": "Portal de Clientes",
    "nav.getstarted": "Empezar",

    "consent.banner": "Al usar este sitio y el chatbot, aceptas nuestros términos de Privacidad y Consentimiento.",
    "consent.review": "Revisar",
    "consent.accept": "Aceptar",

    "home.badge": "Excelencia Operativa • Equipos Fraccionales • Resultados Reales",
    "home.title": "Operaciones fraccionales de alto rendimiento para PYMES modernas.",
    "home.subtitle":
      "Escala más rápido con un sistema probado: logística, soporte TI, relación con clientes y soporte ejecutivo — como servicio.",
    "home.ctaPrimary": "Empezar",
    "home.ctaSecondary": "Ver Servicios",
    "home.trust1": "Cobertura",
    "home.trust2": "Respuesta",
    "home.trust3": "Alineado",
    "home.panelTitle": "Lo que obtienes",
    "home.panelItem1": "Onboarding rápido y KPIs claros",
    "home.panelItem2": "Flujos seguros por defecto",
    "home.panelItem3": "Soporte bilingüe (EN/ES)",
    "home.panelItem4": "Optimización continua",
    "home.panelLink": "Ver cómo funciona",

    "home.servicesTitle": "Servicios Clave",
    "home.servicesSubtitle": "Módulos que se integran a tu negocio sin sobrecarga.",

    "services.logistics.title": "Gestión de Logística",
    "services.logistics.short": "Despacho, seguimiento, SLAs y mejora continua.",
    "services.itsupport.title": "Soporte TI Nivel I & II",
    "services.itsupport.short": "Mesa de ayuda, triage de equipos, accesos e incidentes.",
    "services.relations.title": "Relación con Clientes",
    "services.relations.short": "Soporte multicanal con mejoras medibles.",
    "services.admin.title": "Soporte Administrativo C-Level",
    "services.admin.short": "Calendarios, correos, reportes y coordinación.",

    "home.ctaStripTitle": "¿Listo para escalar sin caos?",
    "home.ctaStripSubtitle": "Inicia un piloto y obtén claridad operativa en días — no meses.",
    "home.ctaContact": "Contacto",

    "footer.note": "Soporte operativo con seguridad desde el diseño.",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.gdpr": "GDPR",
    "footer.consent": "Privacidad y Consentimiento",

    "portal.title": "Portal de Cliente",
    "portal.subtitle": "Acceso seguro",
    "portal.headline": "Inicia sesión para gestionar trabajo",
    "portal.description":
      "Revisa solicitudes, ve actualizaciones y colabora con tu equipo de soporte.",
    "portal.trust1": "Acceso de mínimo privilegio",
    "portal.trust2": "Flujo con enfoque de seguridad",
    "portal.trust3": "Trazabilidad clara",
    "portal.needAccess": "¿Necesitas acceso?",
    "portal.useRequest": "Usa “Solicitar acceso”",
    "portal.welcome": "Bienvenido/a",
    "portal.tab.signin": "Iniciar sesión",
    "portal.tab.request": "Solicitar acceso",
    "portal.field.email": "Correo",
    "portal.field.emailHelp": "Usa el correo asociado a tu cuenta.",
    "portal.field.password": "Contraseña",
    "portal.field.passwordHelp": "Modo demo: esta página aún no autentica.",
    "portal.action.contactSupport": "Contactar Soporte",
    "portal.action.signin": "Iniciar sesión",
    "portal.field.name": "Nombre completo",
    "portal.field.workEmail": "Correo de trabajo",
    "portal.field.company": "Empresa",
    "portal.field.message": "Mensaje",
    "portal.field.messagePlaceholder": "Cuéntanos a qué necesitas acceso…",
    "portal.field.messageHelp": "Verificaremos y te contactaremos con los siguientes pasos.",
    "portal.action.backHome": "Volver al Inicio",
    "portal.action.submitRequest": "Enviar solicitud",
    "portal.tip": "Tip: Usa Contacto para solicitudes urgentes.",
    "portal.modal.title": "Listo",
    "portal.modal.message": "Tu solicitud fue recibida.",
    "portal.modal.close": "Cerrar",
    "portal.modal.gotoContact": "Ir a Contacto",
    "portal.modal.signinDemo": "Modo demo: el inicio de sesión aún no está conectado.",
    "portal.modal.requestReceived": "Solicitud recibida. Verificaremos y te contactaremos con los siguientes pasos.",

    "terms.title": "Términos y Condiciones",
    "terms.lastUpdated": "Última actualización:",
    "terms.summaryLabel": "Resumen:",
    "terms.summary":
      "El uso de este sitio y chat está sujeto a uso justo, reglas de seguridad y descargos “tal cual”.",
    "terms.section1.title": "1) Aceptación",
    "terms.section1.body":
      "Al acceder a este sitio o usar nuestro chat/formularios, aceptas estos Términos. Si no estás de acuerdo, no uses el sitio.",
    "terms.section2.title": "2) Uso Justo",
    "terms.section2.body": "Aceptas no hacer mal uso del sitio o servicios.",
    "terms.section2.item1": "No abuso, acoso o contenido ilegal.",
    "terms.section2.item2": "No intentar explotar, evadir seguridad, probar endpoints o hacer spam.",
    "terms.section2.item3": "No scraping automatizado o solicitudes excesivas que afecten disponibilidad.",
    "terms.section2.item4": "Eres responsable del contenido que envías.",
    "terms.section3.title": "3) Chat y contenido",
    "terms.section3.body":
      "Las respuestas del chat pueden ser incorrectas o incompletas. No uses el chat para decisiones legales, médicas o financieras.",
    "terms.section3.item1":
      "Evita compartir información personal sensible (IDs, datos bancarios, contraseñas).",
    "terms.section3.item2": "Podemos usar protecciones antiabuso (limitación de tasa, filtrado, monitoreo).",
    "terms.action.privacy": "Privacidad",
    "terms.action.consent": "Privacidad y Consentimiento",
    "terms.section4.title": "4) Disponibilidad y garantías",
    "terms.section4.body":
      "El sitio y servicios se proporcionan “tal cual” sin garantías. No garantizamos disponibilidad ininterrumpida ni exactitud.",
    "terms.section5.title": "5) Limitación de responsabilidad",
    "terms.section5.body":
      "En la máxima medida permitida por ley, no somos responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso del sitio.",
    "terms.section6.title": "6) Cambios",
    "terms.section6.body":
      "Podemos actualizar estos Términos ocasionalmente. La fecha de “Última actualización” indica cuándo se hicieron cambios.",
    "terms.section7.title": "7) Contacto",
    "terms.section7.body": "Si tienes preguntas sobre estos Términos, contáctanos.",
    "terms.action.contact": "Contacto",
  },
};

function applyLang(lang) {
  const safe = lang === "es" ? "es" : "en";
  document.documentElement.lang = safe;

  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = I18N[safe]?.[key];
    if (typeof value === "string") el.textContent = value;
  });

  $$("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = I18N[safe]?.[key];
    if (typeof value === "string") el.setAttribute("placeholder", value);
  });

  const btn = $("#langToggle");
  if (btn) {
    const pill = btn.querySelector(".lang-pill");
    if (pill) pill.textContent = safe.toUpperCase();
    btn.setAttribute("aria-pressed", safe === "es" ? "true" : "false");
    btn.title = `Language: ${safe.toUpperCase()}`;
  }
}

window.GPS_I18N = I18N;
window.gpsTranslate = (key, fallback = "") => {
  const lang = document.documentElement.lang === "es" ? "es" : "en";
  return I18N[lang]?.[key] ?? fallback;
};

function initLang() {
  const saved = storage.get("gps_lang", "en");
  applyLang(saved);

  const btn = $("#langToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.lang === "es" ? "es" : "en";
    const next = current === "en" ? "es" : "en";
    storage.set("gps_lang", next);
    applyLang(next);
  });
}

/* -------------------------
   Header scroll state
------------------------- */
function initHeaderScroll() {
  const header = $(".site-header");
  if (!header) return;

  const update = () => {
    header.setAttribute("data-scrolled", window.scrollY > 4 ? "true" : "false");
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* -------------------------
   Mobile nav + dropdown
------------------------- */
function initNav() {
  const nav = $("#primaryNav");
  const toggle = $(".nav-toggle");
  const dropdown = $("[data-dropdown]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Dropdown open/close
  if (dropdown) {
    const btn = $(".nav-dropdown-btn", dropdown);
    const setOpen = (open) => {
      dropdown.setAttribute("data-open", open ? "true" : "false");
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const open = dropdown.getAttribute("data-open") === "true";
        setOpen(!open);
      });
    }

    // Close on outside click / ESC
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }
}

/* -------------------------
   Consent banner
------------------------- */
function initConsent() {
  const bar = $("#consentBar");
  const accept = $("#consentAccept");
  if (!bar || !accept) return;

  const accepted = storage.get("gps_consent", "false") === "true";
  bar.hidden = accepted;

  accept.addEventListener("click", () => {
    storage.set("gps_consent", "true");
    bar.hidden = true;
  });
}

/* -------------------------
   Footer year
------------------------- */
function initYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* -------------------------
   3D: Rocket Logo
   - Small canvas in the header brand mark
------------------------- */
function initRocketLogo() {
  const mount = $("#rocketLogo");
  if (!mount) return;

  const w = mount.clientWidth || 46;
  const h = mount.clientHeight || 46;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
  camera.position.set(0, 0.35, 2.4);

  // Lights
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(2, 2, 3);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x9ca3af, 0.55);
  fill.position.set(-2, 0.5, 2);
  scene.add(fill);

  const amb = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(amb);

  // Rocket (simple primitives)
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.15,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x7c3aed,
    roughness: 0.3,
    metalness: 0.2,
    emissive: 0x2a0a7a,
    emissiveIntensity: 0.25,
  });

  // Body
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.8, 24), bodyMat);
  body.position.y = 0;
  group.add(body);

  // Nose cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.35, 24), accentMat);
  nose.position.y = 0.58;
  group.add(nose);

  // Engine
  const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.20, 0.18, 20), accentMat);
  engine.position.y = -0.49;
  group.add(engine);

  // Fins
  const finGeo = new THREE.BoxGeometry(0.06, 0.18, 0.22);
  for (let i = 0; i < 3; i++) {
    const fin = new THREE.Mesh(finGeo, accentMat);
    fin.position.set(0.2, -0.25, 0);
    fin.rotation.y = (i * Math.PI * 2) / 3;
    group.add(fin);
  }

  group.rotation.z = 0.05;
  group.rotation.x = 0.15;
  scene.add(group);

  const animate = () => {
    if (!renderer.domElement.isConnected) return;

    if (!prefersReducedMotion()) {
      group.rotation.y += 0.012;
      group.rotation.x = 0.15 + Math.sin(Date.now() * 0.002) * 0.02;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  // Resize observer (in case header scales)
  const ro = new ResizeObserver(() => {
    const nw = mount.clientWidth || 46;
    const nh = mount.clientHeight || 46;
    renderer.setSize(nw, nh, false);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
  });
  ro.observe(mount);

  animate();
}

/* -------------------------
   3D: Hero Background
   - Subtle particles + floating torus knot
------------------------- */
function initHero3D() {
  const canvas = $("#heroCanvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  // Lights (soft)
  const key = new THREE.DirectionalLight(0xffffff, 0.95);
  key.position.set(3, 3, 6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x8b5cf6, 0.55);
  rim.position.set(-4, 1, 5);
  scene.add(rim);

  const amb = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(amb);

  // Particles
  const particleCount = 650;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    positions[idx + 0] = (Math.random() - 0.5) * 14;
    positions[idx + 1] = (Math.random() - 0.5) * 8;
    positions[idx + 2] = (Math.random() - 0.5) * 18;
    speeds[i] = 0.4 + Math.random() * 1.2;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const pMat = new THREE.PointsMaterial({
    color: 0xa78bfa,
    size: 0.025,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });

  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Center object (torus knot — premium tech feel)
  const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.32, 140, 22);
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.18,
    emissive: 0x2a0a7a,
    emissiveIntensity: 0.15,
  });

  const knot = new THREE.Mesh(knotGeo, knotMat);
  knot.position.set(1.6, 0.15, -2.2);
  knot.rotation.set(0.5, 0.2, 0.1);
  scene.add(knot);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  resize();

  let last = performance.now();

  const animate = (t) => {
    if (!renderer.domElement.isConnected) return;

    const dt = Math.min(0.032, (t - last) / 1000);
    last = t;

    if (!prefersReducedMotion()) {
      // Subtle motion
      knot.rotation.y += dt * 0.55;
      knot.rotation.x += dt * 0.25;

      // Particle drift (wrap)
      const pos = pGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pos[idx + 2] += dt * speeds[i] * 0.55;
        if (pos[idx + 2] > 9) pos[idx + 2] = -9;
      }
      pGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

/* -------------------------
   Boot
------------------------- */
function boot() {
  initTheme();
  initLang();
  initHeaderScroll();
  initNav();
  initConsent();
  initYear();

  // 3D (safe init)
  try {
    initRocketLogo();
  } catch {
    // If WebGL blocked, ignore.
  }

  try {
    initHero3D();
  } catch {
    // If WebGL blocked, ignore.
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
