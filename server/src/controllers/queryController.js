const { z } = require('zod');
const queryService = require('../services/queryService');
const emailService = require('../services/emailService');
const { verifyRecaptcha } = require('../utils/recaptcha');
const env = require('../config/env');

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,15}$/, 'Invalid phone number'),
  location: z.string().min(2).max(200),
  message: z.string().max(2000).optional(),
  recaptchaToken: z.string().min(1, 'reCAPTCHA is required'),
});

const submitContact = async (req, res, next) => {
  try {
    const body = contactSchema.parse(req.body);

    if (env.RECAPTCHA_SECRET_KEY) {
      const captcha = await verifyRecaptcha(body.recaptchaToken);
      if (!captcha.success) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }
    }

    const { recaptchaToken: _, ...queryData } = body;
    const query = await queryService.create(queryData);

    emailService.sendContactNotification(queryData).catch(() => {});

    res.status(201).json({ message: 'Query submitted successfully', id: query.id });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const q = (req.query.q || '').trim();
    const result = await queryService.list({ page, limit, q });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await queryService.remove(req.params.id);
    res.json({ message: 'Query deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, list, remove };
