import { connect, disconnect } from "mongoose";
import { deleteMany, insertMany } from "./models/Listing";
import User, { findOne } from "./models/User";
import { config } from "dotenv";

config();

// Mock properties data from frontend
const mockProperties = [
  {
    title: "Modern Lakeside Cabin",
    description:
      "A stunning modern cabin with breathtaking lake views. Perfect for a peaceful getaway with all the comforts of home.",
    location: "Lake Tahoe, CA",
    price: 189,
    rating: 4.9,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    ],
    hostName: "Sarah Chen",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Entire cabin",
    amenities: [
      "WiFi",
      "Kitchen",
      "Free parking",
      "Lake view",
      "Fireplace",
      "Hot tub",
    ],
    isAvailable: true,
  },
  {
    title: "Cozy Mountain Retreat",
    description:
      "Escape to this cozy mountain retreat surrounded by nature. Enjoy stunning views and modern amenities in a peaceful setting.",
    location: "Aspen, CO",
    price: 245,
    rating: 4.8,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    ],
    hostName: "Michael Rodriguez",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Entire home",
    amenities: [
      "WiFi",
      "Kitchen",
      "Mountain view",
      "Ski storage",
      "Fireplace",
      "Deck",
    ],
    isAvailable: true,
  },
  {
    title: "Urban Loft Downtown",
    description:
      "Stylish urban loft in the heart of downtown. Perfect for business travelers or couples looking for a modern city experience.",
    location: "Portland, OR",
    price: 156,
    rating: 4.7,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
    ],
    hostName: "Emma Thompson",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "Entire loft",
    amenities: [
      "WiFi",
      "Kitchen",
      "City view",
      "Gym access",
      "Rooftop deck",
      "Concierge",
    ],
    isAvailable: true,
  },
  {
    title: "Beachfront Villa",
    description:
      "Luxurious beachfront villa with direct access to the ocean. Experience the ultimate beach vacation with premium amenities.",
    location: "Malibu, CA",
    price: 389,
    rating: 5.0,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    ],
    hostName: "David Park",
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    propertyType: "Entire villa",
    amenities: [
      "WiFi",
      "Kitchen",
      "Beach access",
      "Pool",
      "Hot tub",
      "Ocean view",
      "Private beach",
    ],
    isAvailable: true,
  },
  {
    title: "Desert Oasis Lodge",
    description:
      "Unique desert lodge offering a one-of-a-kind experience. Enjoy stunning red rock views and peaceful desert surroundings.",
    location: "Sedona, AZ",
    price: 298,
    rating: 4.9,
    reviews: 91,
    images: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    ],
    hostName: "Rachel Adams",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Entire lodge",
    amenities: [
      "WiFi",
      "Kitchen",
      "Desert view",
      "Hiking trails",
      "Spa access",
      "Outdoor shower",
    ],
    isAvailable: true,
  },
  {
    title: "Forest Hideaway",
    description:
      "Secluded forest cabin perfect for nature lovers. Disconnect from the world and reconnect with nature in this peaceful retreat.",
    location: "Olympic National Park, WA",
    price: 167,
    rating: 4.8,
    reviews: 74,
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    ],
    hostName: "James Wilson",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "Entire cabin",
    amenities: [
      "Kitchen",
      "Forest view",
      "Hiking trails",
      "Fire pit",
      "No WiFi",
      "Wildlife watching",
    ],
    isAvailable: true,
  },
];

// Create a default host user for the listings
const createDefaultHost = async () => {
  try {
    // Check if default host already exists
    let defaultHost = await findOne({ email: "default@stayfinder.com" });

    if (!defaultHost) {
      defaultHost = new User({
        name: "Default Host",
        email: "default@stayfinder.com",
        password: "defaultpassword123",
        role: "host",
      });
      await defaultHost.save();
      console.log("Default host created");
    }

    return defaultHost;
  } catch (error) {
    console.error("Error creating default host:", error);
    throw error;
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/stayfinder",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");

    // Clear existing listings
    await deleteMany({});
    console.log("Cleared existing listings");

    // Create default host
    const defaultHost = await createDefaultHost();

    // Create listings with the default host
    const listingsWithHost = mockProperties.map((property) => ({
      ...property,
      host: defaultHost._id,
    }));

    await insertMany(listingsWithHost);
    console.log("Database seeded successfully!");

    // Disconnect from MongoDB
    await disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
