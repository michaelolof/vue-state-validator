import { Validation } from "./index";


export const maxChar = (maximum :number) => (value: any) :Validation => {

  const smaller = (val :any) => (val+"").length <= maximum;
  
  if(smaller(value)) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "maxChar" };
}