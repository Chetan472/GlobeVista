// ============================================
// REUSABLE UI COMPONENTS
// ============================================

class UIComponents {
  // ============================================
  // MODALS
  // ============================================

  static createModal(id, title, content, buttons = []) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          ${buttons.map(btn => `
            <button class="modal-btn ${btn.class || ''}" data-action="${btn.action}">
              ${btn.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    return modal;
  }

  static showModal(modalElement) {
    document.body.appendChild(modalElement);
    setTimeout(() => modalElement.classList.add('show'), 10);

    // Close on X button
    modalElement.querySelector('.modal-close').addEventListener('click', () => {
      this.closeModal(modalElement);
    });

    // Close on overlay click
    modalElement.addEventListener('click', (e) => {
      if (e.target === modalElement) {
        this.closeModal(modalElement);
      }
    });
  }

  static closeModal(modalElement) {
    modalElement.classList.remove('show');
    setTimeout(() => modalElement.remove(), 300);
  }

  // ============================================
  // CARDS
  // ============================================

  static createDestinationCard(destination) {
    return `
      <div class="destination-card" data-id="${destination.id}">
        <div class="card-image">
          <img src="${destination.image}" alt="${destination.name}">
          <div class="card-overlay">
            <button class="card-wishlist-btn" title="Add to Wishlist">♡</button>
          </div>
        </div>
        <div class="card-body">
          <h3>${destination.name}</h3>
          <p class="destination-country">${destination.country}</p>
          <div class="rating">
            <span class="stars">${'⭐'.repeat(Math.floor(destination.rating))}</span>
            <span class="rating-value">${destination.rating}</span>
            <span class="reviews">(${destination.reviews})</span>
          </div>
          <p class="destination-description">${destination.description.substring(0, 80)}...</p>
          <div class="card-footer">
            <span class="price">From ₹${destination.startingPrice.toLocaleString()}</span>
            <button class="card-btn" data-action="explore">Explore</button>
          </div>
        </div>
      </div>
    `;
  }

  static createPackageCard(pkg) {
    const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
    return `
      <div class="package-card" data-id="${pkg.id}">
        <div class="package-image">
          <img src="${pkg.image}" alt="${pkg.name}">
          ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
        </div>
        <div class="package-body">
          <h3>${pkg.name}</h3>
          <p class="package-duration">📅 ${pkg.duration}</p>
          <div class="rating">
            <span class="stars">${'⭐'.repeat(Math.floor(pkg.rating))}</span>
            <span class="rating-value">${pkg.rating}</span>
          </div>
          <p class="package-description">${pkg.description}</p>
          <div class="package-meta">
            <span class="travel-type">${pkg.travelType}</span>
            <span class="difficulty">${pkg.difficulty}</span>
          </div>
          <div class="package-footer">
            <div class="price-section">
              ${pkg.originalPrice > pkg.price ? `
                <span class="original-price">₹${pkg.originalPrice.toLocaleString()}</span>
              ` : ''}
              <span class="price">₹${pkg.price.toLocaleString()}</span>
            </div>
            <button class="package-btn" data-action="book-package">Book Now</button>
          </div>
        </div>
      </div>
    `;
  }

  static createReviewCard(review) {
    return `
      <div class="review-card">
        <div class="review-header">
          <img src="${review.image}" alt="${review.userName}" class="reviewer-avatar">
          <div class="reviewer-info">
            <h4>${review.userName}</h4>
            <p class="review-destination">${review.destination}</p>
          </div>
        </div>
        <div class="review-rating">
          <span class="stars">${'⭐'.repeat(review.rating)}</span>
        </div>
        <p class="review-text">"${review.comment}"</p>
        <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
      </div>
    `;
  }

  // ============================================
  // FORMS
  // ============================================

  static createLoginForm() {
    return `
      <form id="loginForm" class="auth-form">
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" name="email" required placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" required placeholder="••••••••">
        </div>
        <div class="form-checkbox">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">Remember me</label>
        </div>
        <button type="submit" class="form-btn">Login</button>
        <p class="form-footer">Don't have an account? <a href="#register">Register here</a></p>
      </form>
    `;
  }

  static createRegisterForm() {
    return `
      <form id="registerForm" class="auth-form">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" required placeholder="John Doe">
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" name="email" required placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" required placeholder="10-digit number">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" required placeholder="••••••••">
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" required placeholder="••••••••">
        </div>
        <div class="form-checkbox">
          <input type="checkbox" name="terms" required>
          <label>I agree to Terms & Conditions</label>
        </div>
        <button type="submit" class="form-btn">Register</button>
        <p class="form-footer">Already have an account? <a href="#login">Login here</a></p>
      </form>
    `;
  }

  static createBookingForm(packageData) {
    return `
      <form id="bookingForm" class="booking-form">
        <div class="form-section">
          <h3>Traveler Information</h3>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" name="firstName" required placeholder="First Name">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" required placeholder="10-digit number">
          </div>
        </div>

        <div class="form-section">
          <h3>Booking Details</h3>
          <div class="form-group">
            <label>Package</label>
            <input type="text" value="${packageData.name}" disabled>
          </div>
          <div class="form-group">
            <label>Check-in Date</label>
            <input type="date" name="checkIn" required>
          </div>
          <div class="form-group">
            <label>Check-out Date</label>
            <input type="date" name="checkOut" required>
          </div>
          <div class="form-group">
            <label>Number of Travelers</label>
            <select name="travelers" required>
              ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}">${n}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-section">
          <h3>Special Requests</h3>
          <div class="form-group">
            <label>Additional Notes</label>
            <textarea name="notes" placeholder="Any special requirements..."></textarea>
          </div>
        </div>

        <button type="submit" class="form-btn btn-large">Proceed to Payment</button>
      </form>
    `;
  }

  // ============================================
  // ALERTS & NOTIFICATIONS
  // ============================================

  static showAlert(message, type = 'info', duration = 3000) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <div class="alert-content">
        <span>${message}</span>
        <button class="alert-close">&times;</button>
      </div>
    `;

    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add('show'), 10);

