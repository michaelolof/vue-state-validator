import { Validation } from "./index";



export const contains = (content :string) => (value: any) :Validation => {

  const isContain = (val :any) => (val+"").includes(content);
  
  if(isContain(value)) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "contains" };
  
}