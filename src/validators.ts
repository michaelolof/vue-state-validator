import { Rule, Validation } from "./rules/index";
import { isEmpty, required } from "./rules/required";
import { objectIsEmpty, set, unset } from "./utils";


interface Field {
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

type MutationOptionProperty = string | ((t : object) => any);
export interface MutatingValidatorOption {
  target: object,
  property?: MutationOptionProperty;
  rules?: Rule | Rule[];
  validateIf?: boolean;
}

export interface ValidatorStateOption {
  name: string,
  value: string|number;
  rules?: Rule | Rule[];
  order?: number;
  validateIf?: boolean;
}


export interface ValidationState {
  [field :string]: Field
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

      const isValid = validateFieldAndMutate(option.target, option.property, option.rules);

      if( isValid === false ) rtn = isValid;

    }

    return rtn;

  }
}


export function getErrors(options :Dictionary<ValidatorOption>) :Dictionary<Field> {
  
    const field: Dictionary<Field> = {}
    
    for(let key in options) {

      const option = resolvePureValidationOption(options[key]);

      if(!option.validateIf) continue;

      field[ key ] = { value: option.value };

      validateFieldAndMutate( field[ key ], "value", option.rules )

      // Clean up the field object after validation.
      delete field[ key ][ "value" ];
      if(objectIsEmpty(field[key])) delete field[ key ];

    }

    return field;

}


export function getErrorsAndMutate(options :Dictionary<MutatingValidatorOption>) :Dictionary<Field> { 
  
  const field: Dictionary<Field> = {}
    
  for(let key in options) {

    const option = resolveMutatingValidationOption(options[key]);

    if(!option.validateIf) continue;

    field[ key ] = { value: typeof option.property === "function" ? option.property(option.target) : option.target[option.property] };

    validateFieldAndMutate( field[ key ], "value", option.rules )
    validateFieldAndMutate( option.target, option.property, option.rules )

    // Clean up the field object after validation.
    delete field[ key ][ "value" ];
    if(objectIsEmpty(field[key])) delete field[key];

  }

  return field;
}




export function validateValue(value :any, rules :Rule[]) :boolean {

  for(let rule of rules) {
    const validation = validateAsOptional(value, rule);
    if(!validation.isValid) return false;
  }

  return true;
}


export function validateFieldAndMutate(target :Field, property :MutationOptionProperty, rules :Rule[]) :boolean {

  const val = typeof property === "function" ? property(target) : target[ property || "value" ];

  for(let rule of rules) {
    
    const validation = validateAsOptional(val, rule);
    
    if(!validation.isValid) {
      
      if(validation.rule === "required") { 
        set(target, "$isEmpty", true);
        unset(target, "$isWrong");
      }
      else { 
        set(target, "$isWrong", true);
        unset(target, "$isEmpty");
      }
      
      set(target, "$rule", validation.rule);
      
      return false
      
    }
    else {
      invalidateMutatedField(target);
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
  if(rule.name === "required") return intialValidation;

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

  if(!option.target) throw new Error("VueStateValidatorError: target is a required field");
  else if(typeof option.target !== "object") throw new Error("VueStateValidatorError: Unknown target type entered. target should be an object");

  return {
    target: option.target,
    property: option.property || "value",
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
  field :Field;
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
  target: Dictionary<any>,
  property: MutationOptionProperty;
  rules: Rule[];
  validateIf: boolean;  
}