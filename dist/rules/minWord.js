"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minWord = void 0;
var required_1 = require("./required");
exports.minWord = function (minimum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    var words = (value + "").trim().split(" ").filter(function (n) { return n.length > 0; });
    if (words.length < minimum)
        return {
            hasError: true,
            validator: "minWord",
        };
    return valid;
}; };
//# sourceMappingURL=minWord.js.map