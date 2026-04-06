const brands = [
  {
    name: "Ray-Ban",
    url: "https://www.ray-ban.com",
    logo: "./rb.png",
    description:
      "Timeless style, authenticity and freedom of expression are the core values of Ray-Ban.",
  },
  {
    name: "Ocean Pacific",
    url: "https://www.cvoptical.com/catalog/brand/ocean-pacific.html",
    logo: "./op.jpg",
    description:
      "The original California surf brand, bringing West Coast vibes to eyewear.",
  },
  {
    name: "Shaquille O'Neal",
    url: "https://www.zyloware.com/US/catalog/index?brandName=Shaquille%20O%27Neal",
    logo: "./shaq.jpg",
    description:
      "Designed for the big and tall, combining athletic style with everyday comfort.",
  },
  {
    name: "Modern Optical",
    url: "https://www.modernoptical.com",
    logo: "./modern.jpg",
    description:
      "Quality eyewear for every budget, featuring contemporary designs.",
  },
  {
    name: "Bebe",
    url: "https://www.altaireyewear.com/brands/bebe.html",
    logo: "./bebe.jpg",
    description: "Chic, sophisticated eyewear for the modern woman.",
  },
  {
    name: "Calvin Klein Jeans",
    url: "https://www.altaireyewear.com/brands/calvinkleinjeans.html",
    logo: "./ckj.png",
    description:
      "Minimalist aesthetic and provocative imagery, a global lifestyle brand.",
  },
  {
    name: "McAllister",
    url: "https://www.mcallistereyewear.com",
    logo: "./mca.jpg",
    description:
      "Heritage-inspired designs with a focus on craftsmanship and detail.",
  },
  {
    name: "Smilen Eyewear",
    url: "https://www.smileneyewear.com",
    logo: "./smilen.png",
    description: "Innovative designs that bring a smile to your face.",
  },
  {
    name: "Lumax",
    url: "https://newyorkeye.net/lumax/",
    logo: "./lumax.jpg",
    description: "Precision optics and durable frames for active lifestyles.",
  },
  {
    name: "Enhance",
    url: "https://newyorkeye.net/enhance/",
    logo: "./enhance.png",
    description: "Enhancing your vision with style and clarity.",
  },
];

const contactStats = [
  ["Phone", "(859) 266-3003", "8592663003"],
  ["Exams or Contacts", "(859) 269-6921", "8592696921"],
  ["Fax", "(859) 266-9504"],
];

const hours = [
  ["Monday", "9:00 AM - 6:00 PM"],
  ["Tuesday", "9:00 AM - 6:00 PM"],
  ["Wednesday", "9:00 AM - 6:00 PM"],
  ["Thursday", "9:00 AM - 6:00 PM"],
  ["Friday", "9:00 AM - 6:00 PM"],
  ["Saturday", "9:00 AM - 6:00 PM"],
  ["Sunday", "Closed", true],
];

const heroImages = [
  "./eg/eg1.png",
  "./eg/eg2.png",
  "./eg/eg3.png",
  "./eg/eg4.png",
  "./eg/e5.png",
  "./eg/eg6.png",
  "./eg/eg7.png",
  "./eg/eg8.png",
];

const linkIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 5h5v5h-2V8.41l-6.29 6.3-1.42-1.42 6.3-6.29H14V5zm-8 2h5v2H7v8h8v-4h2v6H5V7z"></path>
  </svg>
