/* ==========================================================================
   GlobeVista — authentication (sign up, login, session, profile)
   Accounts live in localStorage only; passwords are stored as salted
   SHA-256 digests. There is no server in this project.
   ========================================================================== */
"use strict";

/* ------------------------------ validation ----------------------------- */

const GV_Validate = {
  required: (v) => (String(v).trim() ? "" : "This field is required."),
  name: (v) => (String(v).trim().length >= 2 ? "" : "Please enter at least 2 characters."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v).trim()) ? "" : "Enter a valid email address."),
  phone: (v) =>
    !String(v).trim() || /^[+]?[\d\s-]{8,15}$/.test(String(v).trim())
      ? ""
      : "Enter a valid phone number (8–15 digits).",
  password: (v) => (String(v).length >= 6 ? "" : "Use at least 6 characters."),
  emailOptional: (v) =>
    !String(v).trim() || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v).trim())
      ? ""
      : "Enter a valid email address.",
  matches: (value, other) => (String(value) === String(other) ? "" : "The two entries do not match."),
  futureDate: (v) => (String(v) && v >= gvTodayISO() ? "" : "Choose today or a future date.")
};

function gvFieldError(input, message) {
  const field = input.closest(".field") || input.parentElement;
  if (!field) return;
  let slot = field.querySelector(".field__error");
  if (!slot) {
    slot = document.createElement("p");
    slot.className = "field__error";
    slot.id = `${input.id}-error`;
    field.appendChild(slot);
    input.setAttribute("aria-describedby", slot.id);
  }
  slot.textContent = message || "";
  input.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

/* schema: [{ id, label, rules: [messages or functions] }] */
function gvValidateField(input, rules = []) {
  let message = "";
  for (const rule of rules) {
    if (typeof rule === "function") {
      message = rule(input.value);
    } else if (GV_Validate[rule]) {
      message = GV_Validate[rule](input.value);
    }
    if (message) break;
  }
  gvFieldError(input, message);
  return !message;
}

function gvValidateForm(form, schema) {
  let ok = true;
  let firstBad = null;
  schema.forEach((entry) => {
    const input = form.elements[entry.name];
    if (!input) return;
    const rules = entry.rules || [];
    const valid = gvValidateField(input, rules.map((r) => (typeof r === "string" ? GV_Validate[r] : r)).filter(Boolean));
    if (!valid && !firstBad) firstBad = input;
    if (!valid) ok = false;
  });
  if (firstBad) firstBad.focus();
  return ok;
}

function gvFormStatus(form, message, type = "error") {
  const slot = form.querySelector(".form-status");
  if (!slot) return;
  slot.textContent = message || "";
  slot.className = `form-status${message ? ` is-${type}` : ""}`;
}

function gvFieldValue(form, name) {
  const el = form.elements[name];
  return el ? String(el.value).trim() : "";
}

/* -------------------------------- tabs --------------------------------- */

function gvShowAuthTab(tab) {
  const panels = {
    login: "login-panel",
    signup: "signup-panel",
    forgot: "forgot-panel"
  };
  Object.entries(panels).forEach(([key, id]) => {
    const panel = document.getElementById(id);
    if (panel) panel.hidden = key !== tab;
  });
  document.querySelectorAll("[data-auth-tab]").forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.getAttribute("data-auth-tab") === tab));
  });
  const title = document.getElementById("auth-title");
  if (title) {
    title.textContent =
      tab === "signup" ? "Create your GlobeVista account" : tab === "forgot" ? "Reset your password" : "Welcome back to GlobeVista";
  }
  const subtitle = document.getElementById("auth-subtitle");
  if (subtitle) {
    subtitle.textContent =
      tab === "signup"
        ? "Save favourites, track bookings and get planner support."
        : tab === "forgot"
          ? "Set a new password for an existing account."
          : "Sign in to manage bookings, favourites and saved trips.";
  }
}

function gvOpenAuth(tab = "login") {
  GV_Modal.open("auth-modal", { onOpen: () => gvShowAuthTab(tab) });
}

/* Opens the auth modal when needed — used by booking and review actions. */
function gvRequireAuth(intent) {
  if (GV_AUTH.currentUser()) return true;
  GV_Toast.show(intent || "Please sign in to continue.", "info");
  gvOpenAuth("login");
  return false;
}

