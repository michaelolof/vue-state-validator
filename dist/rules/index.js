"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparisonValue = void 0;
exports.comparisonValue = function (val) {
    if (typeof val === "string")
        val = val.trim();
    return Array.isArray(val) ? val.length : !isNaN(parseFloat(val)) ? parseFloat(val) : (val + "").length;
};
