import { isEqual } from "../utils";
import { Validation } from "./index";


export const equal = (compare :any) => (value: any) :Validation => {

  if(isEqual(compare, value)) {
    return {
      isValid: true,
      rule: undefined,
    }
  }

  else return { isValid: false, rule: "equal" };
  
}