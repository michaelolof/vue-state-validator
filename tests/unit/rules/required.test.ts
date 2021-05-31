import { isEmpty, required } from "../../../src/rules/required"

describe("rules.required()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"required" };

 
  it("Should return a valid object for valid inputs (required inputs)", () => {
    expect(required("[]")).toEqual(validReturn);
    expect(required("{}")).toEqual(validReturn);
    expect(required("Some people")).toEqual(validReturn);
    expect(required("   xxx")).toEqual(validReturn);
  })


  it("Should return an invalid object for invalid inputs (unrequired inputs)", () => {
    expect(required("")).toEqual(invalidReturn);
    expect(required(undefined)).toEqual(invalidReturn);
    expect(required(0)).toEqual(invalidReturn);
    expect(required(null)).toEqual(invalidReturn);
    expect(required("   ")).toEqual(invalidReturn);
    expect(required([])).toEqual(invalidReturn);
    expect(required({})).toEqual(invalidReturn);
  })

})


describe("rules.isEmpty()", () => {

  it("Should return true for empty values", () => {    
    
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(undefined)).toEqual(true);
    expect(isEmpty(null)).toEqual(true);
    expect(isEmpty("   ")).toEqual(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);

  })

  it("Should return false for non empty values", () => {

    expect(isEmpty("[]")).toBe(false);
    expect(isEmpty("{}")).toEqual(false);
    expect(isEmpty("Some people")).toEqual(false);
    expect(isEmpty("   xxx")).toEqual(false);

  })

})