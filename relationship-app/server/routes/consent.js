const express = require('express');
const router = express.Router();
const model = require('../models/consent');
router.post('/', async (req, res, next) => {
  try {
    const { profileId, purpose, granted, scope, retentionDays, metadata } = req.body || {};
    if (!profileId || typeof profileId !== 'string' || profileId.length < 8) return res.status(400).json({ error: 'INVALID_PROFILE_ID' });
    if (!purpose || typeof purpose !== 'string') return res.status(400).json({ error: 'INVALID_PURPOSE' });
    if (typeof granted !== 'boolean') return res.status(400).json({ error: 'INVALID_GRANTED' });
    const record = await model.create({ profileId, purpose, granted, scope, retentionDays, metadata });
    req.safeRespond(res, 201, record);
  } catch (err) { next(err); }
});
router.post('/:id/revoke', async (req, res, next) => {
  try {
    const updated = await model.revoke(req.params.id);
    req.safeRespond(res, 200, updated);
  } catch (err) { next(err); }
});
module.exports = router;
