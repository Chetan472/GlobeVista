/* ==========================================================================
   GlobeVista — catalogue data (single source of truth)
   Prices are in INR, matching the original ₹ based design.
   ========================================================================== */
"use strict";

/* Existing project images are reused so the visual identity stays intact. */
const GV_IMAGES = {
  bali: "images/bali.jpg",
  maldives: "images/maldives.jpg",
  switzerland: "images/swizerland.jpg",
  dubai: "images/dubai.jpg",
  kashmir: "images/kasmir.jpg",
  santorini: "images/santroni.jpg",
  paris: "images/paris.jpg",
  goa: "images/goa.jpg",
  manali: "images/manali.jpg",
  singapore: "images/singapore.jpg",
  hero: "images/bgc.jpg",
  logo: "images/logo.png"
};

const GV_DESTINATIONS = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "South East Asia",
    tag: "Tropical Paradise",
    rating: 4.9,
    reviews: 214,
    price: 45999,
    duration: 5,
    categories: ["Beach", "Honeymoon", "Adventure"],
    image: GV_IMAGES.bali,
    gallery: [GV_IMAGES.bali, GV_IMAGES.maldives, GV_IMAGES.santorini],
    bestTime: "April – October",
    shortDescription: "Rice terraces, reef beaches and sunset temples.",
    description:
      "Bali packs emerald rice terraces, world-class surf breaks and a temple culture into one island. This itinerary balances the buzz of Seminyak with the calm of Ubud.",
    activities: [
      "Ubud rice terrace walk",
      "Uluwatu sunset temple visit",
      "Nusa Penida snorkelling trip",
      "Seminyak beach club day",
      "Traditional Balinese spa ritual"
    ],
    hotel: {
      name: "Kuta Seaside Resort & Spa",
      stars: 4,
      detail: "3 nights Seminyak + 1 night Ubud, pool side rooms"
    },
    inclusions: [
      "Return economy airfare",
      "4 nights in a 4-star beach resort",
      "Daily breakfast",
      "Private airport transfers",
      "All guided tours in the itinerary",
      "Travel insurance for 5 days"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bali", detail: "Airport pickup, resort check-in and a welcome dinner on the beach at Seminyak." },
      { day: 2, title: "Ubud culture day", detail: "Tegallalang rice terraces, Monkey Forest and a Balinese cooking session." },
      { day: 3, title: "Nusa Penida by fast boat", detail: "Snorkelling at Crystal Bay and viewpoints at Kelingking and Tembak." },
      { day: 4, title: "Uluwatu & Jimbaran", detail: "Temple and Kecak fire dance at sunset, seafood grill on Jimbaran sand." },
      { day: 5, title: "Leisure and departure", detail: "Free morning for spa or shopping, then transfer to the airport." }
    ]
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    tag: "Luxury Beaches",
    rating: 4.8,
    reviews: 186,
    price: 69999,
    duration: 4,
    categories: ["Beach", "Honeymoon", "Luxury"],
    image: GV_IMAGES.maldives,
    gallery: [GV_IMAGES.maldives, GV_IMAGES.bali, GV_IMAGES.santorini],
    bestTime: "November – April",
    shortDescription: "Overwater villas above a glass-clear lagoon.",
    description:
      "A ring of 1,200 coral islands. This package places you in an overwater villa with a house reef a few steps from your deck — quiet and built entirely around the water.",
    activities: [
      "Overwater villa stay",
      "House reef snorkelling",
      "Dolphin cruise at dusk",
      "Sandbank picnic",
      "Couples spa over the lagoon"
    ],
    hotel: {
      name: "Coral Lagoon Water Villas",
      stars: 5,
      detail: "3 nights overwater villa, half board"
    },
    inclusions: [
      "Return airfare to Malé",
      "Speedboat transfers to the resort",
      "3 nights in an overwater villa",
      "Breakfast and dinner buffet",
      "Sunset dolphin cruise",
      "Snorkelling equipment"
    ],
    itinerary: [
      { day: 1, title: "Malé to resort", detail: "Speedboat transfer, villa check-in and a lagoon sunset." },
      { day: 2, title: "Reef day", detail: "Guided house reef snorkelling, sandbank picnic and a spa session." },
      { day: 3, title: "Ocean day", detail: "Dolphin cruise, optional dive and a beach barbecue dinner." },
      { day: 4, title: "Departure", detail: "Leisurely breakfast and speedboat back to Malé airport." }
    ]
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    region: "Europe",
    tag: "Snow Mountains",
    rating: 4.9,
    reviews: 168,
    price: 89999,
    duration: 7,
    categories: ["Family", "Adventure", "Honeymoon"],
    image: GV_IMAGES.switzerland,
    gallery: [GV_IMAGES.switzerland, GV_IMAGES.manali, GV_IMAGES.paris],
    bestTime: "June – September, December – March",
    shortDescription: "Alpine railways, glacier lakes and village stays.",
    description:
      "Seven days across Interlaken, Lucerne and Zermatt with the Swiss Travel Pass included, so the panoramic trains and cable cars are already taken care of.",
    activities: [
      "Jungfraujoch railway, Top of Europe",
      "Harder Kulm funicular viewpoint",
      "Glacier Express panoramic ride",
      "Matterhorn viewpoint at Sunnegga",
      "Lake Lucerne boat cruise"
    ],
    hotel: {
      name: "Alpine View Hotel Group",
      stars: 4,
      detail: "3 nights Interlaken, 2 nights Zermatt, 1 night Lucerne"
    },
    inclusions: [
      "Return airfare to Zurich",
      "6 nights in 4-star alpine hotels",
      "Swiss Travel Pass for 6 days",
      "Daily breakfast",
      "Jungfraujoch and Sunnegga rail tickets",
      "Airport and station transfers"
    ],
    itinerary: [
      { day: 1, title: "Zurich to Interlaken", detail: "Scenic train transfer and an evening walk along Lake Brienz." },
      { day: 2, title: "Top of Europe", detail: "Jungfraujoch by railway with the Ice Palace and Sphinx terrace." },
      { day: 3, title: "Interlaken views", detail: "Harder Kulm funicular, then a boat cruise on Lake Thun." },
      { day: 4, title: "To Zermatt", detail: "Panoramic rail via Spiez; car-free village evening with Matterhorn views." },
      { day: 5, title: "Matterhorn side", detail: "Ride to Sunnegga and the Five Lakes hiking trail." },
      { day: 6, title: "Lucerne", detail: "Train to Lucerne, Kapellbrücke and a lake cruise at golden hour." },
      { day: 7, title: "Departure", detail: "Old town stroll and transfer to Zurich airport." }
    ]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    tag: "Modern Luxury",
    rating: 4.8,
    reviews: 203,
    price: 55999,
    duration: 5,
    categories: ["Luxury", "Family", "Cultural"],
    image: GV_IMAGES.dubai,
    gallery: [GV_IMAGES.dubai, GV_IMAGES.singapore, GV_IMAGES.santorini],
    bestTime: "October – March",
    shortDescription: "Skyline towers, desert dunes and Marina nights.",
    description:
      "A five-day city break that pairs the icons — Burj Khalifa, Palm Jumeirah, Dubai Marina — with a proper desert evening of dune bashing and a bedouin-style camp.",
    activities: [
      "Burj Khalifa 124th floor at sunset",
      "Desert dune bashing and camel ride",
      "Abu Dhabi day trip",
      "Dubai Marina dhow dinner cruise",
      "Gold and spice souk walk"
    ],
    hotel: {
      name: "Marina Heights Hotel",
      stars: 4,
      detail: "4 nights, marina-facing rooms"
    },
    inclusions: [
      "Return airfare to Dubai",
      "4 nights in a 4-star Marina hotel",
      "Daily breakfast",
      "Burj Khalifa skip-the-line tickets",
      "Desert safari with dinner",
      "Air-conditioned transfers"
    ],
    itinerary: [
      { day: 1, title: "Arrival", detail: "Airport pickup, hotel check-in and Marina waterfront dinner." },
      { day: 2, title: "Downtown icons", detail: "Dubai Mall, aquarium, Burj Khalifa sunset slot and fountain show." },
      { day: 3, title: "Desert evening", detail: "Dune bashing, camel ride, sandboarding and a camp dinner with show." },
      { day: 4, title: "Abu Dhabi", detail: "Grand Mosque, Corniche and Ferrari World with a guide." },
      { day: 5, title: "Departure", detail: "Museum of the Future photo stop and transfer to the airport." }
    ]
  },
  {
    id: "kashmir",
    name: "Kashmir",
    country: "India",
    region: "South Asia",
    tag: "Heaven on Earth",
    rating: 4.9,
    reviews: 178,
    price: 29999,
    duration: 6,
    categories: ["Honeymoon", "Family", "Adventure"],
    image: GV_IMAGES.kashmir,
    gallery: [GV_IMAGES.kashmir, GV_IMAGES.manali, GV_IMAGES.switzerland],
    bestTime: "March – June, September – November",
    shortDescription: "Dal lake shikaras and alpine meadows.",
    description:
      "Srinagar, Gulmarg and Pahalgam in one loop — houseboat nights on Dal Lake followed by the meadows of Gondola country and the Lidder valley.",
    activities: [
      "Shikara ride on Dal Lake",
      "Gulmarg Gondola to Apharwat",
      "Mughal gardens of Srinagar",
      "Pahalgam Lidder valley rafting",
      "Betaab and Aru meadow walks"
    ],
    hotel: {
      name: "Dal Lake Houseboat + Hotel Pine View",
      stars: 4,
      detail: "2 nights houseboat, 3 nights hotel"
    },
    inclusions: [
      "Return airfare to Srinagar",
      "2 nights houseboat + 3 nights hotel",
      "All meals on the houseboat",
      "Private cab for all sightseeing",
      "Gondola and rafting tickets",
      "All permits and parking"
    ],
    itinerary: [
      { day: 1, title: "Srinagar arrival", detail: "Houseboat check-in on Dal Lake and a sunset shikara ride." },
      { day: 2, title: "Mughal gardens", detail: "Nishat, Shalimar and Chashme Shahi, plus the handicraft market." },
      { day: 3, title: "Gulmarg", detail: "Gondola ride to Apharwat and time on the alpine meadow." },
      { day: 4, title: "Pahalgam", detail: "Lidder valley drive, Aru walk and riverside evening." },
      { day: 5, title: "Betaab and rafting", detail: "Meadow walk in the morning, white-water rafting after lunch." },
      { day: 6, title: "Departure", detail: "Saffron field stop and transfer to Srinagar airport." }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    tag: "Greek Island",
    rating: 4.8,
    reviews: 152,
    price: 79999,
    duration: 6,
    categories: ["Honeymoon", "Beach", "Cultural"],
    image: GV_IMAGES.santorini,
    gallery: [GV_IMAGES.santorini, GV_IMAGES.paris, GV_IMAGES.dubai],
    bestTime: "May – early November",
    shortDescription: "Caldera-view villages and the famous sunset.",
    description:
      "Whitewashed Oia, a flooded volcanic caldera and sunsets that earn the hype. Six days with a catamaran day, winery tastings and caldera-view nights.",
    activities: [
      "Oia sunset viewpoint walk",
      "Caldera catamaran with hot springs",
      "Santo winery tasting flight",
      "Akrotiri Bronze Age site",
      "Red Beach and lagoon swim"
    ],
    hotel: {
      name: "Oia Caldera Studios",
      stars: 4,
      detail: "5 nights, caldera-view cave studios"
    },
    inclusions: [
      "Return airfare to Thira",
      "5 nights caldera-view studio",
      "Daily breakfast",
      "Catamaran cruise with lunch",
      "Winery tasting session",
      "Private airport transfers"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Oia", detail: "Transfer, studio check-in and a first sunset over the caldera." },
      { day: 2, title: "Caldera by catamaran", detail: "Volcanic hot springs, swim stops and lunch on board." },
      { day: 3, title: "Villages and wine", detail: "Fira, Pyrgos and a Santo winery tasting flight." },
      { day: 4, title: "Ancient Akrotiri", detail: "Bronze Age site, Red Beach and the lagoon at Perissa." },
      { day: 5, title: "Free day", detail: "Cliff path from Fira to Oia, spa or a cooking class." },
      { day: 6, title: "Departure", detail: "Breakfast with the caldera view and transfer to Thira airport." }
    ]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    tag: "City of Light",
    rating: 4.7,
    reviews: 141,
    price: 74999,
    duration: 6,
    categories: ["Honeymoon", "Cultural", "Luxury"],
    image: GV_IMAGES.paris,
    gallery: [GV_IMAGES.paris, GV_IMAGES.santorini, GV_IMAGES.switzerland],
    bestTime: "April – June, September – October",
    shortDescription: "Museums, boulevards and the Eiffel Tower.",
    description:
      "Six unhurried days in Paris with a museum pass, a Seine dinner cruise and a Versailles half day — left-bank cafés and Marais lanes included.",
    activities: [
      "Louvre guided highlights tour",
      "Eiffel Tower summit access",
      "Seine dinner cruise",
      "Palace of Versailles half day",
      "Montmartre and Sacré-Cœur walk"
    ],
    hotel: {
      name: "Hôtel Saint-Germain",
      stars: 4,
      detail: "5 nights, 6th arrondissement, walking distance to the Seine"
    },
    inclusions: [
      "Return airfare to Paris CDG",
      "5 nights in a 4-star Left Bank hotel",
      "Daily breakfast",
      "2-day Paris Museum Pass",
      "Seine dinner cruise",
      "Round-trip airport RER tickets"
    ],
    itinerary: [
      { day: 1, title: "Arrival", detail: "RER to Saint-Germain, check-in and an evening Seine stroll." },
      { day: 2, title: "Icons", detail: "Louvre highlights, Tuileries walk and Eiffel Tower summit at dusk." },
      { day: 3, title: "Île de la Cité", detail: "Notre-Dame exterior, Sainte-Chapelle and the Latin Quarter." },
      { day: 4, title: "Versailles", detail: "Palace halls, Hall of Mirrors and the gardens by small train." },
      { day: 5, title: "Montmartre", detail: "Sacré-Cœur, artist square, then a Seine dinner cruise." },
      { day: 6, title: "Departure", detail: "Marais pastry morning and transfer to CDG." }
    ]
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    region: "South Asia",
    tag: "Sun & Sand",
    rating: 4.6,
    reviews: 227,
    price: 18999,
    duration: 4,
    categories: ["Beach", "Adventure", "Budget"],
    image: GV_IMAGES.goa,
    gallery: [GV_IMAGES.goa, GV_IMAGES.bali, GV_IMAGES.maldives],
    bestTime: "November – February",
    shortDescription: "North Goa beaches and Latin-quarter churches.",
    description:
      "The quickest beach reset on the list. Four days covering Baga and Palolem, a spice-plantation lunch and the old churches of Old Goa.",
    activities: [
      "Baga and Calangute beach day",
      "Palolem sunset kayaking",
      "Old Goa basilica and museums",
      "Spice plantation lunch tour",
      "Dudhsagar waterfall jeep trip"
    ],
    hotel: {
      name: "Palolem Beach Retreat",
      stars: 3,
      detail: "3 nights, garden-facing cottages"
    },
    inclusions: [
      "Return airfare to Dabolim",
      "3 nights beach-resort stay",
      "Daily breakfast",
      "Shared cab transfers",
      "Plantation tour with lunch",
      "Kayaking session"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Goa", detail: "Transfer to Palolem, beach time and a shack dinner." },
      { day: 2, title: "North Goa", detail: "Baga and Calangute, Fort Aguada viewpoint and a club afternoon." },
      { day: 3, title: "Heritage day", detail: "Old Goa churches, Latin quarter and a spice plantation lunch." },
      { day: 4, title: "Departure", detail: "Sunrise kayak, brunch and transfer to Dabolim airport." }
    ]
  },
  {
    id: "manali",
    name: "Manali",
    country: "India",
    region: "South Asia",
    tag: "Himalayan Escape",
    rating: 4.7,
    reviews: 196,
    price: 22999,
    duration: 5,
    categories: ["Adventure", "Family", "Budget"],
    image: GV_IMAGES.manali,
    gallery: [GV_IMAGES.manali, GV_IMAGES.kashmir, GV_IMAGES.switzerland],
    bestTime: "March – June, December for snow",
    shortDescription: "Pine valleys, Rohtang passes and old-town cafés.",
    description:
      "A five-day Himalayan run from Manali's old quarter to Solang's adventure meadow and the Rohtang pass, with an optional Sissu extension.",
    activities: [
      "Rohtang Pass drive",
      "Solang valley paragliding",
      "Hadimba temple and old Manali",
      "Sissu and Tosh village walk",
      "Kullu shawlin market"
    ],
    hotel: {
      name: "Hotel Riverfront Manali",
      stars: 3,
      detail: "4 nights, river-facing rooms"
    },
    inclusions: [
      "Return travel to Bhuntar",
      "4 nights riverfront hotel",
      "Breakfast and dinner",
      "Private cab for sightseeing",
      "Rohtang permit assistance",
      "Paragliding session at Solang"
    ],
    itinerary: [
      { day: 1, title: "Arrival", detail: "Drive from Bhuntar, hotel check-in and old Manali market walk." },
      { day: 2, title: "Solang valley", detail: "Adventure meadow, paragliding and a ropeway ride." },
      { day: 3, title: "Rohtang Pass", detail: "High-morning departure, snow point and Pandoh Dam stop." },
      { day: 4, title: "Sissu and Tosh", detail: "Bralwan village route, riverside cafés and a waterfall stop." },
      { day: 5, title: "Departure", detail: "Hadimba temple visit, Kullu market and transfer to Bhuntar." }
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "South East Asia",
    tag: "City in a Garden",
    rating: 4.8,
    reviews: 173,
    price: 62999,
    duration: 5,
    categories: ["Family", "Cultural", "Luxury"],
    image: GV_IMAGES.singapore,
    gallery: [GV_IMAGES.singapore, GV_IMAGES.dubai, GV_IMAGES.bali],
    bestTime: "February – April, September",
    shortDescription: "Marina Bay skylines and hawker-centre feasts.",
    description:
      "A clean, compact city built for families: a Sentosa day, Gardens by the Bay, Universal Studios and a hawker-food crawl with a local guide.",
    activities: [
      "Marina Bay Sands SkyPark deck",
      "Gardens by the Bay domes",
      "Sentosa and Universal Studios day",
      "Night Safari tram",
      "Chinatown and hawker food tour"
    ],
    hotel: {
      name: "Orchard Gateway Hotel",
      stars: 4,
      detail: "4 nights, Orchard Road, MRT at the door"
    },
    inclusions: [
      "Return airfare to Singapore",
      "4 nights 4-star Orchard hotel",
      "Daily breakfast",
      "Singapore Tourist Pass for MRT",
      "Universal Studios entry ticket",
      "Hawker food tour with guide"
    ],
    itinerary: [
      { day: 1, title: "Arrival", detail: "Changi Jewel shower, hotel check-in and Orchard evening." },
      { day: 2, title: "Marina Bay", detail: "SkyPark deck, Gardens by the Bay domes and Cloud Forest." },
      { day: 3, title: "Sentosa", detail: "Universal Studios, S.E.A. Aquarium and beach tram." },
      { day: 4, title: "Culture and night", detail: "Chinatown, Clarke Quay, then the Night Safari tram." },
      { day: 5, title: "Departure", detail: "Hawker breakfast at Tiong Bahru and airport transfer." }
    ]
  }
];

/* Tour packages. `price` is per person; `oldPrice` powers the strike-through. */
const GV_PACKAGES = [
  {
    id: "bali-adventure",
    title: "Bali Adventure",
    destination: "Bali",
    destinationId: "bali",
    days: 5,
    nights: 4,
    price: 45999,
    oldPrice: 59999,
    discount: 23,
    rating: 4.8,
    categories: ["Beach", "Adventure", "Honeymoon"],
    image: GV_IMAGES.bali,
    tagline: "Temples, terraces and two beach days",
    services: ["Return flights", "4-star resort", "Daily breakfast", "Private transfers", "Guided tours", "Travel insurance"]
  },
  {
    id: "maldives-escape",
    title: "Maldives Escape",
    destination: "Maldives",
    destinationId: "maldives",
    days: 4,
    nights: 3,
    price: 69999,
    oldPrice: 89999,
    discount: 22,
    rating: 4.9,
    categories: ["Beach", "Honeymoon", "Luxury"],
    image: GV_IMAGES.maldives,
    tagline: "Three nights in an overwater villa",
    services: ["Return flights", "Overwater villa", "Half board", "Speedboat transfers", "Dolphin cruise", "Snorkel gear"]
  },
  {
    id: "swiss-alps-tour",
    title: "Swiss Alps Tour",
    destination: "Switzerland",
    destinationId: "switzerland",
    days: 7,
    nights: 6,
    price: 89999,
    oldPrice: 104999,
    discount: 14,
    rating: 4.9,
    categories: ["Family", "Adventure", "Honeymoon"],
    image: GV_IMAGES.switzerland,
    tagline: "Jungfraujoch, Zermatt and Lucerne",
    services: ["Return flights", "4-star hotels", "Swiss Travel Pass", "Daily breakfast", "Mountain railways", "Transfers"]
  },
  {
    id: "dubai-city-break",
    title: "Dubai City Break",
    destination: "Dubai",
    destinationId: "dubai",
    days: 5,
    nights: 4,
    price: 55999,
    oldPrice: 69999,
    discount: 20,
    rating: 4.8,
    categories: ["Luxury", "Family", "Cultural"],
    image: GV_IMAGES.dubai,
    tagline: "Skyline, desert and an Abu Dhabi day",
    services: ["Return flights", "4-star hotel", "Daily breakfast", "Burj Khalifa pass", "Desert safari", "A/C transfers"]
  },
  {
    id: "kashmir-retreat",
    title: "Kashmir Valley Retreat",
    destination: "Kashmir",
    destinationId: "kashmir",
    days: 6,
    nights: 5,
    price: 29999,
    oldPrice: 45999,
    discount: 35,
    rating: 4.9,
    categories: ["Honeymoon", "Family", "Adventure"],
    image: GV_IMAGES.kashmir,
    tagline: "Houseboat nights plus Gulmarg and Pahalgam",
    services: ["Return flights", "Houseboat + hotel", "All meals", "Private cab", "Gondola tickets", "Rafting"]
  },
  {
    id: "santorini-sunset",
    title: "Santorini Sunset",
    destination: "Santorini",
    destinationId: "santorini",
    days: 6,
    nights: 5,
    price: 79999,
    oldPrice: 97999,
    discount: 18,
    rating: 4.8,
    categories: ["Honeymoon", "Beach", "Cultural"],
    image: GV_IMAGES.santorini,
    tagline: "Caldera-view studios and a catamaran day",
    services: ["Return flights", "Caldera studio", "Daily breakfast", "Catamaran cruise", "Winery tasting", "Transfers"]
  },
  {
    id: "paris-romantic",
    title: "Paris Romantic Getaway",
    destination: "Paris",
    destinationId: "paris",
    days: 6,
    nights: 5,
    price: 74999,
    oldPrice: 92999,
    discount: 19,
    rating: 4.7,
    categories: ["Honeymoon", "Cultural", "Luxury"],
    image: GV_IMAGES.paris,
    tagline: "Museums, Versailles and a Seine dinner",
    services: ["Return flights", "Left Bank hotel", "Daily breakfast", "Museum Pass", "Dinner cruise", "RER tickets"]
  },
  {
    id: "goa-fiesta",
    title: "Goa Beach Fiesta",
    destination: "Goa",
    destinationId: "goa",
    days: 4,
    nights: 3,
    price: 18999,
    oldPrice: 31999,
    discount: 41,
    rating: 4.6,
    categories: ["Beach", "Adventure", "Budget"],
    image: GV_IMAGES.goa,
    tagline: "The short, cheap beach reset",
    services: ["Return flights", "Beach resort", "Daily breakfast", "Shared transfers", "Plantation tour", "Kayaking"]
  },
  {
    id: "manali-adventure",
    title: "Manali & Rohtang Adventure",
    destination: "Manali",
    destinationId: "manali",
    days: 5,
    nights: 4,
    price: 22999,
    oldPrice: 31999,
    discount: 28,
    rating: 4.7,
    categories: ["Adventure", "Family", "Budget"],
    image: GV_IMAGES.manali,
    tagline: "Solang paragliding and the Rohtang snow point",
    services: ["Return travel", "Riverfront hotel", "Breakfast + dinner", "Private cab", "Paragliding", "Permit help"]
  },
  {
    id: "singapore-family",
    title: "Singapore Family Fun",
    destination: "Singapore",
    destinationId: "singapore",
    days: 5,
    nights: 4,
    price: 62999,
    oldPrice: 78999,
    discount: 20,
    rating: 4.8,
    categories: ["Family", "Cultural", "Luxury"],
    image: GV_IMAGES.singapore,
    tagline: "Sentosa, Gardens by the Bay and Night Safari",
    services: ["Return flights", "Orchard hotel", "Daily breakfast", "Tourist Pass", "Universal Studios", "Food tour"]
  }
];

/* Offers keep the original "Summer Vacation Sale" headline and colour cues. */
const GV_OFFERS = [
  {
    id: "offer-summer",
    badge: "Summer Vacation Sale",
    title: "Up to 40% off beach getaways",
    description: "Goa and Bali escape packages on selected June departures.",
    discount: 40,
    oldPrice: 31999,
    price: 18999,
    code: "SUMMER40",
    validTill: "31 Dec 2026",
    packageId: "goa-fiesta",
    destination: "Goa"
  },
  {
    id: "offer-honeymoon",
    badge: "Honeymoon Special",
    title: "Maldives villa, two guests",
    description: "Overwater villa with half board and a sunset dolphin cruise.",
    discount: 22,
    oldPrice: 89999,
    price: 69999,
    code: "HONEY22",
    validTill: "31 Oct 2026",
    packageId: "maldives-escape",
    destination: "Maldives"
  },
  {
    id: "offer-alpine",
    badge: "Early Bird Alpine",
    title: "7 days across the Swiss Alps",
    description: "Book three months ahead and save on the Jungfraujoch route.",
    discount: 14,
    oldPrice: 104999,
    price: 89999,
    code: "ALPINE14",
    validTill: "30 Nov 2026",
    packageId: "swiss-alps-tour",
    destination: "Switzerland"
  },
  {
    id: "offer-himalaya",
    badge: "Domestic Deal",
    title: "Kashmir valley, six days",
    description: "Houseboat nights, Gulmarg gondola and Pahalgam rafting included.",
    discount: 35,
    oldPrice: 45999,
    price: 29999,
    code: "VALLEY35",
    validTill: "31 Mar 2027",
    packageId: "kashmir-retreat",
    destination: "Kashmir"
  }
];

/* Gallery reuses destination photography already in the project. */
const GV_GALLERY = [
  { image: GV_IMAGES.bali, title: "Bali", caption: "Indonesia", alt: "Bali coastline in Indonesia" },
  { image: GV_IMAGES.maldives, title: "Maldives", caption: "Luxury beaches", alt: "Maldives lagoon and water villas" },
  { image: GV_IMAGES.switzerland, title: "Switzerland", caption: "Swiss Alps", alt: "Swiss Alps mountain landscape" },
  { image: GV_IMAGES.dubai, title: "Dubai", caption: "City of luxury", alt: "Dubai skyline" },
  { image: GV_IMAGES.kashmir, title: "Kashmir", caption: "Paradise on Earth", alt: "Kashmir Dal Lake and mountains" },
  { image: GV_IMAGES.santorini, title: "Santorini", caption: "Greek paradise", alt: "Santorini caldera in Greece" },
  { image: GV_IMAGES.paris, title: "Paris", caption: "City of Light", alt: "Eiffel Tower in Paris" },
  { image: GV_IMAGES.goa, title: "Goa", caption: "Sun and sand", alt: "Goa beach with palm trees" },
  { image: GV_IMAGES.manali, title: "Manali", caption: "Himalayan escape", alt: "Manali town in the Himalayas" },
  { image: GV_IMAGES.singapore, title: "Singapore", caption: "City in a garden", alt: "Marina Bay Sands in Singapore" }
];

/* Seeded reviews. The three faces shipped with the original site. */
const GV_SEED_REVIEWS = [
  {
    id: "seed-1",
    name: "Rahul Sharma",
    avatar: "images/rahul.jpeg",
    rating: 5,
    destination: "Bali",
    text: "GlobeVista made our Bali trip unforgettable. Everything was perfectly organised, and the Ubud day was the highlight.",
    date: "2026-03-14",
    verified: true
  },
  {
    id: "seed-2",
    name: "Priya Patel",
    avatar: "images/patel.jpeg",
    rating: 5,
    destination: "Maldives",
    text: "Excellent service, affordable prices and amazing destinations. The overwater villa was exactly as described.",
    date: "2026-02-27",
    verified: true
  },
  {
    id: "seed-3",
    name: "Amit Verma",
    avatar: "images/amitverma.jpeg",
    rating: 5,
    destination: "Switzerland",
    text: "Booking was simple and the support team was available throughout our journey. The Swiss Travel Pass saved us hours at stations.",
    date: "2026-01-19",
    verified: true
  },
  {
    id: "seed-4",
    name: "Sneha Rao",
    avatar: "",
    rating: 4,
    destination: "Dubai",
    text: "Desert safari was fantastic and the hotel location was spot on. Only the Abu Dhabi day felt a little rushed.",
    date: "2026-04-06",
    verified: true
  },
  {
    id: "seed-5",
    name: "Arjun Nair",
    avatar: "",
    rating: 5,
    destination: "Kashmir",
    text: "The houseboat nights on Dal Lake were worth every rupee. Our guide knew every shortcut around Gulmarg.",
    date: "2026-05-11",
    verified: true
  },
  {
    id: "seed-6",
    name: "Fatima Khan",
    avatar: "",
    rating: 4,
    destination: "Singapore",
    text: "Great family package — the kids loved Universal Studios. Wish the Night Safari was a night earlier so we were less tired.",
    date: "2026-06-02",
    verified: false
  }
];

const GV_STATS = [
  { icon: "🌍", value: 150, display: "plus", label: "Destinations" },
  { icon: "👨‍👩‍👧‍👦", value: 50, display: "kplus", label: "Happy Travelers" },
  { icon: "📦", value: 500, display: "plus", label: "Tour Packages" },
  { icon: "🏆", value: 12, display: "plus", label: "Years Experience" }
];

const GV_ABOUT_POINTS = [
  { icon: "🛎️", title: "Human travel experts", text: "Every itinerary is reviewed by a planner who has actually been to the destination." },
  { icon: "💳", title: "Transparent pricing", text: "The price you see includes flights, hotels and transfers. No surprise fees at the counter." },
  { icon: "🕑", title: "Support while travelling", text: "A help line staffed from 6 AM to midnight, every day of your trip." },
  { icon: "🔄", title: "Free date changes", text: "Plans move. Change your travel dates once at no cost up to 21 days before departure." }
];

const GV_FAQS = [
  { q: "How do I book a package?", a: "Open any package, press Book Now, fill the traveller details and confirm the demo payment. You get a booking ID and a downloadable ticket straight away." },
  { q: "Is the payment on this site real?", a: "No. This is a front-end portfolio project, so payment is simulated and no card is ever charged. Everything is stored in your own browser through localStorage." },
  { q: "Can I cancel a booking?", a: "Yes. Go to My Dashboard and press Cancel on any upcoming trip. It moves to the cancelled list immediately." },
  { q: "Do you build custom itineraries?", a: "Send the request through the contact form and a planner replies with a draft plan within one working day." },
  { q: "What documents do I need for international trips?", a: "A passport valid six months beyond your return date. Our team shares the visa checklist for your destination after booking." }
];
