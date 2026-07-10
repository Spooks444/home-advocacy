// Relationship App Auth Middleware
// Requires household middleware first.
module.exports = (req, res, next) => {
  if (!req.profileId) return res.status(401).json({ error: 'NOT_AUTHENTICATED' });
  next();
};
