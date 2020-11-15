import { Validation } from "./index";


export const matchLength = (length :number) => (value: any) :Validation => {
  
  const isOfLength = (val :any) => {
    if(typeof val === "string") val = val.trim();
    const l = (Array.isArray(val) || typeof val === "string") ? val.length : (val+"").length;
    return l === length;
  }

  if(isOfLength(value)) return {
    isValid: true,
    rule: undefined,
  }
  
  else return { isValid: false, rule: "matchLength" }
}
