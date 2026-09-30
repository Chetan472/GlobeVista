/* ==========================================================================
   GlobeVista — persistence layer
   There is no backend in this project, so localStorage is the source of
   truth. Every value is namespaced under "gv:" so nothing can collide with
   keys the original site already used.
   ========================================================================== */
"use strict";

const GV_KEY = {
  theme: "gv:theme",
  users: "gv:users",
  session: "gv:session",
  bookings: "gv:bookings",
  reviews: "gv:reviews",
  favorites: "gv:favorites",
  messages: "gv:messages"
};

function gvRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (err) {
    console.warn("GlobeVista: could not read", key, err);
    return fallback;
  }
}

function gvWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn("GlobeVista: could not write", key, err);
    return false;
  }
}

/* Falls back to a non-crypto hash when crypto.subtle is unavailable so the
   demo never throws — this is a front-end only project, no real secrets. */
async function gvHash(text) {
  const salt = "globevista::";
  if (window.crypto && window.crypto.subtle && window.TextEncoder) {
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + text));
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch (err) {
      console.warn("GlobeVista: SHA-256 unavailable, using fallback hash.", err);
    }
  }
  let h1 = 0x811c9dc5;
  const input = salt + text;
  for (let i = 0; i < input.length; i += 1) {
    h1 ^= input.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193) >>> 0;
  }
  return "fb" + h1.toString(16);
}

