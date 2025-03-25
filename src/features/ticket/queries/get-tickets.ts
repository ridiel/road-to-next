import { prisma } from '@/lib/prisma';

import { ParsedSearchParams } from '../search-params';

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const { search, sortKey, sortValue, page, size } = await searchParams;

  const where = {
    userId,
    title: {
      contains: search,
      mode: 'insensitive' as const,
    },
  };

  const skip = page * size;
  const take = size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
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
    }),

    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
