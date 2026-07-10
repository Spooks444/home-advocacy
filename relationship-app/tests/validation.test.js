const assert = require('assert');
const validate = require('../shared/validation/validate');

describe('validation', () => {
  it('validates message payload', () => {
    assert.deepStrictEqual(validate.validateMessage({ threadId: 't1', body: 'hi' }), { ok: true, data: { threadId: 't1', body: 'hi' } });
  });

  it('rejects invalid thread', () => {
    const out = validate.validateMessage({ body: 'hi' });
    assert.strictEqual(out.ok, false);
    assert.strictEqual(out.error, 'INVALID_THREAD');
  });

  it('rejects overly long body', () => {
    const out = validate.validateMessage({ threadId: 't1', body: 'x'.repeat(5001) });
    assert.strictEqual(out.ok, false);
    assert.strictEqual(out.error, 'INVALID_BODY');
  });

  it('redacts sensitive fields', () => {
    const out = validate.redact({ name: 'a', token: 't', secret: 's', nested: { password: 'p' } });
    assert.strictEqual(out.name, 'a');
    assert.strictEqual(out.token, undefined);
    assert.strictEqual(out.secret, undefined);
    assert.deepStrictEqual(out.nested, {});
  });
});
