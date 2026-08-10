# Splynx-Aligned Admin Dashboard UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional, premium Splynx-aligned Admin Dashboard UI (`/apps/admin-dashboard`) in React + Vite + Tailwind CSS + Lucide Icons + Zustand, featuring realistic dummy data for all 4 ISP domains (BSS, OSS, CRM, ERP), interactive tables, search/filters, quick-add modals, TR-069 Wi-Fi control dialogs, technician proof-of-work viewer, and theme switching.

**Architecture:** Single Page Application built with React 18, Vite, and Tailwind CSS. State management is powered by Zustand for reactive UI updates (active navigation, mock data mutations, modal triggers, theme mode). All components are split by module responsibility inside `src/modules/` and `src/components/layout/`.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React (Icons), Zustand (State), Recharts (Bandwidth & Revenue graphs), Clsx / Tailwind Merge.

---

## Global Constraints

- **Design Aesthetic**: Premium agency-grade dark/light mode UI, clean typography (Inter font), curated color tokens (slate dark background, emerald active badges, rose isolated badges, amber warning badges), smooth micro-animations, glassmorphism headers.
- **No Placeholders**: All data must use realistic ISP records (real Indonesian subscriber names, PPPoE usernames, IPv4 subnets, MikroTik router hostnames, optical power dBm levels, invoice numbers).
- **Interactive State**: Admin users must be able to search subscribers, filter by status, toggle theme, trigger CoA disconnect/unthrottle mock actions, open ticket detail modals, and simulate Wi-Fi SSID resets.

### Mandatory SaaS & Engineering Standards:
1. **Conventional Commits**: Commit messages MUST follow `feat:`, `fix:`, `style:`, `refactor:`, `test:`, `chore:`.
2. **Component Separation**: Keep layout, modals, and module views in separate focused files.
3. **Accessibility**: All interactive buttons and inputs must have hover/focus-visible states and ARIA labels.

---

## File Structure

```text
/apps/admin-dashboard
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── App.tsx
│   ├── lib/
│   │   ├── types.ts            # Full TypeScript interfaces for all modules
│   │   ├── mock-data.ts        # Comprehensive realistic ISP dummy dataset
│   │   ├── store.ts            # Zustand global UI & mock data store
│   │   └── utils.ts            # Date formatters, currency formatters, status color helpers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx     # Splynx-style hierarchical navigation sidebar
│   │   │   ├── TopBar.tsx      # Global search, Quick Add button, Tenant Switcher, Profile
│   │   │   └── AdminLayout.tsx # Responsive shell wrapping sidebar & topbar
│   │   ├── modals/
│   │   │   ├── QuickAddModal.tsx          # Multi-tab create modal (+ Customer, + Ticket, + Plan)
│   │   │   ├── CustomerDetailModal.tsx   # Subscriber profile slide-over panel
│   │   │   ├── Tr069WifiModal.tsx        # Remote Wi-Fi SSID & Password reset dialog
│   │   │   └── ProofOfWorkModal.tsx      # Field tech OPM photo & barcode inspection dialog
│   │   └── ui/
│   │       ├── StatCard.tsx               # Reusable dashboard metric widget
│   │       ├── Badge.tsx                  # Status pill badge component
│   │       └── Modal.tsx                  # Base dialog modal overlay
│   └── modules/
│       ├── dashboard/
│       │   └── OverviewView.tsx           # Dashboard main overview (Charts, Stats, Activity)
│       ├── crm/
│       │   ├── CustomersView.tsx          # Subscriber table with status filters & actions
│       │   ├── LeadsView.tsx              # Sales pipeline kanban board
│       │   ├── TicketsView.tsx            # Support ticket list with SLA response timers
│       │   ├── FinanceView.tsx            # Invoices & Payments table with QRIS preview
│       │   └── MessagesView.tsx           # SMS/Email/WhatsApp notification log
│       ├── oss/
│       │   ├── NetworkingView.tsx         # MikroTik Routers, IP Pools, TR-069 CPE list
│       │   └── NatLogsView.tsx            # ClickHouse NAT compliance log search tool
│       ├── company/
│       │   ├── SchedulingView.tsx         # Field tech work order dispatch calendar & map
│       │   ├── InventoryView.tsx          # Multi-warehouse hardware stock tracker
│       │   └── TariffPlansView.tsx        # Bandwidth speed plans grid & FUP tiers
│       └── system/
│           ├── AdministrationView.tsx     # Admin accounts & RBAC matrix
│           └── ConfigView.tsx             # Tenant whitelabeling & integration keys
└── test/
    └── UI.spec.tsx
```

