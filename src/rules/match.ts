import { RuleReturn } from "./index";
import { required } from "./required";



export const match = (compare :any) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  if(compare !== value) return {
    hasError: true,
    validator: "match",
  }

  return valid;
  
}