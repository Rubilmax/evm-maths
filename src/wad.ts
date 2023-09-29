import { BigNumberish, parseUnits, toBigInt } from "ethers";
import { WAD } from "./constants";
import { avgHalfUp, expN, mulDivDown, mulDivHalfUp, mulDivUp, pow } from "./utils";
import { format, toDecimals, toFloat } from "./format";

export const parseWad = (value: string) => parseUnits(value, 18);

export const wadAdd = (x: BigNumberish, wad: BigNumberish) => {
  return wadMul(x, WAD + toBigInt(wad));
};

export const wadSub = (x: BigNumberish, wad: BigNumberish) => {
  return wadMul(x, WAD - toBigInt(wad));
};

export const wadMul = (x: BigNumberish, other: BigNumberish) => {
  return mulDivHalfUp(x, other, WAD);
};

export const wadMulUp = (x: BigNumberish, other: BigNumberish) => {
  return mulDivUp(x, other, WAD);
};

export const wadMulDown = (x: BigNumberish, other: BigNumberish) => {
  return mulDivDown(x, other, WAD);
};

export const wadDiv = (x: BigNumberish, other: BigNumberish) => {
  return mulDivHalfUp(x, WAD, other);
};

export const wadDivUp = (x: BigNumberish, other: BigNumberish) => {
  return mulDivUp(x, WAD, other);
};

export const wadDivDown = (x: BigNumberish, other: BigNumberish) => {
  return mulDivDown(x, WAD, other);
};

export const wadAvg = (x: BigNumberish, other: BigNumberish, wad: BigNumberish) => {
  return avgHalfUp(x, other, wad, WAD);
};

export const wadPow = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, WAD, mulDivHalfUp);
};

export const wadPowUp = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, WAD, mulDivUp);
};

export const wadPowDown = (x: BigNumberish, exponent: BigNumberish) => {
  return pow(x, exponent, WAD, mulDivDown);
};

export const wadExpN = (x: BigNumberish, N: BigNumberish) => {
  return expN(x, N, WAD, mulDivDown);
};

export const wadToDecimals = (x: BigNumberish, decimals: number) => {
  return toDecimals(x, decimals, 18);
};

export const wadToPercent = (x: BigNumberish) => {
  return wadToDecimals(x, 4);
};

export const wadToRay = (x: BigNumberish) => {
  return wadToDecimals(x, 27);
};

export const formatWad = (x: BigNumberish, digits?: number) => {
  return format(x, 18, digits);
};

export const toWadFloat = (x: BigNumberish) => {
  return toFloat(x, 18);
};
