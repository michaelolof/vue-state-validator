"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = void 0;
var required_1 = require("./required");
exports.min = function (minimum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    if (value < minimum)
        return {
            hasError: true,
            validator: "min",
        };
    return valid;
}; };
//# sourceMappingURL=min.js.map