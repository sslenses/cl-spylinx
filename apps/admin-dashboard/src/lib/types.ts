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

export interface TariffPlan {
  id: string;
  name: string;
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
  monthlyPrice: number;
  fupCapGb?: number;
  fupThrottleSpeedMbps?: number;
  subscriberCount: number;
}
