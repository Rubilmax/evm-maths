import { pow10 } from "./utils";

export const PERCENT = pow10(4n);
export const WAD = pow10(18n);
export const RAY = pow10(27n);
export const WAD_SQUARED = WAD ** 2n;

export const HALF_PERCENT = PERCENT / 2n;
export const HALF_WAD = WAD / 2n;
export const HALF_RAY = RAY / 2n;
