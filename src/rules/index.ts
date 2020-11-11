export { alphaNumeric } from "./alphaNumeric";
export { charRange } from "./charRange";
export { contains } from "./contains";
export { containsNumbers } from "./containsNumbers";
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
export { required } from "./required";
export { wordRange } from "./wordRange";



export interface RuleReturn {
  hasError :boolean;
  validator ?:string;
}

export type Rule = (value :any) => RuleReturn;

