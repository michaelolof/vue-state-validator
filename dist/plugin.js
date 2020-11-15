import { validateAndMutate, validateValue } from "./validators";
import { alpha, alphaNumeric, integer, max, numeric, maxChar } from "./rules";
import { constants, isControlKey } from "./utils";
const handlers = {
    validateOn: {
        validationHandler: "___vueLiteValidatorValidateOnValidationHandler___",
        invalidationHandler: "___vueLiteValidatorValidateOnInvalidationHandler___"
    },
    validatePreventHandler: "___vueLiteValidatorValidatePreventHandler",
    validateAllowHandler: "___vueLiteValidatorValidateAllowHandler___",
    validateMaxHandler: "___vueLiteValidatorValidateMaxHandler___",
    validateLengthHandler: "___vueLiteValidatorValidateLengthHandler___"
};
const validateOn = {
    bind(el, binding) {
        const events = Object.keys(binding.modifiers || {});
        const validationEvent = events[0] || "blur";
        const inValidateEvent = events[1];
        const rule = binding.value || { field: { value: undefined } };
        el.addEventListener(validationEvent, validationHandler);
        el[handlers.validateOn.validationHandler] = validationHandler;
        if (inValidateEvent) {
            el.addEventListener(inValidateEvent, invalidationHandler);
            el[handlers.validateOn.invalidationHandler] = invalidationHandler;
        }
        //--------------------------------------------------------
        function validationHandler(evt) {
            evt.stopPropagation();
            /**
             * For 'input' validating event wait 21.5 seconds before kicking in validation for better experience
             */
            if (validationEvent === "input") {
                setTimeout(() => {
                    validateAndMutate([rule]);
                }, 1500);
            }
            else
                validateAndMutate([rule]);
        }
        function invalidationHandler(evt) {
            evt.stopPropagation();
            rule.field.isEmpty = false;
            rule.field.isInvalid = false;
            rule.field.validator = undefined;
        }
    },
    unbind(el, binding) {
        const events = Object.keys(binding.modifiers || {});
        const validationEvent = events[0] || "input";
        const inValidateEvent = events[1];
        const validationHandler = el[handlers.validateOn.validationHandler];
        el.removeEventListener(validationEvent, validationHandler);
        if (inValidateEvent) {
            const invalidationHandler = el[handlers.validateOn.invalidationHandler];
            el.removeEventListener(validationEvent, invalidationHandler);
        }
    },
};
const validatePrevent = {
    bind(el, binding) {
        const rules = buildRulesFromBinding(binding);
        el.addEventListener("keydown", validatePreventHandler);
        el[handlers.validatePreventHandler] = validatePreventHandler;
        //---------------------------------------------------------
        function validatePreventHandler(evt) {
            if (isControlKey(evt))
                return;
            const value = evt.key.trim();
            const isValid = validateValue(value, rules);
            if ((value + "").length && isValid)
                evt.preventDefault();
        }
    },
    unbind(el) {
        const validatePreventHandler = el[handlers.validatePreventHandler];
        el.removeEventListener("keydown", validatePreventHandler);
    }
};
const validateAllow = {
    bind(el, binding) {
        const rules = buildRulesFromBinding(binding);
        el.addEventListener("keydown", validateAllowHandler);
        el[handlers.validateAllowHandler] = validateAllowHandler;
        //-------------------------------------------------------
        function validateAllowHandler(evt) {
            if (isControlKey(evt))
                return;
            const value = evt.key.trim();
            const isNotValid = validateValue(value, rules) === false;
            if ((value + "").length && isNotValid)
                evt.preventDefault();
        }
    },
    unbind(el) {
        const validateAllowHandler = el[handlers.validateAllowHandler];
        el.removeEventListener("keydown", validateAllowHandler);
    }
};
const validateMax = {
    bind(el, binding) {
        const maximum = binding.value;
        el.addEventListener("keyup", validateMaxHandler);
        el[handlers.validateMaxHandler] = validateMaxHandler;
        //-------------------------------------------------------
        function validateMaxHandler(evt) {
            if (isControlKey(evt))
                return;
            if (max(maximum)(evt.target.value).isValid === false) {
                evt.target.value = maximum;
            }
        }
    },
    unbind(el) {
        const validateMaxHandler = el[handlers.validateMaxHandler];
        el.removeEventListener("keyup", validateMaxHandler);
    }
};
const validateLength = {
    bind(el, binding) {
        const maximum = binding.value;
        el.addEventListener("keydown", validateLengthHandler);
        el[handlers.validateLengthHandler] = validateLengthHandler;
        //-------------------------------------------------------
        function validateLengthHandler(evt) {
            if (isControlKey(evt))
                return;
            if (maxChar(maximum - 1)(evt.target.value).isValid === false) {
                evt.preventDefault();
            }
        }
    },
    unbind(el) {
        const validateLengthHandler = el[handlers.validateLengthHandler];
        el.removeEventListener("keydown", validateLengthHandler);
    }
};
function buildRulesFromBinding(binding) {
    const rules = [];
    if (binding.modifiers["alpha"])
        rules.push(alpha);
    if (binding.modifiers["numeric"])
        rules.push(numericChar);
    if (binding.modifiers["alphaNumeric"])
        rules.push(alphaNumeric);
    if (binding.modifiers["integer"])
        rules.push(integer);
    return rules;
}
function numericChar(value) {
    value = (value + "").trim();
    if ((value == ".") || numeric(value).isValid)
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "numeric" };
}
export default {
    install(Vue) {
        constants.Vue = Vue;
        Vue.directive("validate-on", validateOn);
        Vue.directive("validate-prevent", validatePrevent);
        Vue.directive("validate-allow", validateAllow);
        Vue.directive("validate-max", validateMax);
        Vue.directive("validate-length", validateLength);
    },
};
