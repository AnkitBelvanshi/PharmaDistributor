const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/medicineController');
const { authenticate } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public — order matters: specific paths before /:id
router.get('/featured', ctrl.featured);
router.get('/search', ctrl.search);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

// Admin — same resource, protected by HTTP method + middleware
router.post('/', authenticate, upload.single('image'), ctrl.create);
router.put('/:id', authenticate, upload.single('image'), ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
