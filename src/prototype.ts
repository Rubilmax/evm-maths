import { BigNumber, BigNumberish, utils } from "ethers";

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

BigNumber.prototype.min = function (y: BigNumberish, ...others: BigNumberish[]) {
  return min(this, y, ...others);
};
BigNumber.prototype.max = function (y: BigNumberish, ...others: BigNumberish[]) {
  return max(this, y, ...others);
};
BigNumber.prototype.sum = function (others: BigNumberish[]) {
  return sum(this, others);
};
BigNumber.prototype.format = function (decimals?: number, digits?: number) {
  const formatted = utils.formatUnits(this, decimals);

  let dotIndex = formatted.indexOf(".");
  if (dotIndex < 0) dotIndex = formatted.length;

  decimals = formatted.length - 1 - dotIndex;
  digits ??= decimals;

  return digits < decimals
    ? formatted.slice(0, dotIndex + 1 + digits)
    : formatted + "0".repeat(digits - decimals);
};
BigNumber.prototype.toFloat = function (decimals?: number) {
  return parseFloat(this.format(decimals));
};

BigNumber.prototype.compMul = function (other: BigNumberish) {
  return this.mul(other).div(WAD);
};
BigNumber.prototype.compDiv = function (other: BigNumberish) {
  return this.mul(WAD_SQUARED).div(other).div(WAD);
};

BigNumber.prototype.percentAdd = function (pct: BigNumberish) {
  return this.percentMul(PERCENT.add(pct));
};
BigNumber.prototype.percentSub = function (pct: BigNumberish) {
  return this.percentMul(PERCENT.sub(pct));
};
BigNumber.prototype.percentMul = function (other: BigNumberish) {
  return mulDivHalfUp(this, other, PERCENT);
};
BigNumber.prototype.percentMulUp = function (other: BigNumberish) {
  return mulDivUp(this, other, PERCENT);
};
BigNumber.prototype.percentMulDown = function (other: BigNumberish) {
  return mulDivDown(this, other, PERCENT);
};
BigNumber.prototype.percentDiv = function (other: BigNumberish) {
  return mulDivHalfUp(this, PERCENT, other);
};
BigNumber.prototype.percentDivUp = function (other: BigNumberish) {
  return mulDivUp(this, PERCENT, other);
};
BigNumber.prototype.percentDivDown = function (other: BigNumberish) {
  return mulDivDown(this, PERCENT, other);
};
BigNumber.prototype.percentAvg = function (other: BigNumberish, pct: BigNumberish) {
  return avgHalfUp(this, other, pct, PERCENT);
};
BigNumber.prototype.percentPow = function (exponent: BigNumberish) {
  return powHalfUp(this, exponent, PERCENT);
};
BigNumber.prototype.percentToDecimals = function (decimals: number) {
  if (decimals <= 4) {
    const ratio = pow10(4 - decimals);

    return this.add(ratio.div(2)).div(ratio);
  }

  return this.mul(pow10(decimals - 4));
};
BigNumber.prototype.percentToWad = function () {
  return this.percentToDecimals(18);
};
BigNumber.prototype.percentToRay = function () {
  return this.percentToDecimals(27);
};
BigNumber.prototype.formatPercent = function (digits?: number) {
  return this.format(4, digits);
};
BigNumber.prototype.toPercentFloat = function () {
  return this.toFloat(4);
};

BigNumber.prototype.wadAdd = function (wad: BigNumberish) {
  return this.wadMul(WAD.add(wad));
};
BigNumber.prototype.wadSub = function (wad: BigNumberish) {
  return this.wadMul(WAD.sub(wad));
};
BigNumber.prototype.wadMul = function (other: BigNumberish) {
  return mulDivHalfUp(this, other, WAD);
};
BigNumber.prototype.wadMulUp = function (other: BigNumberish) {
  return mulDivUp(this, other, WAD);
};
BigNumber.prototype.wadMulDown = function (other: BigNumberish) {
  return mulDivDown(this, other, WAD);
};
BigNumber.prototype.wadDiv = function (other: BigNumberish) {
  return mulDivHalfUp(this, WAD, other);
};
BigNumber.prototype.wadDivUp = function (other: BigNumberish) {
  return mulDivUp(this, WAD, other);
};
BigNumber.prototype.wadDivDown = function (other: BigNumberish) {
  return mulDivDown(this, WAD, other);
};
BigNumber.prototype.wadAvg = function (other: BigNumberish, wad: BigNumberish) {
  return avgHalfUp(this, other, wad, WAD);
};
BigNumber.prototype.wadPow = function (exponent: BigNumberish) {
  return powHalfUp(this, exponent, WAD);
};
BigNumber.prototype.wadToDecimals = function (decimals: number) {
  if (decimals <= 18) {
    const ratio = pow10(18 - decimals);

    return this.add(ratio.div(2)).div(ratio);
  }

  return this.mul(pow10(decimals - 18));
};
BigNumber.prototype.wadToPercent = function () {
  return this.wadToDecimals(4);
};
BigNumber.prototype.wadToRay = function () {
  return this.wadToDecimals(27);
};
BigNumber.prototype.formatWad = function (digits?: number) {
  return this.format(18, digits);
};
BigNumber.prototype.toWadFloat = function () {
  return this.toFloat(18);
};

BigNumber.prototype.rayAdd = function (ray: BigNumberish) {
  return this.rayMul(RAY.add(ray));
};
BigNumber.prototype.raySub = function (ray: BigNumberish) {
  return this.rayMul(RAY.sub(ray));
};
BigNumber.prototype.rayMul = function (other: BigNumberish) {
  return mulDivHalfUp(this, other, RAY);
};
BigNumber.prototype.rayMulUp = function (other: BigNumberish) {
  return mulDivUp(this, other, RAY);
};
BigNumber.prototype.rayMulDown = function (other: BigNumberish) {
  return mulDivDown(this, other, RAY);
};
BigNumber.prototype.rayDiv = function (other: BigNumberish) {
  return mulDivHalfUp(this, RAY, other);
};
BigNumber.prototype.rayDivUp = function (other: BigNumberish) {
  return mulDivUp(this, RAY, other);
};
BigNumber.prototype.rayDivDown = function (other: BigNumberish) {
  return mulDivDown(this, RAY, other);
};
BigNumber.prototype.rayAvg = function (other: BigNumberish, ray: BigNumberish) {
  return avgHalfUp(this, other, ray, RAY);
};
BigNumber.prototype.rayPow = function (exponent: BigNumberish) {
  return powHalfUp(this, exponent, RAY);
};
BigNumber.prototype.rayToDecimals = function (decimals: number) {
  if (decimals <= 27) {
    const ratio = pow10(27 - decimals);

    return this.add(ratio.div(2)).div(ratio);
  }

  return this.mul(pow10(decimals - 27));
};
BigNumber.prototype.rayToPercent = function () {
  return this.rayToDecimals(4);
};
BigNumber.prototype.rayToWad = function () {
  return this.rayToDecimals(18);
};
BigNumber.prototype.formatRay = function (digits?: number) {
  return this.format(27, digits);
};
BigNumber.prototype.toRayFloat = function () {
  return this.toFloat(27);
};

BigNumber.PERCENT = PERCENT;
BigNumber.HALF_PERCENT = HALF_PERCENT;
BigNumber.WAD = WAD;
BigNumber.HALF_WAD = HALF_WAD;
BigNumber.RAY = RAY;
BigNumber.HALF_RAY = HALF_RAY;

BigNumber.min = min;
BigNumber.max = max;
BigNumber.sum = (others: BigNumberish[]) => sum(0, others);

BigNumber.pow10 = pow10;
BigNumber.parsePercent = parsePercent;
BigNumber.parseWad = parseWad;
BigNumber.parseRay = parseRay;
