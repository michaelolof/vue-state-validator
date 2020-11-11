"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minChar = void 0;
var required_1 = require("./required");
exports.minChar = function (minimum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    value = value + "";
    if (value.length < minimum)
        return {
            hasError: true,
            validator: "minChar",
        };
    return valid;
}; };
//# sourceMappingURL=minChar.js.map