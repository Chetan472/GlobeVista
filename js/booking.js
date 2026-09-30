/* ==========================================================================
   GlobeVista — booking flow: quote, traveller form, mock payment, ticket
   Payment is simulated. No gateway is contacted and no money moves.
   ========================================================================== */
"use strict";

const GV_ROOMS = [
  { id: "standard", label: "Standard room", multiplier: 1 },
  { id: "deluxe", label: "Deluxe room (+12%)", multiplier: 1.12 },
  { id: "suite", label: "Suite / villa (+25%)", multiplier: 1.25 }
];

const GV_PAYMENTS = [
  { id: "card", label: "Card", icon: "💳", hint: "Demo only — no card number is collected" },
  { id: "upi", label: "UPI", icon: "📱", hint: "Demo only — no VPA is collected" },
  { id: "netbanking", label: "Net banking", icon: "🏦", hint: "Demo only — no login needed" },
  { id: "office", label: "Pay at office", icon: "🧾", hint: "We hold the dates for 48 hours" }
];

/* Promo codes come from the offer cards, plus one open discount. */
const GV_OPEN_PROMO = { code: "GV10", percent: 10 };

function gvPromoFor(rawCode, pkg) {
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return { code: "", percent: 0, valid: false, message: "" };

  if (code === GV_OPEN_PROMO.code) {
    return { code, percent: GV_OPEN_PROMO.percent, valid: true, message: "10% any-package code applied" };
  }
  const offer = GV_OFFERS.find((o) => o.code.toUpperCase() === code);
  if (!offer) return { code, percent: 0, valid: false, message: `“${code}” is not a valid code.` };
  if (offer.packageId && offer.packageId !== pkg.id) {
    const target = GV_PACKAGES.find((p) => p.id === offer.packageId);
    return {
      code,
      percent: 0,
      valid: false,
      message: `${code} applies to ${target ? target.title : "a different package"} only.`
    };
  }
  return { code, percent: offer.discount, valid: true, message: `${offer.title} applied` };
}

function gvQuote(pkg, values) {
  const travellers = Math.min(12, Math.max(1, Number(values.travellers) || 1));
  const room = GV_ROOMS.find((r) => r.id === values.room) || GV_ROOMS[0];
  const perPerson = Math.round(pkg.price * room.multiplier);
  const subtotal = perPerson * travellers;
  const promo = gvPromoFor(values.promo, pkg);
  const discount = promo.valid ? Math.round((subtotal * promo.percent) / 100) : 0;
  const tax = Math.round((subtotal - discount) * 0.05);
  const listValue = Math.round(pkg.oldPrice * room.multiplier * travellers);
  return {
    travellers,
    room,
    perPerson,
    subtotal,
    promo,
    discount,
    tax,
    total: subtotal - discount + tax,
    savings: Math.max(0, listValue - subtotal) + discount
  };
}

/* ------------------------------- form markup --------------------------- */

function gvBookingSummary(pkg, dest) {
  return `
  <aside class="booking__summary">
    <img src="${pkg.image}" alt="${GV_Util.escape(pkg.title)}" />
    <h4>${GV_Util.escape(pkg.title)}</h4>
    <p>${GV_Util.escape(dest.name)} · ${GV_Util.plural(pkg.days, "day", "days")} / ${GV_Util.plural(pkg.nights, "night", "nights")}</p>
    <p class="booking__rate"><span aria-hidden="true">★</span> ${pkg.rating.toFixed(1)} · ${GV_Money.inr(pkg.price)} per person</p>
    <ul class="booking__included">
      ${pkg.services.map((s) => `<li>✓ ${GV_Util.escape(s)}</li>`).join("")}
    </ul>
    <p class="booking__note">Free date change up to 21 days before departure.</p>
  </aside>`;
}

