const { z } = require('zod');
const authService = require('../services/authService');
const env = require('../config/env');

const COOKIE_OPTS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const profileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

const register = async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const user = await authService.register(body);
    res.status(201).json({ message: 'Registered successfully', user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const { accessToken, refreshToken, user } = await authService.login(body);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    const { accessToken, refreshToken: newRefresh } = await authService.refresh(token);
    res.cookie('refreshToken', newRefresh, COOKIE_OPTS);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const body = profileSchema.parse(req.body);
    const user = await authService.updateProfile(req.user.id, body);
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await authService.deleteAccount(req.user.id);
    res.clearCookie('refreshToken');
    res.json({ message: 'Account deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, refreshToken, getMe, updateProfile, deleteAccount };
