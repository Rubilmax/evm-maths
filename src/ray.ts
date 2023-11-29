import { RAY } from "./constants";
import { avgHalfUp, expN, mulDivDown, mulDivHalfUp, mulDivUp, pow } from "./utils";
import { format, toDecimals, toFloat } from "./format";

export const rayAdd = (x: bigint, ray: bigint) => {
  return rayMul(x, RAY + ray);
};

export const raySub = (x: bigint, ray: bigint) => {
  return rayMul(x, RAY - ray);
};

export const rayMul = (x: bigint, other: bigint) => {
  return mulDivHalfUp(x, other, RAY);
};

export const rayMulUp = (x: bigint, other: bigint) => {
  return mulDivUp(x, other, RAY);
};

export const rayMulDown = (x: bigint, other: bigint) => {
  return mulDivDown(x, other, RAY);
};

export const rayDiv = (x: bigint, other: bigint) => {
  return mulDivHalfUp(x, RAY, other);
};

export const rayDivUp = (x: bigint, other: bigint) => {
  return mulDivUp(x, RAY, other);
};

export const rayDivDown = (x: bigint, other: bigint) => {
  return mulDivDown(x, RAY, other);
};

export const rayAvg = (x: bigint, other: bigint, ray: bigint) => {
  return avgHalfUp(x, other, ray, RAY);
};

export const rayPow = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, RAY, mulDivHalfUp);
};

export const rayPowUp = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, RAY, mulDivUp);
};

export const rayPowDown = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, RAY, mulDivDown);
};

export const rayExpN = (x: bigint, N: bigint) => {
  return expN(x, N, RAY, mulDivDown);
};

export const rayToDecimals = (x: bigint, decimals: number) => {
  return toDecimals(x, decimals, 27);
};

export const rayToPercent = (x: bigint) => {
  return rayToDecimals(x, 4);
};

export const rayToWad = (x: bigint) => {
  return rayToDecimals(x, 18);
};

export const formatRay = (x: bigint, digits?: number) => {
  return format(x, 27, digits);
};

export const toRayFloat = (x: bigint) => {
  return toFloat(x, 27);
};
