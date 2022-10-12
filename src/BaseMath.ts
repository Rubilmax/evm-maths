import { BigNumber, BigNumberish } from "ethers";

import { pow10 } from "./utils";

const BaseMath = {
  pow10,
  min: (x: BigNumberish, y: BigNumberish) => {
    x = BigNumber.from(x);
    y = BigNumber.from(y);

    return x.gt(y) ? y : x;
  },
  max: (x: BigNumberish, y: BigNumberish) => {
    x = BigNumber.from(x);
    y = BigNumber.from(y);

    return x.gt(y) ? x : y;
  },
};

export default BaseMath;
