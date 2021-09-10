import { minWord } from "../../../src/rules/minWord";


describe("minWord()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"minWord" };
  
  it("Should return a valid object for characters larger or equal to the defined minimum", () => {
    
    expect(minWord(2)("One Two")).toEqual(validReturn);
    expect(minWord(3)("One Two Three Four")).toEqual(validReturn);
    expect(minWord(4)("  One Two Three Four  ")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters smaller than the defined minimum", () => {

    expect(minWord(5)("_")).toEqual(invalidReturn);
    expect(minWord(3)("  One  ")).toEqual(invalidReturn);

  })

})