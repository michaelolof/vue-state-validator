"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateMutatedField = exports.validateFieldAndMutate = exports.validateValue = exports.getErrorsAndMutate = exports.getErrors = exports.validateAndMutate = exports.validate = void 0;
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
            var isValid = validateFieldAndMutate(option.target, option.property, option.rules);
            if (isValid === false)
                rtn = isValid;
        }
        return rtn;
    }
}
exports.validateAndMutate = validateAndMutate;
function getErrors(options) {
    var field = {};
    for (var key in options) {
        var option = resolvePureValidationOption(options[key]);
        if (!option.validateIf)
            continue;
        field[key] = { value: option.value };
        validateFieldAndMutate(field[key], "value", option.rules);
        // Clean up the field object after validation.
        delete field[key]["value"];
        if (utils_1.objectIsEmpty(field[key]))
            delete field[key];
    }
    return field;
}
exports.getErrors = getErrors;
function getErrorsAndMutate(options) {
    var field = {};
    for (var key in options) {
        var option = resolveMutatingValidationOption(options[key]);
        if (!option.validateIf)
            continue;
        field[key] = { value: typeof option.property === "function" ? option.property(option.target) : option.target[option.property] };
        validateFieldAndMutate(field[key], "value", option.rules);
        validateFieldAndMutate(option.target, option.property, option.rules);
        // Clean up the field object after validation.
        delete field[key]["value"];
        if (utils_1.objectIsEmpty(field[key]))
            delete field[key];
    }
    return field;
}
exports.getErrorsAndMutate = getErrorsAndMutate;
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
function validateFieldAndMutate(target, property, rules) {
    var val = typeof property === "function" ? property(target) : target[property || "value"];
    for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
        var rule = rules_2[_i];
        var validation = validateAsOptional(val, rule);
        if (!validation.isValid) {
            if (validation.rule === "required") {
                utils_1.set(target, "$isEmpty", true);
                utils_1.unset(target, "$isWrong");
            }
            else {
                utils_1.set(target, "$isWrong", true);
                utils_1.unset(target, "$isEmpty");
            }
            utils_1.set(target, "$rule", validation.rule);
            return false;
        }
        else {
            invalidateMutatedField(target);
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
    if (!option.target)
        throw new Error("VueStateValidatorError: target is a required field");
    else if (typeof option.target !== "object")
        throw new Error("VueStateValidatorError: Unknown target type entered. target should be an object");
    return {
        target: option.target,
        property: option.property || "value",
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
