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

function isPromise(obj) {
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
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  [
    'addTest',
    'beforeNext',
    'afterNext',
    'beforeAll',
    'afterAll',
    'before',
    'after'
  ].forEach(function(method){
    var original = hydro.interface[method];
    hydro.interface[method] = function() {
      arguments[arguments.length - 1] = sync(arguments[arguments.length - 1]);
      return original.apply(hydro.interface, arguments);
    };
  });
};
