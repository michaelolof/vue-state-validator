import { alpha } from "../../../src/rules/alpha"



describe("rules.alpha()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"alpha" };

 
  it("Should return a valid object for alphabets", () => {
    
    expect(alpha("JOHN")).toEqual(validReturn);
    expect(alpha("Doe")).toEqual(validReturn);
    expect(alpha("JohnDoe")).toEqual(validReturn);

  })


  it("Should return an invalid object for non-alphabets", () => {

    expect(alpha("12200")).toEqual(invalidReturn);
    expect(alpha("A2111")).toEqual(invalidReturn);
    expect(alpha("{}")).toEqual(invalidReturn);
    expect(alpha(12222)).toEqual(invalidReturn);
    expect(alpha("John Doe")).toEqual(invalidReturn);

  })


})