# AI Tracker Monorepo Agent Instructions

## Project Overview

AI Tracker is a full-stack monorepo application built with modern technologies. The project appears to be in early development stage with a basic structure for user management, authentication, and project tracking capabilities.

## Project Structure

### Applications (`apps/` directory)
- **`api/`** - NestJS backend API server with comprehensive enterprise features
  - Built with NestJS, TypeORM, PostgreSQL, Redis, GraphQL, and REST APIs
  - Includes authentication, authorization, file handling, user management, organizations, and projects
  - Features: Docker containerization, monitoring (Prometheus/Grafana), job queues (BullMQ), email system, WebSockets
- **`web/`** - Modern React frontend application 
  - Built with React 19, Vite, TanStack Query, React Router 7, Zustand for state management
  - Uses workspace UI components and admin packages

### Packages (`packages/` directory)
- **`ui/`** - Shared UI component library
  - Built with React, Radix UI components, Tailwind CSS, shadcn/ui patterns
  - Includes comprehensive component set: forms, navigation, data display, feedback components
  - Features animation utilities and responsive design patterns
- **`auth/`** - Authentication package
  - Built with Better Auth, includes form validation with Zod and React Hook Form
  - Provides shared authentication logic across applications
- **`admin/`** - Administrative interface components
  - Built with React Admin (ra-core), includes CRUD operations, data management
  - Features command palette, dropzone, error boundaries
- **`api/`** - API client package
  - Generated TypeScript client from OpenAPI specifications
  - Includes TanStack Query integration for data fetching

### Tooling (`tooling/` directory)
- **`eslint-config/`** - Shared ESLint configurations for different environments
- **`typescript-config/`** - Shared TypeScript configurations (base, library, Next.js, Node.js, Vite)

## Technology Stack

### Backend (API)
- **Framework**: NestJS with Fastify adapter
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis with IORedis
- **Authentication**: Better Auth with advanced features (2FA, passkeys, magic links)
- **Queue System**: BullMQ for background job processing
- **Monitoring**: Prometheus metrics, Grafana dashboards, Sentry error tracking
- **API Types**: REST APIs + GraphQL with Apollo Server
- **Real-time**: WebSockets with Socket.io and Redis adapter
- **Email**: Nodemailer with React Email templates
- **File Storage**: AWS S3 integration
- **Containerization**: Docker with multi-stage builds and docker-compose

### Frontend
- **React App**: React 19, Vite, TypeScript
- **State Management**: Zustand, TanStack Query for server state
- **UI Framework**: Tailwind CSS, Radix UI, shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router 7 (React app), Next.js App Router (Next.js app)
- **Internationalization**: next-intl (Next.js app)

### Development Tools
- **Package Manager**: pnpm with workspaces
- **Build System**: Turbo for monorepo builds
- **Code Quality**: Biome for linting and formatting for frontend and packages, ESlint for apps/api NestJs app
- **Type Checking**: TypeScript 5.7+
- **Testing**: Jest with SWC
- **Git Hooks**: Husky with lint-staged
- **Containerization**: Docker with development and production configurations

## Development Environment

### Prerequisites
- Node.js >= 22
- pnpm 9.12.3+
- Docker and Docker Compose (for API development)
- PostgreSQL (or use Docker)
- Redis (or use Docker)

### Package Management
- **Install dependencies**: `pnpm install`
- **Build all packages**: `pnpm build` or `turbo build`
- **Development mode**: `pnpm dev` or `turbo dev`
- **Web app only**: `pnpm dev:web`

### Code Quality Scripts
- **Lint**: `pnpm lint` - Check code with Biome
- **Fix linting**: `pnpm lint:fix` - Auto-fix linting issues
- **Format**: `pnpm format` - Format code with Biome
- **Type check**: `pnpm type-check` - Run TypeScript checks across packages

### API Development
- **Start with Docker**: `pnpm docker:dev:up` (in apps/api)
- **Database migrations**: `pnpm migration:up`
- **Seed database**: `pnpm seed:run`
- **Generate ERD**: `pnpm erd:generate`
- **Email development**: `pnpm email:dev`

## Architecture Patterns

### Monorepo Structure
- Uses pnpm workspaces with Turbo for efficient builds and caching
- Shared packages for common functionality (UI, auth, API client)
- Consistent tooling across all packages

### Backend Architecture
- **Modular Design**: Feature-based modules (User, Organization, Project, File, Health)
- **Authentication**: Better Auth with comprehensive auth features
- **Database**: TypeORM with entity-based design and migrations
- **Caching**: Redis for session storage, caching, and pub/sub
- **Background Jobs**: BullMQ for asynchronous task processing
- **API Design**: Both REST and GraphQL endpoints
- **Real-time**: WebSocket support with Redis scaling
- **Monitoring**: Comprehensive observability with Prometheus, Grafana, and Sentry

### Frontend Architecture
- **Component-Driven**: Shared UI library with consistent design system
- **State Management**: Client state (Zustand) + Server state (TanStack Query)
- **Type Safety**: Full TypeScript coverage with generated API types
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Authentication**: Better Auth integration with form handling

## API Structure

### Core Modules
- **Health**: System health checks and monitoring endpoints
- **User**: User management, profiles, CRUD operations
- **File**: File upload, storage, and management
- **Organization**: Multi-tenant organization management
- **Project**: Project management and tracking
- **Auth**: Authentication and authorization (Better Auth integration)

