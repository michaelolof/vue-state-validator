export const decimal = (value) => {
    const isDecimal = () => /^[-]?\d*(\.\d+)?$/.test(value);
    if (isDecimal())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "decimal" };
};
