import { Validation } from "./index";
import { maxWord } from "./maxWord";
import { minWord } from "./minWord";



export const wordRange = (minimum :number, maximum :number) => (value: any) :Validation => {

  const smallEnough = () => minWord(minimum)(value).isValid;
  const bigEnough = () => maxWord(maximum)(value).isValid;

  if(smallEnough() && bigEnough()) return {
    isValid: true,
    rule: undefined,
  }

  else return { isValid: false, rule: "wordRange" };
}