import { Validation } from "./index";


export const minChar = (minimum :number) => (value: any) :Validation => {

  if((value+"").length >= minimum) return {
    isValid: true,
    rule: undefined
  }

  else return { isValid: false, rule: "minChar" };
}