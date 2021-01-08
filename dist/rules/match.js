export const match = (compare) => (value) => {
    if (compare instanceof RegExp && compare.test(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else if (compare === value)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "match" };
};
