"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charRange = void 0;
var minChar_1 = require("./minChar");
var maxChar_1 = require("./maxChar");
exports.charRange = function (minimum, maximum) { return function (value) {
    var smallEnough = function (val) { return minChar_1.minChar(minimum)(value).isValid; };
    var bigEnough = function (val) { return maxChar_1.maxChar(maximum)(value).isValid; };
    if ((smallEnough(value) && bigEnough(value)))
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "charRange" };
}; };
