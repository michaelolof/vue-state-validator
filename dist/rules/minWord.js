"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minWord = void 0;
exports.minWord = (minimum) => (value) => {
    const words = (value + "").trim().split(" ").filter(n => n.length > 0);
    if (minimum <= words.length)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "minWord" };
};
