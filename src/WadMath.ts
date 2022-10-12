import { BigNumberish } from "ethers";

import { mulDivUp, pow10 } from "./utils";

export const WAD = pow10(18);

const WadMath = {
  WAD,
  mul: (x: BigNumberish, y: BigNumberish) => mulDivUp(x, y, WAD),
  div: (x: BigNumberish, y: BigNumberish) => mulDivUp(x, WAD, y),
};

export default WadMath;
