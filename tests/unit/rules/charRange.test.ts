import { charRange } from "../../../src/rules";


describe("charRange()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"charRange" };
  
  it("Should return a valid object for characters between the defined minimum and maximum range", () => {
    
    expect(charRange(3, 10)("One")).toEqual(validReturn);
    expect(charRange(3, 3)("One")).toEqual(validReturn);
    expect(charRange(3, 8)("One Time")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters outside the defined minimum and maximum range", () => {

    expect(charRange(1, 4)("___1ddddd")).toEqual(invalidReturn);
    expect(charRange(0,3)("aaaa")).toEqual(invalidReturn);

  })

})