---

## Tasks

### Task 1: Scaffolding, Design Tokens & Mock Dataset

**Files:**
- Create: `apps/admin-dashboard/package.json`
- Create: `apps/admin-dashboard/vite.config.ts`
- Create: `apps/admin-dashboard/tailwind.config.js`
- Create: `apps/admin-dashboard/postcss.config.js`
- Create: `apps/admin-dashboard/index.html`
- Create: `apps/admin-dashboard/src/index.css`
- Create: `apps/admin-dashboard/src/lib/types.ts`
- Create: `apps/admin-dashboard/src/lib/mock-data.ts`
- Create: `apps/admin-dashboard/src/lib/utils.ts`
- Test: `apps/admin-dashboard/test/mock-data.spec.ts`

**Interfaces:**
- Consumes: `lucide-react`, `recharts`
- Produces: `Customer`, `Subscription`, `Invoice`, `Router`, `Ticket`, `WorkOrder`, `TariffPlan` TypeScript interfaces and realistic ISP initial dataset.

- [ ] **Step 1: Write test verifying mock data structure**

```typescript
// apps/admin-dashboard/test/mock-data.spec.ts
import { describe, it, expect } from 'vitest';
import { initialCustomers, initialRouters, initialInvoices } from '../src/lib/mock-data';

describe('Mock ISP Dataset', () => {
  it('should contain realistic subscriber records', () => {
    expect(initialCustomers.length).toBeGreaterThanOrEqual(5);
    expect(initialCustomers[0]).toHaveProperty('customerCode');
    expect(initialCustomers[0]).toHaveProperty('status');
  });

  it('should contain router records', () => {
    expect(initialRouters.length).toBeGreaterThanOrEqual(2);
    expect(initialRouters[0]).toHaveProperty('ipAddress');
  });

  it('should contain invoice records', () => {
    expect(initialInvoices.length).toBeGreaterThanOrEqual(5);
    expect(initialInvoices[0]).toHaveProperty('totalAmount');
  });
});
```

- [ ] **Step 2: Create package.json and Tailwind configuration**

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
    "clsx": "^2.1.0",
    "lucide-react": "^0.370.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "recharts": "^2.12.0",
    "tailwind-merge": "^2.2.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "vitest": "^1.5.0"
  }
}
```

```javascript
// apps/admin-dashboard/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Implement src/lib/types.ts and src/lib/mock-data.ts**

```typescript
// apps/admin-dashboard/src/lib/types.ts
export type CustomerStatus = 'ACTIVE' | 'ISOLATED' | 'TERMINATED';
export type BillingType = 'PREPAID' | 'POSTPAID';

export interface Customer {
  id: string;
  customerCode: string;
  fullName: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  billingType: BillingType;
  pppoeUsername: string;
  planName: string;
  monthlyPrice: number;
  ipAddress: string;
  address: string;
  createdAt: string;
}

export interface Router {
  id: string;
  name: string;
  type: 'MIKROTIK' | 'ACCEL_PPP' | 'CISCO';
  ipAddress: string;
  apiPort: number;
  activeSessions: number;
  status: 'ONLINE' | 'OFFLINE';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  totalAmount: number;
  paymentStatus: 'PAID' | 'UNPAID' | 'OVERDUE' | 'PROFORMA';
  dueDate: string;
  paidAt?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  customerName: string;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  assignedAgent: string;
  createdAt: string;
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  technicianName: string;
  taskType: 'NEW_INSTALLATION' | 'FIBER_REPAIR' | 'ONT_REPLACEMENT';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  scheduledDate: string;
  opmSignalDbm?: number;
  ontSerialNumber?: string;
}
```

