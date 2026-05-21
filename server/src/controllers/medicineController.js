const { z } = require('zod');
const medicineService = require('../services/medicineService');

const medicineSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(10),
});

const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const result = await medicineService.list({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const featured = async (req, res, next) => {
  try {
    const medicines = await medicineService.getFeatured(6);
    res.json(medicines);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const result = await medicineService.search(q, { page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const medicine = await medicineService.getById(req.params.id);
    res.json(medicine);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const body = medicineSchema.parse(req.body);
    const medicine = await medicineService.create({
      ...body,
      imageFile: req.file,
    });
    res.status(201).json({ message: 'Medicine created', medicine });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const body = medicineSchema.partial().parse(req.body);
    const medicine = await medicineService.update(req.params.id, {
      ...body,
      imageFile: req.file,
    });
    res.json({ message: 'Medicine updated', medicine });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await medicineService.remove(req.params.id);
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, featured, search, getById, create, update, remove };
