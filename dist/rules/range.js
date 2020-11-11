"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
var max_1 = require("./max");
var min_1 = require("./min");
var required_1 = require("./required");
exports.range = function (minimum, maximum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    var tooSmall = min_1.min(minimum)(value);
    if (tooSmall.hasError)
        return { hasError: tooSmall.hasError, validator: "range" };
    var tooBig = max_1.max(maximum)(value);
    if (tooBig.hasError)
        return { hasError: tooBig.hasError, validator: "range" };
    return valid;
}; };
//# sourceMappingURL=range.js.map