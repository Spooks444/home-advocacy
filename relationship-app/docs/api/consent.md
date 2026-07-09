# Consent API

## POST /api/relationship/consent
Record explicit user consent.

Required:
- profileId
- purpose
- granted

Optional:
- scope
- retentionDays
- metadata

## POST /api/relationship/consent/:id/revoke
Revoke a prior consent record.

## Safety
- Never store secrets in metadata
- Keep retention within policy limits
- Prefer local-only scope unless encrypted sync is explicitly enabled
