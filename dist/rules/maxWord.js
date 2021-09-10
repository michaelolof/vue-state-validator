"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxWord = void 0;
exports.maxWord = function (maximum) { return function (value) {
    var words = (value + "").trim().split(" ").filter(function (n) { return n.length > 0; });
    if (maximum >= words.length)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "maxWord" };
}; };
