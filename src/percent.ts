import { BigNumberish, parseUnits, toBigInt } from "ethers";
import { PERCENT } from "./constants";
import { avgHalfUp, expN, mulDivDown, mulDivHalfUp, mulDivUp, pow } from "./utils";
import { format, toDecimals, toFloat } from "./format";

export const parsePercent = (value: string) => parseUnits(value, 2);

export const percentAdd = (x: BigNumberish, percent: BigNumberish) => {
  return percentMul(x, PERCENT + toBigInt(percent));
};

export const percentSub = (x: BigNumberish, percent: BigNumberish) => {
  return percentMul(x, PERCENT - toBigInt(percent));
};

export const percentMul = (x: BigNumberish, other: BigNumberish) => {
  return mulDivHalfUp(x, other, PERCENT);
};

export const percentMulUp = (x: BigNumberish, other: BigNumberish) => {
  return mulDivUp(x, other, PERCENT);
};

export const percentMulDown = (x: BigNumberish, other: BigNumberish) => {
  return mulDivDown(x, other, PERCENT);
};

export const percentDiv = (x: BigNumberish, other: BigNumberish) => {
  return mulDivHalfUp(x, PERCENT, other);
};

export const percentDivUp = (x: BigNumberish, other: BigNumberish) => {
  return mulDivUp(x, PERCENT, other);
};

export const percentDivDown = (x: BigNumberish, other: BigNumberish) => {
  return mulDivDown(x, PERCENT, other);
};

export const percentAvg = (x: BigNumberish, other: BigNumberish, percent: BigNumberish) => {
  return avgHalfUp(x, other, percent, PERCENT);
};

export const percentPow = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, PERCENT, mulDivHalfUp);
};

export const percentPowUp = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, PERCENT, mulDivUp);
};

export const percentPowDown = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, PERCENT, mulDivDown);
};

export const percentExpN = (x: BigNumberish, N: BigNumberish) => {
  return expN(x, N, PERCENT, mulDivDown);
};

export const percentToDecimals = (x: BigNumberish, decimals: number) => {
  return toDecimals(x, decimals, 4);
};

export const percentToRay = (x: BigNumberish) => {
  return percentToDecimals(x, 27);
};

export const percentToWad = (x: BigNumberish) => {
  return percentToDecimals(x, 18);
};

export const formatPercent = (x: BigNumberish, digits?: number) => {
  return format(x, 4, digits);
};

export const toPercentFloat = (x: BigNumberish) => {
  return toFloat(x, 4);
};
