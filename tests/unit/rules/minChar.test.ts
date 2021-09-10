import { minChar } from "../../../src/rules/minChar";


describe("minChar()", () => {

  const validReturn = { isValid: true, rule: undefined };
  const invalidReturn = { isValid: false, rule:"minChar" };
  
  it("Should return a valid object for characters larger or equal to the defined minimum", () => {
    
    expect(minChar(2)("One")).toEqual(validReturn);
    expect(minChar(3)("One")).toEqual(validReturn);
    expect(minChar(5)("One Time")).toEqual(validReturn);
  
  })


  it("Should return an invalid object for characters smaller than the defined minimum", () => {

    expect(minChar(5)("_")).toEqual(invalidReturn);
    expect(minChar(100)("()+][@ZZssssssaAee")).toEqual(invalidReturn);

  })

})