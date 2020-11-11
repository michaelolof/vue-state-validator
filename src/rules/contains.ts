import { RuleReturn } from "./index";
import { required } from "./required";



export const contains = (content :string) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  value = value + "";
  if(value.includes(content) === false) return {
    hasError: true,
    validator: "contains",
  }


  return valid;
  
}