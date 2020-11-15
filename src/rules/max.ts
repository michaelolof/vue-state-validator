import { comparisonValue, Validation } from "./index";



export const max = (maximum :number) => (value: any) :Validation => {

  if(maximum >= comparisonValue(value)) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "max" };
  
}