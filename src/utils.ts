import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";

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

export const mulDivUp = (x: BigNumberish, y: BigNumberish, scale: BigNumberish) => {
  x = BigNumber.from(x);
  y = BigNumber.from(y);
  scale = BigNumber.from(scale);
  if (x.eq(0) || y.eq(0)) return BigNumber.from(0);

  return x.mul(y).add(scale.div(2)).div(scale);
};

export const avgUp = (x: BigNumberish, y: BigNumberish, pct: BigNumberish, scale: BigNumberish) => {
  scale = BigNumber.from(scale);

  return max(0, scale.sub(pct)).mul(x).add(min(scale, pct).mul(y)).add(scale.div(2)).div(scale);
};

export const parsePercent = (value: string) => parseUnits(value, 2);
export const parseWad = (value: string) => parseUnits(value, 18);
export const parseRay = (value: string) => parseUnits(value, 27);
