import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { searchParamsCache } from '@/features/ticket/search-params';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="All Tickets" description="Tickets by everyone at one place" />

      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
};

export default HomePage;
