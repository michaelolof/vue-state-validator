import { maxChar } from "../../../src/rules/maxChar";


describe("maxChar()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"maxChar" };
  
  it("Should return a valid object for characters smaller or equal to the defined minimum", () => {
    
    expect(maxChar(3)("One")).toEqual(validReturn);
    expect(maxChar(12)("One")).toEqual(validReturn);
    expect(maxChar(15)("One Time")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters larger than the defined minimum", () => {

    expect(maxChar(5)("___1ddddd")).toEqual(invalidReturn);
    expect(maxChar(3)("aaaa")).toEqual(invalidReturn);

  })

})