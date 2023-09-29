import { BigNumberish, formatUnits, toBigInt } from "ethers";
import { pow10 } from "./utils";

export const format = (x: BigNumberish, decimals?: number, digits?: number) => {
  const formatted = formatUnits(x, decimals);

  let dotIndex = formatted.indexOf(".");
  if (dotIndex < 0) dotIndex = formatted.length;

  decimals = formatted.length - 1 - dotIndex;
  digits ??= decimals;

  return digits < decimals
    ? formatted.slice(0, dotIndex + (digits > 0 ? digits + 1 : 0))
    : formatted + "0".repeat(digits - decimals);
};

export const toFloat = (x: BigNumberish, decimals?: number) => {
  return parseFloat(format(x, decimals));
};

export const toDecimals = (x: BigNumberish, decimals: number, scaleDecimals: number) => {
  x = toBigInt(x);

  if (decimals <= scaleDecimals) {
    const ratio = pow10(scaleDecimals - decimals);

    return (x + ratio / 2n) / ratio;
  }

  return x * pow10(decimals - scaleDecimals);
};
