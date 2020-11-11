import { RuleReturn } from "./index";
import { required } from "./required";



export const maxWord = (maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const words = (value+"").trim().split(" ").filter(n => n.length > 0);
  if(words.length > maximum) return {
    hasError: true,
    validator: "maxWord",
  }

  return valid;
  
}