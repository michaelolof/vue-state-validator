"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimal = void 0;
exports.decimal = (value) => {
    const isDecimal = () => /^[-]?\d*(\.\d+)?$/.test(value);
    if (isDecimal())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "decimal" };
};
