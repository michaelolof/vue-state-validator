import { invalidateMutatedField, validateAndMutate, validateValue } from "./validators";
import { alpha, alphaNumeric, integer, max, numeric, maxChar, match } from "./rules";
import { constants, isControlKey, toRegex } from "./utils";
const handlers = {
    validateOn: {
        validationHandler: "___vueLiteValidatorValidateOnValidationHandler___",
        invalidationHandler: "___vueLiteValidatorValidateOnInvalidationHandler___"
    },
    validatePreventHandler: "___vueLiteValidatorValidatePreventHandler",
    onPasteValidatePreventHandler: "___vueLiteValidatorOnPasteValidatePreventHandler",
    validateAllowHandler: "___vueLiteValidatorValidateAllowHandler___",
    onPasteValidateAllowHandler: "___vueLiteValidatorOnPasteValidateAllowHandler___",
    validateMaxHandler: "___vueLiteValidatorValidateMaxHandler___",
    validateLengthHandler: "___vueLiteValidatorValidateLengthHandler___"
};
const validateOn = {
    update(el, binding) {
        const events = Object.keys(binding.modifiers || {});
        const validationEvent = events[0] || "blur";
        const inValidateEvent = events[1];
        let option = binding.value || { target: { value: undefined } };
        if (Array.isArray(option)) {
            option = { target: option[0], rules: option[1], property: option[2], validateIf: option[3] };
        }
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
                    validateAndMutate([option]);
                }, 1500);
            }
            else
                validateAndMutate([option]);
        }
        function invalidationHandler(evt) {
            evt.stopPropagation();
            invalidateMutatedField(option.target);
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
        el.addEventListener("paste", onPasteValidatePreventHandler);
        el[handlers.validatePreventHandler] = validatePreventHandler;
        el[handlers.onPasteValidatePreventHandler] = onPasteValidatePreventHandler;
        //---------------------------------------------------------
        function validatePreventHandler(evt) {
            if (isControlKey(evt))
                return;
            const value = evt.key.trim();
            const isValid = validateValue(value, rules);
            if ((value + "").length && isValid)
                evt.preventDefault();
        }
        function onPasteValidatePreventHandler(evt) {
            //@ts-ignore
            const value = (evt.clipboardData || window.clipboardData).getData('text');
            const isValid = validateValue(value, rules);
            if ((value + "").length && isValid)
                evt.preventDefault();
        }
    },
    unbind(el) {
        const validatePreventHandler = el[handlers.validatePreventHandler];
        const onPasteValidatePreventHandler = el[handlers.onPasteValidatePreventHandler];
        el.removeEventListener("keydown", validatePreventHandler);
        el.removeEventListener("paste", onPasteValidatePreventHandler);
    }
};
const validateAllow = {
    bind(el, binding) {
        const rules = buildRulesFromBinding(binding);
        el.addEventListener("keydown", validateAllowHandler);
        el.addEventListener("paste", onPasteValidateAllowHandler);
        el[handlers.validateAllowHandler] = validateAllowHandler;
        el[handlers.onPasteValidateAllowHandler] = onPasteValidateAllowHandler;
        //-------------------------------------------------------
        function validateAllowHandler(evt) {
            if (isControlKey(evt))
                return;
            const value = evt.key.trim();
            const isNotValid = validateValue(value, rules) === false;
            if ((value + "").length && isNotValid)
                evt.preventDefault();
        }
        function onPasteValidateAllowHandler(evt) {
            //@ts-ignore
            const value = (evt.clipboardData || window.clipboardData).getData('text');
            const isNotValid = validateValue(value, rules) === false;
            if ((value + "").length && isNotValid)
                evt.preventDefault();
        }
    },
    unbind(el) {
        const validateAllowHandler = el[handlers.validateAllowHandler];
        const onPasteValidateAllowHandler = el[handlers.onPasteValidateAllowHandler];
        el.removeEventListener("keydown", validateAllowHandler);
        el.removeEventListener("paste", onPasteValidateAllowHandler);
    }
};
const validateMax = {
    update(el, binding) {
        const maximum = binding.value;
        el.addEventListener("keyup", validateMaxHandler);
        el[handlers.validateMaxHandler] = validateMaxHandler;
        //-------------------------------------------------------
        function validateMaxHandler(evt) {
            if (isControlKey(evt))
                return;
            if (max(maximum)(evt.target.value).isValid === false) {
                evt.preventDefault();
                const event = document.createEvent("Event");
                event.initEvent("input", true, true);
                el.value = maximum;
                el.dispatchEvent(event);
            }
        }
    },
    unbind(el) {
        const validateMaxHandler = el[handlers.validateMaxHandler];
        el.removeEventListener("keyup", validateMaxHandler);
    }
};
const validateLength = {
    update(el, binding) {
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
    if (binding.modifiers["match"]) {
        const compare = toRegex(binding.value) || binding.value;
        rules.push(match(compare));
    }
    return rules;
}
function numericChar(value) {
    value = (value + "").trim();
    if ((value === ".") || numeric(value).isValid)
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
        Vue.directive("vsv-on", validateOn);
        Vue.directive("vsv-prevent", validatePrevent);
        Vue.directive("vsv-allow", validateAllow);
        Vue.directive("vsv-max", validateMax);
        Vue.directive("vsv-length", validateLength);
    },
};
