import { Validation } from "./index";



export const match = (compare :any) => (value: any) :Validation => {

  if(compare instanceof RegExp && compare.test(value)) return {
    isValid: true,
    rule: undefined,
  } 
  
  else if(compare === value) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "match" };
  
}