### Features
- **REST APIs**: Traditional HTTP endpoints with OpenAPI documentation
- **GraphQL**: Type-safe GraphQL API with Apollo Server
- **WebSockets**: Real-time communication support
- **File Uploads**: Multipart file handling with AWS S3 storage
- **Background Jobs**: Queue-based processing with Bull Board monitoring
- **Rate Limiting**: Request throttling and protection
- **Internationalization**: Multi-language support
- **Email System**: Transactional emails with React Email templates

## Authentication System

### Better Auth Integration
- **Email/Password**: Traditional authentication with email verification
- **Magic Links**: Passwordless authentication via email
- **Two-Factor Authentication**: TOTP-based 2FA support
- **Passkeys**: WebAuthn/FIDO2 support for passwordless auth
- **Username Support**: Optional username-based authentication
- **Session Management**: Secure session handling with Redis storage

### Security Features
- **CORS**: Configurable cross-origin request handling
- **CSRF Protection**: Built-in CSRF token validation
- **Rate Limiting**: Request throttling per user/IP
- **Helmet**: Security headers and content security policy
- **Basic Auth**: Protected admin routes (Swagger, Bull Board)

## Database Design

### Core Entities
- **User**: User profiles with authentication data
- **Session**: User session management
- **Account**: Authentication account linking
- **Organization**: Multi-tenant organization structure
- **Project**: Project management entities
- **File**: File metadata and storage information

### Features
- **Migrations**: Version-controlled database schema changes
- **Seeding**: Database initialization with test data
- **Relationships**: Proper entity relationships with TypeORM
- **Soft Deletes**: Logical deletion support
- **Auditing**: Created/updated timestamps on entities

## Deployment & DevOps

### Containerization
- **Multi-stage Builds**: Optimized Docker images for production
- **Development**: Docker Compose with hot reload
- **Production**: Optimized containers with PM2 process management
- **Services**: Separate containers for API, worker, Redis, PostgreSQL

### Monitoring & Observability
- **Metrics**: Prometheus metrics collection
- **Visualization**: Grafana dashboards for monitoring
- **Error Tracking**: Sentry integration for error reporting
- **Logging**: Structured logging with Pino
- **Health Checks**: Comprehensive health monitoring

## Testing Strategy

### API Testing
- **Unit Tests**: Jest with SWC for fast execution
- **Integration Tests**: Database and service integration testing
- **E2E Tests**: Full application flow testing
- **Test Configuration**: Separate test environment setup

## Code Quality & Standards

### Linting & Formatting
- **Biome**: Fast linting and formatting for JavaScript/TypeScript
- **ESLint**: Additional linting for specific packages
- **Prettier**: Code formatting (where Biome is not used)
- **Git Hooks**: Pre-commit hooks with lint-staged

### Type Safety
- **TypeScript**: Strict type checking across all packages
- **Generated Types**: API client types generated from OpenAPI
- **Zod Validation**: Runtime type validation for forms and APIs

## Environment Configuration

### Development
- Environment variables managed through `.env` files
- Separate configurations for different environments
- Type-safe environment variable validation

### Production
- Docker-based deployment with environment variable injection
- Secrets management through container orchestration
- SSL/TLS termination and security headers

## Performance Optimizations

### Frontend
- **Code Splitting**: Automatic code splitting with Vite/Next.js
- **Image Optimization**: Next.js image optimization (legacy app)
- **Caching**: TanStack Query for intelligent data caching
- **Bundle Analysis**: Built-in bundle analysis tools

### Backend
- **Caching**: Redis caching for frequently accessed data
- **Database**: Query optimization and proper indexing
- **Background Jobs**: Async processing for heavy operations
- **Connection Pooling**: Efficient database connection management

## Development Guidelines

### Package Development
- Each package should be independently buildable and testable
- Use workspace dependencies (`workspace:*`) for internal packages
- Follow the established naming conventions (`@workspace/*`)
- Maintain consistent TypeScript configurations

### API Development
- Follow RESTful principles for REST endpoints
- Use proper HTTP status codes and error handling
- Implement comprehensive input validation
- Document APIs with OpenAPI/Swagger
- Write tests for all endpoints

### Frontend Development
- Use the shared UI components from `@workspace/ui`
- Follow the established component patterns
- Implement proper error boundaries
- Use TypeScript strictly with proper typing
- Follow responsive design principles

### Git Workflow
- Use conventional commits for commit messages
- Follow the established PR guidelines
- Run tests and linting before committing
- Keep commits focused and atomic

## Common Development Tasks

### Adding New API Endpoints
1. Create controller in appropriate module
2. Add validation DTOs
3. Implement service logic
4. Add tests
5. Update OpenAPI documentation
6. Regenerate API client types

### Adding New UI Components
1. Create component in `packages/ui/src/components/`
2. Export from package entry point
3. Add to Storybook (if applicable)
4. Write tests
5. Update TypeScript exports

### Database Changes
1. Create migration: `pnpm migration:create <name>`
2. Implement migration logic
3. Update entity definitions
4. Run migration: `pnpm migration:up`
5. Update seeds if necessary

## Troubleshooting

### Common Issues
- **Build Failures**: Check TypeScript errors and dependency issues
- **Database Connection**: Verify PostgreSQL connection and credentials
- **Redis Connection**: Ensure Redis is running and accessible
- **Port Conflicts**: Check for port conflicts in development
- **Authentication Issues**: Verify Better Auth configuration and database setup

### Debug Mode
- Enable debug logging in development environments
- Use browser dev tools for frontend debugging
- Use NestJS debug mode for backend issues
- Check Docker logs for containerized services

This documentation should be updated as the project evolves and new features are added. The AI Tracker project follows modern development practices and provides a solid foundation for building scalable web applications.
