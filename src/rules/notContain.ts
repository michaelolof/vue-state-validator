import { contains } from "./contains";
import { Validation } from "./index";



export const notContain = (content :string) => (value: any) :Validation => {

  if(contains(content)(value).isValid === false) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "notContain" }
  
}