```typescript
// apps/admin-dashboard/src/lib/mock-data.ts
import { Customer, Router, Invoice, Ticket, WorkOrder } from './types';

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    customerCode: 'ISP-1001',
    fullName: 'Budi Santoso',
    email: 'budi.santoso@gmail.com',
    phone: '+6281234567890',
    status: 'ACTIVE',
    billingType: 'POSTPAID',
    pppoeUsername: 'budi_home',
    planName: 'Ultra Fiber 100 Mbps',
    monthlyPrice: 450000,
    ipAddress: '103.144.12.45',
    address: 'Jl. Merdeka No. 12, Jakarta Selatan',
    createdAt: '2026-01-15',
  },
  {
    id: 'cust-2',
    customerCode: 'ISP-1002',
    fullName: 'Siti Rahmawati',
    email: 'siti.rahma@yahoo.com',
    phone: '+6281987654321',
    status: 'ISOLATED',
    billingType: 'POSTPAID',
    pppoeUsername: 'siti_net',
    planName: 'Home Speed 50 Mbps',
    monthlyPrice: 300000,
    ipAddress: '103.144.12.88',
    address: 'Jl. Sudirman No. 45, Bandung',
    createdAt: '2026-02-01',
  },
  {
    id: 'cust-3',
    customerCode: 'ISP-1003',
    fullName: 'Ahmad Wijaya',
    email: 'ahmad.w@outlook.com',
    phone: '+6281122334455',
    status: 'ACTIVE',
    billingType: 'PREPAID',
    pppoeUsername: 'ahmad_wifi',
    planName: 'Gaming Pro 200 Mbps',
    monthlyPrice: 750000,
    ipAddress: '103.144.12.102',
    address: 'Griya Indah Blok C3, Surabaya',
    createdAt: '2026-03-10',
  },
  {
    id: 'cust-4',
    customerCode: 'ISP-1004',
    fullName: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    phone: '+6285678901234',
    status: 'ACTIVE',
    billingType: 'POSTPAID',
    pppoeUsername: 'dewi_stream',
    planName: 'Home Speed 50 Mbps',
    monthlyPrice: 300000,
    ipAddress: '103.144.12.115',
    address: 'Jl. Diponegoro No. 8, Semarang',
    createdAt: '2026-04-05',
  },
  {
    id: 'cust-5',
    customerCode: 'ISP-1005',
    fullName: 'Eko Prasetyo',
    email: 'eko.prasetyo@corp.id',
    phone: '+6287811223344',
    status: 'TERMINATED',
    billingType: 'POSTPAID',
    pppoeUsername: 'eko_office',
    planName: 'Business Dedicated 500 Mbps',
    monthlyPrice: 2500000,
    ipAddress: '103.144.12.200',
    address: 'Kawasan Industri Rungkut, Surabaya',
    createdAt: '2025-11-20',
  },
];

export const initialRouters: Router[] = [
  {
    id: 'rtr-1',
    name: 'BRAS-MikroTik-Jakarta-Core1',
    type: 'MIKROTIK',
    ipAddress: '182.253.0.1',
    apiPort: 8728,
    activeSessions: 1420,
    status: 'ONLINE',
  },
  {
    id: 'rtr-2',
    name: 'BRAS-AccelPPP-Bandung-POP2',
    type: 'ACCEL_PPP',
    ipAddress: '182.253.4.1',
    apiPort: 2004,
    activeSessions: 890,
    status: 'ONLINE',
  },
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-08-001',
    customerName: 'Budi Santoso',
    totalAmount: 495000,
    paymentStatus: 'PAID',
    dueDate: '2026-08-10',
    paidAt: '2026-08-05',
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-08-002',
    customerName: 'Siti Rahmawati',
    totalAmount: 330000,
    paymentStatus: 'OVERDUE',
    dueDate: '2026-08-01',
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-08-003',
    customerName: 'Ahmad Wijaya',
    totalAmount: 825000,
    paymentStatus: 'PAID',
    dueDate: '2026-08-15',
    paidAt: '2026-08-08',
  },
];

export const initialTickets: Ticket[] = [
  {
    id: 'tkt-1',
    ticketNumber: 'TKT-8801',
    customerName: 'Siti Rahmawati',
    subject: 'Koneksi Terputus / Redaman Sinyal Tinggi',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedAgent: 'NOC Tech Team A',
    createdAt: '2026-08-08 09:30',
  },
  {
    id: 'tkt-2',
    ticketNumber: 'TKT-8802',
    customerName: 'Dewi Lestari',
    subject: 'Permintaan Ganti Password Wi-Fi Router',
    priority: 'LOW',
    status: 'OPEN',
    assignedAgent: 'Helpdesk Agent 1',
    createdAt: '2026-08-08 11:15',
  },
];

export const initialWorkOrders: WorkOrder[] = [
  {
    id: 'wo-1',
    orderNumber: 'WO-2026-041',
    customerName: 'Budi Santoso',
    technicianName: 'Rian Hidayat (Field Tech)',
    taskType: 'NEW_INSTALLATION',
    status: 'COMPLETED',
    scheduledDate: '2026-08-07',
    opmSignalDbm: -19.45,
    ontSerialNumber: 'ZTEGC8890A12',
  },
  {
    id: 'wo-2',
    orderNumber: 'WO-2026-042',
    customerName: 'Siti Rahmawati',
    technicianName: 'Dedi Kurniawan (Field Tech)',
    taskType: 'FIBER_REPAIR',
    status: 'IN_PROGRESS',
    scheduledDate: '2026-08-09',
  },
];
```

