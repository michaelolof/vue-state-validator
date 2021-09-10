"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordRange = void 0;
var maxWord_1 = require("./maxWord");
var minWord_1 = require("./minWord");
exports.wordRange = function (minimum, maximum) { return function (value) {
    var smallEnough = function () { return minWord_1.minWord(minimum)(value).isValid; };
    var bigEnough = function () { return maxWord_1.maxWord(maximum)(value).isValid; };
    if (smallEnough() && bigEnough())
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "wordRange" };
}; };
