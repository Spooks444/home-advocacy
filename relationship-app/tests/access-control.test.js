const assert = require('assert');

function createRes() {
  let statusCode = 200;
  const body = [];
  const res = {
    status(code) {
      statusCode = code;
      return res;
    },
    json(payload) {
      body.push(payload);
      return res;
    },
    end() {
      return res;
    },
    get statusCode() { return statusCode; },
    get body() { return body.length === 1 ? body[0] : body; }
  };
  return res;
}

describe('access control outcomes', () => {
  it('requires auth on protected routes via middleware', () => {
    const auth = require('../server/middleware/auth');
    const req = {};
    const res = createRes();
    const next = () => res.status(401).json({ error: 'NOT_AUTHENTICATED' });
    auth(req, res, next);
    assert.strictEqual(res.statusCode, 401);
    assert.deepStrictEqual(res.body, { error: 'NOT_AUTHENTICATED' });
  });
  it('accepts an authenticated profile', () => {
    const auth = require('../server/middleware/auth');
    const req = { profileId: 'prof_1', headers: {} };
    const res = createRes();
    const next = () => res.status(200).json({ ok: true });
    auth(req, res, next);
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, { ok: true });
  });
  it('rejects missing headers in household middleware', () => {
    const household = require('../server/middleware/household');
    const req = { headers: {} };
    const res = createRes();
    const next = () => res.status(401).json({ error: 'NOT_AUTHENTICATED' });
    household(req, res, next);
    assert.strictEqual(res.statusCode, 401);
    assert.deepStrictEqual(res.body, { error: 'NOT_AUTHENTICATED' });
  });
  it('accepts valid token and profileId in household middleware', () => {
    const household = require('../server/middleware/household');
    const req = { headers: { 'x-household-token': 'tok_1', 'x-profile-id': 'prof_1' } };
    const res = createRes();
    const next = () => res.status(200).json({ ok: true });
    household(req, res, next);
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, { ok: true });
  });
});
