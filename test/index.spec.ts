import "../src";

const ZERO = "0";
const WAD = BigInt.WAD.toString();
const RAY = BigInt.RAY.toString();

const TWO_WAD = (BigInt.WAD * 2n).toString();

describe("ethers-maths", () => {
  it("should return minimum", async () => {
    expect(BigInt.WAD.min(0).toString()).toEqual(ZERO);
    expect(BigInt.WAD.min(BigInt.RAY).toString()).toEqual(WAD);
    expect(BigInt.WAD.min(BigInt.WAD + 1n, 0, BigInt.RAY).toString()).toEqual("0");
    expect(BigInt.min(BigInt.WAD + 1n, 0, BigInt.RAY).toString()).toEqual("0");
  });

  it("should return maximum", async () => {
    expect(BigInt.WAD.max(0).toString()).toEqual(WAD);
    expect(BigInt.WAD.max(BigInt.RAY).toString()).toEqual(RAY);
    expect(BigInt.WAD.max(BigInt.WAD + 1n, 0, BigInt.RAY).toString()).toEqual(RAY);
    expect(BigInt.max(BigInt.WAD + 1n, 0, BigInt.RAY).toString()).toEqual(RAY);
  });

  it("should average", async () => {
    expect(BigInt.WAD.percentAvg(BigInt.WAD * 3n, BigInt.PERCENT / 2n).toString()).toEqual(TWO_WAD);
    expect(BigInt.WAD.wadAvg(BigInt.WAD * 3n, BigInt.WAD / 2n).toString()).toEqual(TWO_WAD);
    expect(BigInt.WAD.rayAvg(BigInt.WAD * 3n, BigInt.RAY / 2n).toString()).toEqual(TWO_WAD);
  });

  it("should double on addition", async () => {
    expect(BigInt.WAD.percentAdd(BigInt.PERCENT).toString()).toEqual(TWO_WAD);
    expect(BigInt.WAD.wadAdd(BigInt.WAD).toString()).toEqual(TWO_WAD);
    expect(BigInt.WAD.rayAdd(BigInt.RAY).toString()).toEqual(TWO_WAD);
  });

  it("should zero on subtraction", async () => {
    expect(BigInt.WAD.percentSub(BigInt.PERCENT).toString()).toEqual(ZERO);
    expect(BigInt.WAD.wadSub(BigInt.WAD).toString()).toEqual(ZERO);
    expect(BigInt.WAD.raySub(BigInt.RAY).toString()).toEqual(ZERO);
  });

  it("should preserve units on multiplication", async () => {
    expect(BigInt.WAD.percentMul(BigInt.PERCENT).toString()).toEqual(WAD);
    expect(BigInt.WAD.compMul(BigInt.WAD).toString()).toEqual(WAD);
    expect(BigInt.WAD.wadMul(BigInt.WAD).toString()).toEqual(WAD);
    expect(BigInt.WAD.rayMul(BigInt.RAY).toString()).toEqual(WAD);
  });

  it("should round half up on multiplication", async () => {
    expect((BigInt.PERCENT - 1n).percentMul(BigInt.PERCENT - 1n).toString()).toEqual(
      (BigInt.PERCENT - 2n).toString()
    );
    expect((BigInt.WAD - 1n).wadMul(BigInt.WAD - 1n).toString()).toEqual(
      (BigInt.WAD - 2n).toString()
    );
    expect((BigInt.RAY - 1n).rayMul(BigInt.RAY - 1n).toString()).toEqual(
      (BigInt.RAY - 2n).toString()
    );
  });

  it("should round up on multiplication", async () => {
    expect((BigInt.PERCENT - 1n).percentMulUp(BigInt.PERCENT - 1n).toString()).toEqual(
      (BigInt.PERCENT - 1n).toString()
    );
    expect((BigInt.WAD - 1n).wadMulUp(BigInt.WAD - 1n).toString()).toEqual(
      (BigInt.WAD - 1n).toString()
    );
    expect((BigInt.RAY - 1n).rayMulUp(BigInt.RAY - 1n).toString()).toEqual(
      (BigInt.RAY - 1n).toString()
    );
  });

  it("should round down on multiplication", async () => {
    expect((BigInt.PERCENT - 1n).percentMulDown(1).toString()).toEqual("0");
    expect((BigInt.WAD - 1n).wadMulDown(1).toString()).toEqual("0");
    expect((BigInt.RAY - 1n).rayMulDown(1).toString()).toEqual("0");
  });

  it("should round half up on division", async () => {
    expect(BigInt.PERCENT.percentDiv(BigInt.PERCENT - 1n).toString()).toEqual(
      (BigInt.PERCENT + 1n).toString()
    );
    expect(BigInt.WAD.wadDiv(BigInt.WAD - 1n).toString()).toEqual((BigInt.WAD + 1n).toString());
    expect(BigInt.RAY.rayDiv(BigInt.RAY - 1n).toString()).toEqual((BigInt.RAY + 1n).toString());
  });

  it("should round up on division", async () => {
    expect(BigInt.PERCENT.percentDivUp(BigInt.PERCENT - 1n).toString()).toEqual(
      (BigInt.PERCENT + 2n).toString()
    );
    expect(BigInt.WAD.wadDivUp(BigInt.WAD - 1n).toString()).toEqual((BigInt.WAD + 2n).toString());
    expect(BigInt.RAY.rayDivUp(BigInt.RAY - 1n).toString()).toEqual((BigInt.RAY + 2n).toString());
  });

  it("should round down on division", async () => {
    expect(BigInt.PERCENT.percentDivDown(BigInt.PERCENT - 1n).toString()).toEqual(
      (BigInt.PERCENT + 1n).toString()
    );
    expect(BigInt.WAD.wadDivDown(BigInt.WAD - 1n).toString()).toEqual((BigInt.WAD + 1n).toString());
    expect(BigInt.RAY.rayDivDown(BigInt.RAY - 1n).toString()).toEqual((BigInt.RAY + 1n).toString());
  });

  it("should preserve units on division", async () => {
    expect(BigInt.WAD.percentDiv(BigInt.PERCENT).toString()).toEqual(WAD);
    expect(BigInt.WAD.compDiv(BigInt.WAD).toString()).toEqual(WAD);
    expect(BigInt.WAD.wadDiv(BigInt.WAD).toString()).toEqual(WAD);
    expect(BigInt.WAD.rayDiv(BigInt.RAY).toString()).toEqual(WAD);
  });

  it("should format with digits", async () => {
    expect(BigInt.RAY.format(27, 3)).toEqual("1.000");
    expect(BigInt.RAY.formatRay(3)).toEqual("1.000");

    expect(BigInt.WAD.format(18, 5)).toEqual("1.00000");
    expect(BigInt.WAD.formatWad(5)).toEqual("1.00000");

    expect(BigInt.PERCENT.format(4, 6)).toEqual("1.000000");
    expect(BigInt.PERCENT.formatPercent(6)).toEqual("1.000000");
  });

  it("should raise to the power of n", async () => {
    expect((BigInt.PERCENT + BigInt.PERCENT).percentPow(2).formatPercent(1)).toEqual("4.0");
    expect((BigInt.PERCENT + BigInt.PERCENT).percentPow(3).formatPercent(1)).toEqual("8.0");
    expect((BigInt.WAD + BigInt.WAD).wadPow(2).formatWad(1)).toEqual("4.0");
    expect((BigInt.WAD + BigInt.WAD).wadPow(3).formatWad(1)).toEqual("8.0");
    expect((BigInt.RAY + BigInt.RAY).rayPow(2).formatRay(1)).toEqual("4.0");
    expect((BigInt.RAY + BigInt.RAY).rayPow(3).formatRay(1)).toEqual("8.0");
  });

  it("should scale decimals", async () => {
    expect(BigInt.PERCENT.percentToWad().toString()).toEqual(BigInt.WAD.toString());
    expect(BigInt.PERCENT.percentToRay().toString()).toEqual(BigInt.RAY.toString());
    expect(BigInt.WAD.wadToPercent().toString()).toEqual(BigInt.PERCENT.toString());
    expect(BigInt.WAD.wadToRay().toString()).toEqual(BigInt.RAY.toString());
    expect(BigInt.RAY.rayToPercent().toString()).toEqual(BigInt.PERCENT.toString());
    expect(BigInt.RAY.rayToWad().toString()).toEqual(BigInt.WAD.toString());
  });

  it("should format with 0 digit", async () => {
    expect(BigInt.WAD.formatWad(0)).toEqual("1");
  });
});
