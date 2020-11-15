import { Validation } from "./index";



export const match = (compare :any) => (value: any) :Validation => {

  if(compare === value) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "match" };
  
}