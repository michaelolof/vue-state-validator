"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordRange = void 0;
var maxWord_1 = require("./maxWord");
var minWord_1 = require("./minWord");
var required_1 = require("./required");
exports.wordRange = function (minimum, maximum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    var tooSmall = minWord_1.minWord(minimum)(value);
    if (tooSmall.hasError)
        return { hasError: tooSmall.hasError, validator: "wordRange" };
    var tooBig = maxWord_1.maxWord(maximum)(value);
    if (tooBig.hasError)
        return { hasError: tooBig.hasError, validator: "wordRange" };
    return valid;
}; };
//# sourceMappingURL=wordRange.js.map