import { BigNumber, BigNumberish, utils } from "ethers";

export const pow10 = (power: BigNumberish) => BigNumber.from(10).pow(power);

export const min = (x: BigNumberish, ...others: BigNumberish[]): BigNumber => {
  x = BigNumber.from(x);

  if (others.length === 0) return x;

  const y = BigNumber.from(others[0]);

  return min(x.gt(y) ? y : x, ...others.slice(1));
};

export const max = (x: BigNumberish, ...others: BigNumberish[]): BigNumber => {
  x = BigNumber.from(x);

  if (others.length === 0) return x;

  const y = BigNumber.from(others[0]);

  return max(x.gt(y) ? x : y, ...others.slice(1));
};

export const sum = (initialValue: BigNumberish, others: BigNumberish[]) => {
  return others.reduce<BigNumber>((acc, val) => acc.add(val), BigNumber.from(initialValue));
};

export const mulDivHalfUp = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = BigNumber.from(x);
  y = BigNumber.from(y);
  scale = BigNumber.from(scale);
  if (x.eq(0) || y.eq(0)) return BigNumber.from(0);

  return x.mul(y).add(scale.div(2)).div(scale);
};

export const mulDivDown = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = BigNumber.from(x);
  y = BigNumber.from(y);
  scale = BigNumber.from(scale);
  if (x.eq(0) || y.eq(0)) return BigNumber.from(0);

  return x.mul(y).div(scale);
};

export const mulDivUp = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = BigNumber.from(x);
  y = BigNumber.from(y);
  scale = BigNumber.from(scale);
  if (x.eq(0) || y.eq(0)) return BigNumber.from(0);

  return x.mul(y).add(scale.sub(1)).div(scale);
};

export const avgHalfUp = (
  x: BigNumberish,
  y: BigNumberish,
  pct: BigNumberish,
  scale: BigNumberish
) => {
  scale = BigNumber.from(scale);

  return max(0, scale.sub(pct)).mul(x).add(min(scale, pct).mul(y)).add(scale.div(2)).div(scale);
};

export const parsePercent = (value: string) => utils.parseUnits(value, 2);
export const parseWad = (value: string) => utils.parseUnits(value, 18);
export const parseRay = (value: string) => utils.parseUnits(value, 27);

export const powHalfUp = (x: BigNumberish, exponent: BigNumberish, scale: BigNumber): BigNumber => {
  exponent = BigNumber.from(exponent);

  if (exponent.eq(0)) return BigNumber.from(scale);
  if (exponent.eq(1)) return BigNumber.from(x);

  const xSquared = mulDivHalfUp(x, x, scale);
  if (exponent.mod(2).eq(0)) return powHalfUp(xSquared, exponent.div(2), scale);

  return mulDivHalfUp(x, powHalfUp(xSquared, exponent.sub(1).div(2), scale), scale);
};
