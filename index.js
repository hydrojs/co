/**
 * Dependencies.
 */

var co = require('co');

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
  var Test = hydro.constructor.Test;
  var createTest = Test.create;
  Test.create = function(params) {
    var fn = params[params.length - 1];

    if (isGenerator(fn)) {
      params[params.length - 1] = co(fn);
    }

    return createTest(params);
  };
};
