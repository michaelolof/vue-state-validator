import { isEmpty, required } from "./rules/required";
import { set } from "./utils";
export function validate(options) {
    return getErrors(options).length === 0;
}
export function validateAndMutate(options) {
    return getErrorsAndMutate(options).length === 0;
}
export function getErrorsAndMutate(options) {
    return errorGetter(options, option => validateFieldAndMutate(option.field, option.value, option.rules));
}
export function getErrors(options) {
    return errorGetter(options, (option) => validateValue(option.field[option.value], option.rules));
}
export function validateValue(value, rules) {
    for (let rule of rules) {
        const validation = validateAsOptional(value, rule);
        if (!validation.isValid)
            return false;
    }
    return true;
}
function validateFieldAndMutate(field, value, rules) {
    const val = field[value];
    for (let rule of rules) {
        const validation = validateAsOptional(val, rule);
        if (!validation.isValid) {
            if (validation.rule === "required") {
                set(field, "$isEmpty", true);
                set(field, "$isInvalid", false);
            }
            else {
                set(field, "$isInvalid", true);
                set(field, "$isEmpty", false);
            }
            set(field, "$rule", validation.rule);
            return false;
        }
        else {
            set(field, "$isEmpty", false);
            set(field, "$isInvalid", false);
            set(field, "$rule", undefined);
        }
    }
    return true;
}
function errorGetter(options, validator) {
    const errors = [];
    const opts = options
        .map((option, index) => ({
        field: option.field,
        rules: option.rules && Array.isArray(option.rules)
            ? option.rules : option.rules && typeof option.rules === "function"
            ? [option.rules] : [required],
        value: option.value || "value",
        order: option.order || index,
        validateIf: option.validateIf === undefined ? true : option.validateIf,
    }))
        .sort((a, b) => a.order - b.order);
    for (let opt of opts) {
        if (!opt.validateIf)
            continue;
        const isNotValid = validator(opt) === false;
        if (isNotValid)
            errors.push(opt.field);
    }
    return errors;
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
