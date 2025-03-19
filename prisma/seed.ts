import { prisma } from "@/lib/prisma";

export const tickets = [
  {
    title: "Ticket 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus. Quisquam, quos. Voluptatum, voluptatibus.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started...");

  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${((t1 - t0) / 1000).toFixed(3)} seconds`);
};

seed();
