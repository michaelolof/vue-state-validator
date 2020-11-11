"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charRange = void 0;
var required_1 = require("./required");
var minChar_1 = require("./minChar");
var maxChar_1 = require("./maxChar");
exports.charRange = function (minimum, maximum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    var tooSmall = minChar_1.minChar(minimum)(value);
    if (tooSmall.hasError)
        return { hasError: tooSmall.hasError, validator: "charRange" };
    var tooBig = maxChar_1.maxChar(maximum)(value);
    if (tooBig.hasError)
        return { hasError: tooBig.hasError, validator: "charRange" };
    return valid;
}; };
//# sourceMappingURL=charRange.js.map