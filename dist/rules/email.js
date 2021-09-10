"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
exports.email = function (value) {
    var isEmail = function () { return /.+@.+/.test(value); };
    if (isEmail())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "email" };
};