/* ------------------------------ nav account ---------------------------- */

function gvRenderAuthArea() {
  const area = document.getElementById("auth-area");
  if (!area) return;
  const user = GV_AUTH.currentUser();

  if (!user) {
    area.innerHTML = `
      <button class="btn btn--ghost btn--sm" type="button" data-auth-open="login">Login</button>
      <button class="btn btn--primary btn--sm" type="button" data-auth-open="signup">Sign Up</button>`;
    return;
  }

  const trips = GV_BOOKINGS.upcoming(user.email).length;
  area.innerHTML = `
    <div class="account">
      <button class="account__btn" type="button" id="account-toggle" aria-expanded="false"
              aria-controls="account-menu">
        <span class="account__avatar" aria-hidden="true">${GV_Util.escape(GV_Util.initials(user.name))}</span>
        <span class="account__name">${GV_Util.escape(user.name.split(" ")[0])}</span>
        ${trips ? `<span class="account__pill">${trips} trip${trips > 1 ? "s" : ""}</span>` : ""}
        <span class="account__caret" aria-hidden="true">▾</span>
      </button>
      <div class="account__menu" id="account-menu" hidden>
        <p class="account__email">${GV_Util.escape(user.email)}</p>
        <button type="button" data-view="profile">👤 My Profile</button>
        <button type="button" data-view="trips">✈️ My Trips</button>
        <button type="button" data-view="history">🧾 Booking History</button>
        <button type="button" data-view="favorites">❤️ Favorites</button>
        <button type="button" data-logout>↩︎ Logout</button>
      </div>
    </div>`;
}

function gvToggleAccountMenu(force) {
  const toggle = document.getElementById("account-toggle");
  const menu = document.getElementById("account-menu");
  if (!toggle || !menu) return;
  const open = typeof force === "boolean" ? force : menu.hidden;
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
}

