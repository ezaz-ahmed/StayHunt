import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header';

describe('Header', () => {
  it('renders the StayHunt brand', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /stayhunt/i })).toBeInTheDocument();
  });

  it('links the logo to the homepage', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /stayhunt/i })).toHaveAttribute('href', '/');
  });
});
