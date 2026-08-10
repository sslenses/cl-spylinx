import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../src/lib/store';

describe('Zustand Store Actions', () => {
  beforeEach(() => {
    useAppStore.setState({
      activeModule: 'dashboard',
      searchQuery: '',
      isDarkMode: true,
      isQuickAddOpen: false,
    });
  });

  it('should update active module', () => {
    useAppStore.getState().setActiveModule('customers');
    expect(useAppStore.getState().activeModule).toBe('customers');
  });

  it('should toggle customer status (CoA disconnect/unthrottle)', () => {
    const customerId = 'cust-1';
    const initialStatus = useAppStore.getState().customers.find((c) => c.id === customerId)?.status;
    expect(initialStatus).toBe('ACTIVE');

    useAppStore.getState().toggleCustomerStatus(customerId);
    const updatedCustomer = useAppStore.getState().customers.find((c) => c.id === customerId);
    expect(updatedCustomer?.status).toBe('ISOLATED');
  });

  it('should add a new subscriber via addCustomer', () => {
    const initialCount = useAppStore.getState().customers.length;
    useAppStore.getState().addCustomer({
      customerCode: 'ISP-9999',
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+62812345678',
      status: 'ACTIVE',
      billingType: 'POSTPAID',
      pppoeUsername: 'test_net',
      planName: 'Ultra Fiber 100 Mbps',
      monthlyPrice: 450000,
      ipAddress: '103.144.12.99',
      address: 'Test Address',
    });

    expect(useAppStore.getState().customers.length).toBe(initialCount + 1);
    expect(useAppStore.getState().customers[0].fullName).toBe('Test User');
  });
});
