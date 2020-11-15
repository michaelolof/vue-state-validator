import { Validation } from "./index";
import { max } from "./max";
import { min } from "./min";



export const range = (minimum :number, maximum :number) => (value: any) :Validation => {

  const smallEnough = (val :any) => min(minimum)(value).isValid;
  const bigEnough = (val :any) => max(maximum)(value).isValid;

  if((smallEnough(value) && bigEnough(value))) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "range" };

}