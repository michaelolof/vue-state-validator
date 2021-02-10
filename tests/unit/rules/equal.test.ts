import { equal } from "../../../src/rules";


describe.only("rules.alpha()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"equal" };

 
  it("Should return a valid object for equal values and objects", () => {
    
    expect(equal("JOHN")("JOHN")).toEqual(validReturn);
    expect(equal("Doe")("Doe")).toEqual(validReturn);
    expect(equal("JohnDoe")("JohnDoe")).toEqual(validReturn);
    expect(equal(undefined)(undefined)).toEqual(validReturn);

  })


  it("Should return an invalid object for non-equal values and objects", () => {

    expect(equal("12200")(12200)).toEqual(invalidReturn);
    expect(equal("A2111")("a2111")).toEqual(invalidReturn);
    expect(equal("{}")({})).toEqual(invalidReturn);
    expect(equal(12222)("abc")).toEqual(invalidReturn);
    expect(equal(undefined)(null)).toEqual(invalidReturn);

  })


})