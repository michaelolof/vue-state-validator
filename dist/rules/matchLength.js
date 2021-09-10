"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchLength = void 0;
exports.matchLength = function (length) { return function (value) {
    var isOfLength = function (val) {
        if (typeof val === "string")
            val = val.trim();
        var l = (Array.isArray(val) || typeof val === "string") ? val.length : (val + "").length;
        return l === length;
    };
    if (isOfLength(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "matchLength" };
}; };
