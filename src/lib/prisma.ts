import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
console.log(typeof PrismaClient, "prismaClient");
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
