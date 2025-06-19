# StayFinder Frontend

StayFinder is a modern property rental platform. The frontend is built with React and Vite, providing a fast, responsive, and user-friendly experience for users and hosts.

## Features

- User authentication (register/login)
- Browse property listings with search and filters
- View detailed property information
- Book properties as a guest
- Host dashboard to manage listings and bookings
- Responsive design for mobile and desktop
- Toast notifications and modern UI components

## Tech Stack

- [React](https://react.dev/) (with hooks and context)
- [Vite](https://vitejs.dev/) for fast development and builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for client-side routing

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

- `src/pages/` — Main pages (Home, Login, Register, Property Details, etc.)
- `src/components/` — Reusable UI components
- `src/context/` — React context for authentication
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions

## Deployment

- SPA routing is supported via `static.json` and Render rewrite rules.
- To deploy, build the app and serve the `dist/` directory on your static host.

---

For backend/API setup, see the [backend README](../backend/README.md).
