# AI-Powered Telecom Onboarding Platform

## Overview

This is a full-stack telecom onboarding platform that uses AI to streamline SIM activation and customer verification. The system provides separate portals for individual customers, enterprises, and telecom operators, with intelligent document processing, face verification, and fraud detection capabilities.

The platform handles the complete KYC (Know Your Customer) process for telecom services, from initial customer registration through document verification, biometric authentication, plan selection, and final SIM activation. It supports both individual customers and bulk enterprise onboarding with automated AI-powered verification workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with structured route handlers
- **File Uploads**: Multer middleware for handling document uploads
- **Error Handling**: Centralized error handling with custom error responses

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL with schema-first approach
- **Migration Management**: Drizzle Kit for database migrations
- **Schema Organization**: Shared schema definitions between frontend and backend

### Key Data Models
- **Users**: Multi-role user system (customer, enterprise, operator)
- **Customer Profiles**: Personal information and KYC status tracking
- **Documents**: File storage with AI extraction metadata and verification status
- **Face Verifications**: Biometric verification with liveness and match scores
- **SIM Activations**: Plan assignments and activation status tracking
- **Enterprise Profiles**: Business account management
- **Employees**: Enterprise employee management with bulk operations
- **Fraud Alerts**: AI-powered fraud detection with severity levels

### AI Integration Architecture
- **Document Processing**: OCR and data extraction from identity documents
- **Face Recognition**: Liveness detection and identity matching
- **Fraud Detection**: Real-time monitoring with configurable alert thresholds
- **Plan Recommendations**: AI-driven plan suggestions based on usage patterns

### Authentication & Security
- **Session Management**: Express sessions with PostgreSQL storage
- **File Security**: Secure file upload handling with type validation
- **Data Validation**: Comprehensive input validation using Zod schemas
- **CORS Configuration**: Configured for cross-origin requests

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Hot Reload**: Development server with instant updates
- **Path Aliases**: Configured import aliases for clean code organization

## External Dependencies

### Core Backend Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Integration between Drizzle schema and Zod validation
- **express**: Web application framework
- **multer**: File upload middleware
- **connect-pg-simple**: PostgreSQL session store

### Frontend UI Dependencies
- **@radix-ui/**: Complete suite of accessible UI primitives including dialogs, dropdowns, forms, and navigation components
- **@tanstack/react-query**: Powerful data synchronization for React
- **@hookform/resolvers**: Form validation resolvers
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for constructing className strings conditionally

### Development Dependencies
- **vite**: Next generation frontend tooling
- **tsx**: TypeScript execution engine for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **embla-carousel-react**: Carousel component for React
- **cmdk**: Fast command menu component
- **wouter**: Minimalist routing library for React
- **nanoid**: URL-safe unique string ID generator

### Type Definitions
- Comprehensive TypeScript support with proper type definitions for all major dependencies
- Custom type definitions for shared schemas and API interfaces
- Strict TypeScript configuration with enhanced type checking