"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordRange = void 0;
const maxWord_1 = require("./maxWord");
const minWord_1 = require("./minWord");
exports.wordRange = (minimum, maximum) => (value) => {
    const smallEnough = () => minWord_1.minWord(minimum)(value).isValid;
    const bigEnough = () => maxWord_1.maxWord(maximum)(value).isValid;
    if (smallEnough() && bigEnough())
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "wordRange" };
};
