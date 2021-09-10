import { max } from "../../../src/rules/max";


describe("max()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"max" };
  
  it("Should return a valid object for characters smaller or equal to the defined maximum", () => {
    
    expect(max(13)(2)).toEqual(validReturn);
    expect(max(13)(13)).toEqual(validReturn);
    expect(max(15)("One Time")).toEqual(validReturn);
    expect(max(5)("Times  ")).toEqual(validReturn);
    expect(max(3)([1,2])).toEqual(validReturn);
    expect(max(3)([1,2,3])).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters larger than the defined minimum", () => {

    expect(max(5)(6)).toEqual(invalidReturn);
    expect(max(5)("6")).toEqual(invalidReturn);
    expect(max(5)("___1ddddd")).toEqual(invalidReturn);
    expect(max(4)([1,2,3,4,5])).toEqual(invalidReturn);
    expect(max(3)("aaaa")).toEqual(invalidReturn);

  })

})