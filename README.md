# ethers-maths

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Test Status][test-img]][test-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> ➗ Useful ethers-based math libraries to ease the journey through off-chain fixed-point arithmetics

## Install

```bash
npm install ethers-maths
```

```bash
yarn add ethers-maths
```

## Usage

```typescript
import "ethers-maths";

const WAD = BigNumber.pow10(18);

BigNumber.from(1).wadMul(WAD); // 1
BigNumber.from(WAD.mul(2)).rayMul(0.5e27); // WAD
```

[build-img]: https://github.com/Rubilmax/ethers-maths/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/Rubilmax/ethers-maths/actions/workflows/release.yml
[test-img]: https://github.com/Rubilmax/ethers-maths/actions/workflows/jest.yml/badge.svg
[test-url]: https://github.com/Rubilmax/ethers-maths/actions/workflows/jest.yml
[downloads-img]: https://img.shields.io/npm/dt/ethers-maths
[downloads-url]: https://www.npmtrends.com/ethers-maths
[npm-img]: https://img.shields.io/npm/v/ethers-maths
[npm-url]: https://www.npmjs.com/package/ethers-maths
[issues-img]: https://img.shields.io/github/issues/Rubilmax/ethers-maths
[issues-url]: https://github.com/Rubilmax/ethers-maths/issues
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
