import { BigNumberish, parseUnits, toBigInt } from "ethers";
import { RAY } from "./constants";
import { avgHalfUp, expN, mulDivDown, mulDivHalfUp, mulDivUp, pow } from "./utils";
import { format, toDecimals, toFloat } from "./format";

export const parseRay = (value: string) => parseUnits(value, 27);

export const rayAdd = (x: BigNumberish, ray: BigNumberish) => {
  return rayMul(x, RAY + toBigInt(ray));
};

export const raySub = (x: BigNumberish, ray: BigNumberish) => {
  return rayMul(x, RAY - toBigInt(ray));
};

export const rayMul = (x: BigNumberish, other: BigNumberish) => {
  return mulDivHalfUp(x, other, RAY);
};

export const rayMulUp = (x: BigNumberish, other: BigNumberish) => {
  return mulDivUp(x, other, RAY);
};

export const rayMulDown = (x: BigNumberish, other: BigNumberish) => {
  return mulDivDown(x, other, RAY);
};

export const rayDiv = (x: BigNumberish, other: BigNumberish) => {
  return mulDivHalfUp(x, RAY, other);
};

export const rayDivUp = (x: BigNumberish, other: BigNumberish) => {
  return mulDivUp(x, RAY, other);
};

export const rayDivDown = (x: BigNumberish, other: BigNumberish) => {
  return mulDivDown(x, RAY, other);
};

export const rayAvg = (x: BigNumberish, other: BigNumberish, ray: BigNumberish) => {
  return avgHalfUp(x, other, ray, RAY);
};

export const rayPow = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, RAY, mulDivHalfUp);
};

export const rayPowUp = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, RAY, mulDivUp);
};

export const rayPowDown = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, RAY, mulDivDown);
};

export const rayExpN = (x: BigNumberish, N: BigNumberish) => {
  return expN(x, N, RAY, mulDivDown);
};

export const rayToDecimals = (x: BigNumberish, decimals: number) => {
  return toDecimals(x, decimals, 27);
};

export const rayToPercent = (x: BigNumberish) => {
  return rayToDecimals(x, 4);
};

export const rayToWad = (x: BigNumberish) => {
  return rayToDecimals(x, 18);
};

export const formatRay = (x: BigNumberish, digits?: number) => {
  return format(x, 27, digits);
};

export const toRayFloat = (x: BigNumberish) => {
  return toFloat(x, 27);
};
