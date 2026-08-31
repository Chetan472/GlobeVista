/* GlobeVista — Phase 2 interactivity */

const DESTINATIONS = [
  { name: "Bali", country: "Indonesia", price: "₹45,999", rating: "4.9", tag: "Tropical Paradise" },
  { name: "Maldives", country: "Maldives", price: "₹69,999", rating: "4.8", tag: "Luxury Beaches" },
  { name: "Switzerland", country: "Switzerland", price: "₹89,999", rating: "4.9", tag: "Snow Mountains" },
  { name: "Dubai", country: "UAE", price: "₹55,999", rating: "4.8", tag: "Modern Luxury" },
  { name: "Kashmir", country: "India", price: "₹29,999", rating: "4.9", tag: "Heaven on Earth" },
  { name: "Santorini", country: "Greece", price: "₹79,999", rating: "4.8", tag: "Greek Island" },
];

const THEME_KEY = "globevista-theme";

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const btn = document.querySelector(".toggle");
  if (btn) btn.textContent = isDark ? "☀️" : "🌙";
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = saved === "dark" || (!saved && prefersDark);
  if (isDark) document.body.classList.add("dark-mode");
  updateThemeIcon(isDark);
}

function toggleMobileNav() {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".menu-toggle");
  const isOpen = nav.classList.toggle("nav-open");
  btn.setAttribute("aria-expanded", isOpen);
  btn.textContent = isOpen ? "✕" : "☰";
}

function closeMobileNav() {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".menu-toggle");
  nav.classList.remove("nav-open");
  if (btn) {
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "☰";
  }
}

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    closeMobileNav();
  }
}

function showToast(message, type = "success") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type} toast-visible`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("toast-visible"), 3500);
}

function handleSearch(e) {
  e.preventDefault();
  const form = e.target;
  const destination = form.querySelector('[name="destination"]').value.trim();
  const checkIn = form.querySelector('[name="checkin"]').value;
  const checkOut = form.querySelector('[name="checkout"]').value;

  if (!destination) {
    showToast("Please enter a destination.", "error");
    return;
  }
  if (checkIn && checkOut && checkIn >= checkOut) {
    showToast("Check-out must be after check-in.", "error");
    return;
  }

  const match = DESTINATIONS.find((d) =>
    d.name.toLowerCase().includes(destination.toLowerCase())
  );

  if (match) {
    showToast(`Found ${match.name}! Starting from ${match.price}.`);
    scrollToSection("#packages");
  } else {
    showToast(`No exact match for "${destination}". Showing all destinations.`);
    scrollToSection("#destination");
  }
}

function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();

  if (!name || !email || !phone) {
    showToast("Please fill in all required fields.", "error");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  showToast(`Thank you, ${name}! We'll contact you within 24 hours.`);
  form.reset();
}

function prefillDestination(name) {
  const input = document.querySelector('[name="destination"]');
  if (input) input.value = name;
  scrollToSection("#contact");
  closeMobileNav();
}

function initBookButtons() {
  document.querySelectorAll(".book-now-btn, .book-btn, .offer-btn").forEach((btn) => {
    btn.addEventListener("click", () => scrollToSection("#contact"));
  });

  document.querySelectorAll(".explore-btn").forEach((btn) => {
    btn.addEventListener("click", () => scrollToSection("#destination"));
  });

  document.querySelectorAll(".card button, .gallery-card").forEach((el, i) => {
    el.addEventListener("click", () => {
      const names = ["Bali", "Maldives", "Switzerland", "Dubai", "Kashmir", "Santorini"];
      const idx = el.closest(".card, .gallery-card")
        ? [...el.closest(".destination-container, .gallery-container").children].indexOf(
            el.closest(".card, .gallery-card")
          )
        : i;
      prefillDestination(names[idx] ?? "Bali");
    });
  });

  document.querySelectorAll(".price button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const packageName = btn.closest(".package-content")?.querySelector("h3")?.textContent ?? "";
      const destInput = document.querySelector('[name="destination"]');
      if (destInput) destInput.value = packageName.replace(/ Adventure| Escape| Tour| Swiss Alps Tour/, "").trim() || packageName;
      scrollToSection("#contact");
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id], .hero");
  const navLinks = document.querySelectorAll(".nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id || "home";
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function animateStats() {
  const statCards = document.querySelectorAll(".stat-card h3");
  const targets = [
    { value: 50000, suffix: "+", format: (n) => `${Math.floor(n / 1000)}K+` },
    { value: 150, suffix: "+", format: (n) => `${Math.floor(n)}+` },
    { value: 12, suffix: "+", format: (n) => `${Math.floor(n)}+` },
    { value: 4.9, suffix: "", format: (n) => n.toFixed(1) },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const idx = [...statCards].indexOf(el);
        const { value, format } = targets[idx];
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format(value * eased);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statCards.forEach((card) => observer.observe(card));
}

function initGalleryLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close gallery">&times;</button>
    <img src="" alt="" />
    <p class="lightbox-caption"></p>
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");

  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      const cardImg = card.querySelector("img");
      const title = card.querySelector(".overlay h3")?.textContent ?? "";
      const subtitle = card.querySelector(".overlay p")?.textContent ?? "";
      img.src = cardImg.src;
      img.alt = cardImg.alt;
      caption.textContent = `${title} — ${subtitle}`;
      lightbox.classList.add("lightbox-open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("lightbox-open");
    document.body.style.overflow = "";
  }

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function initFooterLinks() {
  const linkMap = {
    Home: "#home",
    Destinations: "#destination",
    Packages: "#packages",
    Gallery: "#gallery",
    Contact: "#contact",
  };

  document.querySelectorAll(".footer-box a").forEach((link) => {
    const text = link.textContent.trim();
    if (linkMap[text]) {
      link.href = linkMap[text];
      link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(linkMap[text]);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initBookButtons();
  initActiveNav();
  animateStats();
  initGalleryLightbox();
  initFooterLinks();

  document.querySelector(".menu-toggle")?.addEventListener("click", toggleMobileNav);
  document.querySelector(".search-form")?.addEventListener("submit", handleSearch);
  document.querySelector(".contact-form form")?.addEventListener("submit", handleContact);

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });
});
