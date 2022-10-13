import { BigNumber } from "ethers";

import "../src";

describe("ethers-maths", () => {
  it("should overload", async () => {
    BigNumber.from(0).wadMul(1);
  });
});
