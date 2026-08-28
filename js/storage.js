// ============================================
// STORAGE MANAGEMENT SYSTEM
// ============================================

class StorageManager {
  constructor() {
    this.prefix = 'globevista_';
  }

  // ============================================
  // USER MANAGEMENT
  // ============================================

  // Save current user
  saveCurrentUser(user) {
    localStorage.setItem(this.prefix + 'currentUser', JSON.stringify(user));
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem(this.prefix + 'currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Clear current user (logout)
  clearCurrentUser() {
    localStorage.removeItem(this.prefix + 'currentUser');
  }

  // Register new user
  registerUser(user) {
    const users = this.getAllUsers();
    user.id = Date.now();
    user.createdAt = new Date().toISOString();
    users.push(user);
    localStorage.setItem(this.prefix + 'users', JSON.stringify(users));
    return user;
  }

  // Get all users
  getAllUsers() {
    const users = localStorage.getItem(this.prefix + 'users');
    return users ? JSON.parse(users) : [];
  }

  // Get user by email
  getUserByEmail(email) {
    const users = this.getAllUsers();
    return users.find(u => u.email === email);
  }

  // Verify login
  verifyLogin(email, password) {
    const user = this.getUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // ============================================
  // BOOKINGS MANAGEMENT
  // ============================================

  // Save new booking
  saveBooking(booking) {
    const bookings = this.getAllBookings();
    booking.id = 'BK' + Date.now();
    booking.status = 'confirmed';
    booking.createdAt = new Date().toISOString();
    bookings.push(booking);
    localStorage.setItem(this.prefix + 'bookings', JSON.stringify(bookings));
    return booking;
  }

  // Get all bookings
  getAllBookings() {
    const bookings = localStorage.getItem(this.prefix + 'bookings');
    return bookings ? JSON.parse(bookings) : [];
  }

  // Get user bookings
  getUserBookings(userId) {
    const bookings = this.getAllBookings();
    return bookings.filter(b => b.userId === userId);
  }

  // Get booking by ID
  getBookingById(bookingId) {
    const bookings = this.getAllBookings();
    return bookings.find(b => b.id === bookingId);
  }

  // Update booking status
  updateBookingStatus(bookingId, status) {
    const bookings = this.getAllBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      booking.updatedAt = new Date().toISOString();
      localStorage.setItem(this.prefix + 'bookings', JSON.stringify(bookings));
      return booking;
    }
    return null;
  }

  // Cancel booking
  cancelBooking(bookingId) {
    return this.updateBookingStatus(bookingId, 'cancelled');
  }

  // ============================================
  // WISHLIST MANAGEMENT
  // ============================================

  // Add to wishlist
  addToWishlist(userId, destinationId) {
    const wishlists = this.getAllWishlists();
    const userWishlist = wishlists.find(w => w.userId === userId);
    
    if (!userWishlist) {
      wishlists.push({
        userId: userId,
        destinations: [destinationId],
        createdAt: new Date().toISOString()
      });
    } else {
      if (!userWishlist.destinations.includes(destinationId)) {
        userWishlist.destinations.push(destinationId);
      }
    }
    localStorage.setItem(this.prefix + 'wishlists', JSON.stringify(wishlists));
  }

  // Remove from wishlist
  removeFromWishlist(userId, destinationId) {
    const wishlists = this.getAllWishlists();
    const userWishlist = wishlists.find(w => w.userId === userId);
    
    if (userWishlist) {
      userWishlist.destinations = userWishlist.destinations.filter(d => d !== destinationId);
    }
    localStorage.setItem(this.prefix + 'wishlists', JSON.stringify(wishlists));
  }

  // Get user wishlist
  getUserWishlist(userId) {
    const wishlists = this.getAllWishlists();
    const userWishlist = wishlists.find(w => w.userId === userId);
    return userWishlist ? userWishlist.destinations : [];
  }

  // Get all wishlists
  getAllWishlists() {
    const wishlists = localStorage.getItem(this.prefix + 'wishlists');
    return wishlists ? JSON.parse(wishlists) : [];
  }

  // Check if in wishlist
  isInWishlist(userId, destinationId) {
    const wishlist = this.getUserWishlist(userId);
    return wishlist.includes(destinationId);
  }

  // ============================================
  // CART MANAGEMENT
  // ============================================

  // Add to cart
  addToCart(userId, packageId, cartItem) {
    const carts = this.getAllCarts();
    let userCart = carts.find(c => c.userId === userId);
    
    if (!userCart) {
      userCart = {
        userId: userId,
        items: [],
        createdAt: new Date().toISOString()
      };
      carts.push(userCart);
    }
    
    const existingItem = userCart.items.find(i => i.packageId === packageId);
    if (existingItem) {
      existingItem.quantity += cartItem.quantity || 1;
    } else {
      cartItem.id = Date.now();
      userCart.items.push(cartItem);
    }
    
    localStorage.setItem(this.prefix + 'carts', JSON.stringify(carts));
  }

  // Remove from cart
  removeFromCart(userId, packageId) {
    const carts = this.getAllCarts();
    const userCart = carts.find(c => c.userId === userId);
    
    if (userCart) {
      userCart.items = userCart.items.filter(i => i.packageId !== packageId);
    }
    localStorage.setItem(this.prefix + 'carts', JSON.stringify(carts));
  }

  // Get user cart
  getUserCart(userId) {
    const carts = this.getAllCarts();
    const userCart = carts.find(c => c.userId === userId);
    return userCart ? userCart.items : [];
  }

  // Get all carts
  getAllCarts() {
    const carts = localStorage.getItem(this.prefix + 'carts');
    return carts ? JSON.parse(carts) : [];
  }

  // Update cart quantity
  updateCartQuantity(userId, packageId, quantity) {
    const carts = this.getAllCarts();
    const userCart = carts.find(c => c.userId === userId);
    
    if (userCart) {
      const item = userCart.items.find(i => i.packageId === packageId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    }
    localStorage.setItem(this.prefix + 'carts', JSON.stringify(carts));
  }

  // Clear cart
  clearCart(userId) {
    const carts = this.getAllCarts();
    const userCart = carts.find(c => c.userId === userId);
    
    if (userCart) {
      userCart.items = [];
    }
    localStorage.setItem(this.prefix + 'carts', JSON.stringify(carts));
  }

  // ============================================
  // REVIEWS MANAGEMENT
  // ============================================

  // Add review
  addReview(review) {
    const reviews = this.getAllReviews();
    review.id = Date.now();
    review.createdAt = new Date().toISOString();
    reviews.push(review);
    localStorage.setItem(this.prefix + 'reviews', JSON.stringify(reviews));
    return review;
  }

  // Get all reviews
  getAllReviews() {
    const reviews = localStorage.getItem(this.prefix + 'reviews');
    return reviews ? JSON.parse(reviews) : [];
  }

  // Get destination reviews
  getDestinationReviews(destinationId) {
    const reviews = this.getAllReviews();
    return reviews.filter(r => r.destinationId === destinationId);
  }

  // Get average rating
  getAverageRating(destinationId) {
    const reviews = this.getDestinationReviews(destinationId);
    if (reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }

  // ============================================
  // SEARCH HISTORY
  // ============================================

  // Add search
  addSearchHistory(search) {
    const history = this.getSearchHistory();
    history.unshift({
      query: search,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 20 searches
    if (history.length > 20) {
      history.pop();
    }
    
    localStorage.setItem(this.prefix + 'searchHistory', JSON.stringify(history));
  }

  // Get search history
  getSearchHistory() {
    const history = localStorage.getItem(this.prefix + 'searchHistory');
    return history ? JSON.parse(history) : [];
  }

  // Clear search history
  clearSearchHistory() {
    localStorage.removeItem(this.prefix + 'searchHistory');
  }

  // ============================================
  // SAVED FILTERS
  // ============================================

  // Save filter
  saveFilter(filterName, filters) {
    const savedFilters = this.getSavedFilters();
    
    const existingFilter = savedFilters.find(f => f.name === filterName);
    if (existingFilter) {
      existingFilter.filters = filters;
      existingFilter.updatedAt = new Date().toISOString();
    } else {
      savedFilters.push({
        name: filterName,
        filters: filters,
        createdAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(this.prefix + 'savedFilters', JSON.stringify(savedFilters));
  }

  // Get saved filters
  getSavedFilters() {
    const filters = localStorage.getItem(this.prefix + 'savedFilters');
    return filters ? JSON.parse(filters) : [];
  }

  // Get filter by name
  getFilterByName(filterName) {
    const filters = this.getSavedFilters();
    return filters.find(f => f.name === filterName);
  }

  // Delete filter
  deleteFilter(filterName) {
    const filters = this.getSavedFilters();
    const updated = filters.filter(f => f.name !== filterName);
    localStorage.setItem(this.prefix + 'savedFilters', JSON.stringify(updated));
  }

  // ============================================
  // PREFERENCES
  // ============================================

  // Save preferences
  savePreferences(userId, preferences) {
    const allPrefs = this.getAllPreferences();
    const userPrefs = allPrefs.find(p => p.userId === userId);
    
    if (userPrefs) {
      Object.assign(userPrefs, preferences);
    } else {
      allPrefs.push({ userId: userId, ...preferences });
    }
    
    localStorage.setItem(this.prefix + 'preferences', JSON.stringify(allPrefs));
  }

  // Get preferences
  getPreferences(userId) {
    const allPrefs = this.getAllPreferences();
    return allPrefs.find(p => p.userId === userId) || {};
  }

  // Get all preferences
  getAllPreferences() {
    const prefs = localStorage.getItem(this.prefix + 'preferences');
    return prefs ? JSON.parse(prefs) : [];
  }

  // ============================================
  // THEME & SETTINGS
  // ============================================

  // Save theme
  saveTheme(theme) {
    localStorage.setItem(this.prefix + 'theme', theme);
  }

  // Get theme
  getTheme() {
    return localStorage.getItem(this.prefix + 'theme') || 'light';
  }

  // Toggle theme
  toggleTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.saveTheme(newTheme);
    return newTheme;
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================

  // Add notification
  addNotification(userId, notification) {
    const allNotifications = this.getAllNotifications();
    const userNotifications = allNotifications[userId] || [];
    
    notification.id = Date.now();
    notification.read = false;
    notification.createdAt = new Date().toISOString();
    
    userNotifications.unshift(notification);
    allNotifications[userId] = userNotifications;
    
    localStorage.setItem(this.prefix + 'notifications', JSON.stringify(allNotifications));
  }

  // Get user notifications
  getUserNotifications(userId) {
    const allNotifications = this.getAllNotifications();
    return allNotifications[userId] || [];
  }

  // Get all notifications
  getAllNotifications() {
    const notifications = localStorage.getItem(this.prefix + 'notifications');
    return notifications ? JSON.parse(notifications) : {};
  }

  // Mark as read
  markAsRead(userId, notificationId) {
    const allNotifications = this.getAllNotifications();
    const userNotifications = allNotifications[userId] || [];
    
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    
    localStorage.setItem(this.prefix + 'notifications', JSON.stringify(allNotifications));
  }

  // ============================================
  // BOOKMARKED PACKAGES
  // ============================================

  // Add bookmark
  addBookmark(userId, packageId) {
    const bookmarks = this.getAllBookmarks();
    let userBookmarks = bookmarks.find(b => b.userId === userId);
    
    if (!userBookmarks) {
      userBookmarks = {
        userId: userId,
        packageIds: [],
        createdAt: new Date().toISOString()
      };
      bookmarks.push(userBookmarks);
    }
    
    if (!userBookmarks.packageIds.includes(packageId)) {
      userBookmarks.packageIds.push(packageId);
    }
    
    localStorage.setItem(this.prefix + 'bookmarks', JSON.stringify(bookmarks));
  }

  // Remove bookmark
  removeBookmark(userId, packageId) {
    const bookmarks = this.getAllBookmarks();
    const userBookmarks = bookmarks.find(b => b.userId === userId);
    
    if (userBookmarks) {
      userBookmarks.packageIds = userBookmarks.packageIds.filter(p => p !== packageId);
    }
    
    localStorage.setItem(this.prefix + 'bookmarks', JSON.stringify(bookmarks));
  }

  // Get user bookmarks
  getUserBookmarks(userId) {
    const bookmarks = this.getAllBookmarks();
    const userBookmarks = bookmarks.find(b => b.userId === userId);
    return userBookmarks ? userBookmarks.packageIds : [];
  }

  // Get all bookmarks
  getAllBookmarks() {
    const bookmarks = localStorage.getItem(this.prefix + 'bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
  }

  // ============================================
  // CLEAR ALL DATA
  // ============================================

  // Clear all app data
  clearAllData() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Get storage stats
  getStorageStats() {
    const keys = Object.keys(localStorage);
    const appKeys = keys.filter(key => key.startsWith(this.prefix));
    
    return {
      totalKeys: appKeys.length,
      keys: appKeys,
      dataSize: JSON.stringify(localStorage).length + ' bytes'
    };
  }
}

// Create global instance
const storage = new StorageManager();

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
