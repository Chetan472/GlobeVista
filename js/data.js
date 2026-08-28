// ============================================
// GLOBEVISTA DATA STRUCTURES
// ============================================

// Destinations Data
const destinations = [
  {
    id: 1,
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.9,
    reviews: 1240,
    description: 'Bali is a tropical paradise with stunning beaches, ancient temples, and vibrant culture. Perfect for adventure seekers and beach lovers.',
    image: 'images/bali.jpg',
    startingPrice: 45999,
    travelType: 'Beach',
    bestTime: 'April - October',
    attractions: [
      'Ubud Monkey Forest',
      'Tegallalang Rice Terraces',
      'Mount Batur',
      'Tanah Lot Temple',
      'Seminyak Beach'
    ],
    activities: [
      'Surfing',
      'Scuba Diving',
      'Yoga Retreat',
      'Temple Tours',
      'Spa & Wellness'
    ],
    hotels: [
      { name: 'Ubud Resort', price: 5000, rating: 4.8 },
      { name: 'Seminyak Beach Hotel', price: 6500, rating: 4.7 },
      { name: 'Luxury Villa Bali', price: 12000, rating: 4.9 }
    ],
    budget: '₹45,999 - ₹150,000 per person',
    gallery: ['images/bali.jpg']
  },
  {
    id: 2,
    name: 'Maldives',
    country: 'Maldives',
    rating: 4.8,
    reviews: 980,
    description: 'Tropical island nation with crystal clear waters, world-class resorts, and pristine white-sand beaches. Ideal for honeymoons and luxury travel.',
    image: 'images/maldives.jpg',
    startingPrice: 69999,
    travelType: 'Honeymoon',
    bestTime: 'November - April',
    attractions: [
      'Male City Tour',
      'Artificial Beach',
      'Coral Reefs',
      'Water Sports',
      'Island Hopping'
    ],
    activities: [
      'Snorkeling',
      'Diving',
      'Water Sports',
      'Sunset Cruise',
      'Spa Treatment'
    ],
    hotels: [
      { name: 'Paradise Island Resort', price: 25000, rating: 4.9 },
      { name: 'Luxury Overwater Bungalow', price: 45000, rating: 5.0 },
      { name: 'Resort Island Stay', price: 18000, rating: 4.7 }
    ],
    budget: '₹69,999 - ₹250,000 per person',
    gallery: ['images/maldives.jpg']
  },
  {
    id: 3,
    name: 'Switzerland',
    country: 'Switzerland',
    rating: 4.9,
    reviews: 1100,
    description: 'Alpine wonderland with majestic mountains, pristine lakes, and charming villages. Perfect for nature lovers and adventure enthusiasts.',
    image: 'images/swizerland.jpg',
    startingPrice: 89999,
    travelType: 'Adventure',
    bestTime: 'June - September',
    attractions: [
      'Matterhorn',
      'Jungfrau',
      'Swiss Lakes',
      'Interlaken',
      'Grindelwald'
    ],
    activities: [
      'Hiking',
      'Mountain Climbing',
      'Paragliding',
      'Train Rides',
      'Scenic Photography'
    ],
    hotels: [
      { name: 'Mountain Resort Interlaken', price: 8000, rating: 4.8 },
      { name: 'Luxury Chalet', price: 15000, rating: 4.9 },
      { name: 'Swiss Hotel Zermatt', price: 10000, rating: 4.7 }
    ],
    budget: '₹89,999 - ₹300,000 per person',
    gallery: ['images/swizerland.jpg']
  },
  {
    id: 4,
    name: 'Dubai',
    country: 'UAE',
    rating: 4.8,
    reviews: 1450,
    description: 'Modern metropolis blending luxury, shopping, and desert adventures. Home to iconic landmarks and world-class entertainment.',
    image: 'images/dubai.jpg',
    startingPrice: 55999,
    travelType: 'Luxury',
    bestTime: 'October - April',
    attractions: [
      'Burj Khalifa',
      'Palm Jumeirah',
      'Dubai Mall',
      'Gold Souk',
      'Desert Safari'
    ],
    activities: [
      'Shopping',
      'Desert Safari',
      'Skydiving',
      'Yacht Cruise',
      'Beach Activities'
    ],
    hotels: [
      { name: 'Burj Khalifa Hotel', price: 18000, rating: 4.9 },
      { name: 'Palm Jumeirah Resort', price: 22000, rating: 4.8 },
      { name: 'Downtown Dubai Hotel', price: 12000, rating: 4.7 }
    ],
    budget: '₹55,999 - ₹200,000 per person',
    gallery: ['images/dubai.jpg']
  },
  {
    id: 5,
    name: 'Kashmir',
    country: 'India',
    rating: 4.9,
    reviews: 850,
    description: 'Heaven on Earth with lush valleys, pristine lakes, and snow-capped mountains. A paradise for trekkers and nature enthusiasts.',
    image: 'images/kasmir.jpg',
    startingPrice: 29999,
    travelType: 'Nature',
    bestTime: 'May - August',
    attractions: [
      'Dal Lake',
      'Gulmarg',
      'Pahalgam',
      'Srinagar City',
      'Sonmarg'
    ],
    activities: [
      'Trekking',
      'Houseboat Stay',
      'Skiing',
      'Photography',
      'Mountain Biking'
    ],
    hotels: [
      { name: 'Dal Lake Houseboat', price: 4000, rating: 4.8 },
      { name: 'Mountain Resort Gulmarg', price: 5500, rating: 4.7 },
      { name: 'Valley Hotel', price: 3500, rating: 4.6 }
    ],
    budget: '₹29,999 - ₹100,000 per person',
    gallery: ['images/kasmir.jpg']
  },
  {
    id: 6,
    name: 'Santorini',
    country: 'Greece',
    rating: 4.8,
    reviews: 1320,
    description: 'Stunning Greek island with iconic white-washed buildings, breathtaking sunsets, and crystal blue waters. Perfect for romance and photography.',
    image: 'images/santroni.jpg',
    startingPrice: 79999,
    travelType: 'Honeymoon',
    bestTime: 'May - October',
    attractions: [
      'Oia Sunset View',
      'Caldera View',
      'Akrotiri Beach',
      'Blue Dome Church',
      'Local Wineries'
    ],
    activities: [
      'Wine Tasting',
      'Sunset Watching',
      'Island Hopping',
      'Swimming',
      'Photography'
    ],
    hotels: [
      { name: 'Oia Cliff Resort', price: 12000, rating: 4.9 },
      { name: 'Caldera View Hotel', price: 10000, rating: 4.8 },
      { name: 'Beach Village Resort', price: 8000, rating: 4.7 }
    ],
    budget: '₹79,999 - ₹250,000 per person',
    gallery: ['images/santroni.jpg']
  },
  {
    id: 7,
    name: 'Singapore',
    country: 'Singapore',
    rating: 4.7,
    reviews: 920,
    description: 'Modern city-state with futuristic architecture, lush gardens, and diverse culture. Great for family vacations and city exploration.',
    image: 'images/bali.jpg',
    startingPrice: 52999,
    travelType: 'Family',
    bestTime: 'February - April',
    attractions: [
      'Gardens by the Bay',
      'Sentosa Island',
      'Marina Bay Sands',
      'Chinatown',
      'Singapore Zoo'
    ],
    activities: [
      'Theme Park',
      'Shopping',
      'Hawker Tour',
      'River Cruise',
      'Night Safari'
    ],
    hotels: [
      { name: 'Marina Bay Resort', price: 10000, rating: 4.8 },
      { name: 'Sentosa Beach Hotel', price: 8000, rating: 4.7 },
      { name: 'Family Hotel Singapore', price: 6000, rating: 4.6 }
    ],
    budget: '₹52,999 - ₹180,000 per person',
    gallery: ['images/bali.jpg']
  },
  {
    id: 8,
    name: 'Paris',
    country: 'France',
    rating: 4.9,
    reviews: 2100,
    description: 'The City of Light offers romance, art, culture, and world-class cuisine. Iconic landmarks and timeless charm await every traveler.',
    image: 'images/maldives.jpg',
    startingPrice: 85999,
    travelType: 'Honeymoon',
    bestTime: 'April - June',
    attractions: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame',
      'Arc de Triomphe',
      'Champs-Élysées'
    ],
    activities: [
      'Museum Tours',
      'Seine Cruise',
      'Wine Tasting',
      'Cafe Culture',
      'Gallery Visits'
    ],
    hotels: [
      { name: 'Eiffel Tower View Hotel', price: 14000, rating: 4.9 },
      { name: 'Luxury Paris Suite', price: 18000, rating: 4.9 },
      { name: 'Left Bank Hotel', price: 10000, rating: 4.8 }
    ],
    budget: '₹85,999 - ₹280,000 per person',
    gallery: ['images/maldives.jpg']
  },
  {
    id: 9,
    name: 'Thailand',
    country: 'Thailand',
    rating: 4.8,
    reviews: 1650,
    description: 'Land of smiles with tropical beaches, ancient temples, vibrant street markets, and warm hospitality. Perfect for adventure and budget travel.',
    image: 'images/swizerland.jpg',
    startingPrice: 42999,
    travelType: 'Adventure',
    bestTime: 'November - February',
    attractions: [
      'Grand Palace',
      'Phi Phi Islands',
      'Phuket Beach',
      'Floating Markets',
      'Tiger Temple'
    ],
    activities: [
      'Island Hopping',
      'Muay Thai',
      'Diving',
      'Temple Tours',
      'Night Market'
    ],
    hotels: [
      { name: 'Bangkok Budget Hotel', price: 2500, rating: 4.6 },
      { name: 'Phuket Beach Resort', price: 5000, rating: 4.7 },
      { name: 'Luxury Island Resort', price: 9000, rating: 4.8 }
    ],
    budget: '₹42,999 - ₹150,000 per person',
    gallery: ['images/swizerland.jpg']
  }
];

