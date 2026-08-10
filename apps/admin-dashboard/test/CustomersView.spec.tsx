import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CustomersView } from '../src/modules/crm/CustomersView';

describe('CustomersView Component', () => {
  it('should render customer list table', () => {
    render(<CustomersView />);
    expect(screen.getByText('Budi Santoso')).toBeDefined();
    expect(screen.getByText('Siti Rahmawati')).toBeDefined();
  });

  it('should toggle customer status when action button clicked', () => {
    render(<CustomersView />);
    const toggleBtns = screen.getAllByRole('button', { name: /Isolate|Unblock/i });
    expect(toggleBtns.length).toBeGreaterThan(0);
    fireEvent.click(toggleBtns[0]);
    expect(screen.getAllByText(/ISOLATED|ACTIVE/i).length).toBeGreaterThan(0);
  });
});
