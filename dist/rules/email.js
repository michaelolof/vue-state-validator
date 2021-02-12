"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
exports.email = (value) => {
    const isEmail = () => /.+@.+/.test(value);
    if (isEmail())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "email" };
};
