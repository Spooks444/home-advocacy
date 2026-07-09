const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');
router.post('/', async (req, res, next) => {
  try { const created = await messageModel.create(req.body); res.status(201).json(created); } catch (err) { next(err); }
});
router.get('/thread/:threadId', async (req, res, next) => {
  try { const items = await messageModel.listByThread(req.params.threadId); res.json(items); } catch (err) { next(err); }
});
module.exports = router;
