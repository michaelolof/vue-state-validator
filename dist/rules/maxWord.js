"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxWord = void 0;
exports.maxWord = (maximum) => (value) => {
    const words = (value + "").trim().split(" ").filter(n => n.length > 0);
    if (maximum >= words.length)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "maxWord" };
};
