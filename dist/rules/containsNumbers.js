export const containsNumber = (size) => (value) => {
    const numbersFound = () => {
        let found = 0;
        for (let char of (value) + "") {
            const charIsNumber = isNaN(char) === false;
            if (charIsNumber)
                found++;
        }
        return found;
    };
    if (numbersFound() >= size)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "containsNumber" };
};
