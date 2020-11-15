import { Validation } from "./index";



export const numeric = (value: any) :Validation => {

  if(!isNaN(value)) return {
    isValid: true,
    rule: undefined, 
  }

  else return { isValid: false, rule: "numeric" };
  
}
