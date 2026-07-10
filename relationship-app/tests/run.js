const Mocha = require('mocha');
const { resolve } = require('path');

const mocha = new Mocha();
['privacy.test.js', 'auth.test.js', 'validation.test.js', 'access-control.test.js'].forEach((f) => mocha.addFile(resolve(__dirname, f)));

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
