import { BigNumber } from "@ethersproject/bignumber";

import "../src";

const ZERO = "0";
const WAD = BigNumber.WAD.toString();
const RAY = BigNumber.RAY.toString();

const TWO_WAD = BigNumber.WAD.mul(2).toString();

describe("ethers-maths", () => {
  it("should return minimum", async () => {
    expect(BigNumber.WAD.min(0).toString()).toEqual(ZERO);
    expect(BigNumber.WAD.min(BigNumber.RAY).toString()).toEqual(WAD);
  });

  it("should return maximum", async () => {
    expect(BigNumber.WAD.max(0).toString()).toEqual(WAD);
    expect(BigNumber.WAD.max(BigNumber.RAY).toString()).toEqual(RAY);
  });

  it("should average", async () => {
    expect(
      BigNumber.WAD.percentAvg(BigNumber.WAD.mul(3), BigNumber.PERCENT.div(2)).toString()
    ).toEqual(TWO_WAD);
    expect(BigNumber.WAD.wadAvg(BigNumber.WAD.mul(3), BigNumber.WAD.div(2)).toString()).toEqual(
      TWO_WAD
    );
    expect(BigNumber.WAD.rayAvg(BigNumber.WAD.mul(3), BigNumber.RAY.div(2)).toString()).toEqual(
      TWO_WAD
    );
  });

  it("should double on addition", async () => {
    expect(BigNumber.WAD.percentAdd(BigNumber.PERCENT).toString()).toEqual(TWO_WAD);
    expect(BigNumber.WAD.wadAdd(BigNumber.WAD).toString()).toEqual(TWO_WAD);
    expect(BigNumber.WAD.rayAdd(BigNumber.RAY).toString()).toEqual(TWO_WAD);
  });

  it("should zero on subtraction", async () => {
    expect(BigNumber.WAD.percentSub(BigNumber.PERCENT).toString()).toEqual(ZERO);
    expect(BigNumber.WAD.wadSub(BigNumber.WAD).toString()).toEqual(ZERO);
    expect(BigNumber.WAD.raySub(BigNumber.RAY).toString()).toEqual(ZERO);
  });

  it("should preserve units on multiplication", async () => {
    expect(BigNumber.WAD.percentMul(BigNumber.PERCENT).toString()).toEqual(WAD);
    expect(BigNumber.WAD.compMul(BigNumber.WAD).toString()).toEqual(WAD);
    expect(BigNumber.WAD.wadMul(BigNumber.WAD).toString()).toEqual(WAD);
    expect(BigNumber.WAD.rayMul(BigNumber.RAY).toString()).toEqual(WAD);
  });

  it("should preserve units on division", async () => {
    expect(BigNumber.WAD.percentDiv(BigNumber.PERCENT).toString()).toEqual(WAD);
    expect(BigNumber.WAD.compDiv(BigNumber.WAD).toString()).toEqual(WAD);
    expect(BigNumber.WAD.wadDiv(BigNumber.WAD).toString()).toEqual(WAD);
    expect(BigNumber.WAD.rayDiv(BigNumber.RAY).toString()).toEqual(WAD);
  });

  it("should format with digits", async () => {
    expect(BigNumber.RAY.format(27, 3)).toEqual("1.000");
    expect(BigNumber.RAY.formatRay(3)).toEqual("1.000");

    expect(BigNumber.WAD.format(18, 5)).toEqual("1.00000");
    expect(BigNumber.WAD.formatWad(5)).toEqual("1.00000");

    expect(BigNumber.PERCENT.format(4, 6)).toEqual("1.000000");
    expect(BigNumber.PERCENT.formatPercent(6)).toEqual("1.000000");
  });
});
