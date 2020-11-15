export const matchLength = (length) => (value) => {
    const isOfLength = (val) => {
        if (typeof val === "string")
            val = val.trim();
        const l = (Array.isArray(val) || typeof val === "string") ? val.length : (val + "").length;
        return l === length;
    };
    if (isOfLength(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "matchLength" };
};
