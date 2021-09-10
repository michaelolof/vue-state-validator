"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
var max_1 = require("./max");
var min_1 = require("./min");
exports.range = function (minimum, maximum) { return function (value) {
    var smallEnough = function (val) { return min_1.min(minimum)(value).isValid; };
    var bigEnough = function (val) { return max_1.max(maximum)(value).isValid; };
    if ((smallEnough(value) && bigEnough(value)))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "range" };
}; };
