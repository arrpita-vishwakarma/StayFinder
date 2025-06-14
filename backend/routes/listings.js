const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("host", "name email");
    res.json(listings);
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
    res.json(listing);
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
