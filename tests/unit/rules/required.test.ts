import { isEmpty } from "../../../src/rules/required"



describe("rules.isEmpty()", () => {

  it("Should return true for empty values", () => {    
    
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(undefined)).toEqual(true);
    expect(isEmpty(null)).toEqual(true);
    expect(isEmpty("   ")).toEqual(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);

  })

  it("Should return false for non empty values", () => {

    expect(isEmpty("[]")).toBe(false);
    expect(isEmpty("{}")).toEqual(false);
    expect(isEmpty("Some people")).toEqual(false);
    expect(isEmpty("   xxx")).toEqual(false);

  })

})