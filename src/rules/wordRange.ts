import { RuleReturn } from "./index";
import { maxWord } from "./maxWord";
import { minWord } from "./minWord";
import { required } from "./required";



export const wordRange = (minimum :number, maximum :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  const tooSmall = minWord(minimum)(value);
  if(tooSmall.hasError) return { hasError: tooSmall.hasError, validator: "wordRange" };

  const tooBig = maxWord(maximum)(value);
  if(tooBig.hasError) return { hasError: tooBig.hasError, validator: "wordRange" };

  return valid;
  
}