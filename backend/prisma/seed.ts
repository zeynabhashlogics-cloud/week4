import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.tasks.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      age: 20,
    },
  });

  await prisma.tasks.createMany({
    data: [
      {
        title: "Learn Prisma",
        status: "pending",
        priority: "high",
        userId: user.id,
      },
      {
        title: "Build API",
        status: "pending",
        priority: "medium",
        userId: user.id,
      },
      {
        title: "Test database",
        status: "completed",
        priority: "low",
        userId: user.id,
      },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });