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
    expect(initialInvoices.length).toBeGreaterThanOrEqual(3);
    expect(initialInvoices[0]).toHaveProperty('totalAmount');
  });
});
