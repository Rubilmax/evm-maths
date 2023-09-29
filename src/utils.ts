import { BigNumberish, toBigInt } from "ethers";

export type MulDiv = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => bigint;

export const pow10 = (power: BigNumberish) => toBigInt(10) ** toBigInt(power);

export const approxEqAbs = (x: BigNumberish, y: BigNumberish, tolerance: BigNumberish = 0) => {
  x = toBigInt(x);
  y = toBigInt(y);
  tolerance = toBigInt(tolerance);

  return abs(y - x) <= tolerance;
};

export const abs = (x: BigNumberish) => {
  x = toBigInt(x);

  return x < 0n ? -x : x;
};

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

export const mulDivHalfUp: MulDiv = (x, y, scale) => {
  x = toBigInt(x);
  y = toBigInt(y);
  scale = toBigInt(scale);
  if (x === 0n || y === 0n) return toBigInt(0);

  return (x * y + scale / 2n) / scale;
};

export const mulDivDown: MulDiv = (x, y, scale) => {
  x = toBigInt(x);
  y = toBigInt(y);
  scale = toBigInt(scale);
  if (x === 0n || y === 0n) return toBigInt(0);

  return (x * y) / scale;
};

export const mulDivUp: MulDiv = (x, y, scale) => {
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
  scale: BigNumberish,
) => {
  x = toBigInt(x);
  y = toBigInt(y);
  pct = toBigInt(pct);
  scale = toBigInt(scale);

  return (max(0, scale - pct) * x + min(scale, pct) * y + scale / 2n) / scale;
};

export const pow = (
  x: BigNumberish,
  exponent: BigNumberish,
  scale: bigint,
  mulDiv: MulDiv = mulDivHalfUp,
): bigint => {
  exponent = toBigInt(exponent);

  if (exponent === 0n) return toBigInt(scale);
  if (exponent === 1n) return toBigInt(x);

  const xSquared = mulDiv(x, x, scale);
  if (exponent % 2n === 0n) return pow(xSquared, exponent / 2n, scale, mulDiv);

  return mulDiv(x, pow(xSquared, (exponent - 1n) / 2n, scale, mulDiv), scale);
};

export const expN = (
  x: BigNumberish,
  N: BigNumberish,
  scale: BigNumberish,
  mulDiv: MulDiv = mulDivDown,
) => {
  x = toBigInt(x);
  scale = toBigInt(scale);
  N = toBigInt(N);

  let res = scale;
  let monomial = scale;
  for (let k = toBigInt(1); k <= N; k++) {
    monomial = mulDiv(monomial, x, k * scale);
    res += monomial;
  }

  return res;
};

export const getConvertToAssets = (
  virtualAssets: BigNumberish,
  virtualShares: BigNumberish,
  mulDiv: MulDiv,
) => {
  virtualAssets = toBigInt(virtualAssets);
  virtualShares = toBigInt(virtualShares);

  return (shares: BigNumberish, totalAssets: BigNumberish, totalShares: BigNumberish) => {
    totalAssets = toBigInt(totalAssets);
    totalShares = toBigInt(totalShares);

    return mulDiv(
      shares,
      totalAssets + (virtualAssets as bigint),
      totalShares + (virtualShares as bigint),
    );
  };
};

export const getConvertToShares = (
  virtualAssets: BigNumberish,
  virtualShares: BigNumberish,
  mulDiv: MulDiv,
) => {
  virtualAssets = toBigInt(virtualAssets);
  virtualShares = toBigInt(virtualShares);

  return (assets: BigNumberish, totalAssets: BigNumberish, totalShares: BigNumberish) => {
    totalAssets = toBigInt(totalAssets);
    totalShares = toBigInt(totalShares);

    return mulDiv(
      assets,
      totalShares + (virtualShares as bigint),
      totalAssets + (virtualAssets as bigint),
    );
  };
};
