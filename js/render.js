/* ==========================================================================
   GlobeVista — rendering: cards, search, filters, detail view
   ========================================================================== */
"use strict";

/* Everything below reads from js/data.js and writes into the containers
   declared in index.html. User input never reaches innerHTML without going
   through GV_Util.escape. */

const GV_View = {
  email() {
    const user = GV_AUTH.currentUser();
    return user ? user.email : "";
  },
  packageForDestination(id) {
    return GV_PACKAGES.find((p) => p.destinationId === id) || null;
  },
  destinationByName(name) {
    return GV_DESTINATIONS.find((d) => d.name === name) || null;
  },
  favoriteIcon(active) {
    return active ? "♥" : "♡";
  }
};

/* ------------------------------ destinations --------------------------- */

function gvSaleBadge(dest) {
  const pkg = GV_View.packageForDestination(dest.id);
  if (!pkg || !pkg.oldPrice) return "";
  const off = Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100);
  if (off <= 0) return "";
  return `<span class="chip chip--sale">Upto ${off}% off</span>`;
}

function gvDestinationCard(dest) {
  const email = GV_View.email();
  const isFav = GV_FAVORITES.has(email, dest.id);

  return `
  <article class="dest-card" data-destination="${dest.id}">
    <div class="dest-card__media">
      <img src="${dest.image}" alt="${GV_Util.escape(dest.name)}, ${GV_Util.escape(dest.country)}" loading="lazy" />
      <button class="fav-btn${isFav ? " is-active" : ""}" type="button"
              data-fav-toggle="${dest.id}" aria-pressed="${isFav}"
              aria-label="${isFav ? "Remove" : "Save"} ${GV_Util.escape(dest.name)} ${isFav ? "from" : "to"} favourites">
        <span aria-hidden="true">${GV_View.favoriteIcon(isFav)}</span>
      </button>
      <span class="dest-card__badge">${GV_Util.escape(dest.tag)}</span>
      <p class="dest-card__rating"><span aria-hidden="true">★</span> ${dest.rating.toFixed(1)}
        <small>(${dest.reviews})</small></p>
    </div>
    <div class="dest-card__body">
      <h3>${GV_Util.escape(dest.name)}</h3>
      <p class="dest-card__place">📍 ${GV_Util.escape(dest.country)}</p>
      <p class="dest-card__text">${GV_Util.escape(dest.shortDescription)}</p>
      <div class="dest-card__meta">
        <span class="chip chip--soft">🗓 ${GV_Util.plural(dest.duration, "day", "days")}</span>
        ${gvSaleBadge(dest)}
      </div>
      <p class="dest-card__text dest-card__time">Best time to visit: ${GV_Util.escape(dest.bestTime)}</p>
      <div class="dest-card__foot">
        <p class="price"><small>from</small> ${GV_Money.inr(dest.price)}<small>/person</small></p>
        <div class="dest-card__actions">
          <button class="btn btn--ghost btn--sm" type="button" data-explore="${dest.id}">Explore</button>
          <button class="btn btn--primary btn--sm" type="button" data-book-destination="${dest.id}">Book Now</button>
        </div>
      </div>
    </div>
  </article>`;
}

