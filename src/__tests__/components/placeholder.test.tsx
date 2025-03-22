import { render, screen } from '@testing-library/react';

import { Placeholder } from '@/components/placeholder';

import '@testing-library/jest-dom';

describe('Placeholder', () => {
  // Test default rendering
  it('renders with default props', () => {
    render(<Placeholder label="Test Label" />);

    // Check if label is rendered
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  // Test custom icon rendering
  it('renders with custom icon', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    render(<Placeholder label="Test Label" icon={<CustomIcon />} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  // Test custom button rendering
  it('renders with custom button', () => {
    const CustomButton = () => <button>Click me</button>;
    render(<Placeholder label="Test Label" button={<CustomButton />} />);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
});
