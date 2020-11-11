"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.checkForErrors = void 0;
var required_1 = require("./rules/required");
function checkForErrors(options) {
    var errors = [];
    var opts = options
        .map(function (option, index) { return ({
        field: option.field,
        rules: option.rules && Array.isArray(option.rules)
            ? option.rules : option.rules && typeof option.rules === "function"
            ? [option.rules] : [required_1.required],
        value: option.value || "value",
        order: option.order || index,
        validateIf: option.validateIf === undefined ? true : option.validateIf,
    }); })
        .sort(function (a, b) { return a.order - b.order; });
    for (var _i = 0, opts_1 = opts; _i < opts_1.length; _i++) {
        var opt = opts_1[_i];
        if (!opt.validateIf)
            continue;
        var isNotValid = validateField(opt.field, opt.value, opt.rules) === false;
        if (isNotValid)
            errors.push(opt.field);
    }
    return errors;
}
exports.checkForErrors = checkForErrors;
function validate(options) {
    return checkForErrors(options).length > 0;
}
exports.validate = validate;
function validateField(field, value, rules) {
    var val = field[value];
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        var validation = rule(val);
        if (validation.hasError) {
            if (validation.validator === "required")
                field["isEmpty"] = true;
            else
                field["isInvalid"] = true;
            field["validator"] = validation.validator;
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=validators.js.map