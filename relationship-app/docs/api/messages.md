# Messages API

## POST /api/relationship/messages
Create a message.

### Request
- `threadId`: string, required
- `sender`: string, required
- `body`: string, required, max 5000 chars

### Response 201
- `id`: string
- `threadId`: string
- `sender`: string, redacted if sensitive
- `body`: string

### Errors
- `400 INVALID_THREAD`
- `400 INVALID_BODY`
- `401 NOT_AUTHENTICATED`

## GET /api/relationship/messages/thread/:threadId
List messages for a thread.

### Response 200
Array of message objects.

### Errors
- `401 NOT_AUTHENTICATED`
