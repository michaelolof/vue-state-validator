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
- Returns `false` and mutates the field object with `$isEmpty` or `$isWrong` and `$rule` properties if validation fails.

ValidatorOption Parameter
```ts
type MutatingValidatorOption = {
  target: object; // [Required]
  property?: string // optional
  rules?: Rule[]; // optional
  validateIf?: boolean; // optional
}
```

Example
```ts
const title = { value: "Doctor" }; 
const name = { value: "" };
const age = { value: 18 };
const bio = { text: "John Doe is a doctor" },

const options = [
  { target: title, rules: [alpha, maxChar(5) ] }, // --> Fail
  { target: name, rules: [required, wordRange(2, 3)]  }, // --> Fail
  { target: age, rules: [required, numeric, min(18), max(35)] }, // --> Pass
  { target: bio, property: "text", rules: [required, minWord(3), maxWord(20)] } // --> Pass
]

const isValid = validateAndMutate(options);

console.log(isValid) // false
console.log(title) // { value: "Doctor", $isWrong: true, $rule: "maxChar" }
console.log(name) // { value: "John", $isEmpty: true, $rule: "required" }
console.log(age) // { value: 18 }
console.log(bio) // { value: "John Doe is a doctor" }
```
Since the `bio` field is not using the default `value` property, we have to specify the property to the validator.



<br><br>

## getErrors
`getErrors(options :Dictionary<string,ValidatorOption[]>) : Dictionary<string, Field>`
- Takes an dictionary/map object of `string` to `ValidatorOption` 
- Returns a dictionary/map object of `string` to `Field` that failed validation.

ValidatorOption Parameter
```ts
type ValidatorOption = {
  value: any; // required
  rules?: Rule[]; // optional
  validateIf?: boolean; // optional
}
```

Example

```ts
const options :ValidatorOption[] = [
  name: { value: "Josh", rules: [ required, alpha, wordRange(2,2), maxChar(15) ] },
  age: { value: 20, rules: [ required, numeric, max(55) ] },
  amount: { value: "", rules: [ required, numeric, range(10, 200) ] },
]

const vs = getErrors(options);

console.log(vs)
/**
{
  name: {
    $isWrong: true,
    $rule: "wordRange",
  },

  amount: {
    $isEmpty: true,
    $rule: "required"
  }
}
```


<br><br>


## getErrorsAndMutate
`getErrorsAndMutate(options :Dictionary<string, MutatingValidatorOption>) : Dictionary<string, Field>`
- Takes a dictionary/object map of `string` to `MutatingValidatorOption` 
- Returns a dictionary/object map of `string` to `Field` that failed validation and also mutates the field object with `$isEmpty` or `$isWrong` and `$rule` properties.

ValidatorOption Parameter
```ts
type MutatingValidatorOption = {
  target: object; // [Required]
  property?: string // optional
  rules?: Rule[]; // optional
  validateIf?: boolean; // optional
}
```

Example

```ts
const title = { value: "Doctor" }; 
const name = { value: "" };
const age = { value: 18 };
const bio = { text: "John Doe is a doctor" },

const options = [
  title: { target: title, rules: [alpha, maxChar(5) ] }, // --> Fail
  name: { target: name, rules: [required, wordRange(2, 3)]  }, // --> Fail
  age: { target: age, rules: [required, numeric, min(18), max(35)] }, // --> Pass
  bio: { target: bio, property: "text", rules: [required, minWord(3), maxWord(20)] } // --> Pass
]

const errors = getErrorsAndMutate(options);

console.log(errors) // { title: { $isWrong: true, $rule: "maxChar"}, name: { $isEmpty: true, $rule: "required" }}
console.log(title) // { value: "Doctor", $isWrong: true, $rule: "maxChar" }
console.log(name) // { value: "John", $isEmpty: true, $rule: "required" }
console.log(age) // { value: 18 }
console.log(bio) // { value: "John Doe is a doctor" }
```

<br><br>