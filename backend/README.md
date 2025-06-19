# StayFinder Backend

The StayFinder backend is a RESTful API built with Node.js, Express, and MongoDB. It powers the StayFinder property rental platform, handling authentication, listings, bookings, and user management.

## Features

- User authentication with JWT (register/login)
- Role-based access control (user/host)
- Property listing management (CRUD)
- Booking system for guests and hosts
- Secure password hashing
- MongoDB data models for users, listings, and bookings
- API endpoints for all major actions

## Tech Stack

- Node.js & Express
- MongoDB (Mongoose ODM)
- JWT for authentication

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Create a `.env` file in the backend root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/stayfinder
   JWT_SECRET=your-super-secret-jwt-key
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000` by default.

## API Overview

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user

### Listings

- `GET /api/listings` — Get all listings
- `GET /api/listings/:id` — Get a single listing
- `POST /api/listings` — Create a new listing (host only)
- `PUT /api/listings/:id` — Update a listing (host only)
- `DELETE /api/listings/:id` — Delete a listing (host only)

### Bookings

- `GET /api/bookings/my-bookings` — Get user's bookings
- `GET /api/bookings/host-bookings` — Get host's bookings
- `POST /api/bookings` — Create a new booking
- `PUT /api/bookings/:id/status` — Update booking status (host only)

## Data Models

### User

- `name`, `email`, `password`, `role` (user/host), `createdAt`

### Listing

- `title`, `description`, `price`, `location`, `images`, `amenities`, `host`, `maxGuests`, `bedrooms`, `bathrooms`, `isAvailable`

### Booking

- `listing`, `guest`, `checkIn`, `checkOut`, `totalPrice`, `status`, `guests`, `createdAt`

## Deployment

- Deploy on any Node.js-compatible host.
- Ensure environment variables are set for production.

---

For frontend setup, see the [frontend README](../frontend/README.md).
