# Consent API

## POST /api/relationship/consent
Create a consent record.

### Request
- `profileId`: string, required, min 8 chars
- `purpose`: string, required
- `granted`: boolean, required
- `scope`: string, optional
- `retentionDays`: number, optional
- `metadata`: object, optional; secrets are redacted

### Response 201
Consent object with redacted sensitive fields.

### Errors
- `400 INVALID_PROFILE_ID`
- `400 INVALID_PURPOSE`
- `400 INVALID_GRANTED`
- `401 NOT_AUTHENTICATED`

## POST /api/relationship/consent/:id/revoke
Revoke a prior consent record.

### Response 200
Updated consent object.

### Errors
- `401 NOT_AUTHENTICATED`
