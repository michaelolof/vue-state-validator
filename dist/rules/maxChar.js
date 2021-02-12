"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxChar = void 0;
exports.maxChar = (maximum) => (value) => {
    const smaller = (val) => (val + "").length <= maximum;
    if (smaller(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "maxChar" };
};
