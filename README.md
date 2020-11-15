#VueLiteValidator

> A simple customizable validator engine for Vue


## Installation
```sh
## Install Module
$ npm install --save vue-lite-validator
```

```ts
// Install Plugin
import Vue from "vue";
import VueLiteValidator from "vue-lite-validator";

Vue.use(VueLiteValidator);
```

## How to use

Define your fields in object like in the data fields shown below.
Here we trigger validation when the submit button is clicked.
```js
import { required, charRange, wordRange, integer, range, numeric, min, max, validateAndMutate } from "vue-lite-validator";

{
  data() {
    return {
      fullname: {  
        value: "John Doe Josh", 
        rules: [required, charRange(3, 25), wordRange(2,2)],
      },
      age: { 
        value: 50, 
        rules: [required, charRange(3, 25), wordRange(2,2)],
      },
      amount: { 
        value: undefined, 
        rules: [required, numeric, min(100), max(100_000)],
      },
    }
  },

  methods: {
    onSubmit() {
      /**
       * Define your validation rules for each field you want to validate. 
       * Here we want to validate:
       *  - Fullname which is required, must be between 3 to 25 characters and exactly 2 words
       *  - Age is required, must be an integer and must be between 12 and 45
       *  - Amount is required must be a number, and must be between 100 and 100,000
       */
      const options = [
        { field: this.fullname, rules: this.fullname.rules },
        { field: this.age, rules: this.age.rules },
        { field: this.amount, rules: this.amount.rules }
      ]

      const isValid = validateAndMutate(options);

      if(isValid === false) return;

      // Continue form submission here...
    }
  }
}
```
This will validate the fields entered against the rules given and mutate the properties in the field object.
This will result in a data object that looks like this:
```js
{
  data() {
    return {
      fullname: { 
        value: "John Doe Josh", 
        $isEmpty: false, 
        $isInvalid: true, 
        $rule: "wordRange" 
      },
      age: {
        value: 50,
        $isEmpty: false,
        $isInvalid: true,
        $rule: "range"
      }
      amount: {
        value: undefined,
        $isEmpty: true,
        $isInvalid: false,
        $rule: "required"
      }
    }
  }
}
```
You would notice three properties `$isEmpty` `$isInvalid` and `$rule` on the object being validated.
\
VueLiteValidator at its core assumes that validation errors can only ever be **empty or wrong.** This means a validation can either fail because the client didn't enter a value, or the client entered a wrong value. 
We also recognize the need to give detailed error messages which provide context to where the failure occured - this is the information the `$rule` field gives to us. It lets us know which rule caused validation failure. 
If the validation is successfull, `$rule` is `undefined`

In your HTML, you'd do some thing like this to display the errors.
```html
<span v-if="amount.$isEmpty" class="error">Please enter an amount</span>
<span v-else-if="amount.$isInvalid && amount.$rule === 'min'" class="error">Minimum amount is 100</span>
<span v-else-if="amount.$isInvalid && amount.$rule === 'max'" class="error">Maximum amount is 100,000</span>
<span v-else-if="amount.$isInvalid">Please enter a valid amount</span>
```

## Writing a Custom Validation Rule
A validation rule is simply function that takes a single value as a parameter and returns a `Validation` object.
```js
function greaterThan5(value) {

  if(value > 5) {
    return { isValid: true, rule: undefined }
  }

  else return { isValid: false, rule: "greaterThan5" }

}
```
That's it! You're done. 
You've written your own custom rule that can be passed into the rules array for validation just like the built in ones.



## Helper Directives
This library also comes with a couple of helper directives to simplify common validation problems



v-validate-on.[validateModifier].[invalidateModifier]="[ValidationOption]"
: ```html
  <input v-model="fullname.value" v-validate-on.blur.focus="{ field: fullname, rules: fullname.rules }">
  ```
  This will attach a blur and focus event on the input element. It will **validate** the field defined using the rules passed on `blur` and invalidate the fields on `focus`
  Both the validate and invalidate modifiers are optional.
  The default validate modifier is `blur`. The invalidate modifier has no default.

v-validate-prevent.[ruleModifier]
:  ```html
  <input v-model="age.value" v-validate-prevent.alpha />
  ```
  This will prevent all alphabetic characters from your input element
  Allowed modifiers are: `alpha`, `numeric`, `alphaNumeric` and `integer`

v-validate-allow.[ruleModifier]
:  ```html
  <input v-model="age.value" v-validate-prevent.number />
  ```
  This will allow only numeric characters in your input element
  Allowed modifiers are: `alpha`, `numeric`, `alphaNumeric` and `integer`

v-validate-max="[maxSize]"
:  ```html
  <input v-model="amount.value" v-validate-max="100000" />
  ```
  This will place a maximum limit of 100,000 on the value of your input element

