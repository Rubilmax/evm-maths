import { pow10 } from "./utils";

export const PERCENT = pow10(4);
export const WAD = pow10(18);
export const RAY = pow10(27);
export const WAD_SQUARED = WAD.pow(2);

export const HALF_PERCENT = PERCENT.div(2);
export const HALF_WAD = WAD.div(2);
export const HALF_RAY = RAY.div(2);
