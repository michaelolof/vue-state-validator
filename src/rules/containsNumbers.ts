import { RuleReturn } from "./index";
import { required } from "./required";



export const containsNumbers = (size :number) => (value: any) :RuleReturn => {

  const valid = { hasError: false, validator: undefined };

  const notRequired = required(value).hasError;
  if(notRequired) return valid;

  let numbersFound = 0;
  for(let char of (value)+"") {
    const charIsNumber = isNaN(char as any) === false;
    if(charIsNumber ) numbersFound++;
  }

  if(numbersFound < size) return {
    hasError: true,
    validator: "containsNumbers",
  }

  return valid;
  
}