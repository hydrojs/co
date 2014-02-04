var assert = require('assert');
var Hydro = require('hydro');

describe('hydro-co', function() {
  it('handles GeneratorFunctions', function (done) {
    var hydro = Hydro();

    hydro.addSuite('test suite', function() {
      hydro.addTest('generator', function *() {
        var res = yield later();
        assert.equal(res, 42);
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
      hydro.addTest('generator', function *() {
        yield invalidFunction();
      });
    });

    hydro.run(function() {
      assert.equal(hydro.tests()[0].status, 'failed');
      done();
    });
  });
});

function later() {
  return function (fn) {
    setTimeout(function() {
      fn(null, 42);
    }, 42);
  };
}
