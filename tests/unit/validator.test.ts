import { ValidatorOption, required, range, wordRange, matchLength, charRange, maxChar, minChar, minWord } from "../../src";



describe( "" + "()", () => {
  
  it("Should return the errors found", () => {

    // const data = {
    //   balance: { value: 3000, currency: "NGN",  },
    //   amount: { value: 50, currency: "NGN" },
    //   beneficiary: { value: "John Doe", isShown: false },
    //   accountNo: { value: 1222000  },
    //   branchCode: { value: undefined }
    // }
    
    // const options :ValidatorOption[] = [
    //   { field: data.balance },
    //   { field: data.amount, rules: [required, range(100, 100000)] },
    //   { field: data.beneficiary, rules: [required, wordRange(2, 2)], validateIf: data.beneficiary.isShown },
    //   { field: data.accountNo, rules: [required, matchLength(10)] },
    //   { field: data.branchCode }
    // ];
  
    // const errors = checkForErrors(options);

  
    // expect(errors.length).toBe(3);
    // expect(errors[0].validator).toBe("range");
    // expect(errors[0].isInvalid).toBe(true);
    // expect(errors[1].validator).toBe("matchLength");
    // expect(errors[1].isInvalid).toBe(true);
    // expect(errors[2].validator).toBe("required");
    // expect(errors[2].isEmpty).toBe(true);

  })


  it("Should return the errors in the correct order", () => {
    
    // const data = {
    //   balance: { value: 3000, currency: "NGN",  },
    //   amount: { value: 50, currency: "NGN" },
    //   beneficiary: { value: "John Doe Max", isShown: true },
    //   accountNo: { value: 1222000  },
    //   branchCode: { value: undefined }
    // }
    
    // const options :ValidatorOption[] = [
    //   { field: data.balance, order: 1 },
    //   { field: data.amount, rules: [required, range(100, 100000)], order: 3 },
    //   { field: data.beneficiary, rules: [required, wordRange(2, 2)], validateIf: data.beneficiary.isShown, order: 4 },
    //   { field: data.accountNo, rules: [required, matchLength(10)], order: 2 },
    //   { field: data.branchCode, order: 5 }
    // ];

    // const errors = checkForErrors(options);

    // expect(errors.length).toBe(4);
    // expect(errors[0].validator).toBe("matchLength");
    // expect(errors[0].isInvalid).toBe(true);
    // expect(errors[1].validator).toBe("range");
    // expect(errors[1].isInvalid).toBe(true);
    // expect(errors[2].validator).toBe("wordRange");
    // expect(errors[2].isInvalid).toBe(true);
    // expect(errors[3].validator).toBe("required");
    // expect(errors[3].isEmpty).toBe(true);

  })


  it("Should adhrere strictly to the validation rules and the order in which they are defined", () => {
    
    // const data = {
    //   optionalNameOne: { value: "" },
    //   optionalNameTwo: { value: "M" },
    //   fullname: { value: "Points Taken" },
    // }
    
    // const options :ValidatorOption[] = [
    //   { field: data.optionalNameOne, rules: [charRange(3, 15)] },
    //   { field: data.optionalNameTwo, rules: [charRange(3, 15)], order: 3 },
    //   { field: data.fullname, rules: [required, minChar(5), minWord(4), maxChar(200)], order: 3 },
    // ];

    // const errors = checkForErrors(options);

    // expect(errors.length).toBe(2);
    // expect(errors[0].isInvalid).toBe(true);
    // expect(errors[0].validator).toBe("charRange");
    // expect(errors[1].isInvalid).toBe(true);
    // expect(errors[1].validator).toBe("minWord");

  })

});


