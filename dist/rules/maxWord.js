export const maxWord = (maximum) => (value) => {
    const words = (value + "").trim().split(" ").filter(n => n.length > 0);
    if (maximum >= words.length)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "maxWord" };
};
