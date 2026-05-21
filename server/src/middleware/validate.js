const { ZodError } = require('zod');

const validate = (schema, target = 'body') => (req, res, next) => {
  try {
    const parsed = schema.parse(req[target]);
    req[target] = parsed;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return res.status(422).json({ message: 'Validation failed', errors });
    }
    next(err);
  }
};

module.exports = { validate };
