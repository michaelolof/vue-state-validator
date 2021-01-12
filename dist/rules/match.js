export const match = (compare) => (value) => {
    if (compare instanceof RegExp && (value + "").match(compare)) {
        return {
            isValid: true,
            rule: undefined,
        };
    }
    // else if(compare === value) return {
    //   isValid: true,
    //   rule: undefined,
    // }
    else
        return { isValid: false, rule: "match" };
};
