import { match } from "../../../src/rules";


describe("match()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"match" };
  
  it("Should return a valid object for characters that match the compare regex", () => {
    
    expect(match(/^One$/)("One")).toEqual(validReturn);
    expect(match(/^1$/)(1)).toEqual(validReturn);
    expect(match(/^One Ti$/)("One Ti")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for values that don't match the compare regex", () => {

    expect(match(/^1$/)("1x")).toEqual(invalidReturn);
    expect(match(/^Wonderful$/)("Wonder")).toEqual(invalidReturn);

  })

})