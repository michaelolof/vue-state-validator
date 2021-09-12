import { Rule, Validation } from "./rules/index";
import { isEmpty, required } from "./rules/required";
import { objectIsEmpty, set, unset } from "./utils";


interface Err {
  [x :string]:any;
  $isEmpty?: boolean;
  $isWrong?: boolean;
  $rule?: string;
}

type Dictionary<V> = {
  [key :string] : V;
}

export interface ValidatorOption {
  value: any;
  rules?: Rule | Rule[];
  validateIf?: boolean;
}

export interface MutatingValidatorOption {
  value: any;
  err: object,
  rules?: Rule | Rule[];
  validateIf?: boolean;
}


export function validate(options :ValidatorOption[]) :boolean {

  return _v(resolvePureValidationOptions(options));

  //---------------------------------------------------------
  function _v(options :PureValidatedOption[]) {
    
    for(let option of options) {
      
      if(!option.validateIf) continue;
      
      const optionIsValid = validateValue(option.value, option.rules);

      if(optionIsValid === false) return false

    }

    return true;
  }
}


export function validateAndMutate(options :MutatingValidatorOption[]) :boolean {

  return _v(resolveMutatingValidationOptions(options));

  //------------------------------------------------------------
  function _v(options :MutatingValidatedOption[]) {

    let rtn = true;

    for(let option of options) {

      if(!option.validateIf) continue;

      const isValid = validateFieldAndMutate(option.value, option.err, option.rules);

      if( isValid === false ) rtn = isValid;

    }

    return rtn;

  }
}


export function validateValue(value :any, rules :Rule[]) :boolean {

  for(let rule of rules) {
    const validation = validateAsOptional(value, rule);
    if(!validation.isValid) return false;
  }

  return true;
}


export function validateFieldAndMutate(value: any, err :Err, rules :Rule[]) :boolean {

  for(let rule of rules) {
    
    const validation = validateAsOptional(value, rule);
    
    if(!validation.isValid) {
      
      if(validation.rule === "required") { 
        set(err, "$isEmpty", true);
        unset(err, "$isWrong");
      }
      else { 
        set(err, "$isWrong", true);
        unset(err, "$isEmpty");
      }
      
      set(err, "$rule", validation.rule);
      
      return false
      
    }
    else {
      invalidateMutatedField(err);
    }

  }

  return true;

}


export function invalidateMutatedField( target :object) {
  unset(target, "$isEmpty");
  unset(target, "$isWrong");
  unset(target, "$rule");
}



function validateAsOptional(value:any, rule :(value :any) => Validation) :Validation {

  const intialValidation = rule(value);
  if(intialValidation.rule === "required") return intialValidation;

  if(isEmpty(value) || intialValidation.isValid) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: intialValidation.rule };

}


function resolvePureValidationOptions(options :ValidatorOption[]) :PureValidatedOption[] {
  return options.map( resolvePureValidationOption )
}


function resolvePureValidationOption(option :ValidatorOption) :PureValidatedOption {
  return {
    value: option.value,
    rules: resolveRules(option.rules),
    validateIf: resolveValidateIf(option.validateIf)
  }
}


function resolveMutatingValidationOptions(options :MutatingValidatorOption[]) :MutatingValidatedOption[] {
  
  return options.map( resolveMutatingValidationOption );
  
}


function resolveMutatingValidationOption(option :MutatingValidatorOption) :MutatingValidatedOption {

  if(!option.err) throw new Error("VueStateValidatorError: err is a required field\n\r" + JSON.stringify(option));
  else if(typeof option.err !== "object") throw new Error("VueStateValidatorError: Unknown err type entered. err should be an object\n\r" + JSON.stringify(option));

  return {
    value: option.value,
    err: option.err,
    rules: resolveRules(option.rules),
    validateIf: resolveValidateIf(option.validateIf)
  }
}


function resolveRules(rules? :Rule|Rule[]) :Rule[] {
  return rules && Array.isArray(rules) 
    ? rules : rules && typeof rules === "function" 
    ? [rules] : [required];
}


function resolveValidateIf(validateIf?: boolean) {
  return validateIf === undefined || validateIf === null ? true : validateIf;
}


interface ValidatedOption {
  field :Err;
  rules :Rule[];
  value :string;
  order :number;
  validateIf :boolean;
}

interface PureValidatedOption {
  value?: any;
  rules: Rule[];
  validateIf: boolean;
}

interface MutatingValidatedOption {
  value: any;
  err: Dictionary<any>,
  rules: Rule[];
  validateIf: boolean;  
}