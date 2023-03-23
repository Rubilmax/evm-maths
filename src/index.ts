import { BigNumberish, formatUnits, toBigInt } from "ethers";

import { PERCENT, RAY, HALF_PERCENT, HALF_RAY, HALF_WAD, WAD, WAD_SQUARED } from "./constants";
import {
  avgHalfUp,
  max,
  min,
  sum,
  pow10,
  mulDivHalfUp,
  parsePercent,
  parseRay,
  parseWad,
  powHalfUp,
  mulDivUp,
  mulDivDown,
} from "./utils";

declare global {
  interface BigInt {
    min: (other: BigNumberish, ...others: BigNumberish[]) => bigint;
    max: (other: BigNumberish, ...others: BigNumberish[]) => bigint;
    sum: (others: BigNumberish[]) => bigint;
    format: (decimals?: number, digits?: number) => string;
    toFloat: (decimals?: number) => number;

    compMul: (other: BigNumberish) => bigint;
    compDiv: (other: BigNumberish) => bigint;

    percentAdd: (pct: BigNumberish) => bigint;
    percentSub: (pct: BigNumberish) => bigint;
    percentMul: (other: BigNumberish) => bigint;
    percentMulUp: (other: BigNumberish) => bigint;
    percentMulDown: (other: BigNumberish) => bigint;
    percentDiv: (other: BigNumberish) => bigint;
    percentDivUp: (other: BigNumberish) => bigint;
    percentDivDown: (other: BigNumberish) => bigint;
    percentAvg: (other: BigNumberish, pct: BigNumberish) => bigint;
    percentPow: (exponent: BigNumberish) => bigint;
    percentToDecimals: (decimals: number) => bigint;
    percentToWad: () => bigint;
    percentToRay: () => bigint;
    formatPercent: (digits?: number) => string;
    toPercentFloat: () => number;

    wadAdd: (wad: BigNumberish) => bigint;
    wadSub: (wad: BigNumberish) => bigint;
    wadMul: (other: BigNumberish) => bigint;
    wadMulUp: (other: BigNumberish) => bigint;
    wadMulDown: (other: BigNumberish) => bigint;
    wadDiv: (other: BigNumberish) => bigint;
    wadDivUp: (other: BigNumberish) => bigint;
    wadDivDown: (other: BigNumberish) => bigint;
    wadAvg: (other: BigNumberish, wad: BigNumberish) => bigint;
    wadPow: (exponent: BigNumberish) => bigint;
    wadToDecimals: (decimals: number) => bigint;
    wadToPercent: () => bigint;
    wadToRay: () => bigint;
    formatWad: (digits?: number) => string;
    toWadFloat: () => number;

    rayAdd: (ray: BigNumberish) => bigint;
    raySub: (ray: BigNumberish) => bigint;
    rayMul: (other: BigNumberish) => bigint;
    rayMulUp: (other: BigNumberish) => bigint;
    rayMulDown: (other: BigNumberish) => bigint;
    rayDiv: (other: BigNumberish) => bigint;
    rayDivUp: (other: BigNumberish) => bigint;
    rayDivDown: (other: BigNumberish) => bigint;
    rayAvg: (other: BigNumberish, ray: BigNumberish) => bigint;
    rayPow: (exponent: BigNumberish) => bigint;
    rayToDecimals: (decimals: number) => bigint;
    rayToPercent: () => bigint;
    rayToWad: () => bigint;
    formatRay: (digits?: number) => string;
    toRayFloat: () => number;
  }

  interface BigIntConstructor {
    PERCENT: bigint;
    HALF_PERCENT: bigint;
    WAD: bigint;
    HALF_WAD: bigint;
    RAY: bigint;
    HALF_RAY: bigint;

    min: (other: BigNumberish, ...others: BigNumberish[]) => bigint;
    max: (other: BigNumberish, ...others: BigNumberish[]) => bigint;
    sum: (others: BigNumberish[]) => bigint;

    pow10: (power: BigNumberish) => bigint;
    parsePercent: (value: string) => bigint;
    parseWad: (value: string) => bigint;
    parseRay: (value: string) => bigint;
  }
}

BigInt.prototype.min = function (y: BigNumberish, ...others: BigNumberish[]) {
  return min(this as bigint, y, ...others);
};
BigInt.prototype.max = function (y: BigNumberish, ...others: BigNumberish[]) {
  return max(this as bigint, y, ...others);
};
BigInt.prototype.sum = function (others: BigNumberish[]) {
  return sum(this as bigint, others);
};
BigInt.prototype.format = function (decimals?: number, digits?: number) {
  const formatted = formatUnits(this as bigint, decimals);

  let dotIndex = formatted.indexOf(".");
  if (dotIndex < 0) dotIndex = formatted.length;

  decimals = formatted.length - 1 - dotIndex;
  digits ??= decimals;

  return digits < decimals
    ? formatted.slice(0, dotIndex + (digits > 0 ? digits + 1 : 0))
    : formatted + "0".repeat(digits - decimals);
};
BigInt.prototype.toFloat = function (decimals?: number) {
  return parseFloat(this.format(decimals));
};

BigInt.prototype.compMul = function (other: BigNumberish) {
  return ((this as bigint) * toBigInt(other)) / WAD;
};
BigInt.prototype.compDiv = function (other: BigNumberish) {
  return ((this as bigint) * WAD_SQUARED) / toBigInt(other) / WAD;
};

BigInt.prototype.percentAdd = function (pct: BigNumberish) {
  return this.percentMul(PERCENT + toBigInt(pct));
};
BigInt.prototype.percentSub = function (pct: BigNumberish) {
  return this.percentMul(PERCENT - toBigInt(pct));
};
BigInt.prototype.percentMul = function (other: BigNumberish) {
  return mulDivHalfUp(this as bigint, other, PERCENT);
};
BigInt.prototype.percentMulUp = function (other: BigNumberish) {
  return mulDivUp(this as bigint, other, PERCENT);
};
BigInt.prototype.percentMulDown = function (other: BigNumberish) {
  return mulDivDown(this as bigint, other, PERCENT);
};
BigInt.prototype.percentDiv = function (other: BigNumberish) {
  return mulDivHalfUp(this as bigint, PERCENT, other);
};
BigInt.prototype.percentDivUp = function (other: BigNumberish) {
  return mulDivUp(this as bigint, PERCENT, other);
};
BigInt.prototype.percentDivDown = function (other: BigNumberish) {
  return mulDivDown(this as bigint, PERCENT, other);
};
BigInt.prototype.percentAvg = function (other: BigNumberish, pct: BigNumberish) {
  return avgHalfUp(this as bigint, other, pct, PERCENT);
};
BigInt.prototype.percentPow = function (exponent: BigNumberish) {
  return powHalfUp(this as bigint, exponent, PERCENT);
};
BigInt.prototype.percentToDecimals = function (decimals: number) {
  if (decimals <= 4) {
    const ratio = pow10(4 - decimals);

    return ((this as bigint) + ratio / 2n) / ratio;
  }

  return (this as bigint) * pow10(decimals - 4);
};
BigInt.prototype.percentToWad = function () {
  return this.percentToDecimals(18);
};
BigInt.prototype.percentToRay = function () {
  return this.percentToDecimals(27);
};
BigInt.prototype.formatPercent = function (digits?: number) {
  return this.format(4, digits);
};
BigInt.prototype.toPercentFloat = function () {
  return this.toFloat(4);
};

BigInt.prototype.wadAdd = function (wad: BigNumberish) {
  return this.wadMul(WAD + toBigInt(wad));
};
BigInt.prototype.wadSub = function (wad: BigNumberish) {
  return this.wadMul(WAD - toBigInt(wad));
};
BigInt.prototype.wadMul = function (other: BigNumberish) {
  return mulDivHalfUp(this as bigint, other, WAD);
};
BigInt.prototype.wadMulUp = function (other: BigNumberish) {
  return mulDivUp(this as bigint, other, WAD);
};
BigInt.prototype.wadMulDown = function (other: BigNumberish) {
  return mulDivDown(this as bigint, other, WAD);
};
BigInt.prototype.wadDiv = function (other: BigNumberish) {
  return mulDivHalfUp(this as bigint, WAD, other);
};
BigInt.prototype.wadDivUp = function (other: BigNumberish) {
  return mulDivUp(this as bigint, WAD, other);
};
BigInt.prototype.wadDivDown = function (other: BigNumberish) {
  return mulDivDown(this as bigint, WAD, other);
};
BigInt.prototype.wadAvg = function (other: BigNumberish, wad: BigNumberish) {
  return avgHalfUp(this as bigint, other, wad, WAD);
};
BigInt.prototype.wadPow = function (exponent: BigNumberish) {
  return powHalfUp(this as bigint, exponent, WAD);
};
BigInt.prototype.wadToDecimals = function (decimals: number) {
  if (decimals <= 18) {
    const ratio = pow10(18 - decimals);

    return ((this as bigint) + ratio / 2n) / ratio;
  }

  return (this as bigint) * pow10(decimals - 18);
};
BigInt.prototype.wadToPercent = function () {
  return this.wadToDecimals(4);
};
BigInt.prototype.wadToRay = function () {
  return this.wadToDecimals(27);
};
BigInt.prototype.formatWad = function (digits?: number) {
  return this.format(18, digits);
};
BigInt.prototype.toWadFloat = function () {
  return this.toFloat(18);
};

BigInt.prototype.rayAdd = function (ray: BigNumberish) {
  return this.rayMul(RAY + toBigInt(ray));
};
BigInt.prototype.raySub = function (ray: BigNumberish) {
  return this.rayMul(RAY - toBigInt(ray));
};
BigInt.prototype.rayMul = function (other: BigNumberish) {
  return mulDivHalfUp(this as bigint, other, RAY);
};
BigInt.prototype.rayMulUp = function (other: BigNumberish) {
  return mulDivUp(this as bigint, other, RAY);
};
BigInt.prototype.rayMulDown = function (other: BigNumberish) {
  return mulDivDown(this as bigint, other, RAY);
};
BigInt.prototype.rayDiv = function (other: BigNumberish) {
  return mulDivHalfUp(this as bigint, RAY, other);
};
BigInt.prototype.rayDivUp = function (other: BigNumberish) {
  return mulDivUp(this as bigint, RAY, other);
};
BigInt.prototype.rayDivDown = function (other: BigNumberish) {
  return mulDivDown(this as bigint, RAY, other);
};
BigInt.prototype.rayAvg = function (other: BigNumberish, ray: BigNumberish) {
  return avgHalfUp(this as bigint, other, ray, RAY);
};
BigInt.prototype.rayPow = function (exponent: BigNumberish) {
  return powHalfUp(this as bigint, exponent, RAY);
};
BigInt.prototype.rayToDecimals = function (decimals: number) {
  if (decimals <= 27) {
    const ratio = pow10(27 - decimals);

    return ((this as bigint) + ratio / 2n) / ratio;
  }

  return (this as bigint) * pow10(decimals - 27);
};
BigInt.prototype.rayToPercent = function () {
  return this.rayToDecimals(4);
};
BigInt.prototype.rayToWad = function () {
  return this.rayToDecimals(18);
};
BigInt.prototype.formatRay = function (digits?: number) {
  return this.format(27, digits);
};
BigInt.prototype.toRayFloat = function () {
  return this.toFloat(27);
};

BigInt.PERCENT = PERCENT;
BigInt.HALF_PERCENT = HALF_PERCENT;
BigInt.WAD = WAD;
BigInt.HALF_WAD = HALF_WAD;
BigInt.RAY = RAY;
BigInt.HALF_RAY = HALF_RAY;

BigInt.min = min;
BigInt.max = max;
BigInt.sum = (others: BigNumberish[]) => sum(0, others);

BigInt.pow10 = pow10;
BigInt.parsePercent = parsePercent;
BigInt.parseWad = parseWad;
BigInt.parseRay = parseRay;
