"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
var required_1 = require("./required");
exports.match = function (compare) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    if (compare !== value)
        return {
            hasError: true,
            validator: "match",
        };
    return valid;
}; };
//# sourceMappingURL=match.js.map