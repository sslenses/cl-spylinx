import { create } from 'zustand';
import { Customer, Router, Invoice, Ticket, WorkOrder, TariffPlan } from './types';
import { initialCustomers, initialRouters, initialInvoices, initialTickets, initialWorkOrders, initialTariffPlans } from './mock-data';

interface AppState {
  activeModule: string;
  searchQuery: string;
  isDarkMode: boolean;
  isQuickAddOpen: boolean;
  isSidebarCollapsed: boolean;
  selectedCustomerId: string | null;
  selectedWifiCpeId: string | null;
  selectedWorkOrderId: string | null;

  customers: Customer[];
  routers: Router[];
  invoices: Invoice[];
  tickets: Ticket[];
  workOrders: WorkOrder[];
  tariffPlans: TariffPlan[];

  setActiveModule: (module: string) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
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
  isSidebarCollapsed: false,
  selectedCustomerId: null,
  selectedWifiCpeId: null,
  selectedWorkOrderId: null,

  customers: initialCustomers,
  routers: initialRouters,
  invoices: initialInvoices,
  tickets: initialTickets,
  workOrders: initialWorkOrders,
  tariffPlans: initialTariffPlans,

  setActiveModule: (module) => set({ activeModule: module }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
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
