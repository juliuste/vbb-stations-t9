# vbb-stations-t9

T9 search (search via telephone keyboard) for [VBB](https://www.vbb.de) public transport stations.

[![npm version](https://img.shields.io/npm/v/vbb-stations-t9.svg)](https://www.npmjs.com/package/vbb-stations-t9)
[![Build status](https://travis-ci.org/juliuste/vbb-stations-t9.svg?branch=master)](https://travis-ci.org/juliuste/vbb-stations-t9)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/vbb-stations-t9.svg)](https://greenkeeper.io/)
[![License](https://img.shields.io/github/license/juliuste/vbb-stations-t9.svg?style=flat)](license)

## Installation

```bash
npm install vbb-stations-t9
```

## Usage

The module uses the `language-independent/latin` keypad from the [`telephone-keypads`](github.com/juliuste/telephone-keypads) module to match numbers with text and additionaly replaces spaces with `0`.

```js
// subset of the used keyboard (there are actually more than just
// 3 letters associated with the number 2, e.g. 'ä' or 'á')
// -------------------------
// |       |  ABC  |  DEF  |
// |   1   |   2   |   3   |
// -------------------------
// |  GHI  |  JKL  |  MNO  |
// |   4   |   5   |   6   |
// -------------------------
// | PQRS  |  TUV  | WXYZ  |
// |   7   |   8   |   9   |
// -------------------------
// |       |       |       |
// |   *   |   0   |   #   |
```

```js
const search = require('vbb-stations-t9')

search('966') // "zoo" -> top result is "zoologischer garten"
search('725707849') // "pakr ruhw" (sic!) -> top result is "park ruhwald"
```

## Acknowledgements

This module uses a lot of logic originally written by **[@derhuerst](https://github.com/derhuerst)** for his *[vbb-stations-autocomplete](https://github.com/derhuerst/vbb-stations-autocomplete)* package.

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/vbb-stations-t9/issues).
