"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
exports.match = (compare) => (value) => {
    if (!(compare instanceof RegExp))
        throw new Error("The compare parameter in the match rule must be regex");
    if (((value + "").match(compare) || []).length > 0) {
        return {
            isValid: true,
            rule: undefined,
        };
    }
    else
        return { isValid: false, rule: "match" };
};
