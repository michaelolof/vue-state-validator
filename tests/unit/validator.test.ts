import { required, range, wordRange, maxChar, alpha, numeric, max, validate, maxWord, min, validateAndMutate } from "../../src";



describe( "validate()", () => {  
  
  it("Should pass validation and return true", () => {

    const firstname = "John", lastname = undefined, age = 24, bio = "John Doe is a fake name";

    const options = [
      { value: firstname, rules: [required, alpha, maxWord(1), maxChar(10)] }, // --> Pass
      { value: lastname, rules: [alpha, maxWord(1), maxChar(10)] }, // --> Pass
      { value: age, rules: [required, numeric, min(18) ] }, // --> Pass
      { value: bio, rules: [wordRange(3, 10), maxChar(120) ] }, // --> Pass
    ]

    const isValid = validate( options );

    expect(isValid).toBe(true);

  })


  it("Should fail validation and return false", () => {

    const firstname = "John", lastname = undefined, age = 24, bio = "John Doe is a fake name";

    const options = [
      { value: firstname, rules: [required, alpha, maxWord(1), maxChar(10)] }, // --> Pass
      { value: lastname, rules: [alpha, maxWord(1), maxChar(10)] }, // --> Pass
      { value: age, rules: [required, numeric, min(18) ] }, // --> Pass
      { value: bio, rules: [wordRange(1, 4), maxChar(120) ] }, // --> Fail
    ]

    const isValid = validate( options );

    expect(isValid).toBe(false);

  })

});


describe( "validateAndMutate()", () => {

  it("should pass validation and return true without any mutations", () => {

    const name = { value: "John Doe" };
    const nameClone = { ...name };
    const age = { value: 28 };
    const ageClone = { ...age };
    const bio = { text: "John Doe is a fake person", err: {} }
    const bioClone = { ...bio };

    const options = [
      { value: name.value, rules: [required, wordRange(2,2), maxChar(15)], err: name },
      { value: age.value, rules: [required, range(18,28)], err: age },
      { value: bio.text, rules: [required, wordRange(3,10)], err: bio },
    ];


    const isValid = validateAndMutate(options);


    expect(isValid).toBe(true);
    expect(name).toEqual( nameClone );
    expect(age).toEqual( ageClone );
    expect(bio).toEqual( bioClone );

  })

  it("should fail validation and mutate the target object with respective error properties", () => {

    const name = { value: "John" };
    const nameClone = { ...name };
    const age = { value: undefined };
    const ageClone = { ...age };
    const bio = { value: "John Doe is a fake person" }
    const bioClone = { ...bio };

    const options = [
      { value: name.value, rules: [required, wordRange(2,2), maxChar(15)], err: name },
      { value: age.value, rules: [required, range(18,28)], err: age },
      { value: bio.value, rules: [wordRange(3,10)], err: bio },
    ];


    const isValid = validateAndMutate(options);


    expect(isValid).toBe(false);

    expect(name).not.toEqual( nameClone );
    expect(name).toHaveProperty( "$isWrong", true )
    expect(name).toHaveProperty( "$rule", "wordRange" );
    
    expect(age).not.toEqual( ageClone );
    expect(age).toHaveProperty( "$isEmpty", true );
    expect(age).toHaveProperty( "$rule", "required" );

    expect(bio).toEqual( bioClone );

  })

})