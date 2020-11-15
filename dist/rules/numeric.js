export const numeric = (value) => {
    if (!isNaN(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "numeric" };
};
