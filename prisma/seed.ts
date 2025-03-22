import { hash } from '@node-rs/argon2';

import { prisma } from '@/lib/prisma';

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    email: 'kuzovlev.dev@gmail.com',
  },
];

export const tickets = [
  {
    title: 'Ticket 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'Ticket 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    title: 'Ticket 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('DB Seed: Started...');

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash('password');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map(user => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map(ticket => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${((t1 - t0) / 1000).toFixed(3)} seconds`);
};

seed();
