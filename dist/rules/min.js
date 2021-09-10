"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = void 0;
var index_1 = require("./index");
exports.min = function (minimum) { return function (value) {
    if (minimum <= index_1.comparisonValue(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "min" };
}; };
