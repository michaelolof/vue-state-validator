"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integer = void 0;
exports.integer = (value) => {
    const isInteger = () => /(^[0-9]*$)|(^-[0-9]+$)/.test(value);
    if (isInteger())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "integer" };
};
