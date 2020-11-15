import { alphaNumeric } from "../../../src/rules";



describe("rules.alpha()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"alphaNumeric" };

 
  it("Should return a valid object for alphabets", () => {
    
    expect(alphaNumeric("1233333assss")).toEqual(validReturn);
    expect(alphaNumeric("ssss122099000")).toEqual(validReturn);
    expect(alphaNumeric("0xx12aaa")).toEqual(validReturn);

  })


  it("Should return an invalid object for non-alphanumerics", () => {

    expect(alphaNumeric("_")).toEqual(invalidReturn);
    expect(alphaNumeric("()+][@")).toEqual(invalidReturn);

  })


})