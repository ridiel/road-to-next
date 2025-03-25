import { Placeholder } from '@/components/placeholder';

import { TicketItem } from './ticket-item';
import { TicketPagination } from './ticket-pagination';
import { TicketSearchInput } from './ticket-search-input';
import { TicketSortSelect } from './ticket-sort-select';

import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-params';

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams,
  );

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { label: 'Newest', sortKey: 'createdAt', sortValue: 'desc' },
            { label: 'Oldest', sortKey: 'createdAt', sortValue: 'asc' },
            { label: 'Bounty', sortKey: 'bounty', sortValue: 'desc' },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
};
