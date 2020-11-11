import { RuleReturn } from "./index";
import { required } from "./required";



export const numeric = (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  if(isNaN(value)) return {
    hasError: true,
    validator: "numeric",
  }

  return valid;
  
}
