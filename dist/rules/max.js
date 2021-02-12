"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
const index_1 = require("./index");
exports.max = (maximum) => (value) => {
    if (maximum >= index_1.comparisonValue(value))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "max" };
};
