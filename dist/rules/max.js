import { comparisonValue } from "./index";
export const max = (maximum) => (value) => {
    if (maximum >= comparisonValue(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "max" };
};