function gvUpdateFavoriteCount() {
  const badge = document.getElementById("favorite-count");
  if (!badge) return;
  const count = GV_FAVORITES.list(GV_View.email()).length;
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

/* One-click account so the demo can be tried without filling the form. */
async function gvEnsureDemoAccount() {
  const email = "demo@globevista.test";
  const password = "demo1234";
  if (gvFindUser(email)) await GV_AUTH.login({ email, password });
  else await GV_AUTH.signup({ name: "Demo Traveller", email, password });
  GV_FAVORITES.mergeGuestInto(email);
  return GV_AUTH.currentUser();
}

/* -------------------------------- wiring ------------------------------- */

function gvInitAuth() {
  document.addEventListener("click", (event) => {
    const open = event.target.closest("[data-auth-open]");
    if (open) {
      gvOpenAuth(open.getAttribute("data-auth-open"));
      return;
    }
    const tab = event.target.closest("[data-auth-tab]");
    if (tab) {
      gvShowAuthTab(tab.getAttribute("data-auth-tab"));
      return;
    }
    if (event.target.closest("[data-demo-login]")) {
      gvEnsureDemoAccount()
        .then((user) => {
          GV_Modal.close("auth-modal");
          GV_Toast.show(`Signed in as ${user.name} (demo account)`);
        })
        .catch((err) => GV_Toast.show(err.message, "error"));
      return;
    }
    if (event.target.closest("[data-logout]")) {
      GV_AUTH.logout();
      gvToggleAccountMenu(false);
      GV_Toast.show("You are signed out. Favourites stay on this device.", "info");
      return;
    }
    if (event.target.closest("#account-toggle")) {
      gvToggleAccountMenu();
      return;
    }
    const view = event.target.closest("[data-view]");
    if (view) {
      gvToggleAccountMenu(false);
      window.location.hash = `#/dashboard/${view.getAttribute("data-view")}`;
      return;
    }
    if (!event.target.closest(".account")) gvToggleAccountMenu(false);
  });

  /* ------------------------------ sign up ----------------------------- */
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const schema = [
        { name: "name", rules: ["required", "name"] },
        { name: "email", rules: ["required", "email"] },
        { name: "phone", rules: ["phone"] },
        { name: "password", rules: ["required", "password"] },
        {
          name: "confirm",
          rules: [(value) => GV_Validate.matches(value, gvFieldValue(signupForm, "password"))]
        }
      ];
      if (!gvValidateForm(signupForm, schema)) {
        gvFormStatus(signupForm, "Please fix the highlighted fields.");
        return;
      }
      try {
        const user = await GV_AUTH.signup({
          name: gvFieldValue(signupForm, "name"),
          email: gvFieldValue(signupForm, "email"),
          password: signupForm.elements.password.value
        });
        GV_FAVORITES.mergeGuestInto(user.email);
        gvFormStatus(signupForm, "", "success");
        signupForm.reset();
        GV_Modal.close("auth-modal");
        GV_Toast.show(`Welcome to GlobeVista, ${user.name.split(" ")[0]}!`);
      } catch (err) {
        gvFormStatus(signupForm, err.message);
      }
    });
  }

  /* ------------------------------- login ------------------------------ */
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const schema = [
        { name: "email", rules: ["required", "email"] },
        { name: "password", rules: ["required", "password"] }
      ];
      if (!gvValidateForm(loginForm, schema)) {
        gvFormStatus(loginForm, "Please fix the highlighted fields.");
        return;
      }
      try {
        const user = await GV_AUTH.login({
          email: gvFieldValue(loginForm, "email"),
          password: loginForm.elements.password.value
        });
        GV_FAVORITES.mergeGuestInto(user.email);
        gvFormStatus(loginForm, "", "success");
        loginForm.reset();
        GV_Modal.close("auth-modal");
        GV_Toast.show(`Welcome back, ${user.name.split(" ")[0]}!`);
      } catch (err) {
        gvFormStatus(loginForm, err.message);
      }
    });
  }

  /* -------------------------- forgot password ------------------------- */
  const forgotForm = document.getElementById("forgot-form");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const schema = [
        { name: "email", rules: ["required", "email"] },
        { name: "password", rules: ["required", "password"] },
        {
          name: "confirm",
          rules: [(value) => GV_Validate.matches(value, gvFieldValue(forgotForm, "password"))]
        }
      ];
      if (!gvValidateForm(forgotForm, schema)) {
        gvFormStatus(forgotForm, "Please fix the highlighted fields.");
        return;
      }
      try {
        await GV_AUTH.resetPassword(
          gvFieldValue(forgotForm, "email"),
          forgotForm.elements.password.value
        );
        forgotForm.reset();
        gvShowAuthTab("login");
        GV_Toast.show("Password updated. You can sign in now.");
      } catch (err) {
        gvFormStatus(forgotForm, err.message);
      }
    });
  }

  /* --------------------------- profile form --------------------------- */
  /* The profile form lives inside the dashboard and is re-rendered often, so
     the handler is delegated from the document instead of the element. */
  document.addEventListener("submit", (event) => {
    const profileForm = event.target;
    if (!profileForm.id || profileForm.id !== "profile-form") return;
    event.preventDefault();
    if (!gvRequireAuth("Sign in to edit your profile.")) return;
    const schema = [
      { name: "name", rules: ["required", "name"] },
      { name: "phone", rules: ["phone"] },
      { name: "backupEmail", rules: ["emailOptional"] }
    ];
    if (!gvValidateForm(profileForm, schema)) {
      gvFormStatus(profileForm, "Please fix the highlighted fields.");
      return;
    }
    GV_AUTH.updateProfile({
      name: gvFieldValue(profileForm, "name"),
      phone: gvFieldValue(profileForm, "phone"),
      backupEmail: gvFieldValue(profileForm, "backupEmail")
    });
    gvFormStatus(profileForm, "Profile saved on this device.", "success");
    GV_Toast.show("Profile updated");
  });

  /* Clear a field error as soon as the traveller starts fixing it. */
  document.addEventListener("input", (event) => {
    const input = event.target;
    if (input.classList && input.classList.contains("is-invalid")) {
      gvFieldError(input, "");
      const form = input.closest("form");
      if (form) gvFormStatus(form, "", "success");
    }
  });

  window.addEventListener("gv:auth-change", () => {
    gvRenderAuthArea();
    gvUpdateFavoriteCount();
    if (typeof gvRenderDashboard === "function") gvRenderDashboard();
  });

  gvRenderAuthArea();
}
