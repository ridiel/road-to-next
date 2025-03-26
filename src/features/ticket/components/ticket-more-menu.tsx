'use client';

import { Ticket, TicketStatus } from '@prisma/client';
import { LucideTrash } from 'lucide-react';
import { toast } from 'sonner';

import useConfirmDialog from '@/components/confirm-dialog';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenu } from '@/components/ui/dropdown-menu';

import { deleteTicket } from '../actions/delete-ticket';
import { updateTicketStatus } from '../actions/update-ticket-status';
import { TICKET_STATUS_LABELS } from '../constants';
type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: 'Updating status...',
    });

    const result = await promise;

    if (result.status === 'SUCCESS') {
      toast.success(result.message);
    }

    if (result.status === 'ERROR') {
      toast.error(result.message);
    }
  };

  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_STATUS_LABELS).map(([status, label]) => {
        return (
          <DropdownMenuRadioItem key={status} value={status}>
            {label}
          </DropdownMenuRadioItem>
        );
      })}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="left" className="w-56">
          {ticketStatusRadioGroup}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
