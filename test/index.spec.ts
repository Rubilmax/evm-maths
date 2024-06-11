import "../src";

const TWO_WAD = BigInt.WAD * 2n;

describe("evm-maths", () => {
  it("should be approximately equal", async () => {
    expect(0n.approxEqAbs(1n, 0n)).toBeFalsy();
    expect(0n.approxEqAbs(1n, 1n)).toBeTruthy();
  });
  it("should return the absolute value", async () => {
    expect(1n.abs()).toEqual(1n);
    expect((-1n).abs()).toEqual(1n);
  });

  it("should return minimum", async () => {
    expect(BigInt.WAD.min(0n)).toEqual(0n);
    expect(BigInt.WAD.min(BigInt.RAY)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.min(BigInt.WAD + 1n, 0n, BigInt.RAY)).toEqual(0n);
    expect(BigInt.min(BigInt.WAD + 1n, 0n, BigInt.RAY)).toEqual(0n);
  });

  it("should return maximum", async () => {
    expect(BigInt.WAD.max(0n)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.max(BigInt.RAY)).toEqual(BigInt.RAY);
    expect(BigInt.WAD.max(BigInt.WAD + 1n, 0n, BigInt.RAY)).toEqual(BigInt.RAY);
    expect(BigInt.max(BigInt.WAD + 1n, 0n, BigInt.RAY)).toEqual(BigInt.RAY);
  });

  it("should average", async () => {
    expect(BigInt.WAD.percentAvg(BigInt.WAD * 3n, BigInt.PERCENT / 2n)).toEqual(TWO_WAD);
    expect(BigInt.WAD.wadAvg(BigInt.WAD * 3n, BigInt.WAD / 2n)).toEqual(TWO_WAD);
    expect(BigInt.WAD.rayAvg(BigInt.WAD * 3n, BigInt.RAY / 2n)).toEqual(TWO_WAD);
  });

  it("should double on addition", async () => {
    expect(BigInt.WAD.percentAdd(BigInt.PERCENT)).toEqual(TWO_WAD);
    expect(BigInt.WAD.wadAdd(BigInt.WAD)).toEqual(TWO_WAD);
    expect(BigInt.WAD.rayAdd(BigInt.RAY)).toEqual(TWO_WAD);
  });

  it("should zero on subtraction", async () => {
    expect(BigInt.WAD.percentSub(BigInt.PERCENT)).toEqual(0n);
    expect(BigInt.WAD.wadSub(BigInt.WAD)).toEqual(0n);
    expect(BigInt.WAD.raySub(BigInt.RAY)).toEqual(0n);
  });

  it("should preserve units on multiplication", async () => {
    expect(BigInt.WAD.percentMul(BigInt.PERCENT)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.compMul(BigInt.WAD)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.wadMul(BigInt.WAD)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.rayMul(BigInt.RAY)).toEqual(BigInt.WAD);
  });

  it("should round half up on multiplication", async () => {
    expect((BigInt.PERCENT - 1n).percentMul(BigInt.PERCENT - 1n)).toEqual(BigInt.PERCENT - 2n);
    expect((BigInt.WAD - 1n).wadMul(BigInt.WAD - 1n)).toEqual(BigInt.WAD - 2n);
    expect((BigInt.RAY - 1n).rayMul(BigInt.RAY - 1n)).toEqual(BigInt.RAY - 2n);
  });

  it("should round up on multiplication", async () => {
    expect((BigInt.PERCENT - 1n).percentMulUp(BigInt.PERCENT - 1n)).toEqual(BigInt.PERCENT - 1n);
    expect((BigInt.WAD - 1n).wadMulUp(BigInt.WAD - 1n)).toEqual(BigInt.WAD - 1n);
    expect((BigInt.RAY - 1n).rayMulUp(BigInt.RAY - 1n)).toEqual(BigInt.RAY - 1n);
  });

  it("should round down on multiplication", async () => {
    expect((BigInt.PERCENT - 1n).percentMulDown(1n)).toEqual(0n);
    expect((BigInt.WAD - 1n).wadMulDown(1n)).toEqual(0n);
    expect((BigInt.RAY - 1n).rayMulDown(1n)).toEqual(0n);
  });

  it("should round half up on division", async () => {
    expect(BigInt.PERCENT.percentDiv(BigInt.PERCENT - 1n)).toEqual(BigInt.PERCENT + 1n);
    expect(BigInt.WAD.wadDiv(BigInt.WAD - 1n)).toEqual(BigInt.WAD + 1n);
    expect(BigInt.RAY.rayDiv(BigInt.RAY - 1n)).toEqual(BigInt.RAY + 1n);
  });

  it("should round up on division", async () => {
    expect(BigInt.PERCENT.percentDivUp(BigInt.PERCENT - 1n)).toEqual(BigInt.PERCENT + 2n);
    expect(BigInt.WAD.wadDivUp(BigInt.WAD - 1n)).toEqual(BigInt.WAD + 2n);
    expect(BigInt.RAY.rayDivUp(BigInt.RAY - 1n)).toEqual(BigInt.RAY + 2n);
  });

  it("should round down on division", async () => {
    expect(BigInt.PERCENT.percentDivDown(BigInt.PERCENT - 1n)).toEqual(BigInt.PERCENT + 1n);
    expect(BigInt.WAD.wadDivDown(BigInt.WAD - 1n)).toEqual(BigInt.WAD + 1n);
    expect(BigInt.RAY.rayDivDown(BigInt.RAY - 1n)).toEqual(BigInt.RAY + 1n);
  });

  it("should preserve units on division", async () => {
    expect(BigInt.WAD.percentDiv(BigInt.PERCENT)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.compDiv(BigInt.WAD)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.wadDiv(BigInt.WAD)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.rayDiv(BigInt.RAY)).toEqual(BigInt.WAD);
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
    expect((BigInt.PERCENT + BigInt.PERCENT).percentPow(2n).formatPercent(1)).toEqual("4.0");
    expect((BigInt.PERCENT + BigInt.PERCENT).percentPow(3n).formatPercent(1)).toEqual("8.0");
    expect((BigInt.WAD + BigInt.WAD).wadPow(2n).formatWad(1)).toEqual("4.0");
    expect((BigInt.WAD + BigInt.WAD).wadPow(3n).formatWad(1)).toEqual("8.0");
    expect((BigInt.RAY + BigInt.RAY).rayPow(2n).formatRay(1)).toEqual("4.0");
    expect((BigInt.RAY + BigInt.RAY).rayPow(3n).formatRay(1)).toEqual("8.0");
  });

  it("should scale decimals", async () => {
    expect(BigInt.PERCENT.percentToWad()).toEqual(BigInt.WAD);
    expect(BigInt.PERCENT.percentToRay()).toEqual(BigInt.RAY);
    expect(BigInt.WAD.wadToPercent()).toEqual(BigInt.PERCENT);
    expect(BigInt.WAD.wadToRay()).toEqual(BigInt.RAY);
    expect(BigInt.RAY.rayToPercent()).toEqual(BigInt.PERCENT);
    expect(BigInt.RAY.rayToWad()).toEqual(BigInt.WAD);
  });

  it("should format with 0 digit", async () => {
    expect(BigInt.WAD.formatWad(0)).toEqual("1");
  });

  it("should calculate sqrt", async () => {
    expect(4n.sqrt()).toEqual(2n);
    expect(5n.sqrt()).toEqual(2n);
    expect((BigInt.PERCENT * 4n).percentSqrt().formatPercent()).toEqual("2.0000");
    expect((BigInt.PERCENT * 5n).percentSqrt().formatPercent()).toEqual("2.2361");
    expect((BigInt.WAD * 4n).wadSqrt().formatWad()).toEqual("2.000000000000000000");
    expect((BigInt.WAD * 5n).wadSqrt().formatWad()).toEqual("2.236067977499789696");
    expect((BigInt.RAY * 4n).raySqrt().formatRay()).toEqual("2.000000000000000000000000000");
    expect((BigInt.RAY * 5n).raySqrt().formatRay()).toEqual("2.236067977499789696409173669");
  });

  it("should calculate expTaylorN", async () => {
    expect(0n.wadExpTaylorN(0n)).toEqual(BigInt.WAD);
    expect(0n.wadExpTaylorN(1n)).toEqual(BigInt.WAD);
    expect(0n.wadExpTaylorN(2n)).toEqual(BigInt.WAD);
    expect(0n.wadExpTaylorN(3n)).toEqual(BigInt.WAD);
    expect(0n.wadExpTaylorN(4n)).toEqual(BigInt.WAD);
    expect(0n.wadExpTaylorN(5n)).toEqual(BigInt.WAD);

    expect(0n.rayExpTaylorN(0n)).toEqual(BigInt.RAY);
    expect(0n.rayExpTaylorN(1n)).toEqual(BigInt.RAY);
    expect(0n.rayExpTaylorN(2n)).toEqual(BigInt.RAY);
    expect(0n.rayExpTaylorN(3n)).toEqual(BigInt.RAY);
    expect(0n.rayExpTaylorN(4n)).toEqual(BigInt.RAY);
    expect(0n.rayExpTaylorN(5n)).toEqual(BigInt.RAY);

    expect(0n.percentExpTaylorN(0n)).toEqual(BigInt.PERCENT);
    expect(0n.percentExpTaylorN(1n)).toEqual(BigInt.PERCENT);
    expect(0n.percentExpTaylorN(2n)).toEqual(BigInt.PERCENT);
    expect(0n.percentExpTaylorN(3n)).toEqual(BigInt.PERCENT);
    expect(0n.percentExpTaylorN(4n)).toEqual(BigInt.PERCENT);
    expect(0n.percentExpTaylorN(5n)).toEqual(BigInt.PERCENT);

    expect(BigInt.WAD.wadExpTaylorN(0n)).toEqual(BigInt.WAD);
    expect(BigInt.WAD.wadExpTaylorN(1n)).toEqual(2000000000000000000n);
    expect(BigInt.WAD.wadExpTaylorN(2n)).toEqual(2500000000000000000n);
    expect(BigInt.WAD.wadExpTaylorN(3n)).toEqual(2666666666666666666n);
    expect(BigInt.WAD.wadExpTaylorN(4n)).toEqual(2708333333333333332n);
    expect(BigInt.WAD.wadExpTaylorN(5n)).toEqual(2716666666666666665n);
    expect(BigInt.WAD.wadExpTaylorN(10n)).toEqual(2718281801146384475n);

    expect(BigInt.RAY.rayExpTaylorN(0n)).toEqual(BigInt.RAY);
    expect(BigInt.RAY.rayExpTaylorN(1n)).toEqual(2000000000000000000000000000n);
    expect(BigInt.RAY.rayExpTaylorN(2n)).toEqual(2500000000000000000000000000n);
    expect(BigInt.RAY.rayExpTaylorN(3n)).toEqual(2666666666666666666666666666n);
    expect(BigInt.RAY.rayExpTaylorN(4n)).toEqual(2708333333333333333333333332n);
    expect(BigInt.RAY.rayExpTaylorN(5n)).toEqual(2716666666666666666666666665n);
    expect(BigInt.RAY.rayExpTaylorN(10n)).toEqual(2718281801146384479717813046n);

    expect(BigInt.PERCENT.percentExpTaylorN(0n)).toEqual(BigInt.PERCENT);
    expect(BigInt.PERCENT.percentExpTaylorN(1n)).toEqual(20000n);
    expect(BigInt.PERCENT.percentExpTaylorN(2n)).toEqual(25000n);
    expect(BigInt.PERCENT.percentExpTaylorN(3n)).toEqual(26666n);
    expect(BigInt.PERCENT.percentExpTaylorN(4n)).toEqual(27082n);
    expect(BigInt.PERCENT.percentExpTaylorN(5n)).toEqual(27165n);
  });
});
