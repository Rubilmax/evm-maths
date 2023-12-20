export type MulDiv = (x: bigint, y: bigint, scale: bigint) => bigint;

export const pow10 = (power: number | bigint) => {
  return 10n ** BigInt(power);
};

export const approxEqAbs = (x: bigint, y: bigint, tolerance: bigint = 0n) => {
  return abs(y - x) <= tolerance;
};

export const abs = (x: bigint) => {
  return x < 0n ? -x : x;
};

export const min = (x: bigint, ...others: bigint[]): bigint => {
  if (others.length === 0) return x;

  const y = others[0];

  return min(x > y ? y : x, ...others.slice(1));
};

export const max = (x: bigint, ...others: bigint[]): bigint => {
  if (others.length === 0) return x;

  const y = others[0];

  return max(x > y ? x : y, ...others.slice(1));
};

export const sum = (initialValue: bigint, others: bigint[]) => {
  return others.reduce<bigint>((acc, val) => acc + val, initialValue);
};

export const mulDivHalfUp: MulDiv = (x, y, scale) => {
  if (x === 0n || y === 0n) return 0n;

  return (x * y + scale / 2n) / scale;
};

export const mulDivDown: MulDiv = (x, y, scale) => {
  if (x === 0n || y === 0n) return 0n;

  return (x * y) / scale;
};

export const mulDivUp: MulDiv = (x, y, scale) => {
  if (x === 0n || y === 0n) return 0n;

  return (x * y + scale - 1n) / scale;
};

export const avgHalfUp = (x: bigint, y: bigint, pct: bigint, scale: bigint) =>
  (max(0n, scale - pct) * x + min(scale, pct) * y + scale / 2n) / scale;

export const pow = (
  x: bigint,
  exponent: bigint,
  scale: bigint,
  mulDiv: MulDiv = mulDivHalfUp,
): bigint => {
  if (exponent === 0n) return scale;
  if (exponent === 1n) return x;

  const xSquared = mulDiv(x, x, scale);
  if (exponent % 2n === 0n) return pow(xSquared, exponent / 2n, scale, mulDiv);

  return mulDiv(x, pow(xSquared, (exponent - 1n) / 2n, scale, mulDiv), scale);
};

export const expN = (x: bigint, N: bigint, scale: bigint, mulDiv: MulDiv = mulDivDown) => {
  let res = scale;
  let monomial = scale;
  for (let k = 1n; k <= N; k++) {
    monomial = mulDiv(monomial, x, k * scale);
    res += monomial;
  }

  return res;
};

export const getConvertToAssets = (
  virtualAssets: bigint,
  virtualShares: bigint,
  mulDiv: MulDiv,
) => {
  return (shares: bigint, totalAssets: bigint, totalShares: bigint) =>
    mulDiv(shares, totalAssets + virtualAssets, totalShares + virtualShares);
};

export const getConvertToShares = (
  virtualAssets: bigint,
  virtualShares: bigint,
  mulDiv: MulDiv,
) => {
  return (assets: bigint, totalAssets: bigint, totalShares: bigint) =>
    mulDiv(assets, totalShares + virtualShares, totalAssets + virtualAssets);
};
