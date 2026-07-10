module.exports = {
  validateMessage: (payload) => {
    const allowed = ['threadId', 'sender', 'body', 'createdAt'];
    const filtered = Object.fromEntries(
      Object.entries(payload || {}).filter(([k]) => allowed.includes(k))
    );
    if (!filtered.threadId || typeof filtered.threadId !== 'string') return { ok: false, error: 'INVALID_THREAD' };
    if (typeof filtered.body !== 'string' || filtered.body.length > 5000) return { ok: false, error: 'INVALID_BODY' };
    return { ok: true, data: filtered };
  },

  redact(inputPayload) {
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

    const payload = inputPayload || {};
    if (Array.isArray(payload)) return payload.map((item) => this.redact(item));
    if (!payload || typeof payload !== 'object') return payload;

    const out = {};
    for (const [k, v] of Object.entries(payload)) {
      if (SENSITIVE_KEYS.has(k)) continue;
      out[k] = v && typeof v === 'object' ? this.redact(v) : v;
    }
    return out;
  },

};
