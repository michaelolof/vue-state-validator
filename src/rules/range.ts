import { RuleReturn } from "./index";
import { max } from "./max";
import { min } from "./min";
import { required } from "./required";



export const range = (minimum :number, maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const tooSmall = min(minimum)(value);
  if(tooSmall.hasError) return { hasError: tooSmall.hasError, validator: "range" };

  const tooBig = max(maximum)(value);
  if(tooBig.hasError) return { hasError: tooBig.hasError, validator: "range" };


  return valid;
  
}