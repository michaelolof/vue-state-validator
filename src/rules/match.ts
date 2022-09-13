import { Validation } from "./index";



export const match = (compare :any) => (value: any) :Validation => {
  try {
    if(((value+"").match(compare) || []).length > 0) {
      return {
        isValid: true,
        rule: undefined,
      }
    }
    
    else return { isValid: false, rule: "match" };
  } catch {
    return { isValid: false, rule: "match" };
  }
}