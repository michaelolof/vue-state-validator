"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
exports.required = function (value) {
    var hasError = false;
    var context = undefined;
    if (typeof value === "string")
        value = value.trim();
    if (value === undefined || value === null || value === 0 || value == "0" || value.length === 0) {
        return { hasError: true, validator: "required" };
    }
    if (value.length > 0 && value.trim().length === 0) {
        return {
            hasError: true,
            validator: "required",
        };
    }
    return { hasError: hasError, validator: context };
};
//# sourceMappingURL=required.js.map