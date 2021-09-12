import { invalidateMutatedField, validateAndMutate, validateFieldAndMutate, validateValue } from "./validators";
import { alpha, alphaNumeric, integer, max, numeric, Rule, Validation, maxChar, match } from ".";
import { constants, isControlKey, toRegex } from "./utils";


function useValidateOn() {

  const validationHandler = (option :any, eventName :string) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;

    evt.stopPropagation();
    /**
     * For 'input' validating event wait 21.5 seconds before kicking in validation for better experience
     */
    if(eventName === "input") {
      setTimeout(() => {
        validateAndMutate([option]);
      }, 1500)
    }
    else validateAndMutate([ option ]);
  }

  const invalidationHandler = (option :any) => (evt: any) => {
    evt.stopPropagation();
    invalidateMutatedField(option.target);
  }

  let validationEvent = "blur";
  let inValidateEvent :string|undefined = undefined;
  let currentValidationHandler: any = undefined;
  let currentInvalidationHandler: any = undefined;

  const setup = (el: any, binding: any, vnode: any) => {
    const events = Object.keys(binding.modifiers || {}); 
    validationEvent = events[ 0 ] || "blur";
    inValidateEvent = events[ 1 ];
    const component = vnode.componentInstance;
    let option = binding.value || { target: { value: undefined } }
    
    if(Array.isArray(option)) {
      option = { value: option[0], rules: option[1], err: option[2], validateIf: option[3] }
    }    

    
    if(component) {
      component.$on(validationEvent, validationHandler(option, validationEvent));
    } else {
      if(currentValidationHandler) { 
        el.removeEventListener(validationEvent, currentValidationHandler);
      }
      currentValidationHandler = validationHandler(option, validationEvent);
      el.addEventListener(validationEvent, currentValidationHandler)
    }

    if(inValidateEvent) {
      if(component) {
        component.$on(inValidateEvent, invalidationHandler(option));
      } else {
        if(currentValidationHandler) { 
          el.removeEventListener(inValidateEvent, currentInvalidationHandler);
        }
        currentValidationHandler = invalidationHandler(option);
        el.addEventListener(inValidateEvent, currentInvalidationHandler)
      }
    }
  }

  return {
    bind: setup,
    update: setup,
    unbind(el: any, binding :any) {
      el.removeEventListener(validationEvent, currentValidationHandler);
    
      if(inValidateEvent) {
        el.removeEventListener(validationEvent, currentInvalidationHandler);
      }
    }
  }

}

function useValidatePrevent() {

  const validatePreventHandler = (rules :Rule[]) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;
    
    if(isControlKey(evt)) return;
    
    const value = evt.key.trim();
    const isValid = validateValueChars(value, rules);
    if((value+"").length && isValid) evt.preventDefault();
  }

  const onPasteValidatePreventHandler = (rules :Rule[]) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;
    
    //@ts-ignore
    const value = (evt.clipboardData || window.clipboardData).getData('text');
    const isValid = validateValueChars(value, rules);
    if((value+"").length && isValid) evt.preventDefault();      
  }

  let currentPreventHandler :any = undefined;
  let currentOnPastePreventHandler :any = undefined;


  const setup = (el :any, binding: any, vnode: any) => {
    const rules = buildRulesFromBinding(binding);
    const component = vnode.componentInstance;

    if(component) {
      component.$on("keydown", validatePreventHandler(rules));
      component.$on("paste", onPasteValidatePreventHandler(rules));
    } else {
      if(currentPreventHandler) el.removeEventListener("keydown", currentPreventHandler);
      if(currentOnPastePreventHandler) el.removeEventListener("paste", currentOnPastePreventHandler);
      currentPreventHandler = validatePreventHandler(rules);
      currentOnPastePreventHandler = onPasteValidatePreventHandler(rules);
      el.addEventListener("keydown", currentPreventHandler)
      el.addEventListener("paste", currentOnPastePreventHandler)
    }
  }

  return {
    bind: setup,
    update: setup,
    unbind(el :any) {
      el.removeEventListener("keydown", currentPreventHandler);
      el.removeEventListener("paste", currentOnPastePreventHandler);      
    }
  }

}

