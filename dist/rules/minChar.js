export const minChar = (minimum) => (value) => {
    if ((value + "").length >= minimum)
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "minChar" };
};
