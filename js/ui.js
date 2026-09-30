/* ==========================================================================
   GlobeVista — shared UI helpers: formatting, toasts, modals, lightbox
   ========================================================================== */
"use strict";

const GV_Money = {
  inr(value) {
    const n = Number(value) || 0;
    return "₹" + n.toLocaleString("en-IN");
  }
};

const GV_Date = {
  pretty(iso) {
    if (!iso) return "—";
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  },
  range(from, to) {
    if (!from || !to) return "—";
    return `${GV_Date.pretty(from)} → ${GV_Date.pretty(to)}`;
  },
  nights(from, to) {
    const a = new Date(`${from}T00:00:00`).getTime();
    const b = new Date(`${to}T00:00:00`).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return 0;
    return Math.max(0, Math.round((b - a) / 86400000));
  }
};

const GV_Util = {
  escape(text) {
    return String(text === undefined || text === null ? "" : text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },
  initials(name) {
    return String(name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => (part[0] ? part[0].toUpperCase() : ""))
      .join("");
  },
  stars(rating) {
    const full = Math.round(Number(rating) || 0);
    return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
  },
  plural(n, one, many) {
    return `${n} ${n === 1 ? one : many}`;
  }
};

/* --------------------------------- toast ------------------------------- */

const GV_Toast = {
  node: null,
  ensure() {
    if (GV_Toast.node) return GV_Toast.node;
    const region = document.createElement("div");
    region.className = "toast-region";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
    GV_Toast.node = region;
    return region;
  },
  show(message, type = "success") {
    const region = GV_Toast.ensure();
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span class="toast__icon" aria-hidden="true">${
      type === "error" ? "⚠" : type === "info" ? "ℹ" : "✓"
    }</span><span>${GV_Util.escape(message)}</span>`;
    region.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 300);
    }, 3600);
  }
};

/* -------------------------------- modals ------------------------------- */

const GV_Modal = {
  openStack: [],

  open(id, options = {}) {
    const modal = document.getElementById(id);
    if (!modal) {
      console.warn("GlobeVista: modal not found:", id);
      return null;
    }
    if (!modal.hasAttribute("aria-labelledby")) {
      const heading = modal.querySelector("h1, h2, h3");
      if (heading) {
        if (!heading.id) heading.id = `${id}-label`;
        modal.setAttribute("aria-labelledby", heading.id);
      }
    }
    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
    GV_Modal.openStack.push({
      modal,
      previousFocus: document.activeElement,
      onClose: options.onClose
    });

    const focusTarget =
      modal.querySelector("[data-autofocus]") ||
      modal.querySelector("input, select, textarea, button:not([data-modal-close])") ||
      modal;
    setTimeout(() => focusTarget.focus(), 60);

    if (typeof options.onOpen === "function") options.onOpen(modal);
    return modal;
  },

  close(id) {
    const entry = GV_Modal.openStack.find((item) => !id || item.modal.id === id);
    if (!entry) return;
    const { modal, previousFocus, onClose } = entry;
    modal.classList.remove("is-open");
    setTimeout(() => {
      if (!modal.classList.contains("is-open")) modal.hidden = true;
    }, 220);
    GV_Modal.openStack = GV_Modal.openStack.filter((item) => item !== entry);
    if (!GV_Modal.openStack.length) document.body.classList.remove("no-scroll");
    if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    if (typeof onClose === "function") onClose();
  },

  closeAll() {
    [...GV_Modal.openStack].forEach((item) => GV_Modal.close(item.modal.id));
  },

  focusables(modal) {
    return Array.from(
      modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }
};

function gvInitModals() {
  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-modal-open]");
    if (opener) {
      event.preventDefault();
      GV_Modal.open(opener.getAttribute("data-modal-open"));
      return;
    }
    const closer = event.target.closest("[data-modal-close]");
    if (closer) {
      event.preventDefault();
      GV_Modal.close(closer.getAttribute("data-modal-close") || undefined);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!GV_Modal.openStack.length) return;
    const top = GV_Modal.openStack[GV_Modal.openStack.length - 1].modal;

    if (event.key === "Escape") {
      event.preventDefault();
      GV_Modal.close(top.id);
      return;
    }
    if (event.key === "Tab") {
      const items = GV_Modal.focusables(top);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

/* ------------------------------- lightbox ------------------------------ */

const GV_Lightbox = {
  items: [],
  index: 0,

  init() {
    const box = document.getElementById("lightbox");
    if (!box) return;
    box.addEventListener("click", (event) => {
      if (event.target.closest("[data-lightbox-close]")) GV_Lightbox.close();
      else if (event.target.closest("[data-lightbox-next]")) GV_Lightbox.step(1);
      else if (event.target.closest("[data-lightbox-prev]")) GV_Lightbox.step(-1);
      else if (event.target === box) GV_Lightbox.close();
    });
    document.addEventListener("keydown", (event) => {
      if (!box.classList.contains("is-open")) return;
      if (event.key === "Escape") GV_Lightbox.close();
      if (event.key === "ArrowRight") GV_Lightbox.step(1);
      if (event.key === "ArrowLeft") GV_Lightbox.step(-1);
    });
  },

  open(list, startAt = 0) {
    GV_Lightbox.items = Array.isArray(list) && list.length ? list : [];
    if (!GV_Lightbox.items.length) return;
    GV_Lightbox.index = Math.min(Math.max(startAt, 0), GV_Lightbox.items.length - 1);
    const box = document.getElementById("lightbox");
    if (!box) return;
    box.hidden = false;
    box.classList.add("is-open");
    document.body.classList.add("no-scroll");
    GV_Lightbox.render();
  },

  render() {
    const box = document.getElementById("lightbox");
    if (!box) return;
    const item = GV_Lightbox.items[GV_Lightbox.index];
    if (!item) return;
    const img = box.querySelector(".lightbox__img");
    const caption = box.querySelector(".lightbox__caption");
    const counter = box.querySelector(".lightbox__counter");
    img.src = item.image;
    img.alt = item.alt || item.title || "";
    caption.textContent = item.title ? `${item.title} — ${item.caption || ""}` : item.caption || "";
    if (counter) {
      counter.textContent = `${GV_Lightbox.index + 1} / ${GV_Lightbox.items.length}`;
    }
    const single = GV_Lightbox.items.length < 2;
    box.querySelectorAll("[data-lightbox-next], [data-lightbox-prev]").forEach((btn) => {
      btn.disabled = single;
    });
  },

  step(direction) {
    if (GV_Lightbox.items.length < 2) return;
    const total = GV_Lightbox.items.length;
    GV_Lightbox.index = (GV_Lightbox.index + direction + total) % total;
    GV_Lightbox.render();
  },

  close() {
    const box = document.getElementById("lightbox");
    if (!box) return;
    box.classList.remove("is-open");
    box.hidden = true;
    if (!GV_Modal.openStack.length) document.body.classList.remove("no-scroll");
  }
};
