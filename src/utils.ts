import { BigNumberish, parseUnits, toBigInt } from "ethers";

export const pow10 = (power: BigNumberish) => toBigInt(10) ** toBigInt(power);

export const min = (x: BigNumberish, ...others: BigNumberish[]): bigint => {
  x = toBigInt(x);

  if (others.length === 0) return x;

  const y = toBigInt(others[0]);

  return min(x > y ? y : x, ...others.slice(1));
};

export const max = (x: BigNumberish, ...others: BigNumberish[]): bigint => {
  x = toBigInt(x);

  if (others.length === 0) return x;

  const y = toBigInt(others[0]);

  return max(x > y ? x : y, ...others.slice(1));
};

export const sum = (initialValue: BigNumberish, others: BigNumberish[]) => {
  return others.reduce<bigint>((acc, val) => acc + toBigInt(val), toBigInt(initialValue));
};

export const mulDivHalfUp = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = toBigInt(x);
  y = toBigInt(y);
  scale = toBigInt(scale);
  if (x === 0n || y === 0n) return toBigInt(0);

  return (x * y + scale / 2n) / scale;
};

export const mulDivDown = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = toBigInt(x);
  y = toBigInt(y);
  scale = toBigInt(scale);
  if (x === 0n || y === 0n) return toBigInt(0);

  return (x * y) / scale;
};

export const mulDivUp = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = toBigInt(x);
  y = toBigInt(y);
  scale = toBigInt(scale);
  if (x === 0n || y === 0n) return toBigInt(0);

  return (x * y + scale - 1n) / scale;
};

export const avgHalfUp = (
  x: BigNumberish,
  y: BigNumberish,
  pct: BigNumberish,
  scale: BigNumberish
) => {
  x = toBigInt(x);
  y = toBigInt(y);
  pct = toBigInt(pct);
  scale = toBigInt(scale);

  return (max(0, scale - pct) * x + min(scale, pct) * y + scale / 2n) / scale;
};

export const parsePercent = (value: string) => parseUnits(value, 2);
export const parseWad = (value: string) => parseUnits(value, 18);
export const parseRay = (value: string) => parseUnits(value, 27);

export const powHalfUp = (x: BigNumberish, exponent: BigNumberish, scale: bigint): bigint => {
  exponent = toBigInt(exponent);

  if (exponent === 0n) return toBigInt(scale);
  if (exponent === 1n) return toBigInt(x);

  const xSquared = mulDivHalfUp(x, x, scale);
  if (exponent % 2n === 0n) return powHalfUp(xSquared, exponent / 2n, scale);

  return mulDivHalfUp(x, powHalfUp(xSquared, (exponent - 1n) / 2n, scale), scale);
};
