import { RuleReturn } from "./index";
import { maxWord } from "./maxWord";
import { minWord } from "./minWord";
import { required } from "./required";



export const wordRange = (minimum :number, maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, errorCode: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const tooSmall = minWord(minimum)(value);
  if(tooSmall.hasError) return tooSmall;

  const tooBig = maxWord(maximum)(value);
  if(tooBig.hasError) return tooBig;


  return valid;
  
}