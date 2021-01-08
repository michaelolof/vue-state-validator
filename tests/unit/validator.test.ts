import { ValidatorOption, required, range, wordRange, matchLength, charRange, maxChar, minChar, minWord, getErrors, ValidatorStateOption, alpha, numeric, max, validate, maxWord, min, validateAndMutate, getErrorsAndMutate } from "../../src";



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
    const bio = { text: "John Doe is a fake person" }
    const bioClone = { ...bio };

    const options = [
      { target: name, rules: [required, wordRange(2,2), maxChar(15)] },
      { target: age, rules: [required, range(18,28)] },
      { target: bio, property: "text", rules: [required, wordRange(3,10)] },
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
      { target: name, rules: [required, wordRange(2,2), maxChar(15)] },
      { target: age, rules: [required, range(18,28)] },
      { target: bio, rules: [wordRange(3,10)] },
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


describe("getErrors()", () => {

  it("should return an emmpty object with no validation errors", () => {

    const firstname = "John", lastname = undefined, age = 24, bio = "John Doe is a fake name";

    const options = {
      firstname: { value: firstname, rules: [required, alpha, maxWord(1), maxChar(10)] }, // --> Pass
      lastname: { value: lastname, rules: [alpha, maxWord(1), maxChar(10)] }, // --> Pass
      age: { value: age, rules: [required, numeric, min(18) ] }, // --> Pass
      bio: { value: bio, rules: [wordRange(3, 10), maxChar(120) ] }, // --> Pass
    }

    const errors = getErrors( options );

    expect(errors).toEqual({});
  
  })


  it("should return an object dictionary with the validation errors", () => {

    const firstname = "John", lastname = undefined, age = 24, bio = "John Doe is a fake name";

    const options = {
      firstname: { value: firstname, rules: [required, alpha, maxWord(1), maxChar(10)] }, // --> Pass
      lastname: { value: lastname, rules: [alpha, maxWord(1), maxChar(10)] }, // --> Pass
      age: { value: age, rules: [required, numeric, min(18) ] }, // --> Pass
      bio: { value: bio, rules: [wordRange(1, 4), maxChar(120) ] }, // --> Fail
    }


    const errors = getErrors( options );


    expect(errors).toHaveProperty("bio");
    expect(errors.bio).toEqual({ $isWrong: true, $rule: "wordRange" });

  })

})


describe("getErrorsAndMutate", () => {

  it("should pass validation and return true without any mutations", () => {

    const name = { value: "John Doe" };
    const nameClone = { ...name };
    const age = { value: 28 };
    const ageClone = { ...age };
    const bio = { text: "John Doe is a fake person" }
    const bioClone = { ...bio };

    const options = {
      name: { target: name, rules: [required, wordRange(2,2), maxChar(15)] },
      age: { target: age, rules: [required, range(18,28)] },
      bio: { target: bio, property: "text", rules: [required, wordRange(3,10)] },
    };


    const errors = getErrorsAndMutate(options);


    expect(errors).toEqual({});
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

    const options = {
      name: { target: name, rules: [required, wordRange(2,2), maxChar(15)] },
      age: { target: age, rules: [required, range(18,28)] },
      bio: { target: bio, rules: [wordRange(3,10)] },
    };


    const errors = getErrorsAndMutate(options);

    
    expect(errors).toHaveProperty("name");
    expect(errors.name).toEqual({ $isWrong: true, $rule: "wordRange" });
    expect(name).not.toEqual( nameClone );
    expect(name).toHaveProperty( "$isWrong", true )
    expect(name).toHaveProperty( "$rule", "wordRange" );
    
    expect(errors).toHaveProperty("age");
    expect(errors.age).toEqual({ $isEmpty: true, $rule: "required" });
    expect(age).not.toEqual( ageClone );
    expect(age).toHaveProperty( "$isEmpty", true );
    expect(age).toHaveProperty( "$rule", "required" );

    expect(bio).toEqual( bioClone );

  })


})

// describe("getValidationState()", () => {

//   it("Should return the validation state", () => {

//     const options :ValidatorStateOption[] = [
//       { name: "fullname", value: "Josh", rules: [ required, alpha, wordRange(2,2), maxChar(15) ] },
//       { name: "age", value: 202, rules: [ required, numeric, max(55) ] },
//       { name: "amount", value: "", rules: [ required, numeric, range(10, 200) ] },
//       { name: "description", value: "Bop bop baby", rules: [wordRange(3, 10)] }
//     ]

//     const vs = getValidationState(options);

//     expect( vs.fullname ).toHaveProperty("$isWrong", true );
//     expect( vs.fullname ).toHaveProperty("$isEmpty", undefined );
//     expect( vs.fullname ).toHaveProperty("$rule", "wordRange" );
    
//     expect( vs.age ).toHaveProperty("$isWrong", true );
//     expect( vs.age ).toHaveProperty("$isEmpty", undefined );
//     expect( vs.age ).toHaveProperty("$rule", "max" );

//     expect( vs.amount ).toHaveProperty("$isWrong", undefined );
//     expect( vs.amount ).toHaveProperty("$isEmpty", true );
//     expect( vs.amount ).toHaveProperty("$rule", "required" );

//     expect( vs.description ).toHaveProperty("$isWrong", undefined );
//     expect( vs.description ).toHaveProperty("$isEmpty", undefined );
//     expect( vs.description ).toHaveProperty("$rule", undefined );

//   })

// })
