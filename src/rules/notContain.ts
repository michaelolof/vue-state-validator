import { RuleReturn } from "./index";
import { required } from "./required";



export const notContain = (content :string) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  value = value + "";
  if(value.includes(content)) return {
    hasError: true,
    validator: "notContain",
  }


  return valid;
  
}