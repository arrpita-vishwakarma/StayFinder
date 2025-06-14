# StayFinder Backend

This is the backend server for the StayFinder application, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Property listings management
- Booking system
- Role-based access control (host/user)

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stayfinder
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Listings

- GET `/api/listings` - Get all listings
- GET `/api/listings/:id` - Get single listing
- POST `/api/listings` - Create new listing (host only)
- PUT `/api/listings/:id` - Update listing (host only)
- DELETE `/api/listings/:id` - Delete listing (host only)

### Bookings

- GET `/api/bookings/my-bookings` - Get user's bookings
- GET `/api/bookings/host-bookings` - Get host's bookings
- POST `/api/bookings` - Create new booking
- PUT `/api/bookings/:id/status` - Update booking status (host only)

## Database Models

### User

- name
- email
- password
- role (user/host)
- createdAt

### Listing

- title
- description
- price
- location
- images
- amenities
- host (ref: User)
- maxGuests
- bedrooms
- bathrooms
- isAvailable

### Booking

- listing (ref: Listing)
- guest (ref: User)
- checkIn
- checkOut
- totalPrice
- status (pending/confirmed/cancelled)
- guests
- createdAt
