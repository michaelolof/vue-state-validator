import { numeric } from "../../../src/rules/numeric"



describe("rules.numeric()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"numeric" };

 
  it("Should return a valid object for numbers", () => {
    
    expect(numeric(12222)).toEqual(validReturn);
    expect(numeric("20333")).toEqual(validReturn);
    expect(numeric(10_000)).toEqual(validReturn);
    expect(numeric(0x13444)).toEqual(validReturn);
    expect(numeric("0x13444")).toEqual(validReturn);
    expect(numeric("2.553")).toEqual(validReturn);
    expect(numeric(".0")).toEqual(validReturn);
  })


  it("Should return an invalid object for non-numbers", () => {

    expect(numeric("One1")).toEqual(invalidReturn);
    expect(numeric("120 200")).toEqual(invalidReturn);
    expect(numeric("M")).toEqual(invalidReturn);
    expect(numeric("JOHN")).toEqual(invalidReturn);
    expect(numeric("Doe")).toEqual(invalidReturn);
    expect(numeric("---))222^^")).toEqual(invalidReturn);
    expect(numeric("A2111")).toEqual(invalidReturn);
    expect(numeric("{}")).toEqual(invalidReturn);
    expect(numeric("John Doe")).toEqual(invalidReturn);

  })


})