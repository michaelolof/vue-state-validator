import { RuleReturn } from "./index";
import { required } from "./required";



export const matchLength = (length :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  value = value + "";
  if(value.length !== length) return {
    hasError: true,
    validator: "matchLength",
  }

  return valid;
  
}