function gvBookingTravellers(user, opts) {
  const roomOptions = GV_ROOMS.map(
    (r) => `<option value="${r.id}"${r.id === "standard" ? " selected" : ""}>${GV_Util.escape(r.label)}</option>`
  ).join("");

  return `
      <fieldset>
        <legend>Who is travelling</legend>
        <div class="grid-2">
          <p class="field">
            <label for="book-name">Lead traveller name *</label>
            <input id="book-name" name="name" type="text" autocomplete="name"
                   value="${GV_Util.escape(user ? user.name : "")}" placeholder="Full name as on ID" />
          </p>
          <p class="field">
            <label for="book-phone">Phone *</label>
            <input id="book-phone" name="phone" type="tel" autocomplete="tel"
                   value="${GV_Util.escape(user && user.phone ? user.phone : "")}" placeholder="+91 98765 43210" />
          </p>
        </div>
        <p class="field">
          <label for="book-email">Email for the ticket *</label>
          <input id="book-email" name="email" type="email" autocomplete="email"
                 value="${GV_Util.escape(user ? user.email : "")}" placeholder="you@example.com" />
        </p>
        <div class="grid-3">
          <p class="field">
            <label for="book-in">Check-in date *</label>
            <input id="book-in" name="checkIn" type="date" min="${gvTodayISO()}"
                   value="${GV_Util.escape(opts.checkIn || "")}" />
          </p>
          <p class="field">
            <label for="book-travellers">Travellers *</label>
            <input id="book-travellers" name="travellers" type="number" min="1" max="12" step="1" value="2" />
          </p>
          <p class="field">
            <label for="book-room">Room class</label>
            <select id="book-room" name="room">${roomOptions}</select>
          </p>
        </div>
      </fieldset>`;
}

function gvBookingPayment() {
  const payMethods = GV_PAYMENTS.map(
    (p, i) => `
    <label class="pay">
      <input type="radio" name="payment" value="${p.id}"${i === 0 ? " checked" : ""} />
      <span class="pay__box">
        <span class="pay__icon" aria-hidden="true">${p.icon}</span>
        <strong>${GV_Util.escape(p.label)}</strong>
        <small>${GV_Util.escape(p.hint)}</small>
      </span>
    </label>`
  ).join("");

  return `
      <fieldset>
        <legend>Offer code and payment</legend>
        <p class="field">
          <label for="book-promo">Offer code (optional)</label>
          <input id="book-promo" name="promo" type="text" placeholder="${GV_OFFERS[0].code} or ${GV_OPEN_PROMO.code}" />
          <span class="field__hint" id="promo-hint">${GV_OFFERS[0].code} works on matching packages, ${GV_OPEN_PROMO.code} works anywhere.</span>
        </p>
        <div class="pay-grid" role="group" aria-label="Payment method">${payMethods}</div>
        <p class="field">
          <label for="book-notes">Anything we should know? (optional)</label>
          <textarea id="book-notes" name="notes" rows="2" placeholder="Birthdays, dietary needs, early check-in…"></textarea>
        </p>
      </fieldset>`;
}

function gvBookingPriceBlock() {
  return `
      <fieldset class="booking__price">
        <legend>Price breakdown</legend>
        <p><span>Per person</span><span data-quote="perValue">—</span></p>
        <p><span data-quote="subtotalLabel">Subtotal</span><span data-quote="subtotal">—</span></p>
        <p class="booking__discount"><span>Offer discount</span><span data-quote="discount">—</span></p>
        <p><span>GST (5%)</span><span data-quote="tax">—</span></p>
        <p class="booking__total"><span>Payable now</span><span data-quote="total">—</span></p>
        <p class="booking__savings"><span data-quote="savings"></span></p>
      </fieldset>

      <p class="field field--check">
        <input id="book-terms" name="terms" type="checkbox" />
        <label for="book-terms">I agree to the booking terms and understand the payment here is simulated.</label>
      </p>

      <p class="form-status" role="alert" aria-live="assertive"></p>

      <div class="booking__actions">
        <button class="btn btn--ghost" type="button" data-modal-close="booking-modal">Cancel</button>
        <button class="btn btn--primary" id="book-submit" type="submit">Confirm booking</button>
      </div>`;
}

function gvBookingMarkup(pkg, dest, user, opts) {
  return `
  <form id="booking-form" class="booking" novalidate data-package="${pkg.id}">
    ${gvBookingSummary(pkg, dest)}
    <div class="booking__fields">
      ${gvBookingTravellers(user, opts)}
      ${gvBookingPayment()}
      ${gvBookingPriceBlock()}
    </div>
  </form>`;
}

/* ------------------------------ live pricing --------------------------- */

function gvAddDays(iso, days) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + Number(days));
  return d.toISOString().slice(0, 10);
}

function gvBookingValues(form) {
  return {
    travellers: form.elements.travellers.value,
    room: form.elements.room.value,
    promo: form.elements.promo.value
  };
}

