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
 * Return whether `obj` is a Promise.

 * @return {Boolean}
 * @api private
 */

function isPromise(obj){
  return obj && typeof obj.then === 'function';
}

/**
 * Wrap `fn` to handle any attempts at asynchrony
 *
 * @param {Function|GeneratorFunction} fn
 * @return {Function}
 */

function sync(fn) {
  return function(done) {
    var res = isGenerator(fn) ? co(fn) : fn(done);
    if (isPromise(res)) {
      res.then(function(){ done(); }, done);
    } else {
      fn.length || done();
    }
  };
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
    params[params.length - 1] = sync(params[params.length - 1]);
    return createTest(params);
  };

  [
    'beforeNext',
    'afterNext',
    'beforeAll',
    'afterAll',
    'before',
    'after'
  ].forEach(function(method){
    var original = hydro.interface[method];
    hydro.interface[method] = function(fn) {
      original.call(hydro.interface, sync(fn));
    };
  });
};
