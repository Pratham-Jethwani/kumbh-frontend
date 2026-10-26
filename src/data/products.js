// Curated sacred catalog corresponding directly to store images
export const PRODUCTS = [
  {
    id: 'kumbh-kalash-brass',
    title: 'Divya Sangam Consecrated Brass Kumbh Kalash',
    category: 'vessels',
    priceINR: 4999,
    originalPriceINR: 6500,
    rating: 4.98,
    reviewsCount: 2410,
    tag: 'Bestseller • Consecrated',
    image: '/images/sacred-kumbh.png',
    secondaryImage: '/images/jalabhishek.png',
    shortDesc: 'Handcrafted pure antique brass Kalash, hand-engraved with sacred Gayatri mantra & Ashtalakshmi motifs.',
    description: 'Brought directly from the holy banks of Triveni Sangam. This heirloom-grade brass Kalash is consecrated by certified Vedic Teerth Purohits during auspicious Brahma Muhurta. Wrapped with pure marigold garlands and blessed with sacred mantras, it arrives sealed with holy Sangam jal, raksha sutra, and an authenticity certificate.',
    features: [
      'Pure solid brass with royal antique finish',
      'Hand-engraved Vedic iconography & Gayatri Mantra',
      'Sealed with 250ml consecrated Triveni Sangam jal inside',
      'Lab-certified Ganga Jal purity certificate included',
      'Tamper-proof sacred packaging with auspicious Kumkum & Akshat'
    ],
    variants: [
      { name: 'Standard Divine (750ml)', priceINR: 4999 },
      { name: 'Royal Antique Gold (1.2L)', priceINR: 6999 },
      { name: 'Panchdhatu Grand Edition (2L)', priceINR: 9999 }
    ],
    requiresSankalpa: false
  },
  {
    id: 'puja-rudrabhishek-sangam',
    title: 'Triveni Sangam Live Rudrabhishek & Jalabhishek Seva',
    category: 'pujas',
    priceINR: 3501,
    originalPriceINR: 4500,
    rating: 5.0,
    reviewsCount: 1890,
    tag: 'Most Sacred Ritual',
    image: '/images/rudrabhishek.png',
    secondaryImage: '/images/jalabhishek.png',
    shortDesc: 'Vedic Teerth Purohit performs sacred Jalabhishek with pure copper Kumbh over consecrated Shiva Lingam.',
    description: 'Experience the immense spiritual vibrations of the sacred Kumbh Kshetra from the comfort of your home. A verified Brahmin scholar performs an elaborate 45-minute Vedic Rudrabhishek on the holy riverbank with pure copper Kumbh and Sangam water in your name and Gotra. Includes live stream link and sanctified Prasad box delivered to your doorstep.',
    features: [
      'Performed live at Triveni Sangam ghat by Vedic Brahmins',
      'Personalized Sankalpa with devotee photo on the altar',
      'Private 1080p HD live broadcast & recorded video link',
      'Sacred Prasad kit shipped worldwide (Bhasma, Rudraksha, Dry Prasad)',
      'Auspicious Muhurta selection based on your Vedic Kundali'
    ],
    variants: [
      { name: 'Individual Devotee Sankalpa', priceINR: 3501 },
      { name: 'Family Sankalpa (Up to 4 Names)', priceINR: 5100 },
      { name: 'Maha Samputit Rudri (Extended 2-hr)', priceINR: 11000 }
    ],
    requiresSankalpa: true
  },
  {
    id: 'memorial-ghat-deep-daan',
    title: 'Sangam Ghat Memorial Deep Daan & Pitru Shanti Seva',
    category: 'memorial',
    priceINR: 2100,
    originalPriceINR: 2800,
    rating: 4.96,
    reviewsCount: 960,
    tag: 'Ancestral Blessings & Peace',
    image: '/images/ghat-memorial.png',
    secondaryImage: '/images/devotee-home.png',
    shortDesc: 'Auspicious twilight Ghat ritual with consecrated photo altar, brass Urli with holy flowers & 11 Akhand diyas.',
    description: 'Honor your beloved ancestors and departed loved ones at the timeless waters of Triveni Sangam. At dusk, your family photograph is placed on a consecrated wooden altar draped with fresh marigolds and white lilies. Vedic Purohits chant peace mantras while 11 handcrafted brass oil lamps (diyas) and holy offerings are floated down the sacred river for eternal peace and liberation (Moksha).',
    features: [
      'Photo of departed ancestor honored on consecrated ghat altar',
      '11 Brass Akhand diyas & flower boat released into Sangam',
      'Chanting of Pitru Gayatri & Vishnu Sahasranama mantras',
      'Full HD video recording & photography proof provided within 24 hours',
      'Sanctified Ganga soil and holy thread mailed to your address'
    ],
    variants: [
      { name: '11 Diyas Deep Daan Ceremony', priceINR: 2100 },
      { name: '21 Diyas Maha Deep Daan with Tarpan', priceINR: 3600 },
      { name: '51 Diyas Complete Pitru Moksha Seva', priceINR: 7500 }
    ],
    requiresSankalpa: true
  },
  {
    id: 'kumbh-snan-jalabhishek-kit',
    title: 'Maha Kumbh Pure Jal & Jalabhishek Samagri Kit',
    category: 'vessels',
    priceINR: 1850,
    originalPriceINR: 2400,
    rating: 4.93,
    reviewsCount: 3120,
    tag: 'Doorstep Divinity',
    image: '/images/jalabhishek.png',
    secondaryImage: '/images/sacred-kumbh.png',
    shortDesc: 'Pure hand-beaten copper lota with authentic Sangam snan jal, Kashi bhasma & consecrated puja samagri.',
    description: 'Everything required to perform an authentic home Jalabhishek with pristine water directly collected from the confluence of Ganga, Yamuna, and Saraswati during Shahi Snan hours. Complete with pure copper urn, organic chandan, bilva patra, and sacred raw akshat.',
    features: [
      '100% pure copper lota (tamba kalash)',
      '500ml vacuum-sealed Triveni Sangam jal (Bacteriologically tested)',
      'Authentic Kashi Vishwanath Vibhuti (Bhasma)',
      'Original 5-Mukhi Indonesian Rudraksha bead',
      'Step-by-step Vedic puja guidance booklet in English & Hindi'
    ],
    variants: [
      { name: 'Standard Kit (500ml Jal + Copper Lota)', priceINR: 1850 },
      { name: 'Deluxe Kit (1 Litre Jal + Brass Urli + Samagri)', priceINR: 2850 }
    ],
    requiresSankalpa: false
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Sacred Offerings', icon: 'Sparkles' },
  { id: 'vessels', name: 'Consecrated Kalash & Urns', icon: 'Crown' },
  { id: 'pujas', name: 'Live Ghat Pujas & Sankalpa', icon: 'Flame' },
  { id: 'memorial', name: 'Memorial & Deep Daan', icon: 'Heart' }
];

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.0094, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' }
};

