# array-group-by-ponyfill

[![Build Status][ci-img]][ci]
[![Browser testing by BrowserStack][browserstack-img]][browserstack]

[`Array.prototype.groupBy`](https://github.com/tc39/proposal-array-grouping)
[ponyfill](https://ponyfill.com).

> A proposal to make grouping of items in an array easier.

## Install

```sh
npm install array-group-by-ponyfill --save
```

## Usage

```js
import groupBy from 'array-group-by-ponyfill';

groupBy([1, 2, 3, 4, 5], (value) => (value % 2 === 0 ? 'even' : 'odd'));

// { odd: [1, 3, 5], even: [2, 4] }
```

You can **use named export `preferNative` if you wish to use native
implementation if it’s available**. In all other cases, ponyfill will be used.
Beware of
[caveats](https://github.com/sindresorhus/ponyfill#user-content-ponyfill:~:text=Ponyfills%20should%20never%20use%20the%20native,between%20environments%2C%20which%20can%20cause%20bugs.)!

## API

### groupBy(array, callback)

Returns: `object`

Group array items.

#### array

Type: `any[]`

Array to group.

#### callback

Type: `Function`

Callback which should return key with which to group array.

| Argument | Type     | Description               |
| -------- | -------- | ------------------------- |
| `value`  | `any`    | Current iteration value.  |
| `index`  | `number` | Current iteration index.  |
| `array`  | `any[]`  | Original array reference. |

## Browser support

Tested in Chrome 72, Edge 15, Firefox 65 and should work in all modern browsers
([support based on Browserslist configuration](https://browserslist.dev/?q=bGFzdCAzIG1ham9yIHZlcnNpb25zLCBzaW5jZSAyMDE5LCBlZGdlID49IDE1LCBub3QgaWUgPiAw)).

## Test

Test suite is taken and modified from
[core-js](https://github.com/zloirock/core-js/blob/master/tests/tests/esnext.array.group-by.js)
test suite.

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://github.com/niksy/array-group-by-ponyfill/actions?query=workflow%3ACI
[ci-img]: https://github.com/niksy/array-group-by-ponyfill/workflows/CI/badge.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://img.shields.io/badge/browser%20testing-BrowserStack-informational?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiAgPGRlZnMvPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjIwLjk0Mjk3NiIgY3k9IjI4LjA5NDY3ODczIiByPSIzLjc5MTM0MTQxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3OTc5NzkiLz4KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzRjNGM0YyIvPgogIDwvcmFkaWFsR3JhZGllbnQ+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI5LjcyOTIwNCAtNTcuMTg3NjExKSBzY2FsZSgyLjk3MjkyKSI+CiAgICA8Y2lyY2xlIGN4PSIyMC43ODkiIGN5PSIzMC4wMjUiIHI9IjEwLjczOSIgZmlsbD0iI2Y0Yjk2MCIvPgogICAgPGNpcmNsZSBjeD0iMTkuNyIgY3k9IjI4LjkzNiIgcj0iOS43IiBmaWxsPSIjZTY2ZjMyIi8+CiAgICA8Y2lyY2xlIGN4PSIyMS4wMzYiIGN5PSIyNy42OTkiIHI9IjguNDEzIiBmaWxsPSIjZTQzYzQxIi8+CiAgICA8Y2lyY2xlIGN4PSIyMS42NzkiIGN5PSIyOC4zNDIiIHI9IjcuNzIiIGZpbGw9IiNiZGQwNDEiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjEzNSIgY3k9IjI4LjkzNiIgcj0iNy4xNzYiIGZpbGw9IiM2ZGI1NGMiLz4KICAgIDxjaXJjbGUgY3g9IjE5Ljk5NyIgY3k9IjI3Ljc0OCIgcj0iNS45ODgiIGZpbGw9IiNhZWRhZTYiLz4KICAgIDxjaXJjbGUgY3g9IjIwLjkzNyIgY3k9IjI2Ljc1OCIgcj0iNS4wNDgiIGZpbGw9IiM1NmI4ZGUiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjU4IiBjeT0iMjcuNDUxIiByPSI0LjQwNSIgZmlsbD0iIzAwYjFkNSIvPgogICAgPGNpcmNsZSBjeD0iMjAuOTM3IiBjeT0iMjguMDQ1IiByPSIzLjc2MSIgZmlsbD0idXJsKCNhKSIvPgogICAgPGNpcmNsZSBjeD0iMjAuOTM3IiBjeT0iMjguMDQ1IiByPSIzLjc2MSIgZmlsbD0iIzIyMWYxZiIvPgogICAgPGVsbGlwc2UgY3g9Ii0xNS4xNTkiIGN5PSIzMS40MDEiIGZpbGw9IiNmZmYiIHJ4PSIxLjE4OCIgcnk9Ii43NDIiIHRyYW5zZm9ybT0icm90YXRlKC02NS44MzQpIi8+CiAgPC9nPgo8L3N2Zz4K

<!-- prettier-ignore-end -->