// Tour Packages Data
const packages = [
  {
    id: 1,
    destinationId: 1,
    name: 'Bali Adventure',
    image: 'images/bali.jpg',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    price: 45999,
    originalPrice: 54999,
    rating: 4.8,
    reviews: 560,
    description: 'Experience the best of Bali with temples, beaches, and jungle adventures.',
    travelType: 'Adventure',
    includes: [
      'Flight Tickets',
      'Hotel Accommodation',
      'Daily Breakfast',
      'Guided Tours',
      'Water Sports',
      'Airport Transfers'
    ],
    itinerary: [
      'Day 1: Arrive in Bali, hotel check-in',
      'Day 2: Temple tour and cultural experience',
      'Day 3: Beach adventure and water sports',
      'Day 4: Jungle trek and waterfall visit',
      'Day 5: Departure'
    ],
    groupSize: '2-20 people',
    difficulty: 'Moderate',
    available: true
  },
  {
    id: 2,
    destinationId: 2,
    name: 'Maldives Escape',
    image: 'images/maldives.jpg',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    price: 69999,
    originalPrice: 89999,
    rating: 4.9,
    reviews: 420,
    description: 'Luxury island escape with water activities and spa experiences.',
    travelType: 'Honeymoon',
    includes: [
      'Flight Tickets',
      'Resort Accommodation',
      'All Meals',
      'Spa Access',
      'Snorkeling Tour',
      'Island Activities'
    ],
    itinerary: [
      'Day 1: Arrive and transfer to resort',
      'Day 2: Snorkeling and water activities',
      'Day 3: Spa day and island exploration',
      'Day 4: Departure'
    ],
    groupSize: '1-10 people',
    difficulty: 'Easy',
    available: true
  },
  {
    id: 3,
    destinationId: 3,
    name: 'Swiss Alps Tour',
    image: 'images/swizerland.jpg',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    price: 89999,
    originalPrice: 119999,
    rating: 4.8,
    reviews: 380,
    description: 'Alpine adventure with mountain hikes and scenic train rides.',
    travelType: 'Adventure',
    includes: [
      'Flight Tickets',
      'Hotel Accommodation',
      'Daily Breakfast',
      'Guided Mountain Tours',
      'Train Passes',
      'Equipment Rental'
    ],
    itinerary: [
      'Day 1-2: Zurich city tour',
      'Day 3-4: Interlaken hiking',
      'Day 5: Jungfrau mountain experience',
      'Day 6: Scenic train ride',
      'Day 7: Departure'
    ],
    groupSize: '4-25 people',
    difficulty: 'Moderate to Hard',
    available: true
  },
  {
    id: 4,
    destinationId: 4,
    name: 'Dubai Luxury Tour',
    image: 'images/dubai.jpg',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    price: 65999,
    originalPrice: 84999,
    rating: 4.7,
    reviews: 620,
    description: 'Luxury shopping and adventure in the desert and city.',
    travelType: 'Luxury',
    includes: [
      'Flight Tickets',
      'Luxury Hotel',
      'Daily Breakfast',
      'Desert Safari',
      'Shopping Tour',
      'City Tour'
    ],
    itinerary: [
      'Day 1: Arrive and city tour',
      'Day 2: Burj Khalifa and mall',
      'Day 3: Desert safari',
      'Day 4: Beach and water sports',
      'Day 5: Departure'
    ],
    groupSize: '2-15 people',
    difficulty: 'Easy',
    available: true
  },
  {
    id: 5,
    destinationId: 5,
    name: 'Kashmir Paradise Trek',
    image: 'images/kasmir.jpg',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    price: 38999,
    originalPrice: 48999,
    rating: 4.9,
    reviews: 340,
    description: 'Trek through stunning valleys and pristine lakes.',
    travelType: 'Nature',
    includes: [
      'Flight Tickets',
      'Hotel & Houseboat Stay',
      'All Meals',
      'Guided Treks',
      'Equipment',
      'Local Guide'
    ],
    itinerary: [
      'Day 1: Arrive in Srinagar',
      'Day 2: Houseboat stay and Dal Lake',
      'Day 3-4: Pahalgam trekking',
      'Day 5: Gulmarg exploration',
      'Day 6: Departure'
    ],
    groupSize: '3-20 people',
    difficulty: 'Moderate',
    available: true
  },
  {
    id: 6,
    destinationId: 6,
    name: 'Santorini Romance',
    image: 'images/santroni.jpg',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    price: 84999,
    originalPrice: 109999,
    rating: 4.9,
    reviews: 510,
    description: 'Romantic getaway with stunning sunsets and island charm.',
    travelType: 'Honeymoon',
    includes: [
      'Flight Tickets',
      'Luxury Hotel',
      'Daily Breakfast',
      'Wine Tour',
      'Sunset Cruise',
      'Spa Treatment'
    ],
    itinerary: [
      'Day 1: Arrive and Oia sunset',
      'Day 2: Island hopping tour',
      'Day 3: Wine tasting and spa',
      'Day 4: Departure'
    ],
    groupSize: '1-10 people',
    difficulty: 'Easy',
    available: true
  },
  {
    id: 7,
    destinationId: 7,
    name: 'Singapore Family Tour',
    image: 'images/bali.jpg',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    price: 54999,
    originalPrice: 68999,
    rating: 4.7,
    reviews: 290,
    description: 'Family-friendly tour with theme parks and cultural experiences.',
    travelType: 'Family',
    includes: [
      'Flight Tickets',
      'Family Hotel',
      'Daily Meals',
      'Theme Park Passes',
      'City Tour',
      'Night Safari'
    ],
    itinerary: [
      'Day 1: Arrive and Gardens by the Bay',
      'Day 2: Sentosa Island',
      'Day 3: Zoo and cultural tour',
      'Day 4: Departure'
    ],
    groupSize: '2-25 people',
    difficulty: 'Easy',
    available: true
  },
  {
    id: 8,
    destinationId: 8,
    name: 'Paris Romance',
    image: 'images/maldives.jpg',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    price: 94999,
    originalPrice: 124999,
    rating: 4.9,
    reviews: 680,
    description: 'Romantic Paris experience with art, culture and fine dining.',
    travelType: 'Honeymoon',
    includes: [
      'Flight Tickets',
      'Luxury Hotel',
      'Daily Breakfast',
      'Museum Passes',
      'Seine Cruise',
      'Wine Tasting'
    ],
    itinerary: [
      'Day 1-2: City tour and Eiffel Tower',
      'Day 3: Louvre and museums',
      'Day 4: Seine cruise and wine tasting',
      'Day 5: Departure'
    ],
    groupSize: '1-10 people',
    difficulty: 'Easy',
    available: true
  },
  {
    id: 9,
    destinationId: 9,
    name: 'Thailand Island Hopping',
    image: 'images/swizerland.jpg',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    price: 49999,
    originalPrice: 62999,
    rating: 4.8,
    reviews: 580,
    description: 'Island-hopping adventure with diving and beach exploration.',
    travelType: 'Adventure',
    includes: [
      'Flight Tickets',
      'Hotel Accommodation',
      'Island Hopping Tours',
      'Diving Course',
      'All Meals',
      'Guides'
    ],
    itinerary: [
      'Day 1: Bangkok arrival',
      'Day 2-3: Phi Phi Islands',
      'Day 4-5: Phuket diving',
      'Day 6: Departure'
    ],
    groupSize: '2-20 people',
    difficulty: 'Moderate',
    available: true
  }
];

