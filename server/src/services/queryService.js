const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async ({ firstName, lastName, email, phone, location, message }) => {
  return prisma.customerQuery.create({
    data: { firstName, lastName, email, phone, location, message },
  });
};

const list = async ({ page = 1, limit = 15, q = '' } = {}) => {
  const skip = (page - 1) * limit;
  const where = q
    ? {
        OR: [
          { firstName: { contains: q, mode: 'insensitive' } },
          { lastName: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } },
        ],
      }
    : {};

  const [queries, total] = await Promise.all([
    prisma.customerQuery.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.customerQuery.count({ where }),
  ]);

  return { queries, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getRecent = async (count = 5) => {
  return prisma.customerQuery.findMany({
    take: count,
    orderBy: { createdAt: 'desc' },
  });
};

const remove = async (id) => {
  const existing = await prisma.customerQuery.findUnique({ where: { id: Number(id) } });
  if (!existing) throw Object.assign(new Error('Query not found'), { status: 404 });
  await prisma.customerQuery.delete({ where: { id: Number(id) } });
};

module.exports = { create, list, getRecent, remove };
