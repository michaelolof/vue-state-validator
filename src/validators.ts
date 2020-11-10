import { errorCodes } from "./rules/errorCodes";
import { Rule } from "./rules/index";
import { required } from "./rules/required";

interface ValidatorOptionField {
  isEmpty: boolean;
  isInvalid: boolean;
  errorCode?: string;
}

export interface ValidatorOption {
  field: ValidatorOptionField,
  rules?: Rule | Rule[];
  value?: string;
  order?: number;
  validateIf?: boolean;
}


export function checkForErrors(options :ValidatorOption[]) :ValidatorOptionField[] {

  const errors :ValidatorOptionField[] = [];
  options = options.sort(opt => opt.order);

  for(let option of options) {
    const opt = {
      field: option.field,
      rules: option.rules && Array.isArray(option.rules) 
        ? option.rules : option.rules && typeof option.rules === "function" 
        ? [option.rules] : [required],
      value: option.value || "value",
      order: option.order || 1,
      validateIf: option.validateIf === undefined ? true : option.validateIf,
    }

    if(!opt.validateIf) continue; 

    const isNotValid = validateField(opt.field, opt.value, opt.rules) === false;

    if(isNotValid) errors.push(opt.field);
  }

  return errors;
  
}


export function validate(options :ValidatorOption[]) :boolean {
  return checkForErrors(options).length > 0;
}


function validateField(field :ValidatorOptionField, value :string, rules :Rule[]) :boolean {

  const val = field[ value ];

  for(let rule of rules) {
    const validation = rule(val);
    
    if(validation.hasError) {
      
      if(validation.errorCode === errorCodes.isEmpty) field["isEmpty"] = true;
      else field["isInvalid"] = true;

      field["errorCode"] = validation.errorCode;

      return false
    }
  }

  return true;

}