// Offers/Promotions Data
const offers = [
  {
    id: 1,
    title: 'SUMMER ESCAPE',
    discount: '40% OFF',
    discountPercent: 40,
    destination: 'All Destinations',
    promoCode: 'SUMMER40',
    originalPrice: 'Starting from ₹50,000',
    discountedPrice: 'Starting from ₹30,000',
    validity: '2026-09-30',
    applicableFor: 'All Packages',
    description: 'Book your summer vacation and enjoy massive discounts on all travel packages!'
  },
  {
    id: 2,
    title: 'HONEYMOON SPECIAL',
    discount: '30% OFF',
    discountPercent: 30,
    destination: 'Maldives, Santorini, Paris',
    promoCode: 'HONEY30',
    originalPrice: 'Starting from ₹70,000',
    discountedPrice: 'Starting from ₹49,000',
    validity: '2026-10-31',
    applicableFor: 'Honeymoon Packages',
    description: 'Make your honeymoon special with amazing discounts on romantic destinations!'
  },
  {
    id: 3,
    title: 'ADVENTURE RUSH',
    discount: '25% OFF',
    discountPercent: 25,
    destination: 'Swiss Alps, Bali, Thailand',
    promoCode: 'ADV25',
    originalPrice: 'Starting from ₹45,000',
    discountedPrice: 'Starting from ₹33,750',
    validity: '2026-11-15',
    applicableFor: 'Adventure Packages',
    description: 'Thrilling adventures await! Get discounts on all adventure travel packages!'
  },
  {
    id: 4,
    title: 'FAMILY VACATION',
    discount: '35% OFF',
    discountPercent: 35,
    destination: 'Singapore, Bali, Dubai',
    promoCode: 'FAMILY35',
    originalPrice: 'Starting from ₹55,000',
    discountedPrice: 'Starting from ₹35,750',
    validity: '2026-12-15',
    applicableFor: 'Family Packages',
    description: 'Create memories with your family! Special discounts on family vacation packages!'
  }
];

