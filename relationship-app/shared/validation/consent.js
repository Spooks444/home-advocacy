module.exports = {
  validateConsent: (payload) => {
    const allowedPurposes = ['messaging', 'sync', 'resource_access', 'assessment', 'data_retention', 'marketing'];
    const allowedScopes = ['local', 'encrypted_cloud', 'participants_only', 'support_staff'];
    const p = payload || {};
    if (!p.profileId || typeof p.profileId !== 'string') return { ok: false, error: 'INVALID_PROFILE_ID' };
    if (!p.purpose || !allowedPurposes.includes(p.purpose)) return { ok: false, error: 'INVALID_PURPOSE' };
    if (typeof p.granted !== 'boolean') return { ok: false, error: 'INVALID_GRANTED' };
    if (p.scope && !allowedScopes.includes(p.scope)) return { ok: false, error: 'INVALID_SCOPE' };
    if (p.retentionDays !== undefined && (typeof p.retentionDays !== 'number' || p.retentionDays < 1 || p.retentionDays > 3650)) return { ok: false, error: 'INVALID_RETENTION_DAYS' };
    const filtered = { profileId: p.profileId, purpose: p.purpose, granted: p.granted, scope: p.scope || 'local', retentionDays: p.retentionDays || null, metadata: p.metadata || null };
    return { ok: true, data: filtered };
  },
};
