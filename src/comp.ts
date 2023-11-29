import { WAD, WAD_SQUARED } from "./constants";

export const compMul = (x: bigint, other: bigint) => {
  return (x * other) / WAD;
};

export const compDiv = (x: bigint, other: bigint) => {
  return (x * WAD_SQUARED) / other / WAD;
};
