var assert = require('assert');
var Hydro = require('hydro');
var plugin = require('..');

var hydro
before(function(){
  hydro = new Hydro
  plugin(hydro)
})

it('handles GeneratorFunctions', function (done) {
  hydro.interface.addTest('generator', function *() {
    assert.equal(yield later(42), 42);
  });

  hydro.run(function() {
    assert.equal(hydro.tests()[0].status, 'passed');
    done();
  });
});

it('catches errors in GeneratorFunctions', function (done) {
  hydro.interface.addSuite('test suite', function() {
    hydro.interface.addTest('sync', function *() {
      throw new Error('boom');
    });
    hydro.interface.addTest('async', function *() {
      yield later(new Error('boom'));
    });
  });

  hydro.run(function() {
    assert.equal(hydro.tests()[0].status, 'failed');
    assert.equal(hydro.tests()[1].status, 'failed');
    done();
  });
});

it('handles hooks', function (done) {
  hydro.interface.before(function *() {
    yield later(new Error('boom'));
  });

  hydro.interface.addTest('empty', function() {});

  hydro.run(function(e) {
    assert(e && e.message == 'boom');
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
