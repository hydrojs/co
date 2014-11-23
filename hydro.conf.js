/**
 * Test config.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'hydro-co',
    plugins: [ 'hydro-bdd' ],
    formatter: 'hydro-simple',
    tests: [ 'test/*.js' ]
  });
};
