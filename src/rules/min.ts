import { Validation,comparisonValue } from "./index";


export const min = (minimum :number) => (value: any) :Validation => {

  if(minimum <= comparisonValue(value)) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "min" };

}