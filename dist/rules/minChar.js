"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minChar = void 0;
exports.minChar = function (minimum) { return function (value) {
    if ((value + "").length >= minimum)
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "minChar" };
}; };
