require('dotenv').config();

// Render's external PostgreSQL requires SSL — append before any Prisma client is created
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sslmode')) {
  process.env.DATABASE_URL += (process.env.DATABASE_URL.includes('?') ? '&' : '?') + 'sslmode=require';
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const queryRoutes = require('./routes/queryRoutes');

const app = express();

// Trust Render's proxy so express-rate-limit can read X-Forwarded-For correctly
app.set('trust proxy', 1);

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images from frontend
  })
);

// CORS
const allowedOrigins = [
  env.CLIENT_URL,
  'https://crossmeds.com',
  'https://www.crossmeds.com',
  'https://crossmeds-web.onrender.com',
  'http://localhost:5173',
];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Rate limiting — stricter on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests, please try again later' },
});

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api', queryRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Dashboard stats endpoint
app.get('/api/admin/stats', require('./middleware/auth').authenticate, async (req, res, next) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const [medicinesCount, queriesCount, recentQueries] = await Promise.all([
      prisma.medicine.count(),
      prisma.customerQuery.count(),
      prisma.customerQuery.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    ]);
    res.json({ medicinesCount, queriesCount, recentQueries });
  } catch (err) {
    next(err);
  }
});

// 404
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal server error';

  console.error(err);

  // Zod validation errors bubble up with issues array
  if (err.name === 'ZodError') {
    return res.status(422).json({
      message: 'Validation failed',
      errors: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  res.status(status).json({ message });
});

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

module.exports = app;
