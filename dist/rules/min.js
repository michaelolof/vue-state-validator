"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = void 0;
const index_1 = require("./index");
exports.min = (minimum) => (value) => {
    if (minimum <= index_1.comparisonValue(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "min" };
};
