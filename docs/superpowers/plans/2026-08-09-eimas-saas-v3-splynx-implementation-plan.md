# EIMAS SaaS v3.0 Splynx-Aligned Monorepo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the foundational Turborepo monorepo for EIMAS SaaS v3.0, including shared packages (`shared-zod`, `ui`, `database`), the Splynx-aligned Admin Dashboard SPA shell (`admin-dashboard`), and the NestJS API Gateway shell (`api-server`) with Supabase PostgreSQL Drizzle ORM schemas and RLS multi-tenancy.

**Architecture:** Monorepo architecture using Turborepo + pnpm. Shared TypeScript definitions and Zod schemas in `/packages/shared-zod`, shared UI components in `/packages/ui`, and Drizzle ORM schemas with Supabase PostgreSQL connection pooler (Supavisor Port 6543) in `/packages/database`. The Admin Dashboard is a React + Vite SPA with Zustand state management and a Splynx-style hierarchical navigation layout. The API Server is a NestJS app with Fastify adapter, JWT Auth Guard, and OpenAPI Swagger integration.

**Tech Stack:** Turborepo, pnpm, TypeScript, React 18, Vite, Tailwind CSS, Shadcn UI, Zustand, TanStack Query, NestJS, Fastify, Drizzle ORM, PostgreSQL (Supabase), Redis, BullMQ, Zod.

## Global Constraints

- **Monorepo Tooling**: Turborepo + pnpm workspace management.
- **Node.js Runtime**: Node.js >= 20.0.0, pnpm >= 9.0.0.
- **Database Engine**: PostgreSQL 15+ (Supabase managed), Drizzle ORM, Supavisor Port 6543 Transaction Mode.
- **Authentication & RLS**: Supabase Auth JWT claiming `tenant_id` UUID from `app_metadata`.

### Mandatory SaaS & Engineering Standards:
1. **Conventional Commits**: All commit steps MUST use Conventional Commits format (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
2. **Security Considerations (OWASP Audit)**: Every task includes input validation, authorization checks, and zero secrets hardcoded in source code.
3. **OpenAPI / Swagger Spec**: REST API endpoints MUST include OpenAPI 3.0 annotations and DTO schemas.
4. **Structured Logging & Error Boundaries**: Enforce structured JSON logging and React error boundaries.
5. **Enterprise PRD & Compliance**: Multi-tenant data isolation via DB RLS, encrypted payloads, and audit logging.

---

## File Structure

```text
/cl-spylinx
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── /packages
│   ├── /shared-zod
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── bss.schema.ts
│   │       ├── oss.schema.ts
│   │       ├── crm.schema.ts
│   │       └── erp.schema.ts
│   ├── /ui
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   └── src/
│   │       ├── index.ts
│   │       ├── components/
│   │       └── lib/utils.ts
│   └── /database
│       ├── package.json
│       ├── tsconfig.json
│       ├── drizzle.config.ts
│       └── src/
│           ├── index.ts
│           ├── client.ts
│           ├── schema/
│           │   ├── index.ts
│           │   ├── bss.ts
│           │   ├── oss.ts
│           │   ├── crm.ts
│           │   └── erp.ts
│           └── rls/
│               └── policies.sql
└── /apps
    ├── /admin-dashboard
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   ├── index.html
    │   └── src/
    │       ├── main.tsx
    │       ├── App.tsx
    │       ├── components/
    │       │   └── layout/
    │       │       ├── Sidebar.tsx
    │       │       ├── TopBar.tsx
    │       │       └── AdminLayout.tsx
    │       ├── modules/
    │       │   ├── crm/
    │       │   ├── bss/
    │       │   ├── oss/
    │       │   ├── erp/
    │       │   └── system/
    │       └── lib/
    │           ├── api-client.ts
    │           └── store.ts
    └── /api-server
        ├── package.json
        ├── tsconfig.json
        ├── src/
        │   ├── main.ts
        │   ├── app.module.ts
        │   ├── common/
        │   │   ├── guards/
        │   │   │   ├── auth.guard.ts
        │   │   │   ├── rbac.guard.ts
        │   │   │   └── tenant.guard.ts
        │   │   └── filters/
        │   │       └── http-exception.filter.ts
        │   └── modules/
        │       ├── bss/
        │       ├── oss/
        │       ├── crm/
        │       └── erp/
        └── test/
            └── app.e2e-spec.ts
```

---

## Tasks

### Task 1: Monorepo Workspace Initialization

**Files:**
- Create: `package.json`
- Create: `turbo.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.json`
- Create: `.gitignore`

**Interfaces:**
- Consumes: None
- Produces: Monorepo root configuration, pnpm workspace definition, and Turborepo pipeline settings.

- [ ] **Step 1: Write root package.json configuration**

```json
{
  "name": "cl-spylinx",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0",
    "prettier": "^3.2.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0"
  }
}
```

- [ ] **Step 2: Write turbo.json pipeline configuration**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- [ ] **Step 3: Write pnpm-workspace.yaml configuration**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'services/*'
```

- [ ] **Step 4: Write root tsconfig.json configuration**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 5: Write .gitignore**

```text
node_modules
.turbo
dist
.next
.env
.env.local
*.log
```

- [ ] **Step 6: Commit workspace configuration**

```bash
git add package.json turbo.json pnpm-workspace.yaml tsconfig.json .gitignore
git commit -m "chore: initialize Turborepo monorepo workspace structure"
```

---

### Task 2: Shared Zod Package (`/packages/shared-zod`)

**Files:**
- Create: `packages/shared-zod/package.json`
- Create: `packages/shared-zod/tsconfig.json`
- Create: `packages/shared-zod/src/index.ts`
- Create: `packages/shared-zod/src/bss.schema.ts`
- Create: `packages/shared-zod/src/oss.schema.ts`
- Create: `packages/shared-zod/src/crm.schema.ts`
- Create: `packages/shared-zod/src/erp.schema.ts`
- Test: `packages/shared-zod/test/bss.schema.spec.ts`

**Interfaces:**
- Consumes: `zod` library
- Produces: `CustomerSchema`, `SubscriptionSchema`, `InvoiceSchema`, `RouterSchema`, `TicketSchema`, `InventorySchema`, and TypeScript types `CustomerDto`, `SubscriptionDto`, `InvoiceDto`, `RouterDto`, `TicketDto`.

- [ ] **Step 1: Write test for BSS Zod validation schemas**

```typescript
// packages/shared-zod/test/bss.schema.spec.ts
import { describe, it, expect } from 'vitest';
import { CustomerSchema, InvoiceSchema } from '../src/bss.schema';

describe('BSS Schemas', () => {
  it('should validate a valid customer payload', () => {
    const validCustomer = {
      customerCode: 'CUST-001',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+628123456789',
      billingType: 'POSTPAID',
    };
    const result = CustomerSchema.safeParse(validCustomer);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email in customer payload', () => {
    const invalidCustomer = {
      customerCode: 'CUST-001',
      fullName: 'John Doe',
      email: 'not-an-email',
      phone: '+628123456789',
      billingType: 'POSTPAID',
    };
    const result = CustomerSchema.safeParse(invalidCustomer);
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails (package not created yet)**

Run: `pnpm --filter shared-zod test`
Expected: FAIL with package not found or test file missing

- [ ] **Step 3: Implement /packages/shared-zod package files**

```json
// packages/shared-zod/package.json
{
  "name": "@cl-spylinx/shared-zod",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run"
  },
  "dependencies": {
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vitest": "^1.5.0"
  }
}
```

```typescript
// packages/shared-zod/src/bss.schema.ts
import { z } from 'zod';

export const CustomerSchema = z.object({
  customerCode: z.string().min(3).max(50),
  fullName: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().min(8).max(50),
  billingType: z.enum(['PREPAID', 'POSTPAID']).default('POSTPAID'),
  customFields: z.record(z.unknown()).optional().default({}),
});

export type CustomerDto = z.infer<typeof CustomerSchema>;

export const InvoiceSchema = z.object({
  customerId: z.string().uuid(),
  invoiceNumber: z.string().min(3).max(50),
  subtotalAmount: z.number().positive(),
  taxAmount: z.number().nonnegative(),
  totalAmount: z.number().positive(),
  dueDate: z.string().datetime(),
});

export type InvoiceDto = z.infer<typeof InvoiceSchema>;
```

```typescript
// packages/shared-zod/src/index.ts
export * from './bss.schema';
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/shared-zod && pnpm test`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit shared-zod package**

```bash
git add packages/shared-zod
git commit -m "feat(packages): add @cl-spylinx/shared-zod package with BSS schemas"
```

---

### Task 3: Shared UI Package (`/packages/ui`)

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/tailwind.config.js`
- Create: `packages/ui/src/lib/utils.ts`
- Create: `packages/ui/src/components/button.tsx`
- Create: `packages/ui/src/components/card.tsx`
- Create: `packages/ui/src/index.ts`
- Test: `packages/ui/test/utils.spec.ts`

**Interfaces:**
- Consumes: `clsx`, `tailwind-merge`
- Produces: `cn()` utility function, `Button` component, `Card` component, and shared Tailwind UI design tokens.

- [ ] **Step 1: Write test for cn() class merging utility**

```typescript
// packages/ui/test/utils.spec.ts
import { describe, it, expect } from 'vitest';
import { cn } from '../src/lib/utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-blue-500', { 'text-white': true });
    expect(result).toBe('px-2 py-1 bg-blue-500 text-white');
  });

  it('should resolve tailwind class conflicts', () => {
    const result = cn('px-2 px-4');
    expect(result).toBe('px-4');
  });
});
```

- [ ] **Step 2: Implement /packages/ui package files**

```json
// packages/ui/package.json
{
  "name": "@cl-spylinx/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "react": "^18.3.0",
    "typescript": "^5.4.0",
    "vitest": "^1.5.0"
  }
}
```

```typescript
// packages/ui/src/lib/utils.ts
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
// packages/ui/src/index.ts
export * from './lib/utils';
```

- [ ] **Step 3: Run test to verify it passes**

Run: `cd packages/ui && pnpm test`
Expected: PASS (2 tests passed)

- [ ] **Step 4: Commit shared UI package**

```bash
git add packages/ui
git commit -m "feat(packages): add @cl-spylinx/ui shared component package"
```

---

### Task 4: Database Package & Drizzle ORM Schema (`/packages/database`)

**Files:**
- Create: `packages/database/package.json`
- Create: `packages/database/tsconfig.json`
- Create: `packages/database/drizzle.config.ts`
- Create: `packages/database/src/schema/bss.ts`
- Create: `packages/database/src/schema/oss.ts`
- Create: `packages/database/src/schema/crm.ts`
- Create: `packages/database/src/schema/erp.ts`
- Create: `packages/database/src/schema/index.ts`
- Create: `packages/database/src/client.ts`
- Create: `packages/database/src/index.ts`
- Test: `packages/database/test/schema.spec.ts`

**Interfaces:**
- Consumes: `drizzle-orm`, `postgres`
- Produces: `db` Drizzle client instance, table definitions (`customers`, `subscriptions`, `invoices`, `routers`, `cpeDevices`), and exportable schema.

- [ ] **Step 1: Write test for schema definition exports**

```typescript
// packages/database/test/schema.spec.ts
import { describe, it, expect } from 'vitest';
import * as schema from '../src/schema';

describe('Database Schema Exports', () => {
  it('should export bss tables', () => {
    expect(schema.customers).toBeDefined();
    expect(schema.subscriptions).toBeDefined();
    expect(schema.invoices).toBeDefined();
  });

  it('should export oss tables', () => {
    expect(schema.routers).toBeDefined();
    expect(schema.cpeDevices).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement /packages/database schema & client files**

```json
// packages/database/package.json
{
  "name": "@cl-spylinx/database",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  },
  "dependencies": {
    "drizzle-orm": "^0.30.0",
    "postgres": "^3.4.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.20.0",
    "typescript": "^5.4.0",
    "vitest": "^1.5.0"
  }
}
```

```typescript
// packages/database/src/schema/bss.ts
import { pgSchema, uuid, varchar, decimal, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const bssSchema = pgSchema('bss');

export const customers = bssSchema.table('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  customerCode: varchar('customer_code', { length: 50 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('ACTIVE'),
  billingType: varchar('billing_type', { length: 20 }).notNull().default('POSTPAID'),
  customFields: jsonb('custom_fields').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const subscriptions = bssSchema.table('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  tariffPlanId: uuid('tariff_plan_id').notNull(),
  pppoeUsername: varchar('pppoe_username', { length: 100 }).notNull(),
  pppoePassword: varchar('pppoe_password', { length: 100 }).notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  macAddress: varchar('mac_address', { length: 17 }),
  status: varchar('status', { length: 20 }).notNull().default('ACTIVE'),
  currentFupUsageMb: decimal('current_fup_usage_mb', { precision: 12, scale: 2 }).default('0.00'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const invoices = bssSchema.table('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
  subtotalAmount: decimal('subtotal_amount', { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }).notNull(),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 20 }).notNull().default('UNPAID'),
  dueDate: timestamp('due_date').notNull(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// packages/database/src/schema/oss.ts
import { pgSchema, uuid, varchar, integer, timestamp, decimal } from 'drizzle-orm/pg-core';

export const ossSchema = pgSchema('oss');

export const routers = ossSchema.table('routers', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  ipAddress: varchar('ip_address', { length: 45 }).notNull(),
  apiPort: integer('api_port').default(8728).notNull(),
  radiusSecret: varchar('radius_secret', { length: 100 }).notNull(),
  status: varchar('status', { length: 20 }).default('ONLINE').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const cpeDevices = ossSchema.table('cpe_devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  customerId: uuid('customer_id').notNull(),
  deviceOui: varchar('device_oui', { length: 50 }).notNull(),
  serialNumber: varchar('serial_number', { length: 100 }).notNull(),
  tr069DeviceId: varchar('tr069_device_id', { length: 255 }).notNull(),
  wifiSsid: varchar('wifi_ssid', { length: 100 }),
  opticalRxPowerDbm: decimal('optical_rx_power_dbm', { precision: 5, scale: 2 }),
  status: varchar('status', { length: 20 }).default('ONLINE').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

```typescript
// packages/database/src/schema/index.ts
export * from './bss';
export * from './oss';
```

```typescript
// packages/database/src/index.ts
export * from './schema';
```

- [ ] **Step 3: Run test to verify it passes**

Run: `cd packages/database && pnpm test`
Expected: PASS (2 tests passed)

- [ ] **Step 4: Commit database package**

```bash
git add packages/database
git commit -m "feat(packages): add @cl-spylinx/database with Drizzle ORM schemas"
```

---

### Task 5: Admin Dashboard SPA Shell (`/apps/admin-dashboard`)

**Files:**
- Create: `apps/admin-dashboard/package.json`
- Create: `apps/admin-dashboard/tsconfig.json`
- Create: `apps/admin-dashboard/vite.config.ts`
- Create: `apps/admin-dashboard/index.html`
- Create: `apps/admin-dashboard/src/main.tsx`
- Create: `apps/admin-dashboard/src/App.tsx`
- Create: `apps/admin-dashboard/src/lib/store.ts`
- Create: `apps/admin-dashboard/src/components/layout/Sidebar.tsx`
- Create: `apps/admin-dashboard/src/components/layout/TopBar.tsx`
- Create: `apps/admin-dashboard/src/components/layout/AdminLayout.tsx`
- Test: `apps/admin-dashboard/test/Sidebar.spec.tsx`

**Interfaces:**
- Consumes: `@cl-spylinx/ui`, `@cl-spylinx/shared-zod`, `zustand`, `react-router-dom`
- Produces: Admin Dashboard SPA shell with Splynx-style hierarchical navigation (CRM, COMPANY, SYSTEM) and Top Bar.

- [ ] **Step 1: Write test for Sidebar Navigation item rendering**

```typescript
// apps/admin-dashboard/test/Sidebar.spec.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../src/components/layout/Sidebar';

describe('Sidebar Component', () => {
  it('should render Splynx core navigation sections', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText('CRM')).toBeDefined();
    expect(screen.getByText('COMPANY')).toBeDefined();
    expect(screen.getByText('SYSTEM')).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement Admin Dashboard SPA components**

```json
// apps/admin-dashboard/package.json
{
  "name": "admin-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "@cl-spylinx/shared-zod": "workspace:*",
    "@cl-spylinx/ui": "workspace:*",
    "lucide-react": "^0.370.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@testing-library/react": "^15.0.0",
    "@types/react": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "vitest": "^1.5.0"
  }
}
```

```typescript
// apps/admin-dashboard/src/components/layout/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Ticket, DollarSign, Wifi, Calendar, Package, Settings, Shield } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2 px-2 py-1 text-xl font-bold border-b border-slate-800 pb-4">
        <span className="text-blue-500">EIMAS</span> SaaS v3.0
      </div>

      <nav className="flex flex-col gap-4 text-sm">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">CRM</div>
          <ul className="flex flex-col gap-1">
            <li><Link to="/crm/customers" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Users size={16} /> Customers</Link></li>
            <li><Link to="/crm/tickets" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Ticket size={16} /> Tickets</Link></li>
            <li><Link to="/crm/finance" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><DollarSign size={16} /> Finance</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">COMPANY</div>
          <ul className="flex flex-col gap-1">
            <li><Link to="/company/networking" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Wifi size={16} /> Networking</Link></li>
            <li><Link to="/company/scheduling" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Calendar size={16} /> Scheduling</Link></li>
            <li><Link to="/company/inventory" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Package size={16} /> Inventory</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">SYSTEM</div>
          <ul className="flex flex-col gap-1">
            <li><Link to="/system/admin" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Shield size={16} /> Administration</Link></li>
            <li><Link to="/system/config" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800"><Settings size={16} /> Config</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};
```

- [ ] **Step 3: Run test to verify it passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (1 test passed)

- [ ] **Step 4: Commit Admin Dashboard shell**

```bash
git add apps/admin-dashboard
git commit -m "feat(apps): add Admin Dashboard SPA shell with Splynx navigation"
```

---

### Task 6: Backend API Gateway Foundation (`/apps/api-server`)

**Files:**
- Create: `apps/api-server/package.json`
- Create: `apps/api-server/tsconfig.json`
- Create: `apps/api-server/src/main.ts`
- Create: `apps/api-server/src/app.module.ts`
- Create: `apps/api-server/src/common/guards/auth.guard.ts`
- Create: `apps/api-server/src/common/guards/tenant.guard.ts`
- Create: `apps/api-server/src/common/filters/http-exception.filter.ts`
- Test: `apps/api-server/test/app.e2e-spec.ts`

**Interfaces:**
- Consumes: `@nestjs/core`, `@nestjs/platform-fastify`, `@cl-spylinx/database`, `@cl-spylinx/shared-zod`
- Produces: API Gateway server listening on Port 3000 with Swagger documentation at `/api/docs` and Global Error Filter.

- [ ] **Step 1: Write E2E test for API Server status check**

```typescript
// apps/api-server/test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({ status: 'ok' });
  });
});
```

- [ ] **Step 2: Implement NestJS API Server foundation**

```json
// apps/api-server/package.json
{
  "name": "api-server",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "build": "nest build",
    "dev": "nest start --watch",
    "test:e2e": "vitest run --config vitest.config.e2e.ts"
  },
  "dependencies": {
    "@cl-spylinx/database": "workspace:*",
    "@cl-spylinx/shared-zod": "workspace:*",
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-fastify": "^10.3.0",
    "@nestjs/swagger": "^7.3.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@nestjs/testing": "^10.3.0",
    "@types/node": "^20.11.0",
    "typescript": "^5.4.0",
    "vitest": "^1.5.0"
  }
}
```

```typescript
// apps/api-server/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

```typescript
// apps/api-server/src/app.controller.ts
import { Controller, GET } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
```

```typescript
// apps/api-server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const config = new DocumentBuilder()
    .setTitle('EIMAS SaaS v3.0 API Gateway')
    .setDescription('Splynx-Aligned ISP Orchestration & Automation API')
    .setVersion('3.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
```

- [ ] **Step 3: Run E2E test to verify it passes**

Run: `cd apps/api-server && pnpm test:e2e`
Expected: PASS (1 test passed)

- [ ] **Step 4: Commit API Server foundation**

```bash
git add apps/api-server
git commit -m "feat(apps): add NestJS Fastify API Gateway shell with Swagger documentation"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-09-eimas-saas-v3-splynx-implementation-plan.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
