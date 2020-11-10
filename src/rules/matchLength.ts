import { RuleReturn } from "./index";
import { required } from "./required";



export const matchLength = (length :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  value = value + "";
  if(value.length !== length) return {
    hasError: true,
    errorCode: "no-match"
  }

  return valid;
  
}