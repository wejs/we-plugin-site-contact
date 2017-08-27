# we-plugin-site-contact

We.js site contact plugin for add the /sitecontact page and one contact widget

## Features

- Contact form iframe
- Contact email

### How to test

after clone and install npm packages:

```sh
npm test
```

##### For run only 'Contact' test use:

```sh
NODE_ENV=test LOG_LV=info ./node_modules/.bin/mocha test/bootstrap.js test/**/*.test.js -g 'contact'
```

##### For run the javascript linter

```sh
npm run lint
```

#### NPM Info:
[![NPM](https://nodei.co/npm/we-plugin-site-contact.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/we-plugin-site-contact/)

## Copyright and license

Copyright Alberto Souza <contact@albertosouza.net> and contributors , under [the MIT license](LICENSE).
