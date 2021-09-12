"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateMutatedField = exports.validateFieldAndMutate = exports.validateValue = exports.validateAndMutate = exports.validate = void 0;
var required_1 = require("./rules/required");
var utils_1 = require("./utils");
function validate(options) {
    return _v(resolvePureValidationOptions(options));
    //---------------------------------------------------------
    function _v(options) {
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            if (!option.validateIf)
                continue;
            var optionIsValid = validateValue(option.value, option.rules);
            if (optionIsValid === false)
                return false;
        }
        return true;
    }
}
exports.validate = validate;
function validateAndMutate(options) {
    return _v(resolveMutatingValidationOptions(options));
    //------------------------------------------------------------
    function _v(options) {
        var rtn = true;
        for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
            var option = options_2[_i];
            if (!option.validateIf)
                continue;
            var isValid = validateFieldAndMutate(option.value, option.err, option.rules);
            if (isValid === false)
                rtn = isValid;
        }
        return rtn;
    }
}
exports.validateAndMutate = validateAndMutate;
function validateValue(value, rules) {
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        var validation = validateAsOptional(value, rule);
        if (!validation.isValid)
            return false;
    }
    return true;
}
exports.validateValue = validateValue;
function validateFieldAndMutate(value, err, rules) {
    for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
        var rule = rules_2[_i];
        var validation = validateAsOptional(value, rule);
        if (!validation.isValid) {
            if (validation.rule === "required") {
                utils_1.set(err, "$isEmpty", true);
                utils_1.unset(err, "$isWrong");
            }
            else {
                utils_1.set(err, "$isWrong", true);
                utils_1.unset(err, "$isEmpty");
            }
            utils_1.set(err, "$rule", validation.rule);
            return false;
        }
        else {
            invalidateMutatedField(err);
        }
    }
    return true;
}
exports.validateFieldAndMutate = validateFieldAndMutate;
function invalidateMutatedField(target) {
    utils_1.unset(target, "$isEmpty");
    utils_1.unset(target, "$isWrong");
    utils_1.unset(target, "$rule");
}
exports.invalidateMutatedField = invalidateMutatedField;
function validateAsOptional(value, rule) {
    var intialValidation = rule(value);
    if (intialValidation.rule === "required")
        return intialValidation;
    if (required_1.isEmpty(value) || intialValidation.isValid)
        return {
            isValid: true,
            rule: undefined,
        };
    else
        return { isValid: false, rule: intialValidation.rule };
}
function resolvePureValidationOptions(options) {
    return options.map(resolvePureValidationOption);
}
function resolvePureValidationOption(option) {
    return {
        value: option.value,
        rules: resolveRules(option.rules),
        validateIf: resolveValidateIf(option.validateIf)
    };
}
function resolveMutatingValidationOptions(options) {
    return options.map(resolveMutatingValidationOption);
}
function resolveMutatingValidationOption(option) {
    if (!option.err)
        throw new Error("VueStateValidatorError: err is a required field\n\r" + JSON.stringify(option));
    else if (typeof option.err !== "object")
        throw new Error("VueStateValidatorError: Unknown err type entered. err should be an object\n\r" + JSON.stringify(option));
    return {
        value: option.value,
        err: option.err,
        rules: resolveRules(option.rules),
        validateIf: resolveValidateIf(option.validateIf)
    };
}
function resolveRules(rules) {
    return rules && Array.isArray(rules)
        ? rules : rules && typeof rules === "function"
        ? [rules] : [required_1.required];
}
function resolveValidateIf(validateIf) {
    return validateIf === undefined || validateIf === null ? true : validateIf;
}
