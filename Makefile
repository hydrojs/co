all: clean install test

test:
	@node_modules/.bin/hydro

test-ci: test

clean:
	@rm -rf node_modules

install: node_modules

node_modules:
	@npm install

.PHONY: test test-ci clean
