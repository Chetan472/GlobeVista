const destinations = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.9,
    duration: '5 Days / 4 Nights',
    price: 45999,
    image: 'images/bali.jpg',
    category: 'Beach',
    description:
      'Experience tropical beaches, lush rice terraces, spiritual temples, and unforgettable sunsets in Bali.',
    bestTime: 'April - June',
    activities: ['Beach hopping', 'Temple visits', 'Waterfall treks', 'Sunset cruise'],
    hotel: 'Ubud Garden Resort',
    inclusions: ['Return flights', '3-star hotel', 'Daily breakfast', 'Airport transfers'],
    itinerary: [
      'Day 1: Arrival & beach resort check-in',
      'Day 2: Ubud sightseeing and rice terrace tour',
      'Day 3: Waterfall trek and wellness spa',
      'Day 4: Sunset cruise and beach evening',
      'Day 5: Shopping and departure'
    ],
    reviews: [
      { user: 'Rahul', rating: 5, review: 'Everything was perfectly planned and the trip felt so relaxing.' },
      { user: 'Sonia', rating: 5, review: 'Bali was magical. The stays and sightseeing were fantastic.' }
    ]
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    rating: 4.8,
    duration: '4 Days / 3 Nights',
    price: 69999,
    image: 'images/maldives.jpg',
    category: 'Luxury',
    description:
      'Stay in overwater villas, enjoy turquoise waters, and relax in one of the world’s most serene island escapes.',
    bestTime: 'November - April',
    activities: ['Snorkelling', 'Beach dinner', 'Island hopping', 'Spa therapy'],
    hotel: 'Ocean Pearl Resort',
    inclusions: ['Sea-view villa', 'Breakfast buffet', 'Snorkelling trip', 'Airport pickup'],
    itinerary: [
      'Day 1: Check-in and lagoon sunset dinner',
      'Day 2: Snorkelling and island day trip',
      'Day 3: Spa and luxury beach lounge',
      'Day 4: Departure'
    ],
    reviews: [
      { user: 'Ishita', rating: 5, review: 'The resort experience felt premium and unforgettable.' },
      { user: 'Amit', rating: 4, review: 'Beautiful beaches and a stress-free itinerary.' }
    ]
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    rating: 4.9,
    duration: '7 Days / 6 Nights',
    price: 89999,
    image: 'images/swizerland.jpg',
    category: 'Adventure',
    description:
      'Explore snow-capped peaks, serene lakes, charming towns, and unforgettable mountain adventures.',
    bestTime: 'June - September',
    activities: ['Rail journey', 'Lake cruise', 'Hiking', 'Cable car ride'],
    hotel: 'Alpine Heights Hotel',
    inclusions: ['Swiss pass', 'Hotel stays', 'Breakfast', 'Sightseeing transfers'],
    itinerary: [
      'Day 1: Arrival in Zurich',
      'Day 2: Scenic railway ride to Lucerne',
      'Day 3: Swiss Alps excursion',
      'Day 4: Glacier train and lakeside walk',
      'Day 5: Adventure activities',
      'Day 6: Free day in Interlaken',
      'Day 7: Return'
    ],
    reviews: [
      { user: 'Neha', rating: 5, review: 'A breathtaking trip with stunning mountain views and smooth planning.' },
      { user: 'Karan', rating: 5, review: 'The itinerary was perfect for a family holiday.' }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    rating: 4.8,
    duration: '3 Days / 2 Nights',
    price: 55999,
    image: 'images/dubai.jpg',
    category: 'Luxury',
    description:
      'Discover iconic skyline views, desert safaris, premium shopping streets, and luxury experiences in Dubai.',
    bestTime: 'November - February',
    activities: ['Desert safari', 'Burj Khalifa', 'Shopping', 'Dune bashing'],
    hotel: 'Dubai Marina Suites',
    inclusions: ['Hotel nights', 'Desert safari', 'Breakfast', 'Airport transfer'],
    itinerary: [
      'Day 1: Arrival and city tour',
      'Day 2: Desert safari and evening entertainment',
      'Day 3: Burj Khalifa and departure'
    ],
    reviews: [
      { user: 'Ritika', rating: 5, review: 'Luxury, comfort and iconic attractions all in one trip.' },
      { user: 'Vikram', rating: 4, review: 'Very smooth and stylish travel experience.' }
    ]
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    country: 'India',
    rating: 4.9,
    duration: '6 Days / 5 Nights',
    price: 29999,
    image: 'images/kasmir.jpg',
    category: 'Family',
    description:
      'Enjoy snow-clad mountains, pristine lakes, houseboats, and the rich cultural beauty of Kashmir.',
    bestTime: 'March - October',
    activities: ['Shikara ride', 'Pahalgam tour', 'Garden visits', 'Local food trail'],
    hotel: 'Kashmir Valley Resort',
    inclusions: ['Hotel', 'Meals', 'Sightseeing', 'Private cab'],
    itinerary: [
      'Day 1: Arrival in Srinagar',
      'Day 2: Dal Lake and local markets',
      'Day 3: Garden and shikara ride',
      'Day 4: Pahalgam excursion',
      'Day 5: Sonmarg exploration',
      'Day 6: Departure'
    ],
    reviews: [
      { user: 'Megha', rating: 5, review: 'Scenic and peaceful. The houseboat stay was unforgettable.' },
      { user: 'Arjun', rating: 5, review: 'Perfect getaway for family and nature lovers.' }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    rating: 4.8,
    duration: '5 Days / 4 Nights',
    price: 79999,
    image: 'images/santroni.jpg',
    category: 'Honeymoon',
    description:
      'Sail through whitewashed villages, volcanic cliffs, and dreamy sunsets over the Aegean Sea.',
    bestTime: 'May - September',
    activities: ['Sunset cruise', 'Wine tasting', 'Caldera views', 'Village walk'],
    hotel: 'Sunset Blue Villas',
    inclusions: ['Flight', 'Hotel', 'Breakfast', 'Private transfers'],
    itinerary: [
      'Day 1: Arrival and caldera evening',
      'Day 2: Village and beach exploring',
      'Day 3: Sunset cruise',
      'Day 4: Wine tasting and shopping',
      'Day 5: Departure'
    ],
    reviews: [
      { user: 'Ananya', rating: 5, review: 'It felt like a dreamy honeymoon destination.' },
      { user: 'Rohan', rating: 4, review: 'Stunning sunset views and excellent service.' }
    ]
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    rating: 4.9,
    duration: '4 Days / 3 Nights',
    price: 84999,
    image: 'images/bgc.jpg',
    category: 'Luxury',
    description:
      'Walk through romantic streets, iconic monuments, cafés, and world-class museums in Paris.',
    bestTime: 'May - October',
    activities: ['Eiffel Tower visit', 'Museum day', 'Seine cruise', 'Shopping'],
    hotel: 'Champ de Paris Hotel',
    inclusions: ['Hotel', 'Breakfast', 'City passes', 'Transfers'],
    itinerary: [
      'Day 1: Arrival & Eiffel Tower',
      'Day 2: Louvre and Seine cruise',
      'Day 3: Montmartre and shopping',
      'Day 4: Departure'
    ],
    reviews: [
      { user: 'Aditya', rating: 5, review: 'Paris was romantic and beautifully organized.' },
      { user: 'Nisha', rating: 5, review: 'Worth every penny! The itinerary was perfect.' }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    rating: 4.7,
    duration: '4 Days / 3 Nights',
    price: 24999,
    image: 'images/bali.jpg',
    category: 'Beach',
    description:
      'Relax on sun-kissed beaches, enjoy vibrant nightlife, and experience Goa’s coast at its best.',
    bestTime: 'October - March',
    activities: ['Beach walk', 'Nightlife', 'Water sports', 'Fort visit'],
    hotel: 'Sunset Beach Stay',
    inclusions: ['Hotel', 'Breakfast', 'Beach transfers', 'Local guide'],
    itinerary: [
      'Day 1: Arrival and beach club evening',
      'Day 2: Water sports and nightlife',
      'Day 3: Fort and local tour',
      'Day 4: Departure'
    ],
    reviews: [
      { user: 'Tanvi', rating: 5, review: 'Great break with beach vibes and amazing food.' },
      { user: 'Harsh', rating: 4, review: 'Nice, relaxed, and fun destination.' }
    ]
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    rating: 4.8,
    duration: '5 Days / 4 Nights',
    price: 32999,
    image: 'images/kasmir.jpg',
    category: 'Adventure',
    description:
      'Escape to the mountains for snowy landscapes, riverside views, and memorable Himalayan adventures.',
    bestTime: 'October - February',
    activities: ['Snow activities', 'River rafting', 'Cable car', 'Nature walk'],
    hotel: 'Himalayan Retreat',
    inclusions: ['Hotel', 'Meals', 'Transfers', 'Sightseeing'],
    itinerary: [
      'Day 1: Arrival and local walk',
      'Day 2: Snow adventure and café tour',
      'Day 3: River rafting and landscape exploration',
      'Day 4: Cafe and shopping',
      'Day 5: Departure'
    ],
    reviews: [
      { user: 'Pooja', rating: 5, review: 'Lovely weather, stunning greenery and a relaxing stay.' },
      { user: 'Deepak', rating: 4, review: 'Excellent mountain getaway for friends.' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    rating: 4.9,
    duration: '4 Days / 3 Nights',
    price: 75999,
    image: 'images/dubai.jpg',
    category: 'Family',
    description:
      'Experience clean cityscapes, iconic gardens, futuristic attractions, and diverse cuisine in Singapore.',
    bestTime: 'June - August',
    activities: ['Garden by the Bay', 'Sentosa', 'Night Safari', 'Food market'],
    hotel: 'Marina Horizon Hotel',
    inclusions: ['Hotel stay', 'Breakfast', 'City transport', 'Tour pass'],
    itinerary: [
      'Day 1: Arrival and city tour',
      'Day 2: Sentosa and theme parks',
      'Day 3: Night safari and local dining',
      'Day 4: Departure'
    ],
    reviews: [
      { user: 'Nitin', rating: 5, review: 'Clean, modern, and packed with exceptional experiences.' },
      { user: 'Rhea', rating: 5, review: 'A smooth family trip with lots to do every day.' }
    ]
  }
];

const packages = [
  {
    id: 'pkg-bali',
    destination: 'Bali',
    title: 'Bali Adventure',
    category: 'Beach',
    price: 45999,
    originalPrice: 55999,
    rating: 4.9,
    duration: '5 Days / 4 Nights',
    discount: 18,
    services: ['Beach resort', 'Breakfast', 'Airport transfer', 'Temple tour'],
    image: 'images/bali.jpg'
  },
  {
    id: 'pkg-maldives',
    destination: 'Maldives',
    title: 'Maldives Escape',
    category: 'Luxury',
    price: 69999,
    originalPrice: 81999,
    rating: 4.8,
    duration: '4 Days / 3 Nights',
    discount: 15,
    services: ['Water villa', 'Snorkelling', 'Spa', 'Private transfer'],
    image: 'images/maldives.jpg'
  },
  {
    id: 'pkg-switzerland',
    destination: 'Switzerland',
    title: 'Swiss Alps Tour',
    category: 'Adventure',
    price: 89999,
    originalPrice: 102999,
    rating: 4.9,
    duration: '7 Days / 6 Nights',
    discount: 13,
    services: ['Mountain rail', 'Hotel', 'Sightseeing', 'Swiss pass'],
    image: 'images/swizerland.jpg'
  },
  {
    id: 'pkg-dubai',
    destination: 'Dubai',
    title: 'Dubai Luxury Break',
    category: 'Luxury',
    price: 55999,
    originalPrice: 66999,
    rating: 4.8,
    duration: '3 Days / 2 Nights',
    discount: 17,
    services: ['Desert safari', 'City tour', 'Breakfast', 'Airport pickup'],
    image: 'images/dubai.jpg'
  },
  {
    id: 'pkg-kashmir',
    destination: 'Kashmir',
    title: 'Kashmir Bliss',
    category: 'Family',
    price: 29999,
    originalPrice: 36999,
    rating: 4.9,
    duration: '6 Days / 5 Nights',
    discount: 19,
    services: ['Houseboat', 'Sightseeing', 'Meals', 'Shikara ride'],
    image: 'images/kasmir.jpg'
  },
  {
    id: 'pkg-santorini',
    destination: 'Santorini',
    title: 'Santorini Romance',
    category: 'Honeymoon',
    price: 79999,
    originalPrice: 92999,
    rating: 4.8,
    duration: '5 Days / 4 Nights',
    discount: 14,
    services: ['Sunset cruise', 'Wine tasting', 'Hotel', 'Transfers'],
    image: 'images/santroni.jpg'
  }
];

const offers = [
  {
    title: 'Summer Escape',
    originalPrice: 74999,
    finalPrice: 52999,
    discount: '29% OFF',
    validity: 'Valid until 30 Nov 2026',
    code: 'SUMMER29'
  },
  {
    title: 'Sea & Sand Sale',
    originalPrice: 67999,
    finalPrice: 46999,
    discount: '31% OFF',
    validity: 'Valid until 15 Dec 2026',
    code: 'SEASAND'
  },
  {
    title: 'Couple Special',
    originalPrice: 89999,
    finalPrice: 62999,
    discount: '30% OFF',
    validity: 'Valid until 20 Dec 2026',
    code: 'COUPLE30'
  }
];

const galleryImages = [
  { img: 'images/bali.jpg', title: 'Bali' },
  { img: 'images/maldives.jpg', title: 'Maldives' },
  { img: 'images/swizerland.jpg', title: 'Switzerland' },
  { img: 'images/dubai.jpg', title: 'Dubai' },
  { img: 'images/kasmir.jpg', title: 'Kashmir' },
  { img: 'images/santroni.jpg', title: 'Santorini' }
];

const defaultReviews = [
  { user: 'Rahul Sharma', rating: 5, destination: 'Bali', review: 'Everything was perfectly organized and the experience felt premium.' },
  { user: 'Priya Patel', rating: 5, destination: 'Maldives', review: 'Beautiful beaches and a memorable stay. Highly recommended.' },
  { user: 'Amit Verma', rating: 5, destination: 'Switzerland', review: 'The trip was smooth, scenic and incredibly well planned.' }
];

const storageKeys = {
  theme: 'globevista-theme',
  auth: 'globevista-auth',
  favorites: 'globevista-favorites',
  bookings: 'globevista-bookings',
  reviews: 'globevista-reviews',
  users: 'globevista-users'
};

const state = {
  auth: JSON.parse(localStorage.getItem(storageKeys.auth) || 'null'),
  favorites: JSON.parse(localStorage.getItem(storageKeys.favorites) || '[]'),
  bookings: JSON.parse(localStorage.getItem(storageKeys.bookings) || '[]'),
  reviews: JSON.parse(localStorage.getItem(storageKeys.reviews) || 'null') || defaultReviews,
  users: JSON.parse(localStorage.getItem(storageKeys.users) || '[]')
};

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatCurrency(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function getCurrentUser() {
  return state.auth || null;
}

function updateAuthUI() {
  const authButtons = document.getElementById('authButtons');
  const userActions = document.getElementById('userActions');
  const user = getCurrentUser();

  if (user) {
    authButtons.style.display = 'none';
    userActions.style.display = 'flex';
  } else {
    authButtons.style.display = 'flex';
    userActions.style.display = 'none';
  }
}

function setTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  const icon = document.getElementById('themeToggle');
  if (icon) icon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem(storageKeys.theme, theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(storageKeys.theme) || 'light';
  setTheme(savedTheme);
}

function getDestinationById(id) {
  return destinations.find((item) => item.id === id) || null;
}

function renderDestinations(searchTerm = '') {
  const container = document.getElementById('destinationContainer');
  if (!container) return;

  const filtered = destinations.filter((destination) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      destination.name.toLowerCase().includes(term) ||
      destination.country.toLowerCase().includes(term) ||
      destination.description.toLowerCase().includes(term)
    );
  });

  if (!filtered.length) {
    container.innerHTML = '<div class="section-title" style="width:100%"><h3>No matching destinations found.</h3></div>';
    return;
  }

  container.innerHTML = filtered
    .map(
      (destination) => `
        <div class="card" data-id="${destination.id}">
          <img src="${destination.image}" alt="${destination.name}" />
          <div class="card-content">
            <h3>${destination.name}</h3>
            <div class="country">${destination.country}</div>
            <div class="rating">⭐ ${destination.rating.toFixed(1)} | ${destination.duration}</div>
            <div class="duration">${destination.bestTime}</div>
            <div class="price">
              <span>${formatCurrency(destination.price)}</span>
              <button class="favorite-btn ${state.favorites.includes(destination.id) ? 'active' : ''}" data-favorite-id="${destination.id}" aria-label="Favorite destination">
                ${state.favorites.includes(destination.id) ? '♥' : '♡'}
              </button>
            </div>
            <button class="explore-card-btn" data-destination-id="${destination.id}">Explore</button>
          </div>
        </div>
      `
    )
    .join('');
}

function renderPackages() {
  const container = document.getElementById('packageContainer');
  if (!container) return;

  const destinationFilter = document.getElementById('destinationFilter')?.value || 'all';
  const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
  const priceFilter = document.getElementById('priceFilter')?.value || 'all';
  const durationFilter = document.getElementById('durationFilter')?.value || 'all';
  const sort = document.querySelector('.sort-btn.active')?.dataset.sort || 'default';

  let filtered = [...packages];

  if (destinationFilter !== 'all') filtered = filtered.filter((item) => item.destination === destinationFilter);
  if (categoryFilter !== 'all') filtered = filtered.filter((item) => item.category === categoryFilter);

  if (priceFilter === 'low') filtered = filtered.filter((item) => item.price <= 50000);
  if (priceFilter === 'mid') filtered = filtered.filter((item) => item.price > 50000 && item.price <= 80000);
  if (priceFilter === 'high') filtered = filtered.filter((item) => item.price > 80000);

  if (durationFilter === 'short') filtered = filtered.filter((item) => item.duration.includes('1') || item.duration.includes('3') || item.duration.includes('4'));
  if (durationFilter === 'medium') filtered = filtered.filter((item) => item.duration.includes('5') || item.duration.includes('6') || item.duration.includes('7'));
  if (durationFilter === 'long') filtered = filtered.filter((item) => item.duration.includes('8') || item.duration.includes('9'));

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  if (!filtered.length) {
    container.innerHTML = '<div class="section-title" style="width:100%"><h3>No packages match your filters.</h3></div>';
    return;
  }

  container.innerHTML = filtered
    .map(
      (pkg) => `
        <div class="package-card">
          <img src="${pkg.image}" alt="${pkg.title}" />
          <div class="package-content">
            <h3>${pkg.title}</h3>
            <div class="package-meta">${pkg.destination} • ${pkg.duration}</div>
            <div class="rating">⭐ ${pkg.rating.toFixed(1)}</div>
            <div class="package-price-section">
              <div>
                <div class="original-price">${formatCurrency(pkg.originalPrice)}</div>
                <div class="discount">-${pkg.discount}%</div>
              </div>
              <span>${formatCurrency(pkg.price)}</span>
            </div>
            <div class="btn-group">
              <button class="package-book-btn" data-package-id="${pkg.id}">Book Now</button>
              <button class="package-detail-btn" data-package-id="${pkg.id}">View Details</button>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderOffers() {
  const container = document.getElementById('offersContainer');
  if (!container) return;

  container.innerHTML = offers
    .map(
      (offer) => `
        <div class="offer-card">
          <h3>${offer.title}</h3>
          <div class="original-price">${formatCurrency(offer.originalPrice)}</div>
          <div class="discount-tag">${offer.discount}</div>
          <div class="final-price">${formatCurrency(offer.finalPrice)}</div>
          <div class="validity">${offer.validity}</div>
          <div class="offer-code">Use code: ${offer.code}</div>
          <button class="btn-offer" data-offer-code="${offer.code}">Book Now</button>
        </div>
      `
    )
    .join('');
}

function renderGallery() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  container.innerHTML = galleryImages
    .map(
      (image) => `
        <div class="gallery-card" data-gallery-title="${image.title}">
          <img src="${image.img}" alt="${image.title}" />
          <div class="overlay">
            <h3>${image.title}</h3>
            <p>Explore more</p>
          </div>
        </div>
      `
    )
    .join('');
}

function renderReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container) return;

  const allReviews = state.reviews || defaultReviews;

  container.innerHTML = allReviews
    .map(
      (item) => `
        <div class="testimonial-card">
          <img src="images/rahul.jpeg" alt="${item.user}" />
          <h3>${item.user}</h3>
          <div class="verified">✓ Verified booking</div>
          <span>${'⭐'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</span>
          <p><strong>${item.destination}</strong> — ${item.review}</p>
        </div>
      `
    )
    .join('');
}

function renderDashboard() {
  const profileCard = document.getElementById('profileCard');
  const upcomingTrips = document.getElementById('upcomingTrips');
  const previousTrips = document.getElementById('previousTrips');
  const favoritesGrid = document.getElementById('favoritesGrid');
  const dashboardSection = document.getElementById('dashboard');

  const user = getCurrentUser();
  if (!user) {
    if (dashboardSection) dashboardSection.style.display = 'none';
    return;
  }

  if (profileCard) {
    profileCard.innerHTML = `
      <div class="avatar">${user.name.charAt(0).toUpperCase()}</div>
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Member: Premium traveler</p>
      <button class="form-btn edit-btn" type="button">Edit Profile</button>
    `;
  }

  const upcoming = state.bookings.filter((booking) => new Date(booking.date) >= new Date());
  const previous = state.bookings.filter((booking) => new Date(booking.date) < new Date());

  if (upcomingTrips) {
    upcomingTrips.innerHTML = upcoming.length
      ? upcoming
          .map(
            (booking) => `
              <div class="trip-card">
                <div class="trip-status upcoming">Upcoming</div>
                <h3>${booking.destination}</h3>
                <div class="trip-info">
                  <span>Booking ID: ${booking.id}</span>
                  <span>Date: ${booking.date}</span>
                  <span>Travelers: ${booking.travelers}</span>
                  <span>Total: ${formatCurrency(booking.total)}</span>
                </div>
                <div class="trip-actions">
                  <button class="view-btn" data-booking-id="${booking.id}">View</button>
                  <button class="cancel-btn" data-cancel-id="${booking.id}">Cancel</button>
                </div>
              </div>
            `
          )
          .join('')
      : '<div class="section-title"><h3>No upcoming trips yet.</h3></div>';
  }

  if (previousTrips) {
    previousTrips.innerHTML = previous.length
      ? previous
          .map(
            (booking) => `
              <div class="trip-card">
                <div class="trip-status completed">Completed</div>
                <h3>${booking.destination}</h3>
                <div class="trip-info">
                  <span>Booking ID: ${booking.id}</span>
                  <span>Date: ${booking.date}</span>
                  <span>Travelers: ${booking.travelers}</span>
                  <span>Total: ${formatCurrency(booking.total)}</span>
                </div>
                <div class="trip-actions">
                  <button class="view-btn" data-booking-id="${booking.id}">View</button>
                </div>
              </div>
            `
          )
          .join('')
      : '<div class="section-title"><h3>No previous trips yet.</h3></div>';
  }

  if (favoritesGrid) {
    const favoriteDestinations = destinations.filter((destination) => state.favorites.includes(destination.id));
    favoritesGrid.innerHTML = favoriteDestinations.length
      ? favoriteDestinations
          .map(
            (item) => `
              <div class="favorite-card">
                <img src="${item.image}" alt="${item.name}" />
                <div class="favorite-card-content">
                  <h3>${item.name}</h3>
                  <p>${item.country}</p>
                  <div class="price">${formatCurrency(item.price)}</div>
                  <button class="remove-btn" data-remove-favorite="${item.id}">Remove</button>
                </div>
              </div>
            `
          )
          .join('')
      : '<div class="section-title"><h3>No favorites yet.</h3></div>';
  }
}

function openDashboard() {
  const dashboard = document.getElementById('dashboard');
  const user = getCurrentUser();
  if (!user) {
    openAuthModal('login');
    return;
  }
  dashboard.style.display = 'block';
  document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  renderDashboard();
}

function openAuthModal(mode = 'login') {
  const authContent = document.getElementById('authContent');
  authContent.innerHTML = `
    <div class="auth-tabs" style="display:flex; gap:10px; margin-bottom:25px;">
      <button class="button ${mode === 'login' ? 'active' : ''}" data-mode="login" style="flex:1; ${mode === 'login' ? 'background:#0a66c2' : 'background:#64748b'}">Login</button>
      <button class="button ${mode === 'signup' ? 'active' : ''}" data-mode="signup" style="flex:1; ${mode === 'signup' ? 'background:#0a66c2' : 'background:#64748b'}">Sign Up</button>
    </div>

    ${mode === 'login' ? `
      <form id="loginForm">
        <div class="form-group">
          <label for="loginEmail">Email</label>
          <input id="loginEmail" type="email" required placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="loginPassword">Password</label>
          <input id="loginPassword" type="password" required placeholder="Enter your password" />
        </div>
        <button type="submit" class="form-btn">Login</button>
        <div class="form-group" style="margin-top:20px;">
          <button type="button" class="button" id="forgotPasswordBtn" style="background:#ff7a00">Forgot Password</button>
        </div>
      </form>
    ` : `
      <form id="signupForm">
        <div class="form-group">
          <label for="signupName">Full Name</label>
          <input id="signupName" type="text" required placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label for="signupEmail">Email</label>
          <input id="signupEmail" type="email" required placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="signupPassword">Password</label>
          <input id="signupPassword" type="password" required placeholder="Create a password" />
        </div>
        <button type="submit" class="form-btn">Create Account</button>
      </form>
    `}
  `;

  openModal('authModal');
}

function handleSignUp(event) {
  event.preventDefault();
  const name = document.getElementById('signupName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const password = document.getElementById('signupPassword')?.value.trim();

  if (!name || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  const existingUser = state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    alert('An account with this email already exists. Please login.');
    openAuthModal('login');
    return;
  }

  const newUser = { name, email, password };
  state.users.push(newUser);
  saveToStorage(storageKeys.users, state.users);
  state.auth = { name, email };
  saveToStorage(storageKeys.auth, state.auth);
  closeModal('authModal');
  updateAuthUI();
  renderDashboard();
  alert('Signup successful!');
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();

  const user = state.users.find(
    (storedUser) => storedUser.email.toLowerCase() === email.toLowerCase() && storedUser.password === password
  );

  if (!user) {
    alert('Invalid credentials. Please check your email and password.');
    return;
  }

  state.auth = { name: user.name, email: user.email };
  saveToStorage(storageKeys.auth, state.auth);
  closeModal('authModal');
  updateAuthUI();
  renderDashboard();
  alert('Login successful!');
}

function handleForgotPassword() {
  const email = prompt('Enter your email to receive password reset instructions:');
  if (!email) return;
  alert(`Password reset demo: a reset link would be sent to ${email}.`);
}

function handleLogout() {
  state.auth = null;
  localStorage.removeItem(storageKeys.auth);
  updateAuthUI();
  const dashboard = document.getElementById('dashboard');
  if (dashboard) dashboard.style.display = 'none';
  alert('Logged out successfully.');
}

function toggleFavorite(destinationId) {
  const index = state.favorites.indexOf(destinationId);
  if (index >= 0) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(destinationId);
  }
  saveToStorage(storageKeys.favorites, state.favorites);
  renderDestinations(document.getElementById('destination-input')?.value || '');
  renderDashboard();
}

function handleDestinationDetailOpen(destinationId) {
  const destination = getDestinationById(destinationId);
  if (!destination) return;

  const detailContent = document.getElementById('detailContent');
  detailContent.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:start; gap:20px; margin-bottom:20px;">
      <div>
        <h2>${destination.name}</h2>
        <p style="color:#64748b; margin-top:5px;">${destination.country}</p>
      </div>
      <button class="button" data-book-destination="${destination.id}">Book Now</button>
    </div>

    <img src="${destination.image}" alt="${destination.name}" style="width:100%; height:260px; object-fit:cover; border-radius:16px; margin-bottom:20px;" />
    <p style="color:#64748b; line-height:1.8; margin-bottom:20px;">${destination.description}</p>

    <div style="display:grid; grid-template-columns: repeat(2, minmax(120px, 1fr)); gap:15px; margin-bottom:20px;">
      <div><strong>Rating</strong><br />⭐ ${destination.rating.toFixed(1)}</div>
      <div><strong>Price</strong><br />${formatCurrency(destination.price)}</div>
      <div><strong>Duration</strong><br />${destination.duration}</div>
      <div><strong>Best Time</strong><br />${destination.bestTime}</div>
    </div>

    <div style="margin-bottom:20px;">
      <h3>Activities</h3>
      <ul>
        ${destination.activities.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom:20px;">
      <h3>Hotel</h3>
      <p>${destination.hotel}</p>
    </div>

    <div style="margin-bottom:20px;">
      <h3>Inclusions</h3>
      <ul>
        ${destination.inclusions.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom:20px;">
      <h3>Itinerary</h3>
      <ol>
        ${destination.itinerary.map((item) => `<li>${item}</li>`).join('')}
      </ol>
    </div>

    <div style="margin-bottom:20px;">
      <h3>Reviews</h3>
      ${destination.reviews
        .map(
          (review) => `
            <div style="background:#f8fafc; border-radius:8px; padding:12px; margin-bottom:10px;">
              <strong>${review.user}</strong> — ${'⭐'.repeat(review.rating)}
              <p>${review.review}</p>
            </div>
          `
        )
        .join('')}
    </div>
  `;

  openModal('detailModal');
}

function openBookingModal(destinationName = '') {
  const bookingContent = document.getElementById('bookingContent');
  const defaultDestination = destinationName || (document.getElementById('destination-input')?.value || '');

  bookingContent.innerHTML = `
    <h2>Book Your Trip</h2>
    <form id="bookingForm">
      <div class="form-group">
        <label for="bookingName">Full Name</label>
        <input id="bookingName" type="text" required value="${getCurrentUser()?.name || ''}" />
      </div>
      <div class="form-group">
        <label for="bookingEmail">Email</label>
        <input id="bookingEmail" type="email" required value="${getCurrentUser()?.email || ''}" />
      </div>
      <div class="form-group">
        <label for="bookingPhone">Phone</label>
        <input id="bookingPhone" type="tel" required placeholder="Enter phone number" />
      </div>
      <div class="form-group">
        <label for="bookingDestination">Destination</label>
        <input id="bookingDestination" type="text" required value="${defaultDestination}" />
      </div>
      <div class="form-group">
        <label for="bookingDate">Travel Date</label>
        <input id="bookingDate" type="date" required />
      </div>
      <div class="form-group">
        <label for="bookingTravelers">Number of Travelers</label>
        <select id="bookingTravelers" required>
          <option value="1">1 Traveler</option>
          <option value="2">2 Travelers</option>
          <option value="3">3 Travelers</option>
          <option value="4">4 Travelers</option>
          <option value="5">5 Travelers</option>
        </select>
      </div>
      <div class="form-group">
        <label for="bookingRequests">Special Requests</label>
        <textarea id="bookingRequests" rows="3" placeholder="Optional requests"></textarea>
      </div>
      <button type="submit" class="form-btn">Confirm Booking</button>
    </form>
  `;

  openModal('bookingModal');
}

function createBookingFromForm(event) {
  event.preventDefault();
  const name = document.getElementById('bookingName').value.trim();
  const email = document.getElementById('bookingEmail').value.trim();
  const phone = document.getElementById('bookingPhone').value.trim();
  const destination = document.getElementById('bookingDestination').value.trim();
  const date = document.getElementById('bookingDate').value;
  const travelers = document.getElementById('bookingTravelers').value;
  const requests = document.getElementById('bookingRequests').value.trim();

  if (!name || !email || !phone || !destination || !date) {
    alert('Please complete all required booking details.');
    return;
  }

  const selectedDestination = getDestinationById(destination.toLowerCase().replace(/\s+/g, '')) ||
    destinations.find((item) => item.name.toLowerCase() === destination.toLowerCase());

  const total = (selectedDestination ? selectedDestination.price : 49999) * Number(travelers);
  const booking = {
    id: `GV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    name,
    email,
    phone,
    destination,
    date,
    travelers,
    requests,
    total,
    status: 'confirmed'
  };

  state.bookings.unshift(booking);
  saveToStorage(storageKeys.bookings, state.bookings);

  closeModal('bookingModal');
  showBookingConfirmation(booking);
  renderDashboard();
}

function showBookingConfirmation(booking) {
  const confirmation = document.createElement('div');
  confirmation.className = 'modal active';
  confirmation.id = 'confirmationModal';
  confirmation.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" data-close-confirmation>×</button>
      <h2>Booking Confirmed ✓</h2>
      <p><strong>Booking ID:</strong> ${booking.id}</p>
      <p><strong>Destination:</strong> ${booking.destination}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Travelers:</strong> ${booking.travelers}</p>
      <p><strong>Total Price:</strong> ${formatCurrency(booking.total)}</p>
      <button class="form-btn" id="downloadTicketBtn">Download Ticket</button>
    </div>
  `;

  document.body.appendChild(confirmation);

  confirmation.querySelector('[data-close-confirmation]').addEventListener('click', () => {
    confirmation.remove();
  });

  confirmation.querySelector('#downloadTicketBtn').addEventListener('click', () => {
    const ticketText = `GlobeVista Booking Confirmation\nBooking ID: ${booking.id}\nDestination: ${booking.destination}\nDate: ${booking.date}\nTravelers: ${booking.travelers}\nTotal: ${formatCurrency(booking.total)}\nCustomer: ${booking.name}`;
    const blob = new Blob([ticketText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GlobeVista-Ticket-${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

function handleSearch() {
  const destinationInput = document.getElementById('destination-input');
  const checkinInput = document.getElementById('checkin-input');
  const checkoutInput = document.getElementById('checkout-input');
  const guestSelect = document.getElementById('guests-select');
  const message = document.getElementById('searchMessage');

  const destination = destinationInput.value.trim();
  const checkin = checkinInput.value;
  const checkout = checkoutInput.value;
  const travelers = guestSelect.value;

  if (!destination) {
    message.textContent = '⚠️ Please enter a destination';
    message.className = 'search-message error';
    return;
  }

  if (!checkin || !checkout) {
    message.textContent = '⚠️ Please select both check-in and check-out dates';
    message.className = 'search-message error';
    return;
  }

  renderDestinations(destination);
  message.textContent = `✅ Showing trips for "${destination}" from ${checkin} to ${checkout} for ${travelers}`;
  message.className = 'search-message success';

  document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
}

function bindNavEvents() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.getElementById('hamburger')?.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
  });

  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const selector = button.getAttribute('data-scroll-target');
      const element = document.querySelector(selector);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.getElementById('goToTopBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  document.getElementById('dashboardBtn')?.addEventListener('click', openDashboard);
  document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
  document.getElementById('closeDashboardBtn')?.addEventListener('click', () => {
    document.getElementById('dashboard').style.display = 'none';
  });

  document.querySelectorAll('[data-open-auth]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-open-auth');
      openAuthModal(mode);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  document.getElementById('searchBtn')?.addEventListener('click', handleSearch);
  document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);
  document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
  document.getElementById('signupForm')?.addEventListener('submit', handleSignUp);
  document.getElementById('forgotPasswordBtn')?.addEventListener('click', handleForgotPassword);
  document.getElementById('bookingForm')?.addEventListener('submit', createBookingFromForm);
  document.getElementById('reviewForm')?.addEventListener('submit', handleReviewSubmit);

  document.querySelectorAll('.sort-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderPackages();
    });
  });

  ['destinationFilter', 'categoryFilter', 'priceFilter', 'durationFilter'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', renderPackages);
  });

  document.addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('[data-favorite-id]');
    if (favoriteButton) {
      toggleFavorite(favoriteButton.getAttribute('data-favorite-id'));
      return;
    }

    const destinationButton = event.target.closest('[data-destination-id]');
    if (destinationButton) {
      handleDestinationDetailOpen(destinationButton.getAttribute('data-destination-id'));
      return;
    }

    const packageBookButton = event.target.closest('[data-package-id]');
    if (packageBookButton) {
      const id = packageBookButton.getAttribute('data-package-id');
      const pkg = packages.find((item) => item.id === id);
      if (pkg) openBookingModal(pkg.destination);
      return;
    }

    const detailButton = event.target.closest('[data-book-destination]');
    if (detailButton) {
      const destinationId = detailButton.getAttribute('data-book-destination');
      const dest = getDestinationById(destinationId);
      if (dest) openBookingModal(dest.name);
      closeModal('detailModal');
      return;
    }

    const offerButton = event.target.closest('[data-offer-code]');
    if (offerButton) {
      const code = offerButton.getAttribute('data-offer-code');
      alert(`Offer applied! Use code ${code} during checkout.`);
      return;
    }

    const galleryCard = event.target.closest('.gallery-card');
    if (galleryCard) {
      const title = galleryCard.getAttribute('data-gallery-title');
      const item = galleryImages.find((img) => img.title === title);
      if (item) {
        document.getElementById('lightboxImage').src = item.img;
        document.getElementById('lightboxTitle').textContent = item.title;
        openModal('galleryLightbox');
      }
      return;
    }

    const removeFavorite = event.target.closest('[data-remove-favorite]');
    if (removeFavorite) {
      const id = removeFavorite.getAttribute('data-remove-favorite');
      toggleFavorite(id);
      return;
    }

    const cancelBooking = event.target.closest('[data-cancel-id]');
    if (cancelBooking) {
      const id = cancelBooking.getAttribute('data-cancel-id');
      state.bookings = state.bookings.filter((booking) => booking.id !== id);
      saveToStorage(storageKeys.bookings, state.bookings);
      renderDashboard();
      return;
    }

    const dashboardTab = event.target.closest('.dashboard-tab');
    if (dashboardTab) {
      const tab = dashboardTab.getAttribute('data-tab');
      document.querySelectorAll('.dashboard-tab').forEach((button) => button.classList.remove('active'));
      dashboardTab.classList.add('active');
      document.querySelectorAll('.dashboard-section').forEach((section) => section.classList.remove('active'));
      const matchingTab = document.getElementById(`${tab}Tab`);
      if (matchingTab) matchingTab.classList.add('active');
      return;
    }

    const viewBooking = event.target.closest('[data-booking-id]');
    if (viewBooking) {
      const bookingId = viewBooking.getAttribute('data-booking-id');
      const booking = state.bookings.find((item) => item.id === bookingId);
      if (booking) showBookingConfirmation(booking);
      return;
    }
  });

  document.getElementById('closeGallery')?.addEventListener('click', () => closeModal('galleryLightbox'));
  document.getElementById('galleryLightbox')?.addEventListener('click', (event) => {
    if (event.target === document.getElementById('galleryLightbox')) closeModal('galleryLightbox');
  });

  window.addEventListener('scroll', () => {
    const btn = document.getElementById('goToTopBtn');
    if (window.scrollY > 300) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    alert('Please login to submit a review.');
    openAuthModal('login');
    return;
  }

  const destination = document.getElementById('reviewDestination').value;
  const rating = Number(document.getElementById('reviewRating').value);
  const message = document.getElementById('reviewMessage').value.trim();

  if (!destination || !message) {
    alert('Please complete all review fields.');
    return;
  }

  const newReview = {
    user: user.name,
    rating,
    destination,
    review: message
  };

  state.reviews.unshift(newReview);
  saveToStorage(storageKeys.reviews, state.reviews);
  renderReviews();

  document.getElementById('reviewForm').reset();
  const box = document.getElementById('reviewMessageBox');
  box.textContent = '✅ Review submitted successfully!';
  box.className = 'form-message success';
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  let valid = true;

  document.getElementById('contactNameError').textContent = '';
  document.getElementById('contactEmailError').textContent = '';
  document.getElementById('contactSubjectError').textContent = '';
  document.getElementById('contactMessageError').textContent = '';

  if (name.length < 3) {
    document.getElementById('contactNameError').textContent = 'Name must be at least 3 characters.';
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('contactEmailError').textContent = 'Please enter a valid email.';
    valid = false;
  }

  if (!subject) {
    document.getElementById('contactSubjectError').textContent = 'Subject is required.';
    valid = false;
  }

  if (message.length < 10) {
    document.getElementById('contactMessageError').textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  const box = document.getElementById('contactFormMessage');
  box.textContent = '✅ Your message has been sent successfully!';
  box.className = 'form-message success';
  document.getElementById('contactForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderDestinations();
  renderPackages();
  renderOffers();
  renderGallery();
  renderReviews();
  renderDashboard();
  updateAuthUI();
  bindNavEvents();
  document.getElementById('destination-input').addEventListener('input', (event) => {
    renderDestinations(event.target.value);
  });
});

window.addEventListener('click', (event) => {
  const modal = event.target.closest('.modal');
  if (modal && event.target === modal) {
    modal.classList.remove('active');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach((modal) => modal.classList.remove('active'));
    document.getElementById('galleryLightbox').classList.remove('active');
  }
});
