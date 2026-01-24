import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CountUp } from '@components/CountUp';

describe('CountUp', () => {
  it('renders initial value', () => {
    render(<CountUp end={100} />);
    expect(screen.getByText(/\d+/)).toBeInTheDocument();
  });

  it('counts up to end value', async () => {
    render(<CountUp end={100} duration={0.1} />);
    
    await waitFor(
      () => {
        expect(screen.getByText('100')).toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });

  it('renders with suffix', async () => {
    render(<CountUp end={50} duration={0.1} suffix="K+" />);
    
    await waitFor(
      () => {
        expect(screen.getByText('50K+')).toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });
});
