# VueStateValidator

A simple customizable validator engine for Vue.

See detailed documentation at http://michaelolof.com/docs/vue-state-validator
<br><br><br>
## Installation
```sh
## Install Module
$ npm install --save vue-state-validator
```

```ts
// Install Plugin
import Vue from "vue";
import VueStateValidator from "vue-state-validator";

Vue.use(VueStateValidator);
```
<br>

## How to use

Define your fields in object like in the data fields shown below.
Here we trigger validation when the submit button is clicked.
```js
import { required, charRange, wordRange, integer, range, numeric, min, max, validateAndMutate } from "vue-state-validator";

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
        { value: this.fullname.value, rules: this.fullname.rules, err: this.fullname },
        { value: this.age.value, rules: this.age.rules, err: this.age },
        { value: this.amount.value, rules: this.amount.rules, err: this.amount }
      ]

      const isValid = validateAndMutate(options);

      if(isValid === false) return;

      // Continue form submission here...
    }
  }
}
```
This will validate the fields entered against the rules given and mutate the `err` object.
This will result in a data object that looks like this:
```js
{
  data() {
    return {
      fullname: { 
        value: "John Doe Josh", 
        rules: [required, charRange(3, 25), wordRange(2,2)],
        $isWrong: true, 
        $rule: "wordRange" 
      },
      age: {
        value: 50,
        rules: [required, charRange(3, 25), wordRange(2,2)],
        $isWrong: true,
        $rule: "range"
      }
      amount: {
        value: undefined,
        rules: [required, numeric, min(100), max(100_000)],
        $isEmpty: true,
        $rule: "required"
      }
    }
  }
}
```
You would notice three properties `$isEmpty` `$isWrong` and `$rule` on the `err` being validated.
\
VueStateValidator at its core assumes that validation errors can only ever be **empty or wrong.** This means a validation can either fail because the client didn't enter a value, or the client entered a wrong value. 
We also recognize the need to give detailed error messages to provide context to where the failure occured - this is the information the `$rule` field gives. It lets us know which rule caused validation failure. 
If the validation is successfull, `$rule` is `undefined`

In your HTML, you'd do some thing like this to display the errors.
```html
<span v-if="amount.$isEmpty" class="error">Please enter an amount</span>
<span v-else-if="amount.$isWrong && amount.$rule === 'min'" class="error">Minimum amount is 100</span>
<span v-else-if="amount.$isWrong && amount.$rule === 'max'" class="error">Maximum amount is 100,000</span>
<span v-else-if="amount.$isWrong">Please enter a valid amount</span>
```

<br>




## Built-in Rules

| Syntax                      | Example                             | Description     |
| :---                        |    :----                            | :--- |
| `alpha`                     | `alpha("One")`                      | Checks that the value is alphabetic   |
| `alphaNumeric`              | `alphaNumeric("One2")`              | Checks that the value is alpha numeric      |
| `charRange(number, number)` | `charRange(2, 7)("One")`            | Checks that the length of characters must be between 2 and 7      |
| `contains(string)`          | `contains("O")("One")`              | Checks if string is in value      |
| `decimal`                   | `decimal(1.2)`                      | Checks if value is a decimal      |
| `equal`                     | `equal([1,2,3])([1,2,3])`           | Checks for deep equality between primitive and non-primitive types      |
| `email`                     | `email("john@doe.com")`             | Checks if value is an email address      |
| `integer`                   | `integer(12)`                       | Checks if value is an integer      |
| `ipAddress`                 | `ipAddress("127.0.0.1")`            | Checks if value is an IP address      |
| `macAddress`                | `macAddress("xx:xa:xx:xx:xx:xx")`   | Checks if value is a MAC address      |
| `match(RegexExp)`           | `match(/[a-zA-Z]+/)("One")`         | Checks if value is matched      |
| `matchLength(number)`       | `matchLength(3)("One")`             | Checks if length of string is matched      |
| `max(number)`               | `max(10)(4)`                        | Checks if value is <= maximum      |
| `maxChar(number)`           | `maxChar(10)("One")`                | Checks if length of value is <= maximum      |
| `maxWord(number)`           | `maxWord(2)("John Doe")`            | Checks if the number of words is <= maximum      |
| `min(number)`               | `min(2)(4)`                         | Checks if the value is >= than minimum      |
| `minChar(number)`           | `min(3)("One")`                     | Checks if length of character is >= minimum     |
| `minWord(number)`           | `minWord(2)("John D Word")`         | Checks if number of words is >= minimum      |
| `notContain(string)`        | `notContain("&*")("One")`           | Checks if string is not in value      |
| `numeric`                   | `numeric(1.3)`                      | Checks if a value is numeric      |
| `range(number, number)`     | `range(2, 13)(10)`                  | Checks if value is between 2 and 13      |
| `required`                  | `required("One")`                   | Checks that a value is not empty      |
| `url`                       | `url("https://www.google.com")`     | Checks if value is a url      |
| `wordRange(number, number)` | `wordRange(2, 6)("One Two Three")`  | Checks if number of words is between 2 and 6  |