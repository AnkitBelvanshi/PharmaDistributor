const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

const prisma = new PrismaClient();

const register = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already registered'), { status: 409 });

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const payload = { id: user.id, email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  const { password: _p, refreshToken: _r, ...safeUser } = user;
  return { accessToken, refreshToken, user: safeUser };
};

const logout = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};

const refresh = async (token) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: { id: decoded.id, refreshToken: token },
  });
  if (!user) throw Object.assign(new Error('Refresh token revoked'), { status: 401 });

  const payload = { id: user.id, email: user.email };
  const accessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newRefreshToken },
  });

  return { accessToken, refreshToken: newRefreshToken };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
  });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
};

const updateProfile = async (userId, { name, email, password }) => {
  const data = {};

  if (name) data.name = name;

  if (email) {
    const conflict = await prisma.user.findFirst({
      where: { email, NOT: { id: userId } },
    });
    if (conflict) throw Object.assign(new Error('Email already in use'), { status: 409 });
    data.email = email;
  }

  if (password) {
    data.password = await bcrypt.hash(password, 12);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, name: true, email: true, updatedAt: true },
  });

  return updated;
};

const deleteAccount = async (userId) => {
  await prisma.user.delete({ where: { id: userId } });
};

module.exports = { register, login, logout, refresh, getMe, updateProfile, deleteAccount };
