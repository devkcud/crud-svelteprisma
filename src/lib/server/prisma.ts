import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export { prisma };
