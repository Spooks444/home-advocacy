const express = require('express');
const router = express.Router();
router.use('/messages', require('./messages'));
router.use('/exercises', require('./exercises'));
router.use('/resources', require('./resources'));
router.use('/consent', require('./consent'));
router.get('/health', (req, res) => res.json({ status: 'ok' }));
module.exports = router;
