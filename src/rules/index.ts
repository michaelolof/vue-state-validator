export interface Validation {
  isValid :boolean;
  rule ?:string;
}


export type Rule = (value :any) => Validation;


export const comparisonValue = (val :any) => { 
  if(typeof val === "string") val = val.trim();
  return Array.isArray(val) ? val.length : !isNaN(parseFloat(val)) ? parseFloat(val) : (val+"").length;
}