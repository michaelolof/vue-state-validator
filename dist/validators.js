import { isEmpty, required } from "./rules/required";
import { objectIsEmpty, set, unset } from "./utils";
export function validate(options) {
    return _v(resolvePureValidationOptions(options));
    //---------------------------------------------------------
    function _v(options) {
        for (let option of options) {
            if (!option.validateIf)
                continue;
            const optionIsValid = validateValue(option.value, option.rules);
            if (optionIsValid === false)
                return false;
        }
        return true;
    }
}
export function validateAndMutate(options) {
    return _v(resolveMutatingValidationOptions(options));
    //------------------------------------------------------------
    function _v(options) {
        let rtn = true;
        for (let option of options) {
            if (!option.validateIf)
                continue;
            const isValid = validateFieldAndMutate(option.target, option.property, option.rules);
            if (isValid === false)
                rtn = isValid;
        }
        return rtn;
    }
}
export function getErrors(options) {
    const field = {};
    for (let key in options) {
        const option = resolvePureValidationOption(options[key]);
        if (!option.validateIf)
            continue;
        field[key] = { value: option.value };
        validateFieldAndMutate(field[key], "value", option.rules);
        // Clean up the field object after validation.
        delete field[key]["value"];
        if (objectIsEmpty(field[key]))
            delete field[key];
    }
    return field;
}
export function getErrorsAndMutate(options) {
    const field = {};
    for (let key in options) {
        const option = resolveMutatingValidationOption(options[key]);
        if (!option.validateIf)
            continue;
        field[key] = { value: option.target[option.property] };
        validateFieldAndMutate(field[key], "value", option.rules);
        validateFieldAndMutate(option.target, option.property, option.rules);
        // Clean up the field object after validation.
        delete field[key]["value"];
        if (objectIsEmpty(field[key]))
            delete field[key];
    }
    return field;
}
export function validateValue(value, rules) {
    for (let rule of rules) {
        const validation = validateAsOptional(value, rule);
        if (!validation.isValid)
            return false;
    }
    return true;
}
export function validateFieldAndMutate(target, value, rules) {
    const val = target[value || "value"];
    for (let rule of rules) {
        const validation = validateAsOptional(val, rule);
        if (!validation.isValid) {
            if (validation.rule === "required") {
                set(target, "$isEmpty", true);
                unset(target, "$isWrong");
            }
            else {
                set(target, "$isWrong", true);
                unset(target, "$isEmpty");
            }
            set(target, "$rule", validation.rule);
            return false;
        }
        else {
            invalidateMutatedField(target);
        }
    }
    return true;
}
export function invalidateMutatedField(target) {
    unset(target, "$isEmpty");
    unset(target, "$isWrong");
    unset(target, "$rule");
}
function validateAsOptional(value, rule) {
    const intialValidation = rule(value);
    if (rule.name === "required")
        return intialValidation;
    if (isEmpty(value) || intialValidation.isValid)
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
        ? [rules] : [required];
}
function resolveValidateIf(validateIf) {
    return validateIf === undefined || validateIf === null ? true : validateIf;
}
