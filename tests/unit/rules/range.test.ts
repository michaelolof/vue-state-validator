import { range } from "../../../src/rules";


describe("range()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"range" };
  
  it("Should return a valid object for characters between the defined minimum and maximum range", () => {
    
    expect(range(3, 10)(7)).toEqual(validReturn);
    expect(range(3, 10)("7")).toEqual(validReturn);
    expect(range(3, 10)("One")).toEqual(validReturn);
    expect(range(3, 3)("One")).toEqual(validReturn);
    expect(range(3, 8)("One Time")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters outside the defined minimum and maximum range", () => {

    expect(range(1, 4)("___1ddddd")).toEqual(invalidReturn);
    expect(range(0,3)("aaaa")).toEqual(invalidReturn);
    expect(range(0,3)(13)).toEqual(invalidReturn);
    expect(range(0,3)("13")).toEqual(invalidReturn);

  })

})