function gvRenderQuote(pkg) {
  const form = document.getElementById("booking-form");
  if (!form) return null;
  const quote = gvQuote(pkg, gvBookingValues(form));

  const put = (key, text) => {
    const el = form.querySelector(`[data-quote="${key}"]`);
    if (el) el.textContent = text;
  };
  put("perValue", GV_Money.inr(quote.perPerson));
  put("subtotalLabel", `Subtotal · ${GV_Util.plural(quote.travellers, "traveller", "travellers")}`);
  put("subtotal", GV_Money.inr(quote.subtotal));
  put("discount", quote.discount ? `− ${GV_Money.inr(quote.discount)}` : "—");
  put("tax", GV_Money.inr(quote.tax));
  put("total", GV_Money.inr(quote.total));
  put("savings", quote.savings ? `You save ${GV_Money.inr(quote.savings)} on this package` : "");

  const hint = document.getElementById("promo-hint");
  if (hint) {
    const code = quote.promo.code;
    hint.textContent = code
      ? quote.promo.valid
        ? `✓ ${quote.promo.message}`
        : `✕ ${quote.promo.message}`
      : `${GV_OFFERS[0].code} works on matching packages, ${GV_OPEN_PROMO.code} works anywhere.`;
    hint.classList.toggle("is-ok", quote.promo.valid);
    hint.classList.toggle("is-bad", Boolean(code) && !quote.promo.valid);
  }

  const submit = document.getElementById("book-submit");
  if (submit && !submit.disabled) submit.textContent = `Pay ${GV_Money.inr(quote.total)} & confirm`;
  return quote;
}

/* -------------------------------- ticket ------------------------------- */

/* Decorative code block — clearly not a scannable QR code. */
function gvFakeCode(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (Math.imul(h, 31) + seed.charCodeAt(i)) >>> 0;
  const cells = [];
  for (let i = 0; i < 64; i += 1) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    cells.push(`<i class="${(h >>> 16) % 2 ? "on" : ""}"></i>`);
  }
  return `<div class="ticket__code" aria-hidden="true">${cells.join("")}</div>`;
}

function gvTicketMarkup(booking) {
  const pkg = GV_PACKAGES.find((p) => p.id === booking.packageId) || {};
  const pay = GV_PAYMENTS.find((p) => p.id === booking.paymentMethod) || { label: "—", icon: "" };

  return `
  <div class="ticket">
    <header class="ticket__top">
      <span class="ticket__brand">🌍 GlobeVista</span>
      <span class="ticket__status ticket__status--${booking.status}">${GV_Util.escape(booking.status)}</span>
    </header>
    <div class="ticket__body">
      <div class="ticket__hero">
        <img src="${pkg.image || ""}" alt="" />
        <div>
          <h4>${GV_Util.escape(booking.packageTitle)}</h4>
          <p>${GV_Util.escape(booking.destination)} · ${GV_Util.plural(booking.days, "day", "days")} / ${GV_Util.plural(booking.nights, "night", "nights")}</p>
        </div>
      </div>
      <dl class="ticket__grid">
        <div><dt>Booking ID</dt><dd><strong>${GV_Util.escape(booking.id)}</strong></dd></div>
        <div><dt>Lead traveller</dt><dd>${GV_Util.escape(booking.contactName)}</dd></div>
        <div><dt>Check-in</dt><dd>${GV_Util.escape(GV_Date.pretty(booking.checkIn))}</dd></div>
        <div><dt>Check-out</dt><dd>${GV_Util.escape(GV_Date.pretty(booking.checkOut))}</dd></div>
        <div><dt>Travellers</dt><dd>${GV_Util.plural(booking.travellers, "person", "people")}</dd></div>
        <div><dt>Room</dt><dd>${GV_Util.escape(booking.roomLabel)}</dd></div>
        <div><dt>Phone</dt><dd>${GV_Util.escape(booking.contactPhone || "—")}</dd></div>
        <div><dt>Ticket email</dt><dd>${GV_Util.escape(booking.contactEmail)}</dd></div>
        <div><dt>Payment</dt><dd>${pay.icon} ${GV_Util.escape(pay.label)} · ${GV_Util.escape(booking.paymentRef)}</dd></div>
        <div><dt>Booked on</dt><dd>${GV_Util.escape(GV_Date.pretty(booking.createdAt.slice(0, 10)))}</dd></div>
      </dl>
      <p class="ticket__amount">Paid ${GV_Money.inr(booking.total)}
        <small>incl. ${GV_Money.inr(booking.tax)} GST${booking.discount ? ` · ${GV_Money.inr(booking.discount)} off with ${GV_Util.escape(booking.promoCode)}` : ""}</small>
      </p>
      ${booking.notes ? `<p class="ticket__notes">Note: ${GV_Util.escape(booking.notes)}</p>` : ""}
    </div>
    <footer class="ticket__stub">
      ${gvFakeCode(booking.id)}
      <div>
        <p><strong>Show this booking ID at the transfer desk.</strong></p>
        <p class="ticket__disclaimer">Simulated ticket from a front-end demo — it is not a real travel document.</p>
      </div>
    </footer>
    <div class="ticket__actions">
      <button class="btn btn--ghost btn--sm" type="button" data-print-ticket="${booking.id}">🖨 Print</button>
      <button class="btn btn--ghost btn--sm" type="button" data-ics-ticket="${booking.id}">📅 Add to calendar</button>
      <button class="btn btn--primary btn--sm" type="button" data-view-trips>View my trips</button>
    </div>
  </div>`;
}

