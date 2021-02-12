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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorsAndMutate = exports.getErrors = exports.validateAndMutate = exports.validate = void 0;
const plugin_1 = __importDefault(require("./plugin"));
var validators_1 = require("./validators");
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return validators_1.validate; } });
Object.defineProperty(exports, "validateAndMutate", { enumerable: true, get: function () { return validators_1.validateAndMutate; } });
Object.defineProperty(exports, "getErrors", { enumerable: true, get: function () { return validators_1.getErrors; } });
Object.defineProperty(exports, "getErrorsAndMutate", { enumerable: true, get: function () { return validators_1.getErrorsAndMutate; } });
__exportStar(require("./rules/index"), exports);
exports.default = plugin_1.default;
