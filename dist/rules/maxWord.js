"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxWord = void 0;
var required_1 = require("./required");
exports.maxWord = function (maximum) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    var words = (value + "").trim().split(" ").filter(function (n) { return n.length > 0; });
    if (words.length > maximum)
        return {
            hasError: true,
            validator: "maxWord",
        };
    return valid;
}; };
//# sourceMappingURL=maxWord.js.map