const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Place = require('../models/Place');

const SAMPLE_LISTINGS = [
  {
    title: 'Cozy Mountain Cabin with Stunning Views',
    address: 'Aspen, Colorado, United States',
    photos: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
    ],
    description: 'Escape to this charming mountain cabin nestled in the heart of the Rockies. Enjoy breathtaking views, a cozy fireplace, and easy access to world-class skiing and hiking trails.',
    perks: ['wifi', 'parking', 'tv', 'pets'],
    extraInfo: 'Check-in after 3 PM. No smoking indoors.',
    maxGuests: 6,
    price: 185,
  },
  {
    title: 'Modern Loft in Downtown Arts District',
    address: 'Los Angeles, California, United States',
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    description: 'Stylish loft apartment in the vibrant Arts District. Walking distance to galleries, restaurants, and nightlife. Features exposed brick walls and floor-to-ceiling windows.',
    perks: ['wifi', 'tv', 'entrance'],
    extraInfo: 'Building has elevator access. Rooftop terrace available.',
    maxGuests: 4,
    price: 150,
  },
  {
    title: 'Beachfront Villa with Private Pool',
    address: 'Tulum, Quintana Roo, Mexico',
    photos: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
    ],
    description: 'Wake up to the sound of waves in this stunning beachfront villa. Features a private infinity pool, outdoor shower, and direct beach access.',
    perks: ['wifi', 'parking', 'tv', 'pets'],
    extraInfo: 'Private chef available upon request. Airport transfers included.',
    maxGuests: 8,
    price: 320,
  },
  {
    title: 'Charming Cottage in the Countryside',
    address: 'Cotswolds, England, United Kingdom',
    photos: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    ],
    description: 'A quintessential English countryside cottage with a thatched roof, beautiful gardens, and a warm fireplace. Perfect for a peaceful retreat.',
    perks: ['wifi', 'parking', 'pets'],
    extraInfo: 'Fresh eggs from our chickens available each morning!',
    maxGuests: 4,
    price: 130,
  },
  {
    title: 'Luxury Penthouse with City Skyline Views',
    address: 'New York City, New York, United States',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    ],
    description: 'Experience Manhattan from this stunning penthouse with panoramic skyline views. Features floor-to-ceiling windows, designer furniture, and a private terrace.',
    perks: ['wifi', 'tv', 'entrance'],
    extraInfo: 'Doorman building with 24/7 concierge. Gym and rooftop access included.',
    maxGuests: 2,
    price: 450,
  },
  {
    title: 'Traditional Riad with Rooftop Terrace',
    address: 'Marrakech, Morocco',
    photos: [
      'https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?w=800',
      'https://images.unsplash.com/photo-1528255671579-01b9e182ed1d?w=800',
    ],
    description: 'Stay in a beautifully restored traditional riad in the heart of the Medina. Features a stunning courtyard with a plunge pool and a rooftop terrace with Atlas Mountain views.',
    perks: ['wifi', 'tv'],
    extraInfo: 'Breakfast included. Walking tours of the Medina can be arranged.',
    maxGuests: 6,
    price: 95,
  },
  {
    title: 'Scandinavian A-Frame in the Forest',
    address: 'Bergen, Norway',
    photos: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
    ],
    description: 'A stunning A-frame cabin surrounded by Norwegian forest. Floor-to-ceiling windows bring nature inside. Perfect for hiking in summer and aurora viewing in winter.',
    perks: ['wifi', 'parking'],
    extraInfo: 'Firewood provided. Nearest grocery store is 10 minutes by car.',
    maxGuests: 4,
    price: 175,
  },
  {
    title: 'Sunny Apartment Near the Acropolis',
    address: 'Athens, Greece',
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    ],
    description: 'Bright, airy apartment with a balcony overlooking the Acropolis. Located in the charming Plaka neighborhood, steps from historic sites, tavernas, and shops.',
    perks: ['wifi', 'tv', 'entrance'],
    extraInfo: 'AC included. Walking map of Athens provided.',
    maxGuests: 3,
    price: 110,
  },
];

router.post('/', async (req, res) => {
  try {
    // Check if seed data already exists
    const existingPlaces = await Place.countDocuments();
    if (existingPlaces > 0) {
      return res.status(200).json({
        message: `Database already has ${existingPlaces} listings. Skipping seed.`,
        seeded: false,
      });
    }

    // Create a demo user
    let demoUser = await User.findOne({ email: 'demo@airbnb-clone.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo Host',
        email: 'demo@airbnb-clone.com',
        password: 'demo123456',
      });
    }

    // Create all listings
    const places = await Place.insertMany(
      SAMPLE_LISTINGS.map((listing) => ({
        ...listing,
        owner: demoUser._id,
      }))
    );

    res.status(201).json({
      message: `Seeded ${places.length} listings successfully`,
      seeded: true,
      count: places.length,
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Failed to seed database', error: error.message });
  }
});

module.exports = router;
