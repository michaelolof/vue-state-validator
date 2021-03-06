import { Validation } from "./index";



export const match = (compare :any) => (value: any) :Validation => {

  if(!(compare instanceof RegExp)) throw new Error("The compare parameter in the match rule must be regex");

  if(((value+"").match(compare) || []).length > 0) {
    return {
      isValid: true,
      rule: undefined,
    }
  }
  
  else return { isValid: false, rule: "match" };
  
}