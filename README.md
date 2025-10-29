# ORPC Test Application

A modern Next.js application demonstrating ORPC (OpenRPC) with Better Auth authentication and Drizzle ORM. This project showcases type-safe API procedures, authentication flows, and various HTTP methods.

## Features

- **ORPC Integration**: Type-safe API procedures with automatic client generation
- **Authentication**: Email/password authentication powered by Better Auth
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Demo Procedures**:
  - Basic math operations (addition/multiplication)
  - Hello procedure with GET method (demonstrating caching)
  - Email shuffling (authenticated procedure)
- **Modern UI**: Responsive design with Tailwind CSS and dark mode support
- **Mobile-First**: Sidebar navigation with smooth mobile animations
- **Type Safety**: Full TypeScript coverage with Zod validation
- **Developer Experience**: Biome linting, pre-commit hooks, and automated deployment

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **API**: ORPC (@orpc/server, @orpc/client, @orpc/contract)
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with Radix UI components
- **Language**: TypeScript
- **Linting**: Biome
- **Deployment**: Vercel with GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm
- Docker and Docker Compose (for local database)

### Database Setup

1. Start the PostgreSQL database:
```bash
docker-compose up -d
```

2. Copy the environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your actual values if needed.

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Generate authentication schema:
```bash
pnpm auth:generate
```

3. Run database migrations:
```bash
pnpm db:migrate
```

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm auth:generate` - Generate Better Auth schema
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm lucidlines` - Run Lucidlines development tool

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/[...all]/ # Better Auth API routes
│   ├── basic/             # Math operations demo page
│   ├── using-get/         # GET method demo page
│   └── rpc/[[...rest]]/   # ORPC API routes
├── components/            # React components
│   ├── auth.tsx          # Authentication component
│   ├── shuffle-email.tsx # Email shuffling demo
│   └── sidebar.tsx       # Navigation sidebar
├── lib/
│   ├── db/               # Database configuration and schemas
│   ├── orpc/             # ORPC contracts, routers, and client
│   └── stores/           # State management (auth store)
└── stores/               # Additional stores
```

## API Procedures

The application demonstrates several ORPC procedures:

### Public Procedures
- `hello(name?: string)` - Returns a greeting with timestamp (GET method)
- `add(a: number, b: number)` - Adds two numbers
- `multiply(a: number, b: number)` - Multiplies two numbers

### Authenticated Procedures
- `shuffleEmail()` - Shuffles characters in the authenticated user's email

## Authentication

The app uses Better Auth for authentication with the following features:
- Email/password sign-in
- Session management
- Protected routes and procedures
- Automatic session persistence

## Database

The application uses PostgreSQL with Drizzle ORM:
- Type-safe queries and mutations
- Automatic migration generation
- Schema validation with Zod

## Development

### Code Quality
- **Biome**: Linting and formatting
- **TypeScript**: Full type safety
- **Pre-commit hooks**: Automated code quality checks with lefthook

### File Naming Convention
All filenames in `/src` directory must use lowercase with hyphens:
- ✅ `user-profile.tsx`
- ✅ `auth-config.ts`
- ❌ `UserProfile.tsx`
- ❌ `authConfig.ts`

## Deployment

The application is configured for deployment to Vercel with GitHub Actions:

### Automatic Deployment
- Triggers on pushes to `main` branch
- Builds and deploys to production
- Monitors changes to source files, config, and dependencies

### Environment Variables
Required environment variables for production:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `BETTER_AUTH_SECRET` - Better Auth secret
- `BETTER_AUTH_URL` - Application URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting: `pnpm lint`
5. Format code: `pnpm format`
6. Commit your changes
7. Push to your fork
8. Create a pull request

## Learn More

- [ORPC Documentation](https://orpc.unnoq.com) - Learn about ORPC framework
- [Better Auth](https://better-auth.com) - Authentication library
- [Drizzle ORM](https://orm.drizzle.team) - Database toolkit
- [Next.js Documentation](https://nextjs.org/docs) - Next.js framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
