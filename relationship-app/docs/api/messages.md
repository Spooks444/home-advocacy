# Messages API

## POST /api/relationship/messages
Creates a message object.

Request body:
- threadId: string
- sender: string
- body: string

## GET /api/relationship/messages/thread/:threadId
Lists messages for a thread.

## Safety
- Do not return raw identifiers in responses.
- Do not log message bodies unless explicitly required and consented.
