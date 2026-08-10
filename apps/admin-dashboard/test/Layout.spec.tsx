import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TopBar } from '../src/components/layout/TopBar';
import { useAppStore } from '../src/lib/store';

describe('TopBar Component', () => {
  it('should render Deployment guide button and Main Admin badge', () => {
    render(<TopBar />);
    expect(screen.getByText(/Deployment guide/i)).toBeDefined();
    expect(screen.getByText(/Main Admin/i)).toBeDefined();
  });

  it('should trigger Quick Add modal when plus button clicked', () => {
    render(<TopBar />);
    const addBtn = screen.getByLabelText(/Quick Add/i);
    fireEvent.click(addBtn);
    expect(useAppStore.getState().isQuickAddOpen).toBe(true);
  });
});
