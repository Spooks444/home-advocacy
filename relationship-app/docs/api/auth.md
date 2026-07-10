# Auth Requirements

## Headers
Protected routes require household-level headers.

- `x-household-token`: household token
- `x-profile-id`: profile identifier for the authenticated participant

## Failure Modes
Missing headers return `401 NOT_AUTHENTICATED`.

Tokens are never returned in responses. PHI and credentials are redacted by server middleware before serialization.

## Local Mode
Some routes remain accessible without headers for local-only preview or testing. Do not rely on unauthenticated access in production.
