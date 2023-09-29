import { BigNumberish } from "ethers";

import { PERCENT, RAY, HALF_PERCENT, HALF_RAY, HALF_WAD, WAD } from "./constants";
import {
  max,
  min,
  sum,
  pow10,
  mulDivHalfUp,
  mulDivUp,
  mulDivDown,
  approxEqAbs,
  abs,
} from "./utils";
import { format, toFloat } from "./format";
import { compDiv, compMul } from "./comp";
import {
  parsePercent,
  formatPercent,
  percentAdd,
  percentAvg,
  percentDiv,
  percentDivDown,
  percentDivUp,
  percentExpN,
  percentMul,
  percentMulDown,
  percentMulUp,
  percentPow,
  percentPowDown,
  percentPowUp,
  percentSub,
  percentToDecimals,
  percentToRay,
  percentToWad,
  toPercentFloat,
} from "./percent";
import {
  parseWad,
  formatWad,
  wadAdd,
  wadAvg,
  wadDiv,
  wadDivDown,
  wadDivUp,
  wadExpN,
  wadMul,
  wadMulDown,
  wadMulUp,
  wadPow,
  wadPowDown,
  wadPowUp,
  wadSub,
  wadToDecimals,
  wadToRay,
  wadToPercent,
  toWadFloat,
} from "./wad";
import {
  parseRay,
  formatRay,
  rayAdd,
  rayAvg,
  rayDiv,
  rayDivDown,
  rayDivUp,
  rayExpN,
  rayMul,
  rayMulDown,
  rayMulUp,
  rayPow,
  rayPowDown,
  rayPowUp,
  raySub,
  rayToDecimals,
  rayToWad,
  rayToPercent,
  toRayFloat,
} from "./ray";

declare global {
  interface BigInt {
    approxEqAbs: (other: BigNumberish, tolerance?: BigNumberish) => boolean;
    abs: () => bigint;
    min: (other: BigNumberish, ...others: BigNumberish[]) => bigint;
    max: (other: BigNumberish, ...others: BigNumberish[]) => bigint;
    sum: (others: BigNumberish[]) => bigint;
    format: (decimals?: number, digits?: number) => string;
    toFloat: (decimals?: number) => number;

    mulDiv: (other: BigNumberish, scale: BigNumberish) => bigint;
    mulDivUp: (other: BigNumberish, scale: BigNumberish) => bigint;
    mulDivDown: (other: BigNumberish, scale: BigNumberish) => bigint;

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
    percentPowUp: (exponent: BigNumberish) => bigint;
    percentPowDown: (exponent: BigNumberish) => bigint;
    percentExpN: (exponent: BigNumberish) => bigint;
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
    wadPowUp: (exponent: BigNumberish) => bigint;
    wadPowDown: (exponent: BigNumberish) => bigint;
    wadExpN: (exponent: BigNumberish) => bigint;
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
    rayPowUp: (exponent: BigNumberish) => bigint;
    rayPowDown: (exponent: BigNumberish) => bigint;
    rayExpN: (exponent: BigNumberish) => bigint;
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

BigInt.prototype.approxEqAbs = function (y: BigNumberish, tolerance: BigNumberish = 0) {
  return approxEqAbs(this as bigint, y, tolerance);
};
BigInt.prototype.abs = function () {
  return abs(this as bigint);
};
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
  return format(this as bigint, decimals, digits);
};
BigInt.prototype.toFloat = function (decimals?: number) {
  return toFloat(this as bigint, decimals);
};

BigInt.prototype.mulDiv = function (other: BigNumberish, scale: BigNumberish) {
  return mulDivHalfUp(this as bigint, other, scale);
};
BigInt.prototype.mulDivUp = function (other: BigNumberish, scale: BigNumberish) {
  return mulDivUp(this as bigint, other, scale);
};
BigInt.prototype.mulDivDown = function (other: BigNumberish, scale: BigNumberish) {
  return mulDivDown(this as bigint, other, scale);
};

BigInt.prototype.compMul = function (other: BigNumberish) {
  return compMul(this as bigint, other);
};
BigInt.prototype.compDiv = function (other: BigNumberish) {
  return compDiv(this as bigint, other);
};

BigInt.prototype.percentAdd = function (pct: BigNumberish) {
  return percentAdd(this as bigint, pct);
};
BigInt.prototype.percentSub = function (pct: BigNumberish) {
  return percentSub(this as bigint, pct);
};
BigInt.prototype.percentMul = function (other: BigNumberish) {
  return percentMul(this as bigint, other);
};
BigInt.prototype.percentMulUp = function (other: BigNumberish) {
  return percentMulUp(this as bigint, other);
};
BigInt.prototype.percentMulDown = function (other: BigNumberish) {
  return percentMulDown(this as bigint, other);
};
BigInt.prototype.percentDiv = function (other: BigNumberish) {
  return percentDiv(this as bigint, other);
};
BigInt.prototype.percentDivUp = function (other: BigNumberish) {
  return percentDivUp(this as bigint, other);
};
BigInt.prototype.percentDivDown = function (other: BigNumberish) {
  return percentDivDown(this as bigint, other);
};
BigInt.prototype.percentAvg = function (other: BigNumberish, pct: BigNumberish) {
  return percentAvg(this as bigint, other, pct);
};
BigInt.prototype.percentPow = function (exponent: BigNumberish) {
  return percentPow(this as bigint, exponent);
};
BigInt.prototype.percentPowUp = function (exponent: BigNumberish) {
  return percentPowUp(this as bigint, exponent);
};
BigInt.prototype.percentPowDown = function (exponent: BigNumberish) {
  return percentPowDown(this as bigint, exponent);
};
BigInt.prototype.percentExpN = function (N: BigNumberish) {
  return percentExpN(this as bigint, N);
};
BigInt.prototype.percentToDecimals = function (decimals: number) {
  return percentToDecimals(this as bigint, decimals);
};
BigInt.prototype.percentToWad = function () {
  return percentToWad(this as bigint);
};
BigInt.prototype.percentToRay = function () {
  return percentToRay(this as bigint);
};
BigInt.prototype.formatPercent = function (digits?: number) {
  return formatPercent(this as bigint, digits);
};
BigInt.prototype.toPercentFloat = function () {
  return toPercentFloat(this as bigint);
};

BigInt.prototype.wadAdd = function (wad: BigNumberish) {
  return wadAdd(this as bigint, wad);
};
BigInt.prototype.wadSub = function (wad: BigNumberish) {
  return wadSub(this as bigint, wad);
};
BigInt.prototype.wadMul = function (other: BigNumberish) {
  return wadMul(this as bigint, other);
};
BigInt.prototype.wadMulUp = function (other: BigNumberish) {
  return wadMulUp(this as bigint, other);
};
BigInt.prototype.wadMulDown = function (other: BigNumberish) {
  return wadMulDown(this as bigint, other);
};
BigInt.prototype.wadDiv = function (other: BigNumberish) {
  return wadDiv(this as bigint, other);
};
BigInt.prototype.wadDivUp = function (other: BigNumberish) {
  return wadDivUp(this as bigint, other);
};
BigInt.prototype.wadDivDown = function (other: BigNumberish) {
  return wadDivDown(this as bigint, other);
};
BigInt.prototype.wadAvg = function (other: BigNumberish, wad: BigNumberish) {
  return wadAvg(this as bigint, other, wad);
};
BigInt.prototype.wadPow = function (exponent: BigNumberish) {
  return wadPow(this as bigint, exponent);
};
BigInt.prototype.wadPowUp = function (exponent: BigNumberish) {
  return wadPowUp(this as bigint, exponent);
};
BigInt.prototype.wadPowDown = function (exponent: BigNumberish) {
  return wadPowDown(this as bigint, exponent);
};
BigInt.prototype.wadExpN = function (N: BigNumberish) {
  return wadExpN(this as bigint, N);
};
BigInt.prototype.wadToDecimals = function (decimals: number) {
  return wadToDecimals(this as bigint, decimals);
};
BigInt.prototype.wadToPercent = function () {
  return wadToPercent(this as bigint);
};
BigInt.prototype.wadToRay = function () {
  return wadToRay(this as bigint);
};
BigInt.prototype.formatWad = function (digits?: number) {
  return formatWad(this as bigint, digits);
};
BigInt.prototype.toWadFloat = function () {
  return toWadFloat(this as bigint);
};

BigInt.prototype.rayAdd = function (ray: BigNumberish) {
  return rayAdd(this as bigint, ray);
};
BigInt.prototype.raySub = function (ray: BigNumberish) {
  return raySub(this as bigint, ray);
};
BigInt.prototype.rayMul = function (other: BigNumberish) {
  return rayMul(this as bigint, other);
};
BigInt.prototype.rayMulUp = function (other: BigNumberish) {
  return rayMulUp(this as bigint, other);
};
BigInt.prototype.rayMulDown = function (other: BigNumberish) {
  return rayMulDown(this as bigint, other);
};
BigInt.prototype.rayDiv = function (other: BigNumberish) {
  return rayDiv(this as bigint, other);
};
BigInt.prototype.rayDivUp = function (other: BigNumberish) {
  return rayDivUp(this as bigint, other);
};
BigInt.prototype.rayDivDown = function (other: BigNumberish) {
  return rayDivDown(this as bigint, other);
};
BigInt.prototype.rayAvg = function (other: BigNumberish, ray: BigNumberish) {
  return rayAvg(this as bigint, other, ray);
};
BigInt.prototype.rayPow = function (exponent: BigNumberish) {
  return rayPow(this as bigint, exponent);
};
BigInt.prototype.rayPowUp = function (exponent: BigNumberish) {
  return rayPowUp(this as bigint, exponent);
};
BigInt.prototype.rayPowDown = function (exponent: BigNumberish) {
  return rayPowDown(this as bigint, exponent);
};
BigInt.prototype.rayExpN = function (N: BigNumberish) {
  return rayExpN(this as bigint, N);
};
BigInt.prototype.rayToDecimals = function (decimals: number) {
  return rayToDecimals(this as bigint, decimals);
};
BigInt.prototype.rayToPercent = function () {
  return rayToPercent(this as bigint);
};
BigInt.prototype.rayToWad = function () {
  return rayToWad(this as bigint);
};
BigInt.prototype.formatRay = function (digits?: number) {
  return formatRay(this as bigint, digits);
};
BigInt.prototype.toRayFloat = function () {
  return toRayFloat(this as bigint);
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
