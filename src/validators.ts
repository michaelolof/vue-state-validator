import { Rule } from "./rules/index";
import { required } from "./rules/required";


interface ValidatorOptionField {
  [x :string]:any;
  isEmpty?: boolean;
  isInvalid?: boolean;
  validator?: string;
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
    .sort((a,b) => a.order - b.order);


  for(let opt of opts) {
    
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
      
      if(validation.validator === "required") field["isEmpty"] = true;
      else field["isInvalid"] = true;

      field["validator"] = validation.validator;

      return false
    }
  }

  return true;

}
