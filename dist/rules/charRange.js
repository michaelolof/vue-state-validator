import { minChar } from "./minChar";
import { maxChar } from "./maxChar";
export const charRange = (minimum, maximum) => (value) => {
    const smallEnough = (val) => minChar(minimum)(value).isValid;
    const bigEnough = (val) => maxChar(maximum)(value).isValid;
    if ((smallEnough(value) && bigEnough(value)))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "charRange" };
};
