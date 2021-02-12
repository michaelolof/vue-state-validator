"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = void 0;
exports.numeric = (value) => {
    if (!isNaN(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "numeric" };
};
