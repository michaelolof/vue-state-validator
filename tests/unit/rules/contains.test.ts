import { contains } from "../../../src/rules";


describe("contains()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"contains" };
  
  it("Should return a valid object for characters larger or equal to the defined minimum", () => {
    
    expect(contains("One")("One")).toEqual(validReturn);
    expect(contains("O")("One")).toEqual(validReturn);
    expect(contains("One Ti")("One Time")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters smaller than the defined minimum", () => {

    expect(contains("zz")("_")).toEqual(invalidReturn);
    expect(contains("Wonderful")("Wonder")).toEqual(invalidReturn);

  })

})