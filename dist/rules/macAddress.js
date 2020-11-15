export const macAddress = (value) => {
    const isMac = () => /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value);
    if (isMac())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "macAddress" };
};
