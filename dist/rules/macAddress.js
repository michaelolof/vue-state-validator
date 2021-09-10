"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.macAddress = void 0;
exports.macAddress = function (value) {
    var isMac = function () { return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value); };
    if (isMac())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "macAddress" };
};
