"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
var required_1 = require("./required");
exports.url = function (value) {
    var isUrl = function () { return new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i').test(value); };
    if (required_1.isEmpty(value) || isUrl())
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "url" };
};
