const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

// Get all listings with search and filter functionality
router.get("/", async (req, res) => {
  try {
    const {
      location,
      checkin,
      checkout,
      guests,
      minPrice,
      maxPrice,
      propertyType,
    } = req.query;

    // Build search query
    let query = { isAvailable: true };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (guests) {
      query.maxGuests = { $gte: parseInt(guests) };
    }

    const listings = await Listing.find(query)
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    // Format response to match frontend expectations
    const formattedListings = listings.map((listing) => ({
      id: listing._id,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      rating: listing.rating,
      reviews: listing.reviews,
      image: listing.images[0] || "",
      host: listing.hostName,
      type: listing.propertyType,
      guests: listing.maxGuests,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      description: listing.description,
      amenities: listing.amenities,
      images: listing.images,
    }));

    res.json(formattedListings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get single listing
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "host",
      "name email"
    );
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Format response to match frontend expectations
    const formattedListing = {
      id: listing._id,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      rating: listing.rating,
      reviews: listing.reviews,
      image: listing.images[0] || "",
      host: listing.hostName,
      type: listing.propertyType,
      guests: listing.maxGuests,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      description: listing.description,
      amenities: listing.amenities,
      images: listing.images,
    };

    res.json(formattedListing);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(500).send("Server Error");
  }
});

// Create listing (host only)
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("price", "Price is required").isNumeric(),
      check("location", "Location is required").not().isEmpty(),
      check("maxGuests", "Maximum guests is required").isNumeric(),
      check("bedrooms", "Number of bedrooms is required").isNumeric(),
      check("bathrooms", "Number of bathrooms is required").isNumeric(),
      check("propertyType", "Property type is required").not().isEmpty(),
      check("hostName", "Host name is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newListing = new Listing({
        ...req.body,
        host: req.user.id,
      });

      const listing = await newListing.save();
      res.json(listing);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update listing (host only)
router.put("/:id", auth, async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if user is the host
    if (listing.host.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(listing);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(500).send("Server Error");
  }
});

// Delete listing (host only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if user is the host
    if (listing.host.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await listing.remove();
    res.json({ message: "Listing removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
