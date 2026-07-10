// Household verification service
// Placeholder: validate membership via signed token or external identity provider.

module.exports = {
  verify: (token, profileId) => {
    if (!token || typeof token !== 'string') return { ok: false, reason: 'MISSING_TOKEN' };
    if (!profileId || typeof profileId !== 'string') return { ok: false, reason: 'MISSING_PROFILE' };
    return { ok: true, profileId };
  },
};
