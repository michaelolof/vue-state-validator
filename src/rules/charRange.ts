import { RuleReturn } from "./index";
import { required } from "./required";
import { minChar } from "./minChar";
import { maxChar } from "./maxChar";



export const wordRange = (minimum :number, maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const tooSmall = minChar (minimum)(value);
  if(tooSmall.hasError) return tooSmall;

  const tooBig = maxChar(maximum)(value);
  if(tooBig.hasError) return tooBig;

  return valid;
  
}