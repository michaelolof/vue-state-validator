"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charRange = void 0;
const minChar_1 = require("./minChar");
const maxChar_1 = require("./maxChar");
exports.charRange = (minimum, maximum) => (value) => {
    const smallEnough = (val) => minChar_1.minChar(minimum)(value).isValid;
    const bigEnough = (val) => maxChar_1.maxChar(maximum)(value).isValid;
    if ((smallEnough(value) && bigEnough(value)))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "charRange" };
};
