const express = require('express');
const router = express.Router();
const model = require('../models/consent');

/**
 * @openapi
 * /api/relationship/consent:
 *   post:
 *     summary: Record consent for a purpose
 */
router.post('/', async (req, res, next) => {
  try {
    const { profileId, purpose, granted, scope, retentionDays, metadata } = req.body || {};
    if (!profileId || !purpose || typeof granted !== 'boolean') return res.status(400).json({ error: 'INVALID_CONSENT' });
    const record = await model.create({ profileId, purpose, granted, scope, retentionDays, metadata });
    res.status(201).json(record);
  } catch (err) { next(err); }
});

/**
 * @openapi
 * /api/relationship/consent/{id}/revoke:
 *   post:
 *     summary: Revoke a previously recorded consent
 */
router.post('/:id/revoke', async (req, res, next) => {
  try {
    const updated = await model.revoke(req.params.id);
    res.json(updated);
  } catch (err) { next(err); }
});

module.exports = router;
