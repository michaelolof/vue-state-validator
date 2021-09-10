"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integer = void 0;
exports.integer = function (value) {
    var isInteger = function () { return /(^[0-9]*$)|(^-[0-9]+$)/.test(value); };
    if (isInteger())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "integer" };
};
