"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxChar = void 0;
exports.maxChar = function (maximum) { return function (value) {
    var smaller = function (val) { return (val + "").length <= maximum; };
    if (smaller(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "maxChar" };
}; };
