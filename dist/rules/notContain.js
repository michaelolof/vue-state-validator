import { contains } from "./contains";
export const notContain = (content) => (value) => {
    if (contains(content)(value).isValid === false)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "notContain" };
};
