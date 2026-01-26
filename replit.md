# МООС Landing Page

## Overview

This is a Russian-language landing page for МООС (Медицинское Оборудование Обеспечение Сервис) - a medical equipment and services company. The application is a full-stack TypeScript project with a React frontend and Express backend, designed to showcase the company's medical equipment manufacturing, pharmaceutical production, and supply chain services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and loading screens
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Path aliases (`@/` for client/src, `@shared/` for shared code)
- Medical-themed color palette (primary: #20b4c0 teal, secondary: #0d2d56 navy)
- Custom fonts: "Wix Madefor Display" for headings, Calibri fallback for body text

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Validation**: Zod with drizzle-zod integration
- **Session Storage**: connect-pg-simple for PostgreSQL session storage

The server uses a modular structure:
- `server/index.ts` - Main entry point with middleware setup
- `server/routes.ts` - API route registration
- `server/storage.ts` - Data access layer with in-memory fallback
- `server/vite.ts` - Vite dev server integration for development
- `server/static.ts` - Static file serving for production

### Data Storage
- **Primary Database**: PostgreSQL (via DATABASE_URL environment variable)
- **ORM**: Drizzle ORM with schema defined in `shared/schema.ts`
- **Migrations**: Drizzle Kit for schema migrations (`migrations/` directory)
- **Development Fallback**: In-memory storage implementation

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production Build**: 
  - Frontend: Vite builds to `dist/public`
  - Backend: esbuild bundles server to `dist/index.cjs`
  - Dependencies are selectively bundled to optimize cold start times

## External Dependencies

### Database
- PostgreSQL database (required, configured via `DATABASE_URL` environment variable)
- Drizzle Kit for database migrations (`npm run db:push`)

### UI Component Libraries
- Radix UI primitives (comprehensive set for accessible components)
- shadcn/ui styling conventions with Tailwind CSS
- Embla Carousel for image carousels
- Framer Motion for animations
- Lucide React for icons

### Development Tools
- Replit-specific plugins for development (cartographer, dev-banner, error overlay)
- TypeScript with strict mode
- PostCSS with Tailwind and Autoprefixer

### Key NPM Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run db:push` - Push schema changes to database