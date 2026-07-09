module.exports = {
  create: async (record) => ({
    id: 'consent_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    profileId: record.profileId,
    purpose: record.purpose,
    granted: !!record.granted,
    scope: record.scope || 'local',
    retentionDays: record.retentionDays || null,
    metadata: record.metadata || null,
    timestamp: new Date().toISOString(),
    revokedAt: null,
  }),
  revoke: async (id, opts = {}) => ({ id, revokedAt: new Date().toISOString(), ...opts }),
};
