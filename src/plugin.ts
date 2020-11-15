import { validateAndMutate, validateValue } from "./validators";
import { alpha, alphaNumeric, integer, max, numeric, Rule, Validation, maxChar } from "./rules";
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
}


const validateOn = {

  bind(el: any, binding :any) {
        
    const events = Object.keys(binding.modifiers || {}); 
    const validationEvent = events[ 0 ] || "blur";
    const inValidateEvent = events[ 1 ];
    const rule = binding.value || { field: { value: undefined } }

    
    el.addEventListener(validationEvent, validationHandler);
    el[handlers.validateOn.validationHandler] = validationHandler;
    
    if(inValidateEvent) {
      el.addEventListener(inValidateEvent, invalidationHandler)
      el[handlers.validateOn.invalidationHandler] = invalidationHandler;
    }
    
    //--------------------------------------------------------
    function validationHandler(evt :any) {
      evt.stopPropagation();
      /**
       * For 'input' validating event wait 21.5 seconds before kicking in validation for better experience
       */
      if(validationEvent === "input") {
        setTimeout(() => {
          validateAndMutate([rule]);
        }, 1500)
      }
      else validateAndMutate([rule]);
    }

    function invalidationHandler(evt: any) {
      evt.stopPropagation();
      rule.field.isEmpty = false;
      rule.field.isInvalid = false;
      rule.field.validator = undefined;
    }

  },

  unbind(el: any, binding :any) {

    const events = Object.keys(binding.modifiers || {}); 
    const validationEvent = events[ 0 ] || "input";
    const inValidateEvent = events[ 1 ];

    const validationHandler = el[handlers.validateOn.validationHandler];
    el.removeEventListener(validationEvent, validationHandler);
    
    if(inValidateEvent) {
      const invalidationHandler = el[handlers.validateOn.invalidationHandler];
      el.removeEventListener(validationEvent, invalidationHandler);
    }

  },

}


const validatePrevent = {

  bind(el :any, binding :any) {

    const rules = buildRulesFromBinding(binding);
    el.addEventListener("keydown", validatePreventHandler);
    el[handlers.validatePreventHandler] = validatePreventHandler;

    //---------------------------------------------------------
    function validatePreventHandler(evt :any) {
      if(isControlKey(evt)) return;
      
      const value = evt.key.trim();
      const isValid = validateValue(value, rules);
      if((value+"").length && isValid) evt.preventDefault();
    }

  },

  unbind(el :any) {

    const validatePreventHandler = el[handlers.validatePreventHandler];
    el.removeEventListener("keydown", validatePreventHandler);

  }

}


const validateAllow = {

  bind(el :any, binding :any) {

    const rules = buildRulesFromBinding(binding);
    el.addEventListener("keydown", validateAllowHandler)
    el[handlers.validateAllowHandler] = validateAllowHandler;

    //-------------------------------------------------------
    function validateAllowHandler(evt :any) {
      if(isControlKey(evt)) return;

      const value = evt.key.trim();
      const isNotValid = validateValue(value, rules) === false;
      if((value+"").length && isNotValid) evt.preventDefault();
    }

  },

  unbind(el :any) {

    const validateAllowHandler = el[handlers.validateAllowHandler];
    el.removeEventListener("keydown", validateAllowHandler);

  }

}


const validateMax = {
  
  bind(el :any, binding :any) {

    const maximum = binding.value;
    el.addEventListener("keyup", validateMaxHandler)
    el[handlers.validateMaxHandler] = validateMaxHandler;

    //-------------------------------------------------------
    function validateMaxHandler(evt :any) {
      if(isControlKey(evt)) return;

      if(max(maximum)(evt.target.value).isValid === false) { 
        evt.target.value = maximum;
      }
    }

  },

  unbind(el :any) {

    const validateMaxHandler = el[handlers.validateMaxHandler];
    el.removeEventListener("keyup", validateMaxHandler);

  }
}


const validateLength = {
  
  bind(el :any, binding :any) {

    const maximum = binding.value;
    el.addEventListener("keydown", validateLengthHandler)
    el[handlers.validateLengthHandler] = validateLengthHandler;

    //-------------------------------------------------------
    function validateLengthHandler(evt :any) {
      if(isControlKey(evt)) return;

      if(maxChar(maximum-1)(evt.target.value).isValid === false) { 
        evt.preventDefault();
      }
    }

  },

  unbind(el :any) {

    const validateLengthHandler = el[handlers.validateLengthHandler];
    el.removeEventListener("keydown", validateLengthHandler);

  }
}


function buildRulesFromBinding(binding :any) {
  const rules :Rule[] = [];

  if(binding.modifiers["alpha"]) rules.push(alpha)
  if(binding.modifiers["numeric"]) rules.push(numericChar);
  if(binding.modifiers["alphaNumeric"]) rules.push(alphaNumeric);
  if(binding.modifiers["integer"]) rules.push(integer);

  return rules;
}


function numericChar(value :any) :Validation {
  value = (value+"").trim();
  if((value == ".") || numeric(value).isValid) return {
    isValid: true,
    rule: undefined
  }
  else return { isValid: false, rule: "numeric" }
}


export default {

  install(Vue :any) {
    constants.Vue = Vue;
    Vue.directive("validate-on", validateOn )
    Vue.directive("validate-prevent", validatePrevent )
    Vue.directive("validate-allow", validateAllow )
    Vue.directive("validate-max", validateMax )
    Vue.directive("validate-length", validateLength )
  },

  // validateOn,
  // validatePrevent,
  // validateAllow,
  
}

