# Agent Guidelines

## File Naming Convention

All filenames in /src dir must use **lowercase with hyphens** for multi-word names.

### Examples:
- ✅ `user-profile.tsx`
- ✅ `auth-config.ts`
- ✅ `database-schema.ts`
- ❌ `UserProfile.tsx`
- ❌ `authConfig.ts`
- ❌ `database_schema.ts`

### Why?
- Consistent naming across the codebase
- Better compatibility with different file systems
- Follows web standards and common conventions
- Easier to read and maintain

## Code Style

- Use TypeScript for all new files
- Follow the existing Biome configuration for formatting
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

## Database

- Use Drizzle ORM for all database operations
- Follow the schema definitions in `src/lib/db/schema.ts`
- Run migrations with `pnpm db:migrate`
- Generate migrations with `pnpm db:generate`

## Authentication

- Use Better Auth for authentication
- All auth-related API routes go through `/api/auth/[...all]`
- Client-side auth handled through `createAuthClient()`
