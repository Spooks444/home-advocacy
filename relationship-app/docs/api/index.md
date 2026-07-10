# API Docs

Base path: `/api/relationship`

## Auth
Protected routes require:
- `x-household-token`
- `x-profile-id`

Responses are filtered by the privacy middleware and do not return sensitive keys.

## Health
- `GET /api/relationship/health` — unauthenticated status check
