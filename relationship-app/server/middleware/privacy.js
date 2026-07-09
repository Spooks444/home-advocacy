// Relationship App Privacy Middleware
// Enforces minimum logging, redacts sensitive fields, strips identifiers by default.

const SENSITIVE_KEYS = new Set([
  'rawIdentifier',
  'identifier',
  'token',
  'secret',
  'credential',
  'password',
  'apiKey',
  'accessToken',
  'refreshToken',
  'sessionToken',
  'ssn',
  'dob',
  'birthDate',
  'address',
  'phone',
  'email',
  'fullName',
  'legalName',
]);

function redact(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(redact);
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(k)) continue;
    out[k] = redact(v);
  }
  return out;
}

function safeRespond(res, status, payload) {
  const safe = Array.isArray(payload) ? payload.map(redact) : redact(payload);
  res.status(status || 200).json(safe);
}

module.exports = (req, res, next) => {
  req.safeRespond = safeRespond;
  next();
};
