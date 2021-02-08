import { isEqual } from "../utils";
export const equal = (compare) => (value) => {
    if (isEqual(compare, value)) {
        return {
            isValid: true,
            rule: undefined,
        };
    }
    else
        return { isValid: false, rule: "equal" };
};
