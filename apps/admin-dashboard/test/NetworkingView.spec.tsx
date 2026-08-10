import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { NetworkingView } from '../src/modules/oss/NetworkingView';

describe('NetworkingView Component', () => {
  it('should render router list and status', () => {
    render(<NetworkingView />);
    expect(screen.getByText('BRAS-MikroTik-Jakarta-Core1')).toBeDefined();
    expect(screen.getByText('BRAS-AccelPPP-Bandung-POP2')).toBeDefined();
  });
});
