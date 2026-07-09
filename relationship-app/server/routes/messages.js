const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');
router.post('/', async (req, res, next) => {
  try {
    const { threadId, sender, body } = req.body || {};
    if (!threadId || typeof threadId !== 'string') return res.status(400).json({ error: 'INVALID_THREAD' });
    if (typeof body !== 'string' || body.length > 5000) return res.status(400).json({ error: 'INVALID_BODY' });
    const created = await messageModel.create({ threadId, sender, body });
    req.safeRespond(res, 201, created);
  } catch (err) { next(err); }
});
router.get('/thread/:threadId', async (req, res, next) => {
  try {
    const items = await messageModel.listByThread(req.params.threadId);
    req.safeRespond(res, 200, items);
  } catch (err) { next(err); }
});
module.exports = router;
