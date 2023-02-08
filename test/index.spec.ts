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
    expect(BigNumber.WAD.min(BigNumber.WAD.add(1), 0, BigNumber.RAY).toString()).toEqual("0");
    expect(BigNumber.min(BigNumber.WAD.add(1), 0, BigNumber.RAY).toString()).toEqual("0");
  });

  it("should return maximum", async () => {
    expect(BigNumber.WAD.max(0).toString()).toEqual(WAD);
    expect(BigNumber.WAD.max(BigNumber.RAY).toString()).toEqual(RAY);
    expect(BigNumber.WAD.max(BigNumber.WAD.add(1), 0, BigNumber.RAY).toString()).toEqual(RAY);
    expect(BigNumber.max(BigNumber.WAD.add(1), 0, BigNumber.RAY).toString()).toEqual(RAY);
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

  it("should round half up on multiplication", async () => {
    expect(BigNumber.PERCENT.sub(1).percentMul(BigNumber.PERCENT.sub(1)).toString()).toEqual(
      BigNumber.PERCENT.sub(2).toString()
    );
    expect(BigNumber.WAD.sub(1).wadMul(BigNumber.WAD.sub(1)).toString()).toEqual(
      BigNumber.WAD.sub(2).toString()
    );
    expect(BigNumber.RAY.sub(1).rayMul(BigNumber.RAY.sub(1)).toString()).toEqual(
      BigNumber.RAY.sub(2).toString()
    );
  });

  it("should round up on multiplication", async () => {
    expect(BigNumber.PERCENT.sub(1).percentMulUp(BigNumber.PERCENT.sub(1)).toString()).toEqual(
      BigNumber.PERCENT.sub(1).toString()
    );
    expect(BigNumber.WAD.sub(1).wadMulUp(BigNumber.WAD.sub(1)).toString()).toEqual(
      BigNumber.WAD.sub(1).toString()
    );
    expect(BigNumber.RAY.sub(1).rayMulUp(BigNumber.RAY.sub(1)).toString()).toEqual(
      BigNumber.RAY.sub(1).toString()
    );
  });

  it("should round down on multiplication", async () => {
    expect(BigNumber.PERCENT.sub(1).percentMulDown(1).toString()).toEqual("0");
    expect(BigNumber.WAD.sub(1).wadMulDown(1).toString()).toEqual("0");
    expect(BigNumber.RAY.sub(1).rayMulDown(1).toString()).toEqual("0");
  });

  it("should round half up on division", async () => {
    expect(BigNumber.PERCENT.percentDiv(BigNumber.PERCENT.sub(1)).toString()).toEqual(
      BigNumber.PERCENT.add(1).toString()
    );
    expect(BigNumber.WAD.wadDiv(BigNumber.WAD.sub(1)).toString()).toEqual(
      BigNumber.WAD.add(1).toString()
    );
    expect(BigNumber.RAY.rayDiv(BigNumber.RAY.sub(1)).toString()).toEqual(
      BigNumber.RAY.add(1).toString()
    );
  });

  it("should round up on division", async () => {
    expect(BigNumber.PERCENT.percentDivUp(BigNumber.PERCENT.sub(1)).toString()).toEqual(
      BigNumber.PERCENT.add(2).toString()
    );
    expect(BigNumber.WAD.wadDivUp(BigNumber.WAD.sub(1)).toString()).toEqual(
      BigNumber.WAD.add(2).toString()
    );
    expect(BigNumber.RAY.rayDivUp(BigNumber.RAY.sub(1)).toString()).toEqual(
      BigNumber.RAY.add(2).toString()
    );
  });

  it("should round down on division", async () => {
    expect(BigNumber.PERCENT.percentDivDown(BigNumber.PERCENT.sub(1)).toString()).toEqual(
      BigNumber.PERCENT.add(1).toString()
    );
    expect(BigNumber.WAD.wadDivDown(BigNumber.WAD.sub(1)).toString()).toEqual(
      BigNumber.WAD.add(1).toString()
    );
    expect(BigNumber.RAY.rayDivDown(BigNumber.RAY.sub(1)).toString()).toEqual(
      BigNumber.RAY.add(1).toString()
    );
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

  it("should raise to the power of n", async () => {
    expect(BigNumber.PERCENT.add(BigNumber.PERCENT).percentPow(2).formatPercent(1)).toEqual("4.0");
    expect(BigNumber.PERCENT.add(BigNumber.PERCENT).percentPow(3).formatPercent(1)).toEqual("8.0");
    expect(BigNumber.WAD.add(BigNumber.WAD).wadPow(2).formatWad(1)).toEqual("4.0");
    expect(BigNumber.WAD.add(BigNumber.WAD).wadPow(3).formatWad(1)).toEqual("8.0");
    expect(BigNumber.RAY.add(BigNumber.RAY).rayPow(2).formatRay(1)).toEqual("4.0");
    expect(BigNumber.RAY.add(BigNumber.RAY).rayPow(3).formatRay(1)).toEqual("8.0");
  });

  it("should scale decimals", async () => {
    expect(BigNumber.PERCENT.percentToWad().toString()).toEqual(BigNumber.WAD.toString());
    expect(BigNumber.PERCENT.percentToRay().toString()).toEqual(BigNumber.RAY.toString());
    expect(BigNumber.WAD.wadToPercent().toString()).toEqual(BigNumber.PERCENT.toString());
    expect(BigNumber.WAD.wadToRay().toString()).toEqual(BigNumber.RAY.toString());
    expect(BigNumber.RAY.rayToPercent().toString()).toEqual(BigNumber.PERCENT.toString());
    expect(BigNumber.RAY.rayToWad().toString()).toEqual(BigNumber.WAD.toString());
  });
});
