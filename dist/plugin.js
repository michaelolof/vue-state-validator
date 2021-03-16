"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const rules_1 = require("./rules");
const utils_1 = require("./utils");
function useValidateOn() {
    const validationHandler = (option, eventName) => (evt) => {
        evt.stopPropagation();
        /**
         * For 'input' validating event wait 21.5 seconds before kicking in validation for better experience
         */
        if (eventName === "input") {
            setTimeout(() => {
                validators_1.validateAndMutate([option]);
            }, 1500);
        }
        else
            validators_1.validateAndMutate([option]);
    };
    const invalidationHandler = (option) => (evt) => {
        evt.stopPropagation();
        validators_1.invalidateMutatedField(option.target);
    };
    let validationEvent = "blur";
    let inValidateEvent = undefined;
    let currentValidationHandler = undefined;
    let currentInvalidationHandler = undefined;
    const setup = (el, binding, vnode) => {
        const events = Object.keys(binding.modifiers || {});
        validationEvent = events[0] || "blur";
        inValidateEvent = events[1];
        const component = vnode.componentInstance;
        let option = binding.value || { target: { value: undefined } };
        if (Array.isArray(option)) {
            option = { target: option[0], rules: option[1], property: option[2], validateIf: option[3] };
        }
        if (component) {
            component.$on(validationEvent, validationHandler(option, validationEvent));
        }
        else {
            if (currentValidationHandler) {
                el.removeEventListener(validationEvent, currentValidationHandler);
            }
            currentValidationHandler = validationHandler(option, validationEvent);
            el.addEventListener(validationEvent, currentValidationHandler);
        }
        if (inValidateEvent) {
            if (component) {
                component.$on(inValidateEvent, invalidationHandler(option));
            }
            else {
                if (currentValidationHandler) {
                    el.removeEventListener(inValidateEvent, currentInvalidationHandler);
                }
                currentValidationHandler = invalidationHandler(option);
                el.addEventListener(inValidateEvent, currentInvalidationHandler);
            }
        }
    };
    return {
        bind: setup,
        update: setup,
        unbind(el, binding) {
            el.removeEventListener(validationEvent, currentValidationHandler);
            if (inValidateEvent) {
                el.removeEventListener(validationEvent, currentInvalidationHandler);
            }
        }
    };
}
function useValidatePrevent() {
    const validatePreventHandler = (rules) => (evt) => {
        if (utils_1.isControlKey(evt))
            return;
        const value = evt.key.trim();
        const isValid = validateValueChars(value, rules);
        if ((value + "").length && isValid)
            evt.preventDefault();
    };
    const onPasteValidatePreventHandler = (rules) => (evt) => {
        //@ts-ignore
        const value = (evt.clipboardData || window.clipboardData).getData('text');
        const isValid = validateValueChars(value, rules);
        if ((value + "").length && isValid)
            evt.preventDefault();
    };
    let currentPreventHandler = undefined;
    let currentOnPastePreventHandler = undefined;
    const setup = (el, binding, vnode) => {
        const rules = buildRulesFromBinding(binding);
        const component = vnode.componentInstance;
        if (component) {
            component.$on("keydown", validatePreventHandler(rules));
            component.$on("paste", onPasteValidatePreventHandler(rules));
        }
        else {
            if (currentPreventHandler)
                el.removeEventListener("keydown", currentPreventHandler);
            if (currentOnPastePreventHandler)
                el.removeEventListener("paste", currentOnPastePreventHandler);
            currentPreventHandler = validatePreventHandler(rules);
            currentOnPastePreventHandler = onPasteValidatePreventHandler(rules);
            el.addEventListener("keydown", currentPreventHandler);
            el.addEventListener("paste", currentOnPastePreventHandler);
        }
    };
    return {
        bind: setup,
        update: setup,
        unbind(el) {
            el.removeEventListener("keydown", currentPreventHandler);
            el.removeEventListener("paste", currentOnPastePreventHandler);
        }
    };
}
function useValidateAllow() {
    const validateAllowHandler = (rules) => (evt) => {
        if (utils_1.isControlKey(evt))
            return;
        const value = evt.key.trim();
        const isNotValid = validateValueChars(value, rules) === false;
        if ((value + "").length && isNotValid)
            evt.preventDefault();
    };
    const onPasteValidateAllowHandler = (rules) => (evt) => {
        //@ts-ignore
        const value = (evt.clipboardData || window.clipboardData).getData('text');
        const isNotValid = validateValueChars(value, rules) === false;
        if ((value + "").length && isNotValid)
            evt.preventDefault();
    };
    let currentAllowHandler = undefined;
    let currentOnPasteAllowHandler = undefined;
    const setup = (el, binding, vnode) => {
        const rules = buildRulesFromBinding(binding);
        const component = vnode.componentInstance;
        if (component) {
            component.$on("keydown", validateAllowHandler(rules));
            component.$on("paste", onPasteValidateAllowHandler(rules));
        }
        else {
            if (currentAllowHandler)
                el.removeEventListener("keydown", currentAllowHandler);
            if (currentOnPasteAllowHandler)
                el.removeEventListener("paste", currentOnPasteAllowHandler);
            currentAllowHandler = validateAllowHandler(rules);
            currentOnPasteAllowHandler = onPasteValidateAllowHandler(rules);
            el.addEventListener("keydown", currentAllowHandler);
            el.addEventListener("paste", currentOnPasteAllowHandler);
        }
    };
    return {
        bind: setup,
        update: setup,
        unbind(el) {
            el.removeEventListener("keydown", currentAllowHandler);
            el.removeEventListener("paste", currentOnPasteAllowHandler);
        }
    };
}
function validateValueChars(value, rules) {
    let isValid = true;
    for (let char of value) {
        isValid = validators_1.validateValue(char, rules);
        if (isValid === false) {
            return false;
        }
    }
    return isValid;
}
function useValidateMax() {
    const validateMaxHandler = (maximum, el) => (evt) => {
        if (utils_1.isControlKey(evt))
            return;
        if (rules_1.max(maximum)(evt.target.value).isValid === false) {
            evt.preventDefault();
            const event = document.createEvent("Event");
            event.initEvent("input", true, true);
            el.value = maximum;
            el.dispatchEvent(event);
        }
    };
    let currentMaxHandler = undefined;
    const setup = (el, binding, vnode) => {
        const maximum = binding.value;
        const component = vnode.componentInstance;
        if (component) {
            component.$on("keyup", validateMaxHandler(maximum, el));
        }
        else {
            if (currentMaxHandler) {
                el.removeEventListener("keyup", currentMaxHandler);
            }
            currentMaxHandler = validateMaxHandler(maximum, el);
            el.addEventListener("keyup", currentMaxHandler);
        }
    };
    return {
        bind: setup,
        update: setup,
        unbind(el, binding) {
            el.removeEventListener("keyup", currentMaxHandler);
        }
    };
}
function useValidateLength() {
    const validateLengthHandler = (maximum) => (evt) => {
        if (utils_1.isControlKey(evt))
            return;
        if (rules_1.maxChar(maximum - 1)(evt.target.value).isValid === false) {
            evt.preventDefault();
        }
    };
    let currentLengthHandler = undefined;
    const setup = (el, binding, vnode) => {
        const maximum = binding.value;
        const component = vnode.componentInstance;
        if (component) {
            component.$on("keydown", validateLengthHandler(maximum));
        }
        else {
            if (currentLengthHandler) {
                el.removeEventListener("keydown", currentLengthHandler);
            }
            currentLengthHandler = validateLengthHandler(maximum);
            el.addEventListener("keydown", currentLengthHandler);
        }
    };
    return {
        bind: setup,
        update: setup,
        unbind(el, binding) {
            el.removeEventListener("keydown", currentLengthHandler);
        }
    };
}
function buildRulesFromBinding(binding) {
    const rules = [];
    if (binding.modifiers["alpha"])
        rules.push(rules_1.alpha);
    if (binding.modifiers["numeric"])
        rules.push(numericChar);
    if (binding.modifiers["alphaNumeric"])
        rules.push(rules_1.alphaNumeric);
    if (binding.modifiers["integer"])
        rules.push(rules_1.integer);
    if (binding.modifiers["match"]) {
        const compare = utils_1.toRegex(binding.value) || binding.value;
        rules.push(rules_1.match(compare));
    }
    return rules;
}
function numericChar(value) {
    value = (value + "").trim();
    if ((value === ".") || rules_1.numeric(value).isValid)
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "numeric" };
}
exports.default = {
    install(Vue) {
        utils_1.constants.Vue = Vue;
        Vue.directive("vsv-on", useValidateOn());
        Vue.directive("vsv-prevent", useValidatePrevent());
        Vue.directive("vsv-allow", useValidateAllow());
        Vue.directive("vsv-max", useValidateMax());
        Vue.directive("vsv-length", useValidateLength());
    },
};