// Sample Reviews Data
const reviews = [
  {
    id: 1,
    userName: 'Rahul Sharma',
    destination: 'Bali',
    rating: 5,
    comment: 'GlobeVista made our Bali trip unforgettable. Everything was perfectly organized! The guides were knowledgeable and friendly.',
    image: 'images/rahul.jpeg',
    date: '2026-08-15'
  },
  {
    id: 2,
    userName: 'Priya Patel',
    destination: 'Maldives',
    rating: 5,
    comment: 'Excellent service, affordable prices, and amazing destinations. Highly recommended!',
    image: 'images/patel.jpeg',
    date: '2026-08-10'
  },
  {
    id: 3,
    userName: 'Amit Verma',
    destination: 'Switzerland',
    rating: 5,
    comment: 'Booking was simple and the support team was available throughout our journey.',
    image: 'images/amitverma.jpeg',
    date: '2026-08-05'
  },
  {
    id: 4,
    userName: 'Neha Singh',
    destination: 'Dubai',
    rating: 4,
    comment: 'Great experience with amazing packages. The itinerary was well-planned and executed smoothly.',
    image: 'images/bali.jpg',
    date: '2026-07-28'
  },
  {
    id: 5,
    userName: 'Vikram Kapoor',
    destination: 'Kashmir',
    rating: 5,
    comment: 'Paradise on earth! Every moment was magical. Thank you GlobeVista for this incredible experience.',
    image: 'images/maldives.jpg',
    date: '2026-07-20'
  }
];

// Travel Types
const travelTypes = [
  'Adventure',
  'Beach',
  'Honeymoon',
  'Family',
  'Luxury',
  'Nature'
];

// Price Ranges
const priceRanges = [
  { id: 1, label: 'Under ₹30,000', min: 0, max: 30000 },
  { id: 2, label: '₹30,000–₹60,000', min: 30000, max: 60000 },
  { id: 3, label: '₹60,000–₹1,00,000', min: 60000, max: 100000 },
  { id: 4, label: 'Above ₹1,00,000', min: 100000, max: Infinity }
];

// Duration Ranges
const durationRanges = [
  { id: 1, label: '1-3 Days', min: 1, max: 3 },
  { id: 2, label: '4-5 Days', min: 4, max: 5 },
  { id: 3, label: '6-8 Days', min: 6, max: 8 },
  { id: 4, label: '9+ Days', min: 9, max: Infinity }
];

// Rating Filters
const ratingFilters = [
  { id: 1, label: '4+', value: 4 },
  { id: 2, label: '4.5+', value: 4.5 }
];

// Export data (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    destinations,
    packages,
    offers,
    reviews,
    travelTypes,
    priceRanges,
    durationRanges,
    ratingFilters
  };
}
