import { Placeholder } from '@/components/placeholder';
import { SearchInput } from '@/components/search-input';
import { SortSelect } from '@/components/sort-select';

import { TicketItem } from './ticket-item';

import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-params';

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect
          options={[
            { label: 'Newest', value: 'newest' },
            { label: 'Bounty', value: 'bounty' },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};
