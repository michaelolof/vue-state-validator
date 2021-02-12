"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equal = void 0;
const utils_1 = require("../utils");
exports.equal = (compare) => (value) => {
    if (utils_1.isEqual(compare, value)) {
        return {
            isValid: true,
            rule: undefined,
        };
    }
    else
        return { isValid: false, rule: "equal" };
};
