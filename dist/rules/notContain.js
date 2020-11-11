"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notContain = void 0;
var required_1 = require("./required");
exports.notContain = function (content) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    value = value + "";
    if (value.includes(content))
        return {
            hasError: true,
            validator: "notContain",
        };
    return valid;
}; };
//# sourceMappingURL=notContain.js.map