`;

const page = document.body.dataset.page;
const header = document.getElementById("site-header");
const menuButton = document.getElementById("menu-button");
const mobileNav = document.getElementById("mobile-nav");
const doctorsSection = document.getElementById("doctors");
const heroSlides = Array.from(document.querySelectorAll("[data-hero-slide]"));
let currentSlide = 0;

function setActiveNav() {
  const hash = window.location.hash;
  let active = page;

  if (page === "home" && hash === "#doctors") {
    active = "doctors";
  }

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === active);
  });
}

function setupMenu() {
  if (!menuButton || !mobileNav) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      header.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

function setupHero() {
  if (heroSlides.length !== 2) {
    return;
  }

  heroSlides[0].style.backgroundImage = `url('${heroImages[0]}')`;
  heroSlides[1].style.backgroundImage = `url('${heroImages[1]}')`;

  window.setInterval(() => {
    const nextIndex = (currentSlide + 1) % heroImages.length;
    const visible = heroSlides.find((slide) =>
      slide.classList.contains("is-active"),
    );
    const hidden = heroSlides.find(
      (slide) => !slide.classList.contains("is-active"),
    );

    if (!visible || !hidden) {
      return;
    }

    hidden.style.backgroundImage = `url('${heroImages[nextIndex]}')`;
    hidden.classList.add("is-active");
    visible.classList.remove("is-active");
    currentSlide = nextIndex;
  }, 5000);
}

function updateHeaderTheme() {
  if (page !== "home" || !doctorsSection) {
    header.classList.remove("is-dark");
    return;
  }

  const rect = doctorsSection.getBoundingClientRect();
  header.classList.toggle("is-dark", rect.top <= 80 && rect.bottom >= 80);
}

function renderBrandPreview() {
  const grid = document.getElementById("brand-preview-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = brands
    .slice(0, 5)
    .map(
      (brand) => `
    <article class="brand-preview-card reveal">
      <img src="${brand.logo}" alt="${brand.name}">
      <span>${brand.name}</span>
    </article>
  `,
    )
    .join("");
}

function renderBrandGrid() {
  const grid = document.getElementById("brand-grid");
  if (!grid) {
    return;
  }

  const items = brands.map(
    (brand) => `
    <article class="brand-card reveal">
      <div class="brand-card__image">
        <img src="${brand.logo}" alt="${brand.name}">
        <div class="brand-card__overlay"></div>
        <div class="brand-card__icon">${linkIcon}</div>
      </div>
      <div class="brand-card__body">
        <h3>${brand.name}</h3>
        <p>${brand.description}</p>
        <a class="brand-link" href="${brand.url}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    </article>
  `,
  );

  items.push(`
    <article class="brand-card brand-card--more reveal">
      <div class="divider"></div>
      <h3>And More...</h3>
      <p>Our inventory is constantly evolving. Visit us in-store to see our full selection of boutique and independent designers.</p>
      <div class="divider"></div>
    </article>
  `);

  grid.innerHTML = items.join("");
}

function renderContactStats() {
  const grid = document.getElementById("contact-stat-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = contactStats
    .map(
      ([label, value, tel]) => `
    <div class="contact-stat">
      <span class="contact-stat__label">${label}</span>
      ${tel ? `<a class="contact-stat__value contact-stat__value--link" href="tel:+1${tel}">${value}</a>` : `<span class="contact-stat__value">${value}</span>`}
    </div>
  `,
    )
    .join("");
}

function renderHours() {
  const list = document.getElementById("hours-list");
  if (!list) {
    return;
  }

  list.innerHTML = hours
    .map(
      ([day, time, closed]) => `
    <div class="hours-row">
      <span>${day}</span>
      <strong class="${closed ? "closed" : ""}">${time}</strong>
    </div>
  `,
    )
    .join("");
}

function setupRouteForm() {
  const form = document.getElementById("route-form");
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const startInput = document.getElementById("start-address");
    if (!(startInput instanceof HTMLInputElement)) {
      return;
    }

    const destination = "1555 E New Circle Rd Suite 146 Lexington KY 40509";
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startInput.value.trim())}&destination=${encodeURIComponent(destination)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "there").trim();
    status.textContent = `Thanks, ${name}. Please call (859) 266-3003 for immediate assistance.`;
    form.reset();
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((item) => observer.observe(item));
}

function setupHashScroll() {
  if (page !== "home" || !window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);
  if (target) {
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }
}

function setupPolicyModal() {
  const triggers = document.querySelectorAll("[data-policy-trigger]");
  const modals = Array.from(document.querySelectorAll(".policy-modal"));
  if (!modals.length || !triggers.length) {
    return;
  }

  const closeAllModals = () => {
    modals.forEach((modal) => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("has-modal-open");
  };

  const openModal = (modal) => {
    closeAllModals();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-modal-open");
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = trigger.getAttribute("href")?.replace("#", "") || "";
      const modal = modalId ? document.getElementById(modalId) : null;
      if (modal instanceof HTMLElement) {
        openModal(modal);
      }
    });
  });

  modals.forEach((modal) => {
    const closeControls = modal.querySelectorAll("[data-policy-close]");
    closeControls.forEach((control) => {
      control.addEventListener("click", closeAllModals);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modals.some((modal) => modal.classList.contains("is-open"))
    ) {
      closeAllModals();
    }
  });
}

function initialize() {
  setActiveNav();
  setupMenu();
  setupHero();
  renderBrandPreview();
  renderBrandGrid();
  renderContactStats();
  renderHours();
  setupRouteForm();
  setupContactForm();
  setupReveal();
  setupHashScroll();
  setupPolicyModal();
  updateHeaderTheme();

  window.addEventListener("scroll", updateHeaderTheme, { passive: true });
  window.addEventListener("hashchange", () => {
    setActiveNav();
    updateHeaderTheme();
  });
}

initialize();
