// ============================================
// DARK MODE FUNCTIONALITY
// ============================================
function initDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }
  
  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  
  body.classList.toggle('dark-mode');
  
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ============================================
// FORM VALIDATION
// ============================================
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

function validateContactForm() {
  const form = document.getElementById('contactForm');
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('emailAddress').value.trim();
  const phone = document.getElementById('phoneNumber').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Clear previous errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('phoneError').textContent = '';
  document.getElementById('messageError').textContent = '';
  
  let isValid = true;
  
  // Validate full name
  if (fullName.length < 3) {
    document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
    isValid = false;
  }
  
  // Validate email
  if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate phone
  if (!validatePhoneNumber(phone)) {
    document.getElementById('phoneError').textContent = 'Phone must be a valid 10-digit number';
    isValid = false;
  }
  
  // Validate message
  if (message.length < 10) {
    document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
    isValid = false;
  }
  
  return isValid;
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateContactForm()) {
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        formMessage.textContent = '✅ Message sent successfully! We will contact you soon.';
        formMessage.classList.add('success');
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.classList.remove('success');
        }, 5000);
      }, 1500);
    }
  });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const destinationInput = document.getElementById('destination-input');
  const searchMessage = document.getElementById('searchMessage');
  
  searchBtn.addEventListener('click', () => {
    const destination = destinationInput.value.trim();
    const checkin = document.getElementById('checkin-input').value;
    const checkout = document.getElementById('checkout-input').value;
    const guests = document.getElementById('guests-select').value;
    
    if (!destination) {
      searchMessage.textContent = '⚠️ Please enter a destination';
      searchMessage.classList.add('error');
      return;
    }
    
    if (!checkin || !checkout) {
      searchMessage.textContent = '⚠️ Please select check-in and check-out dates';
      searchMessage.classList.add('error');
      return;
    }
    
    searchMessage.textContent = `✅ Searching for "${destination}" from ${checkin} to ${checkout} for ${guests}...`;
    searchMessage.classList.remove('error');
    searchMessage.classList.add('success');
    
    // Filter destination cards
    filterDestinations(destination);
    
    // Scroll to destinations
    setTimeout(() => {
      document.getElementById('destination').scrollIntoView({ behavior: 'smooth' });
    }, 500);
  });
}

function filterDestinations(searchTerm) {
  const cards = document.querySelectorAll('.card');
  const searchLower = searchTerm.toLowerCase();
  
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchLower)) {
      card.style.display = 'block';
      card.classList.add('highlight');
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show all cards again after 3 seconds
  setTimeout(() => {
    cards.forEach(card => {
      card.style.display = 'block';
      card.classList.remove('highlight');
    });
  }, 3000);
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// GO TO TOP BUTTON
// ============================================
function initGoToTopButton() {
  const goToTopBtn = document.getElementById('goToTopBtn');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      goToTopBtn.style.display = 'block';
    } else {
      goToTopBtn.style.display = 'none';
    }
  });
  
  goToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// BOOK NOW BUTTONS
// ============================================
function initBookNowButtons() {
  // Header Book Now button
  document.querySelector('.button').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Hero Book Now button
  document.querySelector('.book-btn').addEventListener('click', () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Explore Tours button
  document.querySelector('.explore-btn').addEventListener('click', () => {
    document.getElementById('destination').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Package Book Now buttons
  document.querySelectorAll('.book-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const packageName = e.target.closest('.package-card').querySelector('h3').textContent;
      document.getElementById('destination').value = packageName;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Card Explore buttons
  document.querySelectorAll('.explore-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const destinationName = e.target.closest('.card').querySelector('h3').textContent;
      alert(`🌍 Exploring ${destinationName}! More details coming soon.`);
    });
  });
  
  // Offer button
  document.querySelector('.offer-btn').addEventListener('click', () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================
// ANIMATION ON SCROLL
// ============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.card, .why-card, .testimonial-card, .stat-card').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initHamburgerMenu();
  initContactForm();
  initSearch();
  initSmoothScroll();
  initGoToTopButton();
  initBookNowButtons();
  initScrollAnimations();
});
