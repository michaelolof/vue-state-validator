import { Validation } from "./index";



export const containsNumber = (size :number) => (value: any) :Validation => {

  const numbersFound = () => {
    let found = 0;
    for(let char of (value)+"") {
      const charIsNumber = isNaN(char as any) === false;
      if(charIsNumber ) found++;
    }
    return found;
  }

  if(numbersFound() >= size) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "containsNumber" };
  
}