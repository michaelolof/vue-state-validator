"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
exports.match = function (compare) { return function (value) {
    try {
        if (((value + "").match(compare) || []).length > 0) {
            return {
                isValid: true,
                rule: undefined,
            };
        }
        else
            return { isValid: false, rule: "match" };
    }
    catch (err) {
        throw err;
    }
}; };
