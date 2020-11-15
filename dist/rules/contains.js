export const contains = (content) => (value) => {
    const isContain = (val) => (val + "").includes(content);
    if (isContain(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "contains" };
};
