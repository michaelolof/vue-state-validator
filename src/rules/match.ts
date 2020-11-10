import { RuleReturn } from "./index";
import { required } from "./required";



export const match = (compare :any) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  if(compare !== value) return {
    hasError: true,
    errorCode: "no-match"
  }

  return valid;
  
}