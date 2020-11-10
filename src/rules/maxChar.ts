import { RuleReturn } from "./index";
import { required } from "./required";



export const maxChar = (maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  value = value + "";
  if(value.length > maximum) return {
    hasError: true,
    errorCode: "too-big",
  }

  return valid;
  
}