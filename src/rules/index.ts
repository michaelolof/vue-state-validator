export { alpha } from "./alpha";
export { alphaNumeric } from "./alphaNumeric";
export { charRange } from "./charRange";
export { contains } from "./contains";
export { containsNumber as containsNumbers } from "./containsNumbers";
export { decimal } from "./decimal";
export { email } from "./email";
export { integer } from "./integer";
export { ipAddress } from "./ipAddress";
export { macAddress } from "./macAddress";
export { match } from "./match";
export { matchLength } from "./matchLength";
export { max } from "./max";
export { maxChar } from "./maxChar";
export { maxWord } from "./maxWord";
export { min } from "./min";
export { minChar } from "./minChar";
export { minWord } from "./minWord";
export { notContain } from "./notContain";
export { numeric } from "./numeric";
export { range } from "./range";
export { required, isEmpty } from "./required";
export { url } from "./url";
export { wordRange } from "./wordRange";



export interface Validation {
  isValid :boolean;
  rule ?:string;
}


export type Rule = (value :any) => Validation;


export const comparisonValue = (val :any) => { 
  if(typeof val === "string") val = val.trim();
  return Array.isArray(val) ? val.length : !isNaN(parseFloat(val)) ? parseFloat(val) : (val+"").length;
}