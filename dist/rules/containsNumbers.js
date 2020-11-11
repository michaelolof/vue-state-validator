"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsNumbers = void 0;
var required_1 = require("./required");
exports.containsNumbers = function (size) { return function (value) {
    var valid = { hasError: false, validator: undefined };
    var notRequired = required_1.required(value).hasError;
    if (notRequired)
        return valid;
    var numbersFound = 0;
    for (var _i = 0, _a = (value) + ""; _i < _a.length; _i++) {
        var char = _a[_i];
        var charIsNumber = isNaN(char) === false;
        if (charIsNumber)
            numbersFound++;
    }
    if (numbersFound < size)
        return {
            hasError: true,
            validator: "containsNumbers",
        };
    return valid;
}; };
//# sourceMappingURL=containsNumbers.js.map