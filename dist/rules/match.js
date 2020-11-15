export const match = (compare) => (value) => {
    if (compare === value)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "match" };
};
