"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
exports.contains = function (content) { return function (value) {
    var isContain = function (val) { return (val + "").includes(content); };
    if (isContain(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "contains" };
}; };
