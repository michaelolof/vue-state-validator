import { Validation } from "./index";
import { minChar } from "./minChar";
import { maxChar } from "./maxChar";



export const charRange = (minimum :number, maximum :number) => (value: any) :Validation => {

  const smallEnough = (val :any) => minChar(minimum)(value).isValid;
  const bigEnough = (val :any) => maxChar(maximum)(value).isValid;

  if((smallEnough(value) && bigEnough(value))) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "charRange" };

}