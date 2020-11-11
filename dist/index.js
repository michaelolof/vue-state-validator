"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForErrors = exports.validate = void 0;
var validators_1 = require("./validators");
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return validators_1.validate; } });
Object.defineProperty(exports, "checkForErrors", { enumerable: true, get: function () { return validators_1.checkForErrors; } });
__exportStar(require("./rules/index"), exports);
//# sourceMappingURL=index.js.map