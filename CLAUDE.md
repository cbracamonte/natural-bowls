# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Natural Bowls is a food e-commerce platform for a healthy bowls restaurant in Trujillo, Peru. The site is in Spanish and uses PEN currency. The repo is a monorepo with two independent apps:

- **Frontend**: `frontend/naturalbowls-web/` — Next.js 16.1.6, React 19, TypeScript, Tailwind CSS 4
- **Backend**: `backend/` — NestJS 11, TypeScript, PostgreSQL (AWS RDS)

## Commands

### Frontend (`cd frontend/naturalbowls-web`)
```bash
npm run dev        # Dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint (Next.js core-web-vitals + TypeScript rules)
npm start          # Serve production build
```

### Backend (`cd backend`)
```bash
npm run start:dev    # Dev server with watch mode
npm run build        # Compile with nest build
npm run lint         # ESLint with auto-fix
npm run test         # Jest unit tests (*.spec.ts files in src/)
npm run test:watch   # Jest in watch mode
npm run test:e2e     # E2E tests (test/jest-e2e.json config)
npm run format       # Prettier formatting

# Run a single test file
npx jest --testPathPattern=products.spec
```

## Architecture

### Frontend

Uses Next.js App Router with Spanish route names (`/carrito`, `/checkout`, `/confirmacion`, `/producto/[id]`, `/menu`, `/bowls`, `/promociones`, `/catering`).

- **`data/`** — Static product/menu data. Each menu category has its own file in `data/menu/` (e.g., `poke-bowls.ts`, `smoothie-bowls.ts`). To add products, create or edit the relevant category file and re-export from `data/index.ts`.
- **`lib/schemas/`** — TypeScript type definitions (Product, Cart, Checkout, Order, Category, Promotion, nutrition types). This is the type system — import from `@/lib/schemas`.
- **`lib/services/`** — Business logic services (checkout, poke-bowl/smoothie-bowl customization, newsletter, discount codes)
- **`lib/seo/`** — Centralized SEO metadata and constants
- **`context/CartContext.tsx`** — Global cart state via React Context
- **`components/`** — Organized by feature: `home/`, `cart/`, `products/`, `menu/`, `layout/` (Header/Footer), `a11y/`, `seo/`, `ui/`, `reservation/`, `banners/`

Deployed on Vercel with cron jobs configured in `vercel.json`.

### Backend

Modular monolith with hexagonal (clean) architecture. Each module in `src/modules/` follows the same internal structure:

```
module/
├── api/            # Public controllers
├── admin/          # Backoffice controllers
├── application/    # Service/use-case layer
├── domain/         # Entities and business rules
├── infrastructure/ # Repository implementations
└── module.ts       # NestJS module definition
```

Modules: `auth`, `cart`, `catalog`, `customers`, `inventory`, `loyalty`, `orders`, `pricing`, `products`.

- **`src/infrastructure/database/`** — PostgreSQL connection (AWS RDS), schema bootstrap via `schema.sql`
- **`src/security/`** — JWT guards, role-based decorators, roles enum
- **`src/common/`** — Shared DTOs and exception filters
- DB credentials stored in AWS Secrets Manager

## Git Workflow

- `main` is protected — merges only via approved PRs
- `dev` is the development base branch
- Feature branches: `feature/name` from `dev`, PR to `dev`, then PR from `dev` to `main`
- Run `lint` and `build` before pushing

## Key Details

- WhatsApp integration for ordering: number 51912341818
- Icons via `lucide-react`
- Backend API docs via Swagger (`@nestjs/swagger`)
- Backend env vars: `AWS_REGION`, `DB_SECRET_NAME`
- Frontend env vars: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_GOOGLE_VERIFICATION`
