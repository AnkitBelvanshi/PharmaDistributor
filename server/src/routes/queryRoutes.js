const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/queryController');
const { authenticate } = require('../middleware/auth');

// Public
router.post('/contact', ctrl.submitContact);

// Admin (protected)
router.get('/admin/queries', authenticate, ctrl.list);
router.delete('/admin/queries/:id', authenticate, ctrl.remove);

module.exports = router;
