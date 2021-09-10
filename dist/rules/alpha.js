"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alpha = void 0;
exports.alpha = function (value) {
    var isAlpha = function (val) { return /^[A-Za-z]+$/.test(val); };
    if (isAlpha(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "alpha" };
};