function useValidateAllow() {

  const validateAllowHandler = (rules :Rule[]) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;
    
    if(isControlKey(evt)) return;

    const value = evt.key.trim();
    const isNotValid = validateValueChars(value, rules) === false;
    if((value+"").length && isNotValid) evt.preventDefault();
  }

  const onPasteValidateAllowHandler = (rules :Rule[]) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;
      
      //@ts-ignore
      const value = (evt.clipboardData || window.clipboardData).getData('text');
      const isNotValid = validateValueChars(value, rules) === false;
      if((value+"").length && isNotValid) evt.preventDefault();
  }

  let currentAllowHandler :any = undefined;
  let currentOnPasteAllowHandler :any = undefined;


  const setup = (el :any, binding: any, vnode: any) => {
    const rules = buildRulesFromBinding(binding);
    const component = vnode.componentInstance;

    if(component) {
      component.$on("keydown", validateAllowHandler(rules));
      component.$on("paste", onPasteValidateAllowHandler(rules));
    } else {
      if(currentAllowHandler) el.removeEventListener("keydown", currentAllowHandler);
      if(currentOnPasteAllowHandler) el.removeEventListener("paste", currentOnPasteAllowHandler);
      currentAllowHandler = validateAllowHandler(rules);
      currentOnPasteAllowHandler = onPasteValidateAllowHandler(rules);
      el.addEventListener("keydown", currentAllowHandler)
      el.addEventListener("paste", currentOnPasteAllowHandler)
    }
  }

  return {
    bind: setup,
    update: setup,
    unbind(el :any) {
      el.removeEventListener("keydown", currentAllowHandler);
      el.removeEventListener("paste", currentOnPasteAllowHandler);      
    }
  }

}

function validateValueChars(value :string, rules :Rule[]) {
  let isValid = true;
  for(let char of value) {
    isValid = validateValue(char, rules);
    if(isValid === false) {
      return false;
    }
  }
  return isValid;
}

function useValidateMax() {

  const validateMaxHandler = (maximum :number, el :any) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;

    if(isControlKey(evt)) return;
    
    if(max(maximum)(evt.target.value).isValid === false) {
      evt.preventDefault();
      const event = document.createEvent("Event");
      event.initEvent("input", true, true);
      el.value = maximum;
      el.dispatchEvent(event);
    }
  }

  let currentMaxHandler: any = undefined;

  const setup = (el :any, binding :any, vnode: any) => {

    const maximum = binding.value;
    const component = vnode.componentInstance;

    if(component) {
      component.$on("keyup", validateMaxHandler(maximum, el));
    } else {
      if(currentMaxHandler) {
        el.removeEventListener("keyup", currentMaxHandler);
      }
      currentMaxHandler = validateMaxHandler(maximum, el);
      el.addEventListener("keyup", currentMaxHandler);
    }
  }
  

  return {
    bind: setup,
    update: setup,
    unbind(el :any, binding :any) {
      el.removeEventListener("keyup", currentMaxHandler);
    }
  }

}

function useValidateLength() {

  const validateLengthHandler = (maximum :number) => (evt :any) => {
    if(evt === undefined || evt instanceof Event === false) return;
    
    if(isControlKey(evt)) return;

    if(maxChar(maximum-1)(evt.target.value).isValid === false) { 
      evt.preventDefault();
    }
  }

  let currentLengthHandler: any = undefined;

  const setup = (el :any, binding :any, vnode: any) => {

    const maximum = binding.value;
    const component = vnode.componentInstance;

    if(component) {
      component.$on("keydown", validateLengthHandler(maximum));
    } else {
      if(currentLengthHandler) {
        el.removeEventListener("keydown", currentLengthHandler);
      }
      currentLengthHandler = validateLengthHandler(maximum);
      el.addEventListener("keydown", currentLengthHandler);
    }
  }
  

  return {
    bind: setup,
    update: setup,
    unbind(el :any, binding :any) {
      el.removeEventListener("keydown", currentLengthHandler);
    }
  }

}

function buildRulesFromBinding(binding :any) {

  const rules :Rule[] = [];

  if(binding.modifiers["alpha"]) rules.push(alpha)
  if(binding.modifiers["numeric"]) rules.push(numericChar);
  if(binding.modifiers["alphaNumeric"]) rules.push(alphaNumeric);
  if(binding.modifiers["integer"]) rules.push(integer);
  if(binding.modifiers["match"]) {
    const compare = toRegex(binding.value) || binding.value;
    rules.push(match(compare))
  }

  return rules;
}

function numericChar(value :any) :Validation {
  value = (value+"").trim();
  if((value === ".") || numeric(value).isValid) return {
    isValid: true,
    rule: undefined
  }
  else return { isValid: false, rule: "numeric" }
}


export default {

  install(Vue :any) {
    constants.Vue = Vue;
    Vue.directive("vsv-on", useValidateOn() )
    Vue.directive("vsv-prevent", useValidatePrevent() )
    Vue.directive("vsv-allow", useValidateAllow() )
    Vue.directive("vsv-max", useValidateMax() )
    Vue.directive("vsv-length", useValidateLength() )
  },

  // validateOn,
  // validatePrevent,
  // validateAllow,
  
}

