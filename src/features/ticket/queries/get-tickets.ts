import { prisma } from '@/lib/prisma';

import { ParsedSearchParams } from '../search-params';

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  const { search, sortKey, sortValue } = await searchParams;

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      [sortKey]: sortValue,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