function gvRenderDestinations(list = GV_DESTINATIONS) {
  const grid = document.getElementById("destination-grid");
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <p class="empty-state__emoji" aria-hidden="true">🧭</p>
        <h3>No destination matches that search</h3>
        <p>Try a place name such as “Bali”, or a style like “beach”, “snow” or “honeymoon”.</p>
        <button class="btn btn--outline" type="button" data-reset-search>Clear search</button>
      </div>`;
  } else {
    grid.innerHTML = list.map(gvDestinationCard).join("");
  }

  const note = document.getElementById("destination-count");
  if (note) {
    note.textContent = GV_state.search
      ? `${GV_Util.plural(list.length, "match", "matches")} for “${GV_Util.escape(GV_state.search)}”`
      : `${GV_Util.plural(list.length, "destination", "destinations")} ready to book`;
  }
}

/* -------------------------------- packages ----------------------------- */

function gvPackageCard(pkg) {
  const saved = Math.max(0, pkg.oldPrice - pkg.price);
  const chips = pkg.categories
    .map((c) => `<span class="chip chip--soft">${GV_Util.escape(c)}</span>`)
    .join("");
  const services = pkg.services.slice(0, 4).map((s) => `<li>✓ ${GV_Util.escape(s)}</li>`).join("");

  return `
  <article class="pkg-card" data-package="${pkg.id}">
    <div class="pkg-card__media">
      <img src="${pkg.image}" alt="${GV_Util.escape(pkg.title)} tour package" loading="lazy" />
      <span class="pkg-card__save">Save ${GV_Money.inr(saved)}</span>
      <p class="pkg-card__rating"><span aria-hidden="true">★</span> ${pkg.rating.toFixed(1)}</p>
    </div>
    <div class="pkg-card__body">
      <div class="pkg-card__head">
        <h3>${GV_Util.escape(pkg.title)}</h3>
        <p class="pkg-card__dest">${GV_Util.escape(pkg.destination)} · ${GV_Util.plural(pkg.days, "day", "days")} / ${GV_Util.plural(pkg.nights, "night", "nights")}</p>
      </div>
      <p class="pkg-card__tag">${GV_Util.escape(pkg.tagline)}</p>
      <div class="pkg-card__chips">${chips}</div>
      <ul class="pkg-card__list">${services}</ul>
      <div class="pkg-card__foot">
        <p class="price">
          <span class="price__old">${GV_Money.inr(pkg.oldPrice)}</span>
          <span class="price__now">${GV_Money.inr(pkg.price)}</span>
          <small>/person</small>
        </p>
        <span class="pkg-card__off">${pkg.discount}% off</span>
      </div>
      <div class="pkg-card__actions">
        <button class="btn btn--ghost btn--sm" type="button" data-package-detail="${pkg.id}">View Details</button>
        <button class="btn btn--primary btn--sm" type="button" data-book-package="${pkg.id}">Book Now</button>
      </div>
    </div>
  </article>`;
}

/* Shared UI state for search + package filters. */
const GV_state = {
  search: "",
  category: "All",
  duration: "All",
  maxPrice: 0,
  sort: "popular"
};

function gvFilteredPackages() {
  let list = [...GV_PACKAGES];

  if (GV_state.category !== "All") {
    list = list.filter((p) => p.categories.includes(GV_state.category));
  }
  if (GV_state.duration === "short") list = list.filter((p) => p.days <= 4);
  else if (GV_state.duration === "medium") list = list.filter((p) => p.days >= 5 && p.days <= 6);
  else if (GV_state.duration === "long") list = list.filter((p) => p.days >= 7);

  if (GV_state.maxPrice) list = list.filter((p) => p.price <= GV_state.maxPrice);

  if (GV_state.search) {
    const q = GV_state.search.toLowerCase();
    list = list.filter((p) =>
      [p.title, p.destination, p.tagline, p.categories.join(" ")].join(" ").toLowerCase().includes(q)
    );
  }

  const sorters = {
    popular: (a, b) => b.rating - a.rating,
    "price-low": (a, b) => a.price - b.price,
    "price-high": (a, b) => b.price - a.price,
    longest: (a, b) => b.days - a.days,
    discount: (a, b) => b.discount - a.discount
  };
  return list.sort(sorters[GV_state.sort] || sorters.popular);
}

function gvRenderPackages() {
  const grid = document.getElementById("package-grid");
  if (!grid) return;
  const list = gvFilteredPackages();

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <p class="empty-state__emoji" aria-hidden="true">🧳</p>
        <h3>No package fits those filters</h3>
        <p>Raise the budget or pick a different trip style to see more options.</p>
        <button class="btn btn--outline" type="button" data-reset-filters>Reset filters</button>
      </div>`;
  } else {
    grid.innerHTML = list.map(gvPackageCard).join("");
  }

  const count = document.getElementById("package-count");
  if (count) {
    const lowest = list.length ? Math.min(...list.map((p) => p.price)) : 0;
    count.textContent = `${GV_Util.plural(list.length, "package", "packages")} · from ${GV_Money.inr(lowest)}`;
  }
  const sliderOut = document.getElementById("filter-price-value");
  if (sliderOut && GV_state.maxPrice) sliderOut.textContent = GV_Money.inr(GV_state.maxPrice);
}

