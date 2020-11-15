import { Validation } from "./index"


export const email = (value :any) :Validation => {

  const isEmail = () => /.+@.+/.test(value);

  if(isEmail()) return {
    isValid: true,
    rule: undefined
  }

  else return { isValid: false, rule: "email" }

}