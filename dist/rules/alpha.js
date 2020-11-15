export const alpha = (value) => {
    const isAlpha = (val) => /^[A-Za-z]+$/.test(val);
    if (isAlpha(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "alpha" };
};
