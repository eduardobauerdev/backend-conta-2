# GitHub Copilot Instructions

This is a Next.js 15+ application with TypeScript for a business management system (CRM, contracts, orders, WhatsApp integration) built for v0 compatibility.

## Architecture Overview

### Hybrid Mode System
- **Demo Mode**: Uses mock data when WhatsApp server not configured (for v0 preview)
- **Production Mode**: Connects to external Express.js server via Railway for real WhatsApp integration
- **Detection**: Checks `whatsapp_config.server_url` in Supabase to determine mode

### Core Technologies
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Supabase (PostgreSQL), Next.js API Routes
- **State**: React Context + SWR for caching
- **Auth**: Custom cookie-based auth with Supabase
- **Permissions**: Granular role-based access control
- **Documents**: Local template engine with PDF generation

## Key Patterns

### Client Components
- All interactive components use `"use client"` directive
- Context providers in `/contexts/` manage global state
- Custom hooks in `/hooks/` for reusable logic
- Permission-based UI rendering via `usePermissions()`

### API Structure
```
/app/api/
├── whatsapp/          # WhatsApp integration endpoints
├── generate-document/ # Local document generation (replaces n8n)
├── contrato-fisica/   # Contract endpoints
├── contrato-juridica/
└── ordem/            # Service order endpoints
```

### Document Generation System
- **Templates**: HTML templates in `/templates/` with `{{variable}}` syntax
- **Engine**: `/lib/document-generator/` processes templates + data
- **Output**: HTML preview + PDF generation via browser print API
- **Replaces**: Previous n8n webhook system for document creation

### Database Patterns
- Use `createServerClient()` for server-side Supabase calls
- Use `getSupabaseClient()` for client-side operations
- Realtime subscriptions via custom `useRealtimeSubscription()` hook
- Permission checks always run server-side for security

### Component Structure
```
/components/
├── ui/           # Radix UI components with custom styling
├── forms/        # Form components for contracts/orders
├── whatsapp/     # WhatsApp-specific components
├── crm/          # CRM/leads components
└── document-generator/ # Document preview/generation components
```

## Critical Conventions

### Error Handling
- API routes return `{ success: boolean, error?: string }` format
- Client components show user-friendly error messages
- Log errors with context: `console.error("[Component] Error:", error)`

### Data Validation
- Server-side validation for all API endpoints
- Client-side validation for UX (not security)
- Use Supabase RLS policies for data access control

### WhatsApp Integration
- Check configuration before calling external APIs
- Graceful fallback to demo data when server unavailable
- Cache chat/message data to reduce API calls

### File Organization
- Page components in `/app/(app)/` for authenticated routes
- API routes follow REST conventions
- Shared types in `/lib/types.ts` and `/app-types.ts`
- Business logic in `/lib/` utilities

## Development Workflow

### Adding New Features
1. Check permissions requirements in `/hooks/use-permissions.ts`
2. Create API endpoint with proper validation
3. Build UI component with error handling
4. Add to appropriate navigation in `Sidebar.tsx`
5. Test both demo and production modes

### Document Templates
- Edit templates in `/templates/` directory
- Use simple `{{variable}}` syntax, no complex logic
- Test with `/api/generate-document?action=preview`
- Support arrays/objects via flattened variables

### WhatsApp Features
- Always check `isApiConfigured()` before external calls
- Use demo data from `lib/whatsapp-demo-data.ts` for v0 preview
- Implement realtime updates for production mode

## Common Pitfalls
- Missing `"use client"` on interactive components
- Not checking permissions before rendering UI
- Hardcoding API URLs (use environment variables)
- Forgetting CORS headers on API routes
- Not handling Supabase connection errors gracefully

## Key Files to Understand
- `/lib/document-generator/` - Document generation system
- `/contexts/user-context.tsx` - Authentication state
- `/hooks/use-permissions.ts` - Permission system
- `/components/Sidebar.tsx` - Main navigation
- `/app/(app)/layout.tsx` - Authenticated layout wrapper