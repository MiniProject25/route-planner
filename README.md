# Route Planner - Frontend

Next.js frontend for the route planner project. Built to visualize shortest path routing on an interactive map. This project was developed as a learning exercise to explore graph algorithms and spatial data.

## Features

- Interactive map using Leaflet and OpenStreetMap tiles
- Route calculation by clicking two points on the map
- Address search using OpenStreetMap Nominatim for geocoding
- Polyline rendering for the calculated path
- Error handling and loading states for search requests

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Leaflet & React-Leaflet
- Tailwind CSS
- TypeScript

## Directory Structure

```text
route-planner/
├── app/
│   ├── layout.tsx         # Root layout with Leaflet CSS import
│   ├── page.tsx           # Page with dynamic MapBox component loader
│   └── globals.css        # Tailwind CSS styles
├── Components/
│   ├── Map.tsx            # Leaflet map container, markers, and polyline renderer
│   ├── FromTo.tsx         # Address search card overlay
│   └── MapClickHandler.ts # Leaflet map click listener hook
├── types/
│   └── types.ts           # LatLng and coordinate types
├── .env.local             # Environment variables (backend URL)
├── .env.example           # Example environment template
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- The backend running on `http://localhost:8080`

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` if it does not already exist:

```bash
cp .env.example .env.local
```

Ensure `NEXT_PUBLIC_BASE_URL` points to the backend server:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev`: Runs the development server on `http://localhost:3000`.
- `npm run build`: Compiles and builds the production application.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to check for code issues.

## Backend Communication

The frontend calls two backend endpoints:

- `GET /route/pathByLatlng?lat1={lat1}&lng1={lng1}&lat2={lat2}&lng2={lng2}`: Used when clicking two points on the map.
- `GET /route/path?from={from}&to={to}`: Used when searching addresses in the search box.
