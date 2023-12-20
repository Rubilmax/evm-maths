import { pow10 } from "./utils";

export const format = (x: bigint, decimals: number | bigint = 18, digits?: number | bigint) => {
  decimals = Math.floor(Number(decimals));
  digits = Math.floor(Number(digits ?? decimals));

  if (decimals === 0) return x.toString();

  let negative = "";
  if (x < 0n) {
    negative = "-";
    x *= -1n;
  }

  const abs = x.toString().padStart(decimals + 1, "0");

  const length = abs.length;
  const dotIndex = length - decimals;

  let full = negative + abs.substring(0, dotIndex);
  if (digits > 0) full += "." + abs.substring(dotIndex, dotIndex + digits).padEnd(digits, "0");

  return full;
};

export const toFloat = (x: bigint, decimals?: number | bigint) => {
  return parseFloat(format(x, decimals));
};

export const toDecimals = (
  x: bigint,
  decimals: number | bigint,
  scaleDecimals: number | bigint,
) => {
  if (decimals <= scaleDecimals) {
    const ratio = pow10(BigInt(Math.floor(Number(scaleDecimals) - Number(decimals))));

    return (x + ratio / 2n) / ratio;
  }

  return x * pow10(BigInt(Math.floor(Number(decimals) - Number(scaleDecimals))));
};
