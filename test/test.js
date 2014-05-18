var assert = require('assert');
var Hydro = require('hydro');

it('handles GeneratorFunctions', function (done) {
  var hydro = Hydro();

  hydro.addSuite('test suite', function() {
    hydro.addTest('generator', function *() {
      assert.equal(yield later(42), 42);
    });
  });

  hydro.run(function() {
    assert.equal(hydro.tests()[0].status, 'passed');
    done();
  });
});

it('catches errors in GeneratorFunctions', function (done) {
  var hydro = Hydro();

  hydro.addSuite('test suite', function() {
    hydro.addTest('sync', function *() {
      throw new Error('boom');
    });
    hydro.addTest('async', function *() {
      yield later(new Error('boom'));
    });
  });

  hydro.run(function() {
    assert.equal(hydro.tests()[0].status, 'failed');
    assert.equal(hydro.tests()[1].status, 'failed');
    done();
  });
});

function later(val) {
  return function (fn) {
    setTimeout(function() {
      if (val instanceof Error) fn(val);
      else fn(null, val);
    }, 42);
  };
}
