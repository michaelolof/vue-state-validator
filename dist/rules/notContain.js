"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notContain = void 0;
const contains_1 = require("./contains");
exports.notContain = (content) => (value) => {
    if (contains_1.contains(content)(value).isValid === false)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "notContain" };
};
