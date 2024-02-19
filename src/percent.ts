import { PERCENT } from "./constants";
import { avgHalfUp, expN, mulDivDown, mulDivHalfUp, mulDivUp, pow, sqrt } from "./utils";
import { format, toDecimals, toFloat } from "./format";

export const percentAdd = (x: bigint, percent: bigint) => {
  return percentMul(x, PERCENT + percent);
};

export const percentSub = (x: bigint, percent: bigint) => {
  return percentMul(x, PERCENT - percent);
};

export const percentMul = (x: bigint, other: bigint) => {
  return mulDivHalfUp(x, other, PERCENT);
};

export const percentMulUp = (x: bigint, other: bigint) => {
  return mulDivUp(x, other, PERCENT);
};

export const percentMulDown = (x: bigint, other: bigint) => {
  return mulDivDown(x, other, PERCENT);
};

export const percentDiv = (x: bigint, other: bigint) => {
  return mulDivHalfUp(x, PERCENT, other);
};

export const percentDivUp = (x: bigint, other: bigint) => {
  return mulDivUp(x, PERCENT, other);
};

export const percentDivDown = (x: bigint, other: bigint) => {
  return mulDivDown(x, PERCENT, other);
};

export const percentAvg = (x: bigint, other: bigint, percent: bigint) => {
  return avgHalfUp(x, other, percent, PERCENT);
};

export const percentPow = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, PERCENT, mulDivHalfUp);
};

export const percentPowUp = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, PERCENT, mulDivUp);
};

export const percentPowDown = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, PERCENT, mulDivDown);
};

export const percentExpN = (x: bigint, N: bigint) => {
  return expN(x, N, PERCENT, mulDivDown);
};

export const percentSqrt = (x: bigint) => {
  return sqrt(x, PERCENT);
};

export const percentToDecimals = (x: bigint, decimals: number) => {
  return toDecimals(x, decimals, 4);
};

export const percentToRay = (x: bigint) => {
  return percentToDecimals(x, 27);
};

export const percentToWad = (x: bigint) => {
  return percentToDecimals(x, 18);
};

export const formatPercent = (x: bigint, digits?: number) => {
  return format(x, 4, digits);
};

export const toPercentFloat = (x: bigint) => {
  return toFloat(x, 4);
};
