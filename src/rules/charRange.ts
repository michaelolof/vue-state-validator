import { RuleReturn } from "./index";
import { required } from "./required";
import { minChar } from "./minChar";
import { maxChar } from "./maxChar";



export const charRange = (minimum :number, maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const tooSmall = minChar (minimum)(value);
  if(tooSmall.hasError) return { hasError: tooSmall.hasError, validator: "charRange" };

  const tooBig = maxChar(maximum)(value);
  if(tooBig.hasError) return { hasError: tooBig.hasError, validator: "charRange" };

  return valid;
  
}