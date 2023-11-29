import { WAD } from "./constants";
import { avgHalfUp, expN, mulDivDown, mulDivHalfUp, mulDivUp, pow } from "./utils";
import { format, toDecimals, toFloat } from "./format";

export const wadAdd = (x: bigint, wad: bigint) => {
  return wadMul(x, WAD + wad);
};

export const wadSub = (x: bigint, wad: bigint) => {
  return wadMul(x, WAD - wad);
};

export const wadMul = (x: bigint, other: bigint) => {
  return mulDivHalfUp(x, other, WAD);
};

export const wadMulUp = (x: bigint, other: bigint) => {
  return mulDivUp(x, other, WAD);
};

export const wadMulDown = (x: bigint, other: bigint) => {
  return mulDivDown(x, other, WAD);
};

export const wadDiv = (x: bigint, other: bigint) => {
  return mulDivHalfUp(x, WAD, other);
};

export const wadDivUp = (x: bigint, other: bigint) => {
  return mulDivUp(x, WAD, other);
};

export const wadDivDown = (x: bigint, other: bigint) => {
  return mulDivDown(x, WAD, other);
};

export const wadAvg = (x: bigint, other: bigint, wad: bigint) => {
  return avgHalfUp(x, other, wad, WAD);
};

export const wadPow = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, WAD, mulDivHalfUp);
};

export const wadPowUp = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, WAD, mulDivUp);
};

export const wadPowDown = (x: bigint, exponent: bigint) => {
  return pow(x, exponent, WAD, mulDivDown);
};

export const wadExpN = (x: bigint, N: bigint) => {
  return expN(x, N, WAD, mulDivDown);
};

export const wadToDecimals = (x: bigint, decimals: number) => {
  return toDecimals(x, decimals, 18);
};

export const wadToPercent = (x: bigint) => {
  return wadToDecimals(x, 4);
};

export const wadToRay = (x: bigint) => {
  return wadToDecimals(x, 27);
};

export const formatWad = (x: bigint, digits?: number) => {
  return format(x, 18, digits);
};

export const toWadFloat = (x: bigint) => {
  return toFloat(x, 18);
};
