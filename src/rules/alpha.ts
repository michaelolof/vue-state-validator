import { Validation } from "./index";



export const alpha = (value: any) :Validation => {

  const isAlpha = (val :string) => /^[A-Za-z]+$/.test(val);

  if(isAlpha(value)) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "alpha" };
  
}
