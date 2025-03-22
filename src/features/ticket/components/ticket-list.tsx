import { Placeholder } from '@/components/placeholder';
import { SearchInput } from '@/components/search-input';

import { TicketItem } from './ticket-item';

import { getTickets } from '../queries/get-tickets';
import { SearchParams } from '../search-params';

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search tickets..." />
      </div>

      {tickets.length ? (
        tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};
