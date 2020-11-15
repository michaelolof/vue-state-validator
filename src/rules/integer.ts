import { Validation } from "./index"


export const integer = (value :any) :Validation => {

  const isInteger = () => /(^[0-9]*$)|(^-[0-9]+$)/.test(value);

  if(isInteger()) return {
    isValid: true,
    rule: undefined
  }

  else return { isValid: false, rule: "integer" }

}