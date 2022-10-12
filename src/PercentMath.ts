import { BigNumber, BigNumberish } from "ethers";

import BaseMath from "./BaseMath";
import { mulDivUp } from "./utils";

const BASE_PERCENT = BigNumber.from(100_00);
const HALF_PERCENT = BigNumber.from(50_00);

const mul = (x: BigNumberish, pct: BigNumberish) => mulDivUp(x, pct, BASE_PERCENT);

const div = (x: BigNumberish, pct: BigNumberish) => mulDivUp(x, BASE_PERCENT, pct);

const add = (x: BigNumberish, pct: BigNumberish) => mul(x, BASE_PERCENT.add(pct));

const sub = (x: BigNumberish, pct: BigNumberish) => mul(x, BASE_PERCENT.sub(pct));

const PercentMath = {
  BASE_PERCENT,
  mul,
  div,
  add,
  sub,
  avg: (x: BigNumberish, y: BigNumberish, pct: BigNumberish) =>
    BaseMath.max(0, BASE_PERCENT.sub(pct))
      .mul(x)
      .add(BaseMath.min(BASE_PERCENT, pct).mul(y))
      .add(HALF_PERCENT)
      .div(BASE_PERCENT),
};

export default PercentMath;
