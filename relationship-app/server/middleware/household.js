const household = require('../services/household');

module.exports = (req, res, next) => {
  const token = req.headers?.['x-household-token'] || req.headers?.['x-household-token'.toLowerCase()];
  const profileId = req.headers?.['x-profile-id'] || req.headers?.['x-profile-id'.toLowerCase()];
  const result = household.verify(token, profileId);
  if (!result.ok) return res.status(401).json({ error: 'NOT_AUTHENTICATED' });
  req.profileId = result.profileId;
  next();
};
