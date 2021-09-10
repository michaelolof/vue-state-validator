"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notContain = void 0;
var contains_1 = require("./contains");
exports.notContain = function (content) { return function (value) {
    if (contains_1.contains(content)(value).isValid === false)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "notContain" };
}; };
