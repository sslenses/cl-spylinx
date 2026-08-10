import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('App Integration', () => {
  it('should render main Admin Dashboard shell', () => {
    render(<App />);
    expect(screen.getAllByText(/EIMAS/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/EIMAS ISP Framework/i)).toBeDefined();
  });
});

