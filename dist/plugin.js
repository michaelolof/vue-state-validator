"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("./validators");
var _1 = require(".");
var utils_1 = require("./utils");
function useValidateOn() {
    var validationHandler = function (option, eventName) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        evt.stopPropagation();
        /**
         * For 'input' validating event wait 21.5 seconds before kicking in validation for better experience
         */
        if (eventName === "input") {
            setTimeout(function () {
                validators_1.validateAndMutate([option]);
            }, 1500);
        }
        else
            validators_1.validateAndMutate([option]);
    }; };
    var invalidationHandler = function (option) { return function (evt) {
        evt.stopPropagation();
        validators_1.invalidateMutatedField(option.target);
    }; };
    var validationEvent = "blur";
    var inValidateEvent = undefined;
    var currentValidationHandler = undefined;
    var currentInvalidationHandler = undefined;
    var setup = function (el, binding, vnode) {
        var events = Object.keys(binding.modifiers || {});
        validationEvent = events[0] || "blur";
        inValidateEvent = events[1];
        var component = vnode.componentInstance;
        var option = binding.value || { target: { value: undefined } };
        if (Array.isArray(option)) {
            option = { value: option[0], rules: option[1], err: option[2], validateIf: option[3] };
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
        unbind: function (el, binding) {
            el.removeEventListener(validationEvent, currentValidationHandler);
            if (inValidateEvent) {
                el.removeEventListener(validationEvent, currentInvalidationHandler);
            }
        }
    };
}
function useValidatePrevent() {
    var validatePreventHandler = function (rules) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        if (utils_1.isControlKey(evt))
            return;
        var value = evt.key.trim();
        var isValid = validateValueChars(value, rules);
        if ((value + "").length && isValid)
            evt.preventDefault();
    }; };
    var onPasteValidatePreventHandler = function (rules) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        //@ts-ignore
        var value = (evt.clipboardData || window.clipboardData).getData('text');
        var isValid = validateValueChars(value, rules);
        if ((value + "").length && isValid)
            evt.preventDefault();
    }; };
    var currentPreventHandler = undefined;
    var currentOnPastePreventHandler = undefined;
    var setup = function (el, binding, vnode) {
        var rules = buildRulesFromBinding(binding);
        var component = vnode.componentInstance;
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
        unbind: function (el) {
            el.removeEventListener("keydown", currentPreventHandler);
            el.removeEventListener("paste", currentOnPastePreventHandler);
        }
    };
}
function useValidateAllow() {
    var validateAllowHandler = function (rules) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        if (utils_1.isControlKey(evt))
            return;
        var value = evt.key.trim();
        var isNotValid = validateValueChars(value, rules) === false;
        if ((value + "").length && isNotValid)
            evt.preventDefault();
    }; };
    var onPasteValidateAllowHandler = function (rules) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        //@ts-ignore
        var value = (evt.clipboardData || window.clipboardData).getData('text');
        var isNotValid = validateValueChars(value, rules) === false;
        if ((value + "").length && isNotValid)
            evt.preventDefault();
    }; };
    var currentAllowHandler = undefined;
    var currentOnPasteAllowHandler = undefined;
    var setup = function (el, binding, vnode) {
        var rules = buildRulesFromBinding(binding);
        var component = vnode.componentInstance;
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
        unbind: function (el) {
            el.removeEventListener("keydown", currentAllowHandler);
            el.removeEventListener("paste", currentOnPasteAllowHandler);
        }
    };
}
function validateValueChars(value, rules) {
    var isValid = true;
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var char = value_1[_i];
        isValid = validators_1.validateValue(char, rules);
        if (isValid === false) {
            return false;
        }
    }
    return isValid;
}
function useValidateMax() {
    var validateMaxHandler = function (maximum, el) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        if (utils_1.isControlKey(evt))
            return;
        if (_1.max(maximum)(evt.target.value).isValid === false) {
            evt.preventDefault();
            var event_1 = document.createEvent("Event");
            event_1.initEvent("input", true, true);
            el.value = maximum;
            el.dispatchEvent(event_1);
        }
    }; };
    var currentMaxHandler = undefined;
    var setup = function (el, binding, vnode) {
        var maximum = binding.value;
        var component = vnode.componentInstance;
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
        unbind: function (el, binding) {
            el.removeEventListener("keyup", currentMaxHandler);
        }
    };
}
function useValidateLength() {
    var validateLengthHandler = function (maximum) { return function (evt) {
        if (evt === undefined || evt instanceof Event === false)
            return;
        if (utils_1.isControlKey(evt))
            return;
        if (_1.maxChar(maximum - 1)(evt.target.value).isValid === false) {
            evt.preventDefault();
        }
    }; };
    var currentLengthHandler = undefined;
    var setup = function (el, binding, vnode) {
        var maximum = binding.value;
        var component = vnode.componentInstance;
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
        unbind: function (el, binding) {
            el.removeEventListener("keydown", currentLengthHandler);
        }
    };
}
function buildRulesFromBinding(binding) {
    var rules = [];
    if (binding.modifiers["alpha"])
        rules.push(_1.alpha);
    if (binding.modifiers["numeric"])
        rules.push(numericChar);
    if (binding.modifiers["alphaNumeric"])
        rules.push(_1.alphaNumeric);
    if (binding.modifiers["integer"])
        rules.push(_1.integer);
    if (binding.modifiers["match"]) {
        var compare = utils_1.toRegex(binding.value) || binding.value;
        rules.push(_1.match(compare));
    }
    return rules;
}
function numericChar(value) {
    value = (value + "").trim();
    if ((value === ".") || _1.numeric(value).isValid)
        return {
            isValid: true,
            rule: undefined
        };
    else
        return { isValid: false, rule: "numeric" };
}
exports.default = {
    install: function (Vue) {
        utils_1.constants.Vue = Vue;
        Vue.directive("vsv-on", useValidateOn());
        Vue.directive("vsv-prevent", useValidatePrevent());
        Vue.directive("vsv-allow", useValidateAllow());
        Vue.directive("vsv-max", useValidateMax());
        Vue.directive("vsv-length", useValidateLength());
    },
};
