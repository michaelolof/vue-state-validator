# API Types
 This are the

## Rule
A rule is a unary function that defines how a value is to be validated. It takes `value` as the only argument and returns a `Validation` object. \
A rule a type signature as follows:
```ts
  type Rule = (value :any) => Validation
```
Example
```js
function numeric(value :number) {
  if(!isNaN(number)) {
    return { isValid: true, rule: "numeric" }
  }
  else return { isValid: false, rule: "numeric" }
}
```
<br><br>



## Validation
A validation object is a simple object that defines the result of a validation rule. \
This object will be returned for every rule, both built in and custom ones.
```ts
type Validation = {
  isValid: boolean;
  rule: string;
}
```
`isValid` tells you whether the value passed the validation rule. `rule` defines what rule you're validating. \
A rule of thumb is to return the name of the rule function itself.
<br><br>



## ValidationOption
An object that holds information about the field to be validated
```ts
type ValidationOption = {
  value: any // Value to be validated..
  rules?: Rule[] // optional. Defaults to [required]
  validateIf?: boolean //optional. Defaults to true
}
```
- `value` : Defines the value to be validated against. Used when calling pure validator functions.
- `rules` : Rules defines an array of rules to validate the field against. If none is entered, it defaults to a unit array with a `required` rule.
- `validateIf` : This is useful for conditional validation. It will validate if true and ignore validation if false.
<br><br>



## MutatingValidationOption
An object that holds information about the field to be validated
```ts
type MutatingValidationOption = {
  target?: object, // An object with the value to be validated. Used for mutating validators
  property?: string // Target property which is to be validated. Default is "value"
  rules?: Rule[] // optional. Defaults to [required]
  validateIf?: boolean //optional. Defaults to true
}
```
- `target` : is the object that contains the value to be validated. By default the validator will check if the target object has a `value` property and use that.
- `property` : Here you can state which the target property the validator should use. By default the validator will check for a `value` property in the target object.
- `rules` : Rules defines an array of rules to validate the field against. If none is entered, it defaults to a unit array with a `required` rule.
- `validateIf` : This is useful for conditional validation. It will validate if true and ignore validation if false.
<br><br>



## Field
A field simply represents an object passed into a Validation option.
```ts
type Field = {
  $isEmpty?: boolean;
  $isWrong?: boolean;
  $rule :string;
}
```
<br><br>



## Validators
Validators are functions that return the state of your validation. We have 5 of them.
```ts
type validate = (options :ValidationOptions) :boolean;

type validateAndMutate = (options :ValidationOptions) :boolean;

type getErrors = (options: Dictionary<string,ValidatorOption>) :Dictionary<string, Field>

type getErrorsAndMutate = (options: Dictionary<string, ValidatorOption>) : Dictionary<string, Field>
```