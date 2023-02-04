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

Just import the module and you'll benefit from an augmented, and typed, `BigNumber` class!

```typescript
import "ethers-maths";

const WAD = BigNumber.pow10(18);

BigNumber.from(1).wadMul(WAD); // 1
BigNumber.from(WAD.mul(2)).rayMul(0.5e27); // WAD
```

---

## Book

- [Scale-agnostic utilities](#scale-agnostic-utilities)
- [Scale constants](#scale-constants)
- [Wad-based utilities](#wad-based-utilities)
- [Ray-based utilities](#ray-based-utilities)
- [Percent-based utilities](#percent-based-utilities)

### Scale-agnostic utilities

#### `min`

Returns the minimum between input BigNumberish, as a BigNumber

```typescript
// only if you want to avoid BigNumber prototype pollution
import { min } from "ethers-maths/utils";

// Returns the minimum between input BigNumberish, as a BigNumber: 0
min(0, 1, "2", ...);
BigNumber.min(0, 1, "2", ...);
BigNumber.from(0).min(1, "2", ...);
```

#### `max`

Returns the maximum between input BigNumberish, as a BigNumber

```typescript
// only if you want to avoid BigNumber prototype pollution
import { max } from "ethers-maths/utils";

// Returns the maximum between input BigNumberish, as a BigNumber: 2
max(0, 1, "2", ...);
BigNumber.max(0, 1, "2", ...);
BigNumber.from(0).max(1, "2", ...);
```

#### `sum`

Returns the sum of input BigNumberish array, as a BigNumber

```typescript
// only if you want to avoid BigNumber prototype pollution
import { sum } from "ethers-maths/utils";

// Returns the sum of input BigNumberish array, as a BigNumber: 3
sum([0, 1, "2"]);
BigNumber.sum([0, 1, "2"]);
BigNumber.from(0).sum([1, "2"]);
```

#### `format`

Returns a string representation of the BigNumber's value, formatted according to:

- the input number of decimals the BigNumber value holds (default: 0)
- the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
// Returns a string representation of the BigNumber's value: 0.01
BigNumber.from(19).format(3, 2);
```

#### `toFloat`

Returns a float representation of the BigNumber's value, parsed according to the input number of decimals the BigNumber value holds (default: 0)

Note: parsing a too large value may result in parsing `NaN` (because the BigNumber's value may still be too large to fit in a JS floating-point number)

```typescript
// Returns a string representation of the BigNumber's value: 0.01
BigNumber.from(19).toFloat(3, 2);
```

#### `pow10`

Returns a 1 followed by the input number of zeros (10 raised to the power of the input)

```typescript
// only if you want to avoid BigNumber prototype pollution
import { pow10 } from "ethers-maths/utils";

// Returns a 1 followed by the input number of zeros: 100
pow10(2);
BigNumber.pow10(2);
```

### Scale constants

#### `WAD`

Returns the common WAD unit, which is also known as `ether` in Solidity

_Most commonly used as the ERC20 token unit_

```typescript
// only if you want to avoid BigNumber prototype pollution
import { WAD } from "ethers-maths/constants";

// Returns a 1 followed by 18 zeros: 1000000000000000000
WAD;
BigNumber.WAD;
```

#### `RAY`

Returns the common RAY unit, which is also known as `1e9 ether` in Solidity

_Most commonly used as Aave's index unit_

```typescript
// only if you want to avoid BigNumber prototype pollution
import { RAY } from "ethers-maths/constants";

// Returns a 1 followed by 27 zeros: 1000000000000000000000000000
RAY;
BigNumber.RAY;
```

#### `PERCENT`

Returns the common PERCENT unit, which is also known as `100%` in basis points

_Most commonly used as Aave's `PERCENTAGE_FACTOR`_

```typescript
// only if you want to avoid BigNumber prototype pollution
import { PERCENT } from "ethers-maths/constants";

// Returns a 1 followed by 4 zeros: 10000
PERCENT;
BigNumber.PERCENT;
```

#### `HALF_WAD`

Returns half of the common WAD unit, which is also known as `0.5 ether` in Solidity

```typescript
// only if you want to avoid BigNumber prototype pollution
import { HALF_WAD } from "ethers-maths/constants";

// Returns a 1 followed by 18 zeros: 1000000000000000000
HALF_WAD;
BigNumber.HALF_WAD;
```

#### `HALF_RAY`

Returns half of the common RAY unit, which is also known as `0.5e9 ether` in Solidity

```typescript
// only if you want to avoid BigNumber prototype pollution
import { HALF_RAY } from "ethers-maths/constants";

// Returns a 1 followed by 27 zeros: 1000000000000000000000000000
HALF_RAY;
BigNumber.HALF_RAY;
```

#### `HALF_PERCENT`

Returns the common PERCENT unit, which is also known as `50%` in basis points

_Most commonly used as Aave's `HALF_PERCENTAGE_FACTOR`_

```typescript
// only if you want to avoid BigNumber prototype pollution
import { HALF_PERCENT } from "ethers-maths/constants";

// Returns a 1 followed by 4 zeros: 10000
HALF_PERCENT;
BigNumber.HALF_PERCENT;
```

### Wad-based utilities

#### `wadMul`

Returns the result of the wad-based multiplication (18 decimals precision), rounded half up

```typescript
BigNumber.WAD.wadMul(BigNumber.WAD); // 1.0 * 1.0 = 1.0 (in wad)
```

#### `wadDiv`

Returns the result of the wad-based division (18 decimals precision), rounded half up

```typescript
BigNumber.WAD.wadDiv(BigNumber.WAD); // 1.0 / 1.0 = 1.0 (in wad)
```

#### `wadAdd`

Returns the result of the addition of a BigNumberish and a wad-based percentage of it (18 decimals), rounded half up

```typescript
BigNumber.WAD.wadAdd(
  BigNumber.HALF_WAD // 50% in wad
); // 1.0 * (1.0 + 0.5) = 1.5 (in wad)
```

#### `wadSub`

Returns the result of the subtraction of a BigNumberish and a wad-based percentage of it (18 decimals), rounded half up

```typescript
BigNumber.WAD.wadSub(
  BigNumber.HALF_WAD // 50% in wad
); // 1.0 * (1.0 - 0.5) = 0.5 (in wad)
```

#### `wadAvg`

Returns the weighted average of 2 BigNumberishs, using a wad-based weight (18 decimals), rounded half up

```typescript
BigNumber.WAD.wadAvg(
  BigNumber.WAD.mul(2), // 2 WAD
  BigNumber.HALF_WAD // 50% in WAD
); // 1.0 * (1.0 - 0.5) + 2.0 * 0.5 = 1.5 (in wad)
```

#### `wadPow`

Returns the integer power of a BigNumber, calculated using wad-based multiplications (18 decimals precision), rounded half up

```typescript
BigNumber.WAD.mul(2) // 2 WAD
  .wadPow(2); // 2.0 ** 2 = 4.0 (in wad)
```

#### `wadMulUp`

Returns the result of the wad-based multiplication (18 decimals precision), rounded up

```typescript
BigNumber.WAD.sub(1).wadMulUp(BigNumber.WAD.sub(1)); // 0.999999999999999999 * 0.999999999999999999 = 0.999999999999999999 (in wad, rounded up)
```

#### `wadMulDown`

Returns the result of the wad-based multiplication (18 decimals precision), rounded down

```typescript
BigNumber.WAD.sub(1).wadMulDown(BigNumber.WAD.sub(1)); // 0.999999999999999999 * 0.999999999999999999 = 0.999999999999999998 (in wad, rounded down)
```

#### `wadDivUp`

Returns the result of the wad-based division (18 decimals precision), rounded up

```typescript
BigNumber.WAD.wadDivUp(BigNumber.WAD.sub(1)); // 1.0 * 0.999999999999999999 = 1.000000000000000002 (in wad, rounded up)
```

#### `wadDivDown`

Returns the result of the wad-based division (18 decimals precision), rounded down

```typescript
BigNumber.WAD.wadDivDown(BigNumber.WAD.sub(1)); // 1.0 * 0.999999999999999999 = 1.000000000000000001 (in wad, rounded down)
```

#### `formatWad`

Returns a string representation of the BigNumber's value, formatted to 18 decimals and with the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
BigNumber.WAD.formatWad(3); // 1.000
```

#### `toWadFloat`

Returns a float representation of the BigNumber's value, parsed as a wad-based number.

Note: parsing a too large value may result in parsing `NaN` (because the BigNumber's value may still be too large to fit in a JS floating-point number)

```typescript
BigNumber.WAD.toWadFloat(); // 1.0
```

#### `wadToPercent`

Scales the wad-based BigNumber down to the percent scale (losing 14 decimals)

```typescript
BigNumber.WAD.wadToPercent(); // 1 PERCENT
```

#### `wadToRay`

Scales the wad-based BigNumber up to the ray scale (adding 9 decimals)

```typescript
BigNumber.WAD.wadToRay(); // 1 RAY
```

### Ray-based utilities

#### `rayMul`

Returns the result of the ray-based multiplication (27 decimals precision), rounded half up

```typescript
BigNumber.RAY.rayMul(BigNumber.RAY); // 1.0 * 1.0 = 1.0 (in ray)
```

#### `rayDiv`

Returns the result of the ray-based division (27 decimals precision), rounded half up

```typescript
BigNumber.RAY.rayDiv(BigNumber.RAY); // 1.0 / 1.0 = 1.0 (in ray)
```

#### `rayAdd`

Returns the result of the addition of a BigNumberish and a ray-based percentage of it (27 decimals), rounded half up

```typescript
BigNumber.RAY.rayAdd(
  BigNumber.HALF_RAY // 50% in ray
); // 1.0 * (1.0 + 0.5) = 1.5 (in ray)
```

#### `raySub`

Returns the result of the subtraction of a BigNumberish and a ray-based percentage of it (27 decimals), rounded half up

```typescript
BigNumber.RAY.raySub(
  BigNumber.HALF_RAY // 50% in ray
); // 1.0 * (1.0 - 0.5) = 0.5 (in ray)
```

#### `rayAvg`

Returns the weighted average of 2 BigNumberishs, using a ray-based weight (27 decimals), rounded half up

```typescript
BigNumber.RAY.rayAvg(
  BigNumber.RAY.mul(2), // 2 RAY
  BigNumber.HALF_RAY // 50% in RAY
); // 1.0 * (1.0 - 0.5) + 2.0 * 0.5 = 1.5 (in ray)
```

#### `rayPow`

Returns the integer power of a BigNumber, calculated using ray-based multiplications (27 decimals precision), rounded half up

```typescript
BigNumber.RAY.mul(2) // 2 RAY
  .rayPow(2); // 2.0 ** 2 = 4.0 (in ray)
```

#### `rayMulUp`

Returns the result of the ray-based multiplication (27 decimals precision), rounded up

```typescript
BigNumber.RAY.sub(1).rayMulUp(BigNumber.RAY.sub(1)); // 0.999999999999999999999999999 * 0.999999999999999999999999999 = 0.999999999999999999999999999 (in ray, rounded up)
```

#### `rayMulDown`

Returns the result of the ray-based multiplication (27 decimals precision), rounded down

```typescript
BigNumber.RAY.sub(1).rayMulDown(BigNumber.RAY.sub(1)); // 0.999999999999999999999999999 * 0.999999999999999999999999999 = 0.999999999999999999999999998 (in ray, rounded down)
```

#### `rayDivUp`

Returns the result of the ray-based division (27 decimals precision), rounded up

```typescript
BigNumber.RAY.rayDivUp(BigNumber.RAY.sub(1)); // 1.0 * 0.999999999999999999999999999 = 1.000000000000000000000000002 (in ray, rounded up)
```

#### `rayDivDown`

Returns the result of the ray-based division (27 decimals precision), rounded down

```typescript
BigNumber.RAY.rayDivDown(BigNumber.RAY.sub(1)); // 1.0 * 0.999999999999999999999999999 = 1.000000000000000000000000001 (in ray, rounded down)
```

#### `formatRay`

Returns a string representation of the BigNumber's value, formatted to 27 decimals and with the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
BigNumber.RAY.formatRay(3); // 1.000
```

#### `toRayFloat`

Returns a float representation of the BigNumber's value, parsed as a ray-based number.

Note: parsing a too large value may result in parsing `NaN` (because the BigNumber's value may still be too large to fit in a JS floating-point number)

```typescript
BigNumber.RAY.toRayFloat(); // 1.0
```

#### `rayToPercent`

Scales the ray-based BigNumber down to the percent scale (losing 23 decimals)

```typescript
BigNumber.RAY.rayToPercent(); // 1 PERCENT
```

#### `rayToWad`

Scales the ray-based BigNumber down to the wad scale (losing 9 decimals)

```typescript
BigNumber.RAY.rayToWad(); // 1 WAD
```

### Percent-based utilities

#### `percentMul`

Returns the result of the percent-based multiplication (4 decimals precision), rounded half up

```typescript
BigNumber.PERCENT.percentMul(BigNumber.PERCENT); // 1.0 * 1.0 = 1.0 (in percent)
```

#### `percentDiv`

Returns the result of the percent-based division (4 decimals precision), rounded half up

```typescript
BigNumber.PERCENT.percentDiv(BigNumber.PERCENT); // 1.0 / 1.0 = 1.0 (in percent)
```

#### `percentAdd`

Returns the result of the addition of a BigNumberish and a percent-based percentage of it (4 decimals), rounded half up

```typescript
BigNumber.PERCENT.percentAdd(
  BigNumber.HALF_PERCENT // 50% in percent
); // 1.0 * (1.0 + 0.5) = 1.5 (in percent)
```

#### `percentSub`

Returns the result of the subtraction of a BigNumberish and a percent-based percentage of it (4 decimals), rounded half up

```typescript
BigNumber.PERCENT.percentSub(
  BigNumber.HALF_PERCENT // 50% in percent
); // 1.0 * (1.0 - 0.5) = 0.5 (in percent)
```

#### `percentAvg`

Returns the weighted average of 2 BigNumberishs, using a percent-based weight (4 decimals), rounded half up

```typescript
BigNumber.PERCENT.percentAvg(
  BigNumber.PERCENT.mul(2), // 2 PERCENT
  BigNumber.HALF_PERCENT // 50% in PERCENT
); // 1.0 * (1.0 - 0.5) + 2.0 * 0.5 = 1.5 (in percent)
```

#### `percentPow`

Returns the integer power of a BigNumber, calculated using percent-based multiplications (4 decimals precision), rounded half up

```typescript
BigNumber.PERCENT.mul(2) // 2 PERCENT
  .percentPow(2); // 2.0 ** 2 = 4.0 (in percent)
```

#### `percentMulUp`

Returns the result of the percent-based multiplication (4 decimals precision), rounded up

```typescript
BigNumber.PERCENT.sub(1).percentMulUp(BigNumber.PERCENT.sub(1)); // 0.9999 * 0.9999 = 0.9999 (in percent, rounded up)
```

#### `percentMulDown`

Returns the result of the percent-based multiplication (4 decimals precision), rounded down

```typescript
BigNumber.PERCENT.sub(1).percentMulDown(BigNumber.PERCENT.sub(1)); // 0.9999 * 0.9999 = 0.9998 (in percent, rounded down)
```

#### `percentDivUp`

Returns the result of the percent-based division (4 decimals precision), rounded up

```typescript
BigNumber.PERCENT.percentDivUp(BigNumber.PERCENT.sub(1)); // 1.0 * 0.9999 = 1.0002 (in percent, rounded up)
```

#### `percentDivDown`

Returns the result of the percent-based division (4 decimals precision), rounded down

```typescript
BigNumber.PERCENT.percentDivDown(BigNumber.PERCENT.sub(1)); // 1.0 * 0.9999 = 1.0001 (in percent, rounded down)
```

#### `formatPercent`

Returns a string representation of the BigNumber's value, formatted to 4 decimals and with the input number of digits expected after the unit, truncating the trailing digits if any (default: keep all digits after the decimal point)

```typescript
BigNumber.PERCENT.formatPercent(3); // 1.000
```

#### `toPercentFloat`

Returns a float representation of the BigNumber's value, parsed as a percent-based number.

Note: parsing a too large value may result in parsing `NaN` (because the BigNumber's value may still be too large to fit in a JS floating-point number)

```typescript
BigNumber.PERCENT.toPercentFloat(); // 1.0
```

#### `percentToWad`

Scales the percent-based BigNumber up to the wad scale (adding 14 decimals)

```typescript
BigNumber.PERCENT.percentToWad(); // 1 WAD
```

#### `percentToRay`

Scales the percent-based BigNumber up to the ray scale (adding 23 decimals)

```typescript
BigNumber.PERCENT.percentToRay(); // 1 RAY
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
