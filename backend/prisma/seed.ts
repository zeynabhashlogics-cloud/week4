import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() 
{
  const user1 = await prisma.user.create({
    data: {
      name: "Ali",
      age: 20,
      tasks: {
        create: [
          {
            title: "Learn Prisma",
            status: "pending",
            priority: "high",
          },
          {
            title: "Build API",
            status: "completed",
            priority: "medium",
          },
        ],
      },
    },
  });


  console.log(user1);
}

main()
  .catch((error) => 
    {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => 
    {
    await prisma.$disconnect();
  });
