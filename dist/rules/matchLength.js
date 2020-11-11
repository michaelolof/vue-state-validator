"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchLength = void 0;
var required_1 = require("./required");
exports.matchLength = function (length) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    value = value + "";
    if (value.length !== length)
        return {
            hasError: true,
            validator: "matchLength",
        };
    return valid;
}; };
//# sourceMappingURL=matchLength.js.map