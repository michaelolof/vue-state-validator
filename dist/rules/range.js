"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const max_1 = require("./max");
const min_1 = require("./min");
exports.range = (minimum, maximum) => (value) => {
    const smallEnough = (val) => min_1.min(minimum)(value).isValid;
    const bigEnough = (val) => max_1.max(maximum)(value).isValid;
    if ((smallEnough(value) && bigEnough(value)))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "range" };
};