v-validate-length="[maxSize]"
:  ```html
  <input v-model="fullname.value" v-validate-length="20" />
  ```
  This will place a maximum limit of 20 on the length of characters of your input element


## API TYPES

Valdation
: A simple object that defines the result of a validation rule.
  ```ts
  {
    isValid: boolean
    rule: string | undefined // The name of the function rule
  }
  ```

Rule 
: A unit function that defines that defines how a value is validated.
It takes a `value` as the only argument and returns a `Validation` object.
  ```ts
  (value :any) => Validation
  ```

ValidationOption 
: An object that holds information about the field to be validated
  ```ts
  {
    field: object,
    rules?: Rule[] // optional. Defaults to [required]
    validateIf?: boolean //optional. Defaults to true
    value?: string // optional. Defaults to "value"
    order?: number //optional. Defaults to the array index
  }
  ```
  **`field`** : represents the object that holds the value you want to validate. The field object has a `value` property by default which is to be validated against. Validation is done by attaching an `isEmpty`, `isInvalid` and `validator` property to this object. 

  **`rules`** : This is just an array of `Rule` functions. It is optional. If not passed it will default to an array with 1 `required` rule.

  **`validateIf`** : This tells the validator to skip validation if this value is false. It is useful when you want to validate dynamically (only when some conditions are met). It is optional. if not passed will default to `true`
  
  **`value`** : This allows you to set the name of the property which is to be validated in your `field` object. It is optional. If not passed will default to `"value"` 

  **`order`** : Here you can define the order in which to run your validation. Useful when you want to get validation errors based in a particular order. It is optional. if not passed will default to the array index.


## Validators

`validate(options: ValidatorOption[]) : boolean`
: Takes an array of `ValidatorOption` and returns true if valid, false if invalid.

`validateAndMutate(options :ValidatorOption[]) : boolean`
: Takes an array of `ValidatorOption` and returns true if valid and mutates the field object with `isEmpty` `isInvalid` `validator` properties.

`getErrors(options: ValidatorOption[]) : [Field]`
: Takes an array of `ValidatorOption` and returns an array of fields that failed validation.

`getErrorsAndMutate(options :ValidatorOption[]) : [Field]`
: Takes an array of `ValidatorOption` and returns an array of fields that failed validation and also mutates the field object with `isEmpty` `isInvalid` `validator` properties.


## Built-in Rules

| Syntax                      | Example     | Description     |
| :---                        |    :----    | :--- |
| `alpha`                     | `alpha("One")`       | Checks that the value is alphabetic   |
| `alphaNumeric`              | `alphaNumeric("One2")`        | Checks that the value is alpha numeric      |
| `charRange(number, number)` | `charRange(2, 7)("One")`        | Checks that the length of characters must be between 2 and 7      |
| `contains(string)`          | `contains("O")("One")`        | Checks if string is in value      |
| `decimal`                   | `decimal(1.2)`        | Checks if value is a decimal      |
| `email`                     | `email("john@doe.com")`        | Checks if value is an email address      |
| `integer`                   | `integer(12)`        | Checks if value is an integer      |
| `ipAddress`                 | `ipAddress("127.0.0.1")`        | Checks if value is an IP address      |
| `macAddress`                | `macAddress("xx:xa:xx:xx:xx:xx")`        | Checks if value is a MAC address      |
| `match(string)`             | `match(/[a-zA-Z]+/)("One")`        | Checks if value is matched      |
| `matchLength(number)`       | `matchLength(3)("One")`        | Checks if length of string is matched      |
| `max(number)`               | `max(10)(4)`        | Checks if value is <= maximum      |
| `maxChar(number)`           | `maxChar(10)("One")`        | Checks if length of value is <= maximum      |
| `maxWord(number)`           | `maxWord(2)("John Doe")`        | Checks if the number of words is <= maximum      |
| `min(number)`               | `min(2)(4)`        | Checks if the value is >= than minimum      |
| `minChar(number)`           | `min(3)("One")`        | Checks if length of character is >= minimum     |
| `minWord(number)`           | `minWord(2)("John D Word")`        | Checks if number of words is >= minimum      |
| `notContain(string)`        | `notContain("&*")("One")`        | Checks if string is not in value      |
| `numeric`                   | `numeric(1.3)`        | Checks if a value is numeric      |
| `range(number, number)`     | `range(2, 13)(10)`        | Checks if value is between 2 and 13      |
| `required`                  | `required("One")`        | Checks that a value is not empty      |
| `url`               | `url("https://www.google.com")`        | Checks if value is a url      |
| `wordRange(number, number)` | `wordRange(2, 6)("Big Bang Theory")`        | Checks if number of words is between 2 and 6  |