/* Search matches destination name, country, region, style tags and keywords. */
function gvSearchDestinations(query) {
  const q = String(query || "").trim().toLowerCase();
  GV_state.search = q;
  if (!q) {
    gvRenderDestinations();
    return;
  }
  const found = GV_DESTINATIONS.filter((d) =>
    [d.name, d.country, d.region, d.tag, d.shortDescription, d.categories.join(" "), d.activities.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
  gvRenderDestinations(found);
}

function gvResetSearch() {
  const field = document.getElementById("search-destination");
  if (field) field.value = "";
  const date = document.getElementById("search-date");
  if (date) date.value = "";
  gvSearchDestinations("");
  gvRenderPackages();
}

function gvResetFilters() {
  GV_state.category = "All";
  GV_state.duration = "All";
  GV_state.sort = "popular";
  GV_state.maxPrice = 0;
  const selectCategory = document.getElementById("filter-category");
  const selectDuration = document.getElementById("filter-duration");
  const selectSort = document.getElementById("sort-packages");
  const slider = document.getElementById("filter-price");
  if (selectCategory) selectCategory.value = "All";
  if (selectDuration) selectDuration.value = "All";
  if (selectSort) selectSort.value = "popular";
  if (slider) {
    slider.value = slider.max;
    const out = document.getElementById("filter-price-value");
    if (out) out.textContent = "Any";
  }
  gvRenderPackages();
}

/* --------------------------------- offers ------------------------------ */

function gvRenderOffers() {
  const grid = document.getElementById("offer-grid");
  if (!grid) return;
  grid.innerHTML = GV_OFFERS.map(
    (offer) => `
    <article class="offer-card">
      <span class="offer-card__badge">${GV_Util.escape(offer.badge)}</span>
      <h3>${GV_Util.escape(offer.title)}</h3>
      <p>${GV_Util.escape(offer.description)}</p>
      <div class="offer-card__pricing">
        <p class="price">
          <span class="price__old">${GV_Money.inr(offer.oldPrice)}</span>
          <span class="price__now">${GV_Money.inr(offer.price)}</span>
        </p>
        <span class="offer-card__off">${offer.discount}% OFF</span>
      </div>
      <p class="offer-card__code">Code <strong>${GV_Util.escape(offer.code)}</strong> · valid till ${GV_Util.escape(offer.validTill)}</p>
      <button class="btn btn--accent" type="button" data-book-package="${GV_Util.escape(offer.packageId)}">Book Now</button>
    </article>`
  ).join("");
}

/* --------------------------------- gallery ----------------------------- */

function gvRenderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = GV_GALLERY.map(
    (item, index) => `
    <button class="gallery-item" type="button" data-gallery="${index}"
            aria-label="Open ${GV_Util.escape(item.title)} in fullscreen">
      <img src="${item.image}" alt="${GV_Util.escape(item.alt)}" loading="lazy" />
      <span class="gallery-item__label">
        <strong>${GV_Util.escape(item.title)}</strong>
        <small>${GV_Util.escape(item.caption)}</small>
      </span>
      <span class="gallery-item__zoom" aria-hidden="true">🔍</span>
    </button>`
  ).join("");
}

/* --------------------------------- reviews ----------------------------- */

function gvReviewCard(review) {
  const avatar = review.avatar
    ? `<img src="${review.avatar}" alt="${GV_Util.escape(review.name)}" loading="lazy" />`
    : `<span aria-hidden="true">${GV_Util.escape(GV_Util.initials(review.name))}</span>`;

  return `
  <article class="review-card">
    <p class="review-card__stars" aria-label="${review.rating} out of 5 stars">
      <span aria-hidden="true">${GV_Util.stars(review.rating)}</span>
    </p>
    <p class="review-card__text">“${GV_Util.escape(review.text)}”</p>
    <footer class="review-card__foot">
      <span class="review-card__avatar">${avatar}</span>
      <span class="review-card__who">
        <strong>${GV_Util.escape(review.name)}</strong>
        <small>${GV_Util.escape(review.destination)} · ${GV_Util.escape(GV_Date.pretty(review.date))}</small>
      </span>
      ${review.verified ? '<span class="review-card__verified" title="Verified booking">✓</span>' : ""}
    </footer>
  </article>`;
}

function gvRenderReviews() {
  const grid = document.getElementById("review-grid");
  if (!grid) return;
  const list = GV_REVIEWS.all();
  grid.innerHTML = list.map(gvReviewCard).join("");

  const count = document.getElementById("review-count");
  if (count) {
    const avg = list.reduce((sum, r) => sum + r.rating, 0) / (list.length || 1);
    count.textContent = `${list.length} reviews · average ${avg.toFixed(1)} ★`;
  }
}

/* --------------------------- about, stats, faqs ------------------------ */

function gvRenderAboutPoints() {
  const list = document.getElementById("about-points");
  if (!list) return;
  list.innerHTML = GV_ABOUT_POINTS.map(
    (point) => `
    <li class="about-point">
      <span class="about-point__icon" aria-hidden="true">${point.icon}</span>
      <div>
        <h3>${GV_Util.escape(point.title)}</h3>
        <p>${GV_Util.escape(point.text)}</p>
      </div>
    </li>`
  ).join("");
}

function gvRenderStats() {
  const grid = document.getElementById("stats-grid");
  if (!grid) return;
  grid.innerHTML = GV_STATS.map(
    (stat) => `
    <div class="stat">
      <span class="stat__icon" aria-hidden="true">${stat.icon}</span>
      <p class="stat__value" data-target="${stat.value}" data-display="${stat.display}">0</p>
      <p class="stat__label">${GV_Util.escape(stat.label)}</p>
    </div>`
  ).join("");
}

function gvRenderFaqs() {
  const list = document.getElementById("faq-list");
  if (!list) return;
  list.innerHTML = GV_FAQS.map(
    (faq, i) => `
    <details class="faq" ${i === 0 ? "open" : ""}>
      <summary>${GV_Util.escape(faq.q)}</summary>
      <p>${GV_Util.escape(faq.a)}</p>
    </details>`
  ).join("");
}

/* ------------------------------ detail modal --------------------------- */

function gvDetailMarkup(dest, pkg) {
  const rating = pkg ? pkg.rating : dest.rating;
  const price = pkg ? pkg.price : dest.price;
  const oldPrice = pkg ? pkg.oldPrice : null;
  const days = pkg ? pkg.days : dest.duration;
  const nights = pkg ? pkg.nights : dest.duration - 1;
  const services = pkg ? pkg.services : dest.inclusions.slice(0, 6);
  const photos = dest.gallery
    .map(
      (src, i) =>
        `<button type="button" class="detail__thumb" data-detail-photo="${dest.id}" data-index="${i}">
          <img src="${src}" alt="${GV_Util.escape(dest.name)} photo ${i + 1}" loading="lazy" />
        </button>`
    )
    .join("");
  const activities = dest.activities.map((a) => `<li>${GV_Util.escape(a)}</li>`).join("");
  const inclusions = services.map((s) => `<li><span aria-hidden="true">✓</span> ${GV_Util.escape(s)}</li>`).join("");
  const itinerary = dest.itinerary
    .map(
      (step) => `
      <li class="timeline__item">
        <span class="timeline__day">Day ${step.day}</span>
        <div><h4>${GV_Util.escape(step.title)}</h4><p>${GV_Util.escape(step.detail)}</p></div>
      </li>`
    )
    .join("");

  return `
  <header class="detail__hero">
    <img src="${pkg ? pkg.image : dest.image}" alt="${GV_Util.escape(dest.name)}" />
    <div class="detail__hero-text">
      <p class="detail__eyebrow">${GV_Util.escape(dest.country)} · ${GV_Util.escape(dest.region)}</p>
      <h3>${GV_Util.escape(pkg ? pkg.title : dest.name)}</h3>
      <p class="detail__tag">${GV_Util.escape(pkg ? pkg.tagline : dest.shortDescription)}</p>
      <p class="detail__rating"><span aria-hidden="true">★</span> ${rating.toFixed(1)}
        <small>(${dest.reviews} traveler reviews)</small></p>
    </div>
  </header>

  <div class="detail__chips">
    <span class="chip">🗓 ${GV_Util.plural(days, "day", "days")} / ${GV_Util.plural(nights, "night", "nights")}</span>
    <span class="chip">🌤 Best: ${GV_Util.escape(dest.bestTime)}</span>
    ${dest.categories.map((c) => `<span class="chip chip--soft">${GV_Util.escape(c)}</span>`).join("")}
  </div>

  <p class="detail__lede">${GV_Util.escape(dest.description)}</p>

  <div class="detail__thumbs">${photos}</div>

  <div class="detail__grid">
    <section>
      <h4>Things to do</h4>
      <ul class="detail__ticks">${activities}</ul>
    </section>
    <section>
      <h4>What you get</h4>
      <ul class="detail__ticks detail__ticks--check">${inclusions}</ul>
      <h4>Where you stay</h4>
      <p class="detail__hotel">
        <strong>${GV_Util.escape(dest.hotel.name)}</strong>
        <span>${"★".repeat(dest.hotel.stars)} ${GV_Util.escape(dest.hotel.detail)}</span>
      </p>
    </section>
  </div>

  <section class="detail__itinerary">
    <h4>Day by day itinerary</h4>
    <ol class="timeline">${itinerary}</ol>
  </section>

  <footer class="detail__foot">
    <p class="price">
      ${oldPrice ? `<span class="price__old">${GV_Money.inr(oldPrice)}</span>` : ""}
      <span class="price__now">${GV_Money.inr(price)}</span>
      <small>per person</small>
    </p>
    <button class="btn btn--primary" type="button" data-book-destination="${dest.id}">
      Book this trip →
    </button>
  </footer>`;
}

function gvOpenDestinationDetail(destId) {
  const dest = GV_DESTINATIONS.find((d) => d.id === destId);
  const body = document.getElementById("detail-body");
  if (!dest || !body) return;
  body.innerHTML = gvDetailMarkup(dest, GV_View.packageForDestination(destId));
  GV_Modal.open("detail-modal");
}

function gvOpenPackageDetail(pkgId) {
  const pkg = GV_PACKAGES.find((p) => p.id === pkgId);
  const dest = pkg ? GV_DESTINATIONS.find((d) => d.id === pkg.destinationId) : null;
  const body = document.getElementById("detail-body");
  if (!pkg || !dest || !body) return;
  body.innerHTML = gvDetailMarkup(dest, pkg);
  GV_Modal.open("detail-modal");
}

/* --------------------------- render click handling --------------------- */

function gvInitRenderHandlers() {
  document.addEventListener("click", (event) => {
    const explore = event.target.closest("[data-explore]");
    if (explore) {
      gvOpenDestinationDetail(explore.getAttribute("data-explore"));
      return;
    }

    const pkgDetail = event.target.closest("[data-package-detail]");
    if (pkgDetail) {
      gvOpenPackageDetail(pkgDetail.getAttribute("data-package-detail"));
      return;
    }

    const fav = event.target.closest("[data-fav-toggle]");
    if (fav) {
      const id = fav.getAttribute("data-fav-toggle");
      const added = GV_FAVORITES.toggle(GV_View.email(), id);
      const dest = GV_DESTINATIONS.find((d) => d.id === id);
      const name = dest ? dest.name : "Destination";
      GV_Toast.show(
        added ? `${name} saved to favourites` : `${name} removed from favourites`,
        "info"
      );
      gvRenderDestinations();
      if (typeof gvUpdateFavoriteCount === "function") gvUpdateFavoriteCount();
      if (typeof gvRenderDashboard === "function") gvRenderDashboard();
      return;
    }

    const thumb = event.target.closest("[data-detail-photo]");
    if (thumb) {
      const dest = GV_DESTINATIONS.find((d) => d.id === thumb.getAttribute("data-detail-photo"));
      if (!dest) return;
      GV_Lightbox.open(
        dest.gallery.map((image) => ({
          image,
          title: dest.name,
          caption: dest.country,
          alt: `${dest.name} photograph`
        })),
        Number(thumb.getAttribute("data-index")) || 0
      );
      return;
    }

    const shot = event.target.closest("[data-gallery]");
    if (shot) {
      GV_Lightbox.open(
        GV_GALLERY.map((item) => ({
          image: item.image,
          title: item.title,
          caption: item.caption,
          alt: item.alt
        })),
        Number(shot.getAttribute("data-gallery")) || 0
      );
      return;
    }

    if (event.target.closest("[data-reset-search]")) {
      gvResetSearch();
      GV_Toast.show("Search cleared", "info");
      return;
    }
    if (event.target.closest("[data-reset-filters]")) {
      gvResetFilters();
      GV_Toast.show("Filters reset", "info");
    }
  });
}
