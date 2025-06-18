const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev
      "https://stayfinder-frontend-r08i.onrender.com", // your deployed frontend
    ],
    credentials: true, // if you use cookies/auth
  })
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/stayfinder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/listings", require("./routes/listings"));
app.use("/api/bookings", require("./routes/bookings"));

// Temporary seed endpoint - REMOVE THIS AFTER SEEDING
app.get("/api/seed", async (req, res) => {
  try {
    const Listing = require("./models/Listing");
    const User = require("./models/User");

    // Mock properties data
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
    let defaultHost = await User.findOne({ email: "default@stayfinder.com" });

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

    // Clear existing listings
    await Listing.deleteMany({});
    console.log("Cleared existing listings");

    // Create listings with the default host
    const listingsWithHost = mockProperties.map((property) => ({
      ...property,
      host: defaultHost._id,
    }));

    await Listing.insertMany(listingsWithHost);
    console.log("Database seeded successfully!");

    res.json({
      message: "Database seeded successfully!",
      count: mockProperties.length,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
