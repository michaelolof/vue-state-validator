"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsNumber = void 0;
exports.containsNumber = function (size) { return function (value) {
    var numbersFound = function () {
        var found = 0;
        for (var _i = 0, _a = (value) + ""; _i < _a.length; _i++) {
            var char = _a[_i];
            var charIsNumber = isNaN(char) === false;
            if (charIsNumber)
                found++;
        }
        return found;
    };
    if (numbersFound() >= size)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: "containsNumber" };
}; };
