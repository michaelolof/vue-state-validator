import { RuleReturn } from "./index";
import { required } from "./required";



export const max = (maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  if(value > maximum) return {
    hasError: true,
    errorCode: "too-big",
  }

  return valid;
  
}