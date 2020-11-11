import { RuleReturn } from "./index";
import { required } from "./required";



export const minChar = (minimum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  value = value + "";
  if(value.length < minimum) return {
    hasError: true,
    validator: "minChar",
  }

  return valid;
  
}