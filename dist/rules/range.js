import { max } from "./max";
import { min } from "./min";
export const range = (minimum, maximum) => (value) => {
    const smallEnough = (val) => min(minimum)(value).isValid;
    const bigEnough = (val) => max(maximum)(value).isValid;
    if ((smallEnough(value) && bigEnough(value)))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "range" };
};
