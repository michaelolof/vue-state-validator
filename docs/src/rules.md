# Validation Rules

Validation rules are simply pure unary functions that take a value parameter and return a `Validation` object

```ts
type Rule = (value :any) => Validation
```

<br><br>

## Built in Validaton Rules
This library ships with a bunch of built in validation rules.

| Syntax                      | Example                             | Description     |
| :---                        |    :----                            | :--- |
| `alpha`                     | `alpha("One")`                      | Checks that the value is alphabetic   |
| `alphaNumeric`              | `alphaNumeric("One2")`              | Checks that the value is alpha numeric      |
| `charRange(number, number)` | `charRange(2, 7)("One")`            | Checks that the length of characters must be between 2 and 7      |
| `contains(string)`          | `contains("O")("One")`              | Checks if string is in value      |
| `decimal`                   | `decimal(1.2)`                      | Checks if value is a decimal      |
| `email`                     | `email("john@doe.com")`             | Checks if value is an email address      |
| `equal`                     | `equal([1,2,3])([1,2,3])`           | Checks for deep equality between primitive and non-primitive types      |
| `integer`                   | `integer(12)`                       | Checks if value is an integer      |
| `ipAddress`                 | `ipAddress("127.0.0.1")`            | Checks if value is an IP address      |
| `macAddress`                | `macAddress("xx:xa:xx:xx:xx:xx")`   | Checks if value is a MAC address      |
| `match(RegexExp)`           | `match(/[a-zA-Z]+/)("One")`         | Checks if value is matched using a regular expression   |
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

<br>

## Custom Validation Rules

Custom Validation rules are really no different from built in rules. They are also just functions that take a value and return a `Validation` object.

For example. You could write a custom validator that checks if a value is an alphabet.

```js
function alphabet(value) { 
  const isValid = /^[A-Za-z]+$/.test(value); 
  
  if(isValid) { 
    return { isValid: true, rule: undefined } // No need to return rule here.
  }
  else { 
    return { isValid: false, rule: "alphabet" } // Need to return rule when it is invalid.
  }
}
```
That's it!. The above rule can be passed into any validator just like the built in ones.