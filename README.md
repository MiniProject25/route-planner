# Route Planner - Frontend 🗺️

Interactive Next.js map interface for the **Route Planner** application, built with **React 19**, **Leaflet**, and **Tailwind CSS**.

Users can plan driving routes across the road network by **clicking two points on the map** or **searching locations by name** with automatic geocoding.

---

## ✨ Features

- **Interactive Leaflet Map**: Rendered using OpenStreetMap tiles with custom markers and smooth polyline drawing.
- **Click-to-Route**: Click once to place the starting marker, click a second time to place the destination; the shortest path is computed instantly.
- **Address & Landmark Search**: Type any starting address and destination; geocoded via OpenStreetMap Nominatim.
- **Responsive UI**: Overlay controls with feedback states, error handling, loading spinners, and clear buttons.
- **Strictly Typed**: Full TypeScript definitions for coordinates, Leaflet event handlers, and API responses. Zero ESLint warnings.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Library**: React 19
- **Map Engine**: [Leaflet](https://leafletjs.com) & [React-Leaflet](https://react-leaflet.js.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Language**: TypeScript 5

---

## 📁 Directory Structure

```text
route-planner/
├── app/
│   ├── layout.tsx         # Root layout with Leaflet CSS import
│   ├── page.tsx           # Page with dynamic client-side MapBox loader
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

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or later
- **npm** (or yarn / pnpm)
- The [Route Planner Backend](https://github.com/MiniProject25/route-planner-backend) running on `http://localhost:8080`.

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create or check `.env.local`:

```bash
cp .env.example .env.local
```

Ensure `NEXT_PUBLIC_BASE_URL` points to your running backend:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Starts production server after build |
| `npm run lint` | Runs ESLint and TypeScript type checking |

---

## 🔌 Backend API Integration

The frontend communicates with the backend via two main endpoints:

1. **Path by Coordinates**:
   ```http
   GET http://localhost:8080/route/pathByLatlng?lat1=12.87&lng1=74.88&lat2=12.86&lng2=74.85
   ```
2. **Path by Address**:
   ```http
   GET http://localhost:8080/route/path?from=Kadri+Mangalore&to=Hampankatta+Mangalore
   ```
