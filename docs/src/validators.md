# Validators

Validators are functions that return the state of your validation.

## validate
`validate(options: ValidatorOption[]) : boolean`
- Takes an array of `ValidatorOption`  as a parameter.
- Returns `true` if validation is passed.
- Returns `false` if validation fails.

ValidatorOption Parameter
```ts
type ValidatorOption = {
  value: any; // required
  rules?: Rule[]; // optional
  validateIf?: boolean; // optional
}
```

Example:
```ts
const name = "John Doe", age = 18, title = undefined;

const options = [
  { value: title, rules: [alpha, maxChar(5) ] }, // Pass
  { value: name, rules: [required, wordRange(2, 3)]  }, // Pass
  { value: age, rules: [required, numeric, min(18), max(35)] }, // Pass
]

const isValid = validate(options);

console.log(isValid) // true
```
<br><br>


## validateAndMutate
`validateAndMutate(options :MutatingValidatorOption[]) : boolean`
- Takes an array of `MutatingValidatorOption`  as a ValidatorOption parameter.
- Returns `true` if validation is passed.
- Returns `false` and mutates the `err` object with `$isEmpty` or `$isWrong` and `$rule` properties if validation fails.

ValidatorOption Parameter
```ts
type MutatingValidatorOption = {
  value: any; // required
  rules?: Rule[]; // optional
  validateIf?: boolean; // optional
  err: object; // required
}
```

Example
```ts
const title = { value: "Doctor" }; 
const name = { value: "" };
const age = { value: 18 };
const bio = { text: "John Doe is a doctor" };
const phone = { value: { dialCode: "+234", phoneNo: "" } };

const options = [
  { value: title.value, rules: [alpha, maxChar(5) ], err: title }, // --> Fail
  { value: name.value, rules: [required, wordRange(2, 3)], err: name  }, // --> Fail
  { value: age.value, rules: [required, numeric, min(18), max(35)], err: age }, // --> Pass
  { value: bio.text, rules: [required, minWord(3), maxWord(20)], err: bio } // --> Pass
  { value: phone.value.phoneNo, rules: [required, minChar(8), maxChar(20)], err: phone } // --> Fail
]

const isValid = validateAndMutate(options);

console.log(isValid) // false
console.log(title) // { value: "Doctor", $isWrong: true, $rule: "maxChar" }
console.log(name) // { value: "John", $isEmpty: true, $rule: "required" }
console.log(age) // { value: 18 }
console.log(bio) // { text: "John Doe is a doctor" }
console.log(phone) // { value: { dialCode: "+234", phoneNo: "" }, $isEmpty: true, $rule: "required" }
```
<br><br>
