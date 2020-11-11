"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxChar = void 0;
var required_1 = require("./required");
exports.maxChar = function (maximum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    value = value + "";
    if (value.length > maximum)
        return {
            hasError: true,
            validator: "maxChar",
        };
    return valid;
}; };
//# sourceMappingURL=maxChar.js.map