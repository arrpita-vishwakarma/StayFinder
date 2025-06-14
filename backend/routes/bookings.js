const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

// Get all bookings for a user
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.id })
      .populate("listing")
      .populate("guest", "name email");
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all bookings for a host's listings
router.get("/host-bookings", auth, async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user.id });
    const listingIds = listings.map((listing) => listing._id);

    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate("listing")
      .populate("guest", "name email");
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a booking
router.post(
  "/",
  [
    auth,
    [
      check("listing", "Listing ID is required").not().isEmpty(),
      check("checkIn", "Check-in date is required").not().isEmpty(),
      check("checkOut", "Check-out date is required").not().isEmpty(),
      check("guests", "Number of guests is required").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { listing, checkIn, checkOut, guests } = req.body;

      // Check if listing exists
      const listingDoc = await Listing.findById(listing);
      if (!listingDoc) {
        return res.status(404).json({ message: "Listing not found" });
      }

      // Check if dates are valid
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkInDate >= checkOutDate) {
        return res
          .status(400)
          .json({ message: "Check-out date must be after check-in date" });
      }

      // Check if listing is available for these dates
      const existingBooking = await Booking.findOne({
        listing,
        status: "confirmed",
        $or: [
          {
            checkIn: { $lte: checkOutDate },
            checkOut: { $gte: checkInDate },
          },
        ],
      });

      if (existingBooking) {
        return res
          .status(400)
          .json({ message: "Listing is not available for these dates" });
      }

      // Calculate total price
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = nights * listingDoc.price;

      const newBooking = new Booking({
        listing,
        guest: req.user.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        totalPrice,
      });

      const booking = await newBooking.save();
      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update booking status (host only)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id).populate("listing");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user is the host of the listing
    if (booking.listing.host.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
