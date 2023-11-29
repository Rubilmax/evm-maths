import { pow10 } from "./utils";

export const format = (x: bigint, decimals: number = 18, digits?: number) => {
  decimals = Math.floor(decimals);
  digits = Math.floor(digits ?? decimals);

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

export const toFloat = (x: bigint, decimals?: number) => {
  return parseFloat(format(x, decimals));
};

export const toDecimals = (x: bigint, decimals: number, scaleDecimals: number) => {
  if (decimals <= scaleDecimals) {
    const ratio = pow10(BigInt(Math.floor(scaleDecimals - decimals)));

    return (x + ratio / 2n) / ratio;
  }

  return x * pow10(BigInt(Math.floor(decimals - scaleDecimals)));
};
