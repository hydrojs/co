/**
 * Dependencies.
 */

var co = require('co');
var Test = require('hydro').Test;
var createTest = Test.create;

/**
 * Return whether `fn` is GeneratorFunction.
 *
 * @returns {Boolean}
 * @api private
 */

function isGenerator(fn) {
  return fn && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}

/**
 * Add support for GeneratorFunctions.
 *
 * TODO: monkey patching Test.create is silly. We should expose
 * a public api for this.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  Test.create = function(params) {
    var fn = params[params.length - 1];
    var gen = null;

    if (isGenerator(fn)) {
      params.pop();

      gen = function(done) {
        co(function *() {
          yield fn();
          done();
        })();
      };
      params.push(gen);
    }

    return createTest(params);
  };
};
