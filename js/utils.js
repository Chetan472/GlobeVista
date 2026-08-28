// ============================================
// UTILITY FUNCTIONS
// ============================================

class Utils {
  // ============================================
  // FORMATTING
  // ============================================

  static formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  }

  static formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static formatTime(date) {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  static formatDateTime(date) {
    return this.formatDate(date) + ' ' + this.formatTime(date);
  }

  static formatDuration(days) {
    if (days === 1) return '1 Day';
    return `${days} Days`;
  }

  // ============================================
  // VALIDATION
  // ============================================

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  static isValidPassword(password) {
    return password.length >= 6;
  }

  static isValidName(name) {
    return name.trim().length >= 2;
  }

  static validateBookingForm(formData) {
    const errors = {};

    if (!this.isValidName(formData.firstName)) {
      errors.firstName = 'First name is required';
    }

    if (!this.isValidEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }

    if (!this.isValidPhone(formData.phone)) {
      errors.phone = 'Valid 10-digit phone number is required';
    }

    if (!formData.checkIn) {
      errors.checkIn = 'Check-in date is required';
    }

    if (!formData.checkOut) {
      errors.checkOut = 'Check-out date is required';
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      errors.dates = 'Check-out date must be after check-in date';
    }

    if (!formData.travelers || formData.travelers < 1) {
      errors.travelers = 'Number of travelers is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static validateLoginForm(formData) {
    const errors = {};

    if (!this.isValidEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static validateRegisterForm(formData) {
    const errors = {};

    if (!this.isValidName(formData.fullName)) {
      errors.fullName = 'Full name is required';
    }

    if (!this.isValidEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }

    if (!this.isValidPhone(formData.phone)) {
      errors.phone = 'Valid 10-digit phone number is required';
    }

    if (!this.isValidPassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      errors.terms = 'You must agree to Terms & Conditions';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // ============================================
  // SEARCH & FILTER
  // ============================================

  static filterDestinations(destinations, filters) {
    return destinations.filter(destination => {
      // Travel Type Filter
      if (filters.travelTypes && filters.travelTypes.length > 0) {
        if (!filters.travelTypes.includes(destination.travelType)) {
          return false;
        }
      }

      // Price Filter
      if (filters.priceRange) {
        if (destination.startingPrice < filters.priceRange.min || 
            destination.startingPrice > filters.priceRange.max) {
          return false;
        }
      }

      // Rating Filter
      if (filters.minRating) {
        if (destination.rating < filters.minRating) {
          return false;
        }
      }

      // Search Query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        if (!destination.name.toLowerCase().includes(query) &&
            !destination.country.toLowerCase().includes(query) &&
            !destination.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  }

  static filterPackages(packages, filters) {
    return packages.filter(pkg => {
      // Travel Type Filter
      if (filters.travelTypes && filters.travelTypes.length > 0) {
        if (!filters.travelTypes.includes(pkg.travelType)) {
          return false;
        }
      }

      // Price Filter
      if (filters.priceRange) {
        if (pkg.price < filters.priceRange.min || 
            pkg.price > filters.priceRange.max) {
          return false;
        }
      }

      // Duration Filter
      if (filters.duration) {
        if (pkg.durationDays < filters.duration.min || 
            pkg.durationDays > filters.duration.max) {
          return false;
        }
      }

      // Rating Filter
      if (filters.minRating) {
        if (pkg.rating < filters.minRating) {
          return false;
        }
      }

      // Search Query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        if (!pkg.name.toLowerCase().includes(query) &&
            !pkg.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  }

  static sortDestinations(destinations, sortBy) {
    const sorted = [...destinations];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.startingPrice - b.startingPrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.startingPrice - a.startingPrice);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  static sortPackages(packages, sortBy) {
    const sorted = [...packages];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'duration-asc':
        return sorted.sort((a, b) => a.durationDays - b.durationDays);
      case 'duration-desc':
        return sorted.sort((a, b) => b.durationDays - a.durationDays);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  // ============================================
  // PAGINATION
  // ============================================

  static paginate(array, pageNumber, pageSize = 6) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  }

  static getTotalPages(arrayLength, pageSize = 6) {
    return Math.ceil(arrayLength / pageSize);
  }

  // ============================================
  // STRING UTILITIES
  // ============================================

  static truncate(str, length = 100) {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static generateId(prefix = '') {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  }

  // ============================================
  // ARRAY UTILITIES
  // ============================================

  static removeDuplicates(array, key) {
    if (key) {
      return [...new Map(array.map(item => [item[key], item])).values()];
    }
    return [...new Set(array)];
  }

  static groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    }, {});
  }

  static findById(array, id) {
    return array.find(item => item.id === id);
  }

  static findByProperty(array, property, value) {
    return array.find(item => item[property] === value);
  }

  // ============================================
  // CALCULATION
  // ============================================

  static calculateDiscountPercent(originalPrice, discountedPrice) {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }

  static calculateTotalPrice(price, quantity = 1) {
    return price * quantity;
  }

  static calculateTax(price, taxPercent = 18) {
    return (price * taxPercent) / 100;
  }

  static calculateFinalPrice(price, taxPercent = 18) {
    const tax = this.calculateTax(price, taxPercent);
    return price + tax;
  }

  static calculateTravelDays(checkIn, checkOut) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((new Date(checkOut) - new Date(checkIn)) / msPerDay);
  }

  // ============================================
  // OBJECT UTILITIES
  // ============================================

  static deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }

  static getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  static setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
    return obj;
  }

  // ============================================
  // LOCAL STORAGE HELPERS
  // ============================================

  static saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  // ============================================
  // DEBOUNCE & THROTTLE
  // ============================================

  static debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // ============================================
  // API HELPERS
  // ============================================

  static async fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  // ============================================
  // CURRENCY CONVERSION
  // ============================================

  static convertCurrency(amount, fromCurrency = 'INR', toCurrency = 'USD', rate = 0.012) {
    if (fromCurrency === toCurrency) return amount;
    if (fromCurrency === 'INR' && toCurrency === 'USD') return amount * rate;
    if (fromCurrency === 'USD' && toCurrency === 'INR') return amount / rate;
    return amount;
  }

  // ============================================
  // DATE UTILITIES
  // ============================================

  static getDaysDifference(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((new Date(date2) - new Date(date1)) / msPerDay);
  }

  static isDateInPast(date) {
    return new Date(date) < new Date();
  }

  static isDateInFuture(date) {
    return new Date(date) > new Date();
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getNextMonth() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  }

  static getMinCheckOutDate(checkInDate) {
    return this.addDays(new Date(checkInDate), 1).toISOString().split('T')[0];
  }

  // ============================================
  // BROWSER UTILITIES
  // ============================================

  static isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static getScrollPosition() {
    return window.scrollY || document.documentElement.scrollTop;
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  static scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }

  static copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      UIComponents.showToast('Copied to clipboard!', 'success');
    });
  }

  // ============================================
  // RANDOM UTILITIES
  // ============================================

  static getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA502', '#E8B4B8'];
    return this.getRandomItem(colors);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
