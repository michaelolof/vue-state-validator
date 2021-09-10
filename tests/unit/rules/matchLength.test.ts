import { matchLength } from "../../../src/rules/matchLength";


describe("matchLength()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"matchLength" };
  
  it("Should return a valid object for when the lenght of the value is matched", () => {
    
    expect(matchLength(3)("One")).toEqual(validReturn);
    expect(matchLength(7)(1222222)).toEqual(validReturn);
    expect(matchLength(5)([1,2,3,4,5])).toEqual(validReturn);
    expect(matchLength(4)("Onez    ")).toEqual(validReturn);
    expect(matchLength(4)("  Onez    ")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters smaller than the defined minimum", () => {

    expect(matchLength(5)("_")).toEqual(invalidReturn);
    expect(matchLength(100)("()+][@ZZssssssaAee")).toEqual(invalidReturn);

  })

})