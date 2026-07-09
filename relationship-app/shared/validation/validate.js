module.exports = {
  validateMessage: (payload) => {
    const allowed = ['threadId', 'sender', 'body', 'createdAt'];
    const filtered = Object.fromEntries(Object.entries(payload || {}).filter(([k]) => allowed.includes(k)));
    if (!filtered.threadId || typeof filtered.threadId !== 'string') return { ok: false, error: 'INVALID_THREAD' };
    if (typeof filtered.body !== 'string' || filtered.body.length > 5000) return { ok: false, error: 'INVALID_BODY' };
    return { ok: true, data: filtered };
  },
  redact: (payload) => {
    const copy = { ...(payload || {}) };
    delete copy.rawIdentifier;
    delete copy.token;
    delete copy.secret;
    delete copy.credential;
    delete copy.password;
    delete copy.apiKey;
    return copy;
  }
};
