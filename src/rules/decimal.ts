import { Validation } from "./index"


export const decimal = (value :any) :Validation => {

  const isDecimal = () => /^[-]?\d*(\.\d+)?$/.test(value);

  if(isDecimal()) return {
    isValid: true,
    rule: undefined
  }

  else return { isValid: false, rule: "decimal" }

}