- [ ] **Step 4: Run test to verify dataset passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit dataset & scaffolding**

```bash
git add apps/admin-dashboard
git commit -m "feat(dashboard): scaffold dashboard UI with Tailwind theme and realistic mock dataset"
```

---

### Task 2: Zustand UI Store & State Mutations

**Files:**
- Create: `apps/admin-dashboard/src/lib/store.ts`
- Create: `apps/admin-dashboard/src/lib/utils.ts`
- Test: `apps/admin-dashboard/test/store.spec.ts`

**Interfaces:**
- Consumes: `zustand`, `mock-data.ts`
- Produces: `useAppStore` hook for active module navigation, customer CRUD, CoA isolation toggle, ticket filtering, quick-add modal controls, and theme mode.

- [ ] **Step 1: Write unit test for Zustand store actions**

```typescript
// apps/admin-dashboard/test/store.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../src/lib/store';

describe('Zustand Store Actions', () => {
  beforeEach(() => {
    useAppStore.setState({
      activeModule: 'dashboard',
      searchQuery: '',
      isDarkMode: true,
    });
  });

  it('should update active module', () => {
    useAppStore.getState().setActiveModule('customers');
    expect(useAppStore.getState().activeModule).toBe('customers');
  });

  it('should toggle customer status (CoA disconnect/unthrottle)', () => {
    const customerId = 'cust-1';
    useAppStore.getState().toggleCustomerStatus(customerId);
    const updatedCustomer = useAppStore.getState().customers.find((c) => c.id === customerId);
    expect(updatedCustomer?.status).toBe('ISOLATED');
  });
});
```

- [ ] **Step 2: Implement Zustand store in src/lib/store.ts**

```typescript
// apps/admin-dashboard/src/lib/store.ts
import { create } from 'zustand';
import { Customer, Router, Invoice, Ticket, WorkOrder } from './types';
import { initialCustomers, initialRouters, initialInvoices, initialTickets, initialWorkOrders } from './mock-data';

interface AppState {
  activeModule: string;
  searchQuery: string;
  isDarkMode: boolean;
  isQuickAddOpen: boolean;
  selectedCustomerId: string | null;
  selectedWifiCpeId: string | null;
  selectedWorkOrderId: string | null;

  customers: Customer[];
  routers: Router[];
  invoices: Invoice[];
  tickets: Ticket[];
  workOrders: WorkOrder[];

  setActiveModule: (module: string) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  setQuickAddOpen: (isOpen: boolean) => void;
  setSelectedCustomerId: (id: string | null) => void;
  setSelectedWifiCpeId: (id: string | null) => void;
  setSelectedWorkOrderId: (id: string | null) => void;

  toggleCustomerStatus: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt'>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeModule: 'dashboard',
  searchQuery: '',
  isDarkMode: true,
  isQuickAddOpen: false,
  selectedCustomerId: null,
  selectedWifiCpeId: null,
  selectedWorkOrderId: null,

  customers: initialCustomers,
  routers: initialRouters,
  invoices: initialInvoices,
  tickets: initialTickets,
  workOrders: initialWorkOrders,

  setActiveModule: (module) => set({ activeModule: module }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setQuickAddOpen: (isOpen) => set({ isQuickAddOpen: isOpen }),
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }),
  setSelectedWifiCpeId: (id) => set({ selectedWifiCpeId: id }),
  setSelectedWorkOrderId: (id) => set({ selectedWorkOrderId: id }),

  toggleCustomerStatus: (id) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'ACTIVE' ? 'ISOLATED' : 'ACTIVE' }
          : c
      ),
    })),

  addCustomer: (newCust) =>
    set((state) => ({
      customers: [
        {
          ...newCust,
          id: `cust-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
        },
        ...state.customers,
      ],
    })),

  addTicket: (newTkt) =>
    set((state) => ({
      tickets: [
        {
          ...newTkt,
          id: `tkt-${Date.now()}`,
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        },
        ...state.tickets,
      ],
    })),
}));
```

```typescript
// apps/admin-dashboard/src/lib/utils.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
```

- [ ] **Step 3: Run store tests to verify it passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (4 tests passed)

- [ ] **Step 4: Commit Zustand store**

```bash
git add apps/admin-dashboard
git commit -m "feat(dashboard): add Zustand store for reactive UI navigation and mock state mutations"
```

---

### Task 3: Splynx Navigation Sidebar, TopBar & Layout Shell

**Files:**
- Create: `apps/admin-dashboard/src/components/layout/Sidebar.tsx`
- Create: `apps/admin-dashboard/src/components/layout/TopBar.tsx`
- Create: `apps/admin-dashboard/src/components/layout/AdminLayout.tsx`
- Test: `apps/admin-dashboard/test/Layout.spec.tsx`

**Interfaces:**
- Consumes: `useAppStore`, `lucide-react`
- Produces: Sidebar with active module highlighting, TopBar with search bar, Quick Add button, Tenant Switcher dropdown, and Dark Mode toggle.

- [ ] **Step 1: Write layout rendering test**

```typescript
// apps/admin-dashboard/test/Layout.spec.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopBar } from '../src/components/layout/TopBar';
import { useAppStore } from '../src/lib/store';

describe('TopBar Component', () => {
  it('should render search bar and Quick Add button', () => {
    render(<TopBar />);
    expect(screen.getByPlaceholderText(/Search subscribers/i)).toBeDefined();
    expect(screen.getByText(/\+ Quick Add/i)).toBeDefined();
  });

  it('should trigger Quick Add modal when clicked', () => {
    render(<TopBar />);
    const addBtn = screen.getByText(/\+ Quick Add/i);
    fireEvent.click(addBtn);
    expect(useAppStore.getState().isQuickAddOpen).toBe(true);
  });
});
```

- [ ] **Step 2: Implement Sidebar.tsx and TopBar.tsx**

```typescript
// apps/admin-dashboard/src/components/layout/TopBar.tsx
import React from 'react';
import { Search, Plus, Moon, Sun, Bell, Building } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const TopBar: React.FC = () => {
  const { searchQuery, setSearchQuery, isDarkMode, toggleDarkMode, setQuickAddOpen } = useAppStore();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-white sticky top-0 z-30">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search subscribers, IPs, invoices, or tickets (Cmd+K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Tenant Switcher */}
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium">
          <Building size={14} className="text-blue-400" />
          <span>PT Nusantara Internet (Main Branch)</span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => setQuickAddOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition"
        >
          <Plus size={16} /> + Quick Add
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification Bell */}
        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 relative transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};
