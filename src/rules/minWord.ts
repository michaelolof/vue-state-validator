import { RuleReturn } from "./index";
import { required } from "./required";



export const minWord = (minimum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const words = (value+"").trim().split(" ").filter(n => n.length > 0);
  if(words.length < minimum) return {
    hasError: true,
    errorCode: "too-small",
  }

  return valid;
  
}