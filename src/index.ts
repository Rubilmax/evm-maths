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
  formatPercent,
} from "./percent";
import {
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
  formatWad,
} from "./wad";
import {
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
  formatRay,
} from "./ray";

declare global {
  interface BigInt {
    approxEqAbs: (other: bigint, tolerance?: bigint) => boolean;
    abs: () => bigint;
    min: (other: bigint, ...others: bigint[]) => bigint;
    max: (other: bigint, ...others: bigint[]) => bigint;
    sum: (others: bigint[]) => bigint;
    format: (decimals?: number, digits?: number) => string;
    toFloat: (decimals?: number) => number;

    mulDiv: (other: bigint, scale: bigint) => bigint;
    mulDivUp: (other: bigint, scale: bigint) => bigint;
    mulDivDown: (other: bigint, scale: bigint) => bigint;

    compMul: (other: bigint) => bigint;
    compDiv: (other: bigint) => bigint;

    percentAdd: (pct: bigint) => bigint;
    percentSub: (pct: bigint) => bigint;
    percentMul: (other: bigint) => bigint;
    percentMulUp: (other: bigint) => bigint;
    percentMulDown: (other: bigint) => bigint;
    percentDiv: (other: bigint) => bigint;
    percentDivUp: (other: bigint) => bigint;
    percentDivDown: (other: bigint) => bigint;
    percentAvg: (other: bigint, pct: bigint) => bigint;
    percentPow: (exponent: bigint) => bigint;
    percentPowUp: (exponent: bigint) => bigint;
    percentPowDown: (exponent: bigint) => bigint;
    percentExpN: (exponent: bigint) => bigint;
    percentToDecimals: (decimals: number) => bigint;
    percentToWad: () => bigint;
    percentToRay: () => bigint;
    formatPercent: (digits?: number) => string;
    toPercentFloat: () => number;

    wadAdd: (wad: bigint) => bigint;
    wadSub: (wad: bigint) => bigint;
    wadMul: (other: bigint) => bigint;
    wadMulUp: (other: bigint) => bigint;
    wadMulDown: (other: bigint) => bigint;
    wadDiv: (other: bigint) => bigint;
    wadDivUp: (other: bigint) => bigint;
    wadDivDown: (other: bigint) => bigint;
    wadAvg: (other: bigint, wad: bigint) => bigint;
    wadPow: (exponent: bigint) => bigint;
    wadPowUp: (exponent: bigint) => bigint;
    wadPowDown: (exponent: bigint) => bigint;
    wadExpN: (exponent: bigint) => bigint;
    wadToDecimals: (decimals: number) => bigint;
    wadToPercent: () => bigint;
    wadToRay: () => bigint;
    formatWad: (digits?: number) => string;
    toWadFloat: () => number;

    rayAdd: (ray: bigint) => bigint;
    raySub: (ray: bigint) => bigint;
    rayMul: (other: bigint) => bigint;
    rayMulUp: (other: bigint) => bigint;
    rayMulDown: (other: bigint) => bigint;
    rayDiv: (other: bigint) => bigint;
    rayDivUp: (other: bigint) => bigint;
    rayDivDown: (other: bigint) => bigint;
    rayAvg: (other: bigint, ray: bigint) => bigint;
    rayPow: (exponent: bigint) => bigint;
    rayPowUp: (exponent: bigint) => bigint;
    rayPowDown: (exponent: bigint) => bigint;
    rayExpN: (exponent: bigint) => bigint;
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

    min: (other: bigint, ...others: bigint[]) => bigint;
    max: (other: bigint, ...others: bigint[]) => bigint;
    sum: (others: bigint[]) => bigint;

    pow10: (power: bigint) => bigint;
  }
}

BigInt.prototype.approxEqAbs = function (y: bigint, tolerance: bigint = 0n) {
  return approxEqAbs(this as bigint, y, tolerance);
};
BigInt.prototype.abs = function () {
  return abs(this as bigint);
};
BigInt.prototype.min = function (y: bigint, ...others: bigint[]) {
  return min(this as bigint, y, ...others);
};
BigInt.prototype.max = function (y: bigint, ...others: bigint[]) {
  return max(this as bigint, y, ...others);
};
BigInt.prototype.sum = function (others: bigint[]) {
  return sum(this as bigint, others);
};
BigInt.prototype.format = function (decimals?: number, digits?: number) {
  return format(this as bigint, decimals, digits);
};
BigInt.prototype.toFloat = function (decimals?: number) {
  return toFloat(this as bigint, decimals);
};

BigInt.prototype.mulDiv = function (other: bigint, scale: bigint) {
  return mulDivHalfUp(this as bigint, other, scale);
};
BigInt.prototype.mulDivUp = function (other: bigint, scale: bigint) {
  return mulDivUp(this as bigint, other, scale);
};
BigInt.prototype.mulDivDown = function (other: bigint, scale: bigint) {
  return mulDivDown(this as bigint, other, scale);
};

BigInt.prototype.compMul = function (other: bigint) {
  return compMul(this as bigint, other);
};
BigInt.prototype.compDiv = function (other: bigint) {
  return compDiv(this as bigint, other);
};

BigInt.prototype.percentAdd = function (pct: bigint) {
  return percentAdd(this as bigint, pct);
};
BigInt.prototype.percentSub = function (pct: bigint) {
  return percentSub(this as bigint, pct);
};
BigInt.prototype.percentMul = function (other: bigint) {
  return percentMul(this as bigint, other);
};
BigInt.prototype.percentMulUp = function (other: bigint) {
  return percentMulUp(this as bigint, other);
};
BigInt.prototype.percentMulDown = function (other: bigint) {
  return percentMulDown(this as bigint, other);
};
BigInt.prototype.percentDiv = function (other: bigint) {
  return percentDiv(this as bigint, other);
};
BigInt.prototype.percentDivUp = function (other: bigint) {
  return percentDivUp(this as bigint, other);
};
BigInt.prototype.percentDivDown = function (other: bigint) {
  return percentDivDown(this as bigint, other);
};
BigInt.prototype.percentAvg = function (other: bigint, pct: bigint) {
  return percentAvg(this as bigint, other, pct);
};
BigInt.prototype.percentPow = function (exponent: bigint) {
  return percentPow(this as bigint, exponent);
};
BigInt.prototype.percentPowUp = function (exponent: bigint) {
  return percentPowUp(this as bigint, exponent);
};
BigInt.prototype.percentPowDown = function (exponent: bigint) {
  return percentPowDown(this as bigint, exponent);
};
BigInt.prototype.percentExpN = function (N: bigint) {
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

BigInt.prototype.wadAdd = function (wad: bigint) {
  return wadAdd(this as bigint, wad);
};
BigInt.prototype.wadSub = function (wad: bigint) {
  return wadSub(this as bigint, wad);
};
BigInt.prototype.wadMul = function (other: bigint) {
  return wadMul(this as bigint, other);
};
BigInt.prototype.wadMulUp = function (other: bigint) {
  return wadMulUp(this as bigint, other);
};
BigInt.prototype.wadMulDown = function (other: bigint) {
  return wadMulDown(this as bigint, other);
};
BigInt.prototype.wadDiv = function (other: bigint) {
  return wadDiv(this as bigint, other);
};
BigInt.prototype.wadDivUp = function (other: bigint) {
  return wadDivUp(this as bigint, other);
};
BigInt.prototype.wadDivDown = function (other: bigint) {
  return wadDivDown(this as bigint, other);
};
BigInt.prototype.wadAvg = function (other: bigint, wad: bigint) {
  return wadAvg(this as bigint, other, wad);
};
BigInt.prototype.wadPow = function (exponent: bigint) {
  return wadPow(this as bigint, exponent);
};
BigInt.prototype.wadPowUp = function (exponent: bigint) {
  return wadPowUp(this as bigint, exponent);
};
BigInt.prototype.wadPowDown = function (exponent: bigint) {
  return wadPowDown(this as bigint, exponent);
};
BigInt.prototype.wadExpN = function (N: bigint) {
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

BigInt.prototype.rayAdd = function (ray: bigint) {
  return rayAdd(this as bigint, ray);
};
BigInt.prototype.raySub = function (ray: bigint) {
  return raySub(this as bigint, ray);
};
BigInt.prototype.rayMul = function (other: bigint) {
  return rayMul(this as bigint, other);
};
BigInt.prototype.rayMulUp = function (other: bigint) {
  return rayMulUp(this as bigint, other);
};
BigInt.prototype.rayMulDown = function (other: bigint) {
  return rayMulDown(this as bigint, other);
};
BigInt.prototype.rayDiv = function (other: bigint) {
  return rayDiv(this as bigint, other);
};
BigInt.prototype.rayDivUp = function (other: bigint) {
  return rayDivUp(this as bigint, other);
};
BigInt.prototype.rayDivDown = function (other: bigint) {
  return rayDivDown(this as bigint, other);
};
BigInt.prototype.rayAvg = function (other: bigint, ray: bigint) {
  return rayAvg(this as bigint, other, ray);
};
BigInt.prototype.rayPow = function (exponent: bigint) {
  return rayPow(this as bigint, exponent);
};
BigInt.prototype.rayPowUp = function (exponent: bigint) {
  return rayPowUp(this as bigint, exponent);
};
BigInt.prototype.rayPowDown = function (exponent: bigint) {
  return rayPowDown(this as bigint, exponent);
};
BigInt.prototype.rayExpN = function (N: bigint) {
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
BigInt.sum = (others: bigint[]) => sum(0n, others);

BigInt.pow10 = pow10;
