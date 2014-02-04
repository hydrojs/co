/**
 * Test config.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  var plugin = require('./index');

  hydro.set({
    suite: 'hydro-co',
    plugins: [ plugin, 'hydro-bdd' ],
    formatter: 'hydro-simple',
    tests: [ 'test/*.js' ]
  });
};
