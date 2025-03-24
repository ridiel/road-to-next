import { prisma } from '@/lib/prisma';

import { ParsedSearchParams } from '../search-params';

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  const { search, sort } = await searchParams;

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      ...(sort === 'newest' && { createdAt: 'desc' }),
      ...(sort === 'bounty' && { bounty: 'desc' }),
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
