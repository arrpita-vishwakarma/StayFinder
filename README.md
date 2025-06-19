# StayFinder

StayFinder is a full-stack property rental platform that allows users to browse, book, and host properties. Built with a modern tech stack (React, Vite, Node.js, Express, MongoDB), it provides a seamless experience for both guests and hosts.

## Features

- User authentication (register/login)
- Browse and search property listings
- View detailed property information
- Book properties as a guest
- Host dashboard to manage listings and bookings
- Role-based access control (user/host)
- Responsive, modern UI

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB, JWT

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PrakharSinghG/StayFinder.git
cd StayFinder
```

### 2. Setup the Backend

```bash
cd backend
npm install
# Create a .env file (see backend/README.md for details)
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in your browser

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Project Structure

- `frontend/` — React + Vite app (user interface)
- `backend/` — Node.js + Express API (server, database)

## Deployment

- Frontend can be deployed to any static host (Render, Netlify, Vercel, etc.)
- Backend can be deployed to any Node.js-compatible host
- SPA routing is supported via `static.json` and Render rewrite rules

---

For more details, see the [frontend](frontend/README.md) and [backend](backend/README.md) READMEs.
