import { PrismaClient } from "@prisma/client";

// In development, Next.js reloads files often.
// This keeps one shared database connection instead of opening a new one each time.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
