# API Types
The library has specifications on how to interface with it.\
Use the following as a reference when interacting with the library.

## Rule
A rule is a unary function that defines how a value is to be validated. It takes `value` as the only argument and returns a `Validation` object. \
The type signature of a `Rule` looks like this:
```ts
  type Rule = (value :any) => Validation
```
It takes one parameter of any type and returns a `Validation` object.

Example
```js
function numeric(value :number) {
  if(!isNaN(number)) {
    return { isValid: true, rule: undefined }
  }
  else return { isValid: false, rule: "numeric" }
}
```
<br><br>



## Validation
A validation object is a simple object that defines the result of a validation rule. \
This object will be returned for every rule, **both built in and custom ones.**
```ts
type Validation = {
  isValid: boolean;
  rule: string;
}
```
`isValid` tells you whether the value passed validation. \
`rule` defines what rule you're validating. \
***NOTE*** ->
It is best advised to pass the name of the rule function as the rule as shown in the `Rule` example above.
<br><br>



## ValidatorOption
An object that holds information about the field to be validated
```ts
type ValidatorOption = {
  value: any // [Required]. Vvalue to be validated..
  rules?: Rule[] // [Optional]. defaults to an array with 1 required rule.
  validateIf?: boolean // [Optional]. Defaults to true
}
```
- `value` : Defines the value to be validated against. Used when calling pure validator functions.
- `rules` : Rules defines an array of rules to validate the value against. If none is entered, it defaults to a unit array with a `required` rule.
- `validateIf` : This is useful for conditional validation. It will validate if true and ignore validation if false.
<br><br>



## MutatingValidatorOption
An object that holds information about the field to be validated. Used when calling the `validateAndMutate` function.
```ts
type MutatingValidatorOption = {
  value: any // [Required] value to be validated..
  rules?: Rule[] // [Optional]. defaults to an array with 1 required rule.
  validateIf?: boolean // [Optional] Defaults to true
  err: object // [Required]  
}
```
- `value` : Defines the value to be validated against. Used when calling pure validator functions.
- `rules` : Rules defines an array of rules to validate the value against. If none is entered, it defaults to a unit array with a `required` rule.
- `validateIf` : This is useful for conditional validation. It will validate if true and ignore validation if false.
- `err` : An object that defines where the `$isEmpty`, `$isWrong` or `$rule` field will be attached to for error reporting
<br><br>



## Err
An `err` simply represents an object that is mutated by the `validateAndMutate` function.
```ts
type Err = {
  [x:string|number] any
  $isEmpty?: boolean;
  $isWrong?: boolean;
  $rule :string;
}
```
<br><br>



## Validators
Validators are functions that return the state of your validation. We have 2 of them.
```ts
type validate = (options :ValidatorOption[]) => boolean;

type validateAndMutate = (options :MutatingValidatorOption[]) => boolean;
```