"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsNumber = void 0;
exports.containsNumber = (size) => (value) => {
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
