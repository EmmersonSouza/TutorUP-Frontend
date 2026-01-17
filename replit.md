# REST Express Application

## Overview
A full-stack application built with Express.js backend and React frontend using Vite.

## Tech Stack
- **Backend**: Express.js with TypeScript
- **Frontend**: React with Vite, TailwindCSS
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui

## Project Structure
```
├── client/          # React frontend
│   ├── src/         # Source files
│   └── public/      # Static assets
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   ├── storage.ts   # Data storage layer
│   ├── static.ts    # Static file serving
│   └── vite.ts      # Vite dev server integration
├── shared/          # Shared code between client/server
│   └── schema.ts    # Database schema (Drizzle)
├── attached_assets/ # Asset files
└── migrations/      # Database migrations
```

## Scripts
- `npm run dev` - Start development server (serves both API and client on port 5000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

## Development
The dev server runs on port 5000, serving both the Express API and the Vite-bundled React frontend.

## Database
Using PostgreSQL with Drizzle ORM. Schema is defined in `shared/schema.ts`.
