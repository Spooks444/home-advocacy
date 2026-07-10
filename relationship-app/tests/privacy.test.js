const assert = require('assert');
const privacy = require('../server/middleware/privacy');
const auth = require('../server/middleware/auth');
const household = require('../server/middleware/household');

describe('privacy middleware', () => {
  it('redacts sensitive keys from objects', async () => {
    const req = {},
      res = {
        status(code) {
          assert.strictEqual(code, 200);
          return this;
        },
        json(payload) {
          assert.deepStrictEqual(payload, { keep: 'value', nested: { keep: 'inner' } });
        },
      },
      next = () => {};

    privacy(req, res, next);
    req.safeRespond(res, 200, { keep: 'value', secret: '123', token: 'abc', nested: { keep: 'inner', password: 'x' } });
  });

  it('redacts array payloads', async () => {
    const req = {},
      res = {
        status(code) {
          assert.strictEqual(code, 200);
          return this;
        },
        json(payload) {
          assert.deepStrictEqual(payload, [{ a: 1 }, { a: 1 }]);
        },
      },
      next = () => {};

    privacy(req, res, next);
    req.safeRespond(res, 200, [
      { a: 1, secret: 's' },
      { a: 1, apiKey: 'k' },
    ]);
  });
});

describe('auth middleware', () => {
  it('rejects when profileId is missing', async () => {
    const req = {},
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
});

describe('household middleware', () => {
  it('accepts valid token and profileId', async () => {
    const req = { headers: { 'x-household-token': 'tok', 'x-profile-id': 'prof_123' } },
      res = { status() {}, json() {} },
      next = () => {
        assert.strictEqual(req.profileId, 'prof_123');
      };
    household(req, res, next);
  });

  it('rejects missing headers', async () => {
    const req = { headers: {} },
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

    household(req, res, next);
  });
});
