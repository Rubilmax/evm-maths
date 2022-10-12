import { BigNumberish } from "ethers";

import { mulDivUp, pow10 } from "./utils";

export const RAY = pow10(27);

const RayMath = {
  RAY,
  mul: (x: BigNumberish, y: BigNumberish) => mulDivUp(x, y, RAY),
  div: (x: BigNumberish, y: BigNumberish) => mulDivUp(x, RAY, y),
};

export default RayMath;
