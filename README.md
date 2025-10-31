# ORPC Test Application

A modern Next.js application demonstrating ORPC (OpenRPC) with Better Auth authentication and Drizzle ORM. This project showcases type-safe API procedures, comprehensive API documentation, authentication flows, and various HTTP methods with a beautiful glassmorphism UI.

## Deployment

https://orpc-ba-nextjs.vercel.app/

## Features

- **ORPC Integration**: Type-safe API procedures with automatic client generation
- **Comprehensive API Documentation**: Interactive docs at `/rpc` with Scalar UI, including detailed descriptions for all endpoints
- **Authentication**: Email/password authentication powered by Better Auth
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Demo Procedures**:
  - Hello procedure with GET method (demonstrating caching)
  - Basic math operations (addition/multiplication)
  - Email shuffling (authenticated procedure)
  - Error handling demonstrations
  - File upload with validation (JPEG/PNG/GIF/PDF, 5MB max)
  - Form validation with Zod schemas
  - Server-Sent Events streaming
  - Server actions for no-script form handling
- **Modern UI**: Responsive design with Tailwind CSS, glassmorphism sidebar, gradient backgrounds, and dark mode support
- **Mobile-First**: Sidebar navigation with smooth mobile animations
- **Type Safety**: Full TypeScript coverage with Zod validation
- **Developer Experience**: Biome linting, pre-commit hooks, and automated deployment

## Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **API**: ORPC (@orpc/server, @orpc/client, @orpc/contract, @orpc/openapi)
- **API Documentation**: Scalar API Reference for interactive docs
- **Authentication**: Better Auth with session management
- **Database**: PostgreSQL with Drizzle ORM for type-safe operations
- **Validation**: Zod schemas for runtime type checking
- **Styling**: Tailwind CSS with Radix UI components and glassmorphism effects
- **Language**: TypeScript with full type safety
- **Linting & Formatting**: Biome
- **Development Tools**: Lucidlines for process management
- **Deployment**: Vercel with GitHub Actions CI/CD
- **Pre-commit Hooks**: Husky with lint-staged for code quality automation

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

## API Procedures

The application demonstrates ORPC procedures accessible via interactive documentation at `/rpc`:

### Public Procedures
- `hello(name?: string)` - Returns a personalized greeting with timestamp (GET method, demonstrates caching)
- `add(a: number, b: number)` - Adds two numbers and returns the sum
- `multiply(a: number, b: number)` - Multiplies two numbers and returns the product
- `errorHandling(shouldError?: boolean)` - Demonstrates error handling capabilities
- `formValidation(name: string)` - Validates form data with Zod schema constraints
- `fileUpload(file: File)` - Uploads files with validation (JPEG/PNG/GIF/PDF, 5MB max)
- `eventIterator(duration?: string)` - Streams real-time events using Server-Sent Events
- `serverAction(email: string)` - Demonstrates server-side form processing

### Authenticated Procedures
- `shuffleEmail()` - Shuffles characters in the authenticated user's email address

### API Documentation
- **Interactive Docs**: Visit `/rpc` for API documentation powered by Scalar
- **OpenAPI Spec**: Available at `/rpc/spec.json` for integration with other tools
- **Type Safety**: All procedures are fully typed with automatic client generation

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
- **Pre-commit hooks**: Automated code quality checks with Husky and lint-staged

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
