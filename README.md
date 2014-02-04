[![NPM
version](https://badge.fury.io/js/hydro-co.png)](http://badge.fury.io/js/hydro-co)
[![Build Status](https://secure.travis-ci.org/hydrojs/hydro-co.png)](http://travis-ci.org/hydrojs/hydro-co)

# hydro-co

co integration for Hydro

## Usage

```js
it('works!', function *() {
  yield sleep(500);
  yield otherStuff();
  yield User.create({ name: 'Bob' });
});
```

## Installation

```bash
npm install hydro-co
```

## Tests

```bash
$ make test
```

## License

MIT License
