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

---

## Usage

Just import the module and you'll benefit from an augmented, and typed, `BigInt` class!

```typescript
import "ethers-maths";

const WAD = BigInt.pow10(18);

BigInt.from(1).wadMul(WAD); // 1
BigInt.from(WAD.mul(2)).rayMul(0.5e27); // WAD
```

---

## Book

- [Scale-agnostic utilities](#scale-agnostic-utilities)
  - [min](#min)
  - [max](#max)
  - [sum](#sum)
  - [format](#format)
  - [toFloat](#toFloat)
  - [pow10](#pow10)
- [Scale constants](#scale-constants)
  - [WAD](#WAD)
  - [RAY](#RAY)
  - [PERCENT](#PERCENT)
  - [HALF_WAD](#HALF_WAD)
  - [HALF_RAY](#HALF_RAY)
  - [HALF_PERCENT](#HALF_PERCENT)
- [Wad-based utilities](#wad-based-utilities)
  - [wadMul](#wadMul)
  - [wadDiv](#wadDiv)
  - [wadAdd](#wadAdd)
  - [wadSub](#wadSub)
  - [wadAvg](#wadAvg)
  - [wadPow](#wadPow)
  - [wadMulUp](#wadMulUp)
  - [wadMulDown](#wadMulDown)
  - [wadDivUp](#wadDivUp)
  - [wadDivDown](#wadDivDown)
  - [formatWad](#formatWad)
  - [toWadFloat](#toWadFloat)
  - [wadToPercent](#wadToPercent)
  - [wadToRay](#wadToRay)
  - [wadToDecimals](#wadToDecimals)
- [Ray-based utilities](#ray-based-utilities)
  - [rayMul](#rayMul)
  - [rayDiv](#rayDiv)
  - [rayAdd](#rayAdd)
  - [raySub](#raySub)
  - [rayAvg](#rayAvg)
  - [rayPow](#rayPow)
  - [rayMulUp](#rayMulUp)
  - [rayMulDown](#rayMulDown)
  - [rayDivUp](#rayDivUp)
  - [rayDivDown](#rayDivDown)
  - [formatRay](#formatRay)
  - [toRayFloat](#toRayFloat)
  - [rayToPercent](#rayToPercent)
  - [rayToWad](#rayToWad)
  - [rayToDecimals](#rayToDecimals)
- [Percent-based utilities](#percent-based-utilities)
  - [percentMul](#percentMul)
  - [percentDiv](#percentDiv)
  - [percentAdd](#percentAdd)
  - [percentSub](#percentSub)
  - [percentAvg](#percentAvg)
  - [percentPow](#percentPow)
  - [percentMulUp](#percentMulUp)
  - [percentMulDown](#percentMulDown)
  - [percentDivUp](#percentDivUp)
  - [percentDivDown](#percentDivDown)
  - [formatPercent](#formatPercent)
  - [toPercentFloat](#toPercentFloat)
  - [percentToWad](#percentToWad)
  - [percentToRay](#percentToRay)
  - [percentToDecimals](#percentToDecimals)

---

### Scale-agnostic utilities

#### `min`

Returns the minimum between input BigNumberish, as a BigInt

```typescript
// only if you want to avoid BigInt prototype pollution
import { min } from "ethers-maths/utils";

// Returns the minimum between input BigNumberish, as a BigInt: 0
min(0, 1, "2", ...);
BigInt.min(0, 1, "2", ...);
BigInt.from(0).min(1, "2", ...);
```

#### `max`

Returns the maximum between input BigNumberish, as a BigInt

```typescript
// only if you want to avoid BigInt prototype pollution
import { max } from "ethers-maths/utils";

// Returns the maximum between input BigNumberish, as a BigInt: 2
max(0, 1, "2", ...);
BigInt.max(0, 1, "2", ...);
BigInt.from(0).max(1, "2", ...);
```

#### `sum`

Returns the sum of input BigNumberish array, as a BigInt

```typescript
// only if you want to avoid BigInt prototype pollution
import { sum } from "ethers-maths/utils";

// Returns the sum of input BigNumberish array, as a BigInt: 3
sum([0, 1, "2"]);
BigInt.sum([0, 1, "2"]);
BigInt.from(0).sum([1, "2"]);
```

#### `format`

Returns a string representation of the BigInt's value, formatted according to:

- the input number of decimals the BigInt value holds (default: 0)
- the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
// Returns a string representation of the BigInt's value: 0.01
BigInt.from(19).format(3, 2);
```

#### `toFloat`

Returns a float representation of the BigInt's value, parsed according to the input number of decimals the BigInt value holds (default: 0)

Note: parsing a too large value may result in parsing `NaN` (because the BigInt's value may still be too large to fit in a JS floating-point number)

```typescript
// Returns a string representation of the BigInt's value: 0.01
BigInt.from(19).toFloat(3, 2);
```

#### `pow10`

Returns a 1 followed by the input number of zeros (10 raised to the power of the input)

```typescript
// only if you want to avoid BigInt prototype pollution
import { pow10 } from "ethers-maths/utils";

// Returns a 1 followed by the input number of zeros: 100
pow10(2);
BigInt.pow10(2);
```

---

### Scale constants

#### `WAD`

Returns the common WAD unit, which is also known as `ether` in Solidity

_Most commonly used as the ERC20 token unit_

```typescript
// only if you want to avoid BigInt prototype pollution
import { WAD } from "ethers-maths/constants";

// Returns a 1 followed by 18 zeros: 1000000000000000000
WAD;
BigInt.WAD;
```

#### `RAY`

Returns the common RAY unit, which is also known as `1e9 ether` in Solidity

_Most commonly used as Aave's index unit_

```typescript
// only if you want to avoid BigInt prototype pollution
import { RAY } from "ethers-maths/constants";

// Returns a 1 followed by 27 zeros: 1000000000000000000000000000
RAY;
BigInt.RAY;
```

#### `PERCENT`

Returns the common PERCENT unit, which is also known as `100%` in basis points

_Most commonly used as Aave's `PERCENTAGE_FACTOR`_

```typescript
// only if you want to avoid BigInt prototype pollution
import { PERCENT } from "ethers-maths/constants";

// Returns a 1 followed by 4 zeros: 10000
PERCENT;
BigInt.PERCENT;
```

#### `HALF_WAD`

Returns half of the common WAD unit, which is also known as `0.5 ether` in Solidity

```typescript
// only if you want to avoid BigInt prototype pollution
import { HALF_WAD } from "ethers-maths/constants";

// Returns a 1 followed by 18 zeros: 1000000000000000000
HALF_WAD;
BigInt.HALF_WAD;
```

#### `HALF_RAY`

Returns half of the common RAY unit, which is also known as `0.5e9 ether` in Solidity

```typescript
// only if you want to avoid BigInt prototype pollution
import { HALF_RAY } from "ethers-maths/constants";

// Returns a 1 followed by 27 zeros: 1000000000000000000000000000
HALF_RAY;
BigInt.HALF_RAY;
```

#### `HALF_PERCENT`

Returns the common PERCENT unit, which is also known as `50%` in basis points

_Most commonly used as Aave's `HALF_PERCENTAGE_FACTOR`_

```typescript
// only if you want to avoid BigInt prototype pollution
import { HALF_PERCENT } from "ethers-maths/constants";

// Returns a 1 followed by 4 zeros: 10000
HALF_PERCENT;
BigInt.HALF_PERCENT;
```

---

### Wad-based utilities

#### `wadMul`

Returns the result of the wad-based multiplication (18 decimals precision), rounded half up

```typescript
BigInt.WAD.wadMul(BigInt.WAD); // 1.0 * 1.0 = 1.0 (in wad)
```

#### `wadDiv`

Returns the result of the wad-based division (18 decimals precision), rounded half up

```typescript
BigInt.WAD.wadDiv(BigInt.WAD); // 1.0 / 1.0 = 1.0 (in wad)
```

#### `wadAdd`

Returns the result of the addition of a BigNumberish and a wad-based percentage of it (18 decimals), rounded half up

```typescript
BigInt.WAD.wadAdd(
  BigInt.HALF_WAD // 50% in wad
); // 1.0 * (1.0 + 0.5) = 1.5 (in wad)
```

#### `wadSub`

Returns the result of the subtraction of a BigNumberish and a wad-based percentage of it (18 decimals), rounded half up

```typescript
BigInt.WAD.wadSub(
  BigInt.HALF_WAD // 50% in wad
); // 1.0 * (1.0 - 0.5) = 0.5 (in wad)
```

#### `wadAvg`

Returns the weighted average of 2 BigNumberishs, using a wad-based weight (18 decimals), rounded half up

```typescript
BigInt.WAD.wadAvg(
  BigInt.WAD.mul(2), // 2 WAD
  BigInt.HALF_WAD // 50% in WAD
); // 1.0 * (1.0 - 0.5) + 2.0 * 0.5 = 1.5 (in wad)
```

#### `wadPow`

Returns the integer power of a BigInt, calculated using wad-based multiplications (18 decimals precision), rounded half up

```typescript
BigInt.WAD.mul(2) // 2 WAD
  .wadPow(2); // 2.0 ** 2 = 4.0 (in wad)
```

#### `wadMulUp`

Returns the result of the wad-based multiplication (18 decimals precision), rounded up

```typescript
BigInt.WAD.sub(1).wadMulUp(BigInt.WAD.sub(1)); // 0.999999999999999999 * 0.999999999999999999 = 0.999999999999999999 (in wad, rounded up)
```

#### `wadMulDown`

Returns the result of the wad-based multiplication (18 decimals precision), rounded down

```typescript
BigInt.WAD.sub(1).wadMulDown(BigInt.WAD.sub(1)); // 0.999999999999999999 * 0.999999999999999999 = 0.999999999999999998 (in wad, rounded down)
```

#### `wadDivUp`

Returns the result of the wad-based division (18 decimals precision), rounded up

```typescript
BigInt.WAD.wadDivUp(BigInt.WAD.sub(1)); // 1.0 * 0.999999999999999999 = 1.000000000000000002 (in wad, rounded up)
```

#### `wadDivDown`

Returns the result of the wad-based division (18 decimals precision), rounded down

```typescript
BigInt.WAD.wadDivDown(BigInt.WAD.sub(1)); // 1.0 * 0.999999999999999999 = 1.000000000000000001 (in wad, rounded down)
```

#### `formatWad`

Returns a string representation of the BigInt's value, formatted to 18 decimals and with the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
BigInt.WAD.formatWad(3); // 1.000
```

#### `toWadFloat`

Returns a float representation of the BigInt's value, parsed as a wad-based number.

Note: parsing a too large value may result in parsing `NaN` (because the BigInt's value may still be too large to fit in a JS floating-point number)

```typescript
BigInt.WAD.toWadFloat(); // 1.0
```

#### `wadToPercent`

Scales the wad-based BigInt down to the percent scale (losing 14 decimals)

```typescript
BigInt.WAD.wadToPercent(); // 1 PERCENT
```

#### `wadToRay`

Scales the wad-based BigInt up to the ray scale (adding 9 decimals)

```typescript
BigInt.WAD.wadToRay(); // 1 RAY
```

#### `wadToDecimals`

Scales the wad-based BigInt up or down to the given scale defined by its number of decimals

```typescript
BigInt.WAD.wadToDecimals(27); // 1 RAY
```

---

### Ray-based utilities

#### `rayMul`

Returns the result of the ray-based multiplication (27 decimals precision), rounded half up

```typescript
BigInt.RAY.rayMul(BigInt.RAY); // 1.0 * 1.0 = 1.0 (in ray)
```

#### `rayDiv`

Returns the result of the ray-based division (27 decimals precision), rounded half up

```typescript
BigInt.RAY.rayDiv(BigInt.RAY); // 1.0 / 1.0 = 1.0 (in ray)
```

#### `rayAdd`

Returns the result of the addition of a BigNumberish and a ray-based percentage of it (27 decimals), rounded half up

```typescript
BigInt.RAY.rayAdd(
  BigInt.HALF_RAY // 50% in ray
); // 1.0 * (1.0 + 0.5) = 1.5 (in ray)
```

#### `raySub`

Returns the result of the subtraction of a BigNumberish and a ray-based percentage of it (27 decimals), rounded half up

```typescript
BigInt.RAY.raySub(
  BigInt.HALF_RAY // 50% in ray
); // 1.0 * (1.0 - 0.5) = 0.5 (in ray)
```

#### `rayAvg`

Returns the weighted average of 2 BigNumberishs, using a ray-based weight (27 decimals), rounded half up

```typescript
BigInt.RAY.rayAvg(
  BigInt.RAY.mul(2), // 2 RAY
  BigInt.HALF_RAY // 50% in RAY
); // 1.0 * (1.0 - 0.5) + 2.0 * 0.5 = 1.5 (in ray)
```

#### `rayPow`

Returns the integer power of a BigInt, calculated using ray-based multiplications (27 decimals precision), rounded half up

```typescript
BigInt.RAY.mul(2) // 2 RAY
  .rayPow(2); // 2.0 ** 2 = 4.0 (in ray)
```

#### `rayMulUp`

Returns the result of the ray-based multiplication (27 decimals precision), rounded up

```typescript
BigInt.RAY.sub(1).rayMulUp(BigInt.RAY.sub(1)); // 0.999999999999999999999999999 * 0.999999999999999999999999999 = 0.999999999999999999999999999 (in ray, rounded up)
```

#### `rayMulDown`

Returns the result of the ray-based multiplication (27 decimals precision), rounded down

```typescript
BigInt.RAY.sub(1).rayMulDown(BigInt.RAY.sub(1)); // 0.999999999999999999999999999 * 0.999999999999999999999999999 = 0.999999999999999999999999998 (in ray, rounded down)
```

#### `rayDivUp`

Returns the result of the ray-based division (27 decimals precision), rounded up

```typescript
BigInt.RAY.rayDivUp(BigInt.RAY.sub(1)); // 1.0 * 0.999999999999999999999999999 = 1.000000000000000000000000002 (in ray, rounded up)
```

#### `rayDivDown`

Returns the result of the ray-based division (27 decimals precision), rounded down

```typescript
BigInt.RAY.rayDivDown(BigInt.RAY.sub(1)); // 1.0 * 0.999999999999999999999999999 = 1.000000000000000000000000001 (in ray, rounded down)
```

#### `formatRay`

Returns a string representation of the BigInt's value, formatted to 27 decimals and with the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
BigInt.RAY.formatRay(3); // 1.000
```

#### `toRayFloat`

Returns a float representation of the BigInt's value, parsed as a ray-based number.

Note: parsing a too large value may result in parsing `NaN` (because the BigInt's value may still be too large to fit in a JS floating-point number)

```typescript
BigInt.RAY.toRayFloat(); // 1.0
```

#### `rayToPercent`

Scales the ray-based BigInt down to the percent scale (losing 23 decimals)

```typescript
BigInt.RAY.rayToPercent(); // 1 PERCENT
```

#### `rayToWad`

Scales the ray-based BigInt down to the wad scale (losing 9 decimals)

```typescript
BigInt.RAY.rayToWad(); // 1 WAD
```

#### `rayToDecimals`

Scales the ray-based BigInt up or down to the given scale defined by its number of decimals

```typescript
BigInt.RAY.rayToDecimals(18); // 1 WAD
```

---

### Percent-based utilities

#### `percentMul`

Returns the result of the percent-based multiplication (4 decimals precision), rounded half up

```typescript
BigInt.PERCENT.percentMul(BigInt.PERCENT); // 1.0 * 1.0 = 1.0 (in percent)
```

#### `percentDiv`

Returns the result of the percent-based division (4 decimals precision), rounded half up

```typescript
BigInt.PERCENT.percentDiv(BigInt.PERCENT); // 1.0 / 1.0 = 1.0 (in percent)
```

#### `percentAdd`

Returns the result of the addition of a BigNumberish and a percent-based percentage of it (4 decimals), rounded half up

```typescript
BigInt.PERCENT.percentAdd(
  BigInt.HALF_PERCENT // 50% in percent
); // 1.0 * (1.0 + 0.5) = 1.5 (in percent)
```

#### `percentSub`

Returns the result of the subtraction of a BigNumberish and a percent-based percentage of it (4 decimals), rounded half up

```typescript
BigInt.PERCENT.percentSub(
  BigInt.HALF_PERCENT // 50% in percent
); // 1.0 * (1.0 - 0.5) = 0.5 (in percent)
```

#### `percentAvg`

Returns the weighted average of 2 BigNumberishs, using a percent-based weight (4 decimals), rounded half up

```typescript
BigInt.PERCENT.percentAvg(
  BigInt.PERCENT.mul(2), // 2 PERCENT
  BigInt.HALF_PERCENT // 50% in PERCENT
); // 1.0 * (1.0 - 0.5) + 2.0 * 0.5 = 1.5 (in percent)
```

#### `percentPow`

Returns the integer power of a BigInt, calculated using percent-based multiplications (4 decimals precision), rounded half up

```typescript
BigInt.PERCENT.mul(2) // 2 PERCENT
  .percentPow(2); // 2.0 ** 2 = 4.0 (in percent)
```

#### `percentMulUp`

Returns the result of the percent-based multiplication (4 decimals precision), rounded up

```typescript
BigInt.PERCENT.sub(1).percentMulUp(BigInt.PERCENT.sub(1)); // 0.9999 * 0.9999 = 0.9999 (in percent, rounded up)
```

#### `percentMulDown`

Returns the result of the percent-based multiplication (4 decimals precision), rounded down

```typescript
BigInt.PERCENT.sub(1).percentMulDown(BigInt.PERCENT.sub(1)); // 0.9999 * 0.9999 = 0.9998 (in percent, rounded down)
```

#### `percentDivUp`

Returns the result of the percent-based division (4 decimals precision), rounded up

```typescript
BigInt.PERCENT.percentDivUp(BigInt.PERCENT.sub(1)); // 1.0 * 0.9999 = 1.0002 (in percent, rounded up)
```

#### `percentDivDown`

Returns the result of the percent-based division (4 decimals precision), rounded down

```typescript
BigInt.PERCENT.percentDivDown(BigInt.PERCENT.sub(1)); // 1.0 * 0.9999 = 1.0001 (in percent, rounded down)
```

#### `formatPercent`

Returns a string representation of the BigInt's value, formatted to 4 decimals and with the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
BigInt.PERCENT.formatPercent(3); // 1.000
```

#### `toPercentFloat`

Returns a float representation of the BigInt's value, parsed as a percent-based number.

Note: parsing a too large value may result in parsing `NaN` (because the BigInt's value may still be too large to fit in a JS floating-point number)

```typescript
BigInt.PERCENT.toPercentFloat(); // 1.0
```

#### `percentToWad`

Scales the percent-based BigInt up to the wad scale (adding 14 decimals)

```typescript
BigInt.PERCENT.percentToWad(); // 1 WAD
```

#### `percentToRay`

Scales the percent-based BigInt up to the ray scale (adding 23 decimals)

```typescript
BigInt.PERCENT.percentToRay(); // 1 RAY
```

#### `percentToDecimals`

Scales the percent-based BigInt up or down to the given scale defined by its number of decimals

```typescript
BigInt.RAY.percentToDecimals(27); // 1 RAY
```

[build-img]: https://github.com/Rubilmax/ethers-maths/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/Rubilmax/ethers-maths/actions/workflows/release.yml
[test-img]: https://github.com/Rubilmax/ethers-maths/actions/workflows/test.yml/badge.svg
[test-url]: https://github.com/Rubilmax/ethers-maths/actions/workflows/test.yml
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
