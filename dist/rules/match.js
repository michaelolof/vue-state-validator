export const match = (compare) => (value) => {
    if (!(compare instanceof RegExp))
        throw new Error("The compare parameter in the match rule must be regex");
    if ((value + "").match(compare)) {
        return {
            isValid: true,
            rule: undefined,
        };
    }
    else
        return { isValid: false, rule: "match" };
};