export const REVIEWS = [
  {
    id: 1,
    name: 'Ananya & Rajesh Sharma',
    location: 'London, United Kingdom',
    rating: 5,
    date: '3 days ago',
    comment: 'Receiving the consecrated Kumbh Kalash in London brought tears to our eyes. The craftsmanship is breathtaking, and the sacred packaging kept everything immaculate. We felt directly connected to the Sangam.',
    verified: true,
    product: 'Divya Sangam Consecrated Brass Kumbh Kalash'
  },
  {
    id: 2,
    name: 'Dr. Vikram Malhotra',
    location: 'San Jose, California',
    rating: 5,
    date: '1 week ago',
    comment: 'The live Rudrabhishek was sublime. Seeing my parents photo placed by the Purohit on the ghat altar with our Gotra clearly chanted gave our family immense solace. Highly recommend.',
    verified: true,
    product: 'Triveni Sangam Live Rudrabhishek'
  },
  {
    id: 3,
    name: 'Meera Deshmukh',
    location: 'Pune, India',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The twilight Deep Daan video was sent right on time. Watching our 11 diyas float under the starlight on the Ganges was deeply moving. Authentic, trustworthy, and divine service.',
    verified: true,
    product: 'Sangam Ghat Memorial Deep Daan'
  }
];
