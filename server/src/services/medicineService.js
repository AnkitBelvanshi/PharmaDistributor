const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const list = async ({ page = 1, limit = 12 } = {}) => {
  const skip = (page - 1) * limit;
  const [medicines, total] = await Promise.all([
    prisma.medicine.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.medicine.count(),
  ]);
  return { medicines, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getFeatured = async (count = 6) => {
  return prisma.medicine.findMany({ take: count, orderBy: { createdAt: 'desc' } });
};

const getById = async (id) => {
  const medicine = await prisma.medicine.findUnique({ where: { id: Number(id) } });
  if (!medicine) throw Object.assign(new Error('Medicine not found'), { status: 404 });
  return medicine;
};

const search = async (q, { page = 1, limit = 12 } = {}) => {
  const skip = (page - 1) * limit;
  const where = {
    name: { contains: q, mode: 'insensitive' },
  };
  const [medicines, total] = await Promise.all([
    prisma.medicine.findMany({ where, skip, take: limit, orderBy: { name: 'asc' } }),
    prisma.medicine.count({ where }),
  ]);
  return { medicines, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const create = async ({ name, description, imageFile }) => {
  const image = imageFile ? imageFile.filename : null;
  return prisma.medicine.create({ data: { name, description, image } });
};

const update = async (id, { name, description, imageFile }) => {
  const existing = await getById(id);

  const data = {};
  if (name) data.name = name;
  if (description) data.description = description;

  if (imageFile) {
    if (existing.image) {
      const oldPath = path.join(__dirname, '../../uploads', existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    data.image = imageFile.filename;
  }

  return prisma.medicine.update({ where: { id: Number(id) }, data });
};

const remove = async (id) => {
  const existing = await getById(id);

  if (existing.image) {
    const imgPath = path.join(__dirname, '../../uploads', existing.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await prisma.medicine.delete({ where: { id: Number(id) } });
};

module.exports = { list, getFeatured, getById, search, create, update, remove };