function gvShowTicket(booking) {
  const body = document.getElementById("booking-body");
  if (!body) return;
  body.innerHTML = gvTicketMarkup(booking);
  const title = document.getElementById("booking-title");
  if (title) title.textContent = "Booking confirmed 🎉";
  const subtitle = document.getElementById("booking-subtitle");
  if (subtitle) {
    subtitle.textContent = `Booking ${booking.id} is saved in this browser. Print or download it below.`;
  }
}

/* -------------------------- print & calendar --------------------------- */

function gvPrintTicket(id) {
  const booking = GV_BOOKINGS.get(id);
  if (!booking) return;
  let area = document.getElementById("print-area");
  if (!area) {
    area = document.createElement("div");
    area.id = "print-area";
    document.body.appendChild(area);
  }
  area.innerHTML = gvTicketMarkup(booking);
  const cleanup = () => {
    area.innerHTML = "";
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  window.print();
  setTimeout(cleanup, 2000);
}

function gvDownloadIcs(id) {
  const booking = GV_BOOKINGS.get(id);
  if (!booking) return;
  const stamp = (iso) => String(iso || "").replace(/-/g, "");
  const end = gvAddDays(booking.checkIn, booking.nights + 1);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GlobeVista//Booking Demo//EN",
    "BEGIN:VEVENT",
    `UID:${booking.id}@globevista.test`,
    `DTSTAMP:${stamp(booking.createdAt.slice(0, 10))}T090000Z`,
    `DTSTART;VALUE=DATE:${stamp(booking.checkIn)}`,
    `DTEND;VALUE=DATE:${stamp(end)}`,
    `SUMMARY:GlobeVista trip to ${booking.destination} (${booking.id})`,
    `DESCRIPTION:Lead traveller ${booking.contactName}. ${booking.travellers} traveller(s). Paid ${booking.total} INR.`,
    `LOCATION:${booking.destination}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `GlobeVista-${booking.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  GV_Toast.show("Calendar file downloaded");
}

/* ------------------------------ submit flow ---------------------------- */

async function gvSubmitBooking(form, pkg, dest) {
  const schema = [
    { name: "name", rules: ["required", "name"] },
    { name: "email", rules: ["required", "email"] },
    { name: "phone", rules: ["required", "phone"] },
    { name: "checkIn", rules: ["required", "futureDate"] },
    {
      name: "travellers",
      rules: ["required", (value) => {
        const n = Number(value);
        return n >= 1 && n <= 12 ? "" : "Between 1 and 12 travellers per booking.";
      }]
    }
  ];
  const validForm = gvValidateForm(form, schema);
  if (!validForm) {
    gvFormStatus(form, "Please fix the highlighted fields.");
    return;
  }
  if (!form.elements.terms.checked) {
    gvFormStatus(form, "Please accept the booking terms to continue.");
    form.elements.terms.focus();
    return;
  }

  const quote = gvQuote(pkg, gvBookingValues(form));
  if (quote.promo.code && !quote.promo.valid) {
    gvFormStatus(form, quote.promo.message);
    form.elements.promo.focus();
    return;
  }

  const submit = document.getElementById("book-submit");
  submit.disabled = true;
  submit.classList.add("is-busy");
  submit.textContent = "Processing simulated payment…";
  gvFormStatus(form, "", "success");

  /* Mock payment: a real project would call a gateway here. */
  await new Promise((resolve) => setTimeout(resolve, 900));

  const checkIn = gvFieldValue(form, "checkIn");
  const user = GV_AUTH.currentUser();
  const booking = GV_BOOKINGS.create({
    email: user.email,
    packageId: pkg.id,
    packageTitle: pkg.title,
    destinationId: dest.id,
    destination: dest.name,
    days: pkg.days,
    nights: pkg.nights,
    checkIn,
    checkOut: gvAddDays(checkIn, pkg.nights),
    travellers: quote.travellers,
    roomId: quote.room.id,
    roomLabel: quote.room.label,
    perPerson: quote.perPerson,
    subtotal: quote.subtotal,
    discount: quote.discount,
    promoCode: quote.promo.valid ? quote.promo.code : "",
    tax: quote.tax,
    total: quote.total,
    contactName: gvFieldValue(form, "name"),
    contactEmail: gvFieldValue(form, "email"),
    contactPhone: gvFieldValue(form, "phone"),
    notes: gvFieldValue(form, "notes"),
    paymentMethod: form.elements.payment.value,
    paymentRef: gvUid("PAY")
  });

  submit.disabled = false;
  submit.classList.remove("is-busy");
  submit.textContent = "Confirm booking";
  gvShowTicket(booking);
  GV_Toast.show(`Booking ${booking.id} confirmed`);
  if (typeof gvRenderDashboard === "function") gvRenderDashboard();
  if (typeof gvRenderAuthArea === "function") gvRenderAuthArea();
}

/* ------------------------------ open / wire ---------------------------- */

function gvBookingTitleReset() {
  const title = document.getElementById("booking-title");
  if (title) title.textContent = "Complete your booking";
  const subtitle = document.getElementById("booking-subtitle");
  if (subtitle) {
    subtitle.textContent = "Two minutes, no card needed. Payment on this demo is simulated.";
  }
}

function gvOpenBooking(packageId, opts = {}) {
  if (!gvRequireAuth("Please sign in before booking — it takes 20 seconds.")) return;

  const pkg =
    GV_PACKAGES.find((p) => p.id === packageId) ||
    (opts.destinationId ? GV_View.packageForDestination(opts.destinationId) : null);
  if (!pkg) {
    GV_Toast.show("That package is not available right now.", "error");
    return;
  }
  const dest = GV_DESTINATIONS.find((d) => d.id === pkg.destinationId);
  const body = document.getElementById("booking-body");
  if (!body) return;

  const user = GV_AUTH.currentUser();
  body.innerHTML = gvBookingMarkup(pkg, dest, user, opts);
  gvBookingTitleReset();

  const form = document.getElementById("booking-form");
  form.addEventListener("input", () => gvRenderQuote(pkg));
  form.addEventListener("change", () => gvRenderQuote(pkg));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    gvSubmitBooking(form, pkg, dest);
  });

  const quote = gvRenderQuote(pkg);
  GV_Modal.open("booking-modal", {
    onOpen: () => {
      const target = form.elements.name.value.trim() ? form.elements.checkIn : form.elements.name;
      if (target) target.focus();
      if (opts.checkIn && quote) GV_Toast.show("Departure date taken from your search", "info");
    }
  });
}

function gvInitBooking() {
  document.addEventListener("click", (event) => {
    const byPackage = event.target.closest("[data-book-package]");
    if (byPackage) {
      GV_Modal.close("detail-modal");
      gvOpenBooking(byPackage.getAttribute("data-book-package"));
      return;
    }
    const byDestination = event.target.closest("[data-book-destination]");
    if (byDestination) {
      const id = byDestination.getAttribute("data-book-destination");
      GV_Modal.close("detail-modal");
      gvOpenBooking(null, { destinationId: id });
      return;
    }
    if (event.target.closest("[data-print-ticket]")) {
      gvPrintTicket(event.target.closest("[data-print-ticket]").getAttribute("data-print-ticket"));
      return;
    }
    if (event.target.closest("[data-ics-ticket]")) {
      gvDownloadIcs(event.target.closest("[data-ics-ticket]").getAttribute("data-ics-ticket"));
      return;
    }
    if (event.target.closest("[data-view-trips]")) {
      GV_Modal.close("booking-modal");
      window.location.hash = "#/dashboard/trips";
    }
  });
}
