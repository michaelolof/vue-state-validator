export const email = (value) => {
    const isEmail = () => /.+@.+/.test(value);
    if (isEmail())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "email" };
};
