"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.required = void 0;
const utils_1 = require("../utils");
function required(value) {
    if (exports.isEmpty(value) || value == "0")
        return { isValid: false, rule: "required" };
    else
        return { isValid: true, rule: undefined };
}
exports.required = required;
exports.isEmpty = (value) => {
    if (typeof value === "string")
        value = value.trim();
    if (value === undefined || value === null || value.length === 0 || utils_1.objectIsEmpty(value)) {
        return true;
    }
    else
        return false;
};
