import { render, screen } from '@testing-library/react';

import { Heading } from '@/components/heading';

import '@testing-library/jest-dom';

describe('Heading', () => {
  it('should render', () => {
    render(<Heading title="Test" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(<Heading title="Test" description="Test Description" />);

    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render separator', () => {
    render(<Heading title="Test" />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