    alert.querySelector('.alert-close').addEventListener('click', () => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 300);
    });

    if (duration) {
      setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
      }, duration);
    }
  }

  static showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ============================================
  // LOADERS
  // ============================================

  static createLoader() {
    return `
      <div class="loader">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `;
  }

  static showLoader(container) {
    container.innerHTML = this.createLoader();
  }

  // ============================================
  // BUTTONS
  // ============================================

  static createButton(text, action, className = '') {
    return `<button class="btn ${className}" data-action="${action}">${text}</button>`;
  }

  static createIconButton(icon, action, title = '') {
    return `
      <button class="icon-btn" data-action="${action}" title="${title}">
        ${icon}
      </button>
    `;
  }

  // ============================================
  // FILTERS
  // ============================================

  static createFilterPanel() {
    return `
      <div class="filter-panel">
        <h3>Filters</h3>
        
        <div class="filter-group">
          <h4>Travel Type</h4>
          <div class="filter-options">
            ${travelTypes.map(type => `
              <label class="filter-checkbox">
                <input type="checkbox" value="${type}" class="filter-travel-type">
                <span>${type}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4>Price Range</h4>
          <div class="filter-options">
            ${priceRanges.map(range => `
              <label class="filter-radio">
                <input type="radio" name="priceRange" value="${range.id}" class="filter-price">
                <span>${range.label}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4>Duration</h4>
          <div class="filter-options">
            ${durationRanges.map(range => `
              <label class="filter-radio">
                <input type="radio" name="duration" value="${range.id}" class="filter-duration">
                <span>${range.label}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4>Rating</h4>
          <div class="filter-options">
            ${ratingFilters.map(filter => `
              <label class="filter-radio">
                <input type="radio" name="rating" value="${filter.value}" class="filter-rating">
                <span>${filter.label}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <button class="btn-primary" id="applyFilters">Apply Filters</button>
        <button class="btn-secondary" id="clearFilters">Clear All</button>
      </div>
    `;
  }

  // ============================================
  // PAGINATION
  // ============================================

  static createPagination(currentPage, totalPages, onPageChange) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    if (currentPage > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.textContent = '← Previous';
      prevBtn.className = 'pagination-btn';
      prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
      pagination.appendChild(prevBtn);
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
      pageBtn.addEventListener('click', () => onPageChange(i));
      pagination.appendChild(pageBtn);
    }

    if (currentPage < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next →';
      nextBtn.className = 'pagination-btn';
      nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
      pagination.appendChild(nextBtn);
    }

    return pagination;
  }

  // ============================================
  // RATING DISPLAY
  // ============================================

  static createStarRating(rating, interactive = false) {
    let html = '<div class="star-rating">';
    for (let i = 1; i <= 5; i++) {
      const filled = i <= Math.floor(rating);
      html += `<span class="star ${filled ? 'filled' : ''}" data-value="${i}">★</span>`;
    }
    html += '</div>';
    return html;
  }

  // ============================================
  // BADGE
  // ============================================

  static createBadge(text, className = '') {
    return `<span class="badge ${className}">${text}</span>`;
  }

  // ============================================
  // EMPTY STATE
  // ============================================

  static createEmptyState(icon, title, message, action = null) {
    return `
      <div class="empty-state">
        <div class="empty-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${message}</p>
        ${action ? `<button class="btn-primary" data-action="${action.action}">${action.text}</button>` : ''}
      </div>
    `;
  }

  // ============================================
  // BREADCRUMB
  // ============================================

  static createBreadcrumb(items) {
    return `
      <nav class="breadcrumb">
        ${items.map((item, index) => `
          <a href="${item.url}" class="breadcrumb-item ${index === items.length - 1 ? 'active' : ''}">
            ${item.name}
          </a>
          ${index < items.length - 1 ? '<span class="breadcrumb-separator">/</span>' : ''}
        `).join('')}
      </nav>
    `;
  }

  // ============================================
  // STATS WIDGET
  // ============================================

  static createStatsWidget(label, value, icon = '') {
    return `
      <div class="stats-widget">
        <div class="stats-icon">${icon}</div>
        <div class="stats-content">
          <p class="stats-label">${label}</p>
          <h3 class="stats-value">${value}</h3>
        </div>
      </div>
    `;
  }

  // ============================================
  // SKELETON LOADER
  // ============================================

  static createSkeletonCard() {
    return `
      <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-body">
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      </div>
    `;
  }

  static createSkeletonGrid(count = 3) {
    let html = '<div class="skeleton-grid">';
    for (let i = 0; i < count; i++) {
      html += this.createSkeletonCard();
    }
    html += '</div>';
    return html;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIComponents;
}
