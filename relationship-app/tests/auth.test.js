const assert = require('assert');
const auth = require('../server/middleware/auth');
const household = require('../server/middleware/household');

describe('auth middleware', () => {
  it('rejects when profileId is missing', async () => {
    const req = { profileId: null },
      res = {
        status(code) {
          assert.strictEqual(code, 401);
          return this;
        },
        json(payload) {
          assert.strictEqual(payload.error, 'NOT_AUTHENTICATED');
        },
      },
      next = () => {};

    auth(req, res, next);
  });

  it('accepts when profileId is present', async () => {
    const req = { profileId: 'prof_123' },
      res = { status() {}, json() {} },
      next = () => {};

    auth(req, res, next);
  });
});
