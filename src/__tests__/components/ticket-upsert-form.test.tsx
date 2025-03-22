import * as React from 'react';
import { TicketStatus } from '@prisma/client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { upsertTicket } from '@/features/ticket/actions/upsert-ticket';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { toCent } from '@/utils/currency';

// Mock the upsertTicket action
jest.mock('@/features/ticket/actions/upsert-ticket', () => ({
  upsertTicket: jest.fn(),
}));

// Mock the useActionState hook
jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useActionState: jest.fn().mockImplementation((action: unknown) => {
      return [{ error: null, success: false }, action];
    }),
  };
});

describe('TicketUpsertForm', () => {
  const mockTicket = {
    id: '1',
    title: 'Test Ticket',
    content: 'Test Content',
    deadline: new Date('2024-12-31').toISOString(),
    bounty: 1000, // 10.00 in cents
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
    status: 'OPEN' as TicketStatus,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create form with empty fields when no ticket is provided', () => {
    render(<TicketUpsertForm />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/content/i)).toHaveValue('');
    expect(screen.getByLabelText(/bounty/i)).toHaveValue('');
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('renders edit form with populated fields when ticket is provided', () => {
    render(<TicketUpsertForm ticket={mockTicket} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue(mockTicket.title);
    expect(screen.getByLabelText(/content/i)).toHaveValue(mockTicket.content);
    expect(screen.getByLabelText(/bounty/i)).toHaveValue('10.00');
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('calls upsertTicket with correct data on form submission', async () => {
    const user = userEvent.setup();
    const newTicket = {
      title: 'New Ticket',
      content: 'New Content',
      bounty: '15.50',
      deadline: '2024-12-31',
    };

    render(<TicketUpsertForm />);

    await user.type(screen.getByLabelText(/title/i), newTicket.title);
    await user.type(screen.getByLabelText(/content/i), newTicket.content);
    await user.type(screen.getByLabelText(/bounty/i), newTicket.bounty);

    // Simulate date selection
    const dateInput = screen.getByLabelText(/deadline/i);
    await user.type(dateInput, newTicket.deadline);
    await user.tab(); // Blur the date input

    await user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(upsertTicket).toHaveBeenCalledWith(undefined, {
        title: newTicket.title,
        content: newTicket.content,
        bounty: toCent(parseFloat(newTicket.bounty)),
        deadline: expect.any(String),
      });
    });
  });

  it('handles form submission errors', async () => {
    const mockError = {
      title: ['Title is required'],
      content: ['Content is required'],
      bounty: ['Bounty must be a positive number'],
    };

    (upsertTicket as jest.Mock).mockRejectedValueOnce({ errors: mockError });
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useActionState: jest
        .fn()
        .mockImplementation(() => [{ error: mockError, success: false }, jest.fn()]),
    }));

    render(<TicketUpsertForm />);

    await userEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText(mockError.title[0])).toBeInTheDocument();
      expect(screen.getByText(mockError.content[0])).toBeInTheDocument();
      expect(screen.getByText(mockError.bounty[0])).toBeInTheDocument();
    });
  });

  it('calls onSuccess callback and resets form after successful submission', async () => {
    (upsertTicket as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { ...mockTicket },
    });

    const datePickerResetMock = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValue({ current: { reset: datePickerResetMock } });

    render(<TicketUpsertForm />);

    await userEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(datePickerResetMock).toHaveBeenCalledTimes(1);
      expect(screen.getByLabelText(/title/i)).toHaveValue('');
      expect(screen.getByLabelText(/content/i)).toHaveValue('');
      expect(screen.getByLabelText(/bounty/i)).toHaveValue('');
    });
  });
});
