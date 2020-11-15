import { notContain } from "../../../src/rules";


describe("notContain()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"notContain" };
  
  it("Should return a valid object for characters larger or equal to the defined minimum", () => {

    expect(notContain("zz")("_")).toEqual(validReturn);
    expect(notContain("Wonderful")("Wonder")).toEqual(validReturn);
      
  })
  

  it("Should return an invalid object for characters smaller than the defined minimum", () => {

    expect(notContain("One")("One")).toEqual(invalidReturn);
    expect(notContain("O")("One")).toEqual(invalidReturn);
    expect(notContain("One Ti")("One Time")).toEqual(invalidReturn);

  })

})