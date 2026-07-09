// Relationship App Server Middleware
// Enforces household-profile access and redacts sensitive fields.

const redact = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const copy = { ...obj };
  delete copy.rawIdentifier;
  delete copy.token;
  delete copy.secret;
  delete copy.credential;
  delete copy.password;
  delete copy.apiKey;
  return copy;
};

const safeRespond = (res, status, payload) => {
  const safe = Array.isArray(payload) ? payload.map(redact) : redact(payload);
  res.status(status).json(safe);
};

module.exports = { redact, safeRespond };
