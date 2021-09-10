"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipAddress = void 0;
exports.ipAddress = function (value) {
    var isIp = function () { return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value); };
    if (isIp())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "ipAddress" };
};
