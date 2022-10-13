import { BigNumber, BigNumberish, utils } from "ethers";

import { avgUp, max, min, mulDivUp, pow10 } from "./utils";

const PERCENT = pow10(4);
const WAD = pow10(18);
const RAY = pow10(27);

const RAY_WAD_RATIO = RAY.div(WAD);
const HALF_RAY_WAD_RATIO = RAY_WAD_RATIO.div(2);

const WAD_PERCENT_RATIO = WAD.div(PERCENT);
const HALF_WAD_PERCENT_RATIO = WAD_PERCENT_RATIO.div(2);

const RAY_PERCENT_RATIO = RAY.div(PERCENT);
const HALF_RAY_PERCENT_RATIO = RAY_PERCENT_RATIO.div(2);

declare module "ethers" {
  class BigNumber {
    min: (other: BigNumberish) => BigNumber;
    max: (other: BigNumberish) => BigNumber;
    sum: (others: BigNumberish[]) => BigNumber;

    compoundMul: (other: BigNumberish) => BigNumber;
    compoundDiv: (other: BigNumberish) => BigNumber;

    percentAdd: (pct: BigNumberish) => BigNumber;
    percentSub: (pct: BigNumberish) => BigNumber;
    percentMul: (other: BigNumberish) => BigNumber;
    percentDiv: (other: BigNumberish) => BigNumber;
    percentAvg: (other: BigNumberish, pct: BigNumberish) => BigNumber;
    percentToWad: () => BigNumber;
    percentToRay: () => BigNumber;
    formatPercent: () => string;

    wadAdd: (wad: BigNumberish) => BigNumber;
    wadSub: (wad: BigNumberish) => BigNumber;
    wadMul: (other: BigNumberish) => BigNumber;
    wadDiv: (other: BigNumberish) => BigNumber;
    wadAvg: (other: BigNumberish, wad: BigNumberish) => BigNumber;
    wadToPercent: () => BigNumber;
    wadToRay: () => BigNumber;
    formatRay: () => string;

    rayAdd: (ray: BigNumberish) => BigNumber;
    raySub: (ray: BigNumberish) => BigNumber;
    rayMul: (other: BigNumberish) => BigNumber;
    rayDiv: (other: BigNumberish) => BigNumber;
    rayAvg: (other: BigNumberish, ray: BigNumberish) => BigNumber;
    rayToPercent: () => BigNumber;
    rayToWad: () => BigNumber;
    formatWad: () => string;

    static pow10: (power: BigNumberish) => BigNumber;
    static parsePercent: (value: string) => BigNumber;
    static parseWad: (value: string) => BigNumber;
    static parseRay: (value: string) => BigNumber;
  }
}

BigNumber.prototype.min = function (other: BigNumberish) {
  return min(this, other);
};
BigNumber.prototype.max = function (other: BigNumberish) {
  return max(this, other);
};
BigNumber.prototype.sum = function (others: BigNumberish[]) {
  return others.reduce<BigNumber>((acc, val) => acc.add(val), this);
};

BigNumber.prototype.compoundMul = function (other: BigNumberish) {
  return BigNumber.from(this).mul(other).div(WAD);
};
BigNumber.prototype.compoundDiv = function (other: BigNumberish) {
  return WAD.mul(this).mul(WAD).div(other).div(WAD);
};

BigNumber.prototype.percentAdd = function (pct: BigNumberish) {
  return this.percentMul(PERCENT.add(pct));
};
BigNumber.prototype.percentSub = function (pct: BigNumberish) {
  return this.percentMul(PERCENT.sub(pct));
};
BigNumber.prototype.percentMul = function (other: BigNumberish) {
  return mulDivUp(this, other, PERCENT);
};
BigNumber.prototype.percentDiv = function (other: BigNumberish) {
  return mulDivUp(this, PERCENT, other);
};
BigNumber.prototype.percentAvg = function (other: BigNumberish, pct: BigNumberish) {
  return avgUp(this, other, pct, PERCENT);
};
BigNumber.prototype.percentToWad = function () {
  return this.mul(WAD_PERCENT_RATIO);
};
BigNumber.prototype.percentToRay = function () {
  return this.mul(RAY_PERCENT_RATIO);
};
BigNumber.prototype.formatPercent = function () {
  return utils.formatUnits(this, 2);
};

BigNumber.prototype.wadAdd = function (wad: BigNumberish) {
  return this.wadMul(PERCENT.add(wad));
};
BigNumber.prototype.wadSub = function (wad: BigNumberish) {
  return this.wadMul(PERCENT.sub(wad));
};
BigNumber.prototype.wadMul = function (other: BigNumberish) {
  return mulDivUp(this, other, WAD);
};
BigNumber.prototype.wadDiv = function (other: BigNumberish) {
  return mulDivUp(this, WAD, other);
};
BigNumber.prototype.wadAvg = function (other: BigNumberish, wad: BigNumberish) {
  return avgUp(this, other, wad, WAD);
};
BigNumber.prototype.wadToPercent = function () {
  return this.add(HALF_WAD_PERCENT_RATIO).div(WAD_PERCENT_RATIO);
};
BigNumber.prototype.wadToRay = function () {
  return this.mul(RAY_WAD_RATIO);
};
BigNumber.prototype.formatWad = function () {
  return utils.formatUnits(this, 18);
};

BigNumber.prototype.rayAdd = function (ray: BigNumberish) {
  return this.rayMul(PERCENT.add(ray));
};
BigNumber.prototype.raySub = function (ray: BigNumberish) {
  return this.rayMul(PERCENT.sub(ray));
};
BigNumber.prototype.rayMul = function (other: BigNumberish) {
  return mulDivUp(this, other, RAY);
};
BigNumber.prototype.rayDiv = function (other: BigNumberish) {
  return mulDivUp(this, RAY, other);
};
BigNumber.prototype.rayAvg = function (other: BigNumberish, ray: BigNumberish) {
  return avgUp(this, other, ray, RAY);
};
BigNumber.prototype.rayToPercent = function () {
  return this.add(HALF_RAY_PERCENT_RATIO).div(RAY_PERCENT_RATIO);
};
BigNumber.prototype.rayToWad = function () {
  return this.add(HALF_RAY_WAD_RATIO).div(RAY_WAD_RATIO);
};
BigNumber.prototype.formatRay = function () {
  return utils.formatUnits(this, 27);
};

BigNumber.pow10 = pow10;
BigNumber.parsePercent = function (value: string) {
  return utils.parseUnits(value, 2);
};
BigNumber.parseWad = function (value: string) {
  return utils.parseUnits(value, 18);
};
BigNumber.parseRay = function (value: string) {
  return utils.parseUnits(value, 27);
};
