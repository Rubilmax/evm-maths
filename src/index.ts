import { BigNumberish } from "ethers";

import "./prototype";

declare module "ethers" {
  interface BigNumber {
    min: (other: BigNumberish, ...others: BigNumberish[]) => BigNumber;
    max: (other: BigNumberish, ...others: BigNumberish[]) => BigNumber;
    sum: (others: BigNumberish[]) => BigNumber;
    format: (decimals?: number, digits?: number) => string;
    toFloat: (decimals?: number) => number;

    compMul: (other: BigNumberish) => BigNumber;
    compDiv: (other: BigNumberish) => BigNumber;

    percentAdd: (pct: BigNumberish) => BigNumber;
    percentSub: (pct: BigNumberish) => BigNumber;
    percentMul: (other: BigNumberish) => BigNumber;
    percentMulUp: (other: BigNumberish) => BigNumber;
    percentMulDown: (other: BigNumberish) => BigNumber;
    percentDiv: (other: BigNumberish) => BigNumber;
    percentDivUp: (other: BigNumberish) => BigNumber;
    percentDivDown: (other: BigNumberish) => BigNumber;
    percentAvg: (other: BigNumberish, pct: BigNumberish) => BigNumber;
    percentPow: (exponent: BigNumberish) => BigNumber;
    percentToDecimals: (decimals: number) => BigNumber;
    percentToWad: () => BigNumber;
    percentToRay: () => BigNumber;
    formatPercent: (digits?: number) => string;
    toPercentFloat: () => number;

    wadAdd: (wad: BigNumberish) => BigNumber;
    wadSub: (wad: BigNumberish) => BigNumber;
    wadMul: (other: BigNumberish) => BigNumber;
    wadMulUp: (other: BigNumberish) => BigNumber;
    wadMulDown: (other: BigNumberish) => BigNumber;
    wadDiv: (other: BigNumberish) => BigNumber;
    wadDivUp: (other: BigNumberish) => BigNumber;
    wadDivDown: (other: BigNumberish) => BigNumber;
    wadAvg: (other: BigNumberish, wad: BigNumberish) => BigNumber;
    wadPow: (exponent: BigNumberish) => BigNumber;
    wadToDecimals: (decimals: number) => BigNumber;
    wadToPercent: () => BigNumber;
    wadToRay: () => BigNumber;
    formatWad: (digits?: number) => string;
    toWadFloat: () => number;

    rayAdd: (ray: BigNumberish) => BigNumber;
    raySub: (ray: BigNumberish) => BigNumber;
    rayMul: (other: BigNumberish) => BigNumber;
    rayMulUp: (other: BigNumberish) => BigNumber;
    rayMulDown: (other: BigNumberish) => BigNumber;
    rayDiv: (other: BigNumberish) => BigNumber;
    rayDivUp: (other: BigNumberish) => BigNumber;
    rayDivDown: (other: BigNumberish) => BigNumber;
    rayAvg: (other: BigNumberish, ray: BigNumberish) => BigNumber;
    rayPow: (exponent: BigNumberish) => BigNumber;
    rayToDecimals: (decimals: number) => BigNumber;
    rayToPercent: () => BigNumber;
    rayToWad: () => BigNumber;
    formatRay: (digits?: number) => string;
    toRayFloat: () => number;
  }

  namespace BigNumber {
    let PERCENT: BigNumber;
    let HALF_PERCENT: BigNumber;
    let WAD: BigNumber;
    let HALF_WAD: BigNumber;
    let RAY: BigNumber;
    let HALF_RAY: BigNumber;

    let min: (other: BigNumberish, ...others: BigNumberish[]) => BigNumber;
    let max: (other: BigNumberish, ...others: BigNumberish[]) => BigNumber;
    let sum: (others: BigNumberish[]) => BigNumber;

    let pow10: (power: BigNumberish) => BigNumber;
    let parsePercent: (value: string) => BigNumber;
    let parseWad: (value: string) => BigNumber;
    let parseRay: (value: string) => BigNumber;
  }
}
