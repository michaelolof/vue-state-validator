"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var required_1 = require("./required");
exports.contains = function (content) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    value = value + "";
    if (value.includes(content) === false)
        return {
            hasError: true,
            validator: "contains",
        };
    return valid;
}; };
//# sourceMappingURL=contains.js.map