# Resources API

## GET /api/relationship/resources
List resources.

### Response 200
Array of objects:
- `id`: string
- `title`: string
- `kind`: `resource`

### Errors
- `401 NOT_AUTHENTICATED`

## GET /api/relationship/resources/:slug
Get one resource markdown object.

### Response 200
- `id`: string
- `content`: markdown string

### Errors
- `401 NOT_AUTHENTICATED`
- `404 NOT_FOUND`
