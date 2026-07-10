const Mocha = require('mocha');
const { resolve } = require('path');

const mocha = new Mocha();
mocha.addFile(resolve(__dirname, 'privacy.test.js'));
mocha.addFile(resolve(__dirname, 'auth.test.js'));
mocha.addFile(resolve(__dirname, 'validation.test.js'));

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
