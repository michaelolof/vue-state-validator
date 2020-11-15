export const maxChar = (maximum) => (value) => {
    const smaller = (val) => (val + "").length <= maximum;
    if (smaller(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "maxChar" };
};