```

```typescript
// apps/admin-dashboard/src/components/layout/Sidebar.tsx
import React from 'react';
import { LayoutDashboard, Users, Ticket, DollarSign, Wifi, Calendar, Package, Settings, Shield } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule } = useAppStore();

  const navItem = (id: string, label: string, icon: React.ReactNode) => {
    const isActive = activeModule === id;
    return (
      <button
        onClick={() => setActiveModule(id)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
          isActive
            ? 'bg-blue-600 text-white shadow'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-white min-h-screen p-4 flex flex-col gap-6 sticky top-0 h-screen overflow-y-auto">
      <div className="flex items-center gap-2.5 px-2 py-1 text-xl font-bold tracking-tight">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
          EI
        </div>
        <span>EIMAS <span className="text-blue-500 text-xs font-semibold uppercase">v3.0</span></span>
      </div>

      <nav className="flex flex-col gap-5">
        <div>
          {navItem('dashboard', 'Overview', <LayoutDashboard size={18} />)}
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">CRM</div>
          <div className="flex flex-col gap-1">
            {navItem('customers', 'Customers', <Users size={18} />)}
            {navItem('tickets', 'Tickets', <Ticket size={18} />)}
            {navItem('finance', 'Finance', <DollarSign size={18} />)}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">COMPANY (OSS/ERP)</div>
          <div className="flex flex-col gap-1">
            {navItem('networking', 'Networking', <Wifi size={18} />)}
            {navItem('scheduling', 'Scheduling', <Calendar size={18} />)}
            {navItem('inventory', 'Inventory', <Package size={18} />)}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">SYSTEM</div>
          <div className="flex flex-col gap-1">
            {navItem('administration', 'Administration', <Shield size={18} />)}
            {navItem('config', 'Config', <Settings size={18} />)}
          </div>
        </div>
      </nav>
    </aside>
  );
};
```

```typescript
// apps/admin-dashboard/src/components/layout/AdminLayout.tsx
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Run layout tests to verify it passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (5 tests passed)

- [ ] **Step 4: Commit Layout components**

```bash
git add apps/admin-dashboard
git commit -m "feat(dashboard): add Splynx-style Sidebar, TopBar, and AdminLayout container"
```

---

### Task 4: Interactive Overview & CRM Module Views

**Files:**
- Create: `apps/admin-dashboard/src/modules/dashboard/OverviewView.tsx`
- Create: `apps/admin-dashboard/src/modules/crm/CustomersView.tsx`
- Create: `apps/admin-dashboard/src/modules/crm/TicketsView.tsx`
- Create: `apps/admin-dashboard/src/modules/crm/FinanceView.tsx`
- Test: `apps/admin-dashboard/test/CustomersView.spec.tsx`

**Interfaces:**
- Consumes: `useAppStore`, `recharts`, `formatCurrency`
- Produces: Main Overview dashboard with revenue chart & stat widgets, Customers table with status filters & CoA disconnect buttons, Tickets view, and Finance invoices table.

- [ ] **Step 1: Write test for Customers table filtering & status toggling**

```typescript
// apps/admin-dashboard/test/CustomersView.spec.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomersView } from '../src/modules/crm/CustomersView';

describe('CustomersView Component', () => {
  it('should render customer list table', () => {
    render(<CustomersView />);
    expect(screen.getByText('Budi Santoso')).toBeDefined();
    expect(screen.getByText('Siti Rahmawati')).toBeDefined();
  });

  it('should toggle customer status when action button clicked', () => {
    render(<CustomersView />);
    const toggleBtn = screen.getAllByRole('button', { name: /isolate|unblock/i })[0];
    fireEvent.click(toggleBtn);
    expect(screen.getByText(/ISOLATED|ACTIVE/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement OverviewView, CustomersView, TicketsView, and FinanceView**

```typescript
// apps/admin-dashboard/src/modules/dashboard/OverviewView.tsx
import React from 'react';
import { Users, DollarSign, Wifi, Ticket, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useAppStore } from '../../lib/store';
import { formatCurrency } from '../../lib/utils';

const revenueData = [
  { month: 'Jan', revenue: 450000000 },
  { month: 'Feb', revenue: 480000000 },
  { month: 'Mar', revenue: 520000000 },
  { month: 'Apr', revenue: 510000000 },
  { month: 'May', revenue: 580000000 },
  { month: 'Jun', revenue: 640000000 },
  { month: 'Jul', revenue: 710000000 },
];

export const OverviewView: React.FC = () => {
  const { customers, routers, invoices, tickets } = useAppStore();

  const activeCustomers = customers.filter((c) => c.status === 'ACTIVE').length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.paymentStatus === 'PAID' ? inv.totalAmount : 0), 0);
  const openTickets = tickets.filter((t) => t.status !== 'CLOSED').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">ISP Overview Dashboard</h1>
          <p className="text-sm text-slate-400">Real-time telemetry, subscriber status, and revenue telemetry</p>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Network Status: Normal
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Active Subscribers</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">{activeCustomers} <span className="text-xs font-normal text-slate-400">/ {customers.length}</span></h3>
          </div>
          <div className="p-3 bg-blue-600/10 text-blue-400 rounded-lg">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Collected Revenue</p>
            <h3 className="text-xl font-bold text-emerald-400 mt-1">{formatCurrency(totalRevenue)}</h3>
          </div>
          <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-lg">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Active Routers</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">{routers.length} <span className="text-xs font-emerald-400 text-emerald-400">100% Up</span></h3>
          </div>
          <div className="p-3 bg-purple-600/10 text-purple-400 rounded-lg">
            <Wifi size={22} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Open Tickets</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">{openTickets}</h3>
          </div>
          <div className="p-3 bg-amber-600/10 text-amber-400 rounded-lg">
            <Ticket size={22} />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-400" /> Monthly Revenue Trend (IDR)
          </h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(v) => `${v / 1000000}M`} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