function gvUid(prefix) {
  const stamp = Date.now().toString(36).slice(-5).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}${rand}`;
}

function gvTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------------- theme -------------------------------- */

const GV_THEME = {
  get() {
    const saved = gvRead(GV_KEY.theme, null);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },
  set(theme) {
    gvWrite(GV_KEY.theme, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
};

/* -------------------------------- users -------------------------------- */

function gvUsers() {
  return gvRead(GV_KEY.users, []);
}

function gvFindUser(email) {
  const needle = String(email || "").trim().toLowerCase();
  return gvUsers().find((u) => u.email === needle) || null;
}

const GV_AUTH = {
  async signup({ name, email, password }) {
    const clean = String(email).trim().toLowerCase();
    if (gvFindUser(clean)) throw new Error("An account with that email already exists.");
    const user = {
      id: gvUid("U"),
      name: String(name).trim(),
      email: clean,
      phone: "",
      passwordHash: await gvHash(password),
      createdAt: new Date().toISOString()
    };
    const users = gvUsers();
    users.push(user);
    gvWrite(GV_KEY.users, users);
    GV_AUTH.startSession(user.email);
    return user;
  },

  async login({ email, password }) {
    const user = gvFindUser(email);
    if (!user) throw new Error("No account found for that email.");
    const hash = await gvHash(password);
    if (hash !== user.passwordHash) throw new Error("Incorrect password. Please try again.");
    GV_AUTH.startSession(user.email);
    return user;
  },

  startSession(email) {
    gvWrite(GV_KEY.session, email);
    window.dispatchEvent(new CustomEvent("gv:auth-change"));
  },

  logout() {
    gvWrite(GV_KEY.session, null);
    window.dispatchEvent(new CustomEvent("gv:auth-change"));
  },

  currentUser() {
    const email = gvRead(GV_KEY.session, null);
    return email ? gvFindUser(email) : null;
  },

  /* Demo password reset: no mail transport exists, so the new password is
     simply set here and the UI says so plainly. */
  async resetPassword(email, password) {
    const user = gvFindUser(email);
    if (!user) throw new Error("No account found for that email.");
    const users = gvUsers();
    const idx = users.findIndex((u) => u.email === user.email);
    users[idx].passwordHash = await gvHash(password);
    gvWrite(GV_KEY.users, users);
    return users[idx];
  },

  updateProfile(patch) {
    const current = GV_AUTH.currentUser();
    if (!current) return null;
    const users = gvUsers();
    const idx = users.findIndex((u) => u.email === current.email);
    users[idx] = { ...users[idx], ...patch, email: current.email };
    gvWrite(GV_KEY.users, users);
    window.dispatchEvent(new CustomEvent("gv:auth-change"));
    return users[idx];
  }
};

/* ------------------------------ bookings ------------------------------ */

const GV_BOOKINGS = {
  all() {
    return gvRead(GV_KEY.bookings, []);
  },
  save(list) {
    gvWrite(GV_KEY.bookings, list);
    window.dispatchEvent(new CustomEvent("gv:bookings-change"));
  },
  create(data) {
    const booking = {
      ...data,
      id: gvUid("GV"),
      status: "confirmed",
      createdAt: new Date().toISOString()
    };
    const list = GV_BOOKINGS.all();
    list.unshift(booking);
    GV_BOOKINGS.save(list);
    return booking;
  },
  get(id) {
    return GV_BOOKINGS.all().find((b) => b.id === id) || null;
  },
  cancel(id) {
    const list = GV_BOOKINGS.all();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    list[idx].status = "cancelled";
    list[idx].cancelledAt = new Date().toISOString();
    GV_BOOKINGS.save(list);
    return list[idx];
  },
  /* Trips belonging to the signed-in account (matched on email). */
  forUser(email) {
    if (!email) return [];
    const needle = String(email).toLowerCase();
    return GV_BOOKINGS.all().filter((b) => String(b.email).toLowerCase() === needle);
  },
  upcoming(email) {
    const today = gvTodayISO();
    return GV_BOOKINGS.forUser(email)
      .filter((b) => b.status === "confirmed" && b.checkOut >= today)
      .sort((a, b) => a.checkIn.localeCompare(b.checkIn));
  },
  past(email) {
    const today = gvTodayISO();
    return GV_BOOKINGS.forUser(email)
      .filter((b) => b.status === "confirmed" && b.checkOut < today)
      .sort((a, b) => b.checkIn.localeCompare(a.checkIn));
  },
  history(email) {
    return GV_BOOKINGS.forUser(email).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  hasTripFor(email, destination) {
    return GV_BOOKINGS.forUser(email).some(
      (b) => b.status === "confirmed" && b.destination === destination
    );
  }
};

/* ------------------------------ favourites ---------------------------- */
/* Guests keep favourites too; they live under the "guest" bucket and are
   merged into the account the moment someone signs in. */

const GV_FAVORITES = {
  bucket(email) {
    return email ? `user:${String(email).toLowerCase()}` : "guest";
  },
  read(email) {
    return gvRead(GV_KEY.favorites, {});
  },
  list(email) {
    const all = gvRead(GV_KEY.favorites, {});
    const guest = all.guest || [];
    if (!email) return guest;
    const own = all[`user:${String(email).toLowerCase()}`] || [];
    return Array.from(new Set([...own, ...guest]));
  },
  has(email, id) {
    return GV_FAVORITES.list(email).includes(id);
  },
  toggle(email, id) {
    const all = gvRead(GV_KEY.favorites, {});
    const key = GV_FAVORITES.bucket(email);
    const current = all[key] || [];
    const exists = current.includes(id);
    all[key] = exists ? current.filter((x) => x !== id) : [...current, id];
    gvWrite(GV_KEY.favorites, all);
    window.dispatchEvent(new CustomEvent("gv:favorites-change"));
    return !exists;
  },
  /* Signed out favourites move across on sign-in so nothing is "lost". */
  mergeGuestInto(email) {
    const all = gvRead(GV_KEY.favorites, {});
    const guest = all.guest || [];
    if (!guest.length || !email) return;
    const key = `user:${String(email).toLowerCase()}`;
    all[key] = Array.from(new Set([...(all[key] || []), ...guest]));
    all.guest = [];
    gvWrite(GV_KEY.favorites, all);
  }
};

/* ------------------------------- reviews ------------------------------ */

const GV_REVIEWS = {
  all() {
    const userReviews = gvRead(GV_KEY.reviews, []);
    return [...userReviews, ...GV_SEED_REVIEWS];
  },
  add(review) {
    const list = gvRead(GV_KEY.reviews, []);
    const entry = {
      ...review,
      id: gvUid("R"),
      date: gvTodayISO(),
      createdAt: new Date().toISOString()
    };
    list.unshift(entry);
    gvWrite(GV_KEY.reviews, list);
    window.dispatchEvent(new CustomEvent("gv:reviews-change"));
    return entry;
  },
  byAuthor(email) {
    return gvRead(GV_KEY.reviews, []).filter((r) => r.email === email);
  }
};

/* ------------------------------ enquiries ----------------------------- */

const GV_MESSAGES = {
  add(message) {
    const list = gvRead(GV_KEY.messages, []);
    list.unshift({ ...message, id: gvUid("M"), createdAt: new Date().toISOString() });
    gvWrite(GV_KEY.messages, list.slice(0, 50));
    return list[0];
  },
  count() {
    return gvRead(GV_KEY.messages, []).length;
  }
};
