# Exercises API

## GET /api/relationship/exercises
List exercises.

### Response 200
Array of objects:
- `id`: string
- `title`: string
- `kind`: `guided_exercise`

### Errors
- `401 NOT_AUTHENTICATED`

## GET /api/relationship/exercises/:slug
Get one exercise markdown object.

### Response 200
- `id`: string
- `content`: markdown string

### Errors
- `401 NOT_AUTHENTICATED`
- `404 NOT_FOUND`