```

```typescript
// apps/admin-dashboard/src/modules/crm/CustomersView.tsx
import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { formatCurrency } from '../../lib/utils';
import { ShieldAlert, ShieldCheck, Search } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { customers, toggleCustomerStatus, searchQuery } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.pppoeUsername.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Subscriber Management (BSS/CRM)</h1>
          <p className="text-sm text-slate-400">View subscribers, manage PPPoE profiles, and trigger CoA bandwidth isolation</p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs font-medium">
          {['ALL', 'ACTIVE', 'ISOLATED', 'TERMINATED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-md transition ${
                filterStatus === status ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-5 py-3">Code / Name</th>
              <th className="px-5 py-3">PPPoE Credentials</th>
              <th className="px-5 py-3">Speed Plan</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-800/50 transition">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-100">{cust.fullName}</div>
                  <div className="text-xs text-slate-400">{cust.customerCode} • {cust.email}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-mono text-xs text-blue-400">{cust.pppoeUsername}</div>
                  <div className="text-xs text-slate-500">IP: {cust.ipAddress}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-slate-200 font-medium">{cust.planName}</div>
                  <div className="text-xs text-emerald-400">{formatCurrency(cust.monthlyPrice)} / mo</div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      cust.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : cust.status === 'ISOLATED'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        cust.status === 'ACTIVE' ? 'bg-emerald-400' : cust.status === 'ISOLATED' ? 'bg-rose-400' : 'bg-slate-500'
                      }`}
                    ></span>
                    {cust.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => toggleCustomerStatus(cust.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition inline-flex items-center gap-1 ${
                      cust.status === 'ACTIVE'
                        ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
                        : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    {cust.status === 'ACTIVE' ? (
                      <>
                        <ShieldAlert size={14} /> Isolate (CoA)
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} /> Unblock
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Run CRM view tests to verify it passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (6 tests passed)

- [ ] **Step 4: Commit CRM Module Views**

```bash
git add apps/admin-dashboard
git commit -m "feat(dashboard): add Overview dashboard and Customers table view with status toggle"
```

---

### Task 5: OSS & Company Views (Networking, Scheduling, Inventory)

**Files:**
- Create: `apps/admin-dashboard/src/modules/oss/NetworkingView.tsx`
- Create: `apps/admin-dashboard/src/modules/company/SchedulingView.tsx`
- Create: `apps/admin-dashboard/src/modules/company/InventoryView.tsx`
- Create: `apps/admin-dashboard/src/modules/company/TariffPlansView.tsx`
- Test: `apps/admin-dashboard/test/NetworkingView.spec.tsx`

**Interfaces:**
- Consumes: `useAppStore`
- Produces: Networking router table & IP pool status, TR-069 CPE list, Scheduling work order dispatch calendar & proof-of-work viewer, Inventory stock manager, and Tariff Plans editor.

- [ ] **Step 1: Write test for Networking router list rendering**

```typescript
// apps/admin-dashboard/test/NetworkingView.spec.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NetworkingView } from '../src/modules/oss/NetworkingView';

describe('NetworkingView Component', () => {
  it('should render router list and status', () => {
    render(<NetworkingView />);
    expect(screen.getByText('BRAS-MikroTik-Jakarta-Core1')).toBeDefined();
    expect(screen.getByText('BRAS-AccelPPP-Bandung-POP2')).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement NetworkingView, SchedulingView, and InventoryView**

```typescript
// apps/admin-dashboard/src/modules/oss/NetworkingView.tsx
import React from 'react';
import { useAppStore } from '../../lib/store';
import { Wifi, Server, Cpu } from 'lucide-react';

export const NetworkingView: React.FC = () => {
  const { routers } = useAppStore();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Networking & Device Management (OSS)</h1>
        <p className="text-sm text-slate-400">Core BRAS Routers, RADIUS sessions, and TR-069 CPE device provisioning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routers.map((rtr) => (
          <div key={rtr.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 text-blue-400 rounded-lg">
                  <Server size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100">{rtr.name}</h3>
                  <p className="text-xs text-slate-400">Type: {rtr.type} • IP: {rtr.ipAddress}:{rtr.apiPort}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
                {rtr.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800 text-slate-400">
              <span>Active RADIUS Sessions: <strong className="text-slate-200">{rtr.activeSessions} subscribers</strong></span>
              <button className="text-blue-400 hover:text-blue-300 font-medium">Manage Secrets →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Run Networking view tests to verify it passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (7 tests passed)

- [ ] **Step 4: Commit OSS & Company Views**

```bash
git add apps/admin-dashboard
git commit -m "feat(dashboard): add OSS Networking, Scheduling, and Inventory views"
```

---

### Task 6: QuickAdd Modal & App Integration Entry Point

**Files:**
- Create: `apps/admin-dashboard/src/components/modals/QuickAddModal.tsx`
- Modify: `apps/admin-dashboard/src/App.tsx`
- Modify: `apps/admin-dashboard/src/main.tsx`
- Test: `apps/admin-dashboard/test/App.spec.tsx`

**Interfaces:**
- Consumes: `useAppStore`, `AdminLayout`
- Produces: Complete interactive Admin Dashboard web application with active navigation state, Quick Add dialog, and full module view switching.

- [ ] **Step 1: Write full App integration test**

```typescript
// apps/admin-dashboard/test/App.spec.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Integration', () => {
  it('should render main Admin Dashboard shell', () => {
    render(<App />);
    expect(screen.getByText(/EIMAS/i)).toBeDefined();
    expect(screen.getByText(/ISP Overview Dashboard/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement QuickAddModal and update App.tsx**

```typescript
// apps/admin-dashboard/src/components/modals/QuickAddModal.tsx
import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { X } from 'lucide-react';

export const QuickAddModal: React.FC = () => {
  const { isQuickAddOpen, setQuickAddOpen, addCustomer } = useAppStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pppoeUsername, setPppoeUsername] = useState('');

  if (!isQuickAddOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    addCustomer({
      customerCode: `ISP-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      email,
      phone: phone || '+628123456789',
      status: 'ACTIVE',
      billingType: 'POSTPAID',
      pppoeUsername: pppoeUsername || `${fullName.toLowerCase().replace(/\s+/g, '_')}_net`,
      planName: 'Ultra Fiber 100 Mbps',
      monthlyPrice: 450000,
      ipAddress: `103.144.12.${Math.floor(Math.random() * 200)}`,
      address: 'Jakarta, Indonesia',
    });

    setQuickAddOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-xl shadow-xl overflow-hidden text-slate-100">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="font-bold text-lg">+ Add New Subscriber</h3>
          <button onClick={() => setQuickAddOpen(false)} className="text-slate-400 hover:text-slate-200">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 mt-1"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 mt-1"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium">PPPoE Username</label>
            <input
              type="text"
              value={pppoeUsername}
              onChange={(e) => setPppoeUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 mt-1"
              placeholder="john_net"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setQuickAddOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium"
            >
              Save Subscriber
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

```typescript
// apps/admin-dashboard/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './lib/store';
import { AdminLayout } from './components/layout/AdminLayout';
import { OverviewView } from './modules/dashboard/OverviewView';
import { CustomersView } from './modules/crm/CustomersView';
import { NetworkingView } from './modules/oss/NetworkingView';
import { QuickAddModal } from './components/modals/QuickAddModal';

const ModuleSwitcher: React.FC = () => {
  const { activeModule } = useAppStore();

  switch (activeModule) {
    case 'dashboard':
      return <OverviewView />;
    case 'customers':
      return <CustomersView />;
    case 'networking':
      return <NetworkingView />;
    default:
      return <OverviewView />;
  }
};

export default function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <ModuleSwitcher />
        <QuickAddModal />
      </AdminLayout>
    </BrowserRouter>
  );
}
```

- [ ] **Step 3: Run integration test to verify it passes**

Run: `cd apps/admin-dashboard && pnpm test`
Expected: PASS (8 tests passed)

- [ ] **Step 4: Commit App integration & QuickAdd modal**

```bash
git add apps/admin-dashboard
git commit -m "feat(dashboard): complete Splynx-aligned Admin Dashboard UI with interactive module switching and QuickAdd modal"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-09-splynx-admin-dashboard-ui-plan.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
