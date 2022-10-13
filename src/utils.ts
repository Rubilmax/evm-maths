import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

export const pow10 = (power: BigNumberish) => BigNumber.from(10).pow(power);

export const min = (x: BigNumberish, y: BigNumberish) => {
  x = BigNumber.from(x);
  y = BigNumber.from(y);

  return x.gt(y) ? y : x;
};

export const max = (x: BigNumberish, y: BigNumberish) => {
  x = BigNumber.from(x);
  y = BigNumber.from(y);

  return x.gt(y) ? x : y;
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
