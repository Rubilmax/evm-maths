import { BigNumberish, toBigInt } from "ethers";
import { WAD, WAD_SQUARED } from "./constants";

export const compMul = (x: BigNumberish, other: BigNumberish) => {
  return (toBigInt(x) * toBigInt(other)) / WAD;
};

export const compDiv = (x: BigNumberish, other: BigNumberish) => {
  return (toBigInt(x) * WAD_SQUARED) / toBigInt(other) / WAD;
};
