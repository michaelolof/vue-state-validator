"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
var required_1 = require("./required");
exports.max = function (maximum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    if (value > maximum)
        return {
            hasError: true,
            validator: "max",
        };
    return valid;
}; };
//# sourceMappingURL=max.js.map