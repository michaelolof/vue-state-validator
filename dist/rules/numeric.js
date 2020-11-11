"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = void 0;
var required_1 = require("./required");
exports.numeric = function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    if (isNaN(value))
        return {
            hasError: true,
            validator: "numeric",
        };
    return valid;
};
//# sourceMappingURL